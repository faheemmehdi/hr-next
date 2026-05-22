"use client";
import Layout from "y@/app/components/Layout";
import Input from "y@/app/components/Input";
import { useMemo, useState } from "react";
import SearchBar from "y@/app/components/SearchBar";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import CustomSelect from "y@/app/components/CustomSelect";
import {
    FiEdit3
} from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Button from "y@/app/components/Button";
import StatusDesign from "y@/app/components/StatusColors";
import { MdOutlineBlock } from "react-icons/md";
import ToggleSwitch from "y@/app/components/ToggleSwitch";
import ReasonModal from "y@/app/components/ReasonConfirmModal";
import RowActions from "y@/app/components/RowActions";
import Modal from "y@/app/components/ModalShell";
import RichTextEditor from "y@/app/components/RichTextEditor";
export default function Locations() {
    const [officeName, setOfficeName] = useState("");
    const [city, setCity] = useState("");
    const [search, setSearch] = useState("");
    const [countryFilter, setCountryFilter] = useState("");
    const [cityFilter, setCityFilter] = useState("");
    const [desc, setDesc] = useState("");
    const [locCountry, setLocCountry] = useState("");
    const [timezone, setTimezone] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isReasonOpen, setIsReasonOpen] = useState(false);
    const [isLocOpen, setAddBonusOpen] = useState(false);
    const [active, setActive] = useState(true);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const openReasonModal = () => setIsReasonOpen(true);
    const closeReasonModal = () => setIsReasonOpen(false);
    const openLocModal = () => setAddBonusOpen(true);
    const closeAddDeptModal = () => setAddBonusOpen(false);

    const locationData = [
        {
            company: "Kairos Services Pvt Ltd",
            country: "Pakistan",
            city: "Lahore",
            officeName: "Head Office",
            timezone: "Asia/Karachi (UTC+5)",
            defaultCalendarRegion: true,
            employees: 120,
            createdAt: "2023-01-10",
            statusId: 1,
            status: "Active",
        },
        {
            company: "Kairos Services Pvt Ltd",
            country: "Pakistan",
            city: "Karachi",
            officeName: "Regional Office - South",
            timezone: "Asia/Karachi (UTC+5)",
            defaultCalendarRegion: false,
            employees: 85,
            createdAt: "2023-02-15",
            statusId: 1,
            status: "Active",
        },
        {
            company: "Kairos Services Pvt Ltd",
            country: "Pakistan",
            city: "Islamabad",
            officeName: "Regional Office - North",
            timezone: "Asia/Karachi (UTC+5)",
            defaultCalendarRegion: false,
            employees: 60,
            createdAt: "2023-03-20",
            statusId: 2,
            status: "Inactive",
        },
        {
            company: "Kairos Services Pvt Ltd",
            country: "United Arab Emirates",
            city: "Dubai",
            officeName: "Middle East Branch",
            timezone: "Asia/Dubai (UTC+4)",
            defaultCalendarRegion: false,
            employees: 40,
            createdAt: "2023-04-05",
            statusId: 1,
            status: "Active",
        },
        {
            company: "Kairos Services Pvt Ltd",
            country: "United Kingdom",
            city: "London",
            officeName: "Europe Branch",
            timezone: "Europe/London (UTC+0)",
            defaultCalendarRegion: false,
            employees: 35,
            createdAt: "2023-05-12",
            statusId: 1,
            status: "Active",
        },
        {
            company: "Kairos Services Pvt Ltd",
            country: "Pakistan",
            city: "Multan",
            officeName: "Regional Office - South Punjab",
            timezone: "Asia/Karachi (UTC+5)",
            defaultCalendarRegion: false,
            employees: 25,
            createdAt: "2023-06-22",
            statusId: 1,
            status: "Active",
        },
        {
            company: "Kairos Services Pvt Ltd",
            country: "Pakistan",
            city: "Rawalpindi",
            officeName: "Regional Office - North",
            timezone: "Asia/Karachi (UTC+5)",
            defaultCalendarRegion: false,
            employees: 30,
            createdAt: "2023-07-18",
            statusId: 1,
            status: "Active",
        },
        {
            company: "Kairos Services Pvt Ltd",
            country: "Pakistan",
            city: "Kohat",
            officeName: "Regional Office - KPK",
            timezone: "Asia/Karachi (UTC+5)",
            defaultCalendarRegion: false,
            employees: 15,
            createdAt: "2023-08-01",
            statusId: 1,
            status: "Active",
        },
    ];


    const locations = mapSelectOptions(
        [
            { id: "Lahore", name: "Lahore" },
            { id: "Multan", name: "Multan" },
            { id: "Karachi", name: "Karachi" },
            { id: "Islamabad", name: "Islamabad" },
            { id: "Shaher Sultan", name: "Shaher Sultan" },
            { id: "Rawalpindi", name: "Rawalpindi" },
            { id: "Kohat", name: "Kohat" },
        ],
        "id",
        "name"
    );

    const countries = mapSelectOptions(
        [
            { id: "Pakistan", name: "Pakistan" },
            { id: "United States", name: "United States" },
            { id: "United Kingdom", name: "United Kingdom" },
            { id: "India", name: "India" },
            { id: "United Arab Emirates", name: "United Arab Emirates" },
            { id: "Canada", name: "Canada" },
            { id: "Australia", name: "Australia" },
            { id: "Germany", name: "Germany" },
            { id: "France", name: "France" },
            { id: "China", name: "China" },
        ],
        "id",
        "name"
    );
    const cities = mapSelectOptions(
        [
            { id: "Lahore", name: "Lahore" },
            { id: "Multan", name: "Multan" },
            { id: "Karachi", name: "Karachi" },
            { id: "Islamabad", name: "Islamabad" },
            { id: "Shaher Sultan", name: "Shaher Sultan" },
            { id: "Rawalpindi", name: "Rawalpindi" },
            { id: "Kohat", name: "Kohat" },
        ],
        "id",
        "name"
    );
    const hods = mapSelectOptions(
        [
            { id: 1, name: "Ahmad Khan" },
            { id: 2, name: "Sara Ali" },
            { id: 3, name: "Omar Malik" },
            { id: 4, name: "Ayesha Siddiqui" },
            { id: 5, name: "Bilal Shah" },
            { id: 6, name: "Fatima Noor" },
            { id: 7, name: "Usman Riaz" },
            { id: 8, name: "Hina Javed" },
            { id: 9, name: "Zain Qureshi" },
            { id: 10, name: "Maria Hassan" },
        ],
        "id",
        "name"
    );
    const timezoneOptions = mapSelectOptions(
        [
            { id: "Asia/Karachi (UTC+5)", name: "Asia/Karachi (UTC+5)" },
            { id: "Asia/Dubai (UTC+4)", name: "Asia/Dubai (UTC+4)" },
            { id: "Europe/London (UTC+0)", name: "Europe/London (UTC+0)" },
            { id: "America/New_York (UTC-5)", name: "America/New_York (UTC-5)" },
        ],
        "id",
        "name"
    );

    const filteredLocationData = useMemo(() => {
        const q = search.trim().toLowerCase();
        return locationData.filter((loc) => {
            const matchesSearch =
                !q ||
                loc.officeName.toLowerCase().includes(q) ||
                loc.country.toLowerCase().includes(q) ||
                loc.city.toLowerCase().includes(q) ||
                loc.timezone.toLowerCase().includes(q);
            const matchesCountry = !countryFilter || loc.country === countryFilter;
            const matchesCity = !cityFilter || loc.city === cityFilter;
            return matchesSearch && matchesCountry && matchesCity;
        });
    }, [search, countryFilter, cityFilter, locationData]);


    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold text-gray-700">
                        Locations
                    </h2>
                    <Button type="button" onClick={openLocModal} variant="success">
                        Add Location
                    </Button>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5">
                    <div className="w-full md:w-1/5 flex items-center mb-1">
                        <SearchBar
                            placeholder="Search by name..."
                            onSearch={setSearch}
                        />
                    </div>
                    <div className="w-full flex items-center justify-end flex-col md:flex-row mt-2 md:mt-0 gap-2">
                        <div className="mb-1 w-full md:w-[9rem]">
                            <CustomSelect
                                name="location"
                                value={countryFilter}
                                placeholder="Country"
                                onChange={setCountryFilter}
                                options={countries}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="mb-1 w-full md:w-[9rem]">
                            <CustomSelect
                                name="city_filter"
                                value={cityFilter}
                                placeholder="City"
                                onChange={setCityFilter}
                                options={cities}
                                controlHeight="2rem"
                            />
                        </div>
                    </div>
                </div>


                <div className="overflow-x-auto shadow-md border border-gray-200 rounded max-h-[72vh]">
                    <table className="w-full text-xs border-collapse">
                        <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 text-left">Office Name</th>
                                <th className="px-4 py-3 text-left">Country</th>
                                <th className="px-4 py-3 text-left">City</th>
                                <th className="px-4 py-3 text-left">Timezone</th>
                                <th className="px-4 py-3 text-left">Default Calendar</th>
                                <th className="px-4 py-3 text-left">Total Employees</th>
                                <th className="px-4 py-3 text-left">Created At</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {filteredLocationData && filteredLocationData.length > 0 ? (
                                filteredLocationData.map((loc, idx) => (
                                    <tr
                                        key={idx}
                                        className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors`}
                                    >
                                        {/* <td className="px-4 py-3 truncate max-w-[120px]" title={loc.company}>{loc.company}</td> */}
                                        <td className="px-4 py-3">{loc.officeName}</td>
                                        <td className="px-4 py-3">{loc.country}</td>
                                        <td className="px-4 py-3">{loc.city}</td>
                                        <td className="px-4 py-3">{loc.timezone}</td>
                                        <td className="px-4 py-3">
                                            {loc.defaultCalendarRegion ? (
                                                <span className="px-2 py-1 text-xxs font-semibold rounded-full bg-green-100 text-green-700">
                                                    Default
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 text-xxs font-semibold rounded-full bg-gray-100 text-gray-500">
                                                    -
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">{loc.employees}</td>
                                        <td className="px-4 py-3">{loc.createdAt}</td>
                                        <td className="px-4 py-3">
                                            <StatusDesign statusId={loc.statusId} label={loc.status} />
                                        </td>
                                        <RowActions
                                            row={loc}
                                            actions={[
                                                {
                                                    label: "View Location",
                                                    icon: MdOutlineRemoveRedEye,
                                                    onClick: (row) => {
                                                        setSelectedLocation(row);
                                                        handleOpenModal();
                                                    },
                                                },
                                                { label: "Edit Location", icon: FiEdit3 },
                                                {
                                                    label: "Deactivate Location",
                                                    icon: MdOutlineBlock,
                                                    color: "red",
                                                    onClick: (row) => {
                                                        setSelectedLocation(row);
                                                        openReasonModal();
                                                    },
                                                },
                                            ]}
                                        />
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={10} className="text-center py-4 text-gray-500 italic">
                                        No locations found.
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
                                <h2 className="text-lg font-semibold text-gray-800">Location Details</h2>
                                {selectedLocation && (
                                    <StatusDesign statusId={selectedLocation.statusId} label={selectedLocation.status} />
                                )}
                            </div>
                            <p className="text-xxs text-gray-500">
                                Created At {selectedLocation?.createdAt || "-"}
                            </p>
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


                {isLocOpen && (
                    <Modal width="w-full md:w-6/12">
                        <h3 className="text-lg text-center font-semibold mb-4">Add Location</h3>
                        <div className="w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

                                <Input
                                    type="text"
                                    name="deptName"
                                    placeholder="Enter office name"
                                    label="Office Name"
                                    noMargin={true}
                                    value={officeName}
                                    onChange={(e) => setOfficeName(e.target.value)}
                                />
                                <CustomSelect
                                    name="count"
                                    label="Country"
                                    value={locCountry}
                                    placeholder="Select Country"
                                    onChange={setLocCountry}
                                    options={countries}
                                    controlHeight="2rem"
                                />

                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">


                                <CustomSelect
                                    name="city"
                                    label="City"
                                    value={city}
                                    placeholder="Select City"
                                    onChange={setCity}
                                    options={cities}
                                    controlHeight="2rem"
                                />
                                <CustomSelect
                                    name="timezone"
                                    label="Timezone"
                                    value={timezone}
                                    placeholder="Select Timezone"
                                    onChange={setTimezone}
                                    options={timezoneOptions}
                                    controlHeight="2rem"
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
                                Add Location
                            </Button>
                        </div>

                    </Modal>
                )}

                <ReasonModal
                    isOpen={isReasonOpen}
                    title="Deactivate Location"
                    infoSection={
                        <div className="border-gray-300 border-b py-1 mb-2">
                            <p className="text-xs text-gray-800 font-medium">
                                <span className="font-semibold">{selectedLocation?.officeName || "Head Office"}</span>
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>City:</span> {selectedLocation?.city || "Multan"}
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Total Employees:</span> {selectedLocation?.employees ?? 78}
                            </p>
                        </div>}
                    onClose={closeReasonModal}
                    // onSubmit={handleReject}
                    variant="danger"
                    submitLabel="Deactivate"
                    reasonTitle="Please provide a reason to deactivate this location."
                />


            </div>
        </Layout>
    );
}
