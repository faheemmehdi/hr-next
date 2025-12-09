"use client";
import Layout from "y@/app/components/Layout";
import Input from "y@/app/components/Input";
import CheckboxDropdown from "y@/app/components/CheckboxDropdown";
import { useState, useEffect, useRef } from "react";
import SearchBar from "y@/app/components/SearchBar";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import CustomSelect from "y@/app/components/CustomSelect";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaEye, FaEdit, FaCog, FaTrash, FaUserTie, FaTags } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import {
  FiUser, FiEdit2, FiX
} from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuDownload } from "react-icons/lu";
import Button from "y@/app/components/Button";
import MonthPicker from "y@/app/components/MonthPicker";
import RowActions from "y@/app/components/RowActions";
import Modal from "y@/app/components/ModalShell";
export default function PaySlips() {
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [designationVal, setDesignationVal] = useState("");
  const [monthVal, setMonthVal] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef();
  const [editingTag, setEditingTag] = useState(null);
  const [tagEditVal, setTagEditVal] = useState({
    name: "",
    bgColor: "#ffffff",
    textColor: "#000000",
  });

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

  const addNewTag = () => {
    setEditingTag(null);
  };

  const editTag = (tag) => {
    setTagEditVal({
      name: tag.name,
      bgColor: tag.bgColor,
      textColor: tag.textColor,
    });
    setEditingTag(tag.id);
  };


  const updateTag = () => {
    editTag({
      id: editingTag,
      ...tagEditVal,
    });
    setEditingTag(null);
  };
  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false)
  const paySlipData = [
    {
      empId: "EMP301",
      name: "Ahsan Qureshi",
      imageUrl: "/api/portraits/men/28.jpg",
      location: "Karachi",
      department: "Finance",
      designation: "Senior Accountant",
      payrollPeriod: "October 2025",
      grossEarnings: 120000 + 20000 + 8000 + 5000, // 153000
      deductions: 12000 + 0 + 1000, // 13000
      netPay: 140000,
      paymentDate: "Oct 31, 2025",
      paymentMode: "Bank Transfer",
    },
    {
      empId: "EMP302",
      name: "Sana Imran",
      imageUrl: "/api/portraits/women/34.jpg",
      location: "Lahore",
      department: "HR",
      designation: "HR Officer",
      payrollPeriod: "October 2025",
      grossEarnings: 95000 + 15000 + 5000 + 4000, // 119000
      deductions: 9500 + 2 * 1000 + 500, // assume absence = 1000 each day, total 19500
      netPay: 110000,
      paymentDate: "Oct 31, 2025",
      paymentMode: "Bank Transfer",
    },
    {
      empId: "EMP303",
      name: "Tahir Hussain",
      imageUrl: "/api/portraits/men/19.jpg",
      location: "Islamabad",
      department: "IT",
      designation: "Software Engineer",
      payrollPeriod: "October 2025",
      grossEarnings: 150000 + 25000 + 10000 + 6000, // 191000
      deductions: 15000 + 0 + 0, // 15000
      netPay: 176000,
      paymentDate: "",
      paymentMode: "",
    },
    {
      empId: "EMP304",
      name: "Nimra Gul",
      imageUrl: "/api/portraits/women/41.jpg",
      location: "Faisalabad",
      department: "Marketing",
      designation: "Content Strategist",
      payrollPeriod: "October 2025",
      grossEarnings: 110000 + 18000 + 7000 + 4000, // 139000
      deductions: 11000 + 0 + 0, // 11000
      netPay: 128000,
      paymentDate: "Oct 31, 2025",
      paymentMode: "Bank Transfer",
    },
    {
      empId: "EMP305",
      name: "Zeeshan Arif",
      imageUrl: "/api/portraits/men/37.jpg",
      location: "Multan",
      department: "Operations",
      designation: "Logistics Supervisor",
      payrollPeriod: "October 2025",
      grossEarnings: 90000 + 12000 + 5000 + 3000, // 110000
      deductions: 9000 + 1000 + 500, // 10500
      netPay: 104500,
      paymentDate: "",
      paymentMode: "",
    },
    {
      empId: "EMP306",
      name: "Amna Yousaf",
      imageUrl: "/api/portraits/women/30.jpg",
      location: "Sialkot",
      department: "Customer Support",
      designation: "Support Executive",
      payrollPeriod: "October 2025",
      grossEarnings: 80000 + 10000 + 5000 + 3000, // 98000
      deductions: 8000 + 0 + 0, // 8000
      netPay: 90000,
      paymentDate: "Oct 31, 2025",
      paymentMode: "Bank Transfer",
    },
    {
      empId: "EMP307",
      name: "Hassan Javed",
      imageUrl: "/api/portraits/men/32.jpg",
      location: "Karachi",
      department: "IT",
      designation: "Frontend Developer",
      payrollPeriod: "October 2025",
      grossEarnings: 130000 + 20000 + 7000 + 6000, // 163000
      deductions: 13000 + 0 + 500, // 13500
      netPay: 150500,
      paymentDate: "Oct 31, 2025",
      paymentMode: "Bank Transfer",
    },
    {
      empId: "EMP308",
      name: "Kiran Abbas",
      imageUrl: "/api/portraits/women/38.jpg",
      location: "Lahore",
      department: "Legal",
      designation: "Compliance Officer",
      payrollPeriod: "October 2025",
      grossEarnings: 145000 + 22000 + 10000 + 5000, // 182000
      deductions: 14500 + 0 + 0, // 14500
      netPay: 167500,
      paymentDate: "Oct 31, 2025",
      paymentMode: "Bank Transfer",
    },
    {
      empId: "EMP309",
      name: "Usama Iqbal",
      imageUrl: "/api/portraits/men/45.jpg",
      location: "Islamabad",
      department: "IT",
      designation: "Backend Developer",
      payrollPeriod: "October 2025",
      grossEarnings: 155000 + 25000 + 9000 + 5000, // 199000
      deductions: 15500 + 1 * 1000 + 0, // assume 1 absence day = 1000, total 16500
      netPay: 178500,
      paymentDate: "",
      paymentMode: "",
    },
    {
      empId: "EMP310",
      name: "Hira Rehman",
      imageUrl: "/api/portraits/women/47.jpg",
      location: "Karachi",
      department: "Sales",
      designation: "Sales Executive",
      payrollPeriod: "October 2025",
      grossEarnings: 100000 + 15000 + 5000 + 5000, // 125000
      deductions: 10000 + 0 + 0, // 10000
      netPay: 110000,
      paymentDate: "Oct 31, 2025",
      paymentMode: "Bank Transfer",
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
  const types = mapSelectOptions(
    [
      { id: 2, name: "Present" },
      { id: 1, name: "Absent" },
      { id: 3, name: "Late" },
      { id: 3, name: "Leave" }
    ],
    "id",
    "name"
  );

  const bulkActions = mapSelectOptions(
    [
      { id: 'import', name: "Import Employees" },
      { id: 'export', name: "Export Employees" }
    ],
    "id",
    "name"
  );
  const allTags = [
    { id: 1, name: "Full-Time", bgColor: "#E6F4EA", textColor: "#137333" },
    { id: 2, name: "Part-Time", bgColor: "#FFF4E5", textColor: "#B06000" },
    { id: 3, name: "Contract", bgColor: "#E8F0FE", textColor: "#1A73E8" },
    { id: 4, name: "Remote", bgColor: "#FCE8E6", textColor: "#D93025" },
    { id: 5, name: "Intern", bgColor: "#F3E8FD", textColor: "#7B1FA2" },
    { id: 6, name: "On-Site", bgColor: "#E6F3FF", textColor: "#0059C1" },
    { id: 7, name: "Probation", bgColor: "#FFF9C4", textColor: "#827717" },
  ];

  const tags = mapSelectOptions(allTags,
    "id",
    "name"
  );

  const allColumns = [
    { key: "empId", label: "EMP ID" },
    { key: "name", label: "Name" },
    { key: "location", label: "Location" },
    { key: "department", label: "Department" },
    { key: "designation", label: "Designation" },
    { key: "joiningDate", label: "Joined" },
    { key: "manager", label: "Manager" },
    { key: "team", label: "Team" },
    { key: "empType", label: "EMP Type" },
    { key: "tags", label: "Tags" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
  ];

  const [visibleColumns, setVisibleColumns] = useState([, "empId", "name", "department", "location", "designation", "status", "action"]);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


  return (
    <Layout>
      <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-semibold text-gray-700">
            Salary Slips
          </h2>
          <Button type="button" variant="success">
            Export Payslips
          </Button>
        </div>



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
                name="locations"
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
                name="desig"
                value={designationVal}
                placeholder="Designation"
                onChange={setDesignationVal}
                options={departments}
                controlHeight="2rem"
              />
            </div>

            <div className="w-full md:w-[9rem] mb-1">
              <MonthPicker monthVal={monthVal} setMonthVal={setMonthVal} />
            </div>
            <Input
              type="date"
              name="date"
              noMargin={true}
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
            />
          </div>

        </div>


        <div className="overflow-x-auto -mt-2">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-3 text-left rounded-tl-md">Emp ID</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Department</th>
                <th className="px-4 py-3 text-left">Designation</th>
                <th className="px-4 py-3 text-left">Payroll Period</th>
                <th className="px-4 py-3 text-left">Gross Earnings</th>
                <th className="px-4 py-3 text-left">Deductions</th>
                <th className="px-4 py-3 text-left">Net Pay</th>
                <th className="px-4 py-3 text-left">Payment Date</th>
                <th className="px-4 py-3 text-left">Payment Mode</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-xxs">
              {paySlipData.map((row, idx) => (
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
                  <td className="px-4 py-3">{row.designation}</td>
                  <td className="px-4 py-3">{row.payrollPeriod}</td>
                  <td className="px-4 py-3">{row.grossEarnings.toLocaleString()}</td>
                  <td className="px-4 py-3">{row.deductions.toLocaleString()}</td>
                  <td className="px-4 py-3">{row.netPay.toLocaleString()}</td>
                  <td className="px-4 py-3">{row.paymentDate}</td>
                  <td className="px-4 py-3">{row.paymentMode}</td>
                  <RowActions
                    row={row}
                    actions={[
                      { label: "View Payslip", icon: MdOutlineRemoveRedEye, onClick: () => handleOpenModal() },
                      { label: "Download Payslip", icon: LuDownload }
                    ]}
                  />


                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isOpen && (
          <Modal width="w-full max-w-[794px]">
            <h2>Salary Slip</h2>
            <div className="flex justify-end pt-4">
              <Button variant="cancel" onClick={handleCloseModal}>
                Close
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </Layout>
  );
}
