"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";

const mockAssignMnet = [
  { id: 1, lesson: "کلاس یک", title: "عنوان تکلیف علی", Adddate: "1402/8/13" },
  { id: 2, lesson: "کلاس دو", title: "عنوان تکلیف ", Adddate: "1402/10/13" },
];

const AssignmentStu = () => {
  const [assignments, setAssignments] = React.useState([]);

  const now = (Date.now() / 1000) as number
  const time = now;

  useEffect(() => {
    const userData = localStorage.getItem("userData") as string;
    const headersAcademic = {
      Authorization: JSON.parse(userData).token,
    };
    const myStudent = undefined;
    const uUiI = JSON.parse(userData).id;

    const url = `/api/v3/assignment?$filter={"andX": [{"eq":{"jc_status": "1"}},{"andX":[{"eq":{"course_classs.school_class.users.id":${uUiI}}},{"andX":[{"gt":{"course_classs.school_class.academic_year.end_date":"${time}"}},{"lt":{"course_classs.school_class.academic_year.start_date":"${time}"}}]}]}]}&$join=user,users,course_classs,course_classs.course,course_classs.user,course_classs.school_class,course_classs.school_class.academic_year,course_classs.school_class.users&$orderby=jc_create_time&$ordertype=desc&$select=type,title,jc_create_time,course_classs.school_class.title,course_classs.user.first_name,course_classs.user.last_name,course_classs.course.title,due_time`;
    axios
      .get(`https://mohammadfarhadi.classeh.ir/${url}`, {
        headers: headersAcademic,
      })
      .then((res) => {
        console.log(res.data);
        setAssignments(res.data);
      })
      .catch((error) => {});
  }, []);

  console.log(assignments);
  
  return (
    <div className="container my-12">
      {assignments.map((assignment:any) => (
        <div
          key={assignment.id}
          className="bg-white mb-4 mx-auto w-[60%] shadow-md rounded-lg p-4"
        >
          <p>حل تکلیف (تکلیف: {assignment.title})</p>
          {/* Mapping over classes within each assignment */}
          {assignment.course_classs.map((courseClass:any, index:any) => (
            <div
              key={index}
              className="bg-white mb-4 mx-auto w-[60%] shadow-md rounded-lg p-4"
            >
              <p>Class: {courseClass.school_class.title}</p>
              <p>Course: {courseClass.course.title}</p>
              {/* Add any other relevant details from courseClass */}
              <div className="flex mt-2 border-t border-slate-400 py-2 justify-between">
                <Link href={`/assignmentstu/${assignment.id}`}>
                <button className="bg-blue-500 text-white p-2 rounded-md">مشاهده</button>

                </Link>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AssignmentStu;
