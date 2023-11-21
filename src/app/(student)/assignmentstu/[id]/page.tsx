"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import moment from "moment-jalaali";
import AnswerModal from "../../_components/AnswerModal";
import toast from "react-hot-toast";

const Page = () => {
  const [selectedTime, setSelectedTime] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [assignmentData, setAssignmentData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignmentResult, setAssignmentResult] = useState<any>([]);
  const handleCloseModal = () => {
    // Close the modal
    setIsModalOpen(false);
  };

  const handleClickOpen = () => {
    setIsModalOpen(true);
  };

  const { id } = useParams();

  const handleFileUpload = (e: any) => {
    const files = e.target.files;
    const fileList = Array.from(files);
    // setUploadedFiles(fileList);
  };

  // Function to open the modal
  // const openModal = () => {
  //   setModalOpen(true);
  // };

  // Function to close the modal
  // const closeModal = () => {
  //   setModalOpen(false);
  // };

  // Function to handle radio button selection
  // const handleRadioChange = (e: any) => {
  //   setSelectedTime(e.target.value);
  // };
  // const userData = localStorage.getItem("userData");
  const [userData, setUserData] = useState<string>("");
  const token = userData ? JSON.parse(userData)?.token : null;
  const host = localStorage.getItem("CONFIG") as string;

  const headersAcademic = {
    Authorization: token,
  };

  useEffect(() => {
    if (!userData) {
      setUserData(localStorage.getItem("userData") || "");
    }
  }, []);

  useEffect(() => {
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      if (parsedUserData && parsedUserData.id) {
        var url = `/api/v3/Assignmentresult?$filter={"andX":[{"eq":{"user.id":${parsedUserData.id}}},{"eq":{"assignment.id":${id}}}]}&$join=user,assignment,assignment.user,assignment.users,assignment.users.users,assignment.course_classs,assignment.course_classs.course,assignment.course_classs.school_class,assignment.course_classs.school_class.users&$select=ass_time,jc_create_time,stu_confirm,stu_descs,stu_file,parent_confirm,parent_descs,teacher_confirm,teacher_descs,teacher_score,user.first_name,user.last_name,assignment.title,assignment.jc_create_time,assignment.description,assignment.due_time,assignment.file,assignment.course_classs.school_class.title,assignment.course_classs.course.title,assignment.users.first_name,assignment.users.last_name,assignment.course_classs.school_class.users.first_name,assignment.course_classs.school_class.users.last_name`;
        axios
          .get(`https://${host}/${url}`, {
            headers: headersAcademic,
          })
          .then((res) => {
            console.log("assignment resulttt", res.data);
            setAssignmentResult(res.data);
          })
          .catch((error) => {});
      }
    }
  }, [id, userData]);

  useEffect(() => {
    if (userData) {
      var url = `/api/v3/assignment?$filter={"eq":{"id":${id}}}&$join=user,users,course_classs,course_classs.course,course_classs.school_class,course_classs.school_class.users&$select=title,jc_create_time,description,due_time,type,file,course_classs.school_class.title,course_classs.course.title,users.first_name,users.last_name,course_classs.school_class.users.first_name,course_classs.school_class.users.last_name`;
      axios
        .get(`https://mohammadfarhadi.classeh.ir/${url}`, {
          headers: headersAcademic,
        })
        .then((response) => {
          setAssignmentData(response.data[0]);
        })
        .catch((error) => {});
    }
  }, [userData]);

  console.log(assignmentData);

  const handleDeleteAssignment = () => {
    const deleteData = {
      AssId: id,
      userId: 1564, // Static user ID, as mentioned
    };

    axios
      .post(`https://${host}//schoolservice/deleteassignment`, deleteData)
      .then((response) => {
        console.log("Assignment answer deleted ", response.data);
        if (response.data.error_code == 200) {
          toast.success(response.data.message);
        } else {
          toast.error("حذف تکلیف با خطا رو به رو شد");
        }
      })
      .catch((error) => {
        console.error("Error deleting assignment answer", error);
      });
  };

  return (
    <div className="container my-12">
      <div className="bg-white mb-4 mx-auto w-[60%] shadow-md rounded-lg">
        <div className="bg-slate-600 p-4">
          <p className="text-white">اطلاعات تکلیف</p>
        </div>
        <div className="border-b p-4 border-b-slate-500">
          <p className="font-bold">عنوان:</p>
          <p>{assignmentData?.title}</p>
        </div>
        <div className="border-b p-4 border-b-slate-500">
          <p className="font-bold">توضیحات:</p>
          <p>{assignmentData?.description}</p>
        </div>
        {assignmentData?.file && (
          <div className="border-b p-4 border-b-slate-500">
            <p className="font-bold">فایل پیوست:</p>
            <a
              href={JSON.parse(assignmentData?.file)}
              target="_blank"
              rel="noopener noreferrer"
            >
              دانلود فایل
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
          </div>
          <div className="flex mb-1 items-center gap-x-2">
            <p>فرصت انجام تکلیف:</p>
            <p>
              {moment.unix(assignmentData?.due_time).format("jYYYY/jM/jD")}
            </p>{" "}
          </div>
        </div>
        {assignmentResult.length > 0 ? (
          <div className="mt-12">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h1 className="font-bold text-center  mb-8">
                اطلاعات پاسخ دانش اموز
              </h1>
              <div className="flex items-end gap-x-4">
                <div className="flex flex-col">
                  <p className="text-sm font-semibold">تایید دانش آموز</p>
                  <p>{assignmentResult[0].stu_confirm}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold">زمان ثبت جواب</p>
                  <p>
                    {moment
                      .unix(assignmentResult[0]?.jc_create_time)
                      .format("jYYYY/jM/jD")}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold">زمان انجام تکلیف</p>
                  <p>{assignmentResult[0].ass_time} دقیقه</p>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-semibold">توضیحات دانش آموز</p>
                  <p>{assignmentResult[0]?.stu_descs}</p>
                </div>
                {assignmentResult[0]?.stu_file && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold">فایل‌ها:</p>
                    <div className="mt-2">
                      {JSON.parse(assignmentResult[0].stu_file).map(
                        (file: any, index: any) => (
                          <a
                            key={index}
                            href={file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=" py-2 px-4 mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                          >
                            دانلود فایل {index + 1}
                          </a>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={handleDeleteAssignment}
              className="bg-red-600 rounded-md p-4 w-full text-white"
            >
              پاک کردن پاسخ تکلیف
            </button>
          </div>
        ) : (
          <button
            onClick={handleClickOpen}
            className="bg-blue-400 text-white p-2 rounded-md w-full mt-4"
          >
            ثبت پاسخ
          </button>
        )}

        <AnswerModal id={id} isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </div>
  );
};

export default Page;
