import Input from "y@/app/components/Input";
import SearchBar from "y@/app/components/SearchBar";
import CustomSelect from "y@/app/components/CustomSelect";
import {
  FiView, FiCheckCircle, FiPower, FiRefreshCw
} from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import RowActions from "y@/app/components/RowActions";
import StatusDesign from "y@/app/components/StatusColors";
export default function Esign({

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
  const providers = [
    { value: "docusign", label: "DocuSign" },
    { value: "adobe_sign", label: "Adobe Acrobat Sign" },
    { value: "dropbox_sign", label: "Dropbox Sign" },
    { value: "pandadoc", label: "PandaDoc" },
    { value: "zoho_sign", label: "Zoho Sign" },
  ];

  const statusOptions = [
    { value: 1, label: "Connected" },
    { value: 2, label: "Disconnected" },
    { value: 3, label: "Pending" },
  ];

  const initialProviders = [
  {
    providerId: "ES-001",
    providerName: "DocuSign",
    statusId: 1,
    status: "Connected",
    lastSync: "Feb 25, 2026 10:15",
    apiKey: "****-****-7890",
    secretKey: "****-****-abcd",               // added
    description: "Used for employee contracts", // added
  },
  {
    providerId: "ES-002",
    providerName: "Adobe Acrobat Sign",
    statusId: 2,
    status: "Disconnected",
    lastSync: "Feb 24, 2026 14:20",
    apiKey: "****-****-4567",
    secretKey: "****-****-efgh",
    description: "Client onboarding documents",
  },
  {
    providerId: "ES-003",
    providerName: "Dropbox Sign",
    statusId: 3,
    status: "Pending",
    lastSync: "Feb 23, 2026 09:45",
    apiKey: "****-****-1122",
    secretKey: "****-****-ijkl",
    description: "Contracts and NDAs",
  },
  {
    providerId: "ES-004",
    providerName: "PandaDoc",
    statusId: 1,
    status: "Connected",
    lastSync: "Feb 26, 2026 08:30",
    apiKey: "****-****-3344",
    secretKey: "****-****-mnop",
    description: "Client proposals and quotes",
  },
  {
    providerId: "ES-005",
    providerName: "Zoho Sign",
    statusId: 2,
    status: "Disconnected",
    lastSync: "Feb 22, 2026 11:10",
    apiKey: "****-****-5566",
    secretKey: "****-****-qrst",
    description: "Legal documents",
  },
];

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <div>
      <div className="w-full flex justify-between flex-col md:flex-row items-center my-2 mt-1">
        <div className="w-full md:w-1/5 flex items-center mb-1">
          <SearchBar
            placeholder="Search by name or ID..."
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
              <th className="px-4 py-3 text-left rounded-tl-md">Provider ID</th>
              <th className="px-4 py-3 text-left">Provider Name</th>
              <th className="px-4 py-3 text-left">API Key</th>
              <th className="px-4 py-3 text-left">Secret Key</th>
              <th className="px-4 py-3 text-left">Last Sync</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-xxs">
            {initialProviders.length > 0 ? (
              initialProviders.map((row, idx) => (
                <tr
                  key={row.providerId}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors`}
                >
                  <td className="px-4 py-3">{row.providerId}</td>
                  <td className="px-4 py-3">{row.providerName}</td>
                  <td className="px-4 py-3">{row.apiKey}</td>
                  <td className="px-4 py-3">{row.secretKey}</td>
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
                      { label: "Test API", icon: FiRefreshCw, color: "blue" },
                      { label: "Disconnect", icon: FiPower, color: "red" },
                    ]}
                  />
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center py-4 text-gray-500 italic">
                  No E-Sign providers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}