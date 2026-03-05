"use client";
import Layout from "y@/app/components/Layout";
import Input from "y@/app/components/Input";
import { useState } from "react";
import SearchBar from "y@/app/components/SearchBar";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import CustomSelect from "y@/app/components/CustomSelect";
import { FiEdit3, FiPrinter, FiRotateCcw } from "react-icons/fi";
import { MdOutlineRemoveRedEye, MdOutlineBlock } from "react-icons/md";
import Button from "y@/app/components/Button";
import StatusDesign from "y@/app/components/StatusColors";
import ReasonModal from "y@/app/components/ReasonConfirmModal";
import RowActions from "y@/app/components/RowActions";
import Modal from "y@/app/components/ModalShell";

export default function AssetCatalog() {

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [condition, setCondition] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isReasonOpen, setIsReasonOpen] = useState(false);
    const [isReturnOpen, setIsReturnOpen] = useState(false);
    const [isAssignOpen, setIsAssignOpen] = useState(false);
    const [isQrOpen, setIsQrOpen] = useState(false);
    const [currentAsset, setCurrentAsset] = useState(null);
    const [assignAsset, setAssignAsset] = useState(null);
    const [assignToValue, setAssignToValue] = useState("");
    const [returnReason, setReturnReason] = useState("");
    const [qrAsset, setQrAsset] = useState(null);

    const [type, setType] = useState("");
    const [serial, setSerial] = useState("");
    const [assetCondition, setAssetCondition] = useState("");
    const [purchaseDate, setPurchaseDate] = useState("");
    const [assignTo, setAssignTo] = useState("");

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const openAddModal = () => setIsAddOpen(true);
    const closeAddModal = () => setIsAddOpen(false);
    const openReasonModal = (row) => {
        setCurrentAsset(row);
        setIsReasonOpen(true);
    };
    const closeReasonModal = () => {
        setCurrentAsset(null);
        setIsReasonOpen(false);
    };
    const openReturnModal = (row) => {
        setReturnReason("");
        setCurrentAsset(row);
        setIsReturnOpen(true);
    };
    const closeReturnModal = () => {
        setCurrentAsset(null);
        setIsReturnOpen(false);
    };
    const openAssignModal = (row) => {
        setAssignAsset(row);
        setAssignToValue(row.assignee === "—" ? "" : row.assignee);
        setIsAssignOpen(true);
    };
    const closeAssignModal = () => {
        setAssignAsset(null);
        setAssignToValue("");
        setIsAssignOpen(false);
    };
    const openQrModal = (row) => {
        setQrAsset(row);
        setIsQrOpen(true);
    };
    const closeQrModal = () => {
        setQrAsset(null);
        setIsQrOpen(false);
    };

    const assetsData = [
        {
            type: "Laptop",
            serial: "HP-ELITE-840-G5",
            condition: "Good",
            assignee: "Ahmad Khan",
            assignedOn: "2025-01-10",
            statusId: 1,
            status: "Assigned"
        },
        {
            type: "Mobile",
            serial: "IPHONE-14-2233",
            condition: "New",
            assignee: "—",
            assignedOn: "—",
            statusId: 3,
            status: "Available"
        },
        {
            type: "Monitor",
            serial: "DELL-27-8899",
            condition: "Damaged",
            assignee: "Sara Ali",
            assignedOn: "2024-12-01",
            statusId: 2,
            status: "Under Maintenance"
        },
        {
            type: "Desktop",
            serial: "DELL-INSP-3070",
            condition: "Good",
            assignee: "Ali Raza",
            assignedOn: "2025-02-05",
            statusId: 1,
            status: "Assigned"
        },
        {
            type: "Laptop",
            serial: "MACBOOK-PRO-2023",
            condition: "New",
            assignee: "Fatima Noor",
            assignedOn: "2025-03-01",
            statusId: 1,
            status: "Assigned"
        },
        {
            type: "Mobile",
            serial: "SAMSUNG-S22-1122",
            condition: "Fair",
            assignee: "—",
            assignedOn: "—",
            statusId: 3,
            status: "Available"
        },
        {
            type: "Monitor",
            serial: "LG-24MP88",
            condition: "Good",
            assignee: "Hassan Ali",
            assignedOn: "2025-01-20",
            statusId: 1,
            status: "Assigned"
        },
        {
            type: "Vehicle",
            serial: "HONDA-CIVIC-2020",
            condition: "Fair",
            assignee: "Management",
            assignedOn: "2024-11-15",
            statusId: 2,
            status: "Under Maintenance"
        },
      
    ];
    const types = mapSelectOptions(
        [
            { id: 1, name: "Laptop" },
            { id: 2, name: "Mobile" },
            { id: 3, name: "Monitor" },
            { id: 4, name: "Desktop" },
            { id: 5, name: "Vehicle" },
        ],
        "id",
        "name"
    );

    const conditions = mapSelectOptions(
        [
            { id: 1, name: "New" },
            { id: 2, name: "Good" },
            { id: 3, name: "Fair" },
            { id: 4, name: "Damaged" },
        ],
        "id",
        "name"
    );

    const statuses = mapSelectOptions(
        [
            { id: 1, name: "Available" },
            { id: 2, name: "Assigned" },
            { id: 3, name: "Under Maintenance" },
            { id: 4, name: "Lost" },
        ],
        "id",
        "name"
    );

    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">

                {/* Header */}
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <h2 className="text-base font-semibold text-gray-700">
                        Asset Catalog
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        <Button variant="primary" type="button">
                            Export
                        </Button>
                      
                        <Button onClick={openAddModal} variant="success">
                            Add Asset
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5">
                    <div className="w-full md:w-1/5">
                        <SearchBar
                            placeholder="Search by serial..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 mt-2 md:mt-0">
                        <div className="w-[9rem]">
                            <CustomSelect
                                name="condition"
                                value={condition}
                                placeholder="Condition"
                                onChange={setCondition}
                                options={conditions}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="w-[9rem]">
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
                                <th className="px-4 py-3 text-left">Type</th>
                                <th className="px-4 py-3 text-left">Serial</th>
                                <th className="px-4 py-3 text-left">Condition</th>
                                <th className="px-4 py-3 text-left">Assignee</th>
                                <th className="px-4 py-3 text-left">Assigned On</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assetsData.map((row, idx) => (
                                <tr key={idx} className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}>
                                    <td className="px-4 py-3">{row.type}</td>
                                    <td className="px-4 py-3">{row.serial}</td>
                                    <td className="px-4 py-3">{row.condition}</td>
                                    <td className="px-4 py-3">{row.assignee}</td>
                                    <td className="px-4 py-3">{row.assignedOn}</td>
                                    <td className="px-4 py-3">
                                        <StatusDesign statusId={row.statusId} label={row.status} />
                                    </td>

                            <RowActions
                                row={row}
                                actions={[
                                    { label: "View Asset", icon: MdOutlineRemoveRedEye, onClick: handleOpenModal },
                                    { label: "Assign Asset", icon: FiEdit3, onClick: openAssignModal },
                                    { label: "Return Asset", icon: FiRotateCcw, onClick: openReturnModal },
                                    { label: "Mark Lost", icon: MdOutlineBlock, color: "red", onClick: openReasonModal },
                                    { label: "Print QR", icon: FiPrinter, onClick: openQrModal },
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
                            <h2 className="text-lg font-semibold">Asset Details</h2>
                        </div>
                        <div className="flex justify-end">
                            <Button variant="cancel" onClick={handleCloseModal}>
                                Close
                            </Button>
                        </div>
                    </Modal>
                )}

                {/* Assign Asset Modal */}
                {isAssignOpen && (
                    <Modal width="w-full md:w-5/12">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            Assign Asset
                        </h3>
                        <p className="text-xxs text-gray-600 mb-3">
                            Assign {assignAsset?.type} ({assignAsset?.serial}) to a team member.
                        </p>
                        <Input
                            type="text"
                            label="Assign To"
                            value={assignToValue}
                            onChange={(e) => setAssignToValue(e.target.value)}
                        />
                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="cancel" onClick={closeAssignModal}>
                                Cancel
                            </Button>
                            <Button variant="success" onClick={closeAssignModal}>
                                Assign
                            </Button>
                        </div>
                    </Modal>
                )}

                {/* Return Asset Modal */}
                <ReasonModal
                    isOpen={isReturnOpen}
                    title="Return Asset"
                    desc={returnReason}
                    setDesc={setReturnReason}
                    infoSection={
                        currentAsset && (
                            <div className="text-xxs text-gray-600">
                                {currentAsset.type} {currentAsset.serial}
                            </div>
                        )
                    }
                    onClose={closeReturnModal}
                    onSubmit={closeReturnModal}
                    submitLabel="Return"
                    reasonTitle="Please provide context for returning the asset."
                />

                {/* QR Modal */}
                {isQrOpen && qrAsset && (
                    <Modal width="w-full md:w-5/12">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-semibold text-gray-800">QR Print</h3>
                            <span className="text-xxs text-gray-500">#{qrAsset.serial}</span>
                        </div>
                        <div className="h-40 w-40 mx-auto bg-gray-100 border flex items-center justify-center text-xxs text-gray-600">
                            QR CODE PREVIEW
                        </div>
                        <p className="text-xxs text-gray-500 mt-3">
                            Print this QR for {qrAsset.type} ({qrAsset.assignee || "unassigned"}).
                        </p>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="cancel" onClick={closeQrModal}>
                                Close
                            </Button>
                            <Button variant="success" onClick={closeQrModal}>
                                Print
                            </Button>
                        </div>
                    </Modal>
                )}

                {/* Add Asset Modal */}
                {isAddOpen && (
                    <Modal width="w-full md:w-6/12">
                        <h3 className="text-lg text-center font-semibold mb-4">
                            Add Asset
                        </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

                                <CustomSelect
                                    name="type"
                                    label="Asset Type"
                                    value={type}
                                    onChange={setType}
                                    options={types}
                                    placeholder="Select Type"
                                    controlHeight="2rem"
                                />
                                <Input
                                    type="text"
                                    label="Serial Number"
                                    value={serial}
                                    onChange={(e) => setSerial(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">


                                <CustomSelect
                                    name="condition"
                                    label="Condition"
                                    value={assetCondition}
                                    onChange={setAssetCondition}
                                    options={conditions}
                                    placeholder="Select Condition"
                                    controlHeight="2rem"
                                />
                                <Input
                                    type="date"
                                    label="Purchase Date"
                                    value={purchaseDate}
                                    onChange={(e) => setPurchaseDate(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                <Input
                                    type="text"
                                    label="Assign To"
                                    value={assignTo}
                                    onChange={(e) => setAssignTo(e.target.value)}
                                />
                            </div>

                        <div className="flex justify-end gap-2">
                            <Button variant="cancel" onClick={closeAddModal}>
                                Cancel
                            </Button>
                            <Button variant="success">
                                Save Asset
                            </Button>
                        </div>
                    </Modal>
                )}

                <ReasonModal
                    isOpen={isReasonOpen}
                    title="Mark Asset as Lost"
                    onClose={closeReasonModal}
                    variant="danger"
                    submitLabel="Confirm"
                    reasonTitle="Please provide a reason for marking this asset as lost."
                />
            </div>
        </Layout>
    );
}
