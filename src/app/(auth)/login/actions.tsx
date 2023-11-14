"use server";
import { cookies } from "next/headers";

const createAccount = async (appName: string, formData: FormData) => {
  console.log(appName);

  const username = formData?.get("username");
  const password = formData?.get("password");

  const data = {
    username,
    password,
  };

  try {
    const response = await fetch(
      `https://mohammadfarhadi.classeh.ir/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const responseData = await response.json();

    if (responseData.result_type === "success") {
      cookies().set("token", responseData.data.token);

      return { success: true, response: responseData };
    } else {
      return { error: true, response: responseData };
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
  }
};

export default createAccount;
