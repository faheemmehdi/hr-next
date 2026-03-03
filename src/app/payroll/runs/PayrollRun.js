"use client";
import Layout from "y@/app/components/Layout";
import Input from "y@/app/components/Input";
import { useState } from "react";
import SearchBar from "y@/app/components/SearchBar";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import CustomSelect from "y@/app/components/CustomSelect";
import {
    FiEdit3
} from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Button from "y@/app/components/Button";
import StatusDesign from "y@/app/components/StatusColors";
import RowActions from "y@/app/components/RowActions";
import Modal from "y@/app/components/ModalShell";
import ReasonModal from "y@/app/components/ReasonConfirmModal";

export default function PayrollRuns() {
    const [search, setSearch] = useState("");
    const [period, setPeriod] = useState("");
    const [status, setStatus] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isReasonOpen, setIsReasonOpen] = useState(false);

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const openReasonModal = () => setIsReasonOpen(true);
    const closeReasonModal = () => setIsReasonOpen(false);

    // Dummy payroll runs data
    const payrollRunsData = [
        {
            period: "Jan 01 - Jan 15, 2026",
            statusId: 1,
            status: "Completed",
            employees: 50,
            gross: 250000,
            net: 200000,
            variance: 0,
            unlocked: false
        },
        {
            period: "Jan 16 - Jan 31, 2026",
            statusId: 2,
            status: "Draft",
            employees: 48,
            gross: 240000,
            net: 192000,
            variance: 500,
            unlocked: true
        },
        {
            period: "Feb 01 - Feb 15, 2026",
            statusId: 3,
            status: "Locked",
            employees: 52,
            gross: 260000,
            net: 208000,
            variance: 0,
            unlocked: false
        },
    ];

    const statuses = mapSelectOptions(
        [
            { id: 1, name: "Completed" },
            { id: 2, name: "Draft" },
            { id: 3, name: "Locked" },
        ],
        "id",
        "name"
    );

    const periods = mapSelectOptions(
        [
            { id: 1, name: "Jan 01 - Jan 15, 2026" },
            { id: 2, name: "Jan 16 - Jan 31, 2026" },
            { id: 3, name: "Feb 01 - Feb 15, 2026" },
        ],
        "id",
        "name"
    );

    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold text-gray-700">
                        Payroll Runs
                    </h2>
                    <Button type="button" variant="success">
                        Start Run
                    </Button>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5">
                    {/* <div className="w-full md:w-1/5 flex items-center mb-1">
                        <SearchBar
                            placeholder="Search by period..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div> */}
                    <div className="w-full flex items-center justify-end flex-col md:flex-row mt-2 md:mt-0 gap-2">
                        <div className="mb-1 w-full md:w-[9rem]">
                            <CustomSelect
                                name="period"
                                value={period}
                                placeholder="Period"
                                onChange={setPeriod}
                                options={periods}
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
                                <th className="px-4 py-3 text-left">Period</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Employees</th>
                                <th className="px-4 py-3 text-left">Gross</th>
                                <th className="px-4 py-3 text-left">Net</th>
                                <th className="px-4 py-3 text-left">Variance</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {payrollRunsData && payrollRunsData.length > 0 ? (
                                payrollRunsData.map((row, idx) => (
                                    <tr
                                        key={idx}
                                        className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                            } hover:bg-gray-100 transition-colors`}
                                    >
                                        <td className="px-4 py-3">{row.period}</td>
                                        <td className="px-4 py-3">
                                            <StatusDesign statusId={row.statusId} label={row.status} />
                                        </td>
                                        <td className="px-4 py-3">{row.employees}</td>
                                        <td className="px-4 py-3">{row.gross.toLocaleString()}</td>
                                        <td className="px-4 py-3">{row.net.toLocaleString()}</td>
                                        <td className="px-4 py-3">
                                            {row.variance > 0 && (
                                                <span className="px-2 py-1 bg-red-100 text-red-700 text-xxs rounded">
                                                    {row.variance.toLocaleString()}
                                                </span>
                                            )}
                                        </td>
                                        <RowActions
                                            row={row}
                                            actions={[
                                                { label: "View Run", icon: MdOutlineRemoveRedEye, onClick: handleOpenModal },
                                                { label: "Delete Run", icon: FiEdit3, color: "red", onClick: row.unlocked ? openReasonModal : null },
                                            ]}
                                        />
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-center py-4 text-gray-500 italic">
                                        No payroll runs found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Payroll Run Details Modal */}
                {isOpen && (
                    <Modal width="w-full md:w-5/12">
                        <div className="border-b border-gray-400 pb-3 mb-4">
                            <div className="flex justify-between">
                                <h2 className="text-lg font-semibold text-gray-800">Payroll Run Details</h2>
                                <span className="inline-flex items-center px-2 py-1 text-xxs font-medium rounded-full bg-green-100 text-green-700">
                                    Completed
                                </span>
                            </div>
                            <p className="text-xxs text-gray-500">Processed at 01 Feb, 2026</p>
                        </div>
                        <div className="flex justify-end pt-4">
                            <Button variant="cancel" onClick={handleCloseModal}>
                                Close
                            </Button>
                        </div>
                    </Modal>
                )}

                {/* Reason Modal for deleting unlocked runs */}
                <ReasonModal
                    isOpen={isReasonOpen}
                    title="Delete Payroll Run"
                    infoSection={
                        <div className="border-gray-300 border-b py-1 mb-2">
                            <p className="text-xs text-gray-800 font-medium">
                                <span className="font-semibold">Payroll Run</span>
                            </p>
                            <p className="text-xxs text-gray-600">
                                Period: Jan 16 - Jan 31, 2026
                            </p>
                            <p className="text-xxs text-gray-600">
                                Employees: 48
                            </p>
                            <p className="text-xxs text-gray-600">
                                Gross: 240,000
                            </p>
                        </div>}
                    onClose={closeReasonModal}
                    variant="danger"
                    submitLabel="Delete"
                    reasonTitle="Please provide a reason to delete this payroll run."
                />

            </div>
        </Layout>
    );
}