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
export default function ShiftSchedules() {
    const [shiftName, setShiftName] = useState("");
    const [frequency, setFrequency] = useState("");
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [officeStart, setOfficeStart] = useState("");
    const [officeEnd, setOfficeEnd] = useState("");
    const [breakStart, setBreakStart] = useState("");
    const [breakEnd, setBreakEnd] = useState("");
    const [locationVal, setLocationVal] = useState("");
    const [employees, setEmployees] = useState("");
    const [team, setTeam] = useState("");
    const [eligTeam, setEligTeam] = useState("");
    const [eligEmp, setEligEmp] = useState("");
    const [eligDept, setEligDept] = useState("");
    const [rotation, setRotation] = useState("");
    const [status, setStatus] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isReasonOpen, setIsReasonOpen] = useState(false);
    const [isAddBonusOpen, setAddBonusOpen] = useState(false);
    const [active, setActive] = useState("");
    const [showErrors, setShowErrors] = useState(false);

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const openReasonModal = () => setIsReasonOpen(true);
    const closeReasonModal = () => setIsReasonOpen(false);
    const openAddShiftModal = () => setAddBonusOpen(true);
    const closeAddLeaveModal = () => setAddBonusOpen(false);

    const shiftsData = [
        {
            name: "Morning Shift",
            location: "All Locations",
            startTime: "09:00 AM",
            endTime: "05:00 PM",
            breaks: "1 Hour",
            rotationalTypes: "None",
            eligibleGroup: [
                { type: "Employee", groups: ["Alice", "Bob"] },
                { type: "Department", groups: ["Finance", "Marketing", "Marketing"] },
            ],
            statusId: 1,
            status: "Active",
        },
        {
            name: "Evening Shift",
            location: "Head Office",
            startTime: "08:30 AM",
            endTime: "04:30 PM",
            breaks: "45 Minutes",
            rotationalTypes: "Fixed",
            eligibleGroup: [
                { type: "Team", groups: ["Sales Team A"] },
                { type: "Employee", groups: ["Charlie"] },
            ],
            statusId: 1,
            status: "Active",
        },
        {
            name: "Night Shift",
            location: "All Locations",
            startTime: "10:00 AM",
            endTime: "06:00 PM",
            breaks: "1 Hour",
            rotationalTypes: "None",
            eligibleGroup: [
                { type: "Employee", groups: ["All Employees"] },
            ],
            statusId: 1,
            status: "Active",
        },
        // ... more shifts
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
    const frequencies = mapSelectOptions(
        [
            { id: 1, name: "Monthly" },
            { id: 2, name: "Quarterly" },
            { id: 3, name: "Yearly" },
            { id: 4, name: "On Joining" },
            { id: 5, name: "On Application" },
            { id: 6, name: "Manual Adjustment" }
        ],
        "id",
        "name"
    );

    const rotations = mapSelectOptions(
        [
            { id: 1, name: "None" },
            { id: 2, name: "Fixed" },
            { id: 3, name: "Rotational" },
        ],
        "id",
        "name"
    );



    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-screen p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold text-gray-700">
                        Shift Schedules
                    </h2>
                    <Button type="button" onClick={openAddShiftModal} variant="success">
                        Create Shift
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
                                name="location"
                                value={team}
                                placeholder="Team"
                                onChange={setTeam}
                                options={locations}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="mb-1 w-[9rem]">
                            <CustomSelect
                                name="location"
                                value={employees}
                                placeholder="Employees"
                                onChange={setEmployees}
                                options={locations}
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
                    </div>
                </div>


                {/* Attendance Table */}
                <div className="overflow-x-auto -mt-2">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Location</th>
                                <th className="px-4 py-3 text-left">Start Time</th>
                                <th className="px-4 py-3 text-left">End Time</th>
                                <th className="px-4 py-3 text-left">Breaks</th>
                                <th className="px-4 py-3 text-left">Rotation Type</th>
                                <th className="px-4 py-3 text-left">Eligible Groups</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {shiftsData.map((row, idx) => (
                                <tr
                                    key={idx}
                                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        } hover:bg-gray-100 transition-colors`}
                                >
                                    <td className="px-4 py-3 truncate max-w-[120px]" title={row.name}>{row.name}</td>
                                    <td className="px-4 py-3">{row.location}</td>
                                    <td className="px-4 py-3">{row.startTime}</td>
                                    <td className="px-4 py-3">{row.endTime}</td>
                                    <td className="px-4 py-3">{row.breaks}</td>
                                    <td className="px-4 py-3">{row.rotationalTypes}</td>
                                    <td className="px-4 py-3 truncate max-w-[120px]">
                                        {row.eligibleGroup.map(({ type, groups }, idx) => (
                                            <div key={idx} title={groups.join(", ")}>
                                                <strong>{type}:</strong> {groups.join(", ")}
                                            </div>
                                        ))}
                                    </td>

                                    <td className="px-4 py-3">
                                        <StatusDesign statusId={row.statusId} label={row.status} />
                                    </td>


                                    <RowActions
                                        row={row}
                                        actions={[
                                            { label: "View Shift", icon: MdOutlineRemoveRedEye, onClick: handleOpenModal },
                                            { label: "Edit Shift", icon: FiEdit3 },
                                            { label: "Deactivate Shift", icon: MdOutlineBlock, color: "red", onClick: openReasonModal },
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
                                <h2 className="text-lg font-semibold text-gray-800">Shift Details</h2>
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


                {isAddBonusOpen && (
                    <Modal width="w-full md:w-6/12">
                        <h3 className="text-lg text-center font-semibold mb-4">Create Shift</h3>
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
                                    name="shiftName"
                                    placeholder="Enter shift name"
                                    label="Shift Name"
                                    noMargin={true}
                                    value={shiftName}
                                    onChange={(e) => setShiftName(e.target.value)}
                                    error={showErrors && !shiftName ? "Shift Name is required" : ""}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">

                                <Input
                                    type="time"
                                    name="officeStart"
                                    label="Office Start Time"
                                    noMargin={true}
                                    value={officeStart}
                                    onChange={(e) => setOfficeStart(e.target.value)}
                                    error={showErrors && !officeStart ? "Office Start Time is required" : ""}
                                />
                                <Input
                                    type="time"
                                    name="officeEnd"
                                    label="Office End Time"
                                    noMargin={true}
                                    value={officeEnd}
                                    onChange={(e) => setOfficeEnd(e.target.value)}
                                    error={showErrors && !officeEnd ? "Office End Time is required" : ""}
                                />
                                <CustomSelect
                                    name="rotation"
                                    label="Rotation Type"
                                    value={rotation}
                                    placeholder="Select Rotation"
                                    onChange={setRotation}
                                    options={rotations}
                                    controlHeight="2rem"
                                    error={showErrors && !rotation ? "Rotation is required" : ""}
                                />
                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">

                                <Input
                                    type="time"
                                    name="breakStart"
                                    label="Break Start Time"
                                    noMargin={true}
                                    value={breakStart}
                                    onChange={(e) => setBreakStart(e.target.value)}
                                    error={showErrors && !breakStart ? "Break Start Time is required" : ""}
                                />
                                <Input
                                    type="time"
                                    name="breakEnd"
                                    label="Break End Time"
                                    noMargin={true}
                                    value={breakEnd}
                                    onChange={(e) => setBreakEnd(e.target.value)}
                                    error={showErrors && !breakEnd ? "Break End Time is required" : ""}
                                />
                                <CustomSelect
                                    name="eligTeam"
                                    label="Eligible Team"
                                    value={eligTeam}
                                    placeholder="Select Team"
                                    onChange={setEligTeam}
                                    options={locations}
                                    isMulti={true}
                                    controlHeight="2rem"
                                />

                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">


                                <CustomSelect
                                    name="eligEmp"
                                    label="Eligible Employees"
                                    value={eligEmp}
                                    placeholder="Select Employee"
                                    onChange={setEligEmp}
                                    options={locations}
                                    isMulti={true}
                                    controlHeight="2rem"
                                />
                                <CustomSelect
                                    name="eligDept"
                                    label="Eligible Department"
                                    value={eligDept}
                                    placeholder="Select Department"
                                    onChange={setEligDept}
                                    options={locations}
                                    isMulti={true}
                                    controlHeight="2rem"
                                />

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
                            <Button variant="cancel" onClick={closeAddLeaveModal}>
                                Close
                            </Button>
                            <Button variant="success">
                                Create
                            </Button>
                        </div>

                    </Modal>
                )}

                <ReasonModal
                    isOpen={isReasonOpen}
                    title="Deactivate Shift"
                    infoSection={
                        <div className="border-gray-300 border-b py-1 mb-2">
                            <p className="text-xs text-gray-800 font-medium">
                                <span className="font-semibold">Night Shift</span>
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Start Time:</span> 05:00 PM
                            </p>
                             <p className="text-xxs text-gray-600">
                                <span>End Time:</span> 09:00 AM
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Location:</span> Multan
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Rotation Type:</span> Fixed
                            </p>
                        </div>}
                    onClose={closeReasonModal}
                    // onSubmit={handleReject}
                    variant="danger"
                    submitLabel="Deactivate"
                    reasonTitle="Please provide a reason to deactivate this shift."
                />


            </div>
        </Layout>
    );
}
