"use client";
import React, { useEffect, useState } from "react";
import Input from "../../_components/input/input";
import Image from "next/image";
import Link from "next/link";
import { useFormState } from "react-dom";
import createAccount from "./actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

const LoginPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [usernameError, setUsernameError] = useState("");
  const { username, password } = formData;

  
  const search = useSearchParams();
  const appName = search.get("AppName") ?? "";

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "username") {
      const regex = /^[\u0600-\u06FFa-zA-Z0-9]+$/;
      if (!regex.test(value)) {
        setUsernameError("نام کاربری فقط می تواند شامل حروف و اعداد باشد.");
      } else {
        setUsernameError("");
      }
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://${appName}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      console.log(responseData);

      if (responseData.result_type === "success") {
        toast.success(responseData.message);
        Cookies.set("token", responseData.data.token, { expires: 7 });
        localStorage.setItem("userData", JSON.stringify(responseData.data));

        // Storing appName in localStorage
        localStorage.setItem("CONFIG", appName);

        router.push("/dashboard");
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="md:w-[428px] w-[100%]  h-auto md:border p-[32px] md:border-[#F4F4F4]">
        <Image
          className="mx-auto mb-4  "
          src="/images/logo.svg"
          width={60}
          height={60}
          alt="logo"
        />
        <h1 className="text-center mb-4 text-[16px] font-bold">
          ورود به مدرسه منتخب
        </h1>

        <form onSubmit={handleFormSubmit}>
          <div className="w-full py-2 flex items-center justify-center">
            <div className="flex flex-col gap-y-6">
              <Input
                label="نام کاربری"
                type="text"
                name="username"
                required="true"
                onChange={handleInputChange}
                value={username}
                error={usernameError}
              />

              <Input
                label=" رمز عبور"
                type="text"
                name="password"
                required="true"
                onChange={handleInputChange}
                value={password}
              />
            </div>
          </div>
          <Link
            className="text-[12px] font-[600] underline text-[#0A4471] pr-2 mt-2"
            href="/forgetpass"
          >
            رمز عبور خود را فراموش کرده اید؟
          </Link>

          <button
            type="submit"
            className={`w-full mb-2 mt-16 bg-[#0A4471] text-white p-2 rounded hover:bg-blue-600 `}
          >
            ثبت
          </button>
        </form>
        <p className=" text-center text-[12px] mt-2">
          حساب کاربری ندارید؟{" "}
          <Link className="text-[#0A4471] underline" href="/login">
            هم اکنون ثبت نام کنید
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
