"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
import moment from "moment-jalaali"; // Correct import for moment-jalaali


const Assignment = () => {
  const [assignments, setAssignments] = React.useState<any>([]);

  const now = (Date.now() / 1000) as number
  const time = now;
 
  useEffect(() => {
    const userData = localStorage.getItem("userData") as string;
    const headersAcademic = {
      Authorization: JSON.parse(userData).token,
    };
    const url = `api/v3/assignment?$filter={"andX": [{"eq":{"jc_status": "1"}},{"andX":[{"eq":{"course_classs.user.id":${1563}}},{"andX":[{"gt":{"course_classs.school_class.academic_year.end_date":"${time}"}},{"lt":{"course_classs.school_class.academic_year.start_date":"${time}"}}]}]}]}&$join=user,users,course_classs,course_classs.course,course_classs.user,course_classs.school_class,course_classs.school_class.academic_year&$orderby=jc_create_time&$ordertype=desc&$select=type,title,jc_create_time,course_classs.school_class.title,course_classs.course.title,due_time`;
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
  return (
    <div>
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
              <p className="text-xs"> {moment.unix(assignment?.due_time).format("jYYYY/jM/jD")}</p>
              <p>Class: {courseClass.school_class.title}</p>
              <p>Course: {courseClass.course.title}</p>
              {/* Add any other relevant details from courseClass */}
              <div className="flex mt-2 border-t border-slate-400 py-2 justify-between">
                <Link href={`/assignments/${assignment.id}`}>
                  <button className="bg-blue-500 text-white p-2 rounded-md">
                    ویرایش
                  </button>
                </Link>
            <Link href={`/assignments/view/${assignment.id}`}>
            <button className="bg-green-500 text-white p-2 rounded-md">
                  تکالیف دانش اموزان
                </button>
            </Link>
                <button className="bg-red-500 text-white p-2 rounded-md">
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Assignment;
