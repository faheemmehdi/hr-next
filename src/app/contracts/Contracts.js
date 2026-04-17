"use client";

import { useMemo, useRef, useState } from "react";
import Layout from "y@/app/components/Layout";
import Button from "y@/app/components/Button";
import SearchBar from "y@/app/components/SearchBar";
import CustomSelect from "y@/app/components/CustomSelect";
import RowActions from "y@/app/components/RowActions";
import Modal from "y@/app/components/ModalShell";
import StatusDesign from "y@/app/components/StatusColors";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import { FiDownload, FiEye, FiTag, FiTrash2, FiUpload } from "react-icons/fi";

const contractRows = [
  {
    id: 1,
    title: "Employment Agreement - Ali Khan",
    employee: "Ali Khan",
    type: "Permanent",
    version: "v3.2",
    tags: ["Signed", "NDA", "FY-2026"],
    statusLabel: "Active",
    statusId: 1,
    updated: "09 Apr 2026, 10:20 AM",
    summary:
      "Primary employment agreement including compensation updates and confidentiality clauses.",
    history: ["v3.2 - Compensation revision", "v3.1 - Signature update", "v3.0 - Renewal"],
  },
  {
    id: 2,
    title: "Fixed-Term Contract - Sara Ahmed",
    employee: "Sara Ahmed",
    type: "Contractor",
    version: "v1.4",
    tags: ["Pending Signature", "Remote"],
    statusLabel: "Pending",
    statusId: 3,
    updated: "08 Apr 2026, 03:45 PM",
    summary: "6-month contractor agreement with remote work obligations and deliverables.",
    history: ["v1.4 - Legal language revised", "v1.3 - Deliverables added"],
  },
  {
    id: 3,
    title: "Internship Contract - Hamza Ali",
    employee: "Hamza Ali",
    type: "Internship",
    version: "v2.0",
    tags: ["Signed", "Probation"],
    statusLabel: "Active",
    statusId: 1,
    updated: "07 Apr 2026, 11:12 AM",
    summary: "Internship engagement document for 3 months with stipend and learning plan.",
    history: ["v2.0 - Final signed copy", "v1.0 - Draft issued"],
  },
  {
    id: 4,
    title: "Part-Time Agreement - Ayesha Noor",
    employee: "Ayesha Noor",
    type: "Part-Time",
    version: "v2.1",
    tags: ["Needs Review", "Policy Update"],
    statusLabel: "Expiring Soon",
    statusId: 3,
    updated: "06 Apr 2026, 05:05 PM",
    summary: "Part-time agreement aligned to revised shift and holiday policy updates.",
    history: ["v2.1 - Policy references updated", "v2.0 - Hours updated"],
  },
  {
    id: 5,
    title: "Consultancy Agreement - Usman Tariq",
    employee: "Usman Tariq",
    type: "Consultancy",
    version: "v1.1",
    tags: ["Unsigned", "External Vendor"],
    statusLabel: "Archived",
    statusId: 4,
    updated: "04 Apr 2026, 09:30 AM",
    summary: "Consultancy agreement archived after project closure and final clearance.",
    history: ["v1.1 - Scope correction", "v1.0 - Original issue"],
  },
];

