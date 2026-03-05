"use client";
import Layout from "y@/app/components/Layout";
import Input from "y@/app/components/Input";
import { useState } from "react";
import SearchBar from "y@/app/components/SearchBar";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import CustomSelect from "y@/app/components/CustomSelect";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdOutlineBlock } from "react-icons/md";
import Button from "y@/app/components/Button";
import StatusDesign from "y@/app/components/StatusColors";
import ToggleSwitch from "y@/app/components/ToggleSwitch";
import ReasonModal from "y@/app/components/ReasonConfirmModal";
import RowActions from "y@/app/components/RowActions";
import Modal from "y@/app/components/ModalShell";

export default function AdminUsers() {
    const [search, setSearch] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [scope, setScope] = useState("");
    const [date, onDateChange] = useState("");
    const [selectRole, setSelectRole] = useState("");
    const [active, setActive] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isReasonOpen, setIsReasonOpen] = useState(false);
    const [isAddUserOpen, setAddUserOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const openReasonModal = () => setIsReasonOpen(true);
    const closeReasonModal = () => setIsReasonOpen(false);
    const openAddUserModal = () => setAddUserOpen(true);
    const closeAddUserModal = () => setAddUserOpen(false);

    const roles = mapSelectOptions(
        [
            { id: 1, name: "Super Admin" },
            { id: 2, name: "HR Admin" },
            { id: 3, name: "Manager" },
            { id: 4, name: "Finance Admin" },
        ],
        "id",
        "name"
    );

    const scopeOptions = mapSelectOptions(
        [
            { id: 1, name: "All Locations" },
            { id: 2, name: "Regional Offices" },
            { id: 3, name: "Head Office Only" },
        ],
        "id",
        "name"
    );

    const adminUsersData = [
    {
        name: "Ahmad Khan",
        email: "ahmad.khan@company.com",
        role: "Super Admin",
        lastActive: "2026-03-01 10:25 AM",
        twoFA: true,
        statusId: 1,
        status: "Active",
    },
    {
        name: "Sara Ali",
        email: "sara.ali@company.com",
        role: "HR Admin",
        lastActive: "2026-02-28 02:15 PM",
        twoFA: false,
        statusId: 1,
        status: "Active",
    },
    {
        name: "Omar Malik",
        email: "omar.malik@company.com",
        role: "Manager",
        lastActive: "2026-03-02 08:30 AM",
        twoFA: true,
        statusId: 2,
        status: "Inactive",
    },
    
    {
        name: "Bilal Shah",
        email: "bilal.shah@company.com",
        role: "Manager",
        lastActive: "2026-02-27 09:45 AM",
        twoFA: true,
        statusId: 1,
        status: "Active",
    },
    {
        name: "Ayesha Siddiqui",
        email: "ayesha.siddiqui@company.com",
        role: "Finance Admin",
        lastActive: "2026-03-01 01:10 PM",
        twoFA: false,
        statusId: 1,
        status: "Active",
    },
    {
        name: "Fatima Noor",
        email: "fatima.noor@company.com",
        role: "HR Admin",
        lastActive: "2026-03-02 03:05 PM",
        twoFA: true,
        statusId: 1,
        status: "Active",
    },
    {
        name: "Usman Riaz",
        email: "usman.riaz@company.com",
        role: "Finance Admin",
        lastActive: "2026-03-01 11:55 AM",
        twoFA: false,
        statusId: 2,
        status: "Inactive",
    },
    
];

    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold text-gray-700">
                        Admin Users
                    </h2>
                    <Button type="button" onClick={openAddUserModal} variant="success">
                        Invite Admin
                    </Button>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5">
                    <div className="w-full md:w-1/5 flex items-center mb-1">
                        <SearchBar
                            placeholder="Search by name or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                     <div className="w-full flex items-center justify-end flex-col md:flex-row mt-2 md:mt-0 gap-2">
                                            <div className="mb-1 w-full md:w-[9rem]">
                                                <CustomSelect
                                                    name="location"
                                                    value={selectRole}
                                                    placeholder="Role"
                                                    onChange={setSelectRole}
                                                    options={roles}
                                                    controlHeight="2rem"
                                                />
                                            </div>
                                            <div className="mb-1 w-full md:w-[9rem]">
                                                <Input
                                                                type="date"
                                                                name="date"
                                                                noMargin={true}
                                                                value={date}
                                                                onChange={(e) => onDateChange(e.target.value)}
                                                              />
                                            </div>
                                        </div>
                </div>

                <div className="overflow-x-auto shadow-md border border-gray-200 rounded max-h-[72vh]">
                    <table className="w-full text-xs border-collapse">
                        <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Email</th>
                                <th className="px-4 py-3 text-left">Role</th>
                                <th className="px-4 py-3 text-left">Last Active</th>
                                <th className="px-4 py-3 text-left">2FA</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {adminUsersData && adminUsersData.length > 0 ? (
                                adminUsersData.map((user, idx) => (
                                    <tr
                                        key={idx}
                                        className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors`}
                                    >
                                        <td className="px-4 py-3 truncate max-w-[120px]" title={user.name}>{user.name}</td>
                                        <td className="px-4 py-3">{user.email}</td>
                                        <td className="px-4 py-3">{user.role}</td>
                                        <td className="px-4 py-3">{user.lastActive}</td>
                                        <td className="px-4 py-3">
                                            {user.twoFA ? (
                                                <span className="px-2 py-1 text-xxs font-semibold rounded-full bg-green-100 text-green-700">
                                                    Enabled
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 text-xxs font-semibold rounded-full bg-gray-100 text-gray-500">
                                                    Disabled
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <StatusDesign statusId={user.statusId} label={user.status} />
                                        </td>
                                        <RowActions
                                            row={user}
                                            actions={[
                                                { label: "View Admin", icon: MdOutlineRemoveRedEye, onClick: openModal },
                                                { label: "Edit Admin", icon: FiEdit3 },
                                                { label: "Disable Admin", icon: MdOutlineBlock, color: "red", onClick: openReasonModal },
                                            ]}
                                        />
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-center py-4 text-gray-500 italic">
                                        No admin users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* View Admin Modal */}
                {isOpen && (
                    <Modal width="w-full md:w-5/12">
                        <div className="border-b border-gray-400 pb-3 mb-4">
                            <div className="flex justify-between">
                                <h2 className="text-lg font-semibold text-gray-800">Admin Details</h2>
                                <span className="inline-flex items-center px-2 py-1 text-xxs font-medium rounded-full bg-green-100 text-green-700">
                                    Active
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-end pt-4">
                            <Button variant="cancel" onClick={closeModal}>
                                Close
                            </Button>
                        </div>
                    </Modal>
                )}

                {/* Add Admin User Modal */}
                {isAddUserOpen && (
                    <Modal width="w-full md:w-6/12">
                        <h3 className="text-lg text-center font-semibold mb-4">Invite Admin User</h3>
                        <div className="w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    label="Email"
                                    noMargin={true}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <CustomSelect
                                    name="role"
                                    label="Role"
                                    value={role}
                                    placeholder="Select Role"
                                    onChange={setRole}
                                    options={roles}
                                    controlHeight="2rem"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                <CustomSelect
                                    name="scope"
                                    label="Scope"
                                    value={scope}
                                    placeholder="Select Scope"
                                    onChange={setScope}
                                    options={scopeOptions}
                                    controlHeight="2rem"
                                />
                                <div className="w-full flex items-center">
                                    <ToggleSwitch
                                        label="Active Status"
                                        checked={active}
                                        onChange={setActive}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button variant="cancel" onClick={closeAddUserModal}>
                                    Cancel
                                </Button>
                                <Button variant="success">
                                    Invite Admin
                                </Button>
                            </div>
                        </div>
                    </Modal>
                )}

                {/* Deactivate Admin Reason Modal */}
                <ReasonModal
                    isOpen={isReasonOpen}
                    title="Disable Admin User"
                    infoSection={
                        <div className="border-gray-300 border-b py-1 mb-2">
                            <p className="text-xs text-gray-800 font-medium">
                                <span className="font-semibold">Ahmad Khan</span>
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Email:</span> ahmad.khan@company.com
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Role:</span> Super Admin
                            </p>
                        </div>}
                    onClose={closeReasonModal}
                    variant="danger"
                    submitLabel="Disable"
                    reasonTitle="Please provide a reason to disable this admin user."
                />
            </div>
        </Layout>
    );
}