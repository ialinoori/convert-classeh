"use client";

import React, { useEffect, useState } from "react";
// import MultiSelectDropdown from "../_components/muilti-select-dropdown/multi-seclet-dropdown";
import axios from "axios";
import { Multiselect } from "multiselect-react-dropdown";
import toast from "react-hot-toast";
import Modal from "@/src/app/_components/modal/modal";
import DatePickerr from "../../../_components/datepicker/datepicker";
import { useParams } from "next/navigation";
import moment from "moment-jalaali"; 

const Page = () => {
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
  const [assignmentDetail, setAssignmentDetail] = useState<any>();
  const params = useParams();
  const { id } = params;

  console.log(id);

  const Category: any = { options: [] };

  const [userData, setUserData] = useState<string>("");
  const token = userData ? JSON.parse(userData)?.token : null;

  useEffect(() => {
    if (!userData) {
      setUserData(localStorage.getItem("userData") || "");
    }
  }, []);

  const headersAcademic = {
    Authorization: token,
  };
  const now = (Date.now() / 1000) as number;
  const time = now;

  useEffect(() => {
    if (userData) {
      const url = `/api/v3/Course_class?$filter={"andX":[{"eq": {"user.id":${1563}} },{"andX":[{"gt":{"school_class.academic_year.end_date":"${time}"}},{"lt":{"school_class.academic_year.start_date":"${time}"}}]}]}&$join=user,course,school_class,school_class.academic_year&$select=course.title,school_class.title`;
      axios
        .get(`https://mohammadfarhadi.classeh.ir/${url}`, {
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
          // console.log(Category);

          setCcategorylist(Category);
        })
        .catch((error) => {});
    }
  }, [userData]);

 
  useEffect(() => {
    if (userData) {
      var urll = `/api/v3/assignment?$filter={"eq":{"id":${id}}}&$join=user,users,course_classs,course_classs.course,course_classs.school_class,course_classs.school_class.users&$select=title,jc_create_time,description,due_time,file,course_classs.school_class.title,course_classs.course.title,users.first_name,users.last_name,course_classs.school_class.users.first_name,course_classs.school_class.users.last_name`;

      axios
        .get(`https://mohammadfarhadi.classeh.ir/${urll}`, {
          headers: headersAcademic,
        })
        .then((res) => {
          setAssignmentDetail(res.data);
        })
        .catch((error) => {});
    }
  }, [userData]);
  console.log("assignmentDet", assignmentDetail);

  useEffect(() => {
    if (assignmentDetail) {
      setTitle(assignmentDetail[0].title || "");
      setDescription(assignmentDetail[0].description || "");
    }
  }, [assignmentDetail]);

  useEffect(() => {
    if (assignmentDetail) {
      setUploadedFileUrls(JSON.parse(assignmentDetail[0].file));
    }
  }, [assignmentDetail]);

  useEffect(() => {
    if (assignmentDetail) {
      setSelectedUnix(Number(assignmentDetail[0].due_time));
    }
  }, [assignmentDetail]);

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
      .get(`https://mohammadfarhadi.classeh.ir/${url}`, {
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
    const unixTimestamp = selectedDate.valueOf() / 1000; // Convert milliseconds to seconds
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
      // Simulate a delay due to asynchronous file reading
      await new Promise((resolve) => setTimeout(resolve, 100));

      const formData = {
        images: base64Files,
      };

      // Call your API endpoint here with formData
      const response = await axios.post(
        "https://mohammadfarhadi.classeh.ir/schoolservice/addMultiImage",
        formData,
        {
          headers: {
            Authorization: JSON.parse(userData)?.token,
          },
        }
      );

      console.log("Upload response:", response.data);
      setUploadedFileUrls(response.data);
      // Handle the response as needed
      setIsUploading(false);
    } catch (error) {
      console.error("Upload error:", error);
      setIsUploading(false);
      // Handle the error gracefully
    }
  };

  const handleSubmit = async () => {
    const receivers = list.map((item: any) => ({
      Course_class: {
        id: item.mainID.toString(),
        users: selectedUsers.map((userId: any) => ({ id: userId.toString() })),
      },
    }));

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

    try {
      const response = await axios.post(
        "https://mohammadfarhadi.classeh.ir/schoolservice/addAssigment",
        formData,
        {
          headers: {
            Authorization: JSON.parse(userData)?.token,
          },
        }
      );

      console.log("Assignment submission response:", response.data);
      if (response.data.result_type === "success") {
        toast.success(response.data.message);
      } else {
        toast.error("err");
      }
  
      setTitle("");
      setDescription("");
      setSelectedUnix(null);
      setUploadedFileUrls([]);
      setList([]);
      setSelectedUsers([]);
    } catch (error) {
      console.error("Assignment submission error:", error);
   
    }
  };

  return (
    <div className="container mx-auto my-16">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    
        <p>در قسمت ویرایش باید دوباره کلاس در را انتخاب کنید</p>
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

        {uploadedFileUrls.map((url, index) => (
          <div key={index}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              File {index + 1}
            </a>
          </div>
        ))}

     
        <div className="flex items-center gap-x-2 mt-4">
          <p>تاریخ ثبت شده</p>
          {assignmentDetail && (
            <p>
              {" "}
              {moment.unix(assignmentDetail[0]?.due_time).format("jYYYY/jM/jD")}
            </p>
          )}
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

export default Page;
