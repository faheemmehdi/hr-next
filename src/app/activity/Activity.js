"use client";

import { useMemo, useState } from "react";
import Layout from "y@/app/components/Layout";
import Button from "y@/app/components/Button";
import SearchBar from "y@/app/components/SearchBar";
import CustomSelect from "y@/app/components/CustomSelect";
import RowActions from "y@/app/components/RowActions";
import Modal from "y@/app/components/ModalShell";
import StatusDesign from "y@/app/components/StatusColors";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import {
  FiActivity,
  FiClock,
  FiDownload,
  FiEye,
  FiRefreshCw,
  FiShield,
  FiTrendingUp,
  FiUserCheck,
} from "react-icons/fi";

const activitySeed = [
  {
    id: 1,
    actor: "Ahsan Qureshi",
    module: "Employees",
    action: "Profile Updated",
    target: "EMP-1001",
    ip: "39.37.202.14",
    device: "Chrome / Windows",
    status: "Success",
    statusId: 1,
    timestamp: "2026-04-14T09:15:00",
    details: "Updated employee job details and manager assignment.",
  },
  {
    id: 2,
    actor: "HR Admin",
    module: "Attendance",
    action: "Regularization Approved",
    target: "REQ-4892",
    ip: "10.10.3.22",
    device: "Edge / Windows",
    status: "Success",
    statusId: 1,
    timestamp: "2026-04-14T10:04:00",
    details: "Approved late check-in regularization request.",
  },
  {
    id: 3,
    actor: "Zubair Khan",
    module: "Payroll",
    action: "Salary Run Initiated",
    target: "RUN-APR-2026",
    ip: "10.10.5.19",
    device: "Chrome / macOS",
    status: "In Progress",
    statusId: 5,
    timestamp: "2026-04-14T10:31:00",
    details: "Started payroll run for April 2026.",
  },
  {
    id: 4,
    actor: "System",
    module: "Security",
    action: "Suspicious Login Blocked",
    target: "USR-889",
    ip: "182.188.54.77",
    device: "Unknown",
    status: "Warning",
    statusId: 3,
    timestamp: "2026-04-14T11:02:00",
    details: "Blocked login due to failed MFA attempts.",
  },
  {
    id: 5,
    actor: "Ali Imran",
    module: "Contracts",
    action: "E-Sign Reminder Sent",
    target: "DOC-NDA-0042",
    ip: "10.10.2.14",
    device: "Safari / macOS",
    status: "Success",
    statusId: 1,
    timestamp: "2026-04-14T11:33:00",
    details: "Manual reminder sent to pending signer.",
  },
  {
    id: 6,
    actor: "Maryam Fatima",
    module: "Leave",
    action: "Leave Request Rejected",
    target: "LEV-622",
    ip: "39.41.122.10",
    device: "Chrome / Android",
    status: "Failed",
    statusId: 2,
    timestamp: "2026-04-14T12:10:00",
    details: "Rejected due to insufficient leave balance.",
  },
  {
    id: 7,
    actor: "Talent Partner",
    module: "Recruitment",
    action: "Interview Scheduled",
    target: "APP-2201",
    ip: "10.10.4.91",
    device: "Firefox / Linux",
    status: "Success",
    statusId: 1,
    timestamp: "2026-04-14T12:27:00",
    details: "Round-2 interview scheduled with engineering panel.",
  },
  {
    id: 8,
    actor: "System",
    module: "Integrations",
    action: "Biometric Sync Failed",
    target: "SYNC-BIO-33",
    ip: "10.10.9.9",
    device: "Server",
    status: "Failed",
    statusId: 2,
    timestamp: "2026-04-14T12:59:00",
    details: "Device heartbeat timeout from terminal #3.",
  },
];

const formatDateTime = (iso) => {
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = d.getFullYear();
  const time = d.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return `${day} ${month} ${year}, ${time}`;
};

