"use client";
import Layout from "y@/app/components/Layout";
import Input from "y@/app/components/Input";
import { useState } from "react";
import SearchBar from "y@/app/components/SearchBar";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import CustomSelect from "y@/app/components/CustomSelect";
import {
    FiEdit3, FiEye
} from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Button from "y@/app/components/Button";
import StatusDesign from "y@/app/components/StatusColors";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineBlock } from "react-icons/md";
import ToggleSwitch from "y@/app/components/ToggleSwitch";
import ReasonModal from "y@/app/components/ReasonConfirmModal";
import RowActions from "y@/app/components/RowActions";
import Modal from "y@/app/components/ModalShell";
export default function AllDepartments() {
    const [deptName, setDeptName] = useState("");
    const [deptHead, setDeptHead] = useState("");
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [eligibility, setEligibility] = useState("");
    const [locationVal, setLocationVal] = useState("");
    const [amount, setAmount] = useState("");
    const [hod, setHod] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isReasonOpen, setIsReasonOpen] = useState(false);
    const [isAddDeptOpen, setAddBonusOpen] = useState(false);
    const [active, setActive] = useState("");
    const [showErrors, setShowErrors] = useState(false);

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const openReasonModal = () => setIsReasonOpen(true);
    const closeReasonModal = () => setIsReasonOpen(false);
    const openAddDeptModal = () => setAddBonusOpen(true);
    const closeAddDeptModal = () => setAddBonusOpen(false);

    const departmentData = [
    {
        name: "Performance Bonus",
        departmentHead: "Jane Doe",
        location: "All Locations",
        members: 120,
        createdAt: "2024-01-10",
        statusId: 1,
        status: "Active",
    },
    {
        name: "Year-End Bonus",
        departmentHead: "John Smith",
        location: "Head Office",
        members: 85,
        createdAt: "2023-12-15",
        statusId: 1,
        status: "Active",
    },
    {
        name: "Referral Bonus",
        departmentHead: "Emily Johnson",
        location: "All Locations",
        members: 200,
        createdAt: "2024-02-01",
        statusId: 1,
        status: "Active",
    },
    {
        name: "Holiday Bonus",
        departmentHead: "Michael Brown",
        location: "Regional Office - East",
        members: 50,
        createdAt: "2023-11-20",
        statusId: 2,
        status: "Inactive",
    },
    {
        name: "Attendance Bonus",
        departmentHead: "Laura Wilson",
        location: "All Locations",
        members: 140,
        createdAt: "2024-01-05",
        statusId: 1,
        status: "Active",
    },
    {
        name: "Training Completion Bonus",
        departmentHead: "David Lee",
        location: "Head Office",
        members: 75,
        createdAt: "2024-02-10",
        statusId: 1,
        status: "Active",
    },
    {
        name: "Customer Satisfaction Bonus",
        departmentHead: "Sarah Davis",
        location: "All Locations",
        members: 110,
        createdAt: "2023-12-01",
        statusId: 1,
        status: "Active",
    },
    {
        name: "Leadership Bonus",
        departmentHead: "Robert Martinez",
        location: "Regional Office - West",
        members: 40,
        createdAt: "2024-01-15",
        statusId: 1,
        status: "Active",
    },
    {
        name: "Innovation Bonus",
        departmentHead: "Jessica Garcia",
        location: "Head Office",
        members: 30,
        createdAt: "2023-11-25",
        statusId: 2,
        status: "Inactive",
    },
    {
        name: "Holiday Season Bonus",
        departmentHead: "William Hernandez",
        location: "All Locations",
        members: 100,
        createdAt: "2023-12-10",
        statusId: 1,
        status: "Active",
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

   
const hods = mapSelectOptions(
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


    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[80vh] p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold text-gray-700">
                        Departments
                    </h2>
                    <Button type="button" onClick={openAddDeptModal} variant="success">
                        Add Department
                    </Button>
                </div>

                {/* Search + Date Filter (UI only; logic handled in backend) */}
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
                                name="hod"
                                value={hod}
                                placeholder="Department Head"
                                onChange={setHod}
                                options={hods}
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
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Location</th>
                                <th className="px-4 py-3 text-left">Department Head</th>
                                <th className="px-4 py-3 text-left">Total Employees</th>
                                <th className="px-4 py-3 text-left">Created At</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {departmentData.map((row, idx) => (
                                <tr
                                    key={idx}
                                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        } hover:bg-gray-100 transition-colors`}
                                >
                                    <td className="px-4 py-3 truncate max-w-[120px]" title={row.name}>{row.name}</td>
                                    <td className="px-4 py-3">{row.location}</td>
                                    <td className="px-4 py-3">{row.departmentHead}</td>
                                    <td className="px-4 py-3">{row.members}</td>
                                    <td className="px-4 py-3">{row.createdAt}</td>
                                    <td className="px-4 py-3">
                                        <StatusDesign statusId={row.statusId} label={row.status} />
                                    </td>

                                    <RowActions
                                        row={row}
                                        actions={[
                                            { label: "View Department", icon: MdOutlineRemoveRedEye, onClick: handleOpenModal },
                                            { label: "Edit Department", icon: FiEdit3 },
                                            { label: "Deactivate Department", icon: MdOutlineBlock, color: "red", onClick: openReasonModal },
                                        ]}
                                    />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {isOpen && (
                    <Modal width="w-full md:w-5/12">
                        <div className="border-b border-gray-400 pb-3 mb-4">
                            <div className="flex justify-between">
                                <h2 className="text-lg font-semibold text-gray-800">Bonus Details</h2>
                                <span className="inline-flex items-center px-2 py-1 text-xxs font-medium rounded-full bg-green-100 text-green-700">
                                    Active
                                </span>
                            </div>
                            <p className="text-xxs text-gray-500">Created At 20 Dec, 2025 at 09:10 AM</p>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button variant="cancel" onClick={handleCloseModal}>
                                Close
                            </Button>
                            {/* <Button variant="success" onClick={handleSave}>
                                        Save
                                    </Button> */}
                        </div>
                    </Modal>
                )}


                {isAddDeptOpen && (
                    <Modal width="w-full md:w-6/12">
                        <h3 className="text-lg text-center font-semibold mb-4">Add Department</h3>
                        <div className="w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
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

                                <Input
                                    type="text"
                                    name="deptName"
                                    placeholder="Enter department name"
                                    label="Department Name"
                                    noMargin={true}
                                    value={deptName}
                                    onChange={(e) => setDeptName(e.target.value)}
                                    error={showErrors && !deptName ? "Department Name is required" : ""}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">

                                
                                <CustomSelect
                                    name="hod"
                                    label="Department Head"
                                    value={deptHead}
                                    placeholder="Select Head"
                                    onChange={setDeptHead}
                                    options={hods}
                                    controlHeight="2rem"
                                    error={showErrors && !deptHead ? "Department Head is required" : ""}
                                />
                                <div className="w-full flex items-center">
                                    <div className="w-full md:w-37 md:mt-4">
                                        <ToggleSwitch
                                            label="Active Status"
                                            checked={active}
                                            onChange={setActive}
                                        />
                                    </div>
                                </div>
                            </div>


                          

                            <div className="w-full mb-3">
                                <label
                                    htmlFor="desc"
                                    className="block text-xxs text-gray-700 mb-2"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="desc"
                                    rows="4"
                                    placeholder="Enter description here..."
                                    className="w-full rounded border border-gray-300 p-3 text-gray-800 text-xxs resize-none 
                                        focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-300 transition-all duration-150"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="cancel" onClick={closeAddDeptModal}>
                                Close
                            </Button>
                            <Button variant="success">
                                Add Department
                            </Button>
                        </div>

                    </Modal>
                )}

                <ReasonModal
                    isOpen={isReasonOpen}
                    title="Deactivate Department"
                    infoSection={
                        <div className="border-gray-300 border-b py-1 mb-2">
                            <p className="text-xs text-gray-800 font-medium">
                                <span className="font-semibold">Human Resource Department</span>
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Location:</span> Multan
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Department Head:</span> Michael Brown
                            </p>
                        </div>}
                    onClose={closeReasonModal}
                    // onSubmit={handleReject}
                    variant="danger"
                    submitLabel="Deactivate"
                    reasonTitle="Please provide a reason to deactivate this department."
                />


            </div>
        </Layout>
    );
}
