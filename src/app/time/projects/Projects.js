"use client";
import Layout from "y@/app/components/Layout";
import Input from "y@/app/components/Input";
import { useMemo, useState } from "react";
import SearchBar from "y@/app/components/SearchBar";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import CustomSelect from "y@/app/components/CustomSelect";
import { useRouter } from 'next/navigation';
import {
  FiEdit3
} from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Button from "y@/app/components/Button";
import RowActions from "y@/app/components/RowActions";
import Modal from "y@/app/components/ModalShell";
import StatusDesign from "y@/app/components/StatusColors";
export default function Projects() {
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const router = useRouter();



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

  const filteredProjects = useMemo(() => {
    const q = search.trim().toLowerCase();
    return projectsData.filter((project) => {
      const matchesSearch =
        !q ||
        project.projectName.toLowerCase().includes(q) ||
        project.projectCode.toLowerCase().includes(q) ||
        project.client.toLowerCase().includes(q) ||
        project.projectManager.toLowerCase().includes(q);
      const matchesStatus = !status || project.status === status;
      const matchesDate = !date || project.startDate === date || project.endDate === date;
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [projectsData, search, status, date]);


  return (
    <Layout>
      <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-base font-semibold text-gray-700">
              Projects
            </h2>
            <p className="text-xxs text-gray-500 mt-0.5">
              Manage project lifecycle, ownership, and logged effort from one place.
            </p>
          </div>
          <Button type="button" variant="success" onClick={() => router.push('/time/projects/create/')}>
            Create Project
          </Button>
        </div>



        <div className="w-full flex justify-between flex-col md:flex-row items-center my-2 mt-5 p-3 rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="w-full md:w-1/5 flex items-center mb-1">
            <SearchBar
              placeholder="Search by name or code..."
              onSearch={setSearch}
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
                onChange={(e) => setDate(e.target.value)}
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
              {filteredProjects && filteredProjects.length > 0 ? (

                filteredProjects.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition-colors`}
                  >
                    <td className="px-4 py-3">{row.projectCode}</td>
                    <td className="px-4 py-3 truncate max-w-[150px]" title={row.projectName}>{row.projectName}</td>
                    <td className="px-4 py-3">{row.client}</td>
                    <td className="px-4 py-3">{row.projectManager}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-semibold ${row.billable ? "bg-[#effaf3] text-[#2f7d4f]" : "bg-[#fff4e8] text-[#9a5d1d]"}`}>
                        {row.billable ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-4 py-3">{row.startDate}</td>
                    <td className="px-4 py-3">{row.endDate || "-"}</td>
                    <td className="px-4 py-3">{row.loggedHours}</td>
                    <td className="px-4 py-3">
                      <StatusDesign statusId={row.statusId} label={row.status} />
                    </td>
                    <RowActions
                      row={row}
                      actions={[
                        {
                          label: "View Project",
                          icon: MdOutlineRemoveRedEye,
                          onClick: (rowData) => {
                            setSelectedProject(rowData);
                            handleOpenModal();
                          },
                        },
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
            <div className="border-b border-gray-300 pb-3 mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Project Detail</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-700">
              <p><span className="font-semibold">Code:</span> {selectedProject?.projectCode || "-"}</p>
              <p><span className="font-semibold">Name:</span> {selectedProject?.projectName || "-"}</p>
              <p><span className="font-semibold">Client:</span> {selectedProject?.client || "-"}</p>
              <p><span className="font-semibold">Manager:</span> {selectedProject?.projectManager || "-"}</p>
              <p><span className="font-semibold">Start:</span> {selectedProject?.startDate || "-"}</p>
              <p><span className="font-semibold">End:</span> {selectedProject?.endDate || "-"}</p>
              <p><span className="font-semibold">Billable:</span> {selectedProject?.billable ? "Yes" : "No"}</p>
              <p><span className="font-semibold">Logged Hours:</span> {selectedProject?.loggedHours || 0}</p>
            </div>
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
