"use client";
import { useState } from "react";

const Modal = ({ isOpen, onClose, users, setSelectedUsers, selectedUsers }:any) => {
  const handleCheckboxChange = (userId:any) => {
    setSelectedUsers((prevSelectedUsers:any) => {
      if (prevSelectedUsers.includes(userId)) {
        // If user is already selected, remove them
        return prevSelectedUsers.filter((id:any) => id !== userId);
      } else {
        // If user is not selected, add them
        return [...prevSelectedUsers, userId];
      }
    });
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
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {/* Display the list of users with checkboxes */}
            {users.map((user:any) => (
              <div key={user.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`user-${user.id}`}
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleCheckboxChange(user.id)}
                  className="mr-2"
                />
                <label htmlFor={`user-${user.id}`}>
                  {user.first_name} {user.last_name}
                </label>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => {
                onClose();
                // Pass the selected users back to the calling component
                // or perform any other action with the selected users
                console.log("Selected Users:", selectedUsers);
              }}
            >
              Close
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => {
                // Log the selected user IDs when the button is clicked
                console.log("Selected Users IDs:", selectedUsers);
                onClose();
                
               
              }}
            >
              ثبت
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