export default function Activity() {
  const [rows] = useState(activitySeed);
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const moduleOptions = mapSelectOptions(
    [
      { id: "Employees", name: "Employees" },
      { id: "Attendance", name: "Attendance" },
      { id: "Payroll", name: "Payroll" },
      { id: "Security", name: "Security" },
      { id: "Contracts", name: "Contracts" },
      { id: "Leave", name: "Leave" },
      { id: "Recruitment", name: "Recruitment" },
      { id: "Integrations", name: "Integrations" },
    ],
    "id",
    "name"
  );

  const actionOptions = mapSelectOptions(
    [
      { id: "Profile Updated", name: "Profile Updated" },
      { id: "Regularization Approved", name: "Regularization Approved" },
      { id: "Salary Run Initiated", name: "Salary Run Initiated" },
      { id: "Suspicious Login Blocked", name: "Suspicious Login Blocked" },
      { id: "E-Sign Reminder Sent", name: "E-Sign Reminder Sent" },
      { id: "Leave Request Rejected", name: "Leave Request Rejected" },
      { id: "Interview Scheduled", name: "Interview Scheduled" },
      { id: "Biometric Sync Failed", name: "Biometric Sync Failed" },
    ],
    "id",
    "name"
  );

  const statusOptions = mapSelectOptions(
    [
      { id: "Success", name: "Success" },
      { id: "In Progress", name: "In Progress" },
      { id: "Warning", name: "Warning" },
      { id: "Failed", name: "Failed" },
    ],
    "id",
    "name"
  );

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      const matchesSearch =
        !q ||
        r.actor.toLowerCase().includes(q) ||
        r.action.toLowerCase().includes(q) ||
        r.module.toLowerCase().includes(q) ||
        r.target.toLowerCase().includes(q) ||
        r.ip.toLowerCase().includes(q);

      const matchesModule = !moduleFilter || r.module === moduleFilter;
      const matchesAction = !actionFilter || r.action === actionFilter;
      const matchesStatus = !statusFilter || r.status === statusFilter;
      return matchesSearch && matchesModule && matchesAction && matchesStatus;
    });
  }, [rows, search, moduleFilter, actionFilter, statusFilter]);

  const dashboardMetrics = useMemo(() => {
    const success = filteredRows.filter((r) => r.status === "Success").length;
    const failed = filteredRows.filter((r) => r.status === "Failed").length;
    const sensitive = filteredRows.filter((r) => r.module === "Security").length;
    return {
      total: filteredRows.length,
      success,
      failed,
      sensitive,
    };
  }, [filteredRows]);

  const openDetail = (row) => {
    setSelectedRow(row);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setSelectedRow(null);
    setIsDetailOpen(false);
  };

  const handleExport = () => {
    if (filteredRows.length === 0) return;
    const headers = ["Actor", "Module", "Action", "Target", "IP", "Device", "Status", "Timestamp"];
    const records = filteredRows.map((r) => [
      r.actor,
      r.module,
      r.action,
      r.target,
      r.ip,
      r.device,
      r.status,
      formatDateTime(r.timestamp),
    ]);
    const csv = [headers, ...records]
      .map((cols) => cols.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "activity-log.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const timelineRows = filteredRows.slice(0, 7);

  return (
    <Layout>
      <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-gray-700">Activity Center</h2>
            <p className="text-xxs text-gray-500">Track user and system operations across modules with searchable audit context.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="secondary" onClick={() => {
              setSearch("");
              setModuleFilter("");
              setActionFilter("");
              setStatusFilter("");
            }}>
              <span className="inline-flex items-center gap-1.5">
                <FiRefreshCw size={13} />
                Refresh
              </span>
            </Button>
            <Button type="button" variant="success" onClick={handleExport}>
              <span className="inline-flex items-center gap-1.5">
                <FiDownload size={13} />
                Export
              </span>
            </Button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 xl:grid-cols-4 gap-3">
          <div className="rounded-lg border border-gray-200 bg-[#f8fbff] p-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-gray-500">Total Events</p>
              <FiActivity className="text-[#315d9c]" size={13} />
            </div>
            <p className="mt-1 text-sm font-semibold text-gray-800">{dashboardMetrics.total}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-[#f4fbf6] p-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-gray-500">Successful</p>
              <FiTrendingUp className="text-[#2f7d4f]" size={13} />
            </div>
            <p className="mt-1 text-sm font-semibold text-gray-800">{dashboardMetrics.success}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-[#fff7f7] p-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-gray-500">Failed</p>
              <FiClock className="text-[#a34a4a]" size={13} />
            </div>
            <p className="mt-1 text-sm font-semibold text-gray-800">{dashboardMetrics.failed}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-[#f8f7ff] p-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-gray-500">Sensitive (Security)</p>
              <FiShield className="text-[#5f54b7]" size={13} />
            </div>
            <p className="mt-1 text-sm font-semibold text-gray-800">{dashboardMetrics.sensitive}</p>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-[#d8e6ff] bg-[#f4f8ff] px-3 py-2 flex items-center justify-between">
          <p className="inline-flex items-center gap-2 text-[11px] text-[#315d9c] font-medium">
            <FiUserCheck size={13} />
            Activity records include actor, source, and status context for traceability.
          </p>
          <p className="text-[11px] text-[#315d9c] font-medium">{filteredRows.length} visible records</p>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5">
          <div className="w-full md:w-1/4 flex items-center mb-1">
            <SearchBar placeholder="Search actor, module, target, IP..." onSearch={setSearch} />
          </div>
          <div className="w-full flex items-center justify-end flex-col md:flex-row mt-2 md:mt-0 gap-2">
            <div className="mb-1 w-full md:w-[10rem]">
              <CustomSelect
                name="activity_module"
                value={moduleFilter}
                placeholder="Module"
                onChange={setModuleFilter}
                options={moduleOptions}
                controlHeight="2rem"
              />
            </div>
            <div className="mb-1 w-full md:w-[12rem]">
              <CustomSelect
                name="activity_action"
                value={actionFilter}
                placeholder="Action"
                onChange={setActionFilter}
                options={actionOptions}
                controlHeight="2rem"
              />
            </div>
            <div className="mb-1 w-full md:w-[10rem]">
              <CustomSelect
                name="activity_status"
                value={statusFilter}
                placeholder="Status"
                onChange={setStatusFilter}
                options={statusOptions}
                controlHeight="2rem"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 mt-3">
          <div className="xl:col-span-8 overflow-x-auto shadow-md border border-gray-200 rounded max-h-[72vh]">
            <table className="w-full text-xs border-collapse">
              <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left">Time</th>
                  <th className="px-4 py-3 text-left">Actor</th>
                  <th className="px-4 py-3 text-left">Module</th>
                  <th className="px-4 py-3 text-left">Action</th>
                  <th className="px-4 py-3 text-left">Target</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="text-xxs">
                {filteredRows.length > 0 ? (
                  filteredRows.map((row, idx) => (
                    <tr
                      key={row.id}
                      className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors`}
                    >
                      <td className="px-4 py-3 whitespace-nowrap">{formatDateTime(row.timestamp)}</td>
                      <td className="px-4 py-3">{row.actor}</td>
                      <td className="px-4 py-3">{row.module}</td>
                      <td className="px-4 py-3">{row.action}</td>
                      <td className="px-4 py-3">{row.target}</td>
                      <td className="px-4 py-3">
                        <StatusDesign statusId={row.statusId} label={row.status} />
                      </td>
                      <RowActions
                        row={row}
                        actions={[
                          {
                            label: "View Detail",
                            icon: FiEye,
                            onClick: (r) => openDetail(r),
                          },
                        ]}
                      />
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-gray-500 italic">
                      No activity records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="xl:col-span-4 rounded-lg border border-gray-200 bg-white shadow-sm p-4 max-h-[72vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700">Recent Timeline</h3>
              <span className="text-[10px] text-gray-500">{timelineRows.length} items</span>
            </div>
            <div className="mt-3 space-y-3">
              {timelineRows.length > 0 ? (
                timelineRows.map((row) => (
                  <div key={`timeline-${row.id}`} className="rounded border border-gray-200 p-3 bg-gray-50">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xxs font-semibold text-gray-800">{row.action}</p>
                      <StatusDesign statusId={row.statusId} label={row.status} />
                    </div>
                    <p className="text-[11px] text-gray-600 mt-1">
                      {row.actor} • {row.module}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{formatDateTime(row.timestamp)}</p>
                  </div>
                ))
              ) : (
                <p className="text-xxs text-gray-500 italic">No timeline events for current filters.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {isDetailOpen && selectedRow && (
        <Modal width="w-full md:w-6/12">
          <div className="border-b border-gray-200 pb-3 mb-4">
            <h3 className="text-base font-semibold text-gray-800">Activity Detail</h3>
            <p className="text-xxs text-gray-500">Detailed event context for investigation and auditing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xxs text-gray-700">
            <div className="rounded border border-gray-200 p-2">
              <p className="text-gray-500">Actor</p>
              <p className="font-semibold text-gray-800 mt-0.5">{selectedRow.actor}</p>
            </div>
            <div className="rounded border border-gray-200 p-2">
              <p className="text-gray-500">Module</p>
              <p className="font-semibold text-gray-800 mt-0.5">{selectedRow.module}</p>
            </div>
            <div className="rounded border border-gray-200 p-2">
              <p className="text-gray-500">Action</p>
              <p className="font-semibold text-gray-800 mt-0.5">{selectedRow.action}</p>
            </div>
            <div className="rounded border border-gray-200 p-2">
              <p className="text-gray-500">Target</p>
              <p className="font-semibold text-gray-800 mt-0.5">{selectedRow.target}</p>
            </div>
            <div className="rounded border border-gray-200 p-2">
              <p className="text-gray-500">IP</p>
              <p className="font-semibold text-gray-800 mt-0.5">{selectedRow.ip}</p>
            </div>
            <div className="rounded border border-gray-200 p-2">
              <p className="text-gray-500">Device</p>
              <p className="font-semibold text-gray-800 mt-0.5">{selectedRow.device}</p>
            </div>
            <div className="rounded border border-gray-200 p-2 md:col-span-2">
              <p className="text-gray-500">Timestamp</p>
              <p className="font-semibold text-gray-800 mt-0.5">{formatDateTime(selectedRow.timestamp)}</p>
            </div>
          </div>

          <div className="mt-3 rounded border border-gray-200 bg-gray-50 p-3">
            <p className="text-xxs font-semibold text-gray-700">Details</p>
            <p className="text-xxs text-gray-600 mt-1">{selectedRow.details}</p>
          </div>

          <div className="flex justify-end gap-2 mt-5">
            <Button type="button" variant="cancel" onClick={closeDetail}>
              Close
            </Button>
            <Button type="button" variant="success" onClick={closeDetail}>
              Done
            </Button>
          </div>
        </Modal>
      )}
    </Layout>
  );
}
