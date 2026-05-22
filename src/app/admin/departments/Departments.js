"use client";
import Layout from "y@/app/components/Layout";
import Input from "y@/app/components/Input";
import { useMemo, useState } from "react";
import SearchBar from "y@/app/components/SearchBar";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import CustomSelect from "y@/app/components/CustomSelect";
import {
    FiEdit3
} from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Button from "y@/app/components/Button";
import StatusDesign from "y@/app/components/StatusColors";
import { MdOutlineBlock } from "react-icons/md";
import ToggleSwitch from "y@/app/components/ToggleSwitch";
import ReasonModal from "y@/app/components/ReasonConfirmModal";
import RowActions from "y@/app/components/RowActions";
import Modal from "y@/app/components/ModalShell";
import RichTextEditor from "y@/app/components/RichTextEditor";
export default function AllDepartments() {
    const [deptName, setDeptName] = useState("");
    const [deptHead, setDeptHead] = useState("");
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [desc, setDesc] = useState("");
    const [locationVal, setLocationVal] = useState("");
    const [amount, setAmount] = useState("");
    const [hod, setHod] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isReasonOpen, setIsReasonOpen] = useState(false);
    const [isAddDeptOpen, setAddBonusOpen] = useState(false);
    const [active, setActive] = useState(true);
    const [showErrors, setShowErrors] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const openReasonModal = () => setIsReasonOpen(true);
    const closeReasonModal = () => setIsReasonOpen(false);
    const openAddDeptModal = () => setAddBonusOpen(true);
    const closeAddDeptModal = () => setAddBonusOpen(false);

    const departmentData = [
        {
            name: "Human Resources",
            departmentHead: "Jane Doe",
            location: "Lahore",
            members: 24,
            createdAt: "2024-01-10",
            statusId: 1,
            status: "Active",
        },
        {
            name: "Finance",
            departmentHead: "John Smith",
            location: "Karachi",
            members: 18,
            createdAt: "2023-12-15",
            statusId: 1,
            status: "Active",
        },
        {
            name: "Engineering",
            departmentHead: "Emily Johnson",
            location: "Islamabad",
            members: 72,
            createdAt: "2024-02-01",
            statusId: 1,
            status: "Active",
        },
        {
            name: "Sales",
            departmentHead: "Michael Brown",
            location: "Multan",
            members: 31,
            createdAt: "2023-11-20",
            statusId: 2,
            status: "Inactive",
        },
        {
            name: "Marketing",
            departmentHead: "Laura Wilson",
            location: "Rawalpindi",
            members: 16,
            createdAt: "2024-01-05",
            statusId: 1,
            status: "Active",
        },
        {
            name: "Operations",
            departmentHead: "David Lee",
            location: "Kohat",
            members: 22,
            createdAt: "2024-02-10",
            statusId: 1,
            status: "Active",
        },
        {
            name: "Customer Support",
            departmentHead: "Sarah Davis",
            location: "Lahore",
            members: 29,
            createdAt: "2023-12-01",
            statusId: 1,
            status: "Active",
        },
        {
            name: "Legal & Compliance",
            departmentHead: "Robert Martinez",
            location: "Karachi",
            members: 11,
            createdAt: "2024-01-15",
            statusId: 1,
            status: "Active",
        },

    ];


    const locations = mapSelectOptions(
        [
            { id: "Lahore", name: "Lahore" },
            { id: "Multan", name: "Multan" },
            { id: "Karachi", name: "Karachi" },
            { id: "Islamabad", name: "Islamabad" },
            { id: "Shaher Sultan", name: "Shaher Sultan" },
            { id: "Rawalpindi", name: "Rawalpindi" },
            { id: "Kohat", name: "Kohat" },
        ],
        "id",
        "name"
    );


    const hods = mapSelectOptions(
        [
            { id: "Jane Doe", name: "Jane Doe" },
            { id: "John Smith", name: "John Smith" },
            { id: "Emily Johnson", name: "Emily Johnson" },
            { id: "Michael Brown", name: "Michael Brown" },
            { id: "Laura Wilson", name: "Laura Wilson" },
            { id: "David Lee", name: "David Lee" },
            { id: "Sarah Davis", name: "Sarah Davis" },
            { id: "Robert Martinez", name: "Robert Martinez" },
        ],
        "id",
        "name"
    );

    const filteredDepartmentData = useMemo(() => {
        const q = search.trim().toLowerCase();
        return departmentData.filter((dept) => {
            const matchesSearch =
                !q ||
                dept.name.toLowerCase().includes(q) ||
                dept.location.toLowerCase().includes(q) ||
                dept.departmentHead.toLowerCase().includes(q);
            const matchesLocation = !location || dept.location === location;
            const matchesHod = !hod || dept.departmentHead === hod;
            return matchesSearch && matchesLocation && matchesHod;
        });
    }, [search, location, hod, departmentData]);


    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold text-gray-700">
                        Departments
                    </h2>
                    <Button type="button" onClick={openAddDeptModal} variant="success">
                        Add Department
                    </Button>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5">
                    <div className="w-full md:w-1/5 flex items-center mb-1">
                        <SearchBar
                            placeholder="Search by name..."
                            onSearch={setSearch}
                        />
                    </div>
                    <div className="w-full flex items-center justify-end flex-col md:flex-row mt-2 md:mt-0 gap-2">
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


                <div className="overflow-x-auto shadow-md border border-gray-200 rounded max-h-[72vh]">
                    <table className="w-full text-xs border-collapse">
                        <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
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
                            {filteredDepartmentData && filteredDepartmentData.length > 0 ? (
                                filteredDepartmentData.map((row, idx) => (
                                    <tr
                                        key={idx}
                                        className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors`}
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
                                                {
                                                    label: "View Department",
                                                    icon: MdOutlineRemoveRedEye,
                                                    onClick: (rowData) => {
                                                        setSelectedDepartment(rowData);
                                                        handleOpenModal();
                                                    },
                                                },
                                                { label: "Edit Department", icon: FiEdit3 },
                                                {
                                                    label: "Deactivate Department",
                                                    icon: MdOutlineBlock,
                                                    color: "red",
                                                    onClick: (rowData) => {
                                                        setSelectedDepartment(rowData);
                                                        openReasonModal();
                                                    },
                                                },
                                            ]}
                                        />
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-center py-4 text-gray-500 italic">
                                        No departments found.
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
                {isOpen && (
                    <Modal width="w-full md:w-5/12">
                        <div className="border-b border-gray-400 pb-3 mb-4">
                            <div className="flex justify-between">
                                <h2 className="text-lg font-semibold text-gray-800">Department Details</h2>
                                <span
                                    className={`inline-flex items-center px-2 py-1 text-xxs font-medium rounded-full ${selectedDepartment?.statusId === 2
                                            ? "bg-red-100 text-red-700"
                                            : "bg-green-100 text-green-700"
                                        }`}
                                >
                                    {selectedDepartment?.status || "Active"}
                                </span>
                            </div>
                            <p className="text-xxs text-gray-500">
                                Created At {selectedDepartment?.createdAt || "-"}
                            </p>
                        </div>
                        <div className="space-y-2 text-xs text-gray-700">
                            <p><span className="font-semibold">Department:</span> {selectedDepartment?.name || "-"}</p>
                            <p><span className="font-semibold">Location:</span> {selectedDepartment?.location || "-"}</p>
                            <p><span className="font-semibold">Department Head:</span> {selectedDepartment?.departmentHead || "-"}</p>
                            <p><span className="font-semibold">Total Employees:</span> {selectedDepartment?.members ?? "-"}</p>
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
                                <RichTextEditor value={desc} onChange={setDesc} />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="cancel" onClick={closeAddDeptModal}>
                                Cancel
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
                                <span className="font-semibold">{selectedDepartment?.name || "Department"}</span>
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Location:</span> {selectedDepartment?.location || "-"}
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Department Head:</span> {selectedDepartment?.departmentHead || "-"}
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
