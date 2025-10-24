"use client";
import { React, useState, useRef, useEffect } from "react";
import Layout from "y@/app/components/Layout";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import { CiServer } from "react-icons/ci";
import { AiOutlineWifi } from "react-icons/ai";
import { BsWifiOff } from "react-icons/bs";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { FiAlertOctagon } from "react-icons/fi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { GoDeviceDesktop } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import { MdSync, MdDone } from "react-icons/md";
import { BsTrash3 } from "react-icons/bs";
import { LuTestTubeDiagonal } from "react-icons/lu";
import Button from "y@/app/components/Button";
import SearchBar from "y@/app/components/SearchBar";
import CustomSelect from "y@/app/components/CustomSelect";
import Input from "y@/app/components/Input";
import ToggleSwitch from "y@/app/components/ToggleSwitch";
import StatusDesign from "y@/app/components/StatusColors";
function Terminals() {


    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [locationVal, setLocationVal] = useState("");
    const [status, setStatus] = useState("");
    const [deviceId, setDeviceId] = useState("");
    const [serial, setSerial] = useState("");
    const [deviceName, setDeviceName] = useState("");
    const [model, setModel] = useState("");
    const [ip, setIp] = useState("");
    const [port, setPort] = useState("");
    const [type, setType] = useState("");
    const [timezone, setTimeZone] = useState("");
    const [intervalMin, setIntervalMin] = useState("");
    const [active, setActive] = useState("");
    const [employee, setEmployee] = useState("");
    const [showErrors, setShowErrors] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const [openMenuId, setOpenMenuId] = useState(null);
    const menuRef = useRef();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleMenuToggle = (id) => {
        setOpenMenuId((prev) => (prev === id ? null : id));
    };

    const stats = [
        {
            title: "Total Devices",
            value: 273,
            icon: <CiServer className="text-blue-700 text-xl" />,
        },
        {
            title: "Online Devices",
            value: 124,
            icon: <AiOutlineWifi className="text-green-500 text-xl" />,
        },
        {
            title: "Offline Devices",
            value: 35,
            icon: <BsWifiOff className="text-red-500 text-xl" />,
        },
        {
            title: "Pending Configuration",
            value: 17,
            icon: <HiOutlineWrenchScrewdriver className=" text-amber-700 text-xl" />,
        },
        {
            title: "Sync Errors",
            value: 89,
            icon: <FiAlertOctagon className="text-rose-700 text-xl" />,
        },
    ];

    const locations = mapSelectOptions(
        [
            { id: 1, name: "Lahore" },
            { id: 2, name: "Multan" },
            { id: 4, name: "Karachi" },
            { id: 5, name: "Islamabad" },
            { id: 6, name: "Shaher Sultan" },
            { id: 7, name: "Rawalpindi" },
            { id: 8, name: "Kohat" },
        ],
        "id",
        "name"
    );

    const statuses = mapSelectOptions(
        [
            { id: 1, name: "Online" },
            { id: 2, name: "Offline" },
            { id: 3, name: "Error" },
            { id: 4, name: "Pending" }
        ],
        "id",
        "name"
    );

    const types = mapSelectOptions(
        [
            { id: 1, name: "Biometric" },
            { id: 2, name: "Face Recognition" },
            { id: 3, name: "RFID" },
            { id: 4, name: "PIN" },
            { id: 7, name: "QR Code Scanner" },
            { id: 8, name: "Hybrid Terminal" }
        ]
        ,
        "id",
        "name"
    );
    const deviceData = [
        {
            deviceId: "DEV001",
            name: "Main Gate - Lahore HQ",
            location: "Lahore Office",
            type: "Biometric",
            ipAddress: "192.168.1.10",
            macAddress: "00:1B:44:11:3A:B7",
            model: "ZKTeco MB360",
            lastSync: "2025-10-22 09:45:00",
            lastActivity: "2025-10-22 09:40:15",
            firmwareVersion: "v2.5.1",
            status: "Online",
            statusId: 1, // 1=Online, 2=Offline, 3=Error, 4=Pending, 5=Disabled
            totalUsers: 125,
            totalLogs: 18765,
            batteryBackup: true,
            connectivity: "LAN",
        },
        {
            deviceId: "DEV002",
            name: "Employee Entry - Karachi",
            location: "Karachi Office",
            type: "RFID",
            ipAddress: "192.168.2.21",
            macAddress: "00:1B:44:11:3A:D2",
            model: "HikVision DS-K1T804A",
            lastSync: "2025-10-22 08:05:00",
            lastActivity: "2025-10-22 07:58:10",
            firmwareVersion: "v1.9.0",
            status: "Offline",
            statusId: 2,
            totalUsers: 89,
            totalLogs: 13942,
            batteryBackup: false,
            connectivity: "WiFi",
        },
        {
            deviceId: "DEV003",
            name: "Face Terminal - Islamabad",
            location: "Islamabad Office",
            type: "Face Recognition",
            ipAddress: "192.168.3.15",
            macAddress: "00:1B:44:11:3A:C5",
            model: "Suprema FaceStation 2",
            lastSync: "2025-10-22 09:50:00",
            lastActivity: "2025-10-22 09:47:20",
            firmwareVersion: "v3.4.2",
            status: "Online",
            statusId: 1,
            totalUsers: 152,
            totalLogs: 21231,
            batteryBackup: true,
            connectivity: "LAN",
        },
        {
            deviceId: "DEV004",
            name: "Admin Room - Multan",
            location: "Multan Office",
            type: "Mobile App (Virtual Device)",
            ipAddress: "-",
            macAddress: "-",
            model: "HRM Mobile Check-in",
            lastSync: "2025-10-22 09:55:00",
            lastActivity: "2025-10-22 09:54:30",
            firmwareVersion: "-",
            status: "Online",
            statusId: 1,
            totalUsers: 36,
            totalLogs: 4512,
            batteryBackup: false,
            connectivity: "Cloud",
        },
        {
            deviceId: "DEV005",
            name: "Security Gate - Rawalpindi",
            location: "Rawalpindi Office",
            type: "QR Code Scanner",
            ipAddress: "192.168.4.33",
            macAddress: "00:1B:44:11:3A:E8",
            model: "ZKTeco QR500",
            lastSync: "2025-10-22 06:30:00",
            lastActivity: "2025-10-22 06:15:00",
            firmwareVersion: "v2.3.0",
            status: "Error",
            statusId: 3,
            totalUsers: 70,
            totalLogs: 9321,
            batteryBackup: false,
            connectivity: "LAN",
        },
        {
            deviceId: "DEV006",
            name: "Main Entry - Shaher Sultan",
            location: "Shaher Sultan Office",
            type: "Biometric",
            ipAddress: "192.168.6.11",
            macAddress: "00:1B:44:11:3A:A9",
            model: "ZKTeco IN01-A",
            lastSync: "2025-10-22 05:20:00",
            lastActivity: "2025-10-22 05:18:05",
            firmwareVersion: "v1.7.4",
            status: "Pending Config",
            statusId: 4,
            totalUsers: 0,
            totalLogs: 0,
            batteryBackup: false,
            connectivity: "LAN",
        },
    ];

    const employees = mapSelectOptions(
        [
            { id: 1, name: "Human Resources" },
            { id: 2, name: "Finance" },
            { id: 3, name: "Marketing" },
            { id: 4, name: "Sales" },
            { id: 5, name: "Customer Support" },
            { id: 6, name: "Operations" },
            { id: 7, name: "IT & Infrastructure" },
            { id: 8, name: "Research & Development" },
            { id: 9, name: "Design" },
            { id: 10, name: "Administration" },
        ],
        "id",
        "name"
    );

const saveHandle = (e) =>{
e.preventDefault();
setShowErrors(true);
}


    return (

        <Layout>
            <div className="flex justify-between text-lg p-1 mb-2">
                <h2>Devices Analytics</h2>
                {/* <Link href="/attendance/settings">
          <FiSettings className="text-gray-600 cursor-pointer" />
        </Link> */}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-2">
                {stats.map((stat, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col justify-between hover:shadow-md transition"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="text-xs font-medium text-gray-600">
                                {stat.title}
                            </h3>
                            {stat.icon}
                        </div>
                        <p className="text-sm font-semibold text-gray-800 mt-3">
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 p-6 mt-3">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold text-gray-700">
                        Devices Directory
                    </h2>
                    <Button type="button" variant="success" onClick={handleOpenModal}>
                        Add Device
                    </Button>
                </div>
                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-10/12 md:w-6/12">
                            <h3 className="text-lg text-center font-semibold mb-4">Add Device</h3>

                            <div className="w-full">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                    <CustomSelect
                                        name="location"
                                        label="Location"
                                        value={locationVal}
                                        placeholder="Select Location"
                                        onChange={setLocationVal}
                                        options={locations}
                                        controlHeight="2rem"
                                        error={showErrors && !locationVal ? "Location is required" : ""}
                                    />

                                    <Input
                                        type="text"
                                        name="serial"
                                        placeholder="Enter Serial No."
                                        label="Serial No."
                                        noMargin={true}
                                        value={serial}
                                        onChange={(e) => setSerial(e.target.value)}
                                        error={showErrors && !serial ? "Serial No is required" : ""}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="Enter device name"
                                        label="Device Name"
                                        noMargin={true}
                                        value={deviceName}
                                        onChange={(e) => setDeviceName(e.target.value)}
                                        error={showErrors && !deviceName ? "Device Name is required" : ""}
                                    />

                                    <Input
                                        type="text"
                                        name="model"
                                        placeholder="Enter device model"
                                        label="Device Model"
                                        noMargin={true}
                                        value={model}
                                        onChange={(e) => setModel(e.target.value)}
                                        error={showErrors && !model ? "Model is required" : ""}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                                    <Input
                                        type="text"
                                        name="deviceId"
                                        placeholder="Enter Device ID"
                                        label="Device ID"
                                        noMargin={true}
                                        value={deviceId}
                                        onChange={(e) => setDeviceId(e.target.value)}
                                        error={showErrors && !deviceId ? "Device ID is required" : ""}
                                    />
                                    <CustomSelect
                                        name="type"
                                        label="Device Type"
                                        value={type}
                                        placeholder="Select Type"
                                        onChange={setType}
                                        options={types}
                                        controlHeight="2rem"
                                        error={showErrors && !types ? "Device Type is required" : ""}
                                    />
                                    <CustomSelect
                                        name="time"
                                        label="Time zone"
                                        value={timezone}
                                        placeholder="Select Timezone"
                                        onChange={setTimeZone}
                                        options={types}
                                        controlHeight="2rem"
                                    />

                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                    <CustomSelect
                                        name="employee"
                                        label="Allowed Users"
                                        value={employee}
                                        placeholder="Select Employee"
                                        onChange={setEmployee}
                                        options={employees}
                                        isMulti={true}
                                        controlHeight="2rem"
                                        error={showErrors && !employee ? "Allowed Users is required" : ""}
                                    />

                                    <div className="flex items-center md:pt-4 md:justify-center">
                                        <ToggleSwitch
                                            label="Activate Device for Attendance"
                                            checked={active}
                                            onChange={setActive}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                                    <Input
                                        type="number"
                                        name="minutes"
                                        label="Sync Interval (minutes)"
                                        placeholder="Enter minutes"
                                        noMargin={true}
                                        value={intervalMin}
                                        onChange={(e) => setIntervalMin(e.target.value)}
                                    />
                                    <Input
                                        type="text"
                                        name="ip"
                                        placeholder="192.234.21.11"
                                        label="IP Address"
                                        noMargin={true}
                                        value={ip}
                                        onChange={(e) => setIp(e.target.value)}
                                    />
                                    <Input
                                        type="number"
                                        name="port"
                                        label="Port"
                                        placeholder="Enter Port No."
                                        noMargin={true}
                                        value={port}
                                        onChange={(e) => setPort(e.target.value)}
                                    />
                                </div>



                                <div className="flex justify-end gap-2">
                                    <Button variant="cancel" onClick={handleCloseModal}>
                                        Close
                                    </Button>
                                    <Button variant="success" onClick={saveHandle}>
                                        Add Device
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                {/* Search + Date Filter (UI only; logic handled in backend) */}
                <div className="flex justify-between items-center my-3 mt-5">
                    <div className="w-1/5 flex items-center mb-2">
                        <SearchBar
                            placeholder="Search by name or ID..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="mb-1 w-[9rem]">
                            <CustomSelect
                                name="location"
                                value={location}
                                placeholder="Location"
                                onChange={setLocation}
                                options={locations}
                                controlHeight="2rem"
                            />
                        </div>

                        <div className="mb-1 w-[9rem]">
                            <CustomSelect
                                name="status"
                                value={status}
                                placeholder="Status"
                                onChange={setStatus}
                                options={statuses}
                                controlHeight="2rem"
                            />
                        </div>

                    </div>
                </div>


                {/* Attendance Table */}
                <div className="overflow-x-auto -mt-2">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="px-4 py-3 text-left rounded-tl-md">Device ID</th>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Location</th>
                                <th className="px-4 py-3 text-left">Type</th>
                                <th className="px-4 py-3 text-left">Modal</th>
                                <th className="px-4 py-3 text-left">Last Sync</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {deviceData.map((row, idx) => (
                                <tr
                                    key={idx}
                                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        } hover:bg-gray-100 transition-colors`}
                                >
                                    <td className="px-4 py-3">{row.deviceId}</td>
                                    <td className="px-4 py-3 truncate max-w-35">{row.name}</td>
                                    <td className="px-4 py-3">{row.location}</td>
                                    <td className="px-4 py-3">{row.type}</td>
                                    <td className="px-4 py-3">{row.model}</td>
                                    <td className="px-4 py-3">{row.lastSync}</td>
                                    <td className="px-4 py-3">
                                                       <StatusDesign statusId={row.statusId} label={row.status} />
                                    </td>
                                    <td className="px-4 py-3 relative">
                                        <button
                                            onClick={() => handleMenuToggle(row.deviceId)}
                                            className="p-1 rounded-full hover:bg-gray-100 transition cursor-pointer"
                                        >
                                            <BiDotsVerticalRounded className="text-gray-600 text-sm" />
                                        </button>

                                        {openMenuId === row.deviceId && (
                                            <div
                                                ref={menuRef}
                                                className="absolute top-5 right-16 mt-1 z-50 w-35 bg-white border border-gray-200 rounded-xl shadow-lg"
                                            >
                                                <ul className="py-2 text-xxs text-gray-700">
                                                    <li>
                                                        <button className="flex items-center w-full cursor-pointer px-4 py-2 hover:bg-gray-50">
                                                            <GoDeviceDesktop className="mr-2 text-xs" /> View Device
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="flex items-center w-full cursor-pointer px-4 py-2 hover:bg-gray-50">
                                                            <FaRegEdit className="mr-2 text-xs" /> Edit Device
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="flex items-center w-full cursor-pointer px-4 py-2 hover:bg-gray-50">
                                                            <MdSync className="mr-2 text-xs" /> Sync Device
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="flex items-center w-full cursor-pointer px-4 py-2 hover:bg-gray-50">
                                                            <LuTestTubeDiagonal className="mr-2 text-xs" /> Test Action
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="flex items-center w-full cursor-pointer px-4 py-2 hover:bg-gray-50 text-green-600">
                                                            <MdDone className="mr-2 text-sm" />  Activate
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="flex items-center w-full cursor-pointer px-4 py-2 hover:bg-gray-50 text-red-600">
                                                            <BsTrash3 className="mr-2 text-xs" />  Delete Device
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </td>


                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}

export default Terminals;