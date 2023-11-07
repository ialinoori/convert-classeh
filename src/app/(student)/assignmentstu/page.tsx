import Link from "next/link";
import React from "react";

const mockAssignMnet = [
  { id: 1, lesson: "کلاس یک", title: "عنوان تکلیف علی", Adddate: "1402/8/13" },
  { id: 2, lesson: "کلاس دو", title: "عنوان تکلیف ", Adddate: "1402/10/13" },
];

const page = () => {
  return (
    <div className="container my-12">
      {mockAssignMnet.map((item) => (
        <div
          key={item.id}
          className="bg-white mb-4 mx-auto w-[60%] shadow-md rounded-lg p-4"
        >
          <p>حل تکلیف درس درس فنی (تکلیف:  {item.title})</p>
          <div className="flex mt-2 border-t border-slate-400 py-2 justify-between">
        <Link href={`assignmentstu/${item.id}`}>
        <button className="bg-blue-500 text-white p-2  px-6 rounded-md">
              نمایش
            </button>
        </Link>
            <div className="flex gap-x-2">
              <span>{item.Adddate}</span>
              <span>23:00:00</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default page;
