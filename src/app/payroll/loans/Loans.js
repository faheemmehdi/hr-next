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

export default function AllLoans() {
    const [employee, setEmployee] = useState("");
    const [status, setStatus] = useState("");
    const [search, setSearch] = useState("");
    const [principal, setPrincipal] = useState("");
    const [emi, setEmi] = useState("");
    const [startDate, setStartDate] = useState("");
    const [balance, setBalance] = useState("");
    const [desc, setDesc] = useState("");
    const [active, setActive] = useState(true);
    const [showErrors, setShowErrors] = useState(false);

    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isAddLoanOpen, setIsAddLoanOpen] = useState(false);
    const [isPrecloseOpen, setIsPrecloseOpen] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState(null);
    const [isReasonOpen, setIsReasonOpen] = useState(false);

    const loansData = [
        { employee: "Ahmad Khan", principal: 5000, emi: 1000, start: "2026-01-01", balance: 3000, statusId: 1, status: "Active", description: "Travel advance" },
        { employee: "Sara Ali", principal: 8000, emi: 2000, start: "2026-02-01", balance: 4000, statusId: 1, status: "Active", description: "Training loan" },
        { employee: "Bilal Ahmed", principal: 3000, emi: 1000, start: "2025-12-15", balance: 0, statusId: 2, status: "Closed", description: "Office supplies loan" },
        { employee: "Ayesha Khan", principal: 10000, emi: 2500, start: "2026-01-15", balance: 7500, statusId: 1, status: "Active", description: "Equipment loan" },
    ];

    const employees = mapSelectOptions(
        [...new Set(loansData.map(l => l.employee))].map((e, idx) => ({ id: idx, name: e })),
        "id",
        "name"
    );

    const statuses = mapSelectOptions(
        [...new Set(loansData.map(l => l.status))].map((s, idx) => ({ id: idx, name: s })),
        "id",
        "name"
    );

    const handleOpenView = (loan) => { setSelectedLoan(loan); setIsViewOpen(true); };
    const handleCloseView = () => setIsViewOpen(false);
    const openAddLoanModal = () => setIsAddLoanOpen(true);
    const closeAddLoanModal = () => setIsAddLoanOpen(false);
    const openPrecloseModal = (loan) => { setSelectedLoan(loan); setIsPrecloseOpen(true); };
    const closePrecloseModal = () => setIsPrecloseOpen(false);
    const openReasonModal = () => setIsReasonOpen(true);
    const closeReasonModal = () => setIsReasonOpen(false);

    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-base font-semibold text-gray-700">Loans & Advances</h2>
                    <Button type="button" onClick={openAddLoanModal} variant="success">Add Loan</Button>
                </div>

                {/* Filters */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5 gap-2">
                    <div className="w-full md:w-1/5">
                        <SearchBar placeholder="Search by employee..." value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <div className="w-full flex items-center justify-end flex-col md:flex-row mt-2 md:mt-0 gap-2">
                        <div className="w-full md:w-[9rem]">
                            <CustomSelect name="employee" value={employee} placeholder="Employee" onChange={setEmployee} options={employees} controlHeight="2rem" />
                        </div>
                        <div className="w-full md:w-[9rem]">
                            <CustomSelect name="status" value={status} placeholder="Status" onChange={setStatus} options={statuses} controlHeight="2rem" />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto shadow-md border border-gray-200 rounded max-h-[72vh]">
                    <table className="w-full text-xs border-collapse">
                        <thead className="bg-gray-100 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 text-left">Employee</th>
                                <th className="px-4 py-3 text-left">Principal</th>
                                <th className="px-4 py-3 text-left">EMI</th>
                                <th className="px-4 py-3 text-left">Start Date</th>
                                <th className="px-4 py-3 text-left">Balance</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {loansData.length ? loansData.map((loan, idx) => (
                                <tr key={idx} className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}>
                                    <td className="px-4 py-3 truncate max-w-[120px]" title={loan.employee}>{loan.employee}</td>
                                    <td className="px-4 py-3">{loan.principal.toLocaleString()}</td>
                                    <td className="px-4 py-3">{loan.emi.toLocaleString()}</td>
                                    <td className="px-4 py-3">{loan.start}</td>
                                    <td className="px-4 py-3">{loan.balance.toLocaleString()}</td>
                                    <td className="px-4 py-3"><StatusDesign statusId={loan.statusId} label={loan.status} /></td>
                                    <RowActions row={loan} actions={[
                                        { label: "View Loan", icon: MdOutlineRemoveRedEye, onClick: () => handleOpenView(loan) },
                                        { label: "Preclose Loan", icon: MdOutlineBlock, color: "red", onClick: () => openPrecloseModal(loan) }
                                    ]}/>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={7} className="text-center py-4 text-gray-500 italic">No loans found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* View Loan Modal */}
                {isViewOpen && selectedLoan && (
                    <Modal width="w-full md:w-5/12">
                        <div className="border-b border-gray-400 pb-3 mb-4">
                            <div className="flex justify-between">
                                <h2 className="text-lg font-semibold text-gray-800">Loan Details</h2>
                                <span className="inline-flex items-center px-2 py-1 text-xxs font-medium rounded-full bg-green-100 text-green-700">{selectedLoan.status}</span>
                            </div>
                            <p className="text-xxs text-gray-500">Started on {selectedLoan.start}</p>
                        </div>
                        <p><strong>Employee:</strong> {selectedLoan.employee}</p>
                        <p><strong>Principal:</strong> {selectedLoan.principal.toLocaleString()}</p>
                        <p><strong>EMI:</strong> {selectedLoan.emi.toLocaleString()}</p>
                        <p><strong>Balance:</strong> {selectedLoan.balance.toLocaleString()}</p>
                        <p><strong>Description:</strong> {selectedLoan.description}</p>
                        <div className="flex justify-end pt-4">
                            <Button variant="cancel" onClick={handleCloseView}>Close</Button>
                        </div>
                    </Modal>
                )}

                {/* Add Loan Modal */}
                {isAddLoanOpen && (
                    <Modal width="w-full md:w-6/12">
                        <h3 className="text-lg text-center font-semibold mb-4">Add Loan</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                            <CustomSelect name="employee" label="Employee" value={employee} placeholder="Select Employee" onChange={setEmployee} options={employees} controlHeight="2rem" error={showErrors && !employee ? "Employee is required" : ""} />
                            <Input type="number" label="Principal" value={principal} onChange={e => setPrincipal(e.target.value)} error={showErrors && !principal ? "Principal is required" : ""} />
                            <Input type="number" label="EMI" value={emi} onChange={e => setEmi(e.target.value)} error={showErrors && !emi ? "EMI is required" : ""} />
                            <Input type="date" label="Start Date" value={startDate} onChange={e => setStartDate(e.target.value)} error={showErrors && !startDate ? "Start Date is required" : ""} />
                            <div className="flex items-center">
                                <ToggleSwitch label="Active Status" checked={active} onChange={setActive} />
                            </div>
                        </div>
                        <div className="w-full mb-3">
                            <label className="block text-xxs text-gray-700 mb-2">Description</label>
                            <RichTextEditor value={desc} onChange={setDesc} />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="cancel" onClick={closeAddLoanModal}>Cancel</Button>
                            <Button variant="success">Add Loan</Button>
                        </div>
                    </Modal>
                )}

                {/* Preclose / Reason Modal */}
                <ReasonModal
                    isOpen={isPrecloseOpen}
                    title="Preclose Loan"
                    infoSection={
                        <div className="border-gray-300 border-b py-1 mb-2">
                            <p className="text-xs text-gray-800 font-medium">{selectedLoan?.employee}</p>
                            <p className="text-xxs text-gray-600"><span>Balance:</span> {selectedLoan?.balance}</p>
                            <p className="text-xxs text-gray-600"><span>Principal:</span> {selectedLoan?.principal}</p>
                        </div>
                    }
                    onClose={closePrecloseModal}
                    variant="danger"
                    submitLabel="Preclose"
                    reasonTitle="Provide a reason for preclosing this loan."
                />

            </div>
        </Layout>
    );
}