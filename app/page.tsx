"use client"

import React, { useState } from "react";
import MultiSelectDropdown from "./_components/muilti-select-dropdown/multi-seclet-dropdown";
import DatePickerr from "./_components/datepicker/datepicker";

const Page = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (e) => {
    const files = e.target.files;
    const fileList = Array.from(files);
    setUploadedFiles(fileList);
  };

  return (
    <div className="container mx-auto my-16">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <MultiSelectDropdown />

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="input1">
            عنوان
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="input1"
            type="text"
            placeholder="عنوان تکلیف"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="input2">
            متن
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="input2"
            type="text"
            placeholder="متن تکلیف"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fileInput">
            آپلود فایل‌ها
          </label>
          <input
            type="file"
            id="fileInput"
            className="mb-2"
            onChange={handleFileUpload}
            multiple
          />
          <ul className="list-disc pl-4">
            {uploadedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
        <DatePickerr />
      </form>
    </div>
  );
};

export default Page;
