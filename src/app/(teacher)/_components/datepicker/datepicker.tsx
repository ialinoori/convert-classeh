import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const DatePickerr = ({handleDateChange}:any) => {
  

  return (
    <>
      <div style={{ direction: "rtl" }}>
        <DatePicker
          format="YYYY/MM/DD  "
          calendar={persian}
          locale={persian_fa}
          placeholder="فرصت انجام"
          calendarPosition="bottom-right"
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
          onChange={handleDateChange}
        />
      </div>
    </>
  );
};

export default DatePickerr;
