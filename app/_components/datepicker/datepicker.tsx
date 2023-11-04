"use client";

import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

const DatePickerr = () => {
  const handleDateChange = (selectedDate) => {
    console.log("Selected date:", selectedDate.format("HH:mm:ss YYYY/MM/DD"));
  };
  return (
    <>
      <div style={{ direction: "rtl" }}>
        <DatePicker
          format="YYYY/MM/DD HH:mm:ss "
          calendar={persian}
          locale={persian_fa}
          placeholder="فرصت انجام"
          calendarPosition="bottom-right"
          animations={[
            transition({
              from: 35,
              transition: "all 600ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
            }),
            opacity({ from: 0.1, to: 0.8, duration: 1000 }),
          ]}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "18px 5px",
            borderRadius: "2px",
            borderColor: "#D9D9D9",
          }}
          containerStyle={{
            width: "100%",
          }}
          plugins={[
            <TimePicker position="bottom" hStep={2} mStep={3} sStep={4} />,
          ]}
          onChange={handleDateChange}
        />
      </div>
    </>
  );
};

export default DatePickerr;
