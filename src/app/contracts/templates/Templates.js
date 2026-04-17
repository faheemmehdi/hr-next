"use client";

import { useMemo, useRef, useState } from "react";
import Layout from "y@/app/components/Layout";
import Button from "y@/app/components/Button";
import SearchBar from "y@/app/components/SearchBar";
import CustomSelect from "y@/app/components/CustomSelect";
import RowActions from "y@/app/components/RowActions";
import Modal from "y@/app/components/ModalShell";
import Input from "y@/app/components/Input";
import RichTextEditor from "y@/app/components/RichTextEditor";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import { FiArchive, FiCopy, FiEye, FiFilePlus, FiUpload } from "react-icons/fi";

const templateSeed = [
  {
    id: 1,
    name: "Employment Agreement",
    category: "Offer & Onboarding",
    content:
      "<p>This Employment Agreement is made between <strong>{{company_name}}</strong> and <strong>{{employee_name}}</strong>.</p><p>Start Date: {{start_date}} | Position: {{job_title}}.</p>",
    variables: ["employee_name", "company_name", "start_date", "job_title"],
    versions: ["v1.0", "v1.1", "v1.2", "v2.0"],
    updated: "09 Apr 2026, 10:30 AM",
    archived: false,
  },
  {
    id: 2,
    name: "NDA Agreement",
    category: "Compliance",
    content:
      "<p>This NDA is entered on {{effective_date}} between {{company_name}} and {{employee_name}} to protect confidential information.</p>",
    variables: ["employee_name", "company_name", "effective_date"],
    versions: ["v1.0", "v1.1"],
    updated: "07 Apr 2026, 03:15 PM",
    archived: false,
  },
  {
    id: 3,
    name: "Internship Contract",
    category: "Offer & Onboarding",
    content:
      "<p>Internship period begins on {{start_date}} and ends on {{end_date}} under mentor {{reporting_manager}}.</p>",
    variables: ["employee_name", "start_date", "end_date", "reporting_manager"],
    versions: ["v1.0", "v1.1", "v1.2"],
    updated: "05 Apr 2026, 11:05 AM",
    archived: false,
  },
  {
    id: 4,
    name: "Consultancy Scope Agreement",
    category: "Vendor & Contractual",
    content:
      "<p>Consultant {{employee_name}} will deliver {{scope_of_work}} between {{start_date}} and {{end_date}}.</p>",
    variables: ["employee_name", "scope_of_work", "start_date", "end_date"],
    versions: ["v1.0"],
    updated: "03 Apr 2026, 09:40 AM",
    archived: true,
  },
];

