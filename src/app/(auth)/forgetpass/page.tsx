"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import Input from "../../_components/input/input";
import Image from "next/image";
import { useFormState } from "react-dom";
import forgetPassWordAction from "./actions";
import { useSearchParams } from "next/navigation";

const PasswordResetForm = () => {
  const [formData, setFormData] = useState({
    username: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const search = useSearchParams();
  const appName = search.get("AppName") ?? "";

  const { username } = formData;

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };



  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await fetch(`https://${appName}/schoolservice/smsForgetPass`, {
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
        // You can add any additional logic here
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="md:w-[428px]  w-[100%] h-auto md:border p-[32px] md:border-[#F4F4F4]">
        <Image
          className="mx-auto mb-4  "
          src="/images/logo.svg"
          width={60}
          height={60}
          alt=""
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
              value={username}
              onChange={handleInputChange}
              required="true"
            />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full mb-2 mt-16 bg-[#0A4471] text-white p-2 rounded hover:bg-blue-600 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "در حال ورود..." : "ورود"}
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

export default PasswordResetForm;
