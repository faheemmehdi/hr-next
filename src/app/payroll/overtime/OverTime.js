"use client";
import Layout from "y@/app/components/Layout";
import Input from "y@/app/components/Input";
import { useState } from "react";
import SearchBar from "y@/app/components/SearchBar";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import CustomSelect from "y@/app/components/CustomSelect";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineRemoveRedEye, MdOutlineBlock } from "react-icons/md";
import Button from "y@/app/components/Button";
import StatusDesign from "y@/app/components/StatusColors";
import ToggleSwitch from "y@/app/components/ToggleSwitch";
import ReasonModal from "y@/app/components/ReasonConfirmModal";
import RowActions from "y@/app/components/RowActions";
import Modal from "y@/app/components/ModalShell";
import RichTextEditor from "y@/app/components/RichTextEditor";

export default function AllOvertime() {
    const [ruleName, setRuleName] = useState("");
    const [rate, setRate] = useState("");
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [eligibility, setEligibility] = useState("");
    const [locationVal, setLocationVal] = useState("");
    const [status, setStatus] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isReasonOpen, setIsReasonOpen] = useState(false);
    const [isAddRuleOpen, setAddRuleOpen] = useState(false);
    const [active, setActive] = useState(true);
    const [showErrors, setShowErrors] = useState(false);
    const [desc, setDesc] = useState("");

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const openReasonModal = () => setIsReasonOpen(true);
    const closeReasonModal = () => setIsReasonOpen(false);
    const openAddRuleModal = () => setAddRuleOpen(true);
    const closeAddRuleModal = () => setAddRuleOpen(false);

    const overtimeData = [
        {
            name: "Weekday OT",
            description: "Overtime for weekdays, 1.5x hourly rate.",
            rate: 1.5,
            eligibility: "Full-Time Employees",
            createdAt: "2024-01-10",
            statusId: 1,
            status: "Active",
            location: "All Locations",
        },
        {
            name: "Weekend OT",
            description: "Overtime on weekends, 2x hourly rate.",
            rate: 2,
            eligibility: "All Employees",
            createdAt: "2024-02-01",
            statusId: 1,
            status: "Active",
            location: "Head Office",
        },
        {
            name: "Holiday OT",
            description: "Overtime on public holidays, 3x hourly rate.",
            rate: 3,
            eligibility: "All Employees",
            createdAt: "2023-12-15",
            statusId: 2,
            status: "Inactive",
            location: "Regional Office",
        },
    ];

    const locations = mapSelectOptions(
        [
            { id: 1, name: "Lahore" },
            { id: 2, name: "Multan" },
            { id: 3, name: "Karachi" },
            { id: 4, name: "Islamabad" },
            { id: 5, name: "Rawalpindi" },
        ],
        "id",
        "name"
    );

    const statuses = mapSelectOptions(
        [
            { id: 1, name: "Active" },
            { id: 2, name: "Inactive" }
        ],
        "id",
        "name"
    );

    const eligibilities = mapSelectOptions(
        [
            { id: 1, name: "All Employees" },
            { id: 2, name: "Full-Time Employees Only" },
            { id: 3, name: "Part-Time Employees Only" },
        ],
        "id",
        "name"
    );

    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold text-gray-700">
                        Overtime Rules
                    </h2>
                    <Button type="button" onClick={openAddRuleModal} variant="success">
                        Add Rule
                    </Button>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5">
                    <div className="w-full md:w-1/5 flex items-center mb-1">
                        <SearchBar
                            placeholder="Search by rule name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
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
                            <tr>
                                <th className="px-4 py-3 text-left">Rule</th>
                                <th className="px-4 py-3 text-left">Location</th>
                                <th className="px-4 py-3 text-left">Description</th>
                                <th className="px-4 py-3 text-left">Rate</th>
                                <th className="px-4 py-3 text-left">Eligibility</th>
                                <th className="px-4 py-3 text-left">Created At</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {overtimeData.length > 0 ? (
                                overtimeData.map((row, idx) => (
                                    <tr
                                        key={idx}
                                        className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                            } hover:bg-gray-100 transition-colors`}
                                    >
                                        <td className="px-4 py-3 truncate max-w-[120px]" title={row.name}>{row.name}</td>
                                        <td className="px-4 py-3">{row.location}</td>
                                        <td className="px-4 py-3 truncate max-w-[120px]" title={row.description}>{row.description}</td>
                                        <td className="px-4 py-3">{row.rate}x</td>
                                        <td className="px-4 py-3">{row.eligibility}</td>
                                        <td className="px-4 py-3">{row.createdAt}</td>
                                        <td className="px-4 py-3">
                                            <StatusDesign statusId={row.statusId} label={row.status} />
                                        </td>

                                        <RowActions
                                            row={row}
                                            actions={[
                                                { label: "View Rule", icon: MdOutlineRemoveRedEye, onClick: handleOpenModal },
                                                { label: "Edit Rule", icon: FiEdit3 },
                                                { label: "Deactivate Rule", icon: MdOutlineBlock, color: "red", onClick: openReasonModal },
                                            ]}
                                        />
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="text-center py-4 text-gray-500 italic">
                                        No overtime rules found.
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
                                <h2 className="text-lg font-semibold text-gray-800">Overtime Rule Details</h2>
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
                        </div>
                    </Modal>
                )}

                {isAddRuleOpen && (
                    <Modal width="w-full md:w-6/12">
                        <h3 className="text-lg text-center font-semibold mb-4">Add Overtime Rule</h3>
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
                                    name="ruleName"
                                    placeholder="Enter rule name"
                                    label="Rule Name"
                                    noMargin={true}
                                    value={ruleName}
                                    onChange={(e) => setRuleName(e.target.value)}
                                    error={showErrors && !ruleName ? "Rule Name is required" : ""}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                                <Input
                                    type="number"
                                    name="rate"
                                    placeholder="Enter rate multiplier"
                                    label="Rate (x)"
                                    noMargin={true}
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                    error={showErrors && !rate ? "Rate is required" : ""}
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                <CustomSelect
                                    name="eligibility"
                                    label="Eligibility"
                                    value={eligibility}
                                    placeholder="Select Eligibility"
                                    onChange={setEligibility}
                                    options={eligibilities}
                                    controlHeight="2rem"
                                    error={showErrors && !eligibility ? "Eligibility is required" : ""}
                                />
                            </div>

                            <div className="w-full mb-3">
                                <label htmlFor="desc" className="block text-xxs text-gray-700 mb-2">
                                    Description
                                </label>
                                <RichTextEditor value={desc} onChange={setDesc} />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button variant="cancel" onClick={closeAddRuleModal}>
                                Cancel
                            </Button>
                            <Button variant="success">
                                Add Rule
                            </Button>
                        </div>
                    </Modal>
                )}

                <ReasonModal
                    isOpen={isReasonOpen}
                    title="Deactivate Overtime Rule"
                    infoSection={
                        <div className="border-gray-300 border-b py-1 mb-2">
                            <p className="text-xs text-gray-800 font-medium">
                                <span className="font-semibold">Weekday OT</span>
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Rate:</span> 1.5x
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Location:</span> All Locations
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Eligibility:</span> Full-Time Employees
                            </p>
                        </div>
                    }
                    onClose={closeReasonModal}
                    variant="danger"
                    submitLabel="Deactivate"
                    reasonTitle="Please provide a reason to deactivate this overtime rule."
                />
            </div>
        </Layout>
    );
}