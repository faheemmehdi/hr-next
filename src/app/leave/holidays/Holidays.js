"use client";
import Layout from "y@/app/components/Layout";
import Input from "y@/app/components/Input";
import { monthOptions, getYearOptions } from "y@/app/constants/Filters";
import { useState, useEffect, useRef } from "react";
import SearchBar from "y@/app/components/SearchBar";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import CustomSelect from "y@/app/components/CustomSelect";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import {
    FiUser, FiEye
} from "react-icons/fi";
import { FaDotCircle } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { CiGrid41 } from "react-icons/ci";
import { IoIosList } from "react-icons/io";
import { TbFilterOff } from "react-icons/tb";
import Button from "y@/app/components/Button";
import StatusDesign from "y@/app/components/StatusColors";
import ReasonModal from "y@/app/components/ReasonConfirmModal";
import { RxCross2 } from "react-icons/rx";
import { MdDone } from "react-icons/md";
export default function HolidaysCalender() {
    const [date, setDate] = useState("");
    const [selectRegion, setSelectRegion] = useState("");
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [selectMonth, setSelectMonth] = useState("");
    const [selectYear, setSelectYear] = useState("");
    const [viewMode, setViewMode] = useState('table');

    const [employee, setEmployee] = useState("");
    const [department, setDepartment] = useState("");
    const [departVal, setDepartVal] = useState("");
    const [status, setStatus] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isReasonOpen, setIsReasonOpen] = useState(false);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [remarks, setRemarks] = useState("");
    const [showErrors, setShowErrors] = useState(false);

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const openReasonModal = () => setIsReasonOpen(true);
    const closeReasonModal = () => setIsReasonOpen(false);
    const [openMenuId, setOpenMenuId] = useState(null);
    const menuRef = useRef();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleMenuToggle = (id) => {
        setOpenMenuId((prev) => (prev === id ? null : id));
    };

    const holidayCalendarData = [
        {
            id: 1,
            holidayName: "New Year’s Day",
            startDay: "2025-01-01",
            endDay: "2025-01-01",
            day: "Wednesday",
            regionId: 1,
            regionName: "Pakistan",
            locations: ["All Offices"],
            calendarType: "National",
            description: "Celebration of the beginning of the new year.",
            attachment: "new_year_notice.pdf",
            statusId: 1,
            status: "Active",
        },
        {
            id: 2,
            holidayName: "Pakistan Day",
            startDay: "2025-03-23",
            endDay: "2025-03-23",
            day: "Sunday",
            regionId: 1,
            regionName: "Pakistan",
            locations: ["All Offices"],
            calendarType: "National",
            description: "Commemorates the Lahore Resolution of 1940.",
            attachment: "pakistan_day_notice.pdf",
            statusId: 1,
            status: "Active",
        },
        {
            id: 3,
            holidayName: "Eid-ul-Fitr",
            startDay: "2025-10-01",
            endDay: "2025-10-04", // end date +1 day for FullCalendar
            day: "Tuesday – Thursday",
            regionId: 1,
            regionName: "Pakistan",
            locations: ["All Offices"],
            calendarType: "Religious",
            description: "Marks the end of Ramadan fasting month.",
            attachment: "eid_fitr_notice.pdf",
            statusId: 1,
            status: "Active",
        },
        {
            id: 4,
            holidayName: "Labour Day",
            startDay: "2025-05-01",
            endDay: "2025-05-01",
            day: "Thursday",
            regionId: 1,
            regionName: "Pakistan",
            locations: ["All Offices"],
            calendarType: "National",
            description: "International Workers' Day celebration.",
            attachment: null,
            statusId: 2,
            status: "Inactive",
        },
        {
            id: 5,
            holidayName: "Eid-ul-Adha",
            startDay: "2025-06-07",
            endDay: "2025-06-10", // +1 day for FullCalendar
            day: "Saturday – Monday",
            regionId: 1,
            regionName: "Pakistan",
            locations: ["All Offices"],
            calendarType: "Religious",
            description: "Festival of Sacrifice.",
            attachment: "eid_adha_notice.pdf",
            statusId: 1,
            status: "Active",
        },
        {
            id: 6,
            holidayName: "Independence Day",
            startDay: "2025-08-14",
            endDay: "2025-08-14",
            day: "Thursday",
            regionId: 1,
            regionName: "Pakistan",
            locations: ["All Offices"],
            calendarType: "National",
            description: "Commemorates Pakistan’s independence in 1947.",
            attachment: "independence_day.pdf",
            statusId: 1,
            status: "Active",
        },
        {
            id: 7,
            holidayName: "Regional Foundation Day",
            startDay: "2025-09-10",
            endDay: "2025-09-10",
            day: "Wednesday",
            regionId: 1,
            regionName: "Pakistan",
            locations: ["Sindh Region", "Karachi Office"],
            calendarType: "Regional",
            description: "Marks the foundation of the Sindh office branch.",
            attachment: "sindh_foundation_notice.pdf",
            statusId: 2,
            status: "Inactive",
        },
        {
            id: 8,
            holidayName: "Eid Milad-un-Nabi",
            startDay: "2025-09-17",
            endDay: "2025-09-17",
            day: "Wednesday",
            regionId: 1,
            regionName: "Pakistan",
            locations: ["All Offices"],
            calendarType: "Religious",
            description: "Birthday of Prophet Muhammad (PBUH).",
            attachment: null,
            statusId: 1,
            status: "Active",
        },
        {
            id: 9,
            holidayName: "Quaid-e-Azam Day",
            startDay: "2025-12-25",
            endDay: "2025-12-25",
            day: "Thursday",
            regionId: 1,
            regionName: "Pakistan",
            locations: ["All Offices"],
            calendarType: "National",
            description: "Commemorates the birthday of Quaid-e-Azam Muhammad Ali Jinnah.",
            attachment: "quaid_day_notice.pdf",
            statusId: 1,
            status: "Active",
        },
        {
            id: 10,
            holidayName: "Christmas Day",
            startDay: "2025-12-25",
            endDay: "2025-12-25",
            day: "Thursday",
            regionId: 1,
            regionName: "Pakistan",
            locations: ["All Offices", "Karachi Office", "Lahore HQ"],
            calendarType: "Optional",
            description: "Observed by Christian employees.",
            attachment: "christmas_notice.pdf",
            statusId: 1,
            status: "Active",
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

    const regions = mapSelectOptions(
        [
            { id: 1, name: "Pakistan Region" },
            { id: 2, name: "US Region" },
            { id: 3, name: "UK Region" },
            { id: 4, name: "Middle East Region" },
            { id: 5, name: "Asia Pacific Region" },
            { id: 6, name: "Europe Region" },
        ],
        "id",
        "name"
    );


    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold text-gray-700">
                        Holiday Calendars
                    </h2>
                    <Button type="button" variant="success">
                        Add Holiday
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
                                name="region"
                                value={selectRegion}
                                placeholder="Region"
                                onChange={setSelectRegion}
                                options={regions}
                                controlHeight="2rem"
                            />
                        </div>
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
                                name="year"
                                value={selectYear}
                                placeholder="Year"
                                onChange={setSelectYear}
                                options={getYearOptions()}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="mb-1 w-[9rem]">
                            <CustomSelect
                                name="month"
                                value={selectMonth}
                                placeholder="Month"
                                onChange={setSelectMonth}
                                options={monthOptions}
                                controlHeight="2rem"
                            />
                        </div>

                        <Input
                            type="date"
                            name="date"
                            noMargin={true}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        {viewMode == 'calendar' &&
                            <CiGrid41 onClick={() => setViewMode('table')} className="border rounded h-[31px] w-[31px] p-[4px] cursor-pointer bg-gray-50 border-gray-300 text-gray-500 mb-1" title="Calendar View" />}
                        {viewMode == 'table' && <IoIosList onClick={() => setViewMode('calendar')} className="border rounded h-[31px] w-[31px] p-[4px] cursor-pointer bg-gray-50 border-gray-300 text-gray-500 mb-1" title="Table View" />}
                        <TbFilterOff className="border rounded h-[31px] w-[31px] p-[4px] cursor-pointer bg-gray-50 border-gray-300 text-gray-500 mb-1" title="Reset Filter" />
                    </div>
                </div>


                {viewMode === 'table' ? (<div className="overflow-x-auto -mt-2">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="px-4 py-3 text-left rounded-tl-md">ID</th>
                                <th className="px-4 py-3 text-left">Holiday Name</th>
                                <th className="px-4 py-3 text-left">Date</th>
                                <th className="px-4 py-3 text-left">Day</th>
                                <th className="px-4 py-3 text-left">Region</th>
                                <th className="px-4 py-3 text-left">Locations</th>
                                <th className="px-4 py-3 text-left">Calendar Type</th>
                                <th className="px-4 py-3 text-left">Description</th>
                                <th className="px-4 py-3 text-left">Attachement</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {holidayCalendarData.map((row, idx) => (
                                <tr
                                    key={idx}
                                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        } hover:bg-gray-100 transition-colors`}
                                >
                                    <td className="px-4 py-3">{row.id}</td>
                                    <td className="px-4 py-3">{row.holidayName}</td>
                                    <td className="px-4 py-3">
                                        {row.startDay}{row.startDay !== row.endDay ? ` – ${row.endDay}` : ''}
                                    </td>
                                    <td className="px-4 py-3">{row.day}</td>
                                    <td className="px-4 py-3">{row.regionName}</td>
                                    <td className="px-4 py-3 truncate max-w-[120px]" title={row.locations}>{row.locations}</td>
                                    <td className="px-4 py-3">{row.calendarType}</td>
                                    <td className="px-4 py-3 truncate max-w-[120px]" title={row.description}>{row.description}</td>
                                    <td className="px-4 py-3 truncate max-w-[120px]">{row.attachment}</td>
                                    <td className="px-4 py-3">
                                        <StatusDesign statusId={row.statusId} label={row.status} />
                                    </td>

                                    <td className="px-4 py-3 relative">
                                        <button
                                            onClick={() => handleMenuToggle(row.id)}
                                            className="p-1 rounded-full hover:bg-gray-100 transition cursor-pointer"
                                        >
                                            <BiDotsVerticalRounded className="text-gray-600 text-sm" />
                                        </button>

                                        {openMenuId === row.id && (
                                            <div
                                                ref={menuRef}
                                                className="absolute top-5 right-16 mt-1 z-50 w-37 bg-white border border-gray-200 rounded-xl shadow-lg"
                                            >
                                                <ul className="py-2 text-xxs text-gray-700">
                                                    <li>
                                                        <button onClick={handleOpenModal} className="flex items-center w-full cursor-pointer px-4 py-2 hover:bg-gray-50">
                                                            <FiEye className="mr-2 text-sm" /> View Request
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="flex items-center w-full cursor-pointer px-4 py-2 hover:bg-gray-50 hover:text-green-700">
                                                            <MdDone className="mr-2 text-sm" /> Approve Request
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button onClick={openReasonModal} className="flex items-center w-full cursor-pointer px-4 py-2 hover:bg-gray-50 text-red-500">
                                                            <RxCross2 className="mr-2 text-sm" /> Reject Request
                                                        </button>
                                                    </li>

                                                </ul>
                                            </div>
                                        )}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>) : (<div className="bg-white rounded-md shadow-sm p-4 -mt-2">
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        height="700px"
                        events={holidayCalendarData.map((row) => ({
                            id: row.id,
                            title: row.holidayName,
                            start: row.startDay,
                            end: row.endDay,
                            bacDaykgroundColor: row.statusId === 1 ? '#16a34a' : '#f87171',
                            borderColor: 'transparent',
                            textColor: '#fff',
                            extendedProps: { description: row.description, region: row.regionName }
                        }))}
                        eventClick={(info) => {
                            alert(
                                `${info.event.title}\n\nRegion: ${info.event.extendedProps.region}\nDescription: ${info.event.extendedProps.description}`
                            );
                        }}
                    />
                </div>)}

                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-10/12 md:w-5/12">

                            <div className="w-full">
                                <div className="px-5 py-1 bg-white rounded-xl">

                                    <div className="border-b border-gray-400 pb-3 mb-4">
                                        <div className="flex justify-between">
                                            <h2 className="text-lg font-semibold text-gray-800">Leave Request Details</h2>
                                            <span className="inline-flex items-center px-2 py-1 text-xxs font-medium rounded-full bg-yellow-100 text-yellow-700">
                                                Pending
                                            </span>
                                        </div>
                                        <p className="text-xxs text-gray-500">Applied on Oct 20, 2025 at 09:10 AM</p>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                        <div>
                                            <p className="text-xxs text-gray-500 font-medium">Employee Name</p>
                                            <p className="text-xs font-semibold text-gray-800">Muhammad Khan</p>
                                        </div>
                                        <div>
                                            <p className="text-xxs text-gray-500 font-medium">Employee ID</p>
                                            <p className="text-xs text-gray-800">EMP-102</p>
                                        </div>
                                        <div>
                                            <p className="text-xxs text-gray-500 font-medium">Department</p>
                                            <p className="text-xs text-gray-800">Sales</p>
                                        </div>
                                    </div>


                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                        <div>
                                            <p className="text-xxs text-gray-500 font-medium">Shift</p>
                                            <p className="text-xs text-gray-800">Morning (9:00 AM - 6:00 PM)</p>
                                        </div>
                                        <div>
                                            <p className="text-xxs text-gray-500 font-medium">Leave Type</p>
                                            <p className="text-xs text-gray-800">Sick Leave</p>
                                        </div>
                                        <div>
                                            <p className="text-xxs text-gray-500 font-medium">Leave Days</p>
                                            <p className="text-xs text-gray-800">3 Days</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-1 mb-4">
                                        <div>
                                            <p className="text-xxs text-gray-500 font-medium">Applied Dates</p>
                                            <div className="flex text-xxs">
                                                <p className="text-gray-800">17 Feb 2025</p><strong className="px-3 text-gray-500">|</strong>
                                                <p className="text-gray-800">18 Feb 2025</p><strong className="px-3 text-gray-500">|</strong>
                                                <p className="text-gray-800">19 Feb 2025</p>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-400 pt-4 mb-4">

                                        <p className="text-xxs text-gray-500 font-medium mb-1">Reason Provided</p>
                                        <p className="text-xs text-gray-800 text-justify">
                                            Relocation and house shifting.
                                        </p>
                                    </div>

                                    <div className="border-t border-gray-400 pt-4 mb-4">
                                        <p className="text-xxs text-gray-500 font-medium mb-2">Attachment</p>
                                        <div className="bg-gray-50 border border-gray-200 rounded px-2 py-1 flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <FaDotCircle className="h-2 w-2 text-gray-500" />
                                                <span className="text-xxs text-gray-700">Card.jpg</span>
                                            </div>
                                            <button className="text-xxs text-blue-600 hover:underline">View</button>
                                        </div>
                                    </div>

                                    <div className="flex justify-end border-t border-gray-400 pt-4">
                                        <Button variant="cancel" onClick={handleCloseModal}>
                                            Close
                                        </Button>
                                        {/* <Button variant="success" onClick={handleSave}>
                                        Save
                                    </Button> */}
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>
                )}
                <ReasonModal
                    isOpen={isReasonOpen}
                    title="Reject Leave Request"
                    infoSection={
                        <div className="border-gray-300 border-b p-1 mb-4">
                            <p className="text-xs text-gray-800 font-medium">
                                <span className="font-semibold">Muhammad Khan</span>
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Employee ID:</span> EMP-1024
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Applied Dates:</span> 3 Oct - 5 Oct (3 Days)
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Leave Type:</span> Casual Leave
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Reason:</span> “Relocation and house shifting.”
                            </p>
                        </div>}
                    onClose={closeReasonModal}
                    // onSubmit={handleReject}
                    submitLabel="Reject Request"
                    reasonTitle="Please provide a reason for rejecting this request. The reason will be shared with the employee."
                />
            </div>
        </Layout>
    );
}
