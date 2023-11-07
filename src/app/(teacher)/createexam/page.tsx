"use client"
import React, { useState } from "react";
import DatePickerr from "../_components/datepicker/datepicker";
import TimePicker from "react-time-picker";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

const Page = () => {
  // Define a state variable to store the selected time
  const [time, setTime] = useState("12:00"); // Set an initial time if needed

  return (
    <div className="container my-12">
      <h1 className="text-center">ایجاد ازمون جدید</h1>
      <form className="px-8 mt-4">
        <div>
          <label>عنوان آزمون</label>
          <input className="border w-full mt-2 block border-slate-600 rounded-md px-4 py-1" />
        </div>

        <div className="mt-6">
          <DatePickerr />
        </div>

        <div className="mt-6">
          <label>زمان آزمون</label>
          <TimePicker
            onChange={setTime} // Update the selected time
            value={time} // Controlled component using state
             // Remove the default clear icon
            format="hh:mm a" // Customize the time format
            className="custom-time-picker" // Add a custom CSS class
          />
        </div>
      </form>
    </div>
  );
};

export default Page;
