"use client"
import React from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Remove the token from the cookie
    Cookies.remove('token');

    // Redirect the user to the login page or any other desired page
    router.push('/login');
  };

  return (
    <div>
      <div>
        پروفایل
      </div>
      <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
        خروج
      </button>
    </div>
  );
};

export default Page;
