"use client";
import React, { useEffect, useState } from "react";
import Input from "../../_components/input/input";
import Image from "next/image";
import Link from "next/link";
import { useFormState } from "react-dom";
import createAccount from "./actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [usernameError, setUsernameError] = useState("");
  const { username, password } = formData;

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
  const initialState = {
    error: false,
    success: false,
    response: null,
  };

  const [state, formAction] = useFormState(createAccount, initialState);

  useEffect(() => {
    if (state.error) {
      toast.error(state.response.message);
    } else if (state.success) {
      toast.success(state.response.message);
      router.push("/createassignment");
    }
  }, [state]);

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

        <form action={formAction} method="POST">
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

export default page;
