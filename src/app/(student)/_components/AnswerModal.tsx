"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const AnswerModal = ({ isOpen, onClose, id }:any) => {
  const [confirmation, setConfirmation] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedFileUrls, setUploadedFileUrls] = useState([]);

  const [isNotCompleted, setIsNotCompleted] = useState(false);

  const handleConfirmationChange = (e:any) => {
    setConfirmation(e.target.value);
    if (e.target.value === "انجام نشد") {
      setIsNotCompleted(true);
    } else {
      setIsNotCompleted(false);
    }
  };

  const handleDurationChange = (e:any) => {
    setDuration(e.target.value);
  };

  const handleDescriptionChange = (e:any) => {
    setDescription(e.target.value);
  };

  const userData = localStorage.getItem("userData");

  const token = userData ? JSON.parse(userData)?.token : null;


  const handleFileUpload = async (files:any) => {
    const base64Files: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
  
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          const base64Match = e.target.result.toString().match(/^data:(.*;base64,)?(.*)$/);
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
        "https://mohammadfarhadi.classeh.ir//schoolservice/addMultiImage",
        formData,
        {
          headers: {
            Authorization: token,
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
    // Define time mappings for duration options
    const timeMappings :any = {
      "15min": 15,
      "30min": 30,
      "45min": 45,
      "60min": 60,
      over60min: 100,
    };

    // Map the selected duration option to its time value
    const assTime = timeMappings[duration];

    // Prepare the data object
    const data = {
      stu_confirm: confirmation,
      ass_time: assTime?.toString() ? assTime?.toString() : "",
      stu_descs: description,
      stu_file: JSON.stringify(uploadedFileUrls),
      assignment: { id: id }, // Replace with the appropriate assignment ID
      id: id, // Replace with the appropriate ID for stu_conf
      user: { id: 1564 }, // Replace with the appropriate user ID
    };

    console.log("Data:", data);

    try {
      const response = await axios.post(
        "https://mohammadfarhadi.classeh.ir//api/v3/Assignmentresult",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      console.log("Post Response:", response.data);

      if (response.data.result_type === "success") {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }

      // Further logic based on the response if needed

      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Post Error:", error);
      // Handle error scenarios gracefully
    }

    // Further logic to handle or send 'data' where needed
    onClose();
  };

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
          <p className="text-lg font-bold p-4">تایید انجام تکلیف</p>

          <div className="p-4">
            <label className="block mb-2">
              <input
                type="radio"
                name="confirmationOption"
                value="انجام شد"
                checked={confirmation === "انجام شد"}
                onChange={handleConfirmationChange}
                className="mr-2 leading-tight"
              />
              <span className="text-sm">انجام شد</span>
            </label>

            <label className="block mb-2">
              <input
                type="radio"
                name="confirmationOption"
                value="انجام نشد"
                checked={confirmation === "انجام نشد"}
                onChange={handleConfirmationChange}
                className="mr-2 leading-tight"
              />
              <span className="text-sm">انجام نشد</span>
            </label>
          </div>

          {!isNotCompleted && (
            <div>
              <p className="text-lg font-bold p-4">زمان انجام</p>

              <div className="p-4">
                <label className="block mb-2">
                  <input
                    type="radio"
                    name="durationOption"
                    value="15min"
                    checked={duration === "15min"}
                    onChange={handleDurationChange}
                    className="mr-2 leading-tight"
                  />
                  <span className="text-sm">15 دقیقه</span>
                </label>

                <label className="block mb-2">
                  <input
                    type="radio"
                    name="durationOption"
                    value="30min"
                    checked={duration === "30min"}
                    onChange={handleDurationChange}
                    className="mr-2 leading-tight"
                  />
                  <span className="text-sm">30 دقیقه</span>
                </label>

                <label className="block mb-2">
                  <input
                    type="radio"
                    name="durationOption"
                    value="45min"
                    checked={duration === "45min"}
                    onChange={handleDurationChange}
                    className="mr-2 leading-tight"
                  />
                  <span className="text-sm">45 دقیقه</span>
                </label>

                <label className="block mb-2">
                  <input
                    type="radio"
                    name="durationOption"
                    value="60min"
                    checked={duration === "60min"}
                    onChange={handleDurationChange}
                    className="mr-2 leading-tight"
                  />
                  <span className="text-sm">60 دقیقه</span>
                </label>

                <label className="block mb-2">
                  <input
                    type="radio"
                    name="durationOption"
                    value="over60min"
                    checked={duration === "over60min"}
                    onChange={handleDurationChange}
                    className="mr-2 leading-tight"
                  />
                  <span className="text-sm">بیشتر از 60 دقیقه</span>
                </label>
              </div>
            </div>
          )}

          <div className="p-4">
            <label className="block mb-2">
              توضیحات:
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 mt-1"
                
                placeholder="توضیحات خود را وارد کنید..."
              ></textarea>
            </label>
          </div>

          <div className="p-4">
            <label className="block mb-2">
              فایل پیوست:
              <input
                type="file"
                multiple
                onChange={(e) => handleFileUpload(e.target.files)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 mt-1"
              />
            </label>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleSubmit}
            >
              ثبت
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              بستن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerModal;
