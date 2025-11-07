"use client";
import Layout from "y@/app/components/Layout";
import Input from "y@/app/components/Input";
import { useState, useEffect, useRef, forwardRef } from "react";
import SearchBar from "y@/app/components/SearchBar";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import CustomSelect from "y@/app/components/CustomSelect";
import {
    FiEdit3, FiEye
} from "react-icons/fi";
import { FaDotCircle } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Button from "y@/app/components/Button";
import StatusDesign from "y@/app/components/StatusColors";
import ReasonModal from "y@/app/components/ReasonConfirmModal";
import { RxCross2 } from "react-icons/rx";
import { MdDone } from "react-icons/md";
import MonthPicker from "y@/app/components/MonthPicker";
import DateRangePicker from "y@/app/components/DateRagePicker";
import { useRouter } from "next/navigation";
import RowActions from "y@/app/components/RowActions";
export default function PayRollList() {
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
    const [monthVal, setMonthVal] = useState("");
    const [selectedPayroll, setSelectedPayroll] = useState(null);
    const [remarks, setRemarks] = useState("");
    const [showErrors, setShowErrors] = useState(false);

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const openReasonModal = (row) => {setIsReasonOpen(true); setSelectedPayroll(row)};
    const closeReasonModal = () => setIsReasonOpen(false);
    const [range, setRange] = useState([
        {
            startDate: undefined,
            endDate: undefined,
            key: 'selection'
        }
    ]);
    const router = useRouter();
   
    const handleRowClick = (id) => {
        router.push(`/payroll/employees/`);
    };

    const payrollData = [
        {
            id: "PR-2025-001",
            title: "August 2025 – Lahore HQ",
            location: "Lahore HQ",
            department: "All Departments",
            totalEmployees: 58,
            payPeriodStart: "2025-08-01",
            payPeriodEnd: "2025-08-31",
            generatedDate: "2025-09-02",
            totalAmount: 4520000,
            statusId: 1,
            status: "Completed",
            approvedBy: "Hhsan Qureshi",
            approvedDate: "2025-09-03",
            remarks: "Payroll processed successfully.",
            payCycleType: "Monthly",
        },
        {
            id: "PR-2025-002",
            title: "August 2025 – Karachi Office",
            location: "Karachi Office",
            department: "Engineering",
            totalEmployees: 42,
            payPeriodStart: "2025-08-01",
            payPeriodEnd: "2025-08-31",
            generatedDate: "2025-09-03",
            totalAmount: 3890000,
            statusId: 4,
            status: "Approved",
            approvedBy: "Sara Ahmed",
            approvedDate: "2025-09-04",
            remarks: "Waiting for finance transfer.",
            payCycleType: "Monthly",
        },
        {
            id: "PR-2025-003",
            title: "Aug–Sep 2025 – Islamabad Office",
            location: "Islamabad Office",
            department: "Sales",
            totalEmployees: 35,
            payPeriodStart: "2025-08-15",
            payPeriodEnd: "2025-09-14",
            generatedDate: "2025-09-16",
            totalAmount: 3100000,
            statusId: 3,
            status: "Pending",
            approvedBy: null,
            approvedDate: null,
            remarks: "Awaiting HR review.",
            payCycleType: "Bi-weekly",
        },
        {
            id: "PR-2025-004",
            title: "September 2025 – Remote Staff",
            location: "Remote (Hybrid)",
            department: "Support",
            totalEmployees: 22,
            payPeriodStart: "2025-09-01",
            payPeriodEnd: "2025-09-30",
            generatedDate: "2025-10-02",
            totalAmount: 1725000,
            statusId: 1,
            status: "Completed",
            approvedBy: "HNimra Gul",
            approvedDate: "2025-10-03",
            remarks: "Includes remote incentives.",
            payCycleType: "Monthly",
        },
        {
            id: "PR-2025-005",
            title: "September 2025 – Lahore HQ",
            location: "Lahore HQ",
            department: "Finance",
            totalEmployees: 14,
            payPeriodStart: "2025-09-01",
            payPeriodEnd: "2025-09-30",
            generatedDate: "2025-10-01",
            totalAmount: 980000,
            statusId: 4,
            status: "Approved",
            approvedBy: "Filal Hussain",
            approvedDate: "2025-10-02",
            remarks: "Approved for disbursement.",
            payCycleType: "Monthly",
        },
        {
            id: "PR-2025-006",
            title: "September 2025 – Karachi Office",
            location: "Karachi Office",
            department: "Operations",
            totalEmployees: 26,
            payPeriodStart: "2025-09-01",
            payPeriodEnd: "2025-09-30",
            generatedDate: "2025-10-01",
            totalAmount: 2050000,
            statusId: 3,
            status: "Pending",
            approvedBy: null,
            approvedDate: null,
            remarks: "Payroll draft created.",
            payCycleType: "Monthly",
        },
        {
            id: "PR-2025-007",
            title: "Oct–Nov 2025 – Contractual Staff",
            location: "Lahore HQ",
            department: "Project Alpha",
            totalEmployees: 18,
            payPeriodStart: "2025-10-15",
            payPeriodEnd: "2025-11-15",
            generatedDate: "2025-11-17",
            totalAmount: 1420000,
            statusId: 2,
            status: "Rejected",
            approvedBy: null,
            approvedDate: null,
            remarks: "Rejected approval.",
            payCycleType: "Custom",
        },
        {
            id: "PR-2025-008",
            title: "October 2025 – Lahore HQ",
            location: "Lahore HQ",
            department: "Admin",
            totalEmployees: 9,
            payPeriodStart: "2025-10-01",
            payPeriodEnd: "2025-10-31",
            generatedDate: "2025-11-01",
            totalAmount: 720000,
            statusId: 1,
            status: "Completed",
            approvedBy: "Ahsan Qureshi",
            approvedDate: "2025-11-02",
            remarks: "Processed successfully.",
            payCycleType: "Monthly",
        },
        {
            id: "PR-2025-009",
            title: "October 2025 – Islamabad Office",
            location: "Islamabad Office",
            department: "Support",
            totalEmployees: 19,
            payPeriodStart: "2025-10-01",
            payPeriodEnd: "2025-10-31",
            generatedDate: "2025-11-01",
            totalAmount: 1610000,
            statusId: 4,
            status: "Approved",
            approvedBy: "Usman Ali",
            approvedDate: "2025-11-03",
            remarks: "Ready for processing.",
            payCycleType: "Monthly",
        },
        {
            id: "PR-2025-010",
            title: "October 2025 – Karachi HQ",
            location: "Karachi HQ",
            department: "IT & Development",
            totalEmployees: 30,
            payPeriodStart: "2025-10-01",
            payPeriodEnd: "2025-10-31",
            generatedDate: "2025-11-02",
            totalAmount: 2700000,
            statusId: 1,
            status: "Completed",
            approvedBy: "Sara Ahmed",
            approvedDate: "2025-11-03",
            remarks: "Payroll finalized.",
            payCycleType: "Monthly",
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
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold text-gray-700">
                        Payrolls
                    </h2>
                    <Button type="button" variant="success">
                        Generate Payroll
                    </Button>
                </div>

                {/* Search + Date Filter (UI only; logic handled in backend) */}
                <div className="flex flex-col md:flex-row justify-between items-center my-3 mt-5">
                    <div className="w-2/3 md:w-1/5 flex items-center mb-3 md:mb-1">
                        <SearchBar
                            placeholder="Search by title ..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-2">
                        <div className="mb-1 w-full md:w-[9rem]">
                            <CustomSelect
                                name="location"
                                value={location}
                                placeholder="Location"
                                onChange={setLocation}
                                options={locations}
                                controlHeight="2rem"
                            />
                        </div>

                        <div className="mb-1 w-full md:w-[9rem]">
                            <CustomSelect
                                name="status"
                                value={status}
                                placeholder="Status"
                                onChange={setStatus}
                                options={statuses}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="w-full md:w-[9rem] mb-1">
                            <MonthPicker monthVal={monthVal} setMonthVal={setMonthVal} />
                        </div>
                        <div className="relative w-49">

                            <DateRangePicker range={range} setRange={setRange} />
                        </div>
                    </div>
                </div>


                {/* Attendance Table */}
                <div className="overflow-x-auto -mt-2">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="px-4 py-3 text-left rounded-tl-md">Payroll ID</th>
                                <th className="px-4 py-3 text-left">Title</th>
                                <th className="px-4 py-3 text-left">Location</th>
                                <th className="px-4 py-3 text-left">Department</th>
                                <th className="px-4 py-3 text-left">Total Employees</th>
                                <th className="px-4 py-3 text-left">Pay Period</th>
                                <th className="px-4 py-3 text-left">Total Amount</th>
                                <th className="px-4 py-3 text-left">Pay Cycle</th>
                                <th className="px-4 py-3 text-left">Approved By</th>
                                <th className="px-4 py-3 text-left">Remarks</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {payrollData.map((row, idx) => (
                                <tr
                                    key={idx}
                                    onClick={(e) => {
                                        if (e.target.closest("button")) return;
                                        handleRowClick(row.id);
                                    }}
                                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        } hover:bg-gray-100 transition-colors`}
                                >
                                    <td className="px-4 py-3">{row.id}</td>
                                    <td className="px-4 py-3 truncate max-w-[120px]" title={row.title}>{row.title}</td>
                                    <td className="px-4 py-3">{row.location}</td>
                                    <td className="px-4 py-3">{row.department}</td>
                                    <td className="px-4 py-3 text-center">{row.totalEmployees}</td>
                                    <td className="px-4 py-3">{row.payPeriodStart} To {row.payPeriodEnd}</td>
                                    <td className="px-4 py-3">{row.totalAmount}</td>
                                    <td className="px-4 py-3">{row.payCycleType}</td>
                                    <td className="px-4 py-3">{row.approvedBy}</td>
                                    <td className="px-4 py-3 truncate max-w-[120px]" title={row.remarks}>{row.remarks}</td>
                                    <td className="px-4 py-3">
                                        <StatusDesign statusId={row.statusId} label={row.status} />
                                    </td>

                                    <RowActions
                                        row={row}
                                        actions={[
                                            { label: "View Payroll", icon: MdOutlineRemoveRedEye, onClick: () => handleRowClick(row.id) },
                                            { label: "Edit Payroll", icon: FiEdit3 },
                                            { label: "Approve Payroll", icon: MdDone, color: "green" },
                                            { label: "Reject Payroll", icon: RxCross2, color: "red", onClick: () => openReasonModal(row) },
                                        ]}
                                    />

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {isOpen && (
                    <div></div>
                )}
                <ReasonModal
                    isOpen={isReasonOpen}
                    title="Reject Payroll"
                    infoSection={
                        <div className="border-gray-300 border-b p-1 mb-4">
                            <p className="text-xs text-gray-800 font-medium">
                                <span className="font-semibold">{selectedPayroll?.title}</span>
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Department:</span> {selectedPayroll?.department}
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Total Employees:</span> {selectedPayroll?.totalEmployees}
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Total Amount</span> {selectedPayroll?.totalAmount}
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Pay Period:</span> {selectedPayroll?.payPeriodStart} To {selectedPayroll?.payPeriodEnd}
                            </p>
                        </div>}
                    onClose={closeReasonModal}
                    variant="danger"
                    // onSubmit={handleReject}
                    submitLabel="Reject Payroll"
                    reasonHeading="Payroll Rejection"
                    reasonTitle="Please provide a reason for rejecting this payroll."
                />
            </div>
        </Layout>
    );
}
