"use client";

import React, { useEffect, useState } from "react";
// import MultiSelectDropdown from "../_components/muilti-select-dropdown/multi-seclet-dropdown";
import DatePickerr from "../_components/datepicker/datepicker";
import axios from "axios";
import { Multiselect } from "multiselect-react-dropdown";
import Modal from "../../_components/modal/modal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreateAssignment = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [categorylist, setCcategorylist] = useState<any>([]);
  const [list, setList] = useState<any>([]);
  const [course, setCourse] = useState(0);
  const [listuser, setListuser] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUnix, setSelectedUnix] = useState<any>(null);
  const [uploadedFileUrls, setUploadedFileUrls] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const Category: any = { options: [] };

  const [userData, setUserData] = useState<string>("");
  const [config, setConfig] = useState<string>("");
  const token = userData ? JSON.parse(userData)?.token : null;
  const id_user = userData ? JSON.parse(userData)?.id : null;

  useEffect(() => {
    if (!userData) {
      setUserData(localStorage.getItem("userData") || "");
      setConfig(localStorage.getItem("CONFIG") || "");
    }
  }, []);

  const headersAcademic = {
    Authorization: token,
  };
  const now = (Date.now() / 1000) as number;
  const time = now;
  // const host = localStorage.getItem("CONFIG") as string;

  useEffect(() => {
    if (userData) {
      const url = `/api/v3/Course_class?$filter={"andX":[{"eq": {"user.id":${id_user}} },{"andX":[{"gt":{"school_class.academic_year.end_date":"${time}"}},{"lt":{"school_class.academic_year.start_date":"${time}"}}]}]}&$join=user,course,school_class,school_class.academic_year&$select=course.title,school_class.title`;
      axios
        .get(`https://${config}/${url}`, {
          headers: headersAcademic,
        })
        .then((data) => {
          // console.log(data.data);

          Object.keys(data.data).forEach((key) => {
            const title_input = `${data.data[key].course.title} ${data.data[key].school_class.title}`;

            Category.options.push({
              mainID: data.data[key].id,
              name: title_input,
              id: data.data[key].school_class.id,
              nameCourse: data.data[key].course.title,
              nameClass: data.data[key].school_class.title,
              idCourse: data.data[key].course.id,
            });
          });

          setCcategorylist(Category);
        })
        .catch((error) => {});
    }
  }, [userData]);

  const onSelect = (selectedList: any, selectedItem: any) => {
    setList((prevState: any) => [...prevState, selectedItem]);
  };

  const onRemove = (selectedList: any, removedItem: any) => {
    setList([]);
    selectedList.map((option: any) =>
      setList((prevState: any) => [...prevState, option])
    );
  };

  const handleClickOpen = (data: any) => {
    setCourse(data.mainID);

    const url = `api/v3/school_class?$filter={"eq":{"id":${data.id}} }&$join=users&$orderby=id&$ordertype=desc&$select=users.first_name,users.last_name,title`;
    axios
      .get(`https://${config}/${url}`, {
        headers: headersAcademic,
      })
      .then((dataRes) => {
        setListuser(dataRes.data[0].users);
      })
      .catch((error) => {})
      .finally(() => {
        setIsModalOpen(true);
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDateChange = (selectedDate: any) => {
    const unixTimestamp = selectedDate.valueOf() / 1000;
    console.log("Selected date Unix timestamp:", unixTimestamp);
    setSelectedUnix(unixTimestamp);
  };

  const handleFileUpload = async (files: any) => {
    setIsUploading(true);
    const base64Files: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          const base64Match = e.target.result
            .toString()
            .match(/^data:(.*;base64,)?(.*)$/);
          if (base64Match && base64Match.length >= 3) {
            const base64WithPrefix = `data:${file.type};base64,${base64Match[2]}`;
            base64Files.push(base64WithPrefix);
          }
        }
      };

      reader.readAsDataURL(file);
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 100));

      const formData = {
        images: base64Files,
      };

      const response = await axios.post(
        `https://${config}/schoolservice/addMultiImage`,
        formData,
        {
          headers: {
            Authorization: JSON.parse(userData)?.token,
          },
        }
      );

      console.log("Upload response:", response.data);
      setUploadedFileUrls(response.data);

      setIsUploading(false);
    } catch (error) {
      console.error("Upload error:", error);
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    let receivers = [];

    if (selectedUsers.length === 0 && list.length > 0) {
      // If no specific users are selected, include all users from selected classes
      list.forEach((item) => {
        receivers.push({
          Course_class: {
            id: item.mainID.toString(),
            users: listuser.map((user) => ({ id: user.id.toString() })),
          },
        });
      });
    } else {
      // Include explicitly selected users for each class
      receivers = list.map((item) => ({
        Course_class: {
          id: item.mainID.toString(),
          users: selectedUsers.map((userId) => ({ id: userId.toString() })),
        },
      }));
    }

    const files = uploadedFileUrls.map((url) => `"${url}"`).join(",");

    const param = {
      description: description,
      due_time: selectedUnix,
      file: `[${files}]`,
      receivers: receivers,
      title: title,
      type: "0",
      user: { id: 1563 },
    };

    const formData = {
      param: param,
    };

    console.log(formData);

    // try {
    //   const response = await axios.post(
    //     `https://${config}/schoolservice/addAssigment`,
    //     formData,
    //     {
    //       headers: {
    //         Authorization: JSON.parse(userData)?.token,
    //       },
    //     }
    //   );

    //   console.log("Assignment submission response:", response.data);
    //   if (response.data.result_type === "success") {
    //     toast.success(response.data.message);
    //     router.push("/assignments");
    //   } else {
    //     toast.error("err");
    //   }

    //   setTitle("");
    //   setDescription("");
    //   setSelectedUnix(null);
    //   setUploadedFileUrls([]);
    //   setList([]);
    //   setSelectedUsers([]);
    // } catch (error) {
    //   console.error("Assignment submission error:", error);
    // }
  };

  return (
    <div className="container mx-auto my-16">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Multiselect dropdown */}
        <Multiselect
          options={categorylist.options}
          placeholder="کلاس درس"
          displayValue="name"
          onSelect={onSelect}
          onRemove={onRemove}
          className="border border-gray-300 rounded-md p-2 mb-4"
        />

        {list.map((option: any) => (
          <div
            key={option.mainID}
            className="bg-gray-100 flex items-center justify-between p-4 mb-2"
          >
            <div>
              <p className="font-bold text-xl">{option.nameCourse}</p>
              <p>{option.nameClass}</p>
            </div>
            <div>
              <button
                onClick={() => handleClickOpen(option)}
                className="bg-blue-400 text-white p-2 rounded-md"
              >
                انتخاب دانش اموز
              </button>
            </div>
          </div>
        ))}

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          users={listuser}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />

        <div className="flex flex-wrap mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="border border-gray-300 p-2 rounded-md w-full mb-4"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>

        <DatePickerr handleDateChange={handleDateChange} />

        <input
          type="file"
          multiple
          onChange={(e) => handleFileUpload(e.target.files)}
          className="mt-4"
        />

        <button
          onClick={handleSubmit}
          className={`bg-blue-600 w-full p-4 rounded-md text-white mt-4 ${
            isUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isUploading}
        >
          {isUploading ? "در حال اپلود فایل ها" : "ایجاد تکلیف"}
        </button>
      </div>
    </div>
  );
};

export default CreateAssignment;
