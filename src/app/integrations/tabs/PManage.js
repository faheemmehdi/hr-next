import Input from "y@/app/components/Input";
import SearchBar from "y@/app/components/SearchBar";
import CustomSelect from "y@/app/components/CustomSelect";
import {
  FiCheckCircle, FiPower, FiRefreshCw
} from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import RowActions from "y@/app/components/RowActions";
import StatusDesign from "y@/app/components/StatusColors";

export default function ProjectManagement({

  departments = [],
  statuses = [],
  department,
  onDepartmentChange,
  designationVal,
  onDesignationChange,
  search,
  onSearch,
  status,
  onStatusChange,
  date,
  onDateChange,
  onReject
}) {

  const projects = [
    { value: "jira", label: "Jira" },
    { value: "trello", label: "Trello" },
    { value: "monday", label: "Monday.com" },
    { value: "asana", label: "Asana" },
    { value: "clickup", label: "ClickUp" },
  ];

  const statusOptions = [
    { value: 1, label: "Connected" },
    { value: 2, label: "Disconnected" },
    { value: 3, label: "Pending" },
  ];

  const initialProjects = [
  {
    projectId: "PM-001",
    projectName: "Jira",
    statusId: 1,
    status: "Connected",
    lastSync: "Feb 25, 2026 10:15",
    apiKey: "****-****-7890",
    description: "Used for tracking development tasks and sprints",
  },
  {
    projectId: "PM-002",
    projectName: "Trello",
    statusId: 2,
    status: "Disconnected",
    lastSync: "Feb 24, 2026 14:20",
    apiKey: "****-****-4567",
    description: "Kanban boards for task management and team collaboration",
  },
  {
    projectId: "PM-003",
    projectName: "Monday.com",
    statusId: 3,
    status: "Pending",
    lastSync: "Feb 23, 2026 09:45",
    apiKey: "****-****-1122",
    description: "Project planning and workflow automation platform",
  },
  {
    projectId: "PM-004",
    projectName: "Asana",
    statusId: 1,
    status: "Connected",
    lastSync: "Feb 26, 2026 08:30",
    apiKey: "****-****-3344",
    description: "Task and project management for teams and clients",
  },
  {
    projectId: "PM-005",
    projectName: "ClickUp",
    statusId: 2,
    status: "Disconnected",
    lastSync: "Feb 22, 2026 11:10",
    apiKey: "****-****-5566",
    description: "All-in-one project management and productivity tool",
  },
];

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <div>
      <div className="w-full flex justify-between flex-col md:flex-row items-center my-2 mt-1">
        <div className="w-full md:w-1/5 flex items-center mb-1">
          <SearchBar
            placeholder="Search by project or ID..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col md:flex-row justify-end items-center gap-2 mt-2 md:mt-2">
          <div className="mb-1 w-full md:w-[9rem]">
            <CustomSelect
              name="status"
              value={department}
              placeholder="Status"
              onChange={onDepartmentChange}
              options={statusOptions}
              controlHeight="2rem"
            />
          </div>
          <div className="mb-1 w-full md:w-[9rem]">
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
            <tr>
              <th className="px-4 py-3 text-left rounded-tl-md">Project ID</th>
              <th className="px-4 py-3 text-left">Project Name</th>
              <th className="px-4 py-3 text-left">API Key</th>
              <th className="px-4 py-3 text-left">Last Sync</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-xxs">
            {initialProjects.length > 0 ? (
              initialProjects.map((row, idx) => (
                <tr
                  key={row.projectId}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors`}
                >
                  <td className="px-4 py-3">{row.projectId}</td>
                  <td className="px-4 py-3">{row.projectName}</td>
                  <td className="px-4 py-3">{row.apiKey}</td>
                  <td className="px-4 py-3">{row.lastSync}</td>
                  <td className="px-4 py-3 truncate max-w-[120px]" title={row.description}>{row.description}</td>
                  <td className="px-4 py-3">
                    <StatusDesign statusId={row.statusId} label={row.status} />
                  </td>
                  <RowActions
                    row={row}
                    actions={[
                      { label: "View Details", icon: MdOutlineRemoveRedEye },
                      { label: "Connect", icon: FiCheckCircle, color: "green" },
                      { label: "Test Connection", icon: FiRefreshCw, color: "blue" },
                      { label: "Disconnect", icon: FiPower, color: "red" },
                    ]}
                  />
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500 italic">
                  No Project Management integrations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}