"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import moment from "moment-jalaali"; // Correct import for moment-jalaali
import AnsAssignmentModaldal from "../../../_components/AnsAssignmentModal/AnsAssignmentModal";

const page = () => {
  const params = useParams();
  const id = params.id;
  const userData = localStorage.getItem("userData");
  const [assignmentData, setAssignmentData] = useState(null); // State to store fetched assignment data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);


  const headersAcademic = {
    Authorization: JSON.parse(userData).token,
  };
  useEffect(() => {
    var url = `/api/v3/assignment?$filter={"eq":{"id":${id}}}&$join=user,users,course_classs,course_classs.course,course_classs.school_class,course_classs.school_class.users&$select=title,jc_create_time,description,due_time,type,file,course_classs.school_class.title,course_classs.course.title,users.first_name,users.last_name,course_classs.school_class.users.first_name,course_classs.school_class.users.last_name`;
    axios
      .get(`https://mohammadfarhadi.classeh.ir/${url}`, {
        headers: headersAcademic,
      })
      .then((response) => {
        setAssignmentData(response.data[0]);
      })
      .catch((error) => {});
  }, []);

  console.log(assignmentData);

  const handleClickOpen = (userId) => {
    setSelectedUserId(userId); // Set the selected user ID

    
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    // Close the modal
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white mb-4 mx-auto w-[60%] shadow-md rounded-lg">
        <div className="bg-slate-600 p-4">
          <p className="text-white">اطلاعات تکلیف</p>
        </div>
        <div className="border-b p-4 border-b-slate-500">
          <p className="font-bold">عنوان:</p>
          <p>{assignmentData?.title}</p> {/* Display title */}
        </div>
        <div className="border-b p-4 border-b-slate-500">
          <p className="font-bold">توضیحات:</p>
          <p>{assignmentData?.description}</p> {/* Display description */}
        </div>
        {assignmentData?.file && (
          <div className="border-b p-4 border-b-slate-500">
            <p className="font-bold">فایل پیوست:</p>
            <a
              href={JSON.parse(assignmentData?.file)}
              target="_blank"
              rel="noopener noreferrer"
            >
              دانلود فایل {/* Link to download the file */}
            </a>
          </div>
        )}
        <div className="border-b p-4 border-b-slate-500">
          <div className="flex mb-1 items-center gap-x-2">
            <p>تاریخ ثبت:</p>
            <p>
              {moment
                .unix(assignmentData?.jc_create_time)
                .format("jYYYY/jM/jD")}
            </p>{" "}
            {/* Persian formatted jc_create_time */}
          </div>
          <div className="flex mb-1 items-center gap-x-2">
            <p>فرصت انجام تکلیف:</p>
            <p>
              {moment.unix(assignmentData?.due_time).format("jYYYY/jM/jD")}
            </p>{" "}
            {/* Persian formatted due_time */}
          </div>
        </div>
      </div>
      <div className="mt-12  mx-auto w-[60%]">
        {assignmentData?.users.map((user) => (
          <div className="bg-white shadow-lg border-b-2 border-slate-400 p-2 rounded flex items-center justify-between">
            <div className="flex flex-row-reverse items-center gap-x-2">
              {" "}
              <p>{user.first_name}</p> <p>{user.last_name}</p>
            </div>
            <button
             onClick={() => handleClickOpen(user.id)}
              className="bg-yellow-400 text-white p-2 rounded-md"
            >
              ثبت نظر
            </button>
          </div>
        ))}
      </div>
      <AnsAssignmentModaldal isOpen={isModalOpen} onClose={handleCloseModal} userId={selectedUserId} />
    </>
  );
};

export default page;
