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
export default function Tax() {
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

    const [isOpen, setIsOpen] = useState(false);
    const [isReasonOpen, setIsReasonOpen] = useState(false);
    const [isAddTaxOpen, setAddBonusOpen] = useState(false);
    const [active, setActive] = useState(true);
    const [showErrors, setShowErrors] = useState(false);

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const openReasonModal = () => setIsReasonOpen(true);
    const closeReasonModal = () => setIsReasonOpen(false);
    const openAddTaxModal = () => setAddBonusOpen(true);
    const closeAddDeptModal = () => setAddBonusOpen(false);

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

    const taxTypes = mapSelectOptions(
        [
            { id: 1, name: "Flat Rate" },
            { id: 2, name: "Slab Based" },
            { id: 3, name: "Fixed Amount" },
            { id: 4, name: "Percentage" },
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
                        Taxes
                    </h2>
                    <Button type="button" onClick={openAddTaxModal} variant="success">
                        Add Tax
                    </Button>
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
                                <CustomSelect
                                    name="type"
                                    label="Tax Type"
                                    value={type}
                                    placeholder="Select Type"
                                    onChange={setType}
                                    options={taxTypes}
                                    controlHeight="2rem"
                                    error={showErrors && !type ? "Tax Type is required" : ""}
                                />

                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">

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
                                {/* <div className="w-full flex items-center">
                                    <div className="w-full md:w-37 md:mt-4">
                                        <ToggleSwitch
                                            label="Active Status"
                                            checked={active}
                                            onChange={setActive}
                                        />
                                    </div>
                                </div> */}
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
                            <Button variant="cancel" onClick={closeAddDeptModal}>
                                Cancel
                            </Button>
                            <Button variant="success">
                                Add Tax
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
                    // onSubmit={handleReject}
                    variant="danger"
                    submitLabel="Deactivate"
                    reasonTitle="Please provide a reason to deactivate this tax."
                />


            </div>
        </Layout>
    );
}