export default function Contract() {
  const [rows, setRows] = useState(contractRows);
  const [search, setSearch] = useState("");
  const [contractType, setContractType] = useState("");
  const [status, setStatus] = useState("");
  const [tag, setTag] = useState("");
  const [bulkTag, setBulkTag] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [viewRow, setViewRow] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const fileInputRef = useRef(null);

  const typeOptions = mapSelectOptions(
    [
      { id: "Permanent", name: "Permanent" },
      { id: "Contractor", name: "Contractor" },
      { id: "Internship", name: "Internship" },
      { id: "Part-Time", name: "Part-Time" },
      { id: "Consultancy", name: "Consultancy" },
    ],
    "id",
    "name"
  );

  const statusOptions = mapSelectOptions(
    [
      { id: "Active", name: "Active" },
      { id: "Pending", name: "Pending" },
      { id: "Expiring Soon", name: "Expiring Soon" },
      { id: "Archived", name: "Archived" },
    ],
    "id",
    "name"
  );

  const allTags = useMemo(() => [...new Set(rows.flatMap((r) => r.tags))], [rows]);
  const tagOptions = mapSelectOptions(allTags.map((t) => ({ id: t, name: t })), "id", "name");

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      const matchSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.employee.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q) ||
        r.tags.join(" ").toLowerCase().includes(q);
      const matchType = !contractType || r.type === contractType;
      const matchStatus = !status || r.statusLabel === status;
      const matchTag = !tag || r.tags.includes(tag);
      return matchSearch && matchType && matchStatus && matchTag;
    });
  }, [rows, search, contractType, status, tag]);

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

  const openViewModal = (row) => {
    setViewRow(row);
    setIsViewOpen(true);
  };

  const closeViewModal = () => {
    setViewRow(null);
    setIsViewOpen(false);
  };

  const handleBulkTag = () => {
    if (!bulkTag || selectedIds.length === 0) return;
    setRows((prev) =>
      prev.map((r) =>
        selectedIds.includes(r.id) && !r.tags.includes(bulkTag)
          ? { ...r, tags: [...r.tags, bulkTag] }
          : r
      )
    );
    setBulkTag("");
  };

  const handleDelete = () => {
    if (selectedIds.length === 0) return;
    setRows((prev) => prev.filter((r) => !selectedIds.includes(r.id)));
    setSelectedIds([]);
  };

  const handleExport = () => {
    const source =
      selectedIds.length > 0 ? rows.filter((r) => selectedIds.includes(r.id)) : filteredRows;
    if (source.length === 0) return;
    const headers = ["Title", "Employee", "Type", "Version", "Tags", "Status", "Updated"];
    const records = source.map((r) => [
      r.title,
      r.employee,
      r.type,
      r.version,
      r.tags.join(" | "),
      r.statusLabel,
      r.updated,
    ]);
    const csv = [headers, ...records]
      .map((cols) => cols.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "contracts_repository.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-base font-semibold text-gray-700">Contracts Repository</h2>
            <p className="text-xxs text-gray-500">
              Searchable repository with tags, versions, and bulk contract operations.
            </p>
          </div>

          <div className="flex gap-2 flex-wrap justify-end">
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              multiple
            />
            <Button type="button" variant="primary" onClick={() => fileInputRef.current?.click()}>
              <span className="inline-flex items-center gap-1.5">
                <FiUpload size={13} />
                Upload
              </span>
            </Button>
            <Button type="button" variant="secondary" onClick={handleBulkTag}>
              <span className="inline-flex items-center gap-1.5">
                <FiTag size={13} />
                Bulk Tag
              </span>
            </Button>
            <Button type="button" variant="cancel" onClick={handleExport}>
              <span className="inline-flex items-center gap-1.5">
                <FiDownload size={13} />
                Export
              </span>
            </Button>
            <Button type="button" variant="danger" onClick={handleDelete}>
              <span className="inline-flex items-center gap-1.5">
                <FiTrash2 size={13} />
                Delete
              </span>
            </Button>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5">
          <div className="w-full md:w-1/5 flex items-center mb-1">
            <SearchBar placeholder="Search title, employee, tags..." onSearch={setSearch} />
          </div>

          <div className="w-full flex items-center justify-end flex-col md:flex-row mt-2 md:mt-0 gap-2">
            <div className="mb-1 w-full md:w-[9rem]">
              <CustomSelect
                name="contract_type"
                value={contractType}
                placeholder="Type"
                onChange={setContractType}
                options={typeOptions}
                controlHeight="2rem"
              />
            </div>
            <div className="mb-1 w-full md:w-[9rem]">
              <CustomSelect
                name="contract_status"
                value={status}
                placeholder="Status"
                onChange={setStatus}
                options={statusOptions}
                controlHeight="2rem"
              />
            </div>
            <div className="mb-1 w-full md:w-[9rem]">
              <CustomSelect
                name="contract_tag"
                value={tag}
                placeholder="Tags"
                onChange={setTag}
                options={tagOptions}
                controlHeight="2rem"
              />
            </div>
            <div className="mb-1 w-full md:w-[9rem]">
              <CustomSelect
                name="bulk_tag"
                value={bulkTag}
                placeholder="Bulk Tag"
                onChange={setBulkTag}
                options={tagOptions}
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
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Employee</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Version</th>
                <th className="px-4 py-3 text-left">Tags</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Updated</th>
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
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(row.id)}
                        onChange={() => toggleRow(row.id)}
                        className="cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3 truncate max-w-[240px]" title={row.title}>
                      {row.title}
                    </td>
                    <td className="px-4 py-3">{row.employee}</td>
                    <td className="px-4 py-3">{row.type}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-md bg-[#edf4ff] text-[#315d9c] font-semibold px-2 py-1">
                        {row.version}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {row.tags.map((t) => (
                          <span
                            key={`${row.id}-${t}`}
                            className="inline-flex items-center rounded-full bg-gray-100 text-gray-700 px-2 py-[2px]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <StatusDesign statusId={row.statusId} label={row.statusLabel} />
                    </td>
                    <td className="px-4 py-3">{row.updated}</td>

                    <RowActions
                      row={row}
                      actions={[
                        { label: "View Contract", icon: FiEye, onClick: (r) => openViewModal(r) },
                        {
                          label: "Delete Contract",
                          icon: FiTrash2,
                          color: "red",
                          onClick: (r) => setSelectedIds((prev) => [...new Set([...prev, r.id])]),
                        },
                      ]}
                    />
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-6 text-gray-500 italic">
                    No contracts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isViewOpen && viewRow && (
        <Modal width="w-full md:w-6/12">
          <div className="border-b border-gray-200 pb-3 mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Contract Detail</h3>
            <p className="text-xxs text-gray-500">Preview and version detail for selected contract.</p>
          </div>

          <div className="space-y-4 text-xxs text-gray-700">
            <div className="rounded-lg border border-gray-200 p-3 bg-gray-50">
              <p className="text-sm font-semibold text-gray-800">{viewRow.title}</p>
              <p className="text-xxs text-gray-600 mt-1">{viewRow.summary}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded border border-gray-200 p-2">
                <p className="text-gray-500">Employee</p>
                <p className="font-semibold text-gray-800 mt-0.5">{viewRow.employee}</p>
              </div>
              <div className="rounded border border-gray-200 p-2">
                <p className="text-gray-500">Type</p>
                <p className="font-semibold text-gray-800 mt-0.5">{viewRow.type}</p>
              </div>
              <div className="rounded border border-gray-200 p-2">
                <p className="text-gray-500">Version</p>
                <p className="font-semibold text-gray-800 mt-0.5">{viewRow.version}</p>
              </div>
              <div className="rounded border border-gray-200 p-2">
                <p className="text-gray-500">Updated</p>
                <p className="font-semibold text-gray-800 mt-0.5">{viewRow.updated}</p>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">Tags</p>
              <div className="flex flex-wrap gap-1">
                {viewRow.tags.map((t) => (
                  <span key={t} className="inline-flex items-center rounded-full bg-gray-100 text-gray-700 px-2 py-[2px]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">Version History</p>
              <ul className="space-y-1">
                {viewRow.history.map((item) => (
                  <li key={item} className="rounded bg-gray-50 border border-gray-200 px-2 py-1 text-gray-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="cancel" onClick={closeViewModal}>
              Close
            </Button>
            <Button type="button" variant="success" onClick={closeViewModal}>
              Done
            </Button>
          </div>
        </Modal>
      )}
    </Layout>
  );
}
