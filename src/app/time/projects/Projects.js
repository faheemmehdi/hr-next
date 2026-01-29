"use client";
import Layout from "y@/app/components/Layout";
import Input from "y@/app/components/Input";
import CheckboxDropdown from "y@/app/components/CheckboxDropdown";
import { useState, useEffect, useRef } from "react";
import SearchBar from "y@/app/components/SearchBar";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import CustomSelect from "y@/app/components/CustomSelect";
import { useRouter } from 'next/navigation';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaEye, FaEdit, FaCog, FaTrash, FaUserTie, FaTags } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import {
  FiUser, FiEdit2, FiX, FiEdit3
} from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuDownload } from "react-icons/lu";
import Button from "y@/app/components/Button";
import MonthPicker from "y@/app/components/MonthPicker";
import RowActions from "y@/app/components/RowActions";
import Modal from "y@/app/components/ModalShell";
import StatusDesign from "y@/app/components/StatusColors";
export default function Projects() {
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [designationVal, setDesignationVal] = useState("");
  const [monthVal, setMonthVal] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef();
  const router = useRouter();

  const [editingTag, setEditingTag] = useState(null);
  const [tagEditVal, setTagEditVal] = useState({
    name: "",
    bgColor: "#ffffff",
    textColor: "#000000",
  });



  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false)
  const projectsData = [
    {
      projectName: "Your Senior Team",
      projectCode: "YST",
      client: "Internal",
      projectManager: "Ahsan Qureshi",
      billable: false,
      startDate: "2025-01-01",
      endDate: null, // ongoing
      loggedHours: 1240,
      status: "Active",
      statusId: 1,
    },
    {
      projectName: "HR Management System",
      projectCode: "HRMS",
      client: "ABC Group",
      projectManager: "Sana Imran",
      billable: true,
      startDate: "2025-03-15",
      endDate: null,
      loggedHours: 860,
      status: "Active",
      statusId: 1,
    },
    {
      projectName: "Compliance & Legal Tracker",
      projectCode: "CLT",
      client: "Legal Associates",
      projectManager: "Kiran Abbas",
      billable: true,
      startDate: "2025-04-01",
      endDate: null,
      loggedHours: '',
      status: "Pending",
      statusId: 4,
    },
    {
      projectName: "E-Commerce Platform Revamp",
      projectCode: "ECOM",
      client: "Daraz Partner",
      projectManager: "Tahir Hussain",
      billable: true,
      startDate: "2024-11-01",
      endDate: "2025-04-30",
      loggedHours: 1520,
      status: "Completed",
      statusId: 3,
    },

    {
      projectName: "Sales CRM Integration",
      projectCode: "CRMINT",
      client: "SalesForce Partner",
      projectManager: "Hira Rehman",
      billable: true,
      startDate: "2025-06-10",
      endDate: null,
      loggedHours: '',
      status: "Pending",
      statusId: 4,
    },
    {
      projectName: "Warehouse Operations System",
      projectCode: "WOS",
      client: "LogiTrans Pvt Ltd",
      projectManager: "Zeeshan Arif",
      billable: true,
      startDate: "2024-09-10",
      endDate: "2025-02-28",
      loggedHours: 980,
      status: "Completed",
      statusId: 3,
    },
    {
      projectName: "Customer Support Portal",
      projectCode: "CSP",
      client: "HelpDesk Pro",
      projectManager: "Amna Yousaf",
      billable: true,
      startDate: "2025-05-01",
      endDate: null,
      loggedHours: 310,
      status: "On Hold",
      statusId: 2,
    },
    {
      projectName: "Frontend UI Kit",
      projectCode: "FUI",
      client: "Internal",
      projectManager: "Hassan Javed",
      billable: false,
      startDate: "2025-02-01",
      endDate: "2025-03-31",
      loggedHours: 220,
      status: "Completed",
      statusId: 3,
    },

    {
      projectName: "API Performance Optimization",
      projectCode: "APIOPT",
      client: "TechNova",
      projectManager: "Usama Iqbal",
      billable: true,
      startDate: "2025-07-01",
      endDate: null,
      loggedHours: 190,
      status: "Active",
      statusId: 1,
    },
    {
      projectName: "Marketing Automation Tool",
      projectCode: "MAT",
      client: "Creative Minds",
      projectManager: "Nimra Gul",
      billable: true,
      startDate: "2025-06-01",
      endDate: null,
      loggedHours: 430,
      status: "On Hold",
      statusId: 2,
    },
  ];





  const locations = mapSelectOptions(
    [
      { id: 1, name: "Lahore" },
      { id: 2, name: "Multan" },
      { id: 4, name: "Karachi" },
      { id: 5, name: "Islamabad" },
      { id: 6, name: "Shaher Sultan" },
      { id: 7, name: "Rawalpindi" },
      { id: 8, name: "Kohat" },
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
  const statuses = mapSelectOptions(
    [
      { id: 1, name: "Pending" },
      { id: 2, name: "Active" },
      { id: 3, name: "On Hold" },
      { id: 4, name: "Completed" }
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
            Projects
          </h2>
          <Button type="button" variant="success" onClick={() => router.push('/time/projects/create/')}>
            Create Project
          </Button>
        </div>



        <div className="w-full flex justify-between flex-col md:flex-row items-center my-2 mt-5">
          <div className="w-full md:w-1/5 flex items-center mb-1">
            <SearchBar
              placeholder="Search by name or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col md:flex-row justify-end items-center gap-2 mt-2 md:mt-0">

            <div className="mb-1 w-full md:w-[9rem]">
              <CustomSelect
                name="status"
                value={status}
                placeholder="Status"
                onChange={setStatus}
                options={statuses}
                controlHeight="2rem"
              />
            </div>

            <div className="w-full md:w-[9rem]">
              <Input
                type="date"
                name="date"
                noMargin={true}
                value={date}
                onChange={(e) => onDateChange(e.target.value)}
              />
            </div>



          </div>

        </div>


        <div className="overflow-x-auto shadow-md border border-gray-200 rounded max-h-[72vh]">
          <table className="w-full text-xs border-collapse">
            <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-3 text-left rounded-tl-md">Code</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Client</th>
                <th className="px-4 py-3 text-left">Manager</th>
                <th className="px-4 py-3 text-left">Billable</th>
                <th className="px-4 py-3 text-left">Start</th>
                <th className="px-4 py-3 text-left">End</th>
                <th className="px-4 py-3 text-left">Logged Hours</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-xxs">
              {projectsData && projectsData.length > 0 ? (

                projectsData.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition-colors`}
                  >
                    <td className="px-4 py-3">{row.projectCode}</td>
                    <td className="px-4 py-3 truncate max-w-[150px]" title={row.projectName}>{row.projectName}</td>
                    <td className="px-4 py-3">{row.client}</td>
                    <td className="px-4 py-3">{row.projectManager}</td>
                    <td className="px-4 py-3">{row.billable ? "Yes" : "No"}</td>
                    <td className="px-4 py-3">{row.startDate}</td>
                    <td className="px-4 py-3">{row.endDate}</td>
                    <td className="px-4 py-3">{row.loggedHours}</td>
                    <td className="px-4 py-3">
                      <StatusDesign statusId={row.statusId} label={row.status} />
                    </td>
                    <RowActions
                      row={row}
                      actions={[
                        { label: "View Project", icon: MdOutlineRemoveRedEye, onClick: handleOpenModal },
                        { label: "Edit Project", icon: FiEdit3 },
                      ]}
                    />
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="text-center py-4 text-gray-500 italic">
                    No project found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {isOpen && (
          <Modal width="w-full max-w-[794px]">
            <h2>Project Detail</h2>
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
