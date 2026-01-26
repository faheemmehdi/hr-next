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
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Button from "y@/app/components/Button";
import StatusDesign from "y@/app/components/StatusColors";
import ReasonModal from "y@/app/components/ReasonConfirmModal";
import { RxCross2 } from "react-icons/rx";
import { MdDone, MdOutlineBlock } from "react-icons/md";
import RowActions from "y@/app/components/RowActions";
import ToggleSwitch from "y@/app/components/ToggleSwitch";



function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, ".")       // Replace spaces with dots
        .replace(/[^\w.-]+/g, "")   // Remove all non-word chars except dot and dash
        .replace(/\.{2,}/g, ".")    // Replace multiple dots with single dot
        .replace(/^\./, "")         // Trim starting dot
        .replace(/\.$/, "");        // Trim ending dot
}


export default function Permissions() {
    const [search, setSearch] = useState("");
    const [selectCat, setSelectCat] = useState("");
    const [permitName, setPermitName] = useState("");
    const [permitKey, setPermitKey] = useState("");
    const [active, setActive] = useState(true);
    const [assignRoleEmp, setAssignRoleEmp] = useState("");
    const [departVal, setDepartVal] = useState("");
    const [status, setStatus] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isReasonOpen, setIsReasonOpen] = useState(false);
    const [keyManuallyEdited, setKeyManuallyEdited] = useState(false);

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => {
        setIsOpen(false); 
        setSelectCat("");
        setPermitName("");
        setPermitKey("");
        setKeyManuallyEdited(false);
    };
    const openReasonModal = () => setIsReasonOpen(true);
    const closeReasonModal = () => setIsReasonOpen(false);

    const handleNameChange = (e) => {
        setPermitName(e.target.value);
    };

    const handleKeyChange = (e) => {
        setPermitKey(e.target.value);
        setKeyManuallyEdited(true);
    };

    const handleNameBlur = () => {
        const generatedKey = slugify(permitName);
        console.log(generatedKey);

        if (!keyManuallyEdited || permitKey.trim() === "") {
            setPermitKey(generatedKey);
            setKeyManuallyEdited(false);
        }
    };

    const permissionsData = [
        {
            id: "1",
            name: "View Employees",
            key: "employee.view",
            category: "Employee Management",
            statusId: 1,
            status: "Active",
            createdOn: "2025-01-02",
        },
        {
            id: "2",
            name: "Create Employee",
            key: "employee.create",
            category: "Employee Management",
            statusId: 1,
            status: "Active",
            createdOn: "2025-01-02",
        },
        {
            id: "3",
            name: "Edit Employee",
            key: "employee.update",
            category: "Employee Management",
            statusId: 1,
            status: "Active",
            createdOn: "2025-01-03",
        },
        {
            id: "4",
            name: "Delete Employee",
            key: "employee.delete",
            category: "Employee Management",
            statusId: 2,
            status: "Inactive",
            createdOn: "2025-01-03",
        },
        {
            id: "5",
            name: "Approve Leave",
            key: "leave.approve",
            category: "Leave Management",
            statusId: 1,
            status: "Active",
            createdOn: "2025-02-10",
        },
        {
            id: "6",
            name: "View Leave Requests",
            key: "leave.view",
            category: "Leave Management",
            statusId: 1,
            status: "Active",
            createdOn: "2025-02-12",
        },
        {
            id: "7",
            name: "Apply Leave",
            key: "leave.apply",
            category: "Leave Management",
            statusId: 1,
            status: "Active",
            createdOn: "2025-02-15",
        },
        {
            id: "8",
            name: "View Payroll",
            key: "payroll.view",
            category: "Payroll",
            statusId: 1,
            status: "Active",
            createdOn: "2025-02-20",
        },
        {
            id: "9",
            name: "Process Payroll",
            key: "payroll.process",
            category: "Payroll",
            statusId: 1,
            status: "Active",
            createdOn: "2025-02-21",
        },
        {
            id: "10",
            name: "Manage Attendance",
            key: "attendance.manage",
            category: "Attendance",
            statusId: 1,
            status: "Active",
            createdOn: "2025-03-01",
        },
        {
            id: "11",
            name: "View Attendance",
            key: "attendance.view",
            category: "Attendance",
            statusId: 1,
            status: "Active",
            createdOn: "2025-03-02",
        },
        {
            id: "12",
            name: "Manage Recruitment",
            key: "recruitment.manage",
            category: "Recruitment",
            statusId: 1,
            status: "Active",
            createdOn: "2025-03-10",
        },
        {
            id: "13",
            name: "View Recruitment",
            key: "recruitment.view",
            category: "Recruitment",
            statusId: 1,
            status: "Active",
            createdOn: "2025-03-11",
        },
        {
            id: "14",
            name: "Manage Performance Reviews",
            key: "performance.manage",
            category: "Performance Management",
            statusId: 1,
            status: "Active",
            createdOn: "2025-04-01",
        },
        {
            id: "15",
            name: "View Performance Reviews",
            key: "performance.view",
            category: "Performance Management",
            statusId: 1,
            status: "Active",
            createdOn: "2025-04-02",
        },
    ];



    const statuses = mapSelectOptions(
        [
            { id: 2, name: "Active" },
            { id: 1, name: "Inactive" }
        ],
        "id",
        "name"
    );

    const employees = mapSelectOptions(
        [
            { id: 1, name: "Ahmad Khan" },
            { id: 2, name: "Sara Ali" },
            { id: 3, name: "Omar Malik" },
            { id: 4, name: "Ayesha Siddiqui" },
            { id: 5, name: "Bilal Shah" },
            { id: 6, name: "Fatima Noor" },
            { id: 7, name: "Usman Riaz" },
            { id: 8, name: "Hina Javed" },
            { id: 9, name: "Zain Qureshi" },
            { id: 10, name: "Maria Hassan" },
        ],
        "id",
        "name"
    );


    const categories = mapSelectOptions(
        [
            { id: "1", name: "User Management" },
            { id: "2", name: "Leave Management" },
            { id: "3", name: "Payroll" },
            { id: "6", name: "Performance Management" },
            { id: "5", name: "Attendance" },
            { id: "4", name: "Recruitment" },
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
                        Permissions
                    </h2>
                    <Button type="button" variant="success" onClick={handleOpenModal}>
                        Add Permission
                    </Button>
                </div>

                <div className="flex justify-between items-center my-3 mt-5">
                    <div className="w-1/5 flex items-center mb-1">
                        <SearchBar
                            placeholder="Search by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">


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
                <div className="overflow-x-auto -mt-2 border border-gray-200 rounded max-h-[70vh]">
                    <table className="w-full text-xs border-collapse">
                        <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 text-left">Permission Name</th>
                                <th className="px-4 py-3 text-left">Category</th>
                                <th className="px-4 py-3 text-left">Key</th>
                                <th className="px-4 py-3 text-left">Created On</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {permissionsData.map((row, idx) => (
                                <tr
                                    key={row.id}
                                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors`}
                                >
                                    <td className="px-4 py-3 truncate max-w-[160px]">{row.name ?? ''}</td>
                                    <td className="px-4 py-3">{row.category ?? ''}</td>
                                    <td className="px-4 py-3">{row.key ?? ''}</td>
                                    <td className="px-4 py-3">{row.createdOn ?? ''}</td>
                                    <td className="px-4 py-3">
                                        <StatusDesign statusId={row.statusId} label={row.status} />
                                    </td>
                                    <RowActions
                                        row={row}
                                        actions={[
                                            { label: "View Permissions", icon: MdOutlineRemoveRedEye },
                                            { label: "Deactivate Role", icon: MdOutlineBlock, color: "red", onClick: openReasonModal },
                                        ]}
                                    />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-10/12 md:w-6/12">
                            <h3 className="text-lg text-center font-semibold mb-4">Add Permission</h3>

                            <div className="w-full">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="Enter permission name"
                                        label="Permission Name"
                                        noMargin={true}
                                        isRequired={true}
                                        value={permitName}
                                        onChange={handleNameChange}
                                        onBlur={handleNameBlur}
                                    />
                                    <CustomSelect
                                        name="category"
                                        label="Category"
                                        value={selectCat}
                                        placeholder="Select Category"
                                        onChange={setSelectCat}
                                        options={categories}
                                        isRequired={true}
                                        controlHeight="2rem"
                                    />

                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
                                    <Input
                                        type="text"
                                        name="key"
                                        label="Permission Key"
                                        noMargin={true}
                                        isRequired={true}
                                        value={permitKey}
                                        onChange={handleKeyChange}
                                    />
                                    <div className="flex items-center md:pt-4 md:justify-center">
                                        <ToggleSwitch
                                            label="Activate Permission"
                                            checked={active}
                                            onChange={setActive}
                                        />
                                    </div>

                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button variant="cancel" onClick={handleCloseModal}>
                                        Cancel
                                    </Button>
                                    <Button variant="success">
                                        Add Permission
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <ReasonModal
                    isOpen={isReasonOpen}
                    title="Deactivate Role"
                    infoSection={
                        <div className="border-gray-300 border-b p-1 mb-4">
                            <p className="text-xs text-gray-800 font-medium">
                                <strong className="font-semibold">HR Executive</strong>
                            </p>
                            <p className="text-xxs text-gray-600">
                                <strong>Role ID:</strong> ROLE024
                            </p>
                            <p className="text-xxs text-gray-600">
                                <strong>Users Assigned:</strong> 34
                            </p>
                            <p className="text-xxs text-gray-600">
                                <strong>Created On:</strong> Casual Leave
                            </p>
                            <p className="text-xxs text-gray-600">
                                <strong>Description:</strong> Handle payroll and salary management.
                            </p>
                        </div>}
                    onClose={closeReasonModal}
                    variant="danger"
                    // onSubmit={handleReject}
                    submitLabel="Deactivate Role"
                    reasonTitle="Please provide a reason for deactivating this role."
                />
            </div>
        </Layout>
    );
}
