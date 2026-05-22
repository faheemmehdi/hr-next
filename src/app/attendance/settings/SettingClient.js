"use client";
import Layout from "y@/app/components/Layout";
import { useState } from "react";
import { FaFingerprint, FaMobileAlt, FaQrcode, FaIdCard, FaUserCheck } from "react-icons/fa";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
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
    const toggleWorkingDay = (dayKey) => {
        setWorkingDays((prev) => {
            const isSelected = !prev[dayKey];

            if (isSelected) {
                setWeekendDays((wPrev) => ({
                    ...wPrev,
                    [dayKey]: false,
                }));
            }

            return {
                ...prev,
                [dayKey]: isSelected,
            };
        });
    };

    const toggleWeekendDay = (dayKey) => {
        setWeekendDays((prev) => {
            const isSelected = !prev[dayKey];

            if (isSelected) {
                setWorkingDays((wPrev) => ({
                    ...wPrev,
                    [dayKey]: false,
                }));
            }

            return {
                ...prev,
                [dayKey]: isSelected,
            };
        });
    };



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
        { key: "tue", label: "Tuesday" },
        { key: "wed", label: "Wednesday" },
        { key: "thu", label: "Thursday" },
        { key: "fri", label: "Friday" },
        { key: "sat", label: "Saturday" },
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
        weekendDays,
        timeZones,
        modes,
        setModes,
        handleSave,
        toggleWorkingDay,
        toggleWeekendDay,
    };


    const tabs = [
        { key: "general", label: "General Setting", content: <General settings={settings} onChange={handleChange} {...generalProps} /> },
        { key: "rule", label: "Attendance Rule", content: <Rule settings={settings} onChange={handleChange} locations={locations} shifts={shifts} /> }
    ];
    const handleTabChange = (tabKey) => {
        setSettings((prev) => ({
            ...prev,
            activeTab: tabKey,
        }));
    };

    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
                <div className="mb-2">
                    <h2 className="text-base font-semibold text-gray-700">Attendance Settings</h2>
                    <p className="text-xxs text-gray-500 mt-0.5">
                        Configure attendance defaults, capture modes, geo-fence, and policy rules.
                    </p>
                </div>
                <Tabs tabs={tabs} defaultTab="general" onTabChange={handleTabChange} align="left" isCol />

            </div>
        </Layout>
    )
}
export default SettingClient;
