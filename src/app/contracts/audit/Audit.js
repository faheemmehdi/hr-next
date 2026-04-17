"use client";

import { useMemo, useState } from "react";
import Layout from "y@/app/components/Layout";
import Button from "y@/app/components/Button";
import SearchBar from "y@/app/components/SearchBar";
import CustomSelect from "y@/app/components/CustomSelect";
import RowActions from "y@/app/components/RowActions";
import Modal from "y@/app/components/ModalShell";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import { FiDownload, FiEye, FiFileText, FiShield } from "react-icons/fi";

const auditSeed = [
  {
    id: 1,
    event: "Document Viewed",
    actor: "Ali Khan",
    ip: "39.37.202.14",
    timestamp: "2026-04-09T10:15:00",
    docId: "DOC-EMP-0001",
    details: "Employee viewed Employment Agreement in portal.",
  },
  {
    id: 2,
    event: "Signature Submitted",
    actor: "Sara Ahmed",
    ip: "103.86.52.11",
    timestamp: "2026-04-09T11:02:00",
    docId: "DOC-NDA-0042",
    details: "Digital signature successfully submitted on NDA contract.",
  },
  {
    id: 3,
    event: "Reminder Sent",
    actor: "HR Admin",
    ip: "10.20.1.8",
    timestamp: "2026-04-09T11:20:00",
    docId: "DOC-INT-0091",
    details: "Automated reminder sent due to nearing SLA deadline.",
  },
  {
    id: 4,
    event: "Access Denied",
    actor: "Usman Tariq",
    ip: "182.191.75.44",
    timestamp: "2026-04-09T12:40:00",
    docId: "DOC-CON-0152",
    details: "Access rejected due to insufficient permissions.",
  },
  {
    id: 5,
    event: "Document Downloaded",
    actor: "Legal Lead",
    ip: "10.20.1.11",
    timestamp: "2026-04-09T01:10:00",
    docId: "DOC-NDA-0042",
    details: "Final signed copy downloaded for compliance archive.",
  },
];

