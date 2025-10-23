"use client";
import Layout from "y@/app/components/Layout";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { FaMapMarkerAlt, FaFingerprint, FaMobileAlt, FaQrcode, FaIdCard, FaUserCheck } from "react-icons/fa";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import CustomSelect from "y@/app/components/CustomSelect";
import Input from "y@/app/components/Input";
import Button from "y@/app/components/Button";
import ToggleSwitch from "y@/app/components/ToggleSwitch";
function SettingClient() {
    const [activeTab, setActiveTab] = useState("general");
    const [attendanceEnabled, setAttendanceEnabled] = useState(true);
    const [enableGeo, setEnableGeo] = useState(true);
    const [location, setLocation] = useState("");
    const [timeZone, setTimeZone] = useState("");
    const [geoRange, setGeoRange] = useState("");
    const [shift, setShift] = useState("");
    const [breakHours, setBreakHours] = useState("");
    const [breakStart, setBreakStart] = useState("");
    const [breakEnd, setBreakEnd] = useState("");
    const [officeStart, setOfficeStart] = useState("");
    const [officeEnd, setOfficeEnd] = useState("");
    const [error, setError] = useState(false);
    const [weekCheck, setWeekCheck] = useState(true);
    const [lateGrace, setLateGrace] = useState("");
    const [maxLate, setMaxLate] = useState("");
    const [deductionLate, setDeductionLate] = useState("");
    const [lateHalfday, setLateHalfday] = useState("");
    const [earlyGrace, setEarlyGrace] = useState("");
    const [maxEarlyLeave, setMaxEarlyLeave] = useState("");
    const [deductionEarlyLeave, setDeductionEarlyLeave] = useState("");
    const [earlyHalfday, setEarlyHalfday] = useState("");
    const [minOvertime, setMinOvertime] = useState("");
    const [maxOvertime, setMaxOvertime] = useState("");


    const [modes, setModes] = useState({
        biometric: false,
        rfid: false,
        mobile: false,
        qr: false,
        face: true,
    });
    const [workingDays, setWorkingDays] = useState({
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: false,
        sun: false,
    });
    const [weekendDays, setWeekendDays] = useState({
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: true,
        sun: true,
    });

    const handleModeToggle = (mode) => {
        setModes((prev) => ({ ...prev, [mode]: !prev[mode] }));
    };


    const locations = mapSelectOptions(
        [
            { id: 1, name: "Lahore" },
            { id: 2, name: "Multan" },
            { id: 3, name: "Karachi" },
            { id: 3, name: "Islamabad" },
            { id: 3, name: "Shaher Sultan" },
            { id: 3, name: "Rawalpindi" },
            { id: 3, name: "Kohat" },
        ],
        "id",
        "name"
    );
    const shifts = mapSelectOptions(
        [
            { id: 1, name: "Morning Shift" },
            { id: 2, name: "Evening Shift" },
            { id: 3, name: "Night Shift" }
        ],
        "id",
        "name"
    );
    const timeZones = mapSelectOptions(
        [
            { id: 1, name: "Asia/Karachi (Pakistan)" },
            { id: 2, name: "Asia/Dubai (Gulf)" },
            { id: 3, name: "Asia/Qatar (Arabian)" },
            { id: 4, name: "Asia/Kolkata (India)" },
            { id: 5, name: "Europe/London (British)" },
            { id: 6, name: "Europe/Berlin (Central European)" },
            { id: 7, name: "America/New_York (Eastern)" },
            { id: 8, name: "America/Los_Angeles (Pacific)" },
            { id: 9, name: "Australia/Sydney (Australian Eastern)" },
            { id: 10, name: "Asia/Singapore (Singapore)" },
        ],
        "id",
        "name"
    );

    const allModes = [
        { key: "biometric", label: "Biometric", icon: <FaFingerprint /> },
        { key: "rfid", label: "RFID", icon: <FaIdCard /> },
        { key: "mobile", label: "Mobile App", icon: <FaMobileAlt /> },
        { key: "qr", label: "QR Code", icon: <FaQrcode /> },
        { key: "face", label: "Face Recognition", icon: <FaUserCheck /> },
    ]

    const weekdays = [
        { key: "mon", label: "Monday" },
        { key: "tue", label: "Tueday" },
        { key: "wed", label: "Wedday" },
        { key: "thu", label: "Thuday" },
        { key: "fri", label: "Friday" },
        { key: "sat", label: "Satday" },
        { key: "sun", label: "Sunday" },
    ]

    const handleSave = (e) => {
        e.preventDefault();
        setWeekCheck(Object.values(workingDays).some((value) => value === true));
        setError(true)
    }



    return (
        <Layout>
            <div className="flex justify-between text-lg p-1 mb-1">
                <h2>Attendance Settings</h2>
            </div>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 p-5">
                <div className="flex gap-2 border-b-2 border-gray-100 font-medium">
                    <button
                        onClick={() => setActiveTab("general")}
                        className={`px-4 py-2 border-b-3 text-xs font-bold cursor-pointer ${activeTab === "general"
                            ? "border-[var(--active-tabs)] text-[var(--active-tabs)]"
                            : "border-transparent text-gray-600 hover:text-[var(--active-tabs)]"
                            }`}
                    >
                        General Settings
                    </button>
                    <button
                        onClick={() => setActiveTab("attendance")}
                        className={`px-4 py-2 border-b-3 text-xs font-bold cursor-pointer ${activeTab === "attendance"
                            ? "border-[var(--active-tabs)] text-[var(--active-tabs)]"
                            : "border-transparent text-gray-600 hover:text-[var(--active-tabs)]"
                            }`}
                    >
                        Attendance Rules
                    </button>

                </div>

                {/* Content Area */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mt-4">
                    {activeTab === "general" && (
                        <div className="w-full text-xxs">
                            <div className="w-full flex-col md:flex-row flex items-center">
                                <div className="flex items-center w-full gap-3 mb-3 md:mb-0 md:w-1/3">
                                    <ToggleSwitch
                                        label="Enable Attendance"
                                        checked={attendanceEnabled}
                                        onChange={setAttendanceEnabled}
                                    />
                                </div>
                                <div className="w-full md:w-1/3">
                                    <div className="w-full sm:w-2/3">
                                        <CustomSelect
                                            label="Location"
                                            name="location"
                                            value={location}
                                            placeholder="Select Location"
                                            onChange={setLocation}
                                            options={locations}
                                            controlHeight="2rem"
                                            error={error && !location ? "Location is required" : ""}
                                        />
                                    </div>
                                </div>
                                <div className="w-full md:w-1/3">
                                    <div className="w-full sm:w-2/3">
                                        <CustomSelect
                                            label="Work Shift"
                                            name="shift"
                                            value={shift}
                                            placeholder="Select Work Shift"
                                            onChange={setShift}
                                            options={shifts}
                                            controlHeight="2rem"
                                            error={error && !shift ? "Work Shift is required" : ""}
                                        />
                                    </div>
                                </div>
                            </div>


                            {attendanceEnabled && <div className="w-full">
                                <div className="w-full mt-7">
                                    <span>Attendance Modes</span>
                                    <div className="flex flex-wrap gap-3 mt-3">
                                        {allModes.map((mode) => (
                                            <div
                                                key={mode.key}
                                                className="flex items-center justify-between border border-gray-200 rounded px-4 py-2 bg-gray-50 hover:bg-gray-100 transition w-full sm:w-[19%]"
                                            >
                                                <div className="flex items-center gap-2 text-gray-700 text-xs">
                                                    <span className="text-gray-500 text-base">{mode.icon}</span>
                                                    {mode.label}
                                                </div>

                                                <ToggleSwitch
                                                    checked={modes[mode.key]}
                                                    onChange={() => handleModeToggle(mode.key)}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                </div>


                                <div className="w-full flex flex-col md:flex-row mt-10">
                                    <div className="flex items-center gap-3 w-full mb-3 md:mb-0 md:w-1/3">
                                        <ToggleSwitch
                                            label="Enable Geo-fence"
                                            checked={enableGeo}
                                            onChange={setEnableGeo}
                                        />
                                    </div>
                                    {enableGeo && <div className="flex items-center w-full md:w-1/3">
                                        <div className="w-full md:w-3/4">
                                            <Input
                                                type="number"
                                                label="Geo-fence (meters)"
                                                name="geoRange"
                                                placeholder="Enter Radius (e.g.200)"
                                                noMargin={true}
                                                value={geoRange}
                                                onChange={(e) => setGeoRange(e.target.value)}
                                                error={error && enableGeo && !geoRange ? "Geo-fence is required" : ""}

                                            />
                                        </div>
                                    </div>}
                                </div>

                                <div className="w-full flex mt-10">
                                    <div className="w-1/2">
                                        <div className="w-5/6">
                                            <span>Working Days</span>
                                            <div className="flex flex-wrap gap-3 mt-3">
                                                {weekdays.map((day) => (
                                                    <label
                                                        key={day.key}
                                                        className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded cursor-pointer bg-gray-50 hover:bg-gray-100 transition text-xxs text-gray-700"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={workingDays[day.key]}
                                                            onChange={() =>
                                                                setWorkingDays((prev) => ({
                                                                    ...prev,
                                                                    [day.key]: !prev[day.key],
                                                                }))
                                                            }
                                                            className="accent-[var(--toggle-btn)] w-3.5 h-3.5 cursor-pointer"
                                                        />

                                                        <span>{day.label}</span>
                                                    </label>
                                                ))}
                                                {error && !weekCheck && <p className="text-red-500 text-xs mt-1 ml-1">Select at least single day</p>}

                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-1/2">
                                        <div className="w-5/6">
                                            <span>Weekend Days</span>

                                            <div className="flex flex-wrap gap-3 mt-3">
                                                {weekdays.map((day) => (
                                                    <label
                                                        key={day.key}
                                                        className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded cursor-pointer bg-gray-50 hover:bg-gray-100 transition text-xxs text-gray-700"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={weekendDays[day.key]}
                                                            onChange={() =>
                                                                setWeekendDays((prev) => ({
                                                                    ...prev,
                                                                    [day.key]: !prev[day.key],
                                                                }))
                                                            }
                                                            className="accent-[var(--toggle-btn)] w-3.5 h-3.5 cursor-pointer"
                                                        />

                                                        <span>{day.label}</span>
                                                    </label>
                                                ))}
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="w-full flex flex-col md:flex-row mt-10">
                                    <div className="w-full md:w-1/3">

                                        <div className="w-full sm:w-3/4">
                                            <CustomSelect
                                                label="Timezone"
                                                name="timezone"
                                                value={timeZone}
                                                placeholder="Select Timezone"
                                                onChange={setTimeZone}
                                                options={timeZones}
                                                controlHeight="2rem"
                                                error={error && attendanceEnabled && !timeZone ? "Timezone is required" : ""}
                                            />
                                        </div>

                                    </div>
                                    <div className="w-full md:w-1/3">
                                        <div className="w-full md:w-3/4">
                                            <Input
                                                type="time"
                                                label="Office Start"
                                                name="officeStart"
                                                noMargin={true}
                                                value={officeStart}
                                                onChange={(e) => setOfficeStart(e.target.value)}
                                                error={error && attendanceEnabled && !officeStart ? "Office Start time is required" : ""}

                                            />
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/3">
                                        <div className="w-full md:w-3/4">
                                            <Input
                                                type="time"
                                                label="Office End"
                                                name="officeEnd"
                                                noMargin={true}
                                                value={officeEnd}
                                                onChange={(e) => setOfficeEnd(e.target.value)}
                                                error={error && attendanceEnabled && !officeEnd ? "Office End time is required" : ""}

                                            />
                                        </div>
                                    </div>
                                </div>


                                <div className="w-full flex flex-col md:flex-row mt-3">
                                    <div className="w-full md:w-1/3">
                                        <div className="w-3/4">
                                            <Input
                                                type="number"
                                                label="Break Hours"
                                                name="breakHours"
                                                placeholder="Enter Break Hours"
                                                noMargin={true}
                                                value={breakHours}
                                                onChange={(e) => setBreakHours(e.target.value)}
                                                error={error && attendanceEnabled && !breakHours ? "Break Hours is required" : ""}

                                            />
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/3">
                                        <div className="w-full md:w-3/4">
                                            <Input
                                                type="time"
                                                label="Break Start"
                                                name="breakStart"
                                                noMargin={true}
                                                value={breakStart}
                                                onChange={(e) => setBreakStart(e.target.value)}
                                                error={error && attendanceEnabled && !breakStart ? "Break Start time is required" : ""}

                                            />
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/3">
                                        <div className="w-full md:w-3/4">
                                            <Input
                                                type="time"
                                                label="Break End"
                                                name="breakEnd"
                                                noMargin={true}
                                                value={breakEnd}
                                                onChange={(e) => setBreakEnd(e.target.value)}
                                                error={error && attendanceEnabled && !breakEnd ? "Break End time is required" : ""}

                                            />
                                        </div>
                                    </div>
                                </div>


                            </div>}
                            <div className="w-full flex mt-10 justify-end">
                                <Button type="button" variant="success" onClick={handleSave}>Save Setting</Button>
                            </div>

                        </div>
                    )}

                    {activeTab === "attendance" && (
                        <div className="w-full text-xxs">
                            <div className="w-full flex-col md:flex-row flex items-center gap-4">
                                <div className="w-full md:w-1/4 mb-3">
                                    <div className="w-full">
                                        <CustomSelect
                                            label="Location"
                                            name="location"
                                            value={location}
                                            placeholder="Select Location"
                                            onChange={setLocation}
                                            options={locations}
                                            controlHeight="2rem"
                                            error={error && !location ? "Location is required" : ""}
                                        />
                                    </div>
                                </div>
                                <div className="w-full md:w-1/4 mb-3">
                                    <div className="w-full">
                                        <CustomSelect
                                            label="Work Shift"
                                            name="shift"
                                            value={shift}
                                            placeholder="Select Work Shift"
                                            onChange={setShift}
                                            options={shifts}
                                            controlHeight="2rem"
                                            error={error && !shift ? "Work Shift is required" : ""}
                                        />
                                    </div>
                                </div>
                                <div className="w-full md:w-1/4 mb-3 mt-1">
                                    <div className="w-full">
                                        <Input
                                            type="number"
                                            label="Minimum Overtime Threshold"
                                            name="minThres"
                                            placeholder="Enter minutes"
                                            noMargin={true}
                                            value={minOvertime}
                                            onChange={(e) => setMinOvertime(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="w-full md:w-1/4 mb-3 mt-1">
                                    <div className="w-full">
                                        <Input
                                            type="number"
                                            label="Maximum Overtime Threshold"
                                            name="maxThres"
                                            placeholder="Enter minutes"
                                            noMargin={true}
                                            value={maxOvertime}
                                            onChange={(e) => setMaxOvertime(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full flex-col md:flex-row gap-5">
                                <div className="w-full md:w-1/2 mt-3 p-5 border rounded border-gray-300">
                                    <div className="w-full flex justify-center mb-4"> <strong className="text-center">Late Arrival</strong></div>
                                    <div className="w-full flex-col flex items-center">
                                        <div className="w-full flex flex-col md:flex-row gap-4">
                                            <div className="flex items-center w-full md:w-1/2 mb-2">
                                                <div className="w-full">
                                                    <Input
                                                        type="number"
                                                        label="Grace Minutes"
                                                        name="grace"
                                                        placeholder="Enter minutes"
                                                        noMargin={true}
                                                        value={lateGrace}
                                                        onChange={(e) => setLateGrace(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center w-full md:w-1/2 mb-2">
                                                <div className="w-full">
                                                    <Input
                                                        type="number"
                                                        label="Maximum Late Allowed"
                                                        name="maxLate"
                                                        placeholder="Enter number"
                                                        noMargin={true}
                                                        value={maxLate}
                                                        onChange={(e) => setMaxLate(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col md:flex-row gap-4">
                                            <div className="flex items-center w-full md:w-1/2 mb-2">
                                                <div className="w-full">
                                                    <Input
                                                        type="number"
                                                        label="Deduction per Late Attendance"
                                                        name="lateDeduction"
                                                        placeholder="Enter amount"
                                                        noMargin={true}
                                                        value={deductionLate}
                                                        onChange={(e) => setDeductionLate(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center w-full md:w-1/2 mb-2">
                                                <div className="w-full">
                                                    <Input
                                                        type="number"
                                                        label="Convert to Half Day if Late by (minutes)"
                                                        name="lateHalfMinutes"
                                                        placeholder="Enter minutes"
                                                        noMargin={true}
                                                        value={lateHalfday}
                                                        onChange={(e) => setLateHalfday(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 mt-3 p-5 border rounded border-gray-300">
                                    <div className="w-full flex justify-center mb-4"> <strong className="text-center">Early Leave</strong></div>
                                    <div className="w-full flex-col flex items-center">
                                        <div className="w-full flex flex-col md:flex-row gap-4">
                                            <div className="flex items-center w-full md:w-1/2 mb-2">
                                                <div className="w-full">
                                                    <Input
                                                        type="number"
                                                        label="Grace Minutes"
                                                        name="earlyGrace"
                                                        placeholder="Enter minutes"
                                                        noMargin={true}
                                                        value={earlyGrace}
                                                        onChange={(e) => setEarlyGrace(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center w-full md:w-1/2 mb-2">
                                                <div className="w-full">
                                                    <Input
                                                        type="number"
                                                        label="Maximum Early Leave Allowed"
                                                        name="maxEarly"
                                                        placeholder="Enter number"
                                                        noMargin={true}
                                                        value={maxEarlyLeave}
                                                        onChange={(e) => setMaxEarlyLeave(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col md:flex-row gap-4">
                                            <div className="flex items-center w-full md:w-1/2 mb-2">
                                                <div className="w-full">
                                                    <Input
                                                        type="number"
                                                        label="Deduction per Early Leave Attendance"
                                                        name="earlyDeduction"
                                                        placeholder="Enter amount"
                                                        noMargin={true}
                                                        value={deductionEarlyLeave}
                                                        onChange={(e) => setDeductionEarlyLeave(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center w-full md:w-1/2 mb-2">
                                                <div className="w-full">
                                                    <Input
                                                        type="number"
                                                        label="Convert to Half Day if Early Leave by (minutes)"
                                                        name="earlyHalfMinutes"
                                                        placeholder="Enter minutes"
                                                        noMargin={true}
                                                        value={earlyHalfday}
                                                        onChange={(e) => setEarlyHalfday(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    )}


                </div>
            </div>
        </Layout>
    )
}
export default SettingClient;