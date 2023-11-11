"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import Input from "../../_components/input/input";
import Image from "next/image";
import { useFormState } from "react-dom";
import forgetPassWordAction from "./actions";

const PasswordResetForm = () => {
  const [formData, setFormData] = useState({
    username: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { username } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const initialState = {
    error: false,
    success: false,
    response: null,
  };

  const [state, formAction] = useFormState(forgetPassWordAction, initialState);

  useEffect(() => {
    if (state.error) {
      toast.error(state.response.message);
    } else if (state.success) {
      toast.success(state.response.message);
    }
  }, [state]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="md:w-[428px]  w-[100%] h-auto md:border p-[32px] md:border-[#F4F4F4]">
        <Image
          className="mx-auto mb-4  "
          src="/images/logo.svg"
          width={60}
          height={60}
        />
        <h1 className="text-center mb-4 text-[16px] font-bold">
          ورود به مدرسه منتخب
        </h1>

        <form action={formAction}>
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
