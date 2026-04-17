"use client";
import Layout from "y@/app/components/Layout";
import { useRouter } from "next/navigation";
import Input from "y@/app/components/Input";
import CheckboxDropdown from "y@/app/components/CheckboxDropdown";
import { useState, useEffect, useRef } from "react";
import SearchBar from "y@/app/components/SearchBar";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import CustomSelect from "y@/app/components/CustomSelect";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaEye, FaEdit, FaCog, FaTrash, FaUserTie, FaTags } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import {
    FiUser, FiEdit3, FiX, FiChevronDown, FiChevronUp, FiUpload, FiDownload, FiSliders
} from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Button from "y@/app/components/Button";
import StatusDesign from "y@/app/components/StatusColors";
export default function EmployeesList() {
    const router = useRouter();
    const [date, setDate] = useState("");
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [department, setDepartment] = useState("");
    const [team, setTeam] = useState("");
    const [manager, setManager] = useState("");
    const [type, setType] = useState("");
    const [tag, setTag] = useState("");
    const [savedFilter, setSavedFilter] = useState("");
    const [status, setStatus] = useState("");
    const [bulkAction, setBulkActions] = useState("");
    const [showErrors, setShowErrors] = useState(false);
    const [selectTagEmp, setSelectTagEmp] = useState(null);
    const [showTagModal, setShowTagModal] = useState(false);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const menuRef = useRef();
    const [editingTag, setEditingTag] = useState(null);
    const [tagEditVal, setTagEditVal] = useState({
        name: "",
        bgColor: "#ffffff",
        textColor: "#000000",
    });

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
    const goToProfile = (empId) => {
        router.push(`/employees/${empId}`);
    };

    const addNewTag = () => {
        setEditingTag(null);
    };

    const editTag = (tag) => {
        setTagEditVal({
            name: tag.name,
            bgColor: tag.bgColor,
            textColor: tag.textColor,
        });
        setEditingTag(tag.id);
    };


    const updateTag = () => {
        editTag({
            id: editingTag,
            ...tagEditVal,
        });
        setEditingTag(null);
    };

    const employeeData = [
        {
            empId: "EMP1001",
            name: "Ahsan Qureshi",
            imageUrl: "/api/portraits/men/11.jpg",
            location: "Lahore Office",
            department: "IT",
            designation: "Software Engineer",
            joiningDate: "2022-05-14",
            manager: "Ali Imran",
            team: "Backend Team",
            employmentType: "Full-Time",
            tags: [
                { id: 1, name: "Top Performer", bgColor: "#E6F4EA", textColor: "#1E7B34" },
                { id: 2, name: "Team Lead", bgColor: "#E0F2FE", textColor: "#0369A1" },
            ],
            status: "Active",
            statusId: 1,
        },
        {
            empId: "EMP1002",
            name: "Sana Malik",
            imageUrl: "/api/portraits/women/24.jpg",
            location: "Karachi Office",
            department: "Finance",
            designation: "Accounts Executive",
            joiningDate: "2023-02-08",
            manager: "Zubair Khan",
            team: "Accounts Team",
            employmentType: "Full-Time",
            tags: [
                { id: 3, name: "Probation", bgColor: "#FFF4E5", textColor: "#B45309" },
            ],
            status: "Active",
            statusId: 1,
        },
        {
            empId: "EMP1003",
            name: "Hamza Rafi",
            imageUrl: "/api/portraits/men/42.jpg",
            location: "Islamabad Office",
            department: "Support",
            designation: "Customer Support Officer",
            joiningDate: "2021-11-23",
            manager: "Maryam Fatima",
            team: "Support Team",
            employmentType: "Full-Time",
            tags: [
                { id: 4, name: "Shift Worker", bgColor: "#E0F7FA", textColor: "#006064" },
            ],
            status: "Pending",
            statusId: 3,
        },
        {
            empId: "EMP1004",
            name: "Maryam Aslam",
            imageUrl: "/api/portraits/women/39.jpg",
            location: "Lahore Office",
            department: "HR",
            designation: "HR Manager",
            joiningDate: "2020-09-10",
            manager: "—",
            team: "HR & Admin",
            employmentType: "Full-Time",
            tags: [],
            status: "Active",
            statusId: 1,
        },
        {
            empId: "EMP1005",
            name: "Usman Tariq",
            imageUrl: "/api/portraits/men/53.jpg",
            location: "Karachi Office",
            department: "Sales",
            designation: "Sales Executive",
            joiningDate: "2022-01-05",
            manager: "Bilal Hussain",
            team: "Regional Sales Team",
            employmentType: "Full-Time",
            tags: [
                { id: 7, name: "Resigned", bgColor: "#FEE2E2", textColor: "#991B1B" },
                { id: 8, name: "High Performer", bgColor: "#ECFDF5", textColor: "#065F46" },
            ],
            status: "Resigned",
            statusId: 2,
        },
        {
            empId: "EMP1006",
            name: "Bilal Hussain",
            imageUrl: "/api/portraits/men/28.jpg",
            location: "Islamabad Office",
            department: "Operations",
            designation: "Operations Supervisor",
            joiningDate: "2019-03-17",
            manager: "Ali Imran",
            team: "Operations Team",
            employmentType: "Contract",
            tags: [
                { id: 9, name: "Former Employee", bgColor: "#F3F4F6", textColor: "#4B5563" },
            ],
            status: "Terminated",
            statusId: 2,
        },
        {
            empId: "EMP1007",
            name: "Ayesha Noor",
            imageUrl: "/api/portraits/women/18.jpg",
            location: "Lahore Office",
            department: "Marketing",
            designation: "Digital Marketer",
            joiningDate: "2023-06-12",
            manager: "Sana Malik",
            team: "Creative Team",
            employmentType: "Full-Time",
            tags: [
                { id: 10, name: "New Joiner", bgColor: "#E0F2F1", textColor: "#00695C" },
            ],
            status: "Active",
            statusId: 1,
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
    const savedFilters = mapSelectOptions(
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
    const teams = mapSelectOptions(
        [
            { id: 2, name: "Present" },
            { id: 1, name: "Absent" },
            { id: 3, name: "Late" },
            { id: 3, name: "Leave" }
        ],
        "id",
        "name"
    );
    const managers = mapSelectOptions(
        [
            { id: 2, name: "Present" },
            { id: 1, name: "Absent" },
            { id: 3, name: "Late" },
            { id: 3, name: "Leave" }
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
    const types = mapSelectOptions(
        [
            { id: 2, name: "Present" },
            { id: 1, name: "Absent" },
            { id: 3, name: "Late" },
            { id: 3, name: "Leave" }
        ],
        "id",
        "name"
    );

    const bulkActions = mapSelectOptions(
        [
            { id: 'import', name: "Import Employees" },
            { id: 'export', name: "Export Employees" }
        ],
        "id",
        "name"
    );
    const allTags = [
        { id: 1, name: "Full-Time", bgColor: "#E6F4EA", textColor: "#137333" },
        { id: 2, name: "Part-Time", bgColor: "#FFF4E5", textColor: "#B06000" },
        { id: 3, name: "Contract", bgColor: "#E8F0FE", textColor: "#1A73E8" },
        { id: 4, name: "Remote", bgColor: "#FCE8E6", textColor: "#D93025" },
        { id: 5, name: "Intern", bgColor: "#F3E8FD", textColor: "#7B1FA2" },
        { id: 6, name: "On-Site", bgColor: "#E6F3FF", textColor: "#0059C1" },
        { id: 7, name: "Probation", bgColor: "#FFF9C4", textColor: "#827717" },
    ];

    const tags = mapSelectOptions(allTags,
        "id",
        "name"
    );

    const allColumns = [
        { key: "empId", label: "EMP ID" },
        { key: "name", label: "Name" },
        { key: "location", label: "Location" },
        { key: "department", label: "Department" },
        { key: "designation", label: "Designation" },
        { key: "joiningDate", label: "Joined" },
        { key: "manager", label: "Manager" },
        { key: "team", label: "Team" },
        { key: "tags", label: "Tags" },
        { key: "empType", label: "EMP Type" },
        { key: "status", label: "Status" },
        { key: "action", label: "Action" },
    ];

    const [visibleColumns, setVisibleColumns] = useState([, "empId", "name", "department", "location", "designation", "status", "action"]);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const activeFilters = [
        { key: "department", label: "Dept", value: department },
        { key: "team", label: "Team", value: team },
        { key: "location", label: "Location", value: location },
        { key: "manager", label: "Manager", value: manager },
        { key: "type", label: "Type", value: type },
        { key: "status", label: "Status", value: status },
        { key: "tag", label: "Tag", value: tag },
        { key: "date", label: "Joined", value: date },
    ].filter((item) => item.value);

    const clearSingleFilter = (filterKey) => {
        if (filterKey === "department") setDepartment("");
        if (filterKey === "team") setTeam("");
        if (filterKey === "location") setLocation("");
        if (filterKey === "manager") setManager("");
        if (filterKey === "type") setType("");
        if (filterKey === "status") setStatus("");
        if (filterKey === "tag") setTag("");
        if (filterKey === "date") setDate("");
    };

    const clearAllFilters = () => {
        setDepartment("");
        setTeam("");
        setLocation("");
        setManager("");
        setType("");
        setStatus("");
        setTag("");
        setDate("");
    };


    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                    <h2 className="text-base font-semibold text-gray-700">All Employees</h2>
                    <div className="flex flex-wrap gap-2">
                        <Button type="button" variant="success" onClick={() => router.push("/employees/new")}>
                            Add Employee
                        </Button>
                        <Button type="button" variant="primary">
                            <span className="inline-flex items-center gap-1.5">
                                <FiUpload size={13} />
                                Import
                            </span>
                        </Button>
                        <Button type="button" variant="cancel">
                            <span className="inline-flex items-center gap-1.5">
                                <FiDownload size={13} />
                                Export
                            </span>
                        </Button>
                    </div>
                </div>

                <div className="mt-4 mb-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                        <div className="w-full md:w-1/5">
                            <SearchBar placeholder="Search by name, emp id, manager..." onSearch={setSearch} />
                        </div>
                        <div className="w-full lg:w-auto flex flex-wrap lg:flex-nowrap items-center justify-start lg:justify-end gap-2">
                            <div className="w-full sm:w-[11rem]">
                                <CustomSelect
                                    name="bulkActions"
                                    value={bulkAction}
                                    placeholder="Bulk Actions"
                                    onChange={setBulkActions}
                                    options={bulkActions}
                                    controlHeight="2rem"
                                />
                            </div>
                            <div className="w-full sm:w-[11rem]">
                                <CheckboxDropdown
                                    columns={allColumns}
                                    selected={visibleColumns}
                                    onChange={setVisibleColumns}
                                />
                            </div>
                            <Button type="button" variant="secondary" onClick={() => setShowFilters(true)}>
                                <span className="inline-flex items-center gap-1.5">
                                    <FiSliders size={13} />
                                    Open Filters
                                </span>
                            </Button>
                        </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center flex-wrap gap-1.5">
                            {activeFilters.length > 0 ? (
                                activeFilters.map((f) => (
                                    <span
                                        key={f.key}
                                        className="inline-flex items-center gap-1 rounded-full bg-[#edf4ff] text-[#315d9c] border border-[#d7e6ff] px-2 py-1 text-[10px] font-medium"
                                    >
                                        {f.label}: {String(f.value)}
                                        <button
                                            type="button"
                                            className="cursor-pointer"
                                            onClick={() => clearSingleFilter(f.key)}
                                        >
                                            <FiX size={11} />
                                        </button>
                                    </span>
                                ))
                            ) : (
                                <span className="text-[10px] text-gray-500">No active filters</span>
                            )}
                        </div>
                        {activeFilters.length > 0 && (
                            <Button type="button" variant="cancel" onClick={clearAllFilters}>
                                Clear All
                            </Button>
                        )}
                    </div>
                </div>

                {showFilters && (
                    <div className="fixed inset-0 z-50">
                        <div
                            className="absolute inset-0 bg-black/35"
                            onClick={() => setShowFilters(false)}
                        />
                        <div className="absolute top-0 right-0 h-full w-full sm:w-[26rem] bg-white shadow-2xl border-l border-gray-200 p-4 overflow-y-auto">
                            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-800">Filters</h3>
                                    <p className="text-[10px] text-gray-500">Refine employees quickly</p>
                                </div>
                                <button
                                    type="button"
                                    className="p-1 rounded hover:bg-gray-100 cursor-pointer"
                                    onClick={() => setShowFilters(false)}
                                >
                                    <FiX size={16} />
                                </button>
                            </div>

                            <div className="mt-4 space-y-3">
                                <div>
                                    <p className="text-[10px] uppercase tracking-wide text-gray-500 mb-1">Saved Views</p>
                                    <div className="grid grid-cols-1 gap-2">
                                        <CustomSelect
                                            name="savedFilter"
                                            value={savedFilter}
                                            placeholder="Saved Filters"
                                            onChange={setSavedFilter}
                                            options={savedFilters}
                                            controlHeight="2rem"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-wide text-gray-500 mb-1">Organization</p>
                                    <div className="grid grid-cols-1 gap-2">
                                        <CustomSelect name="department" value={department} placeholder="Department" onChange={setDepartment} options={departments} controlHeight="2rem" />
                                        <CustomSelect name="team" value={team} placeholder="Team" onChange={setTeam} options={teams} controlHeight="2rem" />
                                        <CustomSelect name="manager" value={manager} placeholder="Manager" onChange={setManager} options={managers} controlHeight="2rem" />
                                        <CustomSelect name="location" value={location} placeholder="Location" onChange={setLocation} options={locations} controlHeight="2rem" />
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[10px] uppercase tracking-wide text-gray-500 mb-1">Employment</p>
                                    <div className="grid grid-cols-1 gap-2">
                                        <CustomSelect name="type" value={type} placeholder="Type" onChange={setType} options={types} controlHeight="2rem" />
                                        <CustomSelect name="status" value={status} placeholder="Status" onChange={setStatus} options={statuses} controlHeight="2rem" />
                                        <CustomSelect name="tag" value={tag} placeholder="Tags" onChange={setTag} options={tags} controlHeight="2rem" />
                                        <Input type="date" name="date" noMargin value={date} onChange={(e) => setDate(e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            <div className="sticky bottom-0 bg-white pt-4 mt-4 border-t border-gray-200 flex justify-end gap-2">
                                <Button type="button" variant="cancel" onClick={clearAllFilters}>
                                    Reset
                                </Button>
                                <Button type="button" variant="secondary">
                                    Save Filter
                                </Button>
                                <Button type="button" variant="secondary" onClick={() => setShowFilters(false)}>
                                    Apply
                                </Button>
                            </div>
                        </div>
                    </div>
                )}


                <div className="overflow-x-auto shadow-md border border-gray-200 rounded max-h-[72vh]">
                    <table className="w-full text-xs border-collapse">
                        <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                            <tr className="bg-gray-100 text-gray-700">
                                {allColumns
                                    .filter((c) => visibleColumns.includes(c.key))
                                    .map((col) => (
                                        <th
                                            key={col.key}
                                            className={`px-4 py-3 text-${col.key !== "action" ? "left" : "center"}`}>
                                            {col.label}
                                        </th>

                                    ))}
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {employeeData && employeeData.length > 0 ? (
                            employeeData.map((row, idx) => (
                                <tr
                                    key={idx}
                                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        } hover:bg-gray-100 transition-colors`}
                                >
                                    {visibleColumns.includes("empId") && <td className="px-4 py-3">{row.empId}</td>}
                                    {visibleColumns.includes("name") && <td className="px-4 py-2 align-middle">
                                        <button
                                            type="button"
                                            onClick={() => goToProfile(row.empId)}
                                            className="flex items-center gap-2 cursor-pointer hover:opacity-85 transition"
                                            title={`Open profile: ${row.name}`}
                                        >
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
                                            <span
                                                className="truncate max-w-[120px]"
                                                title={row.name}
                                            >
                                                {row.name}
                                            </span>
                                        </button>
                                    </td>}

                                    {visibleColumns.includes("location") && <td className="px-4 py-3">{row.location}</td>}
                                    {visibleColumns.includes("department") && <td className="px-4 py-3">{row.department}</td>}
                                    {visibleColumns.includes("designation") && <td className="px-4 py-3">{row.designation}</td>}
                                    {visibleColumns.includes("joiningDate") && <td className="px-4 py-3">{row.joiningDate}</td>}
                                    {visibleColumns.includes("manager") && <td className="px-4 py-3">{row.manager}</td>}
                                    {visibleColumns.includes("team") && <td className="px-4 py-3">{row.team}</td>}
                                    {visibleColumns.includes("tags") && <td className="px-4 py-3 max-w-[10rem]">
                                        <div className="flex items-center justify-center flex-wrap gap-1">
                                            {row.tags.map((tag) => (
                                                <span
                                                    key={tag.id}
                                                    className="px-2 py-0.5 rounded-full font-medium"
                                                    style={{
                                                        backgroundColor: tag.bgColor,
                                                        color: tag.textColor,
                                                        fontSize: "10px",
                                                    }}
                                                >
                                                    {tag.name}
                                                </span>
                                            ))}

                                            {/* + icon */}

                                        </div>
                                    </td>}
                                    {visibleColumns.includes("empType") && <td className="px-4 py-3">{row.employmentType}</td>}

                                    {visibleColumns.includes("status") && <td className="px-4 py-3">
                                                                                    <StatusDesign statusId={row.statusId} label={row.status} />
                                    </td>}
                                    {visibleColumns.includes("action") && <td className="px-4 py-3 text-center relative" ref={menuRef}>
                                        <button
                                            onClick={() => handleMenuToggle(row.empId)}
                                            className="p-1 rounded-full hover:bg-gray-100 transition cursor-pointer"
                                        >
                                            <BiDotsVerticalRounded className="text-gray-600 text-sm" />
                                        </button>

                                        {openMenuId === row.empId && (
                                            <div ref={menuRef} className="absolute top-10 right-16 z-50 w-35 bg-white border border-gray-200 rounded-xl shadow-lg">
                                                <ul className="py-2 text-xxs text-gray-700">
                                                    <li>
                                                        <button
                                                            className="flex items-center w-full cursor-pointer px-4 py-2 hover:bg-gray-50"
                                                            onClick={() => {
                                                                goToProfile(row.empId);
                                                                setOpenMenuId(null);
                                                            }}
                                                        >
                                                            <FaEye className="mr-2" /> View Employee
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="flex items-center w-full cursor-pointer px-4 py-2 hover:bg-gray-50">
                                                            <FiEdit3 className="mr-2" /> Edit Employee
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="flex items-center w-full cursor-pointer px-4 py-2 hover:bg-gray-50">
                                                            <FaUserTie className="mr-2" /> Assign Manager
                                                        </button>

                                                    </li>
                                                    <li>
                                                        <button
                                                            onClick={() => {
                                                                setSelectTagEmp(row);
                                                                setShowTagModal(true);
                                                            }}
                                                            className="flex items-center w-full cursor-pointer px-4 py-2 hover:bg-gray-50">
                                                            <FaTags className="mr-2" /> Assign Tag
                                                        </button>

                                                    </li>
                                                    <li>
                                                        <button className="flex items-center w-full cursor-pointer px-4 py-2 hover:bg-gray-50">
                                                            <FaCog className="mr-2" /> Settings
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="flex items-center w-full cursor-pointer px-4 py-2 hover:bg-gray-50 text-red-600">
                                                            <FaTrash className="mr-2" /> Delete Employee
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </td>}
                                </tr>
                            ))
                            ) : (
                                <tr>
                                    <td colSpan={17} className="text-center py-4 text-gray-500 italic">
                                        No employee found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>


                    {showTagModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                            <div className="bg-white rounded-lg shadow-lg w-1/3 p-5">
                                <h2 className="text-md text-center font-semibold mb-3">
                                    Manage Tags
                                </h2>
                                <div className="w-full">
                                    {/* Header with title + Add new tag button */}
                                    <div className="flex justify-between items-center mb-3">
                                        <label className="block font-medium text-gray-700 text-xs">
                                            <strong>All Tags</strong>
                                            <div className="mt-1 text-gray-500">Select tags from list to assign an employee</div>
                                        </label>

                                        <button
                                            onClick={() => {
                                                setTagEditVal({ name: "", bgColor: "#e0f2fe", textColor: "#0369a1" });
                                                setEditingTag("new");
                                            }}
                                            className="flex items-center gap-1 text-xxs text-green-600 border border-green-400 bg-green-50 px-2 py-1 rounded hover:bg-green-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                                        >
                                            <FaPlus size={11} />
                                            Add New Tag
                                        </button>
                                    </div>

                                    {/* All tags list */}
                                    <div className="max-h-55 overflow-y-auto border border-gray-200 rounded-md p-3 space-y-2 bg-white shadow-sm">
                                        {allTags.map((tag) => (
                                            <div
                                                key={tag.id}
                                                className="inline-block px-2 py-1 rounded mr-2"
                                                style={{
                                                    backgroundColor: tag.bgColor,
                                                    color: tag.textColor,
                                                }}
                                            >
                                                <div className="flex">
                                                    <span className="text-xxs font-medium">{tag.name}</span>
                                                    <div className="flex items-center ml-2 gap-1">
                                                        <button
                                                            className="p-1 rounded hover:bg-white/20 transition cursor-pointer"
                                                            title="Edit Tag"
                                                            onClick={() => editTag(tag)}
                                                        >
                                                            <FiEdit3 className="w-3 h-3" />
                                                        </button>

                                                        <button
                                                            className="p-1 rounded hover:bg-white/20 transition cursor-pointer"
                                                            title="Delete Tag"
                                                            onClick={() => deleteTag(tag.id)}
                                                        >
                                                            <FiX className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Edit or Add New Tag modal */}
                                    {editingTag && (
                                        <div className="mt-4 p-3 rounded-md border border-gray-200 bg-gray-50 shadow-sm">
                                            <div className="flex justify-between items-center mb-3">
                                                <h4 className="text-xs font-semibold text-gray-700">
                                                    {editingTag === "new" ? "Add New Tag" : "Edit Tag"}
                                                </h4>
                                                <button
                                                    onClick={() => setEditingTag(null)}
                                                    className="p-1 hover:bg-gray-200 rounded"
                                                    title="Close"
                                                >
                                                    <FiX className="w-3 h-3 text-gray-600" />
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-[2fr_1fr_1fr] gap-3">
                                                <div>
                                                    <label className="block text-xxs text-gray-600 mb-1">
                                                        Tag Name
                                                    </label>
                                                    <Input
                                                        type="text"
                                                        name="tag_name"
                                                        noMargin={true}
                                                        value={tagEditVal.name}
                                                        onChange={(e) =>
                                                            setTagEditVal({ ...tagEditVal, name: e.target.value })
                                                        }
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xxs text-gray-600">
                                                        BG Color
                                                    </label>
                                                    <input
                                                        type="color"
                                                        value={tagEditVal.bgColor}
                                                        onChange={(e) =>
                                                            setTagEditVal({ ...tagEditVal, bgColor: e.target.value })
                                                        }
                                                        className="w-full cursor-pointer"
                                                        style={{ height: "2.4rem", borderRadius: "5px" }}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xxs text-gray-600">
                                                        Text Color
                                                    </label>
                                                    <input
                                                        type="color"
                                                        value={tagEditVal.textColor}
                                                        onChange={(e) =>
                                                            setTagEditVal({ ...tagEditVal, textColor: e.target.value })
                                                        }
                                                        className="w-full cursor-pointer"
                                                        style={{ height: "2.4rem", borderRadius: "5px" }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="w-full text-center mt-3">
                                                <button
                                                    onClick={editingTag === "new" ? addNewTag : updateTag}
                                                    className={`border rounded-md ${editingTag === "new"
                                                        ? "border-green-400 text-green-700 bg-green-50 hover:bg-green-600 hover:text-white hover:border-green-600"
                                                        : "border-blue-400 text-blue-700 bg-blue-50 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                                                        } text-xxs w-1/3 cursor-pointer transition duration-200 shadow-sm hover:shadow-md`}
                                                    style={{ padding: "6px" }}
                                                >
                                                    {editingTag === "new" ? "Create Tag" : "Update Tag"}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-end gap-2 mt-4">
                                    <Button variant="cancel" onClick={() => setShowTagModal(false)}>
                                        Cancel
                                    </Button>
                                    {/* <Button variant="success">
                                        Add Tags
                                    </Button> */}
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </Layout>
    );
}
