"use client";
import { useMemo, useState } from "react";
import Layout from "y@/app/components/Layout";
import Button from "y@/app/components/Button";
import CustomSelect from "y@/app/components/CustomSelect";
import Modal from "y@/app/components/ModalShell";

const columnOptions = [
  { value: "firstName", label: "First Name" },
  { value: "lastName", label: "Last Name" },
  { value: "email", label: "Email Address" },
  { value: "department", label: "Department" },
  { value: "role", label: "Role" },
  { value: "startDate", label: "Start Date" },
];

const steps = ["Upload CSV/XLSX", "Map Columns", "Validate", "Commit"];

const initialMapping = [
  { source: "first_name", destination: "firstName" },
  { source: "last_name", destination: "lastName" },
  { source: "email_address", destination: "email" },
  { source: "dept", destination: "department" },
];

const validationPreview = [
  { row: 1, status: "Ready", issues: "—" },
  { row: 2, status: "Warning", issues: "Missing email" },
  { row: 3, status: "Error", issues: "Invalid date format" },
];

export default function DataExpo() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [columnMapping, setColumnMapping] = useState(initialMapping);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const uploadedName = selectedFile ? selectedFile.name : "No file selected";

  const readyMapping = useMemo(
    () =>
      columnMapping.every(
        (map) => map.destination && map.destination.trim().length > 0
      ),
    [columnMapping]
  );

  const handleMappingChange = (index, value) => {
    setColumnMapping((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, destination: value } : item
      )
    );
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const statusColor = {
    Ready: "bg-green-100 text-green-700",
    Warning: "bg-yellow-100 text-yellow-700",
    Error: "bg-red-100 text-red-700",
  };

  return (
    <Layout>
      <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
        {/* Header */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Data Import & Export
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Upload CSV/XLSX files, map columns, validate records, and import
              into the system.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
            <Button
              variant="success"
              type="button"
              onClick={() => setIsModalOpen(true)}
            >
              Download Sample CSV
            </Button>
            <Button variant="primary" type="button">
              Export
            </Button>
          </div>
        </div>

        {/* Step Progress */}
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, idx) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold
                  ${idx === 0 ? "bg-[var(--color-primary)] text-white" : "bg-gray-200 text-gray-600"}`}
              >
                {idx + 1}
              </div>
              <span className="text-xs font-medium text-gray-600">{step}</span>
              {idx < steps.length - 1 && <div className="w-10 h-[2px] bg-gray-200 mx-2"></div>}
            </div>
          ))}
        </div>

        {/* File Upload */}
        <div className="mt-4 shadow-md border border-gray-200 rounded p-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xxs font-semibold text-gray-600">
                Upload CSV/XLSX
              </p>
              <p className="text-xs text-gray-500">
                Importers allow Excel/CSV templates with mapping.
              </p>
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <label className="border-2 border-dashed border-gray-300 rounded-lg px-4 py-6 text-center cursor-pointer hover:border-[var(--color-primary)] transition w-full md:w-auto">
                <p className="text-xs font-semibold text-gray-700">
                  Drag & Drop file or Click to Browse
                </p>
                <input
                  type="file"
                  accept=".csv,.xlsx"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              {selectedFile && (
                <span className="text-xxs text-green-600 mt-2 md:mt-0">
                  ✓ {selectedFile.name} uploaded
                </span>
              )}
            </div>
          </div>

          {/* Mapping Progress */}
          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <div className="rounded border border-gray-200 p-3 bg-slate-50 text-xxs text-gray-600">
              Mapping progress ensures each column is mapped before validation.
            </div>
            <div className="rounded border border-gray-200 p-3 text-xxs text-gray-600">
              {readyMapping ? "All columns mapped" : "Map every source column"}
            </div>
          </div>
        </div>

        {/* File Summary Cards */}
        {selectedFile && (
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="border border-gray-300 shadow-sm rounded p-3 text-center">
              <p className="text-xxs text-gray-500">File</p>
              <p className="text-xs font-semibold">{selectedFile.name}</p>
            </div>
            <div className="border border-gray-300 shadow-sm rounded p-3 text-center">
              <p className="text-xxs text-gray-500">Rows</p>
              <p className="text-xs font-semibold">325</p>
            </div>
            <div className="border border-gray-300 shadow-sm rounded p-3 text-center">
              <p className="text-xxs text-gray-500">Columns</p>
              <p className="text-xs font-semibold">{columnMapping.length}</p>
            </div>
          </div>
        )}

        {/* Column Mapping Table */}
        <div className="mt-6 shadow-md border border-gray-200 rounded overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left">Source Column</th>
                <th className="px-4 py-3 text-left">Map To Field</th>
              </tr>
            </thead>
            <tbody>
              {columnMapping.map((column, idx) => (
                <tr
                  key={column.source}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xxs font-semibold rounded bg-gray-100 text-gray-700">
                      {column.source}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <CustomSelect
                      name={`map-${column.source}`}
                      value={column.destination}
                      placeholder="Select field"
                      options={columnOptions}
                      onChange={(value) => handleMappingChange(idx, value)}
                      controlHeight="2rem"
                      isSearchable
                    />
                    {column.destination && (
                      <p className="text-xxs text-green-600 mt-1">✓ mapped</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Validation Preview */}
        <div className="mt-6 shadow-md border border-gray-200 rounded overflow-x-auto">
          <div className="bg-gray-100 px-4 py-2 text-xxs font-semibold uppercase tracking-wide text-gray-600">
            Validation Preview
          </div>
          <table className="w-full text-xs border-collapse">
            <thead className="bg-white text-gray-600 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left">Row</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Issues</th>
              </tr>
            </thead>
            <tbody>
              {validationPreview.map((row, idx) => (
                <tr
                  key={row.row}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="px-4 py-3">{row.row}</td>
                  <td className="px-4 py-3 font-semibold text-gray-800">
                    <span
                      className={`px-2 py-1 text-xxs font-semibold rounded ${statusColor[row.status]}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{row.issues}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Actions */}
        <div className="mt-6 flex justify-between items-center border-t border-gray-300 pt-4">
          <p className="text-xs text-gray-500">
            {selectedFile ? "File ready for import" : "Upload a file to begin"}
          </p>
          <div className="flex gap-2">
            <Button variant="primary">Export</Button>
            <Button
              variant="success"
              type="button"
              disabled={!readyMapping || !selectedFile}
            >
              Import Data
            </Button>
          </div>
        </div>

        {/* Sample CSV Modal */}
        {isModalOpen && (
          <Modal width="w-full md:w-5/12">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Sample CSV</h3>
            <p className="text-xxs text-gray-600">
              Download the template with expected columns and validation rules.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Button variant="success" type="button">
                Download Sample CSV
              </Button>
              <Button
                variant="cancel"
                type="button"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </Layout>
  );
}