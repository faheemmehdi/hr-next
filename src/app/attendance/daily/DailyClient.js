"use client";
import Layout from "y@/app/components/Layout";
import Input from "y@/app/components/Input";
import { useState, useEffect } from "react";
import SearchBar from "y@/app/components/SearchBar";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import CustomSelect from "y@/app/components/CustomSelect";
import {
  FiSmartphone,
  FiCpu,
  FiEdit3,
  FiGlobe,
  FiCamera,
  FiCreditCard,
  FiClock,
  FiUser,
} from "react-icons/fi";
import { CiMobile4 } from "react-icons/ci";
import Button from "y@/app/components/Button";
export default function DailyClient() {
  const [date, setDate] = useState("");
  const [dateVal, setDateVal] = useState("");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [locationVal, setLocationVal] = useState("");
  const [employee, setEmployee] = useState("");
  const [department, setDepartment] = useState("");
  const [departVal, setDepartVal] = useState("");
  const [status, setStatus] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [remarks, setRemarks] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // format: YYYY-MM-DD
    setDate(today);
  }, []);

  const methodIcons = {
    1: <CiMobile4 size={12} className="text-blue-500 inline ml-1" />, // Mobile App
    2: <FiCpu size={12} className="text-blue-500 inline ml-1" />,        // Biometric Machine
    3: <FiEdit3 size={12} className="text-blue-500 inline ml-1" />,      // Manual Entry
    4: <FiGlobe size={12} className="text-blue-500 inline ml-1" />,      // Web Portal
    5: <FiCamera size={12} className="text-blue-500 inline ml-1" />,     // QR Code
    6: <FiCreditCard size={12} className="text-blue-500 inline ml-1" />, // Card Swipe
    7: <FiClock size={12} className="text-blue-500 inline ml-1" />,      // Auto
  };
  const getMethodIcon = (methodId) => methodIcons[methodId] || null;
  // Status codes:
  // 1 = Present
  // 2 = Absent
  // 3 = Late
  // 4 = Weekend
  // 5 = Sick Leave

  const attendanceData = [
    {
      empId: "EMP001",
      name: "Ali Khan",
      imageUrl: "/api/portraits/men/32.jpg",
      location: "Lahore Office",
      department: "IT",
      shift: "Morning",
      checkIn: "08:00 AM",
      checkInMethodId: 1, // Mobile
      checkOut: "04:30 PM",
      checkOutMethodId: 2, // Biometric
      hours: "8.5",
      status: "Present",
      statusId: 1, // Present
    },
    {
      empId: "EMP002",
      name: "Sara Ahmed malilk city bana rota",
      imageUrl: "/api/portraits/women/45.jpg",
      location: "Karachi Office",
      department: "Finance",
      shift: "Morning",
      checkIn: "-",
      checkInMethodId: null,
      checkOut: "-",
      checkOutMethodId: null,
      hours: "-",
      status: "Weekend",
      statusId: 4, // Weekend
    },
    {
      empId: "EMP003",
      name: "Hamza Ali",
      imageUrl: "/api/portraits/men/58.jpg",
      location: "Remote (Home)",
      department: "Support",
      shift: "General",
      checkIn: "09:30 AM",
      checkInMethodId: 4, // Web Portal
      checkOut: "04:00 PM",
      checkOutMethodId: 4, // Web Portal
      hours: "6.5",
      status: "Late",
      statusId: 3, // Late
    },
    {
      empId: "EMP004",
      name: "Maryam Fatima",
      imageUrl: "/api/portraits/women/67.jpg",
      location: "Islamabad Office",
      department: "HR",
      shift: "Morning",
      checkIn: "-",
      checkOut: "-",
      hours: "-",
      status: "Absent",
      statusId: 2, // Absent
    },
    {
      empId: "EMP005",
      name: "Usman Tariq",
      imageUrl: "",
      location: "Lahore Office",
      department: "Sales",
      shift: "Night",
      checkIn: "-",
      checkOut: "-",
      hours: "-",
      status: "Sick Leave",
      statusId: 5, // Sick Leave
    },

    // ---- Added for testing all method icons ----
    {
      empId: "EMP006",
      name: "Bilal Hussain",
      imageUrl: "/api/portraits/men/21.jpg",
      location: "Karachi Office",
      department: "Operations",
      shift: "Evening",
      checkIn: "02:00 PM",
      checkInMethodId: 2, // Biometric
      checkOut: "10:00 PM",
      checkOutMethodId: 2, // Biometric
      hours: "8",
      status: "Present",
      statusId: 1,
    },
    {
      empId: "EMP007",
      name: "Ayesha Noor",
      imageUrl: "/api/portraits/women/34.jpg",
      location: "Islamabad Office",
      department: "Marketing",
      shift: "Morning",
      checkIn: "08:15 AM",
      checkInMethodId: 3, // RFID Card
      checkOut: "04:30 PM",
      checkOutMethodId: 3, // RFID Card
      hours: "8.25",
      status: "Present",
      statusId: 1,
    },
    {
      empId: "EMP008",
      name: "Zain Abbas",
      imageUrl: "/api/portraits/men/64.jpg",
      location: "Lahore Office",
      department: "Finance",
      shift: "Morning",
      checkIn: "09:05 AM",
      checkInMethodId: 1, // Mobile
      checkOut: "05:00 PM",
      checkOutMethodId: 4, // Web Portal
      hours: "7.9",
      status: "Late",
      statusId: 3,
    },
    {
      empId: "EMP009",
      name: "Fatima Saeed",
      imageUrl: "/api/portraits/women/28.jpg",
      location: "Remote (Home)",
      department: "Design",
      shift: "Flexible",
      checkIn: "10:00 AM",
      checkInMethodId: 5, // Manual Entry
      checkOut: "06:00 PM",
      checkOutMethodId: 5, // Manual Entry
      hours: "8",
      status: "Present",
      statusId: 1,
    },
    {
      empId: "EMP010",
      name: "Ahmad Raza",
      imageUrl: "/api/portraits/men/47.jpg",
      location: "Karachi Office",
      department: "Development",
      shift: "Morning",
      checkIn: "09:45 AM",
      checkInMethodId: 3, // RFID Card
      checkOut: "05:45 PM",
      checkOutMethodId: 1, // Mobile
      hours: "7.5",
      status: "Late",
      statusId: 3,
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

  const handleSave = () => {
    setShowErrors(true);
    if (!locationVal || !departVal || !employee || !dateVal || !checkIn || !checkOut || !remarks) return; // stop submission
    alert("Saved!");
  };
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


  return (
    <Layout>
      <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-semibold text-gray-700">
            Daily Attendance
          </h2>
          <Button type="button" variant="success" onClick={handleOpenModal}>
            Add Attendance
          </Button>
        </div>
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-10/12 md:w-8/12 lg:w-6/12">
              <h3 className="text-lg text-center font-semibold mb-4">Add Attendance</h3>

              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                    name="department"
                    label="Department"
                    value={departVal}
                    placeholder="Select Department"
                    onChange={setDepartVal}
                    options={departments}
                    controlHeight="2rem"
                    error={showErrors && !departVal ? "Department is required" : ""}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <CustomSelect
                    name="employee"
                    label="Employee"
                    value={employee}
                    placeholder="Select Employee"
                    onChange={setEmployee}
                    options={employees}
                    controlHeight="2rem"
                    error={showErrors && !employee ? "Employee is required" : ""}
                  />

                  <Input
                    type="date"
                    name="date"
                    label="Date"
                    noMargin={true}
                    value={dateVal}
                    onChange={(e) => setDateVal(e.target.value)}
                    error={showErrors && !dateVal ? "Date is required" : ""}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Input
                    type="time"
                    name="checkIn_time"
                    label="Check In"
                    noMargin={true}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    error={showErrors && !checkIn ? "Check In time is required" : ""}
                  />

                  <Input
                    type="time"
                    name="checkOut_time"
                    label="Check Out"
                    noMargin={true}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    error={showErrors && !checkOut ? "Check Out time is required" : ""}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="col-span-2">
                    <label
                      htmlFor="remarks"
                      className="block text-xxs font-medium text-gray-700 mb-1"
                    >
                      Remarks
                    </label>

                    <textarea
                      id="remarks"
                      name="remarks"
                      rows="3"
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      className={`w-full px-3 py-1 border rounded-md text-xxs focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none
        ${showErrors && !remarks ? "border-red-500" : "border-gray-300"}
      `}
                      placeholder="Enter remarks..."
                    ></textarea>

                    {showErrors && !remarks && (
                      <p className="text-xxs text-red-500">Remarks are required</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="cancel" onClick={handleCloseModal}>
                    Cancel
                  </Button>
                  <Button variant="success" onClick={handleSave}>
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Search + Date Filter (UI only; logic handled in backend) */}
        <div className="flex justify-between items-center my-3 mt-5">
          <div className="w-1/5 flex items-center mb-1">
            <SearchBar
              placeholder="Search by name or ID..."
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
                name="department"
                value={department}
                placeholder="Department"
                onChange={setDepartment}
                options={departments}
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
            <Input
              type="date"
              name="date"
              noMargin={true}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>


        {/* Attendance Table */}
        <div className="overflow-x-auto -mt-2">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-3 text-left rounded-tl-md">Emp ID</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Department</th>
                <th className="px-4 py-3 text-left">Shift</th>
                <th className="px-4 py-3 text-left">Check-in</th>
                <th className="px-4 py-3 text-left">Check-out</th>
                <th className="px-4 py-3 text-left">Working Hours</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-xxs">
              {attendanceData.map((row, idx) => (
                <tr
                  key={idx}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition-colors`}
                >
                  <td className="px-4 py-3">{row.empId}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    {row.imageUrl ? (
                      <img
                        src={`${baseUrl}${row.imageUrl}`}
                        alt={row.name}
                        className="w-7 h-7 rounded-full object-cover border border-gray-300"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                        <FiUser className="text-gray-500" />
                      </div>
                    )}
                    <span className="truncate max-w-[120px]" title={row.name}>{row.name}</span>

                  </td>
                  <td className="px-4 py-3">{row.location}</td>
                  <td className="px-4 py-3">{row.department}</td>
                  <td className="px-4 py-3">{row.shift}</td>

                  <td className="px-4 py-3">
                    {row.checkIn}
                    {getMethodIcon(row.checkInMethodId)}
                  </td>
                  <td className="px-4 py-3">
                    {row.checkOut}
                    {getMethodIcon(row.checkOutMethodId)}
                  </td>

                  <td className="px-4 py-3">{row.hours}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-[11px] font-medium ${row.statusId === 1
                        ? "bg-green-100 text-green-700"
                        : row.statusId === 3
                          ? "bg-yellow-100 text-yellow-700"
                          : row.statusId === 2
                            ? "bg-red-100 text-red-700"
                            : row.statusId === 5
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-600"
                        }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
