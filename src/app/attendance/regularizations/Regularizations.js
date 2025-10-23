"use client";
import Layout from "y@/app/components/Layout";
import Input from "y@/app/components/Input";
import { useState, useEffect, useRef } from "react";
import SearchBar from "y@/app/components/SearchBar";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import CustomSelect from "y@/app/components/CustomSelect";
import {
    FiUser,
} from "react-icons/fi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Button from "y@/app/components/Button";
import StatusDesign from "y@/app/components/StatusColors";
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
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [remarks, setRemarks] = useState("");
    const [showErrors, setShowErrors] = useState(false);

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
            attachments: ["/api/portraits/men/38.jpg"],
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
            attachments: ["/api/portraits/men/38.jpg"],
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
            attachments: ["/api/portraits/men/38.jpg"],
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

    const handleSave = (e) => {
        e.preventDefault();
        setShowErrors(true);
        if (!locationVal || !departVal || !employee || !dateVal || !checkIn || !checkOut || !remarks) return; // stop submission
        alert("Saved!");
    };
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold text-gray-700">
                        Regularization Requests
                    </h2>
                    <Button type="button" variant="success" onClick={handleOpenModal}>
                        Export Requests
                    </Button>
                </div>
                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-10/12 md:w-8/12 lg:w-6/12">
                            <h3 className="text-lg text-center font-semibold mb-4">Add Attendance</h3>

                            <div className="w-full">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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

                                   
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <CustomSelect
                                        name="employee"
                                        label="Employee"
                                        value={employee}
                                        placeholder="Select Employee"
                                        onChange={setEmployee}
                                        options={employees}
                                        controlHeight="2rem"
                                        error={showErrors && !employee ? "Employee is required" : ""}
                                    />

                                    <Input
                                        type="date"
                                        name="date"
                                        label="Date"
                                        noMargin={true}
                                        value={dateVal}
                                        onChange={(e) => setDateVal(e.target.value)}
                                        error={showErrors && !dateVal ? "Date is required" : ""}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <Input
                                        type="time"
                                        name="checkIn_time"
                                        label="Check In"
                                        noMargin={true}
                                        value={checkIn}
                                        onChange={(e) => setCheckIn(e.target.value)}
                                        error={showErrors && !checkIn ? "Check In time is required" : ""}
                                    />

                                    <Input
                                        type="time"
                                        name="checkOut_time"
                                        label="Check Out"
                                        noMargin={true}
                                        value={checkOut}
                                        onChange={(e) => setCheckOut(e.target.value)}
                                        error={showErrors && !checkOut ? "Check Out time is required" : ""}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="remarks"
                                            className="block text-xxs font-medium text-gray-700 mb-1"
                                        >
                                            Remarks
                                        </label>

                                        <textarea
                                            id="remarks"
                                            name="remarks"
                                            rows="3"
                                            value={remarks}
                                            onChange={(e) => setRemarks(e.target.value)}
                                            className={`w-full px-3 py-1 border rounded-md text-xxs focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none
        ${showErrors && !remarks ? "border-red-500" : "border-gray-300"}
      `}
                                            placeholder="Enter remarks..."
                                        ></textarea>

                                        {showErrors && !remarks && (
                                            <p className="text-xxs text-red-500">Remarks are required</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2">
                                    <Button variant="cancel" onClick={handleCloseModal}>
                                        Cancel
                                    </Button>
                                    <Button variant="success" onClick={handleSave}>
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


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
                                                                                    className="absolute top-full right-16 mt-1 z-50 w-35 bg-white border border-gray-200 rounded-xl shadow-lg"
                                                                                >
                                                                                    <ul className="py-2 text-xxs text-gray-700">
                                                                                        <li>
                                                                                            <button className="flex items-center w-full cursor-pointer px-4 py-2 hover:bg-gray-50">
                                                                                                View Device
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
    );
}
