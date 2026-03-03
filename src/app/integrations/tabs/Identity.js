import Input from "y@/app/components/Input";
import SearchBar from "y@/app/components/SearchBar";
import CustomSelect from "y@/app/components/CustomSelect";
import {
  FiView, FiCheckCircle, FiPower, FiRefreshCw
} from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import RowActions from "y@/app/components/RowActions";
import StatusDesign from "y@/app/components/StatusColors";
export default function Identity({

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
    { value: "jumio", label: "Jumio" },
    { value: "onfido", label: "Onfido" },
    { value: "veriff", label: "Veriff" },
  ];

  const statusOptions = [
    { value: 1, label: "Connected" },
    { value: 2, label: "Disconnected" },
    { value: 3, label: "Pending" },
  ];

  const initialProviders = [
    {
      providerId: "001",
      providerName: "Jumio",
      statusId: 1,
      status: "Connected",
      lastSync: "Feb 25, 2026 10:15",
      apiKey: "****-****-1234",
    },
    {
      providerId: "002",
      providerName: "Onfido",
      statusId: 2,
      status: "Disconnected",
      lastSync: "Feb 24, 2026 14:20",
      apiKey: "****-****-5678",
    },
    {
      providerId: "003",
      providerName: "Veriff",
      statusId: 3,
      status: "Pending",
      lastSync: "Feb 23, 2026 09:45",
      apiKey: "****-****-9876",
    },
    {
      providerId: "004",
      providerName: "Trulioo",
      statusId: 1,
      status: "Connected",
      lastSync: "Feb 26, 2026 08:30",
      apiKey: "****-****-4321",
    },
    {
      providerId: "005",
      providerName: "IDnow",
      statusId: 2,
      status: "Disconnected",
      lastSync: "Feb 22, 2026 11:10",
      apiKey: "****-****-8765",
    },
    {
      providerId: "006",
      providerName: "ShuftiPro",
      statusId: 3,
      status: "Pending",
      lastSync: "Feb 20, 2026 13:55",
      apiKey: "****-****-6543",
    },
    {
      providerId: "007",
      providerName: "Sumsub",
      statusId: 1,
      status: "Connected",
      lastSync: "Feb 26, 2026 12:00",
      apiKey: "****-****-1111",
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
              <th className="px-4 py-3 text-left">Last Sync</th>
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
                  <td className="px-4 py-3">{row.lastSync}</td>
                  <td className="px-4 py-3">
                    <StatusDesign statusId={row.statusId} label={row.status} />
                  </td>
                  <RowActions
                    row={row}
                    actions={[
                      { label: "View Provider", icon: MdOutlineRemoveRedEye },
                      { label: "Connect", icon: FiCheckCircle, color: "green" },
                      { label: "Test Connection", icon: FiRefreshCw, color: "blue" },
                      { label: "Disconnect", icon: FiPower, color: "red" },
                    ]}
                  />
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center py-4 text-gray-500 italic">
                  No employee identity records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}