"use client"
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get('AppName')

  console.log(search);
  

  
  

  const { username, password } = formData;

  const handleApiResponse = (response) => {
    if (response.data.result_type === "success") {
      toast.success(response.data.message);

      // Store the token in a cookie upon successful login
      Cookies.set("token", response.data.data.token, { expires: 7 }); // Expires in 7 days
      router.push("/createassignment")

    } else {
      toast.error(response.data.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const data = {
      username,
      password,
    };

    try {
      const response = await axios.post(
        `https://${search}/user/login`,
        data
      );
      console.log(response.data);
      handleApiResponse(response);
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white p-6 rounded shadow-md w-[90%] md:w-1/3"
      >
        <h2 className="text-2xl font-semibold mb-4">ورود</h2>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700 text-sm font-bold">
            نام کاربری
          </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700 text-sm font-bold">
            رمز عبور
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "در حال ورود..." : "ورود"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
