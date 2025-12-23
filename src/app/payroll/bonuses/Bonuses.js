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
export default function AllBonuses() {
    const [bonusName, setBonusName] = useState("");
    const [frequency, setFrequency] = useState("");
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [eligibility, setEligibility] = useState("");
    const [locationVal, setLocationVal] = useState("");
    const [amount, setAmount] = useState("");
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
    const openAddLeaveModal = () => setAddBonusOpen(true);
    const closeAddLeaveModal = () => setAddBonusOpen(false);

    const bonusesData = [
        {
            name: "Performance Bonus",
            description: "Quarterly bonus based on employee performance ratings.",
            amount: 5000,
            eligibility: "Employees with Performance Rating 4+",
            frequency: "Quarterly",
            createdAt: "2024-01-10",
            statusId: 1,
            status: "Active",
            location: "All Locations",
        },
        {
            name: "Year-End Bonus",
            description: "Annual bonus given at the end of the fiscal year.",
            amount: 10000,
            eligibility: "Employees with 1+ Year Service",
            frequency: "Annually",
            createdAt: "2023-12-15",
            statusId: 1,
            status: "Active",
            location: "Head Office",
        },
        {
            name: "Referral Bonus",
            description: "Bonus awarded for successful employee referrals.",
            amount: 3000,
            eligibility: "All Employees",
            frequency: "Per Referral",
            createdAt: "2024-02-01",
            statusId: 1,
            status: "Active",
            location: "All Locations",
        },
        {
            name: "Holiday Bonus",
            description: "Special bonus during festive holidays.",
            amount: 2000,
            eligibility: "All Active Employees",
            frequency: "Annually",
            createdAt: "2023-11-20",
            statusId: 2,
            status: "Inactive",
            location: "Regional Office - East",
        },
        {
            name: "Attendance Bonus",
            description: "Bonus for perfect attendance each month.",
            amount: 1500,
            eligibility: "Employees with No Absences",
            frequency: "Monthly",
            createdAt: "2024-01-05",
            statusId: 1,
            status: "Active",
            location: "All Locations",
        },
        {
            name: "Training Completion Bonus",
            description: "Bonus for completing approved training programs.",
            amount: 1000,
            eligibility: "Employees Completing Training",
            frequency: "Per Training",
            createdAt: "2024-02-10",
            statusId: 1,
            status: "Active",
            location: "Head Office",
        },
        {
            name: "Customer Satisfaction Bonus",
            description: "Bonus based on positive customer feedback.",
            amount: 4000,
            eligibility: "Customer-Facing Employees",
            frequency: "Quarterly",
            createdAt: "2023-12-01",
            statusId: 1,
            status: "Active",
            location: "All Locations",
        },
        {
            name: "Leadership Bonus",
            description: "Bonus for managers exceeding team goals.",
            amount: 8000,
            eligibility: "Managers Only",
            frequency: "Quarterly",
            createdAt: "2024-01-15",
            statusId: 1,
            status: "Active",
            location: "Regional Office - West",
        },
        {
            name: "Innovation Bonus",
            description: "Bonus for implemented innovative ideas.",
            amount: 6000,
            eligibility: "All Employees",
            frequency: "Annually",
            createdAt: "2023-11-25",
            statusId: 2,
            status: "Inactive",
            location: "Head Office",
        },
        {
            name: "Holiday Season Bonus",
            description: "Special bonus distributed during the holiday season.",
            amount: 3000,
            eligibility: "Full-Time Employees Only",
            frequency: "Annually",
            createdAt: "2023-12-10",
            statusId: 1,
            status: "Active",
            location: "All Locations",
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

    const eligibilities = mapSelectOptions(
        [
            { id: 1, name: "All Employees" },
            { id: 2, name: "Full-Time Employees Only" },
            { id: 3, name: "Part-Time Employees Only" },
            { id: 4, name: "Employees with 1+ Year Service" },
            { id: 5, name: "Employees with 3+ Year Service" },
            { id: 6, name: "Managers Only" },
            { id: 7, name: "Customer-Facing Employees" },
            { id: 8, name: "Employees with No Absences" },
            { id: 9, name: "Employees with Performance Rating 4+" },
            { id: 10, name: "Employees Completing Training" },
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
                        Bonuses
                    </h2>
                    <Button type="button" onClick={openAddLeaveModal} variant="success">
                        Add Bonus
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
                                <th className="px-4 py-3 text-left">Description</th>
                                <th className="px-4 py-3 text-left">Amount</th>
                                <th className="px-4 py-3 text-left">Eligibility</th>
                                <th className="px-4 py-3 text-left">Frequency</th>
                                <th className="px-4 py-3 text-left">Created At</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {bonusesData.map((row, idx) => (
                                <tr
                                    key={idx}
                                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        } hover:bg-gray-100 transition-colors`}
                                >
                                    <td className="px-4 py-3 truncate max-w-[120px]" title={row.name}>{row.name}</td>
                                    <td className="px-4 py-3">{row.location}</td>
                                    <td className="px-4 py-3 truncate max-w-[120px]" title={row.description}>{row.description}</td>
                                    <td className="px-4 py-3">{row.amount.toLocaleString()}</td>
                                    <td className="px-4 py-3">{row.eligibility}</td>
                                    <td className="px-4 py-3">{row.frequency}</td>
                                    <td className="px-4 py-3">{row.createdAt}</td>
                                    <td className="px-4 py-3">
                                        <StatusDesign statusId={row.statusId} label={row.status} />
                                    </td>


                                    <RowActions
                                        row={row}
                                        actions={[
                                            { label: "View Bonus", icon: MdOutlineRemoveRedEye, onClick: handleOpenModal },
                                            { label: "Edit Bonus", icon: FiEdit3 },
                                            { label: "Deactivate Bonus", icon: MdOutlineBlock, color: "red", onClick: openReasonModal },
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


                {isAddBonusOpen && (
                    <Modal width="w-full md:w-6/12">
                        <h3 className="text-lg text-center font-semibold mb-4">Add Bonus</h3>
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
                                    name="bonusName"
                                    placeholder="Enter bonus name"
                                    label="Bonus Name"
                                    noMargin={true}
                                    value={bonusName}
                                    onChange={(e) => setBonusName(e.target.value)}
                                    error={showErrors && !bonusName ? "Bonus Name is required" : ""}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">

                                <Input
                                    type="number"
                                    name="amount"
                                    placeholder="Enter amount"
                                    label="Default Amount"
                                    noMargin={true}
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    error={showErrors && !amount ? "Amount is required" : ""}
                                />
                                <CustomSelect
                                    name="frequency"
                                    label="Frequency"
                                    value={frequency}
                                    placeholder="Select Frequency"
                                    onChange={setFrequency}
                                    options={frequencies}
                                    controlHeight="2rem"
                                    tooltip="Set how frequently this bonus is applied to eligible employees."
                                    error={showErrors && !frequency ? "Frequency is required" : ""}
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
                                Add Bonus
                            </Button>
                        </div>

                    </Modal>
                )}

                <ReasonModal
                    isOpen={isReasonOpen}
                    title="Deactivate Bonus"
                    infoSection={
                        <div className="border-gray-300 border-b py-1 mb-2">
                            <p className="text-xs text-gray-800 font-medium">
                                <span className="font-semibold">Performance Bonus</span>
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Amount:</span> 5000
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Location:</span> Multan
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Eligibility:</span> Full-Time Employees Only
                            </p>
                        </div>}
                    onClose={closeReasonModal}
                    // onSubmit={handleReject}
                    variant="danger"
                    submitLabel="Deactivate"
                    reasonTitle="Please provide a reason to deactivate this bonus."
                />


            </div>
        </Layout>
    );
}
