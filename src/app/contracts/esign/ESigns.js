"use client";

import { useEffect, useMemo, useState } from "react";
import Layout from "y@/app/components/Layout";
import Button from "y@/app/components/Button";
import SearchBar from "y@/app/components/SearchBar";
import CustomSelect from "y@/app/components/CustomSelect";
import RowActions from "y@/app/components/RowActions";
import Modal from "y@/app/components/ModalShell";
import StatusDesign from "y@/app/components/StatusColors";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import { FiBell, FiClock, FiDownload, FiEyeOff, FiShield } from "react-icons/fi";

const esignSeed = [
  {
    id: 1,
    document: "Employment Agreement - Ali Khan",
    parties: ["Ali Khan", "HR Manager"],
    status: "Awaiting Employee",
    statusId: 3,
    sentOn: "2026-04-08T09:15:00",
    due: "2026-04-12T18:00:00",
    reminders: 1,
    audit: [
      "Sent for signature by HR Admin",
      "Viewed by employee",
      "Reminder sent after 24 hours",
    ],
  },
  {
    id: 2,
    document: "NDA Contract - Sara Ahmed",
    parties: ["Sara Ahmed", "Legal Lead"],
    status: "Completed",
    statusId: 1,
    sentOn: "2026-04-05T11:40:00",
    due: "2026-04-10T18:00:00",
    reminders: 0,
    audit: [
      "Sent for signature",
      "Signed by employee",
      "Signed by legal lead",
      "Document finalized",
    ],
  },
  {
    id: 3,
    document: "Internship Contract - Hamza Ali",
    parties: ["Hamza Ali", "Talent Partner"],
    status: "Overdue",
    statusId: 2,
    sentOn: "2026-04-03T14:00:00",
    due: "2026-04-07T18:00:00",
    reminders: 3,
    audit: [
      "Sent for signature",
      "Reminder #1",
      "Reminder #2",
      "Reminder #3",
    ],
  },
  {
    id: 4,
    document: "Consultancy Scope Agreement - Usman Tariq",
    parties: ["Usman Tariq", "Operations Head"],
    status: "Cancelled",
    statusId: 4,
    sentOn: "2026-04-02T10:20:00",
    due: "2026-04-09T18:00:00",
    reminders: 0,
    audit: ["Sent for signature", "Cancelled by contract owner"],
  },
];

