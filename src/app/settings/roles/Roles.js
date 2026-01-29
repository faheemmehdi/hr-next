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
import { useRouter } from "next/navigation";
import { MdDone, MdOutlineBlock } from "react-icons/md";
import RowActions from "y@/app/components/RowActions";
import ToggleSwitch from "y@/app/components/ToggleSwitch";
import Tooltip from "y@/app/components/Tooltip";
import { Checkbox } from "@headlessui/react";
export default function Roles() {
    const [date, setDate] = useState("");
    const [dateVal, setDateVal] = useState("");
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [roleName, setRoleName] = useState("");
    const [active, setActive] = useState(true);
    const [assignEmp, setAssignEmp] = useState("");
    const [assignRoleEmp, setAssignRoleEmp] = useState("");
    const [departVal, setDepartVal] = useState("");
    const [status, setStatus] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isReasonOpen, setIsReasonOpen] = useState(false);
    const [defaultRole, setDefaultRole] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [remarks, setRemarks] = useState("");
    const [showErrors, setShowErrors] = useState(false);

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const openReasonModal = () => setIsReasonOpen(true);
    const closeReasonModal = () => setIsReasonOpen(false);

    const router = useRouter();
    const handleViewPermissions = (roleId) => {
        // console.log("Clicked Role ID:", roleId);
        router.push(`/settings/roles/${roleId}/permissions`);
    };

    const rolesData = [
        {
            roleId: "1",
            name: "Admin",
            description: "Full system access and permissions.",
            assignedUsersCount: 5,
            permissionCount: 20,
            createdOn: "Jan 5, 2025",
            statusId: 1,
            status: "Active",
        },
        {
            roleId: "2",
            name: "HR Executive",
            description: "Manage employee records and recruitment.",
            assignedUsersCount: 12,
            permissionCount: 15,
            createdOn: "Feb 15, 2025",
            statusId: 1,
            status: "Active",
        },
        {
            roleId: "3",
            name: "Manager",
            description: "Approve leaves and monitor team performance.",
            assignedUsersCount: 20,
            permissionCount: 10,
            createdOn: "Mar 1, 2025",
            statusId: 1,
            status: "Active",
        },
        {
            roleId: "4",
            name: "Payroll Officer",
            description: "Handle payroll and salary management.",
            assignedUsersCount: 4,
            permissionCount: 12,
            createdOn: "Jan 20, 2025",
            statusId: 1,
            status: "Active",
        },
        {
            roleId: "5",
            name: "Recruiter",
            description: "Manage recruitment and interview process.",
            assignedUsersCount: 3,
            permissionCount: 8,
            createdOn: "Apr 10, 2025",
            statusId: 2,
            status: "Inactive",
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


    const permissionCategories = mapSelectOptions(
        [
            { id: "cat1", name: "User Management" },
            { id: "cat2", name: "Leave Management" },
            { id: "cat3", name: "Payroll" },
            { id: "cat6", name: "Performance Management" },
            { id: "cat5", name: "Attendance" },
            { id: "cat4", name: "Recruitment" },
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
                        Roles
                    </h2>
                    <Button type="button" variant="success" onClick={handleOpenModal}>
                        Add Role
                    </Button>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5">
                    <div className="w-full md:w-1/5 flex items-center mb-1">
                        <SearchBar
                            placeholder="Search by name or ID..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="w-full flex items-center justify-end flex-col md:flex-row mt-2 md:mt-0 gap-2">
                        <div className="mb-1 w-full md:w-[9rem]">
                            <CustomSelect
                                name="assignedEmp"
                                value={assignEmp}
                                placeholder="Select Employee"
                                onChange={setAssignEmp}
                                options={employees}
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
                    </div>
                </div>


                <div className="overflow-x-auto shadow-md border border-gray-200 rounded max-h-[72vh]">
                    <table className="w-full text-xs border-collapse">
                        <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="px-4 py-3 text-left">Role Name</th>
                                <th className="px-4 py-3 text-left">Description</th>
                                <th className="px-4 py-3 text-center">Employee Assigned</th>
                                <th className="px-4 py-3 text-center">Permission Count</th>
                                <th className="px-4 py-3 text-left">Created On</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {rolesData && rolesData.length > 0 ? (
                                rolesData.map((row, idx) => (
                                    <tr
                                        key={idx}
                                        className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                            } hover:bg-gray-100 transition-colors`}
                                    >
                                        <td className="px-4 py-3 truncate max-w-[160px]">{row.name ?? ''}</td>
                                        <td className="px-4 py-3 truncate max-w-[160px]" title={row.description}>{row.description ?? ''}</td>
                                        <td className="px-4 py-3 text-center">{row.assignedUsersCount ?? 0}</td>
                                        <td className="px-4 py-3 text-center">{row.permissionCount ?? 0}</td>
                                        <td className="px-4 py-3">{row.createdOn ?? ''}</td>
                                        <td className="px-4 py-3">
                                            <StatusDesign statusId={row.statusId} label={row.status} />
                                        </td>

                                        <RowActions
                                            row={row}
                                            actions={[
                                                { label: "View Permissions", icon: MdOutlineRemoveRedEye, onClick: () => handleViewPermissions(row.roleId) },
                                                { label: "Deactivate Role", icon: MdOutlineBlock, color: "red", onClick: openReasonModal },
                                            ]}
                                        />

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-center py-4 text-gray-500 italic">
                                        No role found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-10/12 md:w-6/12">
                            <h3 className="text-lg text-center font-semibold mb-4">Add Role</h3>

                            <div className="w-full">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="Enter role name"
                                        label="Role Name"
                                        noMargin={true}
                                        isRequired={true}
                                        value={roleName}
                                        onChange={(e) => setRoleName(e.target.value)}
                                        error={showErrors && !roleName ? "Role Name is required" : ""}
                                    />

                                    <div className="flex items-center md:pt-4 md:justify-center">
                                        <ToggleSwitch
                                            label="Activate Role"
                                            checked={active}
                                            onChange={setActive}
                                        />
                                    </div>
                                </div>

                                <div className="text-xxs text-gray-700 w-full pb-1 flex items-center"><span className="me-1">Permission Categories</span> <Tooltip label="Selecting this category grants all permissions related to it." /></div>


                                <div className="max-h-56 overflow-y-auto p-1 bg-white border-t border-b border-gray-300">

                                    {permissionCategories.map(({ value, label }) => (
                                        <label
                                            key={value}
                                            className="inline-flex items-center cursor-pointer text-sm text-gray-800 mb-2"
                                        >
                                            <input
                                                type="checkbox"
                                                className="form-checkbox h-3 w-3 text-blue-600"
                                            //   checked={selectedCategories.includes(id)}
                                            //   onChange={() => toggleCategory(id)}
                                            />

                                            <span className="ml-2 mr-5 text-xxs text-gray-800">{label}</span>
                                        </label>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">

                                    <CustomSelect
                                        name="assignRoleEmp"
                                        label="Assign Employees"
                                        value={assignRoleEmp}
                                        placeholder="Select Employee"
                                        onChange={setAssignRoleEmp}
                                        options={employees}
                                        isMulti={true}
                                        controlHeight="2rem"
                                    />
                                    <div className="flex items-center md:pt-4 md:justify-center">
                                        <ToggleSwitch
                                            label="Default Role"
                                            checked={defaultRole}
                                            onChange={setDefaultRole}
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 w-full">
                                    <label
                                        htmlFor=""
                                        className="block text-xxs text-gray-700 mb-2"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id=""
                                        rows="4"
                                        placeholder="Write description here..."
                                        className="w-full rounded border border-gray-300 p-3 text-gray-800 text-xxs resize-none 
                                            focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-300 transition-all duration-150"
                                    />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button variant="cancel" onClick={handleCloseModal}>
                                        Cancel
                                    </Button>
                                    <Button variant="success">
                                        Add Role
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
                                <strong>Role ID:</strong> 4
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
