
"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const menuItems = [
  { title: " خانه", href: "/" },
  { title: "  معلم ", href: "/createassignment" },
  { title: " دانش آموز ", href: "/assignmentstu" },
];

const Footer = () => {
  const pathname = usePathname();
  return (
    <div className="bg-cyan-600 px-12 w-full h-16 fixed bottom-0">
      <div className="flex justify-between  items-center h-full">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link   className={`text-white transition-colors pb-2 ${
              isActive &&
              "border-b-2 text-black  border-black"
            }`} href={item.href}>
              {item.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
