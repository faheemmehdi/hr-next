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
import { LuCalculator } from "react-icons/lu";
import { FiDollarSign } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Button from "y@/app/components/Button";
import StatusDesign from "y@/app/components/StatusColors";
import { MdOutlineBlock, MdDelete } from "react-icons/md";
import ToggleSwitch from "y@/app/components/ToggleSwitch";
import ReasonModal from "y@/app/components/ReasonConfirmModal";
import RowActions from "y@/app/components/RowActions";
import Modal from "y@/app/components/ModalShell";
import RichTextEditor from "y@/app/components/RichTextEditor";
export default function Tax() {
    const createEmptySlab = () => ({
        id: Date.now() + Math.random(),
        from: "",
        to: "",
        rate: "",
        fixedAmount: "",
    });

    const [search, setSearch] = useState("");
    const [countryFilter, setCountryFilter] = useState("");
    const [regionFilter, setRegionFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [date, setDate] = useState("");
    const [taxName, setTaxName] = useState("");
    const [type, setType] = useState("");
    const [country, setCountry] = useState("");
    const [region, setRegion] = useState("");
    const [effectiveFrom, setEffectiveFrom] = useState("");
    const [rate, setRate] = useState("");
    const [amount, setAmount] = useState("");
    const [percentage, setPercentage] = useState("");
    const [slabs, setSlabs] = useState(() => [createEmptySlab()]);
    const [slabErrors, setSlabErrors] = useState({});
    const [selectTax, setSelectTax] = useState({});
    const [desc, setDesc] = useState("");
    const [reason, setReason] = useState("");
    const runSlabValidation = (slabRows) => {
        const errors = {};
        let prevTo = null;
        const parseNumber = (value) => {
            if (value === "" || value == null) return null;
            const num = Number(value);
            return Number.isNaN(num) ? null : num;
        };

        slabRows.forEach((slab, index) => {
            const rowErrors = {};
            const fromValue = parseNumber(slab.from);
            const toValue = parseNumber(slab.to);
            const isLastRow = index === slabRows.length - 1;
            const hasValues = slab.from !== "" || slab.to !== "";

            if (!isLastRow || hasValues) {
                if (slab.from === "") {
                    rowErrors.from = "From Amount is required";
                }
                if (!isLastRow && slab.to === "") {
                    rowErrors.to = "To Amount is required";
                }
                if (fromValue !== null && toValue !== null && fromValue > toValue) {
                    rowErrors.to = "To Amount must be greater than From Amount";
                }
                if (prevTo !== null) {
                    const expectedFrom = prevTo + 1;
                    if (fromValue === null) {
                        rowErrors.from = `Start should be ${expectedFrom}`;
                    } else if (fromValue !== expectedFrom) {
                        rowErrors.from = `Start should be ${expectedFrom}`;
                    }
                }
            }

            if (Object.keys(rowErrors).length) {
                errors[slab.id] = rowErrors;
            }

            if (toValue !== null) {
                prevTo = toValue;
            }
        });

        setSlabErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const [isOpen, setIsOpen] = useState(false);
    const [isReasonOpen, setIsReasonOpen] = useState(false);
    const [isAddTaxOpen, setAddBonusOpen] = useState(false);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [previewTax, setPreviewTax] = useState(null);
    const [previewAmount, setPreviewAmount] = useState("");
    const [previewResult, setPreviewResult] = useState("");
    const [active, setActive] = useState(true);
    const [showErrors, setShowErrors] = useState(false);
    const [isAssignTaxOpen, setIsAssignTaxOpen] = useState(false);
    const [assignTo, setAssignTo] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState([]);

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const openReasonModal = () => setIsReasonOpen(true);
    const closeReasonModal = () => setIsReasonOpen(false);
    const openAddTaxModal = () => setAddBonusOpen(true);
    const closeAddDeptModal = () => setAddBonusOpen(false);
    const openPreviewModal = (tax) => {
        setPreviewTax(tax);
        setPreviewAmount("");
        setPreviewResult("");
        setIsPreviewModalOpen(true);
    };
    const closePreviewModal = () => setIsPreviewModalOpen(false);
    const handlePreviewCalculation = () => {
        if (!previewAmount) {
            setPreviewResult("Enter amount to preview.");
            return;
        }
        setPreviewResult(
            `Previewing tax for ${previewTax?.taxName ?? "selected tax"} on ${previewAmount}`
        );
    };
    const openAssignTaxModal = () => setIsAssignTaxOpen(true);
    const closeAssignTaxModal = () => setIsAssignTaxOpen(false);
    const handleTypeChange = (value) => {
        const resetSlabs = [createEmptySlab()];
        setType(value);
        setRate("");
        setAmount("");
        setPercentage("");
        setSlabs(resetSlabs);
        runSlabValidation(resetSlabs);
    };

    const addSlab = () =>
        setSlabs((prev) => {
            const next = [...prev, createEmptySlab()];
            runSlabValidation(next);
            return next;
        });
    const updateSlab = (id, field, value) =>
        setSlabs((prev) => {
            const next = prev.map((slab) =>
                slab.id === id ? { ...slab, [field]: value } : slab
            );
            runSlabValidation(next);
            return next;
        });
    const removeSlab = (id) =>
        setSlabs((prev) => {
            const next = prev.filter((slab) => slab.id !== id);
            runSlabValidation(next);
            return next;
        });

    const taxListData = [
        {
            id: "TAX001",
            taxName: "Income Tax",
            type: "Slab",
            country: "USA",
            region: "California",
            slabSummary: "0-50k:0%, 50k-100k:10%, 100k+:20%",
            effectiveFrom: "2025-01-01",
            statusId: 1,
            status: "Active",
        },
        {
            id: "TAX002",
            taxName: "Sales Tax",
            type: "Flat Rate",
            country: "USA",
            region: "Texas",
            slabSummary: "8.25% Flat",
            effectiveFrom: "2024-07-01",
            statusId: 1,
            status: "Active",
        },
        {
            id: "TAX003",
            taxName: "Value Added Tax (VAT)",
            type: "Flat Rate",
            country: "UK",
            region: "-",
            slabSummary: "20% Flat",
            effectiveFrom: "2023-04-01",
            statusId: 1,
            status: "Active",
        },
        {
            id: "TAX004",
            taxName: "Corporate Tax",
            type: "Slab",
            country: "Canada",
            region: "Ontario",
            slabSummary: "0-500k:12%, 500k+:15%",
            effectiveFrom: "2025-01-01",
            statusId: 1,
            status: "Active",
        },
        {
            id: "TAX005",
            taxName: "Service Tax",
            type: "Flat Rate",
            country: "India",
            region: "All",
            slabSummary: "18% Flat",
            effectiveFrom: "2024-06-01",
            statusId: 2,
            status: "Inactive",
        },
        {
            id: "TAX006",
            taxName: "Luxury Tax",
            type: "Slab",
            country: "Australia",
            region: "New South Wales",
            slabSummary: "0-100k:5%, 100k-250k:10%, 250k+:15%",
            effectiveFrom: "2024-12-01",
            statusId: 1,
            status: "Active",
        },
        {
            id: "TAX007",
            taxName: "Capital Gains Tax",
            type: "Slab",
            country: "UK",
            region: "-",
            slabSummary: "0-12.5k:0%, 12.5k-50k:10%, 50k+:20%",
            effectiveFrom: "2023-04-01",
            statusId: 1,
            status: "Active",
        },
        {
            id: "TAX008",
            taxName: "Property Tax",
            type: "Flat Rate",
            country: "USA",
            region: "New York",
            slabSummary: "1.2% Flat",
            effectiveFrom: "2024-01-01",
            statusId: 1,
            status: "Active",
        },
    ];


    const countries = mapSelectOptions(
        [
            { id: 1, name: "Pakistan" },
            { id: 2, name: "United States" },
            { id: 3, name: "United Kingdom" },
            { id: 4, name: "Canada" },
            { id: 5, name: "Australia" },
        ],
        "id",
        "name"
    );

    const regions = mapSelectOptions(
        [
            { id: 1, name: "Punjab" },
            { id: 2, name: "Sindh" },
            { id: 3, name: "Balochistan" },
            { id: 4, name: "Khyber Pakhtunkhwa" },
            { id: 5, name: "California" },
            { id: 6, name: "Texas" },
            { id: 7, name: "New York" },
            { id: 8, name: "London" },
            { id: 9, name: "Victoria" },
        ],
        "id",
        "name"
    );
    const taxes = mapSelectOptions(
        [
            { id: 1, name: "Income Tax" },
            { id: 2, name: "Sales Tax" },
            { id: 3, name: "Value Added Tax (VAT)" },
            { id: 4, name: "Corporate Tax" },
            { id: 5, name: "Service Tax" },
            { id: 6, name: "Capital Gains Tax" },
            { id: 7, name: "Excise Duty" },
            { id: 8, name: "Payroll Tax" },
            { id: 9, name: "Property Tax" },
        ],
        "id",
        "name"
    );
    const assignToOptions = mapSelectOptions(
        [
            { id: 1, code: "employee", name: "Employee" },
            { id: 2, code: "shift", name: "Shift" },
            { id: 3, code: "department", name: "Department" },
            { id: 4, code: "location", name: "Location" },
            { id: 5, code: "country", name: "Country" },
            { id: 6, code: "region", name: "Region" },
            { id: 7, code: "job_role", name: "Job Role" },
            { id: 8, code: "team", name: "Team" },
            { id: 9, code: "payroll_group", name: "Payroll Group" },
        ],
        "code",
        "name"
    );

    const taxTypes = mapSelectOptions(
        [
            { id: "flat_rate", name: "Flat Rate" },
            { id: "slab_based", name: "Slab Based" },
            { id: "fixed_amount", name: "Fixed Amount" },
            { id: "percentage", name: "Percentage" },
        ],
        "id",
        "name"
    );

    const selectedAssignTo = assignToOptions.find(
        (option) => option.value === assignTo
    );

    const labelText = selectedAssignTo ? selectedAssignTo.label : "Assign To";
    const placeholderText = selectedAssignTo
        ? `Select ${selectedAssignTo.label}`
        : "Select option";



    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold text-gray-700">
                        Taxes
                    </h2>
                    <div className="flex items-center gap-2">
                        <Button type="button" onClick={openAssignTaxModal} variant="cancel">
                            Assign Tax
                        </Button>
                        <Button type="button" onClick={openAddTaxModal} variant="success">
                            Add Tax
                        </Button>
                    </div>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5">
                    <div className="w-full md:w-1/5 flex items-center mb-1">
                        <SearchBar
                            placeholder="Search by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="w-full flex items-center justify-end flex-col md:flex-row mt-2 md:mt-0 gap-2">

                        <div className="mb-1 w-full md:w-[9rem]">
                            <CustomSelect
                                name="countryFilter"
                                value={countryFilter}
                                placeholder="Country"
                                onChange={setCountryFilter}
                                options={countries}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="mb-1 w-full md:w-[9rem]">
                            <CustomSelect
                                name="regionFilter"
                                value={regionFilter}
                                placeholder="Region"
                                onChange={setRegionFilter}
                                options={regions}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="mb-1 w-full md:w-[9rem]">
                            <CustomSelect
                                name="typeFilter"
                                value={typeFilter}
                                placeholder="Type"
                                onChange={setTypeFilter}
                                options={taxTypes}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="w-full md:w-[9rem]">
                            <Input
                                type="date"
                                name="date"
                                noMargin={true}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>
                </div>


                <div className="overflow-x-auto shadow-md border border-gray-200 rounded max-h-[72vh]">
                    <table className="w-full text-xs border-collapse">
                        <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="px-4 py-3 text-left">Tax ID</th>
                                <th className="px-4 py-3 text-left">Tax Name</th>
                                <th className="px-4 py-3 text-left">Type</th>
                                <th className="px-4 py-3 text-left">Country</th>
                                <th className="px-4 py-3 text-left">Region</th>
                                <th className="px-4 py-3 text-left">Slab Summary</th>
                                <th className="px-4 py-3 text-left">Effective From</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {taxListData && taxListData.length > 0 ? (
                                taxListData.map((row, idx) => (
                                    <tr
                                        key={idx}
                                        className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors`}
                                    >
                                        <td className="px-4 py-3">{row.id ?? ''}</td>
                                        <td className="px-4 py-3 truncate max-w-[120px]" title={row.taxName ?? ''}>{row.taxName ?? ''}</td>
                                        <td className="px-4 py-3">{row.type ?? ''}</td>
                                        <td className="px-4 py-3">{row.country ?? ''}</td>
                                        <td className="px-4 py-3">{row.region ?? ''}</td>
                                        <td className="px-4 py-3 text-wrap max-w-[10rem]">{row.slabSummary ?? ''}</td>
                                        <td className="px-4 py-3">{row.effectiveFrom ?? ''}</td>
                                        <td className="px-4 py-3">
                                            <StatusDesign statusId={row.statusId} label={row.status} />
                                        </td>
                                        <RowActions
                                            row={row}
                                            actions={[
                                                { label: "View Tax", icon: MdOutlineRemoveRedEye, onClick: handleOpenModal },
                                                { label: "Edit Tax", icon: FiEdit3 },
                                                {
                                                    label: "Preview Tax Calculation",
                                                    icon: LuCalculator,
                                                    onClick: () => openPreviewModal(row),
                                                },
                                                { label: "Deactivate Tax", icon: MdOutlineBlock, color: "red", onClick: openReasonModal },
                                            ]}
                                        />
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={10} className="text-center py-4 text-gray-500 italic">
                                        No tax found.
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
                                <h2 className="text-lg font-semibold text-gray-800">Tax Details</h2>
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


                {isAddTaxOpen && (
                    <Modal width="w-full md:w-6/12">
                        <h3 className="text-lg text-center font-semibold mb-4">Add Tax</h3>
                        <div className="w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

                                <Input
                                    type="text"
                                    name="taxName"
                                    placeholder="Enter tax name"
                                    label="Tax Name"
                                    noMargin={true}
                                    value={taxName}
                                    onChange={(e) => setTaxName(e.target.value)}
                                    error={showErrors && !deptName ? "Tax Name is required" : ""}
                                />
                                <div className="flex w-full gap-4">

                                    <div className="w-1/2">
                                        <CustomSelect
                                            name="country"
                                            label="Country"
                                            value={country}
                                            placeholder="Select Country"
                                            onChange={setCountry}
                                            options={countries}
                                            controlHeight="2rem"
                                            error={showErrors && !deptHead ? "Country is required" : ""}
                                        />
                                    </div>

                                    <div className="flex items-center w-2/5 md:mt-4">
                                        <ToggleSwitch
                                            label="Active Status"
                                            checked={active}
                                            onChange={setActive}
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">

                                <CustomSelect
                                    name="region"
                                    label="Region"
                                    value={region}
                                    placeholder="Select Region"
                                    onChange={setRegion}
                                    options={regions}
                                    controlHeight="2rem"
                                    error={showErrors && !deptHead ? "Region is required" : ""}
                                />
                                <Input
                                    type="date"
                                    label="Effective From"
                                    name="effectiveFrom"
                                    noMargin={true}
                                    value={effectiveFrom}
                                    onChange={(e) => setEffectiveFrom(e.target.value)}
                                />

                                <CustomSelect
                                    name="type"
                                    label="Tax Type"
                                    value={type}
                                    placeholder="Select Type"
                                    onChange={handleTypeChange}
                                    options={taxTypes}
                                    controlHeight="2rem"
                                    error={showErrors && !type ? "Tax Type is required" : ""}
                                />

                            </div>

                            <div className="space-y-4 mb-4">
                                {type === "flat_rate" && (
                                    <div className="w-full md:w-1/3">
                                        <Input
                                            type="number"
                                            label="Flat Rate"
                                            placeholder="Enter rate"
                                            noMargin={true}
                                            value={rate}
                                            onChange={(e) => setRate(e.target.value)}
                                        />
                                    </div>
                                )}
                                {type === "slab_based" && (
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between border-b border-gray-300 pb-1">
                                            <p className="text-xxs font-semibold text-gray-600">
                                                Slab configuration
                                            </p>
                                            <button
                                                type="button"
                                                className="text-xxs text-indigo-600 font-medium hover:text-indigo-700 cursor-pointer"
                                                onClick={addSlab}
                                            >
                                                + Add slab
                                            </button>
                                        </div>
                                        <div className="space-y-2">
                                            {slabs.map((slab, index) => {
                                                const isLastRow = index === slabs.length - 1;

                                                return (
                                                    <div key={slab.id} className="flex flex-col md:flex-row gap-3">

                                                        {/* Inputs */}
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 flex-1">

                                                            {/* FROM */}
                                                            <Input
                                                                type="number"
                                                                label="From Amount"
                                                                placeholder="0"
                                                                noMargin
                                                                value={slab.from}
                                                                onChange={(e) =>
                                                                    updateSlab(slab.id, "from", e.target.value)
                                                                }
                                                                error={slabErrors[slab.id]?.from}
                                                            />

                                                            {/* TO */}
                                                            <Input
                                                                type="number"
                                                                label="To Amount"
                                                                placeholder={isLastRow ? "No upper limit" : "0"}
                                                                noMargin
                                                                value={slab.to}
                                                                disabled={isLastRow}
                                                                onChange={(e) =>
                                                                    updateSlab(slab.id, "to", e.target.value)
                                                                }
                                                                error={!isLastRow ? slabErrors[slab.id]?.to : null}
                                                            />

                                                            {/* RATE */}
                                                            <Input
                                                                type="number"
                                                                label="Rate (%)"
                                                                placeholder="Rate"
                                                                noMargin
                                                                value={slab.rate}
                                                                onChange={(e) =>
                                                                    updateSlab(slab.id, "rate", e.target.value)
                                                                }
                                                            />

                                                            {/* FIXED */}
                                                            <Input
                                                                type="number"
                                                                label="Fixed Amount"
                                                                placeholder="0"
                                                                noMargin
                                                                value={slab.fixedAmount}
                                                                onChange={(e) =>
                                                                    updateSlab(slab.id, "fixedAmount", e.target.value)
                                                                }
                                                            />
                                                        </div>

                                                        {/* DELETE */}
                                                        <button
                                                            type="button"
                                                            onClick={() => removeSlab(slab.id)}
                                                            disabled={slabs.length === 1}
                                                            className="md:mt-4 text-red-500 hover:text-red-600 cursor-pointer"
                                                        >
                                                            <MdDelete />
                                                        </button>
                                                    </div>
                                                );
                                            })}

                                        </div>
                                    </div>
                                )}
                                {type === "fixed_amount" && (
                                    <div className="w-full md:w-1/3">
                                        <Input
                                            type="number"
                                            label="Amount"
                                            placeholder="Enter amount"
                                            noMargin={true}
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                        />
                                    </div>
                                )}
                                {type === "percentage" && (
                                    <div className="w-full md:w-1/3">
                                        <Input
                                            type="number"
                                            label="Percentage"
                                            placeholder="Enter percentage"
                                            noMargin={true}
                                            value={percentage}
                                            onChange={(e) => setPercentage(e.target.value)}
                                        />
                                    </div>
                                )}
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
                                Add Tax
                            </Button>
                        </div>

                    </Modal>
                )}

                {isPreviewModalOpen && (
                    <Modal width="w-full md:w-1/3">
                        <h3 className="text-lg text-center font-semibold mb-4">
                            Preview Tax Calculation
                        </h3>
                        <div className="space-y-4 mb-4">
                            <Input
                                type="text"
                                label="Tax Name"
                                value={previewTax?.taxName ?? ""}
                                noMargin={true}
                                placeholder="Select a tax first"
                                disabled
                                bg="bg-gray-200"
                            />
                            <Input
                                type="number"
                                label="Amount"
                                placeholder="Enter amount"
                                noMargin={true}
                                value={previewAmount}
                                onChange={(e) => setPreviewAmount(e.target.value)}
                            />

                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="cancel" onClick={closePreviewModal}>
                                Cancel
                            </Button>
                            <Button variant="success" onClick={handlePreviewCalculation}>
                                Calculate
                            </Button>
                        </div>
                    </Modal>
                )}

                {isAssignTaxOpen && (
                    <Modal width="w-full md:w-6/12">
                        <h3 className="text-lg text-center font-semibold mb-4">Assign Tax</h3>
                        <div className="w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                <CustomSelect
                                    name="selectTax"
                                    label="Tax Name"
                                    value={selectTax}
                                    placeholder="Select Tax"
                                    onChange={setSelectTax}
                                    options={taxes}
                                    controlHeight="2rem"
                                />

                                <CustomSelect
                                    name="assignTo"
                                    label="Assign To"
                                    value={assignTo}
                                    placeholder="Select Option"
                                    onChange={setAssignTo}
                                    options={assignToOptions}
                                    controlHeight="2rem"
                                />
                            </div>
                            <div className="flex w-full mb-5">
                                <div className="md:min-w-[49%]">
                                    <CustomSelect
                                        name="selectedGroup"
                                        label={labelText}
                                        placeholder={placeholderText}
                                        value={selectedGroup}
                                        onChange={setSelectedGroup}
                                        isMulti
                                        options={taxes}
                                        controlHeight="2rem"
                                    />
                                </div>
                            </div>
                            <div className="w-full mb-3">
                                <label
                                    htmlFor=""
                                    className="block text-xxs text-gray-700 mb-2"
                                >
                                    Description
                                </label>
                                <RichTextEditor value={desc} onChange={setDesc} />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="cancel" onClick={closeAssignTaxModal}>
                                Cancel
                            </Button>
                            <Button variant="success">
                                Assign Tax
                            </Button>
                        </div>

                    </Modal>
                )}


                <ReasonModal
                    isOpen={isReasonOpen}
                    title="Deactivate Tax"
                    infoSection={
                        <div className="border-gray-300 border-b py-1 mb-2">
                            <p className="text-xs text-gray-800 font-medium">
                                <span className="font-semibold">Income Tax</span>
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Country:</span> Pakistan
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Region:</span> Punjab
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Effective From:</span> 2026-01-21
                            </p>
                        </div>}
                    onClose={closeReasonModal}
                    desc={reason}
                    setDesc={setReason}
                    // onSubmit={handleReject}
                    variant="danger"
                    submitLabel="Deactivate"
                    reasonTitle="Please provide a reason to deactivate this tax."
                />


            </div>
        </Layout>
    );
}
