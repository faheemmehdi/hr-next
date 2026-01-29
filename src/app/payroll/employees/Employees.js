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

import Pending from "./tabs/Pending";
import Approved from "./tabs/Approved";
import Paid from "./tabs/Paid";
import Tabs from "y@/app/components/Tabs";
import All from "./tabs/All";
import Modal from "y@/app/components/ModalShell";
export default function PayrollEmp() {
    const [activeTab, setActiveTab] = useState("");
    const [date, setDate] = useState("");
    const [designationVal, setDesignationVal] = useState("");
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [selectedRow, setSelectedRow] = useState(null);
    const [modalType, setModalType] = useState(null);
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
    const openReasonModal = (type, row) => {
        setModalType(type);
        setSelectedRow(row);
        setIsReasonOpen(true);
    };

    const closeReasonModal = () => {
        setIsReasonOpen(false);
        setModalType(null);
        setSelectedRow(null);
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
            status: "Paid",
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
            paymentDate: "",
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
            paymentDate: "",
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
            status: "Paid",
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
            status: "Paid",
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
            paymentDate: "",
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


    const employees = mapSelectOptions(
        [
            { id: 1, name: "Ahmad Raza" },
            { id: 2, name: "Fatima Khan" },
            { id: 3, name: "Ali Qureshi" },
            { id: 4, name: "Sara Malik" },
            { id: 5, name: "Bilal Ahmed" },
            { id: 6, name: "Zainab Iqbal" },
            { id: 7, name: "Usman Tariq" },
            { id: 8, name: "Hira Shah" },
            { id: 9, name: "Hamza Sheikh" },
            { id: 10, name: "Maryam Noor" },
        ],
        "id",
        "name"
    );

    const filters = {
        data: payrollData || [],
        departments,
        statuses,
        department,
        onDepartmentChange: setDepartment,
        designationVal,
        onDesignationChange: setDesignationVal,
        search,
        onSearch: setSearch,
        status,
        onStatusChange: setStatus,
        date,
        onDateChange: setDate,
        onReject: openReasonModal


    }
    const tabs = [
        { key: "all", label: "All Employees", content: <All {...filters} /> },
        { key: "pending", label: "Pending", content: <Pending {...filters} /> },
        { key: "approved", label: "Approved", content: <Approved {...filters} /> },
        { key: "paid", label: "Paid", content: <Paid {...filters} /> },
    ];

    const modalConfig = {
        approve: {
            title: "Approve Payroll Record",
            variant: "success",
            reasonHeading: "Approval Remarks",
            reasonTitle: "Add remarks for approving this single employee record.",
            submitLabel: "Approve Request",
        },
        pending: {
            title: "Pending Payroll Record",
            variant: "success",
            reasonHeading: "Pending Reason",
            reasonTitle: "Add remarks for pending this single employee record",
            submitLabel: "Pending",
        },
        paid: {
            title: "Mark Payroll as Paid",
            variant: "success",
            reasonHeading: "Payment Remarks",
            reasonTitle: "Add remarks for paying this single employee record",
            submitLabel: "Confirm Paid",
        },
        reject: {
            title: "Reject Payroll Record",
            variant: "danger",
            reasonHeading: "Rejection Reason",
            reasonTitle: "Add remarks for rejecting this single employee record.",
            submitLabel: "Reject",
        },
    };

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold text-gray-700">
                        August 2025 – Lahore (Lahore)
                    </h2>
                    <div className="flex gap-2">
                        <Button type="button" variant="transparent" color="#7764e3" bgColor="transparent">
                            Export Payroll
                        </Button>

                        {activeTab === 'pending' && <Button type="button" variant="success" onClick={handleOpenModal}>
                            Approve All
                        </Button>}
                        {activeTab === 'approved' && <Button type="button" variant="success" onClick={handleOpenModal}>
                            Mark All as Paid
                        </Button>}
                    </div>

                </div>

                <Tabs tabs={tabs} defaultTab="all" onTabChange={setActiveTab} align="center" />

                {isOpen && (
                    <Modal width="w-11/12 md:w-4/12">
                        <div className="mb-1">
                            <div className="flex justify-between">
                                <h2 className="text-lg font-semibold text-gray-800">{activeTab === 'pending' && "Approve All Employees"}{activeTab === 'approved' && "Mark All Employees as Paid"}</h2>

                            </div>
                        </div>

                        <div className="text-xxs mb-3 text-gray-500 text-justify">Excluded employees will not be processed. You may exclude specific employees whose payroll requires further review, justification, or adjustments before processing.</div>
                        <CustomSelect
                            name="employee"
                            label="Exclude Employees"
                            value={employee}
                            placeholder="Select Employee"
                            onChange={setEmployee}
                            options={employees}
                            isMulti={true}
                            controlHeight="2rem"
                        />
                        <div className="mt-4">
                            <label
                                htmlFor="reasonText"
                                className="block text-xxs text-gray-700 mb-2"
                            >
                                Remarks / Description
                            </label>
                            <textarea
                                id="reasonText"
                                rows="4"
                                placeholder="Write remarks here..."
                                className="w-full rounded border border-gray-300 p-3 text-gray-800 text-xxs resize-none 
                  focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-300 transition-all duration-150"
                            />
                        </div>
                        <div className="flex justify-end gap-2 pt-3">
                            <Button variant="cancel" onClick={handleCloseModal}>
                                Cancel
                            </Button>
                            <Button variant="success">
                                Update
                            </Button>
                        </div>
                    </Modal>
                )}

                {isReasonOpen && modalType && (
                    <ReasonModal
                        isOpen={isReasonOpen}
                        title={modalConfig[modalType].title}
                        infoSection={
                            <div className="border-gray-300 border-b p-1 mb-4">
                                <p className="text-xs text-gray-800 font-medium">
                                    <span className="font-semibold">{selectedRow?.name}</span>
                                </p>
                                <p className="text-xxs text-gray-600">
                                    <span>Employee ID:</span> {selectedRow?.empId}
                                </p>
                                <p className="text-xxs text-gray-600">
                                    <span>Designation:</span> {selectedRow?.designation}
                                </p>

                                <p className="text-xxs text-gray-600">
                                    <span>Net Pay:</span> {selectedRow?.netPay}
                                </p>
                                <p className="text-xxs text-gray-600">
                                    <span>Payroll Period:</span> August - 2025
                                </p>

                            </div>}
                        onClose={closeReasonModal}
                        // onSubmit={handleReject}
                        variant={modalConfig[modalType].variant}
                        submitLabel={modalConfig[modalType].submitLabel}
                        reasonHeading={modalConfig[modalType].reasonHeading}
                        reasonTitle={modalConfig[modalType].reasonTitle}
                    />
                )}
            </div>
        </Layout>
    );
}
