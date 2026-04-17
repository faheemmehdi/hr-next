"use client";
import { useState } from "react";
import CustomSelect from "y@/app/components/CustomSelect";
import ToggleSwitch from "y@/app/components/ToggleSwitch";
import Button from "y@/app/components/Button";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import { FiCalendar, FiClock, FiGlobe } from "react-icons/fi";

const timezoneOptions = mapSelectOptions(
  [
    { id: "Asia/Karachi", name: "Asia/Karachi (UTC+5)" },
    { id: "Asia/Dubai", name: "Asia/Dubai (UTC+4)" },
    { id: "Europe/London", name: "Europe/London (UTC+0)" },
    { id: "America/New_York", name: "America/New_York (UTC-5)" },
  ],
  "id",
  "name"
);

const localeOptions = mapSelectOptions(
  [
    { id: "en-US", name: "English (US)" },
    { id: "en-GB", name: "English (UK)" },
    { id: "en-IN", name: "English (India)" },
    { id: "ur-PK", name: "Urdu (Pakistan)" },
  ],
  "id",
  "name"
);

const workWeekOptions = mapSelectOptions(
  [
    { id: "mon-fri", name: "Monday - Friday" },
    { id: "sun-thu", name: "Sunday - Thursday" },
    { id: "mon-sat", name: "Monday - Saturday" },
  ],
  "id",
  "name"
);

const firstDayOptions = mapSelectOptions(
  [
    { id: "Monday", name: "Monday" },
    { id: "Sunday", name: "Sunday" },
    { id: "Saturday", name: "Saturday" },
  ],
  "id",
  "name"
);

const dateFormatOptions = mapSelectOptions(
  [
    { id: "DD/MM/YYYY", name: "DD/MM/YYYY" },
    { id: "MM/DD/YYYY", name: "MM/DD/YYYY" },
    { id: "YYYY-MM-DD", name: "YYYY-MM-DD" },
    { id: "DD MMM YYYY", name: "DD MMM YYYY" },
  ],
  "id",
  "name"
);

export default function LocalSetting() {
  const [timezone, setTimezone] = useState("Asia/Karachi");
  const [locale, setLocale] = useState("en-US");
  const [workWeek, setWorkWeek] = useState("mon-fri");
  const [firstDay, setFirstDay] = useState("Monday");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [enable24Hour, setEnable24Hour] = useState(true);

  const resetLocale = () => {
    setTimezone("Asia/Karachi");
    setLocale("en-US");
    setWorkWeek("mon-fri");
    setFirstDay("Monday");
    setDateFormat("DD/MM/YYYY");
    setEnable24Hour(true);
  };

  const handleSaveLocale = () => {
    console.log("Locale settings", {
      timezone,
      locale,
      workWeek,
      firstDay,
      dateFormat,
      enable24Hour,
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-lg border border-gray-200 bg-[#f8fbff] p-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-gray-500">Timezone</p>
            <FiGlobe className="text-[#315d9c]" size={13} />
          </div>
          <p className="text-xs font-semibold text-gray-800 mt-1">{timezone}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-[#f7faf8] p-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-gray-500">Date Format</p>
            <FiCalendar className="text-[#2f7d4f]" size={13} />
          </div>
          <p className="text-xs font-semibold text-gray-800 mt-1">{dateFormat}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-[#fff8ed] p-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-gray-500">Time Mode</p>
            <FiClock className="text-[#9a5d1d]" size={13} />
          </div>
          <p className="text-xs font-semibold text-gray-800 mt-1">{enable24Hour ? "24 Hour" : "12 Hour"}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h2 className="text-sm font-semibold text-gray-700 pb-2 border-b border-gray-200">
          Locale & Regional Settings
        </h2>
        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <CustomSelect
            name="timezone"
            value={timezone}
            label="Timezone"
            placeholder="Select timezone"
            onChange={setTimezone}
            options={timezoneOptions}
            controlHeight="2rem"
          />
          <CustomSelect
            name="locale"
            value={locale}
            label="Language / Locale"
            placeholder="Select language"
            onChange={setLocale}
            options={localeOptions}
            controlHeight="2rem"
          />
          <CustomSelect
            name="dateFormat"
            value={dateFormat}
            label="Date Format"
            placeholder="Date format"
            onChange={setDateFormat}
            options={dateFormatOptions}
            controlHeight="2rem"
          />
          <CustomSelect
            name="firstDay"
            value={firstDay}
            label="First Day of Week"
            placeholder="First day"
            onChange={setFirstDay}
            options={firstDayOptions}
            controlHeight="2rem"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h2 className="text-sm font-semibold text-gray-700 pb-2 border-b border-gray-200">
          Work Week Configuration
        </h2>
        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <CustomSelect
            name="workWeek"
            value={workWeek}
            label="Work Week"
            placeholder="Select work week"
            onChange={setWorkWeek}
            options={workWeekOptions}
            controlHeight="2rem"
          />
          <div className="flex items-center justify-between border border-gray-200 rounded px-3 py-2">
            <div>
              <p className="text-xxs font-medium text-gray-700">24 Hour Time Format</p>
              <p className="text-[10px] text-gray-500">
                Show time with 24-hour clock instead of AM/PM.
              </p>
            </div>
            <ToggleSwitch checked={enable24Hour} onChange={setEnable24Hour} />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-[#f9fafb] p-4">
        <p className="text-[10px] uppercase tracking-wide text-gray-500 mb-2">Current Configuration</p>
        <div className="grid md:grid-cols-3 gap-3 text-xxs">
          <div>
            <p className="text-gray-500">Timezone</p>
            <p className="font-semibold text-gray-800">{timezone}</p>
          </div>
          <div>
            <p className="text-gray-500">Locale</p>
            <p className="font-semibold text-gray-800">{locale}</p>
          </div>
          <div>
            <p className="text-gray-500">Work Week</p>
            <p className="font-semibold text-gray-800">
              {workWeekOptions.find((i) => i.value === workWeek)?.label || "-"}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Week Starts</p>
            <p className="font-semibold text-gray-800">{firstDay}</p>
          </div>
          <div>
            <p className="text-gray-500">Date Format</p>
            <p className="font-semibold text-gray-800">{dateFormat}</p>
          </div>
          <div>
            <p className="text-gray-500">Time Format</p>
            <p className="font-semibold text-gray-800">{enable24Hour ? "24 Hour" : "12 Hour"}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="cancel" type="button" onClick={resetLocale}>
          Reset
        </Button>
        <Button variant="success" type="button" onClick={handleSaveLocale}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
