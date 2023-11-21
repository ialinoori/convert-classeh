"use client";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");

    router.push("/login");
  };

  return (
    <div>
      <div>پروفایل</div>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
      >
        خروج
      </button>
    </div>
  );
};

export default Page;


// "use client";

// import Link from "next/link";
// import React, { useEffect, useState } from "react";

// interface Role {
//   discr: string;
//   en_title: string;
//   fa_title: string;
//   id: number;
// }

// const Page = () => {
//   const [userData, setUserData] = useState<string>("");

//   useEffect(() => {
//     if (!userData) {
//       setUserData(localStorage.getItem("userData") || "");
//     }
//   }, []);

//   const roles: Role[] | null = userData ? JSON.parse(userData)?.roles : null;

//   const determineHref = () => {
//     if (roles) {
//       const userRole = roles.find((role: Role) => role.en_title === "student");
//       if (userRole) {
//         return "/assignmentstu";
//       } else {
//         return "/assignments";
//       }
//     }
//     return "/";
//   };

//   return (
//     <div className="container my-32">
//       <div className="">
//         <Link href={determineHref()}>
//           <button className="bg-green-500 rounded-md p-4">
//             {roles && roles.find((role: Role) => role.en_title === "student")
//               ? "تکالیف دانش‌آموز"
//               : "تکالیف معلم"}
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Page;

