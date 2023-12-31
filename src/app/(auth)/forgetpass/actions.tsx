"use server";

const forgetPassWordAction = async (prve: any, formData: FormData) => {
  const username = formData.get("username");

  const data = {
    username,
  };

  try {
    const response = await fetch(
        "https://mohammadfarhadi.classeh.ir/schoolservice/smsForgetPass",
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
     

      return { success: true, response: responseData };
    } else {
      return { error: true, response: responseData };
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
  }
};

export default forgetPassWordAction;