export default function Audit() {
  const [rows] = useState(auditSeed);
  const [search, setSearch] = useState("");
  const [eventType, setEventType] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const eventOptions = mapSelectOptions(
    [
      { id: "Document Viewed", name: "Document Viewed" },
      { id: "Signature Submitted", name: "Signature Submitted" },
      { id: "Reminder Sent", name: "Reminder Sent" },
      { id: "Access Denied", name: "Access Denied" },
      { id: "Document Downloaded", name: "Document Downloaded" },
    ],
    "id",
    "name"
  );

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      const matchSearch =
        !q ||
        r.event.toLowerCase().includes(q) ||
        r.actor.toLowerCase().includes(q) ||
        r.ip.toLowerCase().includes(q) ||
        r.docId.toLowerCase().includes(q);
      const matchEvent = !eventType || r.event === eventType;
      return matchSearch && matchEvent;
    });
  }, [rows, search, eventType]);

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

  const handleExport = () => {
    if (filteredRows.length === 0) return;
    const headers = ["Event", "Actor", "IP", "Timestamp", "Doc ID"];
    const records = filteredRows.map((r) => [
      r.event,
      r.actor,
      r.ip,
      formatDateTime(r.timestamp),
      r.docId,
    ]);
    const csv = [headers, ...records]
      .map((cols) => cols.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document_audit_trails.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const openView = (row) => {
    setSelectedRow(row);
    setIsViewOpen(true);
  };

  const closeView = () => {
    setSelectedRow(null);
    setIsViewOpen(false);
  };

  return (
    <Layout>
      <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-base font-semibold text-gray-700">Document Audit Trails</h2>
            <p className="text-xxs text-gray-500">
              Immutable compliance logs for document access and signature operations.
            </p>
          </div>
          <Button type="button" variant="success" onClick={handleExport}>
            <span className="inline-flex items-center gap-1.5">
              <FiDownload size={13} />
              Export
            </span>
          </Button>
        </div>

        <div className="mt-4 rounded-lg border border-[#d8e6ff] bg-[#f4f8ff] px-3 py-2 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 text-[11px] text-[#315d9c] font-medium">
            <FiShield size={13} />
            Audit entries are immutable and time-stamped for compliance.
          </div>
          <div className="inline-flex items-center gap-2 text-[11px] text-[#315d9c] font-medium">
            <FiFileText size={13} />
            {filteredRows.length} records
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5">
          <div className="w-full md:w-1/5 flex items-center mb-1">
            <SearchBar placeholder="Search event, actor, IP, doc id..." onSearch={setSearch} />
          </div>
          <div className="w-full flex items-center justify-end flex-col md:flex-row mt-2 md:mt-0 gap-2">
            <div className="mb-1 w-full md:w-[10rem]">
              <CustomSelect
                name="event_type"
                value={eventType}
                placeholder="Event Type"
                onChange={setEventType}
                options={eventOptions}
                controlHeight="2rem"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto shadow-md border border-gray-200 rounded max-h-[72vh]">
          <table className="w-full text-xs border-collapse">
            <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left">Event</th>
                <th className="px-4 py-3 text-left">Actor</th>
                <th className="px-4 py-3 text-left">IP</th>
                <th className="px-4 py-3 text-left">Timestamp</th>
                <th className="px-4 py-3 text-left">Doc ID</th>
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
                    <td className="px-4 py-3">{row.event}</td>
                    <td className="px-4 py-3">{row.actor}</td>
                    <td className="px-4 py-3">{row.ip}</td>
                    <td className="px-4 py-3">{formatDateTime(row.timestamp)}</td>
                    <td className="px-4 py-3">{row.docId}</td>

                    <RowActions
                      row={row}
                      actions={[
                        {
                          label: "View Detail",
                          icon: FiEye,
                          onClick: (r) => openView(r),
                        },
                      ]}
                    />
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500 italic">
                    No audit records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isViewOpen && selectedRow && (
        <Modal width="w-full md:w-6/12">
          <div className="border-b border-gray-200 pb-3 mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Audit Event Detail</h3>
            <p className="text-xxs text-gray-500">Immutable compliance event details.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xxs text-gray-700">
            <div className="rounded border border-gray-200 p-2">
              <p className="text-gray-500">Event</p>
              <p className="font-semibold text-gray-800 mt-0.5">{selectedRow.event}</p>
            </div>
            <div className="rounded border border-gray-200 p-2">
              <p className="text-gray-500">Actor</p>
              <p className="font-semibold text-gray-800 mt-0.5">{selectedRow.actor}</p>
            </div>
            <div className="rounded border border-gray-200 p-2">
              <p className="text-gray-500">IP Address</p>
              <p className="font-semibold text-gray-800 mt-0.5">{selectedRow.ip}</p>
            </div>
            <div className="rounded border border-gray-200 p-2">
              <p className="text-gray-500">Timestamp</p>
              <p className="font-semibold text-gray-800 mt-0.5">{formatDateTime(selectedRow.timestamp)}</p>
            </div>
            <div className="rounded border border-gray-200 p-2 md:col-span-2">
              <p className="text-gray-500">Document ID</p>
              <p className="font-semibold text-gray-800 mt-0.5">{selectedRow.docId}</p>
            </div>
          </div>

          <div className="mt-3 rounded border border-gray-200 bg-gray-50 p-3">
            <p className="text-xxs font-semibold text-gray-700">Event Description</p>
            <p className="text-xxs text-gray-600 mt-1">{selectedRow.details}</p>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="cancel" onClick={closeView}>
              Close
            </Button>
            <Button type="button" variant="success" onClick={closeView}>
              Done
            </Button>
          </div>
        </Modal>
      )}
    </Layout>
  );
}
