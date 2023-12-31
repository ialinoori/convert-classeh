"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import moment from "moment-jalaali"; // Correct import for moment-jalaali
import toast from "react-hot-toast";

const AnsAssignmentModaldal = ({ isOpen, onClose, userId }: any) => {
  const userData = localStorage.getItem("userData") as string;
  const host = localStorage.getItem("CONFIG") as string;
  const [teacherOpinion, setTeacherOpinion] = useState(""); // State for teacher's opinion
  const [teacherDescription, setTeacherDescription] = useState(""); // State for teacher's description
  const [uploadedFileUrls, setUploadedFileUrls] = useState([]);
  const [data, setData] = useState<any>();
  const headersAcademic = {
    "Content-Type": "application/json",
    Authorization: JSON.parse(userData).token,
  };
  const extractDescriptionAndLink = (textWithLink: any) => {
    const regex = /(.+?)_file_(.+)/;
    const match = textWithLink.match(regex);

    if (match && match.length >= 3) {
      const description = match[1]; // Extracted description
      const link = match[2]; // Extracted link
      return { description, link };
    } else {
      return { description: "", link: "" };
    }
  };

  useEffect(() => {
    const { description, link } =
      data && data[0]?.teacher_descs
        ? extractDescriptionAndLink(data[0]?.teacher_descs)
        : { description: "", link: "" };
  }, [data]);

  const params = useParams();
  const id = params.id;
  useEffect(() => {
    if (isOpen) {
      console.log("User ID:", userId);
      console.log("ass ID:", id);

      const url = `/api/v3/Assignmentresult?$filter={"andX":[{"eq":{"user.id":${userId}}},{"eq":{"assignment.id":${id}}}]}&$join=user,assignment,assignment.user,assignment.users,assignment.users.users,assignment.course_classs,assignment.course_classs.course,assignment.course_classs.school_class,assignment.course_classs.school_class.users&$select=ass_time,jc_create_time,stu_confirm,stu_descs,stu_file,parent_confirm,parent_descs,teacher_confirm,teacher_descs,teacher_score,user.first_name,user.last_name,assignment.title,assignment.jc_create_time,assignment.description,assignment.due_time,assignment.file,assignment.course_classs.school_class.title,assignment.course_classs.course.title,assignment.users.first_name,assignment.users.last_name,assignment.course_classs.school_class.users.first_name,assignment.course_classs.school_class.users.last_name`;

      axios
        .get(`https://${host}/${url}`, {
          headers: headersAcademic,
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {});
    }
  }, [isOpen, userId]);

  useEffect(() => {
  
    if (data?.length === 0) {
    
      toast.error("این دانش اموز پاسخی ثبت نکرده است");
    }
  }, [data]); 

  const handleFileUpload = async (files: any) => {
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
        `https://${host}//schoolservice/addMultiImage`,
        formData,
        {
          headers: {
            Authorization: JSON.parse(userData)?.token,
          },
        }
      );

      console.log("Upload response:", response.data);
      setUploadedFileUrls(response.data);
   
    } catch (error) {
      console.error("Upload error:", error);

    
    }
  };

  // const handleSubmit = () => {
  //   const postData = {
  //     teacher_confirm: teacherOpinion,
  //     teacher_descs: teacherDescription,
  //     // Add other necessary data properties if needed
  //   };

  //   axios
  //     .post(
  //       `https://mohammadfarhadi.classeh.ir/api/v3/Assignmentresult/${data[0].id}`,
  //       postData,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: JSON.parse(userData)?.token,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log("Post response:", response.data);
  //       if (response.data.result_type === "error") {
  //         toast.error(response.data.message);
  //       }
  //       // Handle the response as needed
  //     })
  //     .catch((error) => {
  //       console.error("Post error:", error);
  //       // Handle the error gracefully
  //     });
  // };

  const handleSubmit = async () => {
    const { description: extractedDesc, link: extractedLink } =
      data && data[0]?.teacher_descs
        ? extractDescriptionAndLink(data[0]?.teacher_descs)
        : { description: "", link: "" };

    let teacherDescWithFile = teacherDescription;
    if (uploadedFileUrls.length > 0) {
      const fileUrlsWithPrefix = uploadedFileUrls.map((url) => `_file_${url}`);
      teacherDescWithFile = `${teacherDescWithFile}_${fileUrlsWithPrefix.join(
        "_file_"
      )}`;
    }

    teacherDescWithFile = teacherDescWithFile.replace(/_{2,}/g, "_");

    const postData = {
      teacher_confirm: teacherOpinion,
      teacher_descs: teacherDescWithFile,
    };

    console.log(postData);

    try {
      const response = await axios.post(
        `https://${host}/api/v3/Assignmentresult/${data[0].id}`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(userData)?.token,
          },
        }
      );

      console.log("Post response:", response.data);
    
    } catch (error) {
      console.error("Post error:", error);
      
    }
  };

  const { description, link } =
    data && data[0]?.teacher_descs
      ? extractDescriptionAndLink(data[0]?.teacher_descs)
      : { description: "", link: "" };

  return (
    <div
      className={`fixed inset-0 overflow-y-auto ${isOpen ? "block" : "hidden"}`}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {data && (
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex items-center gap-x-2">
                <p>تایید انجام تکلیف</p>
                <p>{data[0]?.stu_confirm}</p>
              </div>
              <div className="flex items-center gap-x-2">
                <p> زمان ثبت جواب </p>
                <p>
                  {" "}
                  {moment.unix(data[0]?.jc_create_time).format("jYYYY/jM/jD")}
                </p>
              </div>

              <div className="flex items-center gap-x-2">
                <p> زمان انجام تکلیف </p>
                <p> {data[0]?.ass_time} دقیقه</p>
              </div>

              <div className="flex items-center gap-x-2">
                <p> توضیحات دانش آموز </p>
                <p> {data[0]?.stu_descs} دقیقه</p>
              </div>

              {data[0]?.stu_file && (
                <div className="mt-4">
                  <p className="text-sm font-semibold">فایل‌ها:</p>
                  <div className="mt-2">
                    {JSON.parse(data[0].stu_file).map(
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
          )}

          {data && data[0]?.teacher_confirm === null && (
            <form>
              <div className="flex items-center gap-x-2">
                <p>نظر معلم:</p>
                <label>
                  <input
                    type="radio"
                    value="خیلی خوب"
                    onChange={(e) => setTeacherOpinion(e.target.value)}
                    checked={teacherOpinion === "خیلی خوب"}
                  />
                  خیلی خوب
                </label>

                <label>
                  <input
                    type="radio"
                    value=" خوب"
                    onChange={(e) => setTeacherOpinion(e.target.value)}
                    checked={teacherOpinion === " خوب"}
                  />
                  خوب
                </label>

                <label>
                  <input
                    type="radio"
                    value=" متوسط"
                    onChange={(e) => setTeacherOpinion(e.target.value)}
                    checked={teacherOpinion === " متوسط"}
                  />
                  متوسط
                </label>

                <label>
                  <input
                    type="radio"
                    value=" ضعیف"
                    onChange={(e) => setTeacherOpinion(e.target.value)}
                    checked={teacherOpinion === " ضعیف"}
                  />
                  ضعیف
                </label>
              </div>

              <div className="flex items-center gap-x-2 mt-4">
                <p>توضیحات:</p>
                <textarea
                  value={teacherDescription}
                  onChange={(e) => setTeacherDescription(e.target.value)}
                  rows={4}
                  cols={50}
                />
              </div>

              <div className="mt-4">
                <p className="text-sm font-semibold">آپلود فایل:</p>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileUpload(e.target.files)}
                />
              </div>
            </form>
          )}

          {data &&
            data[0]?.teacher_confirm !== null && ( 
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <p>نظر معلم : {data[0]?.teacher_confirm}</p>
                <p>توضیحات معلم: {description}</p>
                {/* Convert the extracted link to an anchor tag */}
                {/* <a href={link} target="_blank" rel="noopener noreferrer">
                  فایل معلم
                </a> */}
                <img src={link} />
              </div>
            )}

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => {
                onClose();
              }}
            >
              Close
            </button>
            {data && data[0]?.teacher_confirm === null && (
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleSubmit}
              >
                ثبت
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnsAssignmentModaldal;
