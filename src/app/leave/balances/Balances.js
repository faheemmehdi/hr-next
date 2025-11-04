"use client";
import Layout from "y@/app/components/Layout";
import Input from "y@/app/components/Input";
import { useState, useEffect, useRef } from "react";
import SearchBar from "y@/app/components/SearchBar";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import CustomSelect from "y@/app/components/CustomSelect";
import {
    FiUser, FiEye
} from "react-icons/fi";
import { FaDotCircle } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Button from "y@/app/components/Button";
import StatusDesign from "y@/app/components/StatusColors";
import ReasonModal from "y@/app/components/ReasonConfirmModal";
import { RxCross2 } from "react-icons/rx";
import { MdDone } from "react-icons/md";
export default function Balance() {
    const [date, setDate] = useState("");
    const [gender, setGender] = useState("");
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [type, setType] = useState("");
    const [locationVal, setLocationVal] = useState("");
    const [employee, setEmployee] = useState("");
    const [department, setDepartment] = useState("");
    const [departVal, setDepartVal] = useState("");
    const [status, setStatus] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isReasonOpen, setIsReasonOpen] = useState(false);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [remarks, setRemarks] = useState("");
    const [showErrors, setShowErrors] = useState(false);

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const openReasonModal = () => setIsReasonOpen(true);
    const closeReasonModal = () => setIsReasonOpen(false);
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

    const leaveBalancesData = [
        {
            empId: "EMP301",
            name: "Ahsan Qureshi",
            imageUrl: "/api/portraits/men/28.jpg",
            location: "Lahore HQ",
            1: { total: 20, used: 12, remaining: 8 },
            2: { total: 10, used: 3, remaining: 7 },
            3: { total: 7, used: 2, remaining: 5 },
            4: { total: 5, used: 1, remaining: 4 },
            5: { total: 0, used: 0, remaining: 0 },
            6: { total: 10, used: 1, remaining: 9 },
            totalRemaining: 42,
            lastUpdated: "2025-10-30",
        },
        {
            empId: "EMP302",
            name: "Sana Imran",
            imageUrl: "/api/portraits/women/34.jpg",
            location: "Karachi HQ",
            1: { total: 20, used: 8, remaining: 12 },
            2: { total: 10, used: 5, remaining: 5 },
            3: { total: 7, used: 1, remaining: 6 },
            4: { total: 5, used: 0, remaining: 5 },
            5: { total: 90, used: 0, remaining: 90 },
            6: { total: 10, used: 2, remaining: 8 },
            totalRemaining: 134,
            lastUpdated: "2025-10-30",
        },
        {
            empId: "EMP303",
            name: "Tahir Hussain",
            imageUrl: "/api/portraits/men/19.jpg",
            location: "Islamabad Office",
            1: { total: 20, used: 6, remaining: 14 },
            2: { total: 10, used: 2, remaining: 8 },
            3: { total: 7, used: 1, remaining: 6 },
            4: { total: 5, used: 0, remaining: 5 },
            5: { total: 0, used: 0, remaining: 0 },
            6: { total: 10, used: 0, remaining: 10 },
            totalRemaining: 52,
            lastUpdated: "2025-10-30",
        },
        {
            empId: "EMP304",
            name: "Nimra Gul",
            imageUrl: "/api/portraits/women/41.jpg",
            location: "Remote (Hybrid)",
            1: { total: 20, used: 4, remaining: 16 },
            2: { total: 10, used: 1, remaining: 9 },
            3: { total: 7, used: 1, remaining: 6 },
            4: { total: 10, used: 4, remaining: 6 },
            5: { total: 0, used: 0, remaining: 0 },
            6: { total: 10, used: 0, remaining: 10 },
            totalRemaining: 57,
            lastUpdated: "2025-10-30",
        },
        {
            empId: "EMP305",
            name: "Zeeshan Arif",
            imageUrl: "/api/portraits/men/37.jpg",
            location: "Lahore HQ",
            1: { total: 20, used: 10, remaining: 10 },
            2: { total: 10, used: 2, remaining: 8 },
            3: { total: 7, used: 3, remaining: 4 },
            4: { total: 5, used: 2, remaining: 3 },
            5: { total: 0, used: 0, remaining: 0 },
            6: { total: 10, used: 1, remaining: 9 },
            totalRemaining: 42,
            lastUpdated: "2025-10-30",
        },
        {
            empId: "EMP306",
            name: "Amna Yousaf",
            imageUrl: "/api/portraits/women/30.jpg",
            location: "Islamabad Office",
            1: { total: 20, used: 9, remaining: 11 },
            2: { total: 10, used: 3, remaining: 7 },
            3: { total: 7, used: 0, remaining: 7 },
            4: { total: 5, used: 1, remaining: 4 },
            5: { total: 90, used: 0, remaining: 90 },
            6: { total: 10, used: 0, remaining: 10 },
            totalRemaining: 138,
            lastUpdated: "2025-10-30",
        },
        {
            empId: "EMP307",
            name: "Hassan Javed",
            imageUrl: "/api/portraits/men/32.jpg",
            location: "Karachi HQ",
            1: { total: 20, used: 5, remaining: 15 },
            2: { total: 10, used: 1, remaining: 9 },
            3: { total: 7, used: 2, remaining: 5 },
            4: { total: 5, used: 1, remaining: 4 },
            5: { total: 0, used: 0, remaining: 0 },
            6: { total: 10, used: 0, remaining: 10 },
            totalRemaining: 53,
            lastUpdated: "2025-10-30",
        },
        {
            empId: "EMP308",
            name: "Kiran Abbas",
            imageUrl: "/api/portraits/women/38.jpg",
            location: "Remote (Home)",
            1: { total: 20, used: 6, remaining: 14 },
            2: { total: 10, used: 1, remaining: 9 },
            3: { total: 7, used: 1, remaining: 6 },
            4: { total: 5, used: 3, remaining: 2 },
            5: { total: 90, used: 30, remaining: 60 },
            6: { total: 10, used: 0, remaining: 10 },
            totalRemaining: 116,
            lastUpdated: "2025-10-30",
        },
        {
            empId: "EMP309",
            name: "Usama Iqbal",
            imageUrl: "/api/portraits/men/45.jpg",
            location: "Lahore HQ",
            1: { total: 20, used: 7, remaining: 13 },
            2: { total: 10, used: 4, remaining: 6 },
            3: { total: 7, used: 2, remaining: 5 },
            4: { total: 5, used: 1, remaining: 4 },
            5: { total: 0, used: 0, remaining: 0 },
            6: { total: 10, used: 2, remaining: 8 },
            totalRemaining: 49,
            lastUpdated: "2025-10-30",
        },
    ];

    const leaveTypesData = [
        { id: 1, label: "Annual Leave" },
        { id: 2, label: "Sick Leave" },
        { id: 3, label: "Casual Leave" },
        { id: 4, label: "Work From Home" },
        { id: 5, label: "Maternity Leave" },
        { id: 6, label: "Unpaid Leave" },
    ];



 const genders = mapSelectOptions(
        [
            { id: 1, name: "Male" },
            { id: 2, name: "Female" }
        ],
        "id",
        "name"
    );



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

    const statuses = mapSelectOptions(
        [
            { id: 2, name: "Present" },
            { id: 1, name: "Absent" },
            { id: 3, name: "Late" },
            { id: 3, name: "Leave" }
        ],
        "id",
        "name"
    );
    const leaveTypes = mapSelectOptions(
        [
            { id: 1, name: "Annual Leave" },
            { id: 2, name: "Sick Leave" },
            { id: 3, name: "Casual Leave" },
            { id: 4, name: "Maternity Leave" },
            { id: 5, name: "Paternity Leave" },
            { id: 6, name: "Emergency Leave" },
            { id: 7, name: "Work From Home" },
            { id: 8, name: "Unpaid Leave" },
        ],
        "id",
        "name"
    );

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


    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold text-gray-700">
                        Leave Balances
                    </h2>
                    <Button type="button" variant="success">
                        Export Balances
                    </Button>
                </div>

                {/* Search + Date Filter (UI only; logic handled in backend) */}
                <div className="flex justify-between items-center my-3 mt-5">
                    <div className="w-1/5 flex items-center mb-1">
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
                                name="gender"
                                value={gender}
                                placeholder="Gender"
                                onChange={setGender}
                                options={genders}
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
                                <th className="px-4 py-3 text-left rounded-tl-md">Emp ID</th>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Location</th>
                                {leaveTypesData.map((type) => (
                                    <th key={type.id} className="px-4 py-3 text-center max-w-[120px]">{type.label}</th>
                                ))}
                                <th className="px-4 py-3 text-center max-w-[120px]">Remaining Balance</th>
                                {/* <th className="px-4 py-3 text-center">Action</th> */}
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {leaveBalancesData.map((row, idx) => (
                                <tr
                                    key={idx}
                                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        } hover:bg-gray-100 transition-colors`}
                                >
                                    <td className="px-4 py-3">{row.empId}</td>
                                    <td className="px-4 py-3 flex items-center gap-2">
                                        {row.imageUrl ? (
                                            <img
                                                src={`${baseUrl}${row.imageUrl}`}
                                                alt={row.name}
                                                className="w-7 h-7 rounded-full object-cover border border-gray-300"
                                            />
                                        ) : (
                                            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                                                <FiUser className="text-gray-500" />
                                            </div>
                                        )}
                                        <span className="truncate max-w-[120px]" title={row.name}>{row.name}</span>

                                    </td>
                                    <td className="px-4 py-3">{row.location}</td>
                                    {leaveTypesData.map((type) => {
                                        const leave = row[type.id];
                                        return (
                                            <td key={type.id} className="px-4 py-3 text-center">
                                                {leave ? `${leave.remaining} / ${leave.total}` : "—"}
                                            </td>
                                        );
                                    })}
                                    <td className="px-4 py-3 text-center">{row.totalRemaining}</td>
                                 

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
              
            </div>
        </Layout>
    );
}
