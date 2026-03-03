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

export default function BankIntegration() {

    const [search, setSearch] = useState("");
    const [providerFilter, setProviderFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isReasonOpen, setIsReasonOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [active, setActive] = useState(true);

    const [providerName, setProviderName] = useState("");
    const [fileFormat, setFileFormat] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [routingCode, setRoutingCode] = useState("");

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const openReasonModal = () => setIsReasonOpen(true);
    const closeReasonModal = () => setIsReasonOpen(false);
    const openAddModal = () => setIsAddOpen(true);
    const closeAddModal = () => setIsAddOpen(false);

    // Dummy Data
    const banksData = [
        {
            provider: "Habib Bank",
            format: "CSV",
            statusId: 1,
            status: "Connected",
            lastUsed: "01 Feb 2026",
        },
        {
            provider: "Meezan Bank",
            format: "XML",
            statusId: 2,
            status: "Disconnected",
            lastUsed: "15 Jan 2026",
        },
        {
            provider: "Standard Chartered",
            format: "ACH",
            statusId: 1,
            status: "Connected",
            lastUsed: "20 Jan 2026",
        },
    ];

    const providers = mapSelectOptions(
        [
            { id: 1, name: "Habib Bank" },
            { id: 2, name: "Meezan Bank" },
            { id: 3, name: "Standard Chartered" },
        ],
        "id",
        "name"
    );

    const statuses = mapSelectOptions(
        [
            { id: 1, name: "Connected" },
            { id: 2, name: "Disconnected" }
        ],
        "id",
        "name"
    );

    const formats = mapSelectOptions(
        [
            { id: 1, name: "CSV" },
            { id: 2, name: "XML" },
            { id: 3, name: "ACH" },
            { id: 4, name: "TXT" }
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
                        Bank Integrations
                    </h2>
                    <Button onClick={openAddModal} variant="success">
                        Connect Bank
                    </Button>
                </div>

                {/* Filters */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5">
                    <div className="w-full md:w-1/5 mb-1">
                        <SearchBar
                            placeholder="Search by provider..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <CustomSelect
                            name="provider"
                            value={providerFilter}
                            placeholder="Provider"
                            onChange={setProviderFilter}
                            options={providers}
                            controlHeight="2rem"
                        />
                        <CustomSelect
                            name="status"
                            value={statusFilter}
                            placeholder="Status"
                            onChange={setStatusFilter}
                            options={statuses}
                            controlHeight="2rem"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto shadow-md border border-gray-200 rounded max-h-[72vh]">
                    <table className="w-full text-xs border-collapse">
                        <thead className="bg-gray-100 sticky top-0">
                            <tr>
                                <th className="px-4 py-3 text-left">Bank / Provider</th>
                                <th className="px-4 py-3 text-left">File Format</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Last Used</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {banksData.map((row, idx) => (
                                <tr key={idx} className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}>
                                    <td className="px-4 py-3">{row.provider}</td>
                                    <td className="px-4 py-3">{row.format}</td>
                                    <td className="px-4 py-3">
                                        <StatusDesign statusId={row.statusId} label={row.status} />
                                    </td>
                                    <td className="px-4 py-3">{row.lastUsed}</td>
                                    <RowActions
                                        row={row}
                                        actions={[
                                            { label: "View Details", icon: MdOutlineRemoveRedEye, onClick: handleOpenModal },
                                            { label: "Download Sample", icon: FiEdit3 },
                                            { label: "Disconnect", icon: MdOutlineBlock, color: "red", onClick: openReasonModal },
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
                            <div className="flex justify-between">
                                <h2 className="text-lg font-semibold">Bank Details</h2>
                                <span className="px-2 py-1 text-xxs bg-green-100 text-green-700 rounded">
                                    Connected
                                </span>
                            </div>
                            <p className="text-xxs text-gray-500">Last Used: 01 Feb 2026</p>
                        </div>
                        <div className="flex justify-end">
                            <Button variant="cancel" onClick={handleCloseModal}>Close</Button>
                        </div>
                    </Modal>
                )}

                {/* Add Bank Modal */}
                {isAddOpen && (
                    <Modal width="w-full md:w-6/12">
                        <h3 className="text-lg text-center font-semibold mb-4">Connect Bank</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                            <Input
                                label="Provider Name"
                                value={providerName}
                                onChange={(e) => setProviderName(e.target.value)}
                                placeholder="Enter bank/provider name"
                            />


                            <CustomSelect
                                name="selectedGroup"
                                label="File Format"
                                placeholder="Select Format"
                                value={fileFormat}
                                onChange={setFileFormat}
                                isMulti
                                options={formats}
                                controlHeight="2rem"
                            />
                            <Input
                                label="Account Number / IBAN"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                placeholder="Enter account number"
                            />
                            <Input
                                label="Routing Code / Bank Code"
                                value={routingCode}
                                onChange={(e) => setRoutingCode(e.target.value)}
                                placeholder="Enter routing code"
                            />
                        </div>

                        <div className="flex items-center mb-4">
                            <ToggleSwitch
                                label="Active Status"
                                checked={active}
                                onChange={setActive}
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button variant="cancel" onClick={closeAddModal}>Cancel</Button>
                            <Button variant="success">Connect</Button>
                        </div>
                    </Modal>
                )}

                {/* Disconnect Modal */}
                <ReasonModal
                    isOpen={isReasonOpen}
                    title="Disconnect Bank"
                    variant="danger"
                    submitLabel="Disconnect"
                    reasonTitle="Please provide a reason to disconnect this bank."
                    onClose={closeReasonModal}
                />

            </div>
        </Layout>
    );
}