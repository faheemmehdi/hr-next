"use client";
import Layout from "y@/app/components/Layout";
import Input from "y@/app/components/Input";
import { useState, useEffect, useRef } from "react";
import SearchBar from "y@/app/components/SearchBar";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import CustomSelect from "y@/app/components/CustomSelect";
import ReasonModal from "y@/app/components/ReasonConfirmModal";
import {
    FiUser, FiEye
} from "react-icons/fi";
import { FaDotCircle } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Button from "y@/app/components/Button";
import StatusDesign from "y@/app/components/StatusColors";
import { RxCross2 } from "react-icons/rx";
import { MdDone } from "react-icons/md";
export default function Regularization() {
    const [date, setDate] = useState("");
    const [dateVal, setDateVal] = useState("");
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
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

    const regularizationData = [
        {
            empId: "EMP201",
            name: "Hassan Javed",
            imageUrl: "/api/portraits/men/38.jpg",
            location: "Karachi HQ",
            date: "2025-10-18",
            requestType: "Missed Check-In",
            reason: "Forgot to mark attendance after morning meeting.",
            submittedOn: "2025-10-18 09:20 AM",
            attachments: ["/api/portraits/men/attache.jpg"],
            statusId: 3,
            status: "Pending",
        },
        {
            empId: "EMP202",
            name: "Amna Yousaf",
            imageUrl: "/api/portraits/women/21.jpg",
            location: "Lahore",
            date: "2025-10-17",
            requestType: "Manual Attendance",
            reason: "Visited client site, device unavailable.",
            submittedOn: "2025-10-17 06:10 PM",
            attachments: ["/api/portraits/men/screenshot.jpg"],
            statusId: 1,
            status: "Approved",
        },
        {
            empId: "EMP203",
            name: "Salman Rafiq",
            imageUrl: "/api/portraits/men/25.jpg",
            location: "Remote (Hybrid)",
            date: "2025-10-19",
            requestType: "Missed Check-Out",
            reason: "Wi-Fi disconnect caused missed checkout.",
            submittedOn: "2025-10-19 09:05 PM",
            attachments: [],
            statusId: 2,
            status: "Rejected",
        },
        {
            empId: "EMP204",
            name: "Nimra Gul",
            imageUrl: "/api/portraits/women/29.jpg",
            location: "Islamabad",
            date: "2025-10-20",
            requestType: "Incorrect Shift",
            reason: "Shift timing assigned incorrectly by HR.",
            submittedOn: "2025-10-20 02:45 PM",
            attachments: ["/api/portraits/men/attendance.jpg"],
            statusId: 3,
            status: "Pending",
        },
        {
            empId: "EMP205",
            name: "Zeeshan Arif",
            imageUrl: "/api/portraits/men/32.jpg",
            location: "Lahore",
            date: "2025-10-19",
            requestType: "Manual Attendance",
            reason: "Worked at field site without device access.",
            submittedOn: "2025-10-19 04:10 PM",
            attachments: ["/api/portraits/men/38.jpg"],
            statusId: 1,
            status: "Approved",
        },
        {
            empId: "EMP206",
            name: "Kiran Abbas",
            imageUrl: "/api/portraits/women/35.jpg",
            location: "Karachi HQ",
            date: "2025-10-18",
            requestType: "Missed Check-In",
            reason: "Device malfunctioned during login.",
            submittedOn: "2025-10-18 10:15 AM",
            attachments: [],
            statusId: 2,
            status: "Rejected",
        },
        {
            empId: "EMP207",
            name: "Tahir Hussain",
            imageUrl: "/api/portraits/men/38.jpg",
            location: "Islamabad",
            date: "2025-10-20",
            requestType: "Check-In Correction",
            reason: "App recorded wrong timestamp.",
            submittedOn: "2025-10-20 11:00 AM",
            attachments: ["correction-proof.jpg"],
            statusId: 3,
            status: "Pending",
        },
        {
            empId: "EMP208",
            name: "Sana Khalid",
            imageUrl: "/api/portraits/women/44.jpg",
            location: "Lahore",
            date: "2025-10-21",
            requestType: "Missed Attendance",
            reason: "Forgot to log attendance during client travel.",
            submittedOn: "2025-10-21 06:30 PM",
            attachments: ["travel-document.pdf"],
            statusId: 1,
            status: "Approved",
        },
        {
            empId: "EMP209",
            name: "Usama Iqbal",
            imageUrl: "/api/portraits/men/49.jpg",
            location: "Remote (Home)",
            date: "2025-10-18",
            requestType: "Half Day Correction",
            reason: "System marked full day absent instead of half day.",
            submittedOn: "2025-10-18 12:45 PM",
            attachments: [],
            statusId: 3,
            status: "Pending",
        },
        {
            empId: "EMP210",
            name: "Hira Rehman",
            imageUrl: "/api/portraits/women/50.jpg",
            location: "Karachi HQ",
            date: "2025-10-19",
            requestType: "Manual Check-Out",
            reason: "Forgot to checkout after client meeting.",
            submittedOn: "2025-10-19 08:55 PM",
            attachments: ["meeting-notes.pdf"],
            statusId: 1,
            status: "Approved",
        },
    ];




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
                        Regularization Requests
                    </h2>
                    <Button type="button" variant="success">
                        Export Requests
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
                                name="status"
                                value={status}
                                placeholder="Status"
                                onChange={setStatus}
                                options={statuses}
                                controlHeight="2rem"
                            />
                        </div>
                        <Input
                            type="date"
                            name="date"
                            noMargin={true}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
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
                                <th className="px-4 py-3 text-left">Date</th>
                                <th className="px-4 py-3 text-left">Request Type</th>
                                <th className="px-4 py-3 text-left">Reason</th>
                                <th className="px-4 py-3 text-left">Submitted On</th>
                                <th className="px-4 py-3 text-left">Attachements</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {regularizationData.map((row, idx) => (
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
                                    <td className="px-4 py-3">{row.date}</td>
                                    <td className="px-4 py-3 truncate max-w-[120px]">{row.requestType}</td>
                                    <td className="px-4 py-3 truncate max-w-[120px]" title={row.reason}>{row.reason}</td>
                                    <td className="px-4 py-3">{row.submittedOn}</td>
                                    <td className="px-4 py-3">
                                        {row.attachments && row.attachments.length > 0 ? (
                                            <div className="flex flex-wrap gap-2">
                                                {row.attachments.map((file, i) => {
                                                    const fileName = file.split("/").pop(); // 👈 extracts only "file.pdf"

                                                    return (
                                                        <a
                                                            key={i}
                                                            target="_blank"
                                                            href={`${baseUrl}${file}`}
                                                            className="text-xxs px-2 py-1 rounded bg-blue-50 text-blue-500 border border-blue-100 hover:bg-blue-100 transition inline-flex items-center"
                                                            title={fileName}
                                                        >
                                                            <i className="bi bi-paperclip me-1"></i>
                                                            {fileName.length > 15 ? fileName.substring(0, 12) + "…" : fileName}
                                                        </a>
                                                    );
                                                })}

                                            </div>
                                        ) : (
                                            <span className="text-gray-400 text-xxs italic">No Attachment</span>
                                        )}
                                    </td>

                                    <td className="px-4 py-3">
                                        <StatusDesign statusId={row.statusId} label={row.status} />
                                    </td>

                                    <td className="px-4 py-3 relative">
                                        <button
                                            onClick={() => handleMenuToggle(row.empId)}
                                            className="p-1 rounded-full hover:bg-gray-100 transition cursor-pointer"
                                        >
                                            <BiDotsVerticalRounded className="text-gray-600 text-sm" />
                                        </button>

                                        {openMenuId === row.empId && (
                                            <div
                                                ref={menuRef}
                                                className="absolute top-5 right-16 mt-1 z-50 w-37 bg-white border border-gray-200 rounded-xl shadow-lg"
                                            >
                                                <ul className="py-2 text-xxs text-gray-700">
                                                    <li>
                                                        <button onClick={handleOpenModal} className="flex items-center w-full cursor-pointer px-4 py-2 hover:bg-gray-50">
                                                            <FiEye className="mr-2 text-sm" /> View Request
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="flex items-center w-full cursor-pointer px-4 py-2 hover:bg-gray-50 hover:text-green-700">
                                                            <MdDone className="mr-2 text-sm" /> Approve Request
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button onClick={openReasonModal} className="flex items-center w-full cursor-pointer px-4 py-2 hover:bg-gray-50 text-red-500">
                                                            <RxCross2 className="mr-2 text-sm" /> Reject Request
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
                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-10/12 md:w-5/12">

                            <div className="w-full">
                                <div className="px-5 py-1 bg-white rounded-xl">

                                    <div className="border-b border-gray-400 pb-3 mb-4">
                                        <div className="flex justify-between">
                                            <h2 className="text-lg font-semibold text-gray-800">Regularization Request Details</h2>
                                            <span className="inline-flex items-center px-2 py-1 text-xxs font-medium rounded-full bg-green-100 text-green-700">
                                                Approved
                                            </span>
                                        </div>
                                        <p className="text-xxs text-gray-500">Submitted on Oct 20, 2025 at 09:10 AM</p>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                        <div>
                                            <p className="text-xxs text-gray-500 font-medium">Employee Name</p>
                                            <p className="text-xs font-semibold text-gray-800">Ali Khan</p>
                                        </div>
                                        <div>
                                            <p className="text-xxs text-gray-500 font-medium">Employee ID</p>
                                            <p className="text-xs text-gray-800">EMP-102</p>
                                        </div>
                                        <div>
                                            <p className="text-xxs text-gray-500 font-medium">Department</p>
                                            <p className="text-xs text-gray-800">Sales</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                        <div>
                                            <p className="text-xxs text-gray-500 font-medium">Date</p>
                                            <p className="text-xs text-gray-800">Oct 19, 2025</p>
                                        </div>
                                        <div>
                                            <p className="text-xxs text-gray-500 font-medium">Shift</p>
                                            <p className="text-xs text-gray-800">Morning (9:00 AM - 6:00 PM)</p>
                                        </div>
                                        <div>
                                            <p className="text-xxs text-gray-500 font-medium">Method</p>
                                            <p className="text-xs text-gray-800">Biometric</p>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-400 pt-4 mb-4">
                                        <p className="text-xxs text-gray-500 font-medium mb-1">Request Type</p>
                                        <p className="text-xs font-semibold text-gray-800 mb-3">Missed Punch (In-Time Correction)</p>

                                        <p className="text-xxs text-gray-500 font-medium mb-1">Reason Provided</p>
                                        <p className="text-xs text-gray-800 text-justify">
                                            Attended client meeting offsite, forgot to punch in.Attended client meeting offsite, forgot to punch in.
                                        </p>
                                    </div>

                                    <div className="border-t border-gray-400 pt-4 mb-4">
                                        <p className="text-xxs text-gray-500 font-medium mb-2">Attachment</p>
                                        <div className="bg-gray-50 border border-gray-200 rounded px-2 py-1 flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <FaDotCircle className="h-2 w-2 text-gray-500" />
                                                <span className="text-xxs text-gray-700">client_meeting.jpg</span>
                                            </div>
                                            <button className="text-xxs text-blue-600 hover:underline">View</button>
                                        </div>
                                    </div>

                                    <div className="flex justify-end border-t border-gray-400 pt-4">
                                        <Button variant="cancel" onClick={handleCloseModal}>
                                            Close
                                        </Button>
                                        {/* <Button variant="success" onClick={handleSave}>
                                        Save
                                    </Button> */}
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>
                )}

                <ReasonModal
                    isOpen={isReasonOpen}
                    title="Reject Regularization Request"
                    infoSection={
                        <div className="border-gray-300 border-b p-1 mb-4">
                            <p className="text-xs text-gray-800 font-medium">
                                <span className="font-semibold">Muhammad Ali</span>
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Employee ID:</span> EMP-1024
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Date:</span> 15 Oct 2025
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Reason:</span> “Marked Absent by Mistake”
                            </p>
                        </div>}
                    onClose={closeReasonModal}
                    // onSubmit={handleReject}
                    submitLabel="Reject Request"
                    reasonTitle="Please provide a reason for rejecting this request. The reason will be shared with the employee."
                />

            </div>
        </Layout>
    );
}
