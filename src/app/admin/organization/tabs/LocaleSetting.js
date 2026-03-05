"use client";
import { useState } from "react";
import Input from "y@/app/components/Input";
import CustomSelect from "y@/app/components/CustomSelect";
import ToggleSwitch from "y@/app/components/ToggleSwitch";
import Button from "y@/app/components/Button";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";

const timezoneOptions = mapSelectOptions(
  [
    { id: 1, name: "Asia/Karachi (UTC+5)" },
    { id: 2, name: "Asia/Dubai (UTC+4)" },
    { id: 3, name: "Europe/London (UTC+0)" },
    { id: 4, name: "America/New_York (UTC-5)" },
  ],
  "id",
  "name"
);

const localeOptions = mapSelectOptions(
  [
    { id: 1, name: "English (US)" },
    { id: 2, name: "English (UK)" },
    { id: 3, name: "English (India)" },
    { id: 4, name: "Urdu (Pakistan)" },
  ],
  "id",
  "name"
);

const workWeekOptions = mapSelectOptions(
  [
    { id: 1, name: "Monday – Friday" },
    { id: 2, name: "Sunday – Thursday" },
    { id: 3, name: "Monday – Saturday" },
  ],
  "id",
  "name"
);

const firstDayOptions = mapSelectOptions(
  [
    { id: 1, name: "Monday" },
    { id: 2, name: "Sunday" },
    { id: 3, name: "Saturday" },
  ],
  "id",
  "name"
);

const dateFormatOptions = mapSelectOptions(
  [
    { id: 1, name: "DD/MM/YYYY" },
    { id: 2, name: "MM/DD/YYYY" },
    { id: 3, name: "YYYY-MM-DD" },
    { id: 4, name: "DD MMM YYYY" },
  ],
  "id",
  "name"
);

export default function LocalSetting() {
  const [timezone, setTimezone] = useState("Asia/Karachi");
  const [locale, setLocale] = useState("en-US");
  const [workWeek, setWorkWeek] = useState("mon-fri");
  const [firstDay, setFirstDay] = useState("Monday");
  const [dateFormat, setDateFormat] = useState("DD-MM-YYYY");
  const [enable24Hour, setEnable24Hour] = useState(true);

  const resetLocale = () => {
    setTimezone("Asia/Karachi");
    setLocale("en-US");
    setWorkWeek("mon-fri");
    setFirstDay("Monday");
    setDateFormat("DD-MM-YYYY");
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
    <div className="max-w-6xl mx-auto space-y-8">

      {/* ================= Locale Settings ================= */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-6">
        <h2 className="text-base font-semibold mb-6 border-b border-gray-300 pb-3">
          Locale & Regional Settings
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
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

      {/* ================= Work Week ================= */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-6">
        <h2 className="text-base font-semibold mb-6 border-b border-gray-300 pb-3">
          Work Week Configuration
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <CustomSelect
            name="workWeek"
            value={workWeek}
            label="Work Week"
            placeholder="Select work week"
            onChange={setWorkWeek}
            options={workWeekOptions}
            controlHeight="2rem"
          />

          <div className="flex items-center justify-between mt-1 border border-gray-300 rounded-lg px-4 py-3">
            <div>
              <p className="text-xxs font-medium text-gray-700">
                24 Hour Time Format
              </p>
              <p className="text-xxs text-gray-500">
                Display time using 24-hour clock instead of AM/PM
              </p>
            </div>

            <ToggleSwitch
              checked={enable24Hour}
              onChange={setEnable24Hour}
            />
          </div>
        </div>
      </div>

      {/* ================= Summary Card ================= */}
      <div className="rounded-xl border bg-gradient-to-r from-slate-900 to-slate-700 text-white p-6 shadow-sm">
        <p className="text-xxs uppercase tracking-widest text-gray-300 mb-1">
          Current Configuration
        </p>

        <div className="grid md:grid-cols-3 gap-4 text-xxs">
          <div>
            <p className="text-gray-300">Timezone</p>
            <p className="font-semibold">{timezone}</p>
          </div>

          <div>
            <p className="text-gray-300">Locale</p>
            <p className="font-semibold">{locale}</p>
          </div>

          <div>
            <p className="text-gray-300">Work Week</p>
            <p className="font-semibold">
              {workWeekOptions.find((i) => i.id === workWeek)?.name}
            </p>
          </div>

          <div>
            <p className="text-gray-300">Week Starts</p>
            <p className="font-semibold">{firstDay}</p>
          </div>

          <div>
            <p className="text-gray-300">Date Format</p>
            <p className="font-semibold">{dateFormat}</p>
          </div>

          <div>
            <p className="text-gray-300">Time Format</p>
            <p className="font-semibold">
              {enable24Hour ? "24 Hour" : "12 Hour"}
            </p>
          </div>
        </div>
      </div>

      {/* ================= Actions ================= */}
      <div className="flex justify-end gap-4">
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