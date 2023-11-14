"use client";

import React, { useEffect, useState } from "react";
// import MultiSelectDropdown from "../_components/muilti-select-dropdown/multi-seclet-dropdown";
import DatePickerr from "../_components/datepicker/datepicker";
import axios from "axios";
import { Multiselect } from "multiselect-react-dropdown";
import Modal from "../../_components/modal/modal";

const Page = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [categorylist, setCcategorylist] = useState([]);
  const [list, setList] = useState([]);
  const [course, setCourse] = useState(0);
  const [listuser, setListuser] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUnix, setSelectedUnix] = useState(null); // Initialize with null or any default value
  const [uploadedFileUrls, setUploadedFileUrls] = useState([]);



  const Category = { options: [] };

  const userData = localStorage.getItem("userData");

  const headersAcademic = {
    Authorization: JSON.parse(userData)?.token,
  };
  const now = parseInt(Date.now() / 1000);
  const time = now;

  useEffect(() => {
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
  }, []);

  const onSelect = (selectedList, selectedItem) => {
    setList((prevState) => [...prevState, selectedItem]);
  };

  const onRemove = (selectedList, removedItem) => {
    setList([]);
    selectedList.map((option) =>
      setList((prevState) => [...prevState, option])
    );
  };

  const handleClickOpen = (data) => {
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
    // Close the modal
    setIsModalOpen(false);
  };

  const handleDateChange = (selectedDate) => {
    const unixTimestamp = selectedDate.valueOf() / 1000; // Convert milliseconds to seconds
    console.log("Selected date Unix timestamp:", unixTimestamp);
    setSelectedUnix(unixTimestamp)
  };

  const handleFileUpload = async (files) => {
  const base64Files = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64Match = e.target.result.match(/^data:(.*;base64,)?(.*)$/);
      if (base64Match && base64Match.length >= 3) {
        const base64WithPrefix = `data:${file.type};base64,${base64Match[2]}`;
        base64Files.push(base64WithPrefix); // Include the prefix in the base64 string
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
  } catch (error) {
    console.error("Upload error:", error);
    // Handle the error gracefully
  }
};

const handleSubmit = async () => {
  const receivers = list.map((item) => ({
    Course_class: {
      id: item.mainID.toString(),
      users: selectedUsers.map((userId) => ({ id: userId.toString() })),
    },
  }));

  const files = uploadedFileUrls.map(url => `"${url}"`).join(',');

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
    param: param
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
    // Handle the response as needed

    // Assuming you might want to reset form fields and states after successful submission
    setTitle("");
    setDescription("");
    setSelectedUnix(null);
    setUploadedFileUrls([]);
    setList([]);
    setSelectedUsers([]);
  } catch (error) {
    console.error("Assignment submission error:", error);
    // Handle the error gracefully
  }
};



  return (
    <div className="container mx-auto my-16">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* <MultiSelectDropdown options={categorylist.options} /> */}
        <Multiselect
          options={categorylist.options}
          placeholder="کلاس درس"
          displayValue="name"
          onSelect={onSelect}
          onRemove={onRemove}
        />

        {list.map((option) => (
          <div className="bg-slate-500 flex items-center justify-between p-4">
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

        <div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
            className="border border-slate-500 p-2 rounded-md"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description"
            className="border border-slate-500 p-2 rounded-md"
          />
        </div>
      </div>
      <DatePickerr handleDateChange={handleDateChange}  />

      <input
  type="file"
  multiple
  onChange={(e) => handleFileUpload(e.target.files)}
/>
      <button
        onClick={handleSubmit}
        className="bg-blue-600 w-full p-4 rounded-md text-white"
      >
        submit
      </button>
    </div>
  );
};

export default Page;
