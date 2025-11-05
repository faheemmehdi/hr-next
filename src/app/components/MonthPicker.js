"use client";
import { forwardRef } from "react";
import { MdCalendarToday } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MonthPicker({ monthVal, setMonthVal }) {
    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <div
            className="w-full h-[32px] flex items-center justify-between border border-gray-300 rounded px-3 py-[7px] bg-white text-xxs hover:border-gray-400 transition cursor-default"
            onClick={onClick}
            ref={ref}
        >
            <input
                readOnly
                value={value || ""}
                className="w-full bg-transparent outline-none cursor-default text-gray-700"
                placeholder="Month"
            />
            <MdCalendarToday className="text-gray-900 text-xxs" />
        </div>
    ));

    return (
        <DatePicker
            selected={monthVal}
            onChange={(date) => setMonthVal(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            customInput={<CustomInput />}
        />
    );
}
