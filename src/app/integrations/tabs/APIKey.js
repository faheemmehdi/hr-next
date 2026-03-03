import Input from "y@/app/components/Input";
import SearchBar from "y@/app/components/SearchBar";
import CustomSelect from "y@/app/components/CustomSelect";
import {
  FiCopy, FiPower, FiRefreshCw
} from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import RowActions from "y@/app/components/RowActions";
import StatusDesign from "y@/app/components/StatusColors";

export default function APIKeys({
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

  const statusOptions = [
    { value: 1, label: "Active" },
    { value: 2, label: "Inactive" },
  ];

  const initialKeys = [
    {
      keyId: "API-001",
      keyName: "CRM App Key",
      secretKey: "****-****-abcd",
      statusId: 1,
      status: "Active",
      createdAt: "Feb 20, 2026",
      lastUsed: "Feb 25, 2026 10:00",
      description: "Used for CRM integrations",
    },
    {
      keyId: "API-002",
      keyName: "Mobile App Key",
      secretKey: "****-****-efgh",
      statusId: 2,
      status: "Inactive",
      createdAt: "Feb 18, 2026",
      lastUsed: "Feb 22, 2026 15:30",
      description: "Mobile app integration key",
    },
    {
      keyId: "API-003",
      keyName: "Payment Gateway Key",
      secretKey: "****-****-ijkl",
      statusId: 1,
      status: "Active",
      createdAt: "Feb 15, 2026",
      lastUsed: "Feb 24, 2026 09:20",
      description: "Used for payment processing",
    },
    {
      keyId: "API-004",
      keyName: "Analytics Dashboard Key",
      secretKey: "****-****-mnop",
      statusId: 1,
      status: "Active",
      createdAt: "Feb 12, 2026",
      lastUsed: "Feb 25, 2026 11:45",
      description: "Integration key for analytics dashboards",
    },
    {
      keyId: "API-005",
      keyName: "Marketing Automation Key",
      secretKey: "****-****-qrst",
      statusId: 2,
      status: "Inactive",
      createdAt: "Feb 10, 2026",
      lastUsed: "Feb 20, 2026 13:00",
      description: "Used for email campaigns and marketing automation",
    },

  ];

  return (
    <div>
      <div className="w-full flex justify-between flex-col md:flex-row items-center my-2 mt-1">
        <div className="w-full md:w-1/5 flex items-center mb-1">
          <SearchBar
            placeholder="Search by Key Name or ID..."
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
              <th className="px-4 py-3 text-left rounded-tl-md">Key ID</th>
              <th className="px-4 py-3 text-left">Key Name</th>
              <th className="px-4 py-3 text-left">Secret Key</th>
              <th className="px-4 py-3 text-left">Created At</th>
              <th className="px-4 py-3 text-left">Last Used</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-xxs">
            {initialKeys.length > 0 ? (
              initialKeys.map((row, idx) => (
                <tr
                  key={row.keyId}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors`}
                >
                  <td className="px-4 py-3">{row.keyId}</td>
                  <td className="px-4 py-3">{row.keyName}</td>
                  <td className="px-4 py-3">{row.secretKey}</td>
                  <td className="px-4 py-3">{row.createdAt}</td>
                  <td className="px-4 py-3">{row.lastUsed}</td>
                  <td className="px-4 py-3 truncate max-w-[120px]" title={row.description}>{row.description}</td>
                  <td className="px-4 py-3">
                    <StatusDesign statusId={row.statusId} label={row.status} />
                  </td>
                  <RowActions
                    row={row}
                    actions={[
                      { label: "View Details", icon: MdOutlineRemoveRedEye },
                      { label: "Copy Key", icon: FiCopy, color: "blue" },
                      { label: "Deactivate", icon: FiPower, color: "red" },
                      { label: "Test API", icon: FiRefreshCw, color: "green" },
                    ]}
                  />
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500 italic">
                  No API Keys found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}