export default function Esign() {
  const [rows, setRows] = useState(esignSeed);
  const [now, setNow] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [auditRow, setAuditRow] = useState(null);
  const [isAuditOpen, setIsAuditOpen] = useState(false);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const statusOptions = mapSelectOptions(
    [
      { id: "Awaiting Employee", name: "Awaiting Employee" },
      { id: "Completed", name: "Completed" },
      { id: "Overdue", name: "Overdue" },
      { id: "Cancelled", name: "Cancelled" },
    ],
    "id",
    "name"
  );

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      const matchSearch =
        !q ||
        r.document.toLowerCase().includes(q) ||
        r.parties.join(" ").toLowerCase().includes(q);
      const matchStatus = !status || r.status === status;
      return matchSearch && matchStatus;
    });
  }, [rows, search, status]);

  const allVisibleSelected =
    filteredRows.length > 0 && filteredRows.every((r) => selectedIds.includes(r.id));

  const toggleAllVisible = () => {
    const visibleIds = filteredRows.map((r) => r.id);
    if (allVisibleSelected) {
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
      return;
    }
    setSelectedIds((prev) => [...new Set([...prev, ...visibleIds])]);
  };

  const toggleRow = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const formatDateTime = (iso) => {
    const d = new Date(iso);
    return d.toLocaleString();
  };

  const getSLAData = (dueISO) => {
    if (!now) return { label: "--", tone: "text-gray-500" };
    const due = new Date(dueISO);
    const diffMs = due - now;
    const mins = Math.floor(Math.abs(diffMs) / 60000);
    const days = Math.floor(mins / 1440);
    const hours = Math.floor((mins % 1440) / 60);

    if (diffMs >= 0) {
      return {
        label: `${days}d ${hours}h left`,
        tone: diffMs < 24 * 60 * 60 * 1000 ? "text-yellow-700" : "text-green-700",
      };
    }
    return {
      label: `${days}d ${hours}h overdue`,
      tone: "text-red-700",
    };
  };

  const handleRemind = (rowIds) => {
    const ids = Array.isArray(rowIds) ? rowIds : [rowIds];
    setRows((prev) =>
      prev.map((r) =>
        ids.includes(r.id) && r.status !== "Completed" && r.status !== "Cancelled"
          ? { ...r, reminders: r.reminders + 1, audit: [...r.audit, "Manual reminder sent"] }
          : r
      )
    );
  };

  const handleCancel = (rowIds) => {
    const ids = Array.isArray(rowIds) ? rowIds : [rowIds];
    setRows((prev) =>
      prev.map((r) =>
        ids.includes(r.id) && r.status !== "Completed"
          ? {
              ...r,
              status: "Cancelled",
              statusId: 4,
              audit: [...r.audit, "Signature request cancelled"],
            }
          : r
      )
    );
  };

  const handleDownload = () => {
    const source =
      selectedIds.length > 0 ? rows.filter((r) => selectedIds.includes(r.id)) : filteredRows;
    if (source.length === 0) return;
    const txt = source
      .map((r) => `${r.document} | ${r.status} | Reminders: ${r.reminders}`)
      .join("\n");
    const blob = new Blob([txt], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "esign_queue.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const openAudit = (row) => {
    setAuditRow(row);
    setIsAuditOpen(true);
  };

  const closeAudit = () => {
    setAuditRow(null);
    setIsAuditOpen(false);
  };

  return (
    <Layout>
      <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-base font-semibold text-gray-700">E-Sign Queue</h2>
            <p className="text-xxs text-gray-500">
              Track signature status, SLA countdown, reminders, and audit trail.
            </p>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="secondary" onClick={() => handleRemind(selectedIds)}>
              <span className="inline-flex items-center gap-1.5">
                <FiBell size={13} />
                Remind
              </span>
            </Button>
            <Button type="button" variant="danger" onClick={() => handleCancel(selectedIds)}>
              <span className="inline-flex items-center gap-1.5">
                <FiEyeOff size={13} />
                Cancel
              </span>
            </Button>
            <Button type="button" variant="success" onClick={handleDownload}>
              <span className="inline-flex items-center gap-1.5">
                <FiDownload size={13} />
                Download
              </span>
            </Button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-gray-600">Pending Queue</p>
              <span className="w-8 h-8 rounded-lg bg-[#edf4ff] ring-1 ring-[#dbe9ff] flex items-center justify-center shadow-sm">
                <FiBell className="text-blue-600 text-sm" />
              </span>
            </div>
            <p className="text-sm font-semibold text-gray-800 mt-2">
              {rows.filter((r) => r.status === "Awaiting Employee").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-gray-600">Overdue Requests</p>
              <span className="w-8 h-8 rounded-lg bg-[#fff1f3] ring-1 ring-[#ffd8df] flex items-center justify-center shadow-sm">
                <FiClock className="text-red-600 text-sm" />
              </span>
            </div>
            <p className="text-sm font-semibold text-red-700 mt-2">
              {rows.filter((r) => r.status === "Overdue").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-gray-600">Completed</p>
              <span className="w-8 h-8 rounded-lg bg-[#effaf3] ring-1 ring-[#d8f1e2] flex items-center justify-center shadow-sm">
                <FiShield className="text-green-600 text-sm" />
              </span>
            </div>
            <p className="text-sm font-semibold text-green-700 mt-2">
              {rows.filter((r) => r.status === "Completed").length}
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5">
          <div className="w-full md:w-1/5 flex items-center mb-1">
            <SearchBar placeholder="Search document or parties..." onSearch={setSearch} />
          </div>
          <div className="w-full flex items-center justify-end flex-col md:flex-row mt-2 md:mt-0 gap-2">
            <div className="mb-1 w-full md:w-[9rem]">
              <CustomSelect
                name="esign_status"
                value={status}
                placeholder="Status"
                onChange={setStatus}
                options={statusOptions}
                controlHeight="2rem"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto shadow-md border border-gray-200 rounded max-h-[72vh]">
          <table className="w-full text-xs border-collapse">
            <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={allVisibleSelected}
                    onChange={toggleAllVisible}
                    className="cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3 text-left">Document</th>
                <th className="px-4 py-3 text-left">Parties</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Sent On</th>
                <th className="px-4 py-3 text-left">Due</th>
                <th className="px-4 py-3 text-left">Reminders</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-xxs">
              {filteredRows.length > 0 ? (
                filteredRows.map((row, idx) => {
                  const sla = getSLAData(row.due);
                  return (
                    <tr
                      key={row.id}
                      className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors`}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(row.id)}
                          onChange={() => toggleRow(row.id)}
                          className="cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-800 truncate max-w-[230px]" title={row.document}>
                          {row.document}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1 max-w-[220px]">
                          {row.parties.map((p) => (
                            <span
                              key={`${row.id}-${p}`}
                              className="inline-flex items-center rounded-full bg-gray-100 text-gray-700 px-2 py-[2px]"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <StatusDesign statusId={row.statusId} label={row.status} />
                      </td>
                      <td className="px-4 py-3">{formatDateTime(row.sentOn)}</td>
                      <td className="px-4 py-3">
                        <p>{formatDateTime(row.due)}</p>
                        <p className={`text-[10px] mt-1 font-semibold inline-flex items-center gap-1 ${sla.tone}`}>
                          <FiClock size={11} />
                          {sla.label}
                        </p>
                      </td>
                      <td className="px-4 py-3">{row.reminders}</td>

                      <RowActions
                        row={row}
                        actions={[
                          {
                            label: "Remind Now",
                            icon: FiBell,
                            color: "gold",
                            onClick: (r) => handleRemind(r.id),
                          },
                          {
                            label: "Cancel Request",
                            icon: FiEyeOff,
                            color: "red",
                            onClick: (r) => handleCancel(r.id),
                          },
                          {
                            label: "View Audit",
                            icon: FiShield,
                            onClick: (r) => openAudit(r),
                          },
                        ]}
                      />
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-6 text-gray-500 italic">
                    No e-sign requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isAuditOpen && auditRow && (
        <Modal width="w-full md:w-6/12">
          <div className="border-b border-gray-200 pb-3 mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Audit Trail</h3>
            <p className="text-xxs text-gray-500">Signature activity for selected document.</p>
          </div>

          <div className="rounded border border-gray-200 bg-gray-50 p-3 mb-3">
            <p className="text-sm font-semibold text-gray-800">{auditRow.document}</p>
            <p className="text-xxs text-gray-600 mt-1">
              Parties: {auditRow.parties.join(", ")}
            </p>
          </div>

          <ul className="space-y-2">
            {auditRow.audit.map((event, idx) => (
              <li
                key={`${auditRow.id}-audit-${idx}`}
                className="rounded border border-gray-200 bg-white px-3 py-2 text-xxs text-gray-700"
              >
                <span className="font-semibold text-gray-800 mr-2">{idx + 1}.</span>
                {event}
              </li>
            ))}
          </ul>

          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="cancel" onClick={closeAudit}>
              Close
            </Button>
            <Button type="button" variant="success" onClick={closeAudit}>
              Done
            </Button>
          </div>
        </Modal>
      )}
    </Layout>
  );
}
