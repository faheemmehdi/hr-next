"use client";
import Layout from "y@/app/components/Layout";
import Input from "y@/app/components/Input";
import { useState } from "react";
import SearchBar from "y@/app/components/SearchBar";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import CustomSelect from "y@/app/components/CustomSelect";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Button from "y@/app/components/Button";
import StatusDesign from "y@/app/components/StatusColors";
import ToggleSwitch from "y@/app/components/ToggleSwitch";
import ReasonModal from "y@/app/components/ReasonConfirmModal";
import RowActions from "y@/app/components/RowActions";
import Modal from "y@/app/components/ModalShell";

export default function CurrentCompensation() {

    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("");
    const [status, setStatus] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isReviseOpen, setIsReviseOpen] = useState(false);
    const [isReasonOpen, setIsReasonOpen] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    const [baseSalary, setBaseSalary] = useState("");
    const [allowances, setAllowances] = useState("");
    const [effectiveFrom, setEffectiveFrom] = useState("");
    const [active, setActive] = useState(true);

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const openReviseModal = () => setIsReviseOpen(true);
    const closeReviseModal = () => setIsReviseOpen(false);
    const openReasonModal = () => setIsReasonOpen(true);
    const closeReasonModal = () => setIsReasonOpen(false);

    const compensationData = [
        {
            employee: "Ahmad Khan",
            structure: "Standard Structure",
            base: 80000,
            allowances: 25000,
            effectiveFrom: "2025-01-01",
            effectiveTo: "—",
            statusId: 1,
            status: "Active"
        },
        {
            employee: "Sara Ali",
            structure: "Executive Package",
            base: 120000,
            allowances: 40000,
            effectiveFrom: "2024-06-01",
            effectiveTo: "—",
            statusId: 1,
            status: "Active"
        },
        {
            employee: "Bilal Ahmed",
            structure: "Sales Incentive Plan",
            base: 70000,
            allowances: 30000,
            effectiveFrom: "2024-01-01",
            effectiveTo: "2024-12-31",
            statusId: 2,
            status: "Revised"
        }
    ];

    const departments = mapSelectOptions(
        [
            { id: 1, name: "HR" },
            { id: 2, name: "Finance" },
            { id: 3, name: "IT" },
            { id: 4, name: "Sales" }
        ],
        "id",
        "name"
    );

    const statuses = mapSelectOptions(
        [
            { id: 1, name: "Active" },
            { id: 2, name: "Revised" }
        ],
        "id",
        "name"
    );

    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold text-gray-700">
                        Current Compensation
                    </h2>
                    <Button onClick={openReviseModal} variant="success">
                        Revise Pay
                    </Button>
                </div>

                {/* Filters */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5">
                    <div className="w-full md:w-1/5 flex items-center mb-1">
                        <SearchBar
                            placeholder="Search by employee..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="w-full flex items-center justify-end flex-col md:flex-row mt-2 md:mt-0 gap-2">
                        <div className="w-full md:w-[9rem]">
                            <CustomSelect
                                name="department"
                                value={department}
                                placeholder="Department"
                                onChange={setDepartment}
                                options={departments}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="w-full md:w-[9rem]">
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

                {/* Table */}
                <div className="overflow-x-auto shadow-md border border-gray-200 rounded max-h-[72vh]">
                    <table className="w-full text-xs border-collapse">
                        <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 text-left">Employee</th>
                                <th className="px-4 py-3 text-left">Structure</th>
                                <th className="px-4 py-3 text-left">Base</th>
                                <th className="px-4 py-3 text-left">Allowances</th>
                                <th className="px-4 py-3 text-left">Effective From</th>
                                <th className="px-4 py-3 text-left">Effective To</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {compensationData.map((row, idx) => (
                                <tr key={idx} className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}>
                                    <td className="px-4 py-3">{row.employee}</td>
                                    <td className="px-4 py-3">{row.structure}</td>
                                    <td className="px-4 py-3">{row.base.toLocaleString()}</td>
                                    <td className="px-4 py-3">{row.allowances.toLocaleString()}</td>
                                    <td className="px-4 py-3">{row.effectiveFrom}</td>
                                    <td className="px-4 py-3">{row.effectiveTo}</td>
                                    <td className="px-4 py-3">
                                        <StatusDesign statusId={row.statusId} label={row.status} />
                                    </td>
                                    <RowActions
                                        row={row}
                                        actions={[
                                            { label: "View Details", icon: MdOutlineRemoveRedEye, onClick: handleOpenModal },
                                            { label: "Revise Pay", icon: FiEdit3, onClick: openReviseModal },
                                        ]}
                                    />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* View Modal */}
                {isOpen && (
                    <Modal width="w-full md:w-5/12">
                        <div className="border-b pb-3 mb-4">
                            <h2 className="text-lg font-semibold">Compensation Details</h2>
                        </div>
                        <div className="flex justify-end">
                            <Button variant="cancel" onClick={handleCloseModal}>
                                Close
                            </Button>
                        </div>
                    </Modal>
                )}

                {/* Revise Pay Modal */}
                {isReviseOpen && (
                    <Modal width="w-full md:w-6/12">
                        <h3 className="text-lg text-center font-semibold mb-4">
                            Revise Compensation
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                            <Input
                                type="number"
                                label="Base Salary"
                                value={baseSalary}
                                onChange={(e) => setBaseSalary(e.target.value)}
                                error={showErrors && !baseSalary ? "Required" : ""}
                            />
                            <Input
                                type="number"
                                label="Allowances"
                                value={allowances}
                                onChange={(e) => setAllowances(e.target.value)}
                                error={showErrors && !allowances ? "Required" : ""}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                            <Input
                                type="date"
                                label="Effective From"
                                value={effectiveFrom}
                                onChange={(e) => setEffectiveFrom(e.target.value)}
                                error={showErrors && !effectiveFrom ? "Required" : ""}
                            />
                            <div className="flex items-center mt-6">
                                <ToggleSwitch
                                    label="Active"
                                    checked={active}
                                    onChange={setActive}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button variant="cancel" onClick={closeReviseModal}>
                                Cancel
                            </Button>
                            <Button variant="success">
                                Save Revision
                            </Button>
                        </div>
                    </Modal>
                )}

                <ReasonModal
                    isOpen={isReasonOpen}
                    title="Deactivate Compensation"
                    onClose={closeReasonModal}
                    variant="danger"
                    submitLabel="Deactivate"
                    reasonTitle="Provide reason for compensation change."
                />

            </div>
        </Layout>
    );
}