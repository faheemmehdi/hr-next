"use client";
import Layout from "y@/app/components/Layout";
import Input from "y@/app/components/Input";
import { useState, useRef } from "react";
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
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ReasonModal from "y@/app/components/ReasonConfirmModal";
import RowActions from "y@/app/components/RowActions";
import Modal from "y@/app/components/ModalShell";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiGrid41 } from "react-icons/ci";
import { IoIosList } from "react-icons/io";
import { TbFilterOff } from "react-icons/tb";
export default function ShiftSchedules() {
    const [shiftName, setShiftName] = useState("");
    const [frequency, setFrequency] = useState("");
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [officeStart, setOfficeStart] = useState("");
    const [officeEnd, setOfficeEnd] = useState("");
    const [breakStart, setBreakStart] = useState("");
    const [breakEnd, setBreakEnd] = useState("");
    const [locationVal, setLocationVal] = useState("");
    const [employees, setEmployees] = useState("");
    const [team, setTeam] = useState("");
    const [eligTeam, setEligTeam] = useState("");
    const [eligEmp, setEligEmp] = useState("");
    const [eligDept, setEligDept] = useState("");
    const [rotation, setRotation] = useState("");
    const [status, setStatus] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isReasonOpen, setIsReasonOpen] = useState(false);
    const [isAddBonusOpen, setAddBonusOpen] = useState(false);
    const [active, setActive] = useState("");
    const [showErrors, setShowErrors] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [isAssignOpen, setAssignOpen] = useState(false);
    const [bulkAction, setBulkAction] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [recurring, setRecurring] = useState(false);
    const [viewMode, setViewMode] = useState('table');
    const [calendarTitle, setCalendarTitle] = useState('');
    const [selectMonth, setSelectMonth] = useState("");
    const [selectYear, setSelectYear] = useState("");

    const calendarRef = useRef(null);

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const openReasonModal = () => setIsReasonOpen(true);
    const closeReasonModal = () => setIsReasonOpen(false);
    const openAddShiftModal = () => setAddBonusOpen(true);
    const closeAddLeaveModal = () => setAddBonusOpen(false);
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedRows([]);
            setSelectAll(false);
        } else {
            const allIds = shiftsData.map((_, index) => index);
            setSelectedRows(allIds);
            setSelectAll(true);
        }
    };

    const handleRowSelect = (index) => {
        let updated = [...selectedRows];

        if (updated.includes(index)) {
            updated = updated.filter((i) => i !== index);
        } else {
            updated.push(index);
        }

        setSelectedRows(updated);
        setSelectAll(updated.length === shiftsData.length);
    };
    const handleBulkAction = (val) => {
        if (!val) return;
        switch (val) {
            case 1:
                if (selectedRows.length === 0) {
                    alert("Please select rows first!");
                    return;
                }
                setAssignOpen(true);
                break;
            case 2:
                break;
            case 3:
                openReasonModal();
                break;
            case 4:
                // delete logic
                break;
            default:
                break;
        }
        // setStatus(val);
    };


    const shiftsData = [
        // One-time shift - no recurrence
        {
            id: 1,
            name: "Morning Shift",
            location: "All Locations",
            startTime: "09:00 AM",
            endTime: "05:00 PM",
            breaks: "1 Hour",
            rotationalTypes: "None",
            eligibleGroup: [
                { type: "Employee", groups: ["Alice", "Bob"] },
                { type: "Department", groups: ["Finance", "Marketing"] },
            ],
            statusId: 1,
            status: "Active",
            startDay: "2025-12-10",
            endDay: "2025-12-10",
            isRecurring: false,
        },

        // One-time shift - fixed rotation
        {
            id: 2,
            name: "Evening Shift",
            location: "Head Office",
            startTime: "08:30 AM",
            endTime: "04:30 PM",
            breaks: "45 Minutes",
            rotationalTypes: "Fixed",
            eligibleGroup: [
                { type: "Team", groups: ["Sales Team A"] },
                { type: "Employee", groups: ["Charlie"] },
            ],
            statusId: 1,
            status: "Active",
            startDay: "2025-12-11",
            endDay: "2025-12-11",
            isRecurring: false,
        },

        // One-time shift - none rotation, single employee group
        {
            id: 3,
            name: "Night Shift",
            location: "All Locations",
            startTime: "10:00 PM",
            endTime: "06:00 AM",
            breaks: "1 Hour",
            rotationalTypes: "None",
            eligibleGroup: [
                { type: "Employee", groups: ["All Employees"] },
            ],
            statusId: 1,
            status: "Active",
            startDay: "2025-12-12",
            endDay: "2025-12-12",
            isRecurring: false,
        },

        // Recurring shift - indefinite
        {
            id: 4,
            name: "Daily Recurring Shift",
            location: "Main Branch",
            startTime: "09:00 AM",
            endTime: "05:00 PM",
            breaks: "1 Hour",
            rotationalTypes: "Recurring",
            eligibleGroup: [
                { type: "Team", groups: ["Support Team"] },
            ],
            statusId: 1,
            status: "Active",
            isRecurring: true,
            startDay: null,
            endDay: null,
        },

        // Recurring shift - weekly example
        {
            id: 5,
            name: "Weekly Recurring Shift - Saturday",
            location: "Remote",
            startTime: "10:00 AM",
            endTime: "04:00 PM",
            breaks: "30 Minutes",
            rotationalTypes: "Recurring",
            eligibleGroup: [
                { type: "Department", groups: ["Customer Service"] },
            ],
            statusId: 1,
            status: "Active",
            isRecurring: true,
            startDay: null,
            endDay: null,
        },

        // Another one-time with multiple groups
        {
            id: 6,
            name: "Special Project Shift",
            location: "Head Office",
            startTime: "11:00 AM",
            endTime: "07:00 PM",
            breaks: "1 Hour",
            rotationalTypes: "Fixed",
            eligibleGroup: [
                { type: "Employee", groups: ["David", "Eva"] },
                { type: "Team", groups: ["Project Team X"] },
                { type: "Department", groups: ["Development"] },
            ],
            statusId: 2,
            status: "Inactive",
            startDay: "2025-12-15",
            endDay: "2025-12-20",
            isRecurring: false,
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

    const bulk_actions = mapSelectOptions(
        [
            { id: 1, name: "Assign Shift" },
            { id: 2, name: "Activate" },
            { id: 3, name: "Deactivate" },
            { id: 4, name: "Delete" }
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

    const rotations = mapSelectOptions(
        [
            { id: 1, name: "None" },
            { id: 2, name: "Fixed" },
            { id: 3, name: "Rotational" },
        ],
        "id",
        "name"
    );



    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-screen p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold text-gray-700">
                        Shift Schedules
                    </h2>
                    <div className="flex gap-2">
                        {selectedRows.length > 0 && (
                            <div className="mt-[1px] min-w-[130px]">
                                <CustomSelect
                                    name="bulk_actions"
                                    value={bulkAction}
                                    placeholder="Bulk Actions"
                                    onChange={(val) => {
                                        setBulkAction(val);
                                        handleBulkAction(val);
                                    }}
                                    options={bulk_actions}
                                    controlHeight="2rem"
                                />
                            </div>
                        )}



                        <Button type="button" onClick={openAddShiftModal} variant="success">
                            Create Shift
                        </Button>
                    </div>

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
                                name="location"
                                value={team}
                                placeholder="Team"
                                onChange={setTeam}
                                options={locations}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="mb-1 w-[9rem]">
                            <CustomSelect
                                name="location"
                                value={employees}
                                placeholder="Employees"
                                onChange={setEmployees}
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
                        {viewMode == 'calendar' &&
                            <IoIosList onClick={() => setViewMode('table')} className="border rounded h-[31px] w-[31px] p-[4px] cursor-pointer bg-gray-50 border-gray-300 text-gray-500 mb-1" title="Table View" />}
                        {viewMode == 'table' && <CiGrid41 onClick={() => setViewMode('calendar')} className="border rounded h-[31px] w-[31px] p-[4px] cursor-pointer bg-gray-50 border-gray-300 text-gray-500 mb-1" title="Calendar View" />}
                        <TbFilterOff className="border rounded h-[31px] w-[31px] p-[4px] cursor-pointer bg-gray-50 border-gray-300 text-gray-500 mb-1" title="Reset Filter" />
                    </div>
                </div>


                {/* Attendance Table */}
                <div className="overflow-x-auto -mt-2">
                    {shiftsData.length === 0 ? (
                        <div className="p-4 text-center text-gray-500 text-sm">
                            No shifts available.
                        </div>
                    ) : (
                        <>
                            {/* Filter shifts with date ranges for calendar */}
                            {viewMode === 'calendar' && shiftsData.some(shift => shift.startDay && shift.endDay) ? (
                                <div className="bg-white rounded border border-gray-200 p-4 mt-[1px]">
                                    {/* Calendar Controls */}
                                    <div className="flex items-center justify-between mb-3">
                                        <h2 id="calendarTitle" className="text-sm font-semibold text-gray-800">{calendarTitle}</h2>
                                        <div className="flex items-center gap-2 ">
                                            <button
                                                onClick={() => calendarRef.current?.getApi().prev()}
                                                title="Previous Month"
                                                className="flex items-center justify-center cursor-pointer w-8 h-8 rounded border border-gray-300 bg-white hover:bg-gray-100 text-gray-500 transition"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => calendarRef.current?.getApi().next()}
                                                title="Next Month"
                                                className="flex items-center justify-center cursor-pointer w-8 h-8 rounded border border-gray-300 bg-white hover:bg-gray-100 text-gray-500 transition"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectMonth("");
                                                    setSelectYear("");
                                                    calendarRef.current?.getApi().today();
                                                }}
                                                className="flex items-center justify-center cursor-pointer px-3 h-8 rounded bg-blue-500 text-white text-xs font-medium hover:bg-blue-600 transition"
                                            >
                                                Today
                                            </button>
                                        </div>
                                    </div>

                                    {/* Calendar */}
                                    <FullCalendar
                                        ref={calendarRef}
                                        plugins={[dayGridPlugin, interactionPlugin]}
                                        initialView="dayGridMonth"
                                        headerToolbar={false}
                                        height="auto"
                                        expandRows={false}
                                        eventBackgroundColor="transparent"
                                        eventBorderColor="transparent"
                                        eventColor=""
                                        dayHeaderClassNames="!py-2 bg-gray-100 uppercase text-xxs tracking-wide text-gray-600"
                                        dayCellDidMount={(info) => {
                                            const frame = info.el.querySelector('.fc-daygrid-day-frame');
                                            const top = info.el.querySelector('.fc-daygrid-day-top');
                                            const events = info.el.querySelector('.fc-daygrid-day-events');
                                            const more = info.el.querySelector('.fc-daygrid-day-bottom');

                                            if (frame) {
                                                frame.style.minHeight = 'auto';
                                                frame.style.height = 'auto';
                                                frame.classList.add('p-[2px]', 'flex', 'flex-col', 'justify-start', 'text-xxs');
                                            }
                                            if (top) top.classList.add('flex', 'justify-end', 'mb-[1px]');
                                            if (events) events.classList.add('flex', 'flex-col', 'gap-[1px]', 'mt-0', 'pb-0', 'overflow-visible');
                                            if (more) more.style.marginTop = '0px';
                                        }}
                                        datesSet={(info) => {
                                            setCalendarTitle(info.view.title);
                                        }}
                                        eventContent={(arg) => {
                                            const colorPalette = [
                                                'bg-orange-200 text-orange-800',
                                                'bg-sky-200 text-sky-800',
                                                'bg-emerald-200 text-emerald-800',
                                                'bg-rose-200 text-rose-800',
                                                'bg-indigo-200 text-indigo-800',
                                                'bg-amber-200 text-amber-800',
                                            ];
                                            const colorClass = colorPalette[arg.event.id % colorPalette.length] || 'bg-gray-200 text-gray-800';
                                            return (
                                                <div
                                                    className={`group ${colorClass} text-[11px] font-medium rounded px-2 py-[3px] shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all duration-150 border-l-4`}
                                                    style={{ borderColor: 'currentColor' }}
                                                >
                                                    <div className="truncate">{arg.event.title}</div>
                                                </div>
                                            );
                                        }}
                                        events={shiftsData
                                            .filter(shift => shift.startDay && shift.endDay)
                                            .map((row, index) => ({
                                                id: row.id || index,
                                                title: row.name,
                                                start: row.startDay,
                                                end: row.endDay,

                                                extendedProps: {
                                                    location: row.location,
                                                    status: row.status,

                                                    // NEW FIELDS FOR MODAL
                                                    startTime: row.startTime,
                                                    endTime: row.endTime,
                                                    breaks: row.breaks,
                                                    rotationalTypes: row.rotationalTypes,
                                                    eligibleGroup: row.eligibleGroup,

                                                    recurring: row.recurring || false,
                                                    recurringPattern: row.recurringPattern || "-",
                                                },
                                            }))
                                        }

                                        eventClick={(info) => {
                                            const event = info.event;

                                            // Extract fields
                                            const title = event.title;
                                            const start = event.start;
                                            const end = event.end;

                                            const {
                                                location,
                                                status,
                                                startTime,
                                                endTime,
                                                breaks,
                                                rotationalTypes,
                                                eligibleGroup,
                                                recurring,
                                                recurringPattern
                                            } = event.extendedProps;

                                            // Format date
                                            const formattedStart = new Date(start).toLocaleDateString("en-US", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            });
                                            const formattedEnd =
                                                end &&
                                                new Date(end).toLocaleDateString("en-US", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                });

                                            // Build overlay
                                            const overlay = document.createElement("div");
                                            overlay.className =
                                                "fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-fadeIn";

                                            overlay.innerHTML = `
        <div class="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-5/12">
            <div class="border-b border-gray-300 pb-3 mb-4">
                <div class="flex justify-between">
                    <h2 class="text-lg font-semibold text-gray-800">${title}</h2>
                    <span class="inline-flex items-center px-2 py-1 text-xxs font-medium rounded-full bg-green-100 text-green-700">
                        ${status}
                    </span>
                </div>
                <p class="text-xxs text-gray-500">
                    ${formattedEnd && formattedStart !== formattedEnd ? `${formattedStart} → ${formattedEnd}` : formattedStart}
                </p>
            </div>

            <!-- Shift Details -->
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <p class="text-xxs text-gray-500 font-medium">Start Time</p>
                    <p class="text-xs text-gray-800">${startTime}</p>
                </div>
                <div>
                    <p class="text-xxs text-gray-500 font-medium">End Time</p>
                    <p class="text-xs text-gray-800">${endTime}</p>
                </div>
                <div>
                    <p class="text-xxs text-gray-500 font-medium">Breaks</p>
                    <p class="text-xs text-gray-800">${breaks}</p>
                </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <p class="text-xxs text-gray-500 font-medium">Location</p>
                    <p class="text-xs text-gray-800">${location}</p>
                </div>
                <div>
                    <p class="text-xxs text-gray-500 font-medium">Rotation</p>
                    <p class="text-xs text-gray-800">${rotationalTypes}</p>
                </div>
                <div>
                    <p class="text-xxs text-gray-500 font-medium">Recurring</p>
                    <p class="text-xs text-gray-800">${recurring ? "Yes" : "No"}</p>
                </div>
            </div>

            ${recurring ? `
            <div class="border-t border-gray-300 pt-4 mb-4">
                <p class="text-xxs text-gray-500 font-medium">Recurring Pattern</p>
                <p class="text-xs text-gray-800">${recurringPattern}</p>
            </div>` : ""}

            <!-- Eligible Groups -->
            <div class="border-t border-gray-300 pt-4 mb-4">
                <p class="text-xxs text-gray-500 font-medium">Eligible Groups</p>
                <div class="text-xs text-gray-800">
                    ${eligibleGroup
                                                    ?.map(g => `<div><strong>${g.type}:</strong> ${g.groups.join(", ")}</div>`)
                                                    .join("")}
                </div>
            </div>

            <!-- Footer -->
            <div class="flex justify-end border-t border-gray-300 pt-4">
                <button id="closePopupBtn" class="bg-gray-200 text-gray-800 px-4 py-2 rounded text-xxs cursor-pointer">
                    Close
                </button>
            </div>
        </div>
    `;

                                            document.body.appendChild(overlay);

                                            // Close handler
                                            overlay.querySelector("#closePopupBtn").onclick = () => overlay.remove();
                                        }}

                                    />
                                </div>
                            ) : (
                                // Show Table View if viewMode is table or no shifts with date ranges for calendar
                                <table className="w-full text-xs border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100 text-gray-700">
                                            <th className="px-3 py-3">
                                                <input
                                                    type="checkbox"
                                                    checked={selectAll}
                                                    onChange={handleSelectAll}
                                                />
                                            </th>
                                            <th className="px-4 py-3 text-left">Name</th>
                                            <th className="px-4 py-3 text-left">Location</th>
                                            <th className="px-4 py-3 text-left">Start Time</th>
                                            <th className="px-4 py-3 text-left">End Time</th>
                                            <th className="px-4 py-3 text-left">Breaks</th>
                                            <th className="px-4 py-3 text-left">Rotation Type</th>
                                            <th className="px-4 py-3 text-left">Eligible Groups</th>
                                            <th className="px-4 py-3 text-left">Status</th>
                                            <th className="px-4 py-3 text-left">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-xxs">
                                        {shiftsData.map((row, idx) => (
                                            <tr
                                                key={idx}
                                                className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors`}
                                            >
                                                <td className="px-3 py-3 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedRows.includes(idx)}
                                                        onChange={() => handleRowSelect(idx)}
                                                    />
                                                </td>
                                                <td className="px-4 py-3 truncate max-w-[120px]" title={row.name}>{row.name}</td>
                                                <td className="px-4 py-3">{row.location}</td>
                                                <td className="px-4 py-3">{row.startTime}</td>
                                                <td className="px-4 py-3">{row.endTime}</td>
                                                <td className="px-4 py-3">{row.breaks}</td>
                                                <td className="px-4 py-3">{row.rotationalTypes}</td>
                                                <td className="px-4 py-3 truncate max-w-[120px]">
                                                    {row.eligibleGroup.map(({ type, groups }, idx) => (
                                                        <div key={idx} title={groups.join(", ")}>
                                                            <strong>{type}:</strong> {groups.join(", ")}
                                                        </div>
                                                    ))}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <StatusDesign statusId={row.statusId} label={row.status} />
                                                </td>
                                                <RowActions
                                                    row={row}
                                                    actions={[
                                                        { label: "View Shift", icon: MdOutlineRemoveRedEye, onClick: handleOpenModal },
                                                        { label: "Edit Shift", icon: FiEdit3 },
                                                        { label: "Deactivate Shift", icon: MdOutlineBlock, color: "red", onClick: openReasonModal },
                                                    ]}
                                                />
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </>
                    )}
                </div>

                {isOpen && (
                    <Modal width="w-full md:w-5/12">
                        <div className="border-b border-gray-400 pb-3 mb-4">
                            <div className="flex justify-between">
                                <h2 className="text-lg font-semibold text-gray-800">Shift Details</h2>
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
                        <h3 className="text-lg text-center font-semibold mb-4">Create Shift</h3>
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
                                    name="shiftName"
                                    placeholder="Enter shift name"
                                    label="Shift Name"
                                    noMargin={true}
                                    value={shiftName}
                                    onChange={(e) => setShiftName(e.target.value)}
                                    error={showErrors && !shiftName ? "Shift Name is required" : ""}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">

                                <Input
                                    type="time"
                                    name="officeStart"
                                    label="Office Start Time"
                                    noMargin={true}
                                    value={officeStart}
                                    onChange={(e) => setOfficeStart(e.target.value)}
                                    error={showErrors && !officeStart ? "Office Start Time is required" : ""}
                                />
                                <Input
                                    type="time"
                                    name="officeEnd"
                                    label="Office End Time"
                                    noMargin={true}
                                    value={officeEnd}
                                    onChange={(e) => setOfficeEnd(e.target.value)}
                                    error={showErrors && !officeEnd ? "Office End Time is required" : ""}
                                />
                                <CustomSelect
                                    name="rotation"
                                    label="Rotation Type"
                                    value={rotation}
                                    placeholder="Select Rotation"
                                    onChange={setRotation}
                                    options={rotations}
                                    controlHeight="2rem"
                                    error={showErrors && !rotation ? "Rotation is required" : ""}
                                />
                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">

                                <Input
                                    type="time"
                                    name="breakStart"
                                    label="Break Start Time"
                                    noMargin={true}
                                    value={breakStart}
                                    onChange={(e) => setBreakStart(e.target.value)}
                                    error={showErrors && !breakStart ? "Break Start Time is required" : ""}
                                />
                                <Input
                                    type="time"
                                    name="breakEnd"
                                    label="Break End Time"
                                    noMargin={true}
                                    value={breakEnd}
                                    onChange={(e) => setBreakEnd(e.target.value)}
                                    error={showErrors && !breakEnd ? "Break End Time is required" : ""}
                                />
                                <CustomSelect
                                    name="eligTeam"
                                    label="Eligible Team"
                                    value={eligTeam}
                                    placeholder="Select Team"
                                    onChange={setEligTeam}
                                    options={locations}
                                    isMulti={true}
                                    controlHeight="2rem"
                                />

                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">


                                <CustomSelect
                                    name="eligEmp"
                                    label="Eligible Employees"
                                    value={eligEmp}
                                    placeholder="Select Employee"
                                    onChange={setEligEmp}
                                    options={locations}
                                    isMulti={true}
                                    controlHeight="2rem"
                                />
                                <CustomSelect
                                    name="eligDept"
                                    label="Eligible Department"
                                    value={eligDept}
                                    placeholder="Select Department"
                                    onChange={setEligDept}
                                    options={locations}
                                    isMulti={true}
                                    controlHeight="2rem"
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
                                Create
                            </Button>
                        </div>

                    </Modal>
                )}


                <ReasonModal
                    isOpen={isReasonOpen}
                    title="Deactivate Shift"
                    infoSection={
                        <div className="border-gray-300 border-b py-1 mb-2">
                            <p className="text-xs text-gray-800 font-medium">
                                <span className="font-semibold">Night Shift</span>
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Start Time:</span> 05:00 PM
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>End Time:</span> 09:00 AM
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Location:</span> Multan
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Rotation Type:</span> Fixed
                            </p>
                        </div>}
                    onClose={closeReasonModal}
                    // onSubmit={handleReject}
                    variant="danger"
                    submitLabel="Deactivate"
                    reasonTitle="Please provide a reason to deactivate this shift."
                />

                {isAssignOpen && (
                    <Modal width="w-full md:w-5/12">
                        <div className="border-b border-gray-400 pb-3 mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">Assign Shift</h2>
                            <p className="text-xxs text-gray-500">
                                Assign selected shifts to employees, teams or departments
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                            <CustomSelect
                                name="assignEmployees"
                                label="Assign to Employees"
                                value={eligEmp}
                                placeholder="Select Employees"
                                onChange={setEligEmp}
                                options={locations} // replace with real employee list
                                isMulti={true}
                                controlHeight="2rem"
                            />

                            <CustomSelect
                                name="assignTeams"
                                label="Assign to Teams"
                                value={eligTeam}
                                placeholder="Select Teams"
                                onChange={setEligTeam}
                                options={locations} // replace with real team list
                                isMulti={true}
                                controlHeight="2rem"
                            />

                            <CustomSelect
                                name="assignDepartments"
                                label="Assign to Departments"
                                value={eligDept}
                                placeholder="Select Departments"
                                onChange={setEligDept}
                                options={locations} // replace with real departments
                                isMulti={true}
                                controlHeight="2rem"
                            />
                            {/* Recurring checkbox */}
                            <div className="mt-5 flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="recurringShift"
                                    checked={recurring}
                                    onChange={() => setRecurring(!recurring)}
                                    className="w-[14px] h-[14px] text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="recurringShift" className="text-xs text-gray-700 select-none">
                                    Recurring Shift (applies indefinitely)
                                </label>
                            </div>

                        </div>


                        {/* Show date inputs only if NOT recurring */}
                        {!recurring && (
                            <div className="grid grid-cols-2 gap-4 mb-5">
                                <Input
                                    type="date"
                                    name="assignStartDate"
                                    label="Start Date"
                                    noMargin={true}
                                    value={startDate ? startDate.toISOString().slice(0, 10) : ""}
                                    onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
                                    className="text-xs"
                                />
                                <Input
                                    type="date"
                                    name="assignEndDate"
                                    label="End Date"
                                    noMargin={true}
                                    value={endDate ? endDate.toISOString().slice(0, 10) : ""}
                                    onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
                                    min={startDate ? startDate.toISOString().slice(0, 10) : undefined}
                                    className="text-xs"
                                />
                            </div>
                        )}

                        <div className="text-xxs text-gray-700 mb-4">
                            <strong>Selected Shifts:</strong> {selectedRows.length}
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button variant="cancel" onClick={() => setAssignOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="success">
                                Assign
                            </Button>
                        </div>
                    </Modal>
                )}


            </div>
        </Layout>
    );
}
