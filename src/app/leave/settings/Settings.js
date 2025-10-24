"use client";
import Layout from "y@/app/components/Layout";
import Input from "y@/app/components/Input";
import { useState, useEffect, useRef } from "react";
import SearchBar from "y@/app/components/SearchBar";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import CustomSelect from "y@/app/components/CustomSelect";
import {
    FiEdit3, FiEye
} from "react-icons/fi";
import { FaDotCircle } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Button from "y@/app/components/Button";
import StatusDesign from "y@/app/components/StatusColors";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineBlock } from "react-icons/md";
export default function LeaveSettings() {
    const [date, setDate] = useState("");
    const [dateVal, setDateVal] = useState("");
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

const leaveTypesData = [
  {
    typeId: 1,
    code: "AL",
    name: "Annual Leave",
    annualLimit: 20,
    accrual: "Yearly",
    carryForward: 1, // 1 = Allowed
    carryForwardDays: 10,
    encashment: 1, // 1 = Allowed
    eligibility: "Confirmed employees only",
    probation: 0, // 0 = Not allowed
    location: "All Locations",
    statusId: 1,
    status: "Active",
  },
  {
    typeId: 2,
    code: "SL",
    name: "Sick Leave",
    annualLimit: 8,
    accrual: "Monthly",
    carryForward: 0,
    carryForwardDays: 0,
    encashment: 0,
    eligibility: "All employees",
    probation: 1,
    location: "All Locations",
    statusId: 1,
    status: "Active",
  },
  {
    typeId: 3,
    code: "CL",
    name: "Casual Leave",
    annualLimit: 12,
    accrual: "Monthly",
    carryForward: 1,
    carryForwardDays: 6,
    encashment: 0,
    eligibility: "All confirmed staff",
    probation: 0,
    location: "Lahore HQ",
    statusId: 1,
    status: "Active",
  },
  {
    typeId: 4,
    code: "ML",
    name: "Maternity Leave",
    annualLimit: 90,
    accrual: "On Application",
    carryForward: 0,
    carryForwardDays: 0,
    encashment: 0,
    eligibility: "Female employees only",
    probation: 0,
    location: "Karachi HQ",
    statusId: 1,
    status: "Active",
  },
  {
    typeId: 5,
    code: "PL",
    name: "Paternity Leave",
    annualLimit: 10,
    accrual: "On Application",
    carryForward: 0,
    carryForwardDays: 0,
    encashment: 0,
    eligibility: "Male employees only",
    probation: 0,
    location: "Islamabad Office",
    statusId: 2,
    status: "Inactive",
  },
  {
    typeId: 6,
    code: "EL",
    name: "Emergency Leave",
    annualLimit: 5,
    accrual: "On Need Basis",
    carryForward: 0,
    carryForwardDays: 0,
    encashment: 0,
    eligibility: "All employees",
    probation: 1,
    location: "All Locations",
    statusId: 1,
    status: "Active",
  },
  {
    typeId: 7,
    code: "WFH",
    name: "Work From Home",
    annualLimit: 12,
    accrual: "Monthly",
    carryForward: 0,
    carryForwardDays: 0,
    encashment: 0,
    eligibility: "Eligible roles only",
    probation: 1,
    location: "Remote / Hybrid",
    statusId: 2,
    status: "Inactive",
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
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-screen p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold text-gray-700">
                        Leave Types & Policies
                    </h2>
                    <Button type="button" variant="success">
                        Add Leave Type
                    </Button>
                </div>

                {/* Search + Date Filter (UI only; logic handled in backend) */}
                <div className="flex justify-between items-center my-3 mt-5">
                    <div className="w-1/5 flex items-center mb-1">
                        <SearchBar
                            placeholder="Search by name or Code..."
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
                                <th className="px-4 py-3 text-left rounded-tl-md">Code</th>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Location</th>
                                <th className="px-4 py-3 text-left">Annual Limit</th>
                                <th className="px-4 py-3 text-left">Accrual</th>
                                <th className="px-4 py-3 text-left">Carry Forward</th>
                                <th className="px-4 py-3 text-left">Encashment</th>
                                <th className="px-4 py-3 text-left">Eligibility</th>
                                <th className="px-4 py-3 text-left">Probation</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {leaveTypesData.map((row, idx) => (
                                <tr
                                    key={idx}
                                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        } hover:bg-gray-100 transition-colors`}
                                >
                                    <td className="px-4 py-3">{row.code}</td>
                                    <td className="px-4 py-3 truncate max-w-[120px]" title={row.name}>{row.name}</td>
                                    <td className="px-4 py-3">{row.location}</td>
                                    <td className="px-4 py-3">{row.annualLimit} Days</td>
                                    <td className="px-4 py-3">{row.accrual}</td>
                                    <td className="px-4 py-3">{row.carryForward ? 'Up to ' + row.carryForwardDays + ' Days' : 'No'}</td>
                                    <td className="px-4 py-3">{row.encashment ? 'Allowed' : 'No'}</td>
                                    <td className="px-4 py-3">{row.eligibility}</td>
                                    <td className="px-4 py-3">{row.probation ? 'Allowed' : 'No'}</td>
                                    <td className="px-4 py-3">
                                        <StatusDesign statusId={row.statusId} label={row.status} />
                                    </td>

                                    <td className="px-4 py-3 relative">
                                        <button
                                            onClick={() => handleMenuToggle(row.typeId)}
                                            className="p-1 rounded-full hover:bg-gray-100 transition cursor-pointer"
                                        >
                                            <BiDotsVerticalRounded className="text-gray-600 text-sm" />
                                        </button>

                                        {openMenuId === row.typeId && (
                                            <div
                                                ref={menuRef}
                                                className="absolute top-5 right-16 mt-1 z-50 w-40 bg-white border border-gray-200 rounded-xl shadow-lg"
                                            >
                                                <ul className="py-2 text-xxs text-gray-700">
                                                    <li>
                                                        <button onClick={handleOpenModal} className="flex items-center w-full cursor-pointer px-4 py-2 hover:bg-gray-50">
                                                            <FiEye className="mr-2 text-sm" /> View Leave Type
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="flex items-center w-full cursor-pointer px-4 py-2 hover:bg-gray-50">
                                                            <FiEdit3 className="mr-2 text-sm" /> Edit Leave Type
                                                        </button>
                                                    </li>
                                                     <li>
                                                        <button onClick={openReasonModal} className="flex items-center w-full cursor-pointer px-4 py-2 hover:bg-gray-50 hover:text-red-500">
                                                            <MdOutlineBlock className="mr-2 text-sm" /> Deactivate
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button onClick={openReasonModal} className="flex items-center w-full cursor-pointer px-4 py-2 hover:bg-gray-50 text-red-500">
                                                            <RxCross2 className="mr-2 text-sm" /> Delete Leave Type
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
                                            <h2 className="text-lg font-semibold text-gray-800">Leave Request Details</h2>
                                            <span className="inline-flex items-center px-2 py-1 text-xxs font-medium rounded-full bg-yellow-100 text-yellow-700">
                                                Pending
                                            </span>
                                        </div>
                                        <p className="text-xxs text-gray-500">Applied on Oct 20, 2025 at 09:10 AM</p>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                        <div>
                                            <p className="text-xxs text-gray-500 font-medium">Employee Name</p>
                                            <p className="text-xs font-semibold text-gray-800">Muhammad Khan</p>
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
                                            <p className="text-xxs text-gray-500 font-medium">Shift</p>
                                            <p className="text-xs text-gray-800">Morning (9:00 AM - 6:00 PM)</p>
                                        </div>
                                        <div>
                                            <p className="text-xxs text-gray-500 font-medium">Leave Type</p>
                                            <p className="text-xs text-gray-800">Sick Leave</p>
                                        </div>
                                        <div>
                                            <p className="text-xxs text-gray-500 font-medium">Leave Days</p>
                                            <p className="text-xs text-gray-800">3 Days</p>
                                        </div>
                                    </div>
 <div className="grid grid-cols-1 md:grid-cols-1 mb-4">
                                        <div>
                                            <p className="text-xxs text-gray-500 font-medium">Applied Dates</p>
                                            <div className="flex text-xxs">
                                            <p className="text-gray-800">17 Feb 2025</p><strong className="px-3 text-gray-500">|</strong>
                                            <p className="text-gray-800">18 Feb 2025</p><strong className="px-3 text-gray-500">|</strong>
                                            <p className="text-gray-800">19 Feb 2025</p>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-400 pt-4 mb-4">
                                       
                                        <p className="text-xxs text-gray-500 font-medium mb-1">Reason Provided</p>
                                        <p className="text-xs text-gray-800 text-justify">
                                           Relocation and house shifting.
                                        </p>
                                    </div>

                                    <div className="border-t border-gray-400 pt-4 mb-4">
                                        <p className="text-xxs text-gray-500 font-medium mb-2">Attachment</p>
                                        <div className="bg-gray-50 border border-gray-200 rounded px-2 py-1 flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <FaDotCircle className="h-2 w-2 text-gray-500" />
                                                <span className="text-xxs text-gray-700">Card.jpg</span>
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

                {isReasonOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-10/12 md:w-4/12">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Reject Leave Request
                                </h2>

                            </div>

                            {/* Employee Info */}
                            <div className="border-gray-300 border-b p-1 mb-4">
                                <p className="text-xs text-gray-800 font-medium">
                                    <span className="font-semibold">Muhammad Khan</span>
                                </p>
                                <p className="text-xxs text-gray-600">
                                    <span>Employee ID:</span> EMP-1024
                                </p>
                                <p className="text-xxs text-gray-600">
                                    <span>Applied Dates:</span> 3 Oct - 5 Oct (3 Days)
                                </p>
                                <p className="text-xxs text-gray-600">
                                    <span>Leave Type:</span> Casual Leave
                                </p>
                                <p className="text-xxs text-gray-600">
                                    <span>Reason:</span> “Relocation and house shifting.”
                                </p>
                            </div>

                            {/* Instruction */}
                            <p className="text-xxs text-gray-600 mb-4">
                                Please provide a reason for rejecting this request. The reason will be shared with the employee.
                            </p>

                            {/* Textarea */}
                            <div className="mb-6">
                                <label
                                    htmlFor="rejectionReason"
                                    className="block text-xxs text-gray-700 mb-2"
                                >
                                    Rejection Reason <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="rejectionReason"
                                    rows="4"
                                    placeholder="Write your reason here..."
                                    className="w-full rounded border border-gray-300 p-3 text-gray-800 text-xxs resize-none 
             focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-300 transition-all duration-150"
                                />

                            </div>


                            <div className="flex justify-end gap-2">
                                <Button variant="cancel" onClick={closeReasonModal}>
                                    Close
                                </Button>
                                <Button variant="danger">
                                    Reject Request
                                </Button>
                            </div>


                        </div>
                    </div>
                )}

            </div>
        </Layout>
    );
}
