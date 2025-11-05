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
import { IoCheckmarkDone } from "react-icons/io5";
export default function PayrollEmp() {
    const [date, setDate] = useState("");
    const [designationVal, setDesignationVal] = useState("");
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

  const payrollData = [
    {
        empId: "EMP301",
        name: "Ahsan Qureshi",
        imageUrl: "/api/portraits/men/28.jpg",
        department: "Finance",
        designation: "Senior Accountant",
        basicSalary: 120000,
        allowances: {
            housing: 20000,
            medical: 8000,
            transport: 5000,
        },
        deductions: {
            tax: 12000,
            absences: 0,
            lateArrival: 1000,
        },
        netPay: 140000,
        payPeriod: "October 2025",
        paymentDate: "Oct 31, 2025",
        bankAccount: "Meezan Bank - 0213-5897212",
        statusId: 1,
        status: "Completed",
        approvedBy: "Sarah Ahmed",
    },
    {
        empId: "EMP302",
        name: "Sana Imran",
        imageUrl: "/api/portraits/women/34.jpg",
        department: "HR",
        designation: "HR Officer",
        basicSalary: 95000,
        allowances: {
            housing: 15000,
            medical: 5000,
            transport: 4000,
        },
        deductions: {
            tax: 9500,
            absences: 2,
            lateArrival: 500,
        },
        netPay: 110000,
        payPeriod: "October 2025",
        paymentDate: "Oct 31, 2025",
        bankAccount: "HBL - 0325-9987111",
        statusId: 2,
        status: "Rejected",
        approvedBy: "Ali Khan",
    },
    {
        empId: "EMP303",
        name: "Tahir Hussain",
        imageUrl: "/api/portraits/men/19.jpg",
        department: "IT",
        designation: "Software Engineer",
        basicSalary: 150000,
        allowances: {
            housing: 25000,
            medical: 10000,
            transport: 6000,
        },
        deductions: {
            tax: 15000,
            absences: 0,
            lateArrival: 0,
        },
        netPay: 176000,
        payPeriod: "October 2025",
        paymentDate: "Pending",
        bankAccount: "Allied Bank - 0456-778899",
        statusId: 3,
        status: "Pending",
        approvedBy: "—",
    },
    {
        empId: "EMP304",
        name: "Nimra Gul",
        imageUrl: "/api/portraits/women/41.jpg",
        department: "Marketing",
        designation: "Content Strategist",
        basicSalary: 110000,
        allowances: {
            housing: 18000,
            medical: 7000,
            transport: 4000,
        },
        deductions: {
            tax: 11000,
            absences: 0,
            lateArrival: 0,
        },
        netPay: 128000,
        payPeriod: "October 2025",
        paymentDate: "Oct 31, 2025",
        bankAccount: "UBL - 0256-887799",
        statusId: 4,
        status: "Approved",
        approvedBy: "Hassan Rafiq",
    },
    {
        empId: "EMP305",
        name: "Zeeshan Arif",
        imageUrl: "/api/portraits/men/37.jpg",
        department: "Operations",
        designation: "Logistics Supervisor",
        basicSalary: 90000,
        allowances: {
            housing: 12000,
            medical: 5000,
            transport: 3000,
        },
        deductions: {
            tax: 9000,
            absences: 1000,
            lateArrival: 500,
        },
        netPay: 104500,
        payPeriod: "October 2025",
        paymentDate: "Pending",
        bankAccount: "MCB - 0312-5544789",
        statusId: 3,
        status: "Pending",
        approvedBy: "—",
    },
    {
        empId: "EMP306",
        name: "Amna Yousaf",
        imageUrl: "/api/portraits/women/30.jpg",
        department: "Customer Support",
        designation: "Support Executive",
        basicSalary: 80000,
        allowances: {
            housing: 10000,
            medical: 5000,
            transport: 3000,
        },
        deductions: {
            tax: 8000,
            absences: 0,
            lateArrival: 0,
        },
        netPay: 90000,
        payPeriod: "October 2025",
        paymentDate: "Oct 31, 2025",
        bankAccount: "Bank Alfalah - 0178-3312456",
        statusId: 1,
        status: "Completed",
        approvedBy: "Sara Bukhari",
    },
    {
        empId: "EMP307",
        name: "Hassan Javed",
        imageUrl: "/api/portraits/men/32.jpg",
        department: "IT",
        designation: "Frontend Developer",
        basicSalary: 130000,
        allowances: {
            housing: 20000,
            medical: 7000,
            transport: 6000,
        },
        deductions: {
            tax: 13000,
            absences: 0,
            lateArrival: 500,
        },
        netPay: 150500,
        payPeriod: "October 2025",
        paymentDate: "Oct 31, 2025",
        bankAccount: "Standard Chartered - 0569-334455",
        statusId: 4,
        status: "Approved",
        approvedBy: "Imran Tariq",
    },
    {
        empId: "EMP308",
        name: "Kiran Abbas",
        imageUrl: "/api/portraits/women/38.jpg",
        department: "Legal",
        designation: "Compliance Officer",
        basicSalary: 145000,
        allowances: {
            housing: 22000,
            medical: 10000,
            transport: 5000,
        },
        deductions: {
            tax: 14500,
            absences: 0,
            lateArrival: 0,
        },
        netPay: 167500,
        payPeriod: "October 2025",
        paymentDate: "Oct 31, 2025",
        bankAccount: "HBL - 0998-765432",
        statusId: 1,
        status: "Completed",
        approvedBy: "HR Department",
    },
    {
        empId: "EMP309",
        name: "Usama Iqbal",
        imageUrl: "/api/portraits/men/45.jpg",
        department: "IT",
        designation: "Backend Developer",
        basicSalary: 155000,
        allowances: {
            housing: 25000,
            medical: 9000,
            transport: 5000,
        },
        deductions: {
            tax: 15500,
            absences: 1,
            lateArrival: 0,
        },
        netPay: 178500,
        payPeriod: "October 2025",
        paymentDate: "Pending",
        bankAccount: "Meezan Bank - 0334-556677",
        statusId: 3,
        status: "Pending",
        approvedBy: "—",
    },
    {
        empId: "EMP310",
        name: "Hira Rehman",
        imageUrl: "/api/portraits/women/47.jpg",
        department: "Sales",
        designation: "Sales Executive",
        basicSalary: 100000,
        allowances: {
            housing: 15000,
            medical: 5000,
            transport: 5000,
        },
        deductions: {
            tax: 10000,
            absences: 0,
            lateArrival: 0,
        },
        netPay: 110000,
        payPeriod: "October 2025",
        paymentDate: "Oct 31, 2025",
        bankAccount: "MCB - 0444-223344",
        statusId: 4,
        status: "Approved",
        approvedBy: "Sana Tariq",
    },
];





    const departments = mapSelectOptions(
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
                        August 2025 – Lahore (Lahore)
                    </h2>
                    <Button type="button" variant="transparent" color="red" bgColor="gray">
                        Export Payroll
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
                                name="department"
                                value={department}
                                placeholder="Department"
                                onChange={setDepartment}
                                options={departments}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="mb-1 w-[9rem]">
                            <CustomSelect
                                name="desig"
                                value={designationVal}
                                placeholder="Designation"
                                onChange={setDesignationVal}
                                options={departments}
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
                                <th className="px-4 py-3 text-left">Department</th>
                                <th className="px-4 py-3 text-left">Designation</th>
                                <th className="px-4 py-3 text-left">Basic Salary</th>
                                <th className="px-4 py-3 text-left">Allowances</th>
                                <th className="px-4 py-3 text-left">Deductions</th>
                                <th className="px-4 py-3 text-left">Net Pay</th>
                                <th className="px-4 py-3 text-left">Payment Date</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {payrollData.map((row, idx) => (
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
                                    <td className="px-4 py-3">{row.department}</td>
                                    <td className="px-4 py-3">{row.designation}</td>
                                    <td className="px-4 py-3">{row.basicSalary.toLocaleString()}</td>
                                    <td className="px-4 py-3">{(row.allowances.housing + row.allowances.medical + row.allowances.transport).toLocaleString()}</td>
                                    <td className="px-4 py-3">{(row.deductions.tax + row.deductions.absences + row.deductions.lateArrival).toLocaleString()}</td>
                                    <td className="px-4 py-3">{row.netPay.toLocaleString()}</td>
                                    <td className="px-4 py-3">{row.paymentDate}</td>
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
                                                            <FiEye className="mr-2 text-sm" /> View Detail
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="flex items-center w-full cursor-pointer px-4 py-2 hover:bg-gray-50">
                                                            <MdDone className="mr-2 text-sm" /> Approve
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="flex items-center w-full cursor-pointer px-4 py-2 hover:bg-gray-50 hover:text-green-700">
                                                            <IoCheckmarkDone className="mr-2 text-sm" /> Complete
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button onClick={openReasonModal} className="flex items-center w-full cursor-pointer px-4 py-2 hover:bg-gray-50 text-red-500">
                                                            <RxCross2 className="mr-2 text-sm" /> Reject
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
                <ReasonModal
                    isOpen={isReasonOpen}
                    title="Reject Leave Request"
                    infoSection={
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