export default function Template() {
  const [rows, setRows] = useState(templateSeed);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [archiveFilter, setArchiveFilter] = useState("");
  const [viewRow, setViewRow] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const [nameField, setNameField] = useState("");
  const [categoryField, setCategoryField] = useState("");
  const [contentField, setContentField] = useState("");
  const [variablesField, setVariablesField] = useState("");
  const [editingTemplateId, setEditingTemplateId] = useState(null);

  const docxInputRef = useRef(null);

  const categoryOptions = mapSelectOptions(
    [
      { id: "Offer & Onboarding", name: "Offer & Onboarding" },
      { id: "Compliance", name: "Compliance" },
      { id: "Vendor & Contractual", name: "Vendor & Contractual" },
      { id: "Probation & Confirmation", name: "Probation & Confirmation" },
      { id: "Policy & Governance", name: "Policy & Governance" },
    ],
    "id",
    "name"
  );

  const archiveOptions = mapSelectOptions(
    [
      { id: "active", name: "Active" },
      { id: "archived", name: "Archived" },
      { id: "all", name: "All" },
    ],
    "id",
    "name"
  );

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      const matchSearch =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.variables.join(" ").toLowerCase().includes(q);
      const matchCategory = !category || r.category === category;
      const matchArchive =
        !archiveFilter ||
        archiveFilter === "all" ||
        (archiveFilter === "archived" && r.archived) ||
        (archiveFilter === "active" && !r.archived);
      return matchSearch && matchCategory && matchArchive;
    });
  }, [rows, search, category, archiveFilter]);

  const openViewModal = (row) => {
    setViewRow(row);
    setIsViewOpen(true);
  };

  const closeViewModal = () => {
    setViewRow(null);
    setIsViewOpen(false);
  };

  const openNewTemplateModal = () => {
    setEditingTemplateId(null);
    setNameField("");
    setCategoryField("");
    setContentField("");
    setVariablesField("");
    setIsEditorOpen(true);
  };

  const openEditTemplateModal = (row) => {
    setEditingTemplateId(row.id);
    setNameField(row.name);
    setCategoryField(row.category);
    setContentField(row.content);
    setVariablesField(row.variables.join(", "));
    setIsEditorOpen(true);
  };

  const closeEditorModal = () => {
    setIsEditorOpen(false);
    setEditingTemplateId(null);
  };

  const handleSaveTemplate = () => {
    const cleanedName = nameField.trim();
    const cleanedCategory = categoryField.trim();
    if (!cleanedName || !cleanedCategory || !contentField) return;

    const parsedVariables = [...new Set(
      variablesField
        .split(",")
        .map((v) => v.trim().replace(/[{}]/g, ""))
        .filter(Boolean)
    )];

    if (editingTemplateId) {
      setRows((prev) =>
        prev.map((r) =>
          r.id === editingTemplateId
            ? {
                ...r,
                name: cleanedName,
                category: cleanedCategory,
                content: contentField,
                variables: parsedVariables,
                versions: [...r.versions, `v${r.versions.length + 1}.0`],
                updated: "09 Apr 2026, 05:10 PM",
              }
            : r
        )
      );
      closeEditorModal();
      return;
    }

    const newTemplate = {
      id: Date.now(),
      name: cleanedName,
      category: cleanedCategory,
      content: contentField,
      variables: parsedVariables,
      versions: ["v1.0"],
      updated: "09 Apr 2026, 05:10 PM",
      archived: false,
    };
    setRows((prev) => [newTemplate, ...prev]);
    closeEditorModal();
  };

  const handleDuplicateTemplate = (row) => {
    const duplicate = {
      ...row,
      id: Date.now(),
      name: `${row.name} (Copy)`,
      versions: ["v1.0"],
      updated: "09 Apr 2026, 05:15 PM",
      archived: false,
    };
    setRows((prev) => [duplicate, ...prev]);
  };

  const handleArchiveTemplate = (row) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === row.id ? { ...r, archived: !r.archived, updated: "09 Apr 2026, 05:20 PM" } : r
      )
    );
  };

  const variableChips = useMemo(
    () =>
      variablesField
        .split(",")
        .map((v) => v.trim().replace(/[{}]/g, ""))
        .filter(Boolean),
    [variablesField]
  );

  return (
    <Layout>
      <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-base font-semibold text-gray-700">Templates</h2>
            <p className="text-xxs text-gray-500">
              Template library with variables, rich content editor, and version history.
            </p>
          </div>
          <div className="flex gap-2">
            <input
              ref={docxInputRef}
              type="file"
              className="hidden"
              accept=".docx"
            />
            <Button type="button" variant="success" onClick={openNewTemplateModal}>
              <span className="inline-flex items-center gap-1.5">
                <FiFilePlus size={13} />
                New Template
              </span>
            </Button>
            <Button type="button" variant="primary" onClick={() => docxInputRef.current?.click()}>
              <span className="inline-flex items-center gap-1.5">
                <FiUpload size={13} />
                Upload DOCX
              </span>
            </Button>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5">
          <div className="w-full md:w-1/5 flex items-center mb-1">
            <SearchBar placeholder="Search template, category, variable..." onSearch={setSearch} />
          </div>
          <div className="w-full flex items-center justify-end flex-col md:flex-row mt-2 md:mt-0 gap-2">
            <div className="mb-1 w-full md:w-[9rem]">
              <CustomSelect
                name="category_filter"
                value={category}
                placeholder="Category"
                onChange={setCategory}
                options={categoryOptions}
                controlHeight="2rem"
              />
            </div>
            <div className="mb-1 w-full md:w-[9rem]">
              <CustomSelect
                name="archive_filter"
                value={archiveFilter}
                placeholder="Template State"
                onChange={setArchiveFilter}
                options={archiveOptions}
                controlHeight="2rem"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto shadow-md border border-gray-200 rounded max-h-[72vh]">
          <table className="w-full text-xs border-collapse">
            <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left">Template</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Variables</th>
                <th className="px-4 py-3 text-left">Versions</th>
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
                      <p className="font-semibold text-gray-800 truncate max-w-[220px]" title={row.name}>
                        {row.name}
                      </p>
                      <p className="text-[10px] text-gray-500 mt-1">{row.archived ? "Archived template" : "Active template"}</p>
                    </td>
                    <td className="px-4 py-3">{row.category}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1 max-w-[250px]">
                        {row.variables.slice(0, 3).map((v) => (
                          <span
                            key={`${row.id}-${v}`}
                            className="inline-flex items-center rounded-full bg-gray-100 text-gray-700 px-2 py-[2px]"
                          >
                            {`{{${v}}}`}
                          </span>
                        ))}
                        {row.variables.length > 3 && (
                          <span className="inline-flex items-center rounded-full bg-[#edf4ff] text-[#315d9c] px-2 py-[2px]">
                            +{row.variables.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-md bg-[#edf4ff] text-[#315d9c] font-semibold px-2 py-1">
                        {row.versions[row.versions.length - 1]}
                      </span>
                      <p className="text-[10px] text-gray-500 mt-1">{row.versions.length} total</p>
                    </td>
                    <td className="px-4 py-3">{row.updated}</td>

                    <RowActions
                      row={row}
                      actions={[
                        { label: "Preview", icon: FiEye, onClick: (r) => openViewModal(r) },
                        { label: "Duplicate", icon: FiCopy, color: "gold", onClick: (r) => handleDuplicateTemplate(r) },
                        { label: row.archived ? "Unarchive" : "Archive", icon: FiArchive, onClick: (r) => handleArchiveTemplate(r) },
                      ]}
                    />
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500 italic">
                    No templates found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isEditorOpen && (
        <Modal width="w-full md:w-8/12">
          <div className="border-b border-gray-200 pb-3 mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {editingTemplateId ? "Update Template" : "Create New Template"}
            </h3>
            <p className="text-xxs text-gray-500">
              Define template variables and maintain content versions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              label="Name"
              value={nameField}
              onChange={(e) => setNameField(e.target.value)}
              placeholder="Template name"
            />
            <CustomSelect
              name="template_category"
              label="Category"
              value={categoryField}
              onChange={setCategoryField}
              options={categoryOptions}
              placeholder="Select category"
              controlHeight="2rem"
            />
          </div>

          <div className="mt-1">
            <Input
              type="text"
              label="Variables"
              value={variablesField}
              onChange={(e) => setVariablesField(e.target.value)}
              placeholder="employee_name, company_name, start_date"
              noMargin
            />
            <p className="text-[10px] text-gray-500 mt-1">
              Comma-separated values. Use in content as {"{{variable_name}}"}.
            </p>
            {variableChips.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {variableChips.map((v) => (
                  <span
                    key={v}
                    className="inline-flex items-center rounded-full bg-gray-100 text-gray-700 px-2 py-[2px] text-xxs"
                  >
                    {`{{${v}}}`}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-xxs font-medium text-gray-700 mb-1">Content</label>
            <RichTextEditor
              value={contentField}
              onChange={setContentField}
              placeholder="Write template body with variables..."
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="cancel" onClick={closeEditorModal}>
              Cancel
            </Button>
            <Button type="button" variant="success" onClick={handleSaveTemplate}>
              {editingTemplateId ? "Save Version" : "Create Template"}
            </Button>
          </div>
        </Modal>
      )}

      {isViewOpen && viewRow && (
        <Modal width="w-full md:w-7/12">
          <div className="border-b border-gray-200 pb-3 mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Template Preview</h3>
            <p className="text-xxs text-gray-500">Review details and content before using this template.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xxs text-gray-700">
            <div className="rounded border border-gray-200 p-2">
              <p className="text-gray-500">Template</p>
              <p className="font-semibold text-gray-800 mt-0.5">{viewRow.name}</p>
            </div>
            <div className="rounded border border-gray-200 p-2">
              <p className="text-gray-500">Category</p>
              <p className="font-semibold text-gray-800 mt-0.5">{viewRow.category}</p>
            </div>
            <div className="rounded border border-gray-200 p-2">
              <p className="text-gray-500">Current Version</p>
              <p className="font-semibold text-gray-800 mt-0.5">{viewRow.versions[viewRow.versions.length - 1]}</p>
            </div>
            <div className="rounded border border-gray-200 p-2">
              <p className="text-gray-500">Updated</p>
              <p className="font-semibold text-gray-800 mt-0.5">{viewRow.updated}</p>
            </div>
          </div>

          <div className="mt-3">
            <p className="text-xxs font-semibold text-gray-700 mb-1">Variables</p>
            <div className="flex flex-wrap gap-1">
              {viewRow.variables.map((v) => (
                <span
                  key={`${viewRow.id}-preview-${v}`}
                  className="inline-flex items-center rounded-full bg-gray-100 text-gray-700 px-2 py-[2px] text-xxs"
                >
                  {`{{${v}}}`}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-3 rounded border border-gray-200 bg-gray-50 p-3">
            <p className="text-xxs font-semibold text-gray-700 mb-2">Content Preview</p>
            <div
              className="text-xxs text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: viewRow.content }}
            />
          </div>

          <div className="mt-3">
            <p className="text-xxs font-semibold text-gray-700 mb-1">Version History</p>
            <ul className="space-y-1">
              {viewRow.versions
                .slice()
                .reverse()
                .map((v) => (
                  <li
                    key={`${viewRow.id}-${v}`}
                    className="rounded bg-gray-50 border border-gray-200 px-2 py-1 text-xxs text-gray-600"
                  >
                    {v}
                  </li>
                ))}
            </ul>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="cancel" onClick={closeViewModal}>
              Close
            </Button>
            <Button type="button" variant="secondary" onClick={() => openEditTemplateModal(viewRow)}>
              Edit
            </Button>
          </div>
        </Modal>
      )}
    </Layout>
  );
}
