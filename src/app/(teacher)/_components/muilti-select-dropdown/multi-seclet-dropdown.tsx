"use client"
import React, { useState, useEffect, useRef } from "react";

const mockClasses = [
  { id: 1, name: "Class One" },
  { id: 2, name: "Class Two" },
];

const mockStudents = [
  { id: 1, name: "Student 1", classId: 1 },
  { id: 2, name: "Student 2", classId: 1 },
  { id: 3, name: "Student 3", classId: 2 },
  { id: 4, name: "Student 4", classId: 2 },
];

const MultiSelectDropdown = ({ onChange, newOptionId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClassClick = (classId) => {
    if (selectedClasses.includes(classId)) {
      setSelectedClasses(selectedClasses.filter((id) => id !== classId));
    } else {
      setSelectedClasses([...selectedClasses, classId]);
    }
  };

  const handleStudentClick = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  useEffect(() => {
    if (typeof onChange === "function") {
      onChange(selectedStudents);
    }
  }, [selectedStudents]);

  const filteredStudents = mockStudents.filter((student) =>
    selectedClasses.includes(student.classId)
  );

  const removeSelectedClass = (classId) => {
    setSelectedClasses(selectedClasses.filter((id) => id !== classId));
  };

  return (
    <div className="relative z-50 mb-4 w-full" ref={dropdownRef}>
      <div
        className={`w-full bg-white border border-[#D9D9D9] rounded-[2px] shadow-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
          selectedClasses.length > 0 ? "pt-6 pb-2" : "py-3 px-4"
        }`}
        onClick={toggleDropdown}
      >
        {selectedClasses.length === 0 ? " کلاس یا دانش آموزان را انتخاب کنید" : null}
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg">
          <div className="px-4 py-2">
            {/* <div className="font-bold"> کلاس یا دانش آموزان را انتخاب کنید</div> */}
            {mockClasses.map((classOption) => (
              <label
                key={classOption.id}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                  value={classOption.id}
                  checked={selectedClasses.includes(classOption.id)}
                  onChange={() => handleClassClick(classOption.id)}
                />
                <span className="ml-2 text-sm">{classOption.name}</span>
             
              </label>
            ))}
          </div>
          {selectedClasses.length > 0 && (
            <div className="px-4 py-2">
              <input
                type="text"
                className="w-full focus:outline-none placeholder-text-[#cac9c967] border border-gray-200 rounded-md py-2 px-3"
                placeholder=" جست و جوی دانش آموزان"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <p className="font-bold pr-4 my-2">لیست دانش آموزان</p>
              {filteredStudents
                .filter((student) =>
                  student.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((student) => (
                  <label
                    key={student.id}
                    className="flex items-center px-4 py-2 cursor-pointer hover-bg-gray-100"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => handleStudentClick(student.id)}
                    />
                    <span className="ml-2 text-sm">{student.name}</span>
                  </label>
                ))}
            </div>
          )}
        </div>
      )}
      <div className="my-4">
        {selectedClasses.length > 0 && (
          <h2 className="text-lg font-semibold mb-4 pb-2">
            Selected Classes and Students:
          </h2>
        )}
        {selectedClasses.map((classId) => (
          <div key={classId} className="mt-2 border rounded p-2">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg">
                {mockClasses.find((classOption) => classOption.id === classId)
                  ?.name}
              </p>
              <button
                className="text-red-600"
                onClick={() => removeSelectedClass(classId)}
              >
                X
              </button>
            </div>
            <div className="mt-2">
              {selectedStudents
                .filter(
                  (studentId) =>
                    mockStudents.find((student) => student.id === studentId)
                      ?.classId === classId
                )
                .map((studentId) => (
                  <p key={studentId} className="ml-2">
                    {mockStudents.find((student) => student.id === studentId)
                      ?.name}
                  </p>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelectDropdown;
