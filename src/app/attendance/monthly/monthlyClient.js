"use client";
import { useState, useEffect } from "react";
import Layout from "y@/app/components/Layout";
import SearchBar from "y@/app/components/SearchBar";
import Input from "y@/app/components/Input";
import { FiXCircle, FiCheckCircle } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import CustomSelect from "y@/app/components/CustomSelect";
import Button from "y@/app/components/Button";
import MonthPicker from "y@/app/components/MonthPicker";
export default function MonthlyClient() {

    // --- State ---
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const today = new Date();
        return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
    });

    const [days, setDays] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [search, setSearch] = useState("");
    const [depart, setDepart] = useState("");
    const [monthVal, setMonthVal] = useState("");

    useEffect(() => {
        const [year, month] = selectedMonth.split("-").map(Number);
        const daysInMonth = new Date(year, month, 0).getDate();
        setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));

        const attendanceData = [
            {
                empId: "EMP005",
                name: "Usman Tariq This text is for long name",
                imageUrl: "/api/portraits/men/21.jpg",
                department: "Human Resources",
                workingHours: 168,
                attendance: generateRandomAttendance(daysInMonth),
            },
            {
                empId: "EMP006",
                name: "Ayesha Noor",
                imageUrl: "/api/portraits/women/39.jpg",
                department: "Finance",
                workingHours: 160,
                attendance: generateRandomAttendance(daysInMonth),
            },
            {
                empId: "EMP007",
                name: "Bilal Hussain",
                imageUrl: "/api/portraits/men/52.jpg",
                department: "IT Support",
                workingHours: 174,
                attendance: generateRandomAttendance(daysInMonth),
            },
            {
                empId: "EMP008",
                name: "Zainab Ali",
                imageUrl: "/api/portraits/women/23.jpg",
                department: "Remote Operations",
                workingHours: 150,
                attendance: generateRandomAttendance(daysInMonth),
            },
            {
                empId: "EMP009",
                name: "Rehan Malik",
                imageUrl: "/api/portraits/men/47.jpg",
                department: "Sales",
                workingHours: 162,
                attendance: generateRandomAttendance(daysInMonth),
            },
            {
                empId: "EMP010",
                name: "Hira Sheikh",
                imageUrl: "/api/portraits/women/19.jpg",
                department: "Marketing",
                workingHours: 170,
                attendance: generateRandomAttendance(daysInMonth),
            },
            {
                empId: "EMP011",
                name: "Taimoor Raza",
                imageUrl: "/api/portraits/men/63.jpg",
                department: "Operations",
                workingHours: 165,
                attendance: generateRandomAttendance(daysInMonth),
            },
            {
                empId: "EMP012",
                name: "Nimra Javed",
                imageUrl: "/api/portraits/women/56.jpg",
                department: "Product Management",
                workingHours: 159,
                attendance: generateRandomAttendance(daysInMonth),
            },
        ];



        setAttendanceData(attendanceData);
    }, [selectedMonth]);

    // --- Helper: random dummy attendance ---
    function generateRandomAttendance(days) {
        const statuses = ["P", "A", "L"]; // Present, Absent, Leave
        const data = {};
        for (let i = 1; i <= days; i++) {
            data[i] = statuses[Math.floor(Math.random() * statuses.length)];
        }
        return data;
    }

    // --- Filtered employees ---
    const filteredData = attendanceData.filter(
        (row) =>
            row.name.toLowerCase().includes(search.toLowerCase()) ||
            row.empId.toLowerCase().includes(search.toLowerCase())
    );

    const departments = mapSelectOptions(
        [
            { id: 1, name: "Human Resources" },
            { id: 2, name: "Finance" },
            { id: 3, name: "Information Technology" },
            { id: 4, name: "Sales" },
            { id: 5, name: "Marketing" },
            { id: 6, name: "Operations" },
            { id: 7, name: "Customer Support" },
            { id: 8, name: "Product Management" },
        ],
        "id",
        "name"
    );


    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold text-gray-700">
                        Monthly Attendance
                    </h2>
                    <Button type="button" variant="success">
                        Export Attendance
                    </Button>
                </div>

                <div className="flex justify-between flex-col md:flex-row items-center my-2 mt-5">
                    <div className="w-full md:w-1/5 flex items-center">
                        <SearchBar
                            placeholder="Search by name or ID..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="w-full flex flex-col md:flex-row justify-end items-center mt-2 md:mt-0 gap-2">
                        <div className="w-full md:w-[9rem]">
                            <CustomSelect
                                name="dept"
                                value={depart}
                                placeholder="Department"
                                onChange={setDepart}
                                options={departments}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="w-full md:w-[9rem]">
                            <MonthPicker monthVal={monthVal} setMonthVal={setMonthVal} />

                        </div>

                    </div>
                </div>

                <div className="relative mt-2 border border-gray-200 rounded-md overflow-hidden">
                    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                        <div className="overflow-x-auto min-w-max shadow-md border border-gray-200 rounded max-h-[72vh]">
                            <table className="w-full text-xs border-collapse">
                                <thead className="bg-gray-100 text-gray-700 sticky top-0 z-11">
                                    <tr>
                                        <th className="sticky left-0 w-[80px] bg-gray-100 z-20 text-left px-2 py-3">EMP ID</th>
                                        <th className="sticky left-[80px] w-[130px] bg-gray-100 z-20 text-left px-2 py-3">Name</th>
                                        <th className="sticky left-[210px] w-[90px] bg-gray-100 z-20 text-left px-2 py-3">Department</th>


                                        {/* Scrollable Day Columns */}
                                        {days.map((d) => (
                                            <th key={d} style={{ minWidth: "25px" }} className="text-center">
                                                {d}
                                            </th>
                                        ))}

                                        <th title="Working Hours" className="px-3 py-3 text-center sticky right-[145px] bg-gray-100 z-20">
                                            WH
                                        </th>
                                        <th className="px-3 py-3 text-center sticky right-[88px] bg-gray-100 z-20">
                                            Present
                                        </th>
                                        <th className="px-3 py-3 text-center sticky right-[44px] bg-gray-100 z-20">
                                            Absent
                                        </th>
                                        <th className="px-3 py-3 text-center sticky right-0 bg-gray-100 z-20">
                                            Leave
                                        </th>

                                    </tr>
                                </thead>

                                <tbody className="text-xxs">
                                    {filteredData && filteredData.length > 0 ? (
                                    filteredData.map((row, idx) => {
                                        const totalPresent = Object.values(row.attendance).filter((s) => s === "P").length;
                                        const totalAbsent = Object.values(row.attendance).filter((s) => s === "A").length;
                                        const totalLeave = Object.values(row.attendance).filter((s) => s === "L").length;

                                        return (
                                            <tr
                                                key={idx}
                                                className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                                    } hover:bg-gray-100 transition-colors`}
                                            >
                                                {/* Sticky Left Columns */}
                                                <td className="sticky left-0 w-[80px] bg-inherit z-10 px-2 py-3">{row.empId}</td>
                                                <td className="sticky left-[80px] w-[130px] bg-inherit z-10 px-2 py-3 flex items-center gap-2">
                                                    <img
                                                        src={`${baseUrl}${row.imageUrl}`}
                                                        alt={row.name}
                                                        className="w-6 h-6 rounded-full object-cover border border-gray-300"
                                                    />
                                                    <span
                                                        className="font-medium text-gray-700 truncate max-w-[100px]"
                                                        title={row.name}
                                                    >
                                                        {row.name}
                                                    </span>
                                                </td>
                                                <td className="sticky left-[210px] w-[80px] bg-inherit z-10 px-2 py-3 border-r border-gray-200">{row.department}</td>

                                                {/* Scrollable Days */}
                                                {days.map((d) => {
                                                    const status = row.attendance[d];
                                                    let icon, borderColor, textColor, title;

                                                    switch (status) {
                                                        case "P":
                                                            icon = <FiCheckCircle size={13} strokeWidth={3} />;
                                                            borderColor = "border-green-600";
                                                            textColor = "text-green-600";
                                                            title = "Present";
                                                            break;
                                                        case "A":
                                                            icon = <FiXCircle size={13} strokeWidth={3} />;
                                                            borderColor = "border-red-600";
                                                            textColor = "text-red-600";
                                                            title = "Absent";
                                                            break;
                                                        case "L":
                                                            icon = <FaStar size={14} strokeWidth={3} />;
                                                            borderColor = "border-yellow-500";
                                                            textColor = "text-yellow-500";
                                                            title = "Leave";
                                                            break;
                                                        default:
                                                            icon = null;
                                                    }

                                                    return (
                                                        <td key={d} className="text-center py-[1px]">
                                                            <div
                                                                title={title}
                                                                className={`w-3 h-3 flex items-center justify-center ${textColor} mx-auto`}
                                                                style={{
                                                                    backgroundColor: "transparent",
                                                                    fontWeight: 600,
                                                                }}
                                                            >
                                                                {icon}
                                                            </div>
                                                        </td>
                                                    );
                                                })}

                                                <td title="Working Hours" className="text-center sticky right-[145px] border-s border-gray-200 bg-inherit z-10">
                                                    {row.workingHours}
                                                </td>
                                                <td className="px-3 py-3 font-bold text-green-600 text-center sticky right-[90px] bg-inherit z-10">
                                                    {totalPresent}
                                                </td>
                                                <td className="px-3 py-3 font-bold text-red-500 text-center sticky right-[45px] bg-inherit z-10">
                                                    {totalAbsent}
                                                </td>
                                                <td className="px-3 py-3 font-bold text-yellow-500 text-center sticky right-0 bg-inherit z-10">
                                                    {totalLeave}
                                                </td>
                                            </tr>
                                        );
                                    })
                                    ) : (
                                <tr>
                                    <td colSpan={40} className="text-center py-4 text-gray-500 italic">
                                        No attendance found.
                                    </td>
                                </tr>
                            )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    );
}
