"use client";

import { useState, useEffect, useRef } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { MdCalendarToday } from "react-icons/md";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function DateRangePicker({ range, setRange }) {
    const [showPicker, setShowPicker] = useState(false);
    const pickerRef = useRef(null);

    // Hide calendar on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target)) {
                setShowPicker(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle calendar date selection
    const handleSelect = (item) => {
        setRange([item.selection]);
        const { startDate, endDate } = item.selection;
        if (startDate && endDate && startDate !== endDate) {
            setShowPicker(false);
        }
    };

    return (
        <div className="relative w-full">
            <button
                type="button"
                onClick={() => setShowPicker(!showPicker)}
                className="w-full h-[32px] flex items-center justify-between border border-gray-300 rounded px-3 py-[7px] mb-1 bg-white text-gray-700 text-xxs hover:border-gray-400 transition"
            >
                <span className={range[0].startDate && range[0].endDate ? "text-gray-700" : "text-gray-400"}>
                    {range[0].startDate && range[0].endDate
                        ? `${format(range[0].startDate, "dd MMM yyyy")} - ${format(
                              range[0].endDate,
                              "dd MMM yyyy"
                          )}`
                        : "Range"}
                </span>
                <MdCalendarToday className="text-gray-900 text-xxs" />
            </button>

            {showPicker && (
                <div
                    ref={pickerRef}
                    className="absolute right-0 z-50 mt-2 bg-white rounded-md shadow-xl border border-gray-200"
                >
                    <DateRange
                        editableDateInputs={true}
                        onChange={handleSelect}
                        moveRangeOnFirstSelection={false}
                        ranges={range}
                        rangeColors={["#2563eb"]}
                        months={1}
                        direction="horizontal"
                        showDateDisplay={false}
                    />
                </div>
            )}
        </div>
    );
}
