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
import ToggleSwitch from "y@/app/components/ToggleSwitch";
import {
    FiEdit3, FiEye
} from "react-icons/fi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { CiGrid41 } from "react-icons/ci";
import { IoIosList } from "react-icons/io";
import { TbFilterOff } from "react-icons/tb";
import Button from "y@/app/components/Button";
import StatusDesign from "y@/app/components/StatusColors";
import ReasonModal from "y@/app/components/ReasonConfirmModal";
import { RxCross2 } from "react-icons/rx";
import { MdDone } from "react-icons/md";
import FileUpload from "y@/app/components/FileUpload";
export default function TeamLeave() {
    const [date, setDate] = useState("");
    const [selectRegion, setSelectRegion] = useState("");
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [selectMonth, setSelectMonth] = useState("");
    const [selectYear, setSelectYear] = useState("");
    const [viewMode, setViewMode] = useState('table');

    const [regionVal, setRegionVal] = useState("");
    const [locationVal, setLocationVal] = useState("");
    const [empVal, setEmpVal] = useState("");
    const [leaveTypeVal, setLeaveTypeVal] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isReasonOpen, setIsReasonOpen] = useState(false);
    const [departmentVal, setDepartmentVal] = useState("");
    const [attach, setAttach] = useState("");
    const [sDate, setSDate] = useState("");
    const [eDate, setEDate] = useState("");
    const [holidayType, setHolidayType] = useState("");
    const [showErrors, setShowErrors] = useState(false);

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const openReasonModal = () => setIsReasonOpen(true);
    const closeReasonModal = () => setIsReasonOpen(false);
    const [openMenuId, setOpenMenuId] = useState(null);
    const menuRef = useRef();
    const calendarRef = useRef(null);
    useEffect(() => {

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);

    }, []);

    useEffect(() => {

        if (!calendarRef.current) return;

        const timer = setTimeout(() => {
            const calendarApi = calendarRef.current.getApi();
            const today = new Date();

            let targetYear, targetMonth;

            if (selectYear && selectMonth) {
                targetYear = parseInt(selectYear);
                targetMonth = parseInt(selectMonth) - 1;
            } else if (selectYear && !selectMonth) {
                targetYear = parseInt(selectYear);
                targetMonth = 0;
            } else if (!selectYear && selectMonth) {
                targetYear = today.getFullYear();
                targetMonth = parseInt(selectMonth) - 1;
            } else {
                targetYear = today.getFullYear();
                targetMonth = today.getMonth();
            }

            calendarApi.gotoDate(new Date(targetYear, targetMonth, 1));

            // 🔜 Later: Replace this with backend API
            console.log("Fetch filtered holidays for:", {
                year: targetYear,
                month: targetMonth + 1,
            });
        }, 0);

        return () => clearTimeout(timer);

    }, [selectMonth, selectYear]);

    const handleMenuToggle = (id) => {
        setOpenMenuId((prev) => (prev === id ? null : id));
    };

    const teamLeaveCalendarData = [
        {
            id: 1,
            employeeName: "Ali Khan",
            location: "Lahore Office",
            department: "Finance",
            workingShift: "Morning",
            leaveTypeId: 1,
            leaveType: "Sick Leave",
            startDay: "2025-11-01",
            endDay: "2025-11-03",
            leaveDays: 3,
            reason: "Flu and fever",
            attachment: "medical_certificate_ali.pdf",
        },
        {
            id: 2,
            employeeName: "Sara Ahmed",
            location: "Karachi Office",
            department: "Marketing",
            workingShift: "Evening",
            leaveTypeId: 2,
            leaveType: "Casual Leave",
            startDay: "2025-11-05",
            endDay: "2025-11-06",
            leaveDays: 2,
            reason: "Family event",
            attachment: "",
        },
        {
            id: 3,
            employeeName: "Usman Ali",
            location: "Islamabad Office",
            department: "IT",
            workingShift: "Night",
            leaveTypeId: 3,
            leaveType: "Annual Leave",
            startDay: "2025-11-10",
            endDay: "2025-11-15",
            leaveDays: 6,
            reason: "Vacation",
            attachment: "",
        },
        {
            id: 4,
            employeeName: "Fatima Noor",
            location: "Lahore Office",
            department: "HR",
            workingShift: "Morning",
            leaveTypeId: 4,
            leaveType: "Work From Home",
            startDay: "2025-11-12",
            endDay: "2025-11-13",
            leaveDays: 2,
            reason: "Personal work",
            attachment: "",
        },
        {
            id: 5,
            employeeName: "Bilal Hussain",
            location: "Karachi Office",
            department: "Operations",
            workingShift: "Evening",
            leaveTypeId: 5,
            leaveType: "Training",
            startDay: "2025-11-20",
            endDay: "2025-11-22",
            leaveDays: 3,
            reason: "Professional development",
            attachment: "training_schedule_bilal.pdf",
        },
        {
            id: 6,
            employeeName: "Maryam Khan",
            location: "Lahore Office",
            department: "Finance",
            workingShift: "Morning",
            leaveTypeId: 6,
            leaveType: "Unpaid Leave",
            startDay: "2025-11-25",
            endDay: "2025-11-26",
            leaveDays: 2,
            reason: "Personal reasons",
            attachment: "",
        },
        {
            id: 7,
            employeeName: "Ahmed Raza",
            location: "Islamabad Office",
            department: "Marketing",
            workingShift: "Night",
            leaveTypeId: 2,
            leaveType: "Casual Leave",
            startDay: "2025-12-02",
            endDay: "2025-12-03",
            leaveDays: 2,
            reason: "Wedding ceremony",
            attachment: "",
        },
        {
            id: 8,
            employeeName: "Ayesha Siddiqui",
            location: "Karachi Office",
            department: "IT",
            workingShift: "Evening",
            leaveTypeId: 1,
            leaveType: "Sick Leave",
            startDay: "2025-12-10",
            endDay: "2025-12-12",
            leaveDays: 3,
            reason: "Migraine",
            attachment: "medical_certificate_ayesha.pdf",
        },
        {
            id: 9,
            employeeName: "Hassan Iqbal",
            location: "Lahore Office",
            department: "Operations",
            workingShift: "Morning",
            leaveTypeId: 3,
            leaveType: "Annual Leave",
            startDay: "2025-12-20",
            endDay: "2025-12-30",
            leaveDays: 11,
            reason: "Family trip",
            attachment: "",
        },
        {
            id: 10,
            employeeName: "Zara Nadeem",
            location: "Islamabad Office",
            department: "HR",
            workingShift: "Night",
            leaveTypeId: 4,
            leaveType: "Work From Home",
            startDay: "2025-12-28",
            endDay: "2025-12-31",
            leaveDays: 4,
            reason: "House renovation",
            attachment: "",
        },
    ];

    const departments = mapSelectOptions(
        [
            { id: 1, name: "Human Resources" },
            { id: 2, name: "Finance" },
            { id: 3, name: "Marketing" },
            { id: 4, name: "Sales" },
            { id: 5, name: "Customer Support" },
            { id: 6, name: "Operations" },
            { id: 7, name: "IT & Infrastructure" },
            { id: 8, name: "Research & Development" },
            { id: 9, name: "Design" },
            { id: 10, name: "Administration" },
        ],
        "id",
        "name"
    );
    const employees = mapSelectOptions(
        [
            { id: 1, name: "Human Resources" },
            { id: 2, name: "Finance" },
            { id: 3, name: "Marketing" },
            { id: 4, name: "Sales" },
            { id: 5, name: "Customer Support" },
            { id: 6, name: "Operations" },
            { id: 7, name: "IT & Infrastructure" },
            { id: 8, name: "Research & Development" },
            { id: 9, name: "Design" },
            { id: 10, name: "Administration" },
        ],
        "id",
        "name"
    );
    const leaveTypes = mapSelectOptions(
        [
            { id: 1, name: "Annual Leave" },
            { id: 2, name: "Sick Leave" },
            { id: 3, name: "Casual Leave" },
            { id: 4, name: "Maternity Leave" },
            { id: 5, name: "Paternity Leave" },
            { id: 6, name: "Emergency Leave" },
            { id: 7, name: "Work From Home" },
            { id: 8, name: "Unpaid Leave" },
        ],
        "id",
        "name"
    );
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
    const leaveEmojis = {
        1: "🤧",
        2: "⛱️",
        3: "🗓️",
        4: "🎉",
        5: "🏠",
        6: "📚",
        7: "💸",
    };

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold text-gray-700">
                        Team Leave Calendar
                    </h2>
                    <Button type="button" onClick={handleOpenModal} variant="success">
                        Add Leave
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
                    </div>
                </div>


                <div className="bg-white rounded border border-gray-200 p-4 -mt-2">


                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h2 id="calendarTitle" className="text-sm font-semibold text-gray-800"></h2>
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
                            document.getElementById("calendarTitle").innerText = info.view.title;
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
                            const emoji = leaveEmojis[arg.event.extendedProps.leaveTypeId];
                            const colorClass =
                                colorPalette[arg.event.id % colorPalette.length] ||
                                'bg-gray-200 text-gray-800';

                            return (
                                <div
                                    className={`group ${colorClass} text-[11px] font-medium rounded px-1 py-[3px] 
        shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all duration-150`}
                                    style={{ borderColor: 'currentColor' }}
                                >
                                    <span className="me-1">{emoji}</span>
                                    <span className="truncate">{arg.event.title}</span>
                                </div>
                            );
                        }}
                        events={teamLeaveCalendarData.map((row, index) => ({
                            id: row.id || index,
                            title: row.employeeName,
                            start: row.startDay,
                            end: row.endDay,
                            extendedProps: {
                                leaveTypeId: row.leaveTypeId,
                                leaveType: row.leaveType,
                                location: row.location,
                                department: row.department,
                                leaveDays: row.leaveDays,
                                attachement: row.attachment,
                                description: row.reason,
                                shift: row.workingShift,
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
              
            </div>
            <p class="text-xxs text-gray-500">
              ${formattedEnd && formattedStart !== formattedEnd
                                    ? `${formattedStart} → ${formattedEnd}`
                                    : formattedStart}
            </p>
          </div>

          <!-- Basic Info -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-1">
            
            <div>
              <p class="text-xxs text-gray-500 font-medium">Location</p>
              <p class="text-xs text-gray-800">${extendedProps.location || "-"
                                }</p>
            </div>
             <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div>
              <p class="text-xxs text-gray-500 font-medium">Department</p>
              <p class="text-xs text-gray-800">${extendedProps.department || "-"
                                }</p>
            </div>
          </div>
            <div>
              <p class="text-xxs text-gray-500 font-medium">Leave Type</p>
              <p class="text-xs text-gray-800">${extendedProps.leaveType || "Casual Leave"
                                }</p>
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div>
              <p class="text-xxs text-gray-500 font-medium">Working Shift</p>
              <p class="text-xs text-gray-800">${extendedProps.shift || "Morning"
                                }</p>
            </div>
             <div>
              <p class="text-xxs text-gray-500 font-medium">Leave Days</p>
              <p class="text-xs text-gray-800">${extendedProps.leaveDays + " Days" || "-"
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

                </div>

                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-10/12 md:w-6/12">
                            <h3 className="text-lg text-center font-semibold mb-4">Add Leave</h3>

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
                                        name="dept"
                                        label="Department"
                                        value={departmentVal}
                                        placeholder="Select Department"
                                        onChange={setDepartmentVal}
                                        options={departments}
                                        controlHeight="2rem"
                                        error={showErrors && !departmentVal ? "Department is required" : ""}
                                    />

                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                                    <CustomSelect
                                        name="emp"
                                        label="Employee Name"
                                        value={empVal}
                                        placeholder="Select Employee"
                                        onChange={setEmpVal}
                                        options={employees}
                                        controlHeight="2rem"
                                        error={showErrors && !empVal ? "Employee is required" : ""}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 text-xxs">
                                        <div>
                                            <label className="text-gray-700">Designation</label>
                                            <div className="border border-gray-300 text-gray-500 rounded mt-1" style={{ padding: "6px", height: "32px" }}>
                                                Developer
                                            </div>
                                        </div>


                                        <div>
                                            <label className="text-gray-700">Working Shift</label>
                                            <div className="border border-gray-300 text-gray-500 rounded mt-1" style={{ padding: "6px", height: "32px" }}>
                                                Morning
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="col-span-2">
                                            <CustomSelect
                                                name="leaveType"
                                                label="Leave Type"
                                                value={leaveTypeVal}
                                                placeholder="Select Type"
                                                onChange={setLeaveTypeVal}
                                                options={leaveTypes}
                                                controlHeight="2rem"
                                                error={showErrors && !leaveTypeVal ? "Leave Type is required" : ""}
                                            />
                                        </div>
                                        <div className="text-xxs">
                                            <label className="text-gray-700">Leave Balance</label>
                                            <div className="border border-gray-300 rounded text-gray-500 mt-1" style={{ padding: "6px", height: "32px" }}>
                                                0
                                            </div>
                                        </div>
                                    </div>
                                    <FileUpload
                                        label="Attachment"
                                        name="attachment"
                                        onChange={(e) => setAttach(e.target.files[0])}
                                        value={attach}
                                    />

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
                                    <div className="text-xxs">
                                        <label className="text-gray-700">Leave Duration</label>
                                        <div className="border border-gray-300 text-gray-500 rounded mt-1" style={{ padding: "6px", height: "32px" }}>
                                            3 Days
                                        </div>
                                    </div>



                                </div>

                                <div className="w-full mb-3">
                                    <label
                                        htmlFor="pDesc"
                                        className="block text-xxs text-gray-700 mb-2"
                                    >
                                        Reason / Remarks
                                    </label>
                                    <textarea
                                        id="pDesc"
                                        rows="4"
                                        placeholder="Enter here..."
                                        className="w-full rounded border border-gray-300 p-3 text-gray-800 text-xxs resize-none 
                                        focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-300 transition-all duration-150"
                                    />
                                </div>



                                <div className="flex justify-end gap-2">
                                    <Button variant="cancel" onClick={handleCloseModal}>
                                        Cancel
                                    </Button>
                                    <Button variant="success" >
                                        Add Leave
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
