"use client";
import Layout from "y@/app/components/Layout";
import Input from "y@/app/components/Input";
import { useState, useEffect, useRef } from "react";
import SearchBar from "y@/app/components/SearchBar";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import CustomSelect from "y@/app/components/CustomSelect";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ToggleSwitch from "y@/app/components/ToggleSwitch";
import {
    FiEdit3, FiEye
} from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { CiGrid41 } from "react-icons/ci";
import { IoIosList } from "react-icons/io";
import { TbFilterOff } from "react-icons/tb";
import Button from "y@/app/components/Button";
import StatusDesign from "y@/app/components/StatusColors";
import ReasonModal from "y@/app/components/ReasonConfirmModal";
import { RxCross2 } from "react-icons/rx";
import { MdDone } from "react-icons/md";
import FileUpload from "y@/app/components/FileUpload";
import MonthPicker from "y@/app/components/MonthPicker";
import RowActions from "y@/app/components/RowActions";
export default function HolidaysCalender() {
    const [date, setDate] = useState("");
    const [selectRegion, setSelectRegion] = useState("");
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [selectMonth, setSelectMonth] = useState("");
    const [selectYear, setSelectYear] = useState("");
    const [viewMode, setViewMode] = useState('table');
    const [calendarTitle, setCalendarTitle] = useState('');
    const [regionVal, setRegionVal] = useState("");
    const [locationVal, setLocationVal] = useState("");
    const [monthVal, setMonthVal] = useState("");
    const [holidayName, setHolidayName] = useState("");
    const [status, setStatus] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isReasonOpen, setIsReasonOpen] = useState(false);
    const [cTypeVal, setCTypeVal] = useState("");
    const [attach, setAttach] = useState("");
    const [sDate, setSDate] = useState("");
    const [eDate, setEDate] = useState("");
    const [holidayType, setHolidayType] = useState("");
    const [showErrors, setShowErrors] = useState(false);

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const openReasonModal = () => setIsReasonOpen(true);
    const closeReasonModal = () => setIsReasonOpen(false);
    const calendarRef = useRef(null);
    useEffect(() => {
        if (calendarRef.current && monthVal) {
            const calendarApi = calendarRef.current.getApi();
            setTimeout(() => {
                calendarApi.gotoDate(monthVal);
            }, 0);
        }
    }, [monthVal]);


    const holidayCalendarData = [
        {
            id: 1,
            holidayName: "New Year’s Day",
            startDay: "2025-11-01",
            endDay: "2025-11-01",
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
            startDay: "2025-11-01",
            endDay: "2025-11-04", // end date +1 day for FullCalendar
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
            startDay: "2025-10-02",
            endDay: "2025-10-02", // end date +1 day for FullCalendar
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

    const holidayTypes = mapSelectOptions(
        [
            { id: 1, name: "Public Holiday" },
            { id: 2, name: "Company Holiday" },
            { id: 3, name: "Optional Holiday" },
            { id: 4, name: "Religious Holiday" },
        ],
        "id",
        "name"
    );
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

    const calendarTypes = mapSelectOptions(
        [
            { id: 1, name: "National" },
            { id: 2, name: "Regional" },
            { id: 3, name: "International" },
            { id: 4, name: "Religious" },
            { id: 5, name: "Company" },
            { id: 6, name: "Custom" },
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
                        Holiday Calendar
                    </h2>
                    <Button type="button" onClick={handleOpenModal} variant="success">
                        Add Holiday
                    </Button>
                </div>

                <div className="w-full flex justify-between flex-col md:flex-row items-center my-2 mt-5">
                    <div className="w-full md:w-1/5 flex items-center mb-1">
                        <SearchBar
                            placeholder="Search by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:flex flex-col md:flex-row justify-end items-center gap-2">
                        <div className="mb-1 w-full md:w-[9rem]">
                            <CustomSelect
                                name="region"
                                value={selectRegion}
                                placeholder="Region"
                                onChange={setSelectRegion}
                                options={regions}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="mb-1 w-full md:w-[9rem]">
                            <CustomSelect
                                name="location"
                                value={location}
                                placeholder="Location"
                                onChange={setLocation}
                                options={locations}
                                controlHeight="2rem"
                            />
                        </div>

                        <div className="mb-1 w-full md:w-[9rem]">
                            <MonthPicker monthVal={monthVal} setMonthVal={setMonthVal} />
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

                        <div className="flex items-center gap-2">
                            {viewMode == 'calendar' &&
                                <IoIosList onClick={() => setViewMode('table')} className="border rounded h-[31px] w-[31px] p-[4px] cursor-pointer bg-gray-50 border-gray-300 text-gray-500 mb-1" title="Table View" />}
                            {viewMode == 'table' && <CiGrid41 onClick={() => setViewMode('calendar')} className="border rounded h-[31px] w-[31px] p-[4px] cursor-pointer bg-gray-50 border-gray-300 text-gray-500 mb-1" title="Calendar View" />}
                            <TbFilterOff className="border rounded h-[31px] w-[31px] p-[4px] cursor-pointer bg-gray-50 border-gray-300 text-gray-500 mb-1" title="Reset Filter" />
                        </div>

                    </div>
                </div>

                {viewMode === 'table' ? (<div className="overflow-x-auto shadow-md border border-gray-200 rounded max-h-[72vh]">
                    <table className="w-full text-xs border-collapse">
                                    <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
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
                            {holidayCalendarData && holidayCalendarData.length > 0 ? (
                                holidayCalendarData.map((row, idx) => (
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


                                        <RowActions
                                            row={row}
                                            actions={[
                                                { label: "View Holiday", icon: MdOutlineRemoveRedEye, onClick: handleOpenModal },
                                                { label: "Edit Holiday", icon: FiEdit3, color: "green" },
                                                { label: "Deactivate", icon: RxCross2, color: "red", onClick: openReasonModal },
                                            ]}
                                        />
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={12} className="text-center py-4 text-gray-500 italic">
                                        No holiday found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>) : (<div className="bg-white rounded border border-gray-200 p-4 -mt-2">


                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h2 id="calendarTitle" className="text-sm font-semibold text-gray-800">{calendarTitle}</h2>
                            <div className="flex items-center gap-2 ">
                                <button
                                    onClick={() => calendarRef.current?.getApi().prev()} title="Previous Month"
                                    className="flex items-center justify-center cursor-pointer w-8 h-8 rounded border border-gray-300 bg-white hover:bg-gray-100 text-gray-500  transition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                <button
                                    onClick={() => calendarRef.current?.getApi().next()} title="Next Month"
                                    className="flex items-center justify-center cursor-pointer w-8 h-8 rounded border border-gray-300 bg-white hover:bg-gray-100 text-gray-500  transition"
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
                    </div>


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

                            if (top) {
                                // Date number aligned top-right
                                top.classList.add('flex', 'justify-end', 'mb-[1px]');
                            }

                            if (events) {
                                // Stack events neatly with small gap
                                events.classList.add('flex', 'flex-col', 'gap-[1px]', 'mt-0', 'pb-0', 'overflow-visible');
                            }

                            if (more) {
                                // Remove hidden "+ more" space
                                more.style.marginTop = '0px';
                            }
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

                            const colorClass =
                                colorPalette[arg.event.id % colorPalette.length] ||
                                'bg-gray-200 text-gray-800';

                            return (
                                <div
                                    className={`group ${colorClass} text-[11px] font-medium rounded px-2 py-[3px] 
        shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all duration-150 border-l-4`}
                                    style={{ borderColor: 'currentColor' }}
                                >
                                    <div className="truncate">{arg.event.title}</div>
                                </div>
                            );
                        }}
                        events={holidayCalendarData.map((row, index) => ({
                            id: row.id || index,
                            title: row.holidayName,
                            start: row.startDay,
                            end: row.endDay,
                            extendedProps: {
                                description: row.description,
                                region: row.regionName,
                                location: row.locations,
                                attachement: row.attachment,
                                status: row.status,
                                calendarType: row.calendarType
                            },
                        }))}

                        eventClick={(info) => {
                            const { title, extendedProps, start, end } = info.event;

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

                            const overlay = document.createElement("div");
                            overlay.className =
                                "fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-fadeIn";

                            overlay.innerHTML = `
    <div class="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-5/12">
      <div class="w-full">
        <div class="px-5 py-1 bg-white rounded-xl">
          
          <!-- Header -->
          <div class="border-b border-gray-300 pb-3 mb-4">
            <div class="flex justify-between">
              <h2 class="text-lg font-semibold text-gray-800">${title}</h2>
              <span class="inline-flex items-center px-2 py-1 text-xxs font-medium rounded-full bg-green-100 text-green-700">
                                                ${extendedProps.status}
                                            </span>
            </div>
            <p class="text-xxs text-gray-500">
              ${formattedEnd && formattedStart !== formattedEnd
                                    ? `${formattedStart} → ${formattedEnd}`
                                    : formattedStart}
            </p>
          </div>

          <!-- Basic Info -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div>
              <p class="text-xxs text-gray-500 font-medium">Region</p>
              <p class="text-xs font-semibold text-gray-800">${extendedProps.region || "-"
                                }</p>
            </div>
            <div>
              <p class="text-xxs text-gray-500 font-medium">Location</p>
              <p class="text-xs text-gray-800">${extendedProps.location || "-"
                                }</p>
            </div>
            <div>
              <p class="text-xxs text-gray-500 font-medium">Holiday Type</p>
              <p class="text-xs text-gray-800">${extendedProps.calendarType || "Public Holiday"
                                }</p>
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div>
              <p class="text-xxs text-gray-500 font-medium">Calendar Type</p>
              <p class="text-xs text-gray-800">${extendedProps.calendarType || "National"
                                }</p>
            </div>
          </div>

          <!-- Description -->
          ${extendedProps.description
                                    ? `
          <div class="border-t border-gray-300 pt-4 mb-4">
            <p class="text-xxs text-gray-500 font-medium mb-1">Description</p>
            <p class="text-xs text-gray-800 text-justify">
              ${extendedProps.description}
            </p>
          </div>`
                                    : ""
                                }

          <!-- Attachment -->
          ${extendedProps.attachement
                                    ? `
          <div class="border-t border-gray-300 pt-4 mb-4">
            <p class="text-xxs text-gray-500 font-medium mb-2">Attachment</p>
            <div class="bg-gray-50 border border-gray-200 rounded px-2 py-1 flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.364 6.364a4 4 0 105.657 5.657l6.364-6.364a4 4 0 00-5.657-5.657z" />
                </svg>
                <span class="text-xxs text-gray-700 truncate max-w-[120px]">Attachment</span>
              </div>
              <a href="${extendedProps.attachement}" target="_blank" class="text-xxs text-blue-600 hover:underline">View</a>
            </div>
          </div>`
                                    : ""
                                }

          <!-- Footer -->
          <div class="flex justify-end border-t border-gray-300 pt-4">
            <button id="closePopupBtn" style="background-color: var(--color-gray)" class="text-gray-800 px-4 py-2 rounded text-xxs cursor-pointer transition">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

                            document.body.appendChild(overlay);

                            // Close handler
                            overlay.querySelector("#closePopupBtn").onclick = () => overlay.remove();
                        }}
                        dateClick={(info) => {
                            const localDate = new Date(info.date.getTime() - info.date.getTimezoneOffset() * 60000)
                                .toISOString()
                                .split('T')[0];
                            setSDate(localDate);
                            setEDate(localDate);
                            setIsOpen(true);
                        }}


                    />

                </div>)}

                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-10/12 md:w-6/12">
                            <h3 className="text-lg text-center font-semibold mb-4">Add Holiday</h3>

                            <div className="w-full">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                                    <CustomSelect
                                        name="region"
                                        label="Region"
                                        value={regionVal}
                                        placeholder="Select Region"
                                        onChange={setRegionVal}
                                        options={regions}
                                        controlHeight="2rem"
                                        error={showErrors && !regionVal ? "Region is required" : ""}
                                    />
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
                                    <CustomSelect
                                        name="cType"
                                        label="Calendar Type"
                                        value={cTypeVal}
                                        placeholder="Select Location"
                                        onChange={setCTypeVal}
                                        options={calendarTypes}
                                        controlHeight="2rem"
                                        error={showErrors && !cTypeVal ? "Calendar Type is required" : ""}
                                    />

                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="Enter holiday name"
                                        label="Holiday Name"
                                        noMargin={true}
                                        value={holidayName}
                                        onChange={(e) => setHolidayName(e.target.value)}
                                        error={showErrors && !holidayName ? "Name is required" : ""}
                                    />
                                    <div className="w-full flex items-center justify-center">

                                        <div className="w-full md:w-37 md:mt-4">
                                            <ToggleSwitch
                                                label="Active Status"
                                                checked={status}
                                                onChange={setStatus}
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                                    <Input
                                        type="date"
                                        name="sdate"
                                        placeholder="Enter Start Date"
                                        label="Start Date"
                                        noMargin={true}
                                        value={sDate}
                                        onChange={(e) => setSDate(e.target.value)}
                                        error={showErrors && !sDate ? "Start date is required" : ""}
                                    />
                                    <Input
                                        type="date"
                                        name="edate"
                                        placeholder="Enter End Date"
                                        label="End Date"
                                        noMargin={true}
                                        value={eDate}
                                        onChange={(e) => setEDate(e.target.value)}
                                        error={showErrors && !eDate ? "End date is required" : ""}
                                    />
                                    <CustomSelect
                                        name="holidayType"
                                        label="Holiday Type"
                                        value={holidayType}
                                        placeholder="Select Type"
                                        onChange={setHolidayType}
                                        options={holidayTypes}
                                        controlHeight="2rem"
                                        error={showErrors && !holidayType ? "Holiday Type is required" : ""}
                                    />


                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                                    <FileUpload
                                        label="Attachment"
                                        name="attachment"
                                        onChange={(e) => setAttach(e.target.files[0])}
                                        value={attach}
                                    />


                                </div>
                                <div className="w-full mb-3">
                                    <label
                                        htmlFor="pDesc"
                                        className="block text-xxs text-gray-700 mb-2"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="pDesc"
                                        rows="4"
                                        placeholder="Enter description..."
                                        className="w-full rounded border border-gray-300 p-3 text-gray-800 text-xxs resize-none 
                                        focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-300 transition-all duration-150"
                                    />
                                </div>



                                <div className="flex justify-end gap-2">
                                    <Button variant="cancel" onClick={handleCloseModal}>
                                        Cancel
                                    </Button>
                                    <Button variant="success" >
                                        Add Holiday
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <ReasonModal
                    isOpen={isReasonOpen}
                    title="Deactivate Holiday"
                    infoSection={
                        <div className="border-gray-300 border-b p-1 mb-4">
                            <p className="text-xs text-gray-800 font-medium">
                                <span className="font-semibold">Independence Day</span>
                            </p> <p className="text-xxs text-gray-600">
                                <span>Date</span> 3 Oct - 5 Oct (3 Days)
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Region:</span> Punjab
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Location:</span> All Locations
                            </p>
                        </div>}
                    onClose={closeReasonModal}
                    // onSubmit={handleReject}
                    submitLabel="Deactivate"
                    reasonTitle="Please provide a reason for deactivating this holiday."
                />
            </div>
        </Layout>
    );
}
