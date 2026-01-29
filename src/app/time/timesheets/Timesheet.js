"use client";
import Layout from "y@/app/components/Layout";
import Input from "y@/app/components/Input";
import CheckboxDropdown from "y@/app/components/CheckboxDropdown";
import { useState, useEffect, useRef } from "react";
import SearchBar from "y@/app/components/SearchBar";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import CustomSelect from "y@/app/components/CustomSelect";
import { useRouter } from 'next/navigation';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaEye, FaEdit, FaCog, FaTrash, FaUserTie, FaTags } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import {
    FiUser, FiEdit2, FiX, FiEdit3
} from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuDownload } from "react-icons/lu";
import Button from "y@/app/components/Button";
import MonthPicker from "y@/app/components/MonthPicker";
import RowActions from "y@/app/components/RowActions";
import Modal from "y@/app/components/ModalShell";
import StatusDesign from "y@/app/components/StatusColors";
export default function TimeSheet() {
    const [week, setWeek] = useState("");
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState("");
    const [selectEmp, setSelectEmp] = useState("");
    const [selectProject, setSelectProject] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const [openMenuId, setOpenMenuId] = useState(null);
    const menuRef = useRef();
    const router = useRouter();
    const handleViewTimesheet = () => {
        router.push("/time/timesheets/view/");
    };

    const [editingTag, setEditingTag] = useState(null);
    const [tagEditVal, setTagEditVal] = useState({
        name: "",
        bgColor: "#ffffff",
        textColor: "#000000",
    });



    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false)


    const timesheetsData = [
        {
            empId: "EMP301",
            name: "Ahsan Qureshi",
            imageUrl: "/api/portraits/men/28.jpg",
            location: "Lahore HQ",
            department: "Engineering",
            date: "2025-03-10",
            totalTasks: 5,
            totalHours: 38.5,
            statusId: 1,
            status: "Approved",
            approvedBy: "Sarah Ahmed",
        },
        {
            empId: "EMP302",
            name: "Sana Imran",
            imageUrl: "/api/portraits/women/34.jpg",
            location: "Karachi HQ",
            department: "Human Resources",
            date: "2025-03-10",
            totalTasks: 4,
            totalHours: 40,
            statusId: 3,
            status: "Pending",
            approvedBy: null,
        },
        {
            empId: "EMP303",
            name: "Tahir Hussain",
            imageUrl: "/api/portraits/men/19.jpg",
            location: "Islamabad Office",
            department: "Product Management",
            date: "2025-03-10",
            totalTasks: 6,
            totalHours: 42,
            statusId: 2,
            status: "Rejected",
            approvedBy: "Ali Khan",
        },
        {
            empId: "EMP304",
            name: "Nimra Gul",
            imageUrl: "/api/portraits/women/41.jpg",
            location: "Remote (Hybrid)",
            department: "Marketing",
            date: "2025-03-10",
            totalTasks: 3,
            totalHours: 36,
            statusId: 1,
            status: "Approved",
            approvedBy: "Hassan Rafiq",
        },
        {
            empId: "EMP305",
            name: "Zeeshan Arif",
            imageUrl: "/api/portraits/men/37.jpg",
            location: "Lahore HQ",
            department: "Operations",
            date: "2025-03-10",
            totalTasks: 7,
            totalHours: 39,
            statusId: 3,
            status: "Pending",
            approvedBy: null,
        },
        {
            empId: "EMP306",
            name: "Amna Yousaf",
            imageUrl: "/api/portraits/women/30.jpg",
            location: "Islamabad Office",
            department: "Customer Support",
            date: "2025-03-10",
            totalTasks: 5,
            totalHours: 40,
            statusId: 1,
            status: "Approved",
            approvedBy: "Sara Bukhari",
        },
        {
            empId: "EMP307",
            name: "Hassan Javed",
            imageUrl: "/api/portraits/men/32.jpg",
            location: "Karachi HQ",
            department: "IT",
            date: "2025-03-10",
            totalTasks: 6,
            totalHours: 44,
            statusId: 2,
            status: "Rejected",
            approvedBy: "Nimra Asif",
        },
        {
            empId: "EMP308",
            name: "Kiran Abbas",
            imageUrl: "/api/portraits/women/38.jpg",
            location: "Remote (Home)",
            department: "Legal",
            date: "2025-03-10",
            totalTasks: 4,
            totalHours: 38,
            statusId: 1,
            status: "Approved",
            approvedBy: "HR Department",
        },
        {
            empId: "EMP309",
            name: "Usama Iqbal",
            imageUrl: "/api/portraits/men/45.jpg",
            location: "Lahore HQ",
            department: "Development",
            date: "2025-03-10",
            totalTasks: 7,
            totalHours: 41,
            statusId: 3,
            status: "Pending",
            approvedBy: null,
        },
        {
            empId: "EMP310",
            name: "Hira Rehman",
            imageUrl: "/api/portraits/women/47.jpg",
            location: "Karachi HQ",
            department: "Sales",
            date: "2025-03-10",
            totalTasks: 3,
            totalHours: 35,
            statusId: 1,
            status: "Approved",
            approvedBy: "Sana Tariq",
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
    const projects = mapSelectOptions(
        [
            { id: 1, name: "Website Redesign" },
            { id: 2, name: "Mobile App Backend" },
            { id: 3, name: "Blog Revamp" },
            { id: 4, name: "Marketing Campaign" },
        ],
        "id",
        "name"
    );
    const statuses = mapSelectOptions(
        [
            { id: 1, name: "Pending" },
            { id: 2, name: "Active" },
            { id: 3, name: "On Hold" },
            { id: 4, name: "Completed" }
        ],
        "id",
        "name"
    );
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold text-gray-700">
                        TimeSheets
                    </h2>
                    {/* <Button type="button" variant="success" onClick={() => router.push('/time/projects/create/')}>
            Create Project
          </Button> */}
                </div>



                <div className="w-full flex justify-between flex-col md:flex-row items-center my-2 mt-5">
                    <div className="w-full md:w-1/5 flex items-center mb-1">
                        <SearchBar
                            placeholder="Search by name or ID..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="w-full flex flex-col md:flex-row justify-end items-center mt-2 md:mt-0 gap-2">

                        <div className="mb-1 w-full md:w-[9rem]">
                            <CustomSelect
                                name="filterEmp"
                                value={selectEmp}
                                placeholder="Employees"
                                onChange={setSelectEmp}
                                options={employees}
                                controlHeight="2rem"
                            />
                        </div>

                        <div className="mb-1 w-full md:w-[9rem]">
                            <CustomSelect
                                name="selectetProject"
                                value={selectProject}
                                placeholder="Projects"
                                onChange={setSelectProject}
                                options={projects}
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

                        <div className="w-full md:w-[9rem]">
                            <Input
                                type="week"
                                name="week"
                                noMargin={true}
                                value={week}
                                onChange={(e) => setWeek(e.target.value)}
                            />
                        </div>


                    </div>

                </div>


                <div className="overflow-x-auto shadow-md border border-gray-200 rounded max-h-[72vh]">
                    <table className="w-full text-xs border-collapse">
                        <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="px-4 py-3 text-left rounded-tl-md">Emp ID</th>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Location</th>
                                <th className="px-4 py-3 text-left">Department</th>
                                <th className="px-4 py-3 text-left">Date</th>
                                <th className="px-4 py-3 text-left">Tasks</th>
                                <th className="px-4 py-3 text-left">Hours</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {timesheetsData && timesheetsData.length > 0 ? (
                                timesheetsData.map((row, idx) => (
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
                                        <td className="px-4 py-3">{row.department}</td>
                                        <td className="px-4 py-3">{row.date}</td>
                                        <td className="px-4 py-3">{row.totalTasks}</td>
                                        <td className="px-4 py-3">{row.totalHours}</td>
                                        <td className="px-4 py-3">
                                            <StatusDesign statusId={row.statusId} label={row.status} />
                                        </td>
                                        <RowActions
                                            row={row}
                                            actions={[
                                                { label: "View Timesheet", icon: MdOutlineRemoveRedEye, onClick: handleViewTimesheet },
                                                { label: "Edit Timesheet", icon: FiEdit3 },
                                            ]}
                                        />
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={10} className="text-center py-4 text-gray-500 italic">
                                        No timesheet found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* {isOpen && (
                    <Modal width="w-full max-w-[794px]">
                        <h2>Salary Slip</h2>
                        <div className="flex justify-end pt-4">
                            <Button variant="cancel" onClick={handleCloseModal}>
                                Close
                            </Button>
                        </div>
                    </Modal>
                )} */}
            </div>
        </Layout>
    );
}
