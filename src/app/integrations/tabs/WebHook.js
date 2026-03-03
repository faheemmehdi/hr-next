import Input from "y@/app/components/Input";
import SearchBar from "y@/app/components/SearchBar";
import CustomSelect from "y@/app/components/CustomSelect";
import {
  FiCheckCircle, FiPower, FiRefreshCw
} from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import RowActions from "y@/app/components/RowActions";
import StatusDesign from "y@/app/components/StatusColors";

export default function Webhooks({

  departments = [],
  statuses = [],
  department,
  onDepartmentChange,
  search,
  onSearch,
  date,
  onDateChange,
}) {

  const events = [
    { value: "lead_created", label: "Lead Created" },
    { value: "payment_success", label: "Payment Success" },
    { value: "task_completed", label: "Task Completed" },
    { value: "invoice_generated", label: "Invoice Generated" },
  ];

  const statusOptions = [
    { value: 1, label: "Active" },
    { value: 2, label: "Inactive" },
  ];

  const initialWebhooks = [
    {
      webhookId: "WH-001",
      webhookName: "CRM Lead Created",
      event: "Lead Created",
      url: "https://crm.example.com/webhook",
      method: "POST",
      secretKey: "****-****-abcd",
      statusId: 1,
      status: "Active",
      lastTriggered: "Feb 25, 2026 10:00",
      description: "Triggered when a new lead is created in CRM",
    },
    {
      webhookId: "WH-002",
      webhookName: "Payment Gateway Success",
      event: "Payment Success",
      url: "https://payments.example.com/webhook",
      method: "POST",
      secretKey: "****-****-efgh",
      statusId: 1,
      status: "Active",
      lastTriggered: "Feb 24, 2026 14:20",
      description: "Triggered when a payment is successful",
    },
    {
      webhookId: "WH-003",
      webhookName: "Task Completed Notification",
      event: "Task Completed",
      url: "https://tasks.example.com/webhook",
      method: "POST",
      secretKey: "****-****-ijkl",
      statusId: 2,
      status: "Inactive",
      lastTriggered: "Feb 23, 2026 09:45",
      description: "Triggered when a task is marked completed",
    },
    {
      webhookId: "WH-004",
      webhookName: "Invoice Generated Alert",
      event: "Invoice Generated",
      url: "https://finance.example.com/webhook",
      method: "POST",
      secretKey: "****-****-mnop",
      statusId: 1,
      status: "Active",
      lastTriggered: "Feb 22, 2026 08:30",
      description: "Triggered when a new invoice is generated",
    },
    {
      webhookId: "WH-005",
      webhookName: "Custom Event Webhook",
      event: "Custom Event",
      url: "https://custom.example.com/webhook",
      method: "POST",
      secretKey: "****-****-qrst",
      statusId: 2,
      status: "Inactive",
      lastTriggered: "Feb 21, 2026 11:10",
      description: "Triggered for custom event notifications",
    },
  ];

  return (
    <div>
      <div className="w-full flex justify-between flex-col md:flex-row items-center my-2 mt-1">
        <div className="w-full md:w-1/5 flex items-center mb-1">
          <SearchBar
            placeholder="Search by name or event..."
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
              <th className="px-4 py-3 text-left rounded-tl-md">Webhook ID</th>
              <th className="px-4 py-3 text-left">Webhook Name</th>
              <th className="px-4 py-3 text-left">Event</th>
              <th className="px-4 py-3 text-left">URL</th>
              <th className="px-4 py-3 text-left">Method</th>
              <th className="px-4 py-3 text-left">Secret Key</th>
              <th className="px-4 py-3 text-left">Last Triggered</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-xxs">
            {initialWebhooks.length > 0 ? (
              initialWebhooks.map((row, idx) => (
                <tr
                  key={row.webhookId}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors`}
                >
                  <td className="px-4 py-3">{row.webhookId}</td>
                  <td className="px-4 py-3">{row.webhookName}</td>
                  <td className="px-4 py-3">{row.event}</td>
                  <td className="px-4 py-3 truncate max-w-[140px]" title={row.url}>{row.url}</td>
                  <td className="px-4 py-3">{row.method}</td>
                  <td className="px-4 py-3">{row.secretKey}</td>
                  <td className="px-4 py-3">{row.lastTriggered}</td>
                  <td className="px-4 py-3 truncate max-w-[120px]" title={row.description}>{row.description}</td>
                  <td className="px-4 py-3">
                    <StatusDesign statusId={row.statusId} label={row.status} />
                  </td>
                  <RowActions
                    row={row}
                    actions={[
                      { label: "View Details", icon: MdOutlineRemoveRedEye },
                      { label: "Test Webhook", icon: FiRefreshCw, color: "blue" },
                      { label: "Disconnect", icon: FiPower, color: "red" },
                    ]}
                  />
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="text-center py-4 text-gray-500 italic">
                  No Webhooks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}