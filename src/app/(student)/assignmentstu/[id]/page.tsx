"use client";

import React, { useState } from "react";

const Page = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState(""); // State to track the selected time
    const [uploadedFiles, setUploadedFiles] = useState([]); // State to track the uploaded files

    const handleFileUpload = (e:any) => {
      const files = e.target.files;
      const fileList = Array.from(files);
      // setUploadedFiles(fileList);
    };
  
    // Function to open the modal
    const openModal = () => {
      setModalOpen(true);
    };
  
    // Function to close the modal
    const closeModal = () => {
      setModalOpen(false);
    };
  
    // Function to handle radio button selection
    const handleRadioChange = (e:any) => {
      setSelectedTime(e.target.value);
    };
  return (
    ""
    // <div className="container my-12">
    //   <div className="flex mb-2 items-center justify-center">
    //     <button
    //       className="w-[60%] bg-blue-400 text-white px-8 py-2 rounded-md"
    //       onClick={openModal}
    //     >
    //       ثبت پاسخ
    //     </button>
    //   </div>
    //   {/* Modal */}
    //   {isModalOpen && (
    //     <div className="modal">
    //       <div className="modal-content relative">
    //         <div className="mb-8">
    //           <p>تایید انجام تکلیف</p>
    //           <div>
    //             <label>
    //               <input
    //                 type="radio"
    //                 name="timeOption"
    //                 value="1"
    //                 onChange={handleRadioChange}
    //               />
    //               انجام شد
    //             </label>
    //           </div>
    //           <div>
    //             <label>
    //               <input
    //                 type="radio"
    //                 name="timeOption"
    //                 value="0"
    //                 onChange={handleRadioChange}
    //               />
    //               انجام نشد
    //             </label>
    //           </div>
    //         </div>
    //         {selectedTime === "1" && ( // Conditionally render the second set of radio buttons
    //           <div className="mb-8">
    //             <p>زمان انجام تکلیف</p>
    //             <div>
    //               <label>
    //                 <input
    //                   type="radio"
    //                   name="timeOptionn"
    //                   value="15 دقیقه"
    //                 />
    //                 15 دقیقه
    //               </label>
    //             </div>
    //             <div>
    //               <label>
    //                 <input
    //                   type="radio"
    //                   name="timeOptionn"
    //                   value="20 دقیقه"
    //                 />
    //                 20 دقیقه
    //               </label>
    //             </div>
    //           </div>
    //         )}
    //         <div className="mb-8">
    //             <label className="font-bold">توضیحات</label>
    //             <input className="border block border-slate-400 rounded-md"/>

    //         </div>
    //         <div className="mb-8">
    //           <label className="font-bold mb-4">فایل پیوست</label>
    //           <input
    //             type="file"
    //             id="fileInput"
    //             className="border mt-2 block border-slate-400 rounded-md"
    //             onChange={handleFileUpload}
    //             multiple
    //           />
    //           <ul className="list-disc pl-4">
    //             {uploadedFiles.map((file, index) => (
    //               // <li key={index}>{file.name}</li>
    //             ))}
    //           </ul>
    //         </div>

    //         <button onClick={closeModal} className="absolute left-2 top-2">Close</button>
    //         <button onClick={closeModal} className="bg-green-500 text-white w-full rounded-md px-4 py-2">ثبت پاسخ</button>
    //       </div>
    //     </div>
    //   )}
    //   <div className="bg-white mb-4 mx-auto w-[60%] shadow-md rounded-lg">
    //     <div className="bg-slate-600 p-4">
    //       <p className="text-white">اطلاعات تکلیف</p>
    //     </div>
    //     <div className="border-b p-4 border-b-slate-500">
    //       <p className="font-bold">عنوان:</p>
    //       <p>عنوان تکلیف علی</p>
    //     </div>
    //     <div className="border-b p-4 border-b-slate-500">
    //       <p className="font-bold">توضیحات:</p>
    //       <p>متن تکلیف علی</p>
    //     </div>
    //     <div className="border-b p-4 border-b-slate-500">
    //       <p className="font-bold">فایل پیوست:</p>
    //       <p>مشاهده فایل پیوست</p>
    //     </div>
    //     <div className="border-b p-4 border-b-slate-500">
    //       <div className="flex mb-1 items-center gap-x-2">
    //         <p>تاریخ ثبت:</p>
    //         <p>1402/8/13</p>
    //       </div>
    //       <div className="flex mb-1 items-center gap-x-2">
    //         <p>فرصت انجام تکلیف:</p>
    //         <p>1402/8/14</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Page;
