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
import General from "./tabs/General";
import Tabs from "y@/app/components/Tabs";
import Rule from "./tabs/Rule";
function SettingClient() {
    const [settings, setSettings] = useState({
        activeTab: "",
        attendanceEnabled: true,
        enableGeo: true,
        location: "",
        timeZone: "",
        geoRange: "",
        shift: "",
        breakHours: "",
        breakStart: "",
        breakEnd: "",
        officeStart: "",
        officeEnd: "",
        error: false,
        weekCheck: true,
        lateGrace: "",
        maxLate: "",
        deductionLate: "",
        lateHalfday: "",
        earlyGrace: "",
        maxEarlyLeave: "",
        deductionEarlyLeave: "",
        earlyHalfday: "",
        minOvertime: "",
        maxOvertime: "",
    });



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



    const locations = mapSelectOptions(
        [
            { id: 1, name: "Lahore" },
            { id: 2, name: "Multan" },
            { id: 3, name: "Karachi" },
            { id: 4, name: "Islamabad" },
            { id: 5, name: "Shaher Sultan" },
            { id: 6, name: "Rawalpindi" },
            { id: 7, name: "Kohat" },
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
    const handleModeToggle = (mode) => {
        setModes((prev) => ({ ...prev, [mode]: !prev[mode] }));
    };

    const handleChange = (nameOrEvent, value) => {
        // If it's an event from a native input
        if (typeof nameOrEvent === "object" && nameOrEvent.target) {
            const { name, value } = nameOrEvent.target;
            setSettings((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
        // If it's a direct field/value pair from custom components
        else if (typeof nameOrEvent === "string") {
            setSettings((prev) => ({
                ...prev,
                [nameOrEvent]: value,
            }));
        }
    };

    const handleSave = (e) => {
        e.preventDefault();

        const hasWeek = Object.values(workingDays).some((v) => v === true);

        setSettings((prev) => ({
            ...prev,
            weekCheck: hasWeek,
            error: true
        }));
    };

    const generalProps = {
        locations,
        shifts,
        allModes,
        handleModeToggle,
        weekdays,
        workingDays,
        setWorkingDays,
        weekendDays,
        setWeekendDays,
        timeZones,
        modes,
        setModes,
        handleSave,
    };


    const tabs = [
        { key: "general", label: "General Setting", content: <General settings={settings} onChange={handleChange} {...generalProps} /> },
        { key: "rule", label: "Attendace Rule", content: <Rule settings={settings} onChange={handleChange} locations={locations} shifts={shifts} /> }
    ];

    return (
        <Layout>
            <div className="flex justify-between text-lg p-1 mb-1">
                <h2>Attendance Settings</h2>
            </div>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-screen p-5">
                <Tabs tabs={tabs} defaultTab="general" onTabChange={settings.activeTab} align="left" />

            </div>
        </Layout>
    )
}
export default SettingClient;