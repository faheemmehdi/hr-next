"use client";
import Layout from "y@/app/components/Layout";
import Input from "y@/app/components/Input";
import { useState, useEffect, useRef } from "react";
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
export default function LeaveSettings() {
    const [typeName, setTypeName] = useState("");
    const [typeCode, setTypeCode] = useState("");
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [type, setType] = useState("");
    const [locationVal, setLocationVal] = useState("");
    const [leaveLimit, setLeaveLimit] = useState("");
    const [CFAllow, setCFAllow] = useState("");
    const [CFDays, setCFDays] = useState("");
    const [ASAfter, setASAfter] = useState("");
    const [status, setStatus] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isReasonOpen, setIsReasonOpen] = useState(false);
    const [isAddLeaveOpen, setAddLeaveOpen] = useState(false);
    const [cashAllow, setCashAllow] = useState(false);
    const [probation, setProbation] = useState(false);
    const [active, setActive] = useState(true);
    const [showErrors, setShowErrors] = useState(false);

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const openReasonModal = () => setIsReasonOpen(true);
    const closeReasonModal = () => setIsReasonOpen(false);
    const openAddLeaveModal = () => setAddLeaveOpen(true);
    const closeAddLeaveModal = () => setAddLeaveOpen(false);

    const leaveTypesData = [
        {
            typeId: 1,
            code: "AL",
            name: "Annual Leave",
            annualLimit: 20,
            accrual: "Yearly",
            carryForward: 1, // 1 = Allowed
            carryForwardDays: 10,
            encashment: 1, // 1 = Allowed
            eligibility: "Confirmed employees only",
            probation: 0, // 0 = Not allowed
            location: "All Locations",
            statusId: 1,
            status: "Active",
        },
        {
            typeId: 2,
            code: "SL",
            name: "Sick Leave",
            annualLimit: 8,
            accrual: "Monthly",
            carryForward: 0,
            carryForwardDays: 0,
            encashment: 0,
            eligibility: "All employees",
            probation: 1,
            location: "All Locations",
            statusId: 1,
            status: "Active",
        },
        {
            typeId: 3,
            code: "CL",
            name: "Casual Leave",
            annualLimit: 12,
            accrual: "Monthly",
            carryForward: 1,
            carryForwardDays: 6,
            encashment: 0,
            eligibility: "All confirmed staff",
            probation: 0,
            location: "Lahore HQ",
            statusId: 1,
            status: "Active",
        },
        {
            typeId: 4,
            code: "ML",
            name: "Maternity Leave",
            annualLimit: 90,
            accrual: "On Application",
            carryForward: 0,
            carryForwardDays: 0,
            encashment: 0,
            eligibility: "Female employees only",
            probation: 0,
            location: "Karachi HQ",
            statusId: 1,
            status: "Active",
        },
        {
            typeId: 5,
            code: "PL",
            name: "Paternity Leave",
            annualLimit: 10,
            accrual: "On Application",
            carryForward: 0,
            carryForwardDays: 0,
            encashment: 0,
            eligibility: "Male employees only",
            probation: 0,
            location: "Islamabad Office",
            statusId: 2,
            status: "Inactive",
        },
        {
            typeId: 6,
            code: "EL",
            name: "Emergency Leave",
            annualLimit: 5,
            accrual: "On Need Basis",
            carryForward: 0,
            carryForwardDays: 0,
            encashment: 0,
            eligibility: "All employees",
            probation: 1,
            location: "All Locations",
            statusId: 1,
            status: "Active",
        },
        {
            typeId: 7,
            code: "WFH",
            name: "Work From Home",
            annualLimit: 12,
            accrual: "Monthly",
            carryForward: 0,
            carryForwardDays: 0,
            encashment: 0,
            eligibility: "Eligible roles only",
            probation: 1,
            location: "Remote / Hybrid",
            statusId: 2,
            status: "Inactive",
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
    const accrualTypes = mapSelectOptions(
        [
            { id: 1, name: "Monthly" },
            { id: 2, name: "Quarterly" },
            { id: 3, name: "Yearly" },
            { id: 4, name: "On Joining" },
            { id: 5, name: "On Application" },
            { id: 6, name: "Manual Adjustment" },
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
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold text-gray-700">
                        Leave Types & Policies
                    </h2>
                    <Button type="button" onClick={openAddLeaveModal} variant="success">
                        Add Leave Type
                    </Button>
                </div>

                <div className="w-full flex justify-between flex-col md:flex-row items-center my-2 mt-5">
                    <div className="w-full md:w-1/5 flex items-center mb-1">
                        <SearchBar
                            placeholder="Search by name or Code..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="w-full flex flex-col md:flex-row justify-end mt-2 md:mt-0 items-center gap-2">
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
                    </div>
                </div>


                <div className="overflow-x-auto shadow-md border border-gray-200 rounded max-h-[72vh]">
                    <table className="w-full text-xs border-collapse">
                        <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="px-4 py-3 text-left rounded-tl-md">Code</th>
                                <th className="px-4 py-3 text-left">Leave Type Name</th>
                                <th className="px-4 py-3 text-left">Location</th>
                                <th className="px-4 py-3 text-left">Annual Limit</th>
                                <th className="px-4 py-3 text-left">Accrual</th>
                                <th className="px-4 py-3 text-left">Carry Forward</th>
                                <th className="px-4 py-3 text-left">Encashment</th>
                                <th className="px-4 py-3 text-left">Eligibility</th>
                                <th className="px-4 py-3 text-left">Probation</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {leaveTypesData && leaveTypesData.length > 0 ? (
                                leaveTypesData.map((row, idx) => (
                                    <tr
                                        key={idx}
                                        className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                            } hover:bg-gray-100 transition-colors`}
                                    >
                                        <td className="px-4 py-3">{row.code}</td>
                                        <td className="px-4 py-3 truncate max-w-[120px]" title={row.name}>{row.name}</td>
                                        <td className="px-4 py-3">{row.location}</td>
                                        <td className="px-4 py-3">{row.annualLimit} Days</td>
                                        <td className="px-4 py-3">{row.accrual}</td>
                                        <td className="px-4 py-3">{row.carryForward ? 'Up to ' + row.carryForwardDays + ' Days' : 'No'}</td>
                                        <td className="px-4 py-3">{row.encashment ? 'Allowed' : 'No'}</td>
                                        <td className="px-4 py-3">{row.eligibility}</td>
                                        <td className="px-4 py-3">{row.probation ? 'Allowed' : 'No'}</td>
                                        <td className="px-4 py-3">
                                            <StatusDesign statusId={row.statusId} label={row.status} />
                                        </td>


                                        <RowActions
                                            row={row}
                                            actions={[
                                                { label: "View Leave Type", icon: MdOutlineRemoveRedEye, onClick: handleOpenModal },
                                                { label: "Edit Leave Type", icon: FiEdit3 },
                                                { label: "Deactivate Type", icon: MdOutlineBlock, color: "red", onClick: openReasonModal },
                                            ]}
                                        />
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={11} className="text-center py-4 text-gray-500 italic">
                                        No leave type found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-10/12 md:w-5/12">

                            <div className="w-full">
                                <div className="px-5 py-1 bg-white rounded-xl">

                                    <div className="border-b border-gray-400 pb-3 mb-4">
                                        <div className="flex justify-between">
                                            <h2 className="text-lg font-semibold text-gray-800">Leave Type Details</h2>
                                            <span className="inline-flex items-center px-2 py-1 text-xxs font-medium rounded-full bg-green-100 text-green-700">
                                                Active
                                            </span>
                                        </div>
                                        <p className="text-xxs text-gray-500">Updated on Oct 20, 2025 at 09:10 AM</p>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                        <div>
                                            <p className="text-xxs text-gray-500 font-medium">Leave Type Name</p>
                                            <p className="text-xs font-semibold text-gray-800">Casual Leave</p>
                                        </div>
                                        <div>
                                            <p className="text-xxs text-gray-500 font-medium">Code</p>
                                            <p className="text-xs text-gray-800">CL</p>
                                        </div>
                                        <div>
                                            <p className="text-xxs text-gray-500 font-medium">Location</p>
                                            <p className="text-xs text-gray-800">Lahore</p>
                                        </div>
                                    </div>


                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                        <div>
                                            <p className="text-xxs text-gray-500 font-medium">Annual Limit</p>
                                            <p className="text-xs text-gray-800">23 Days</p>
                                        </div>
                                        <div>
                                            <p className="text-xxs text-gray-500 font-medium">Accrual Type</p>
                                            <p className="text-xs text-gray-800">Yearly</p>
                                        </div>
                                        <div>
                                            <p className="text-xxs text-gray-500 font-medium">Probation</p>
                                            <p className="text-xs text-gray-800">No</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                        <div>
                                            <p className="text-xxs text-gray-500 font-medium">Carry Forward</p>
                                            <p className="text-xs text-gray-800">Allowed</p>
                                        </div>
                                        <div>
                                            <p className="text-xxs text-gray-500 font-medium">Carry Forward Limit</p>
                                            <p className="text-xs text-gray-800">11 Days</p>
                                        </div>
                                        <div>
                                            <p className="text-xxs text-gray-500 font-medium">Accrual Start After</p>
                                            <p className="text-xs text-gray-800">32 Days</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                        <div>
                                            <p className="text-xxs text-gray-500 font-medium">Encashment</p>
                                            <p className="text-xs text-gray-800">Allowed</p>
                                        </div>
                                        <div>
                                            <p className="text-xxs text-gray-500 font-medium">Encashment Policy Note</p>
                                            <p className="text-xs text-gray-800 text-justify truncate" title="Would you like me to show you a clean professional ToggleSwitch component built in Tailwind (with proper label alignment and smooth animation">Would you like me to show you a clean professional ToggleSwitch component built in Tailwind with proper label alignment and smooth animation</p>
                                        </div>
                                        <div>
                                            <p className="text-xxs text-gray-500 font-medium">Carry Forward</p>
                                            <p className="text-xs text-gray-800">Allowed</p>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-400 pt-4 mb-4">

                                        <p className="text-xxs text-gray-500 font-medium mb-1">Policy Description / Notes</p>
                                        <p className="text-xs text-gray-800 text-justify">
                                            Would you like me to show you a clean professional ToggleSwitch component built in Tailwind with proper label alignment and smooth animation
                                        </p>
                                    </div>

                                    <div className="flex justify-end border-t border-gray-400 pt-4">
                                        <Button variant="cancel" onClick={handleCloseModal}>
                                            Close
                                        </Button>
                                        {/* <Button variant="success" onClick={handleSave}>
                                        Save
                                    </Button> */}
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>
                )}


                {isAddLeaveOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-10/12 md:w-6/12">
                            <h3 className="text-lg text-center font-semibold mb-4">Add Leave Type</h3>
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
                                        name="typeName"
                                        placeholder="Enter Leave Type name"
                                        label="Leave Type Name"
                                        noMargin={true}
                                        value={typeName}
                                        onChange={(e) => setTypeName(e.target.value)}
                                        error={showErrors && !typeName ? "Leave Type Name is required" : ""}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                                    <Input
                                        type="text"
                                        name="typeCode"
                                        placeholder="Enter Leave Type Code"
                                        label="Leave Type Code"
                                        noMargin={true}
                                        value={typeCode}
                                        onChange={(e) => setTypeCode(e.target.value)}
                                        error={showErrors && !typeCode ? "Type Code is required" : ""}
                                    />
                                    <Input
                                        type="number"
                                        name="leavesLimit"
                                        placeholder="Enter number"
                                        label="Annual Limit"
                                        noMargin={true}
                                        value={leaveLimit}
                                        onChange={(e) => setLeaveLimit(e.target.value)}
                                        error={showErrors && !leaveLimit ? "Annual Limit is required" : ""}
                                    />
                                    <CustomSelect
                                        name="type"
                                        label="Accrual Type"
                                        value={type}
                                        placeholder="Select Type"
                                        onChange={setType}
                                        options={accrualTypes}
                                        controlHeight="2rem"
                                        tooltip="Decides when employees get this leave (every month or year)."
                                        error={showErrors && !type ? "Accrual Type is required" : ""}
                                    />


                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

                                    <div className="flex flex-col gap-2">
                                        <div className="w-full md:w-62">
                                            <ToggleSwitch
                                                label="Carry Forward Allowed"
                                                checked={CFAllow}
                                                onChange={setCFAllow}
                                            />
                                        </div>
                                        {CFAllow && (
                                            <Input
                                                type="number"
                                                name="cfDays"
                                                placeholder="Enter Max Days"
                                                label="Carry Forward Limit (Days)"
                                                noMargin={true}
                                                value={CFDays}
                                                onChange={(e) => setCFDays(e.target.value)}
                                                error={showErrors && !CFDays && CFAllow ? "Carry Forward Limit is required" : ""}
                                            />
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <div className="w-full md:w-62">
                                            <ToggleSwitch
                                                label="Encashment Allowed"
                                                checked={cashAllow}
                                                onChange={setCashAllow}
                                            />
                                        </div>
                                        {cashAllow && (
                                            <div className="w-full">
                                                <label
                                                    htmlFor="cashPolicyNote"
                                                    className="block text-xxs text-gray-700 mb-1"
                                                >
                                                    Encashment Policy Note
                                                </label>
                                                <textarea
                                                    id="cashPolicyNote"
                                                    rows="1"
                                                    placeholder="Enter policy note ..."
                                                    className="w-full rounded border border-gray-300 px-3 py-2 text-gray-800 text-xxs 
                                                    focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-300 
                                                    resize-y overflow-hidden transition-all duration-150 min-h-[32px] max-h-[150px]"
                                                />
                                            </div>

                                        )}
                                    </div>


                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                                    <div className="w-full">
                                        <Input
                                            type="number"
                                            name="asAfter"
                                            placeholder="Enter Number"
                                            label="Accrual Start After (Days)"
                                            noMargin={true}
                                            value={ASAfter}
                                            onChange={(e) => setASAfter(e.target.value)}
                                            error={showErrors && !ASAfter && CFAllow ? "Accrual Start After is required" : ""}
                                        />
                                    </div>
                                    <div className="w-full flex items-center">
                                        <div className="w-full md:w-37 md:mt-4">
                                            <ToggleSwitch
                                                label="Probation Eligibility"
                                                checked={probation}
                                                onChange={setProbation}
                                            />
                                        </div>
                                    </div>
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
                                        htmlFor="pDesc"
                                        className="block text-xxs text-gray-700 mb-2"
                                    >
                                        Policy Description / Notes
                                    </label>
                                    <textarea
                                        id="pDesc"
                                        rows="4"
                                        placeholder="Enter policies notes..."
                                        className="w-full rounded border border-gray-300 p-3 text-gray-800 text-xxs resize-none 
                                        focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-300 transition-all duration-150"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button variant="cancel" onClick={closeAddLeaveModal}>
                                    Cancel
                                </Button>
                                <Button variant="success">
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                <ReasonModal
                    isOpen={isReasonOpen}
                    title="Deactivate Leave Type"
                    infoSection={
                        <div className="border-gray-300 border-b py-1 mb-2">
                            <p className="text-xs text-gray-800 font-medium">
                                <span className="font-semibold">Annual Leave</span>
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Code:</span> AL
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Location:</span> Multan
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Annual Limit:</span> 22
                            </p>
                        </div>}
                    onClose={closeReasonModal}
                    variant="danger"
                    // onSubmit={handleReject}
                    submitLabel="Deactivate"
                    reasonTitle="Please provide a reason to deactivate this leave type."
                />


            </div>
        </Layout>
    );
}
