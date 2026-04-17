"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "y@/app/components/Layout";
import Tabs from "y@/app/components/Tabs";
import Input from "y@/app/components/Input";
import SearchBar from "y@/app/components/SearchBar";
import CustomSelect from "y@/app/components/CustomSelect";
import FileUpload from "y@/app/components/FileUpload";
import Button from "y@/app/components/Button";
import StatusDesign from "y@/app/components/StatusColors";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import { FiAlertTriangle, FiPlus, FiTrash2 } from "react-icons/fi";

const TABS = [
  { key: "basics", label: "Basics" },
  { key: "job", label: "Job" },
  { key: "contacts", label: "Contacts" },
  { key: "documents", label: "Documents" },
  { key: "assets", label: "Assets" },
  { key: "custom", label: "Custom Fields" },
];

const existingProfiles = [
  { email: "ahsan.qureshi@kairos.com", phone: "+92 300 1112233", name: "Ahsan Qureshi" },
  { email: "sana.malik@kairos.com", phone: "+92 321 1118866", name: "Sana Malik" },
];

export default function NewEMP() {
  const router = useRouter();

  const [form, setForm] = useState({
    basics: {
      name: "",
      gender: "",
      dob: "",
      email: "",
      phone: "",
      address: "",
    },
    job: {
      empId: "",
      doj: "",
      role: "",
      grade: "",
      dept: "",
      team: "",
      manager: "",
      location: "",
      type: "",
      workMode: "",
    },
    contacts: {
      emergencyName: "",
      emergencyRelation: "",
      emergencyPhone: "",
    },
    documents: {
      idProof: null,
      resume: null,
      offerLetter: null,
    },
    assets: {
      assignedAssets: [],
    },
    custom: {
      fields: [{ label: "", value: "" }],
    },
  });

  const duplicateMatch = useMemo(() => {
    const email = form.basics.email.trim().toLowerCase();
    const phone = form.basics.phone.trim();
    return existingProfiles.find(
      (p) =>
        (email && p.email.toLowerCase() === email) ||
        (phone && p.phone.replace(/\s+/g, "") === phone.replace(/\s+/g, ""))
    );
  }, [form.basics.email, form.basics.phone]);

  const genderOptions = mapSelectOptions(
    [
      { id: "Male", name: "Male" },
      { id: "Female", name: "Female" },
      { id: "Other", name: "Other" },
    ],
    "id",
    "name"
  );
  const roleOptions = mapSelectOptions(
    [
      { id: "Software Engineer", name: "Software Engineer" },
      { id: "HR Executive", name: "HR Executive" },
      { id: "Data Analyst", name: "Data Analyst" },
      { id: "Accounts Executive", name: "Accounts Executive" },
    ],
    "id",
    "name"
  );
  const gradeOptions = mapSelectOptions(
    [
      { id: "G1", name: "G1" },
      { id: "G2", name: "G2" },
      { id: "G3", name: "G3" },
      { id: "G4", name: "G4" },
    ],
    "id",
    "name"
  );
  const deptOptions = mapSelectOptions(
    [
      { id: "IT", name: "IT" },
      { id: "HR", name: "HR" },
      { id: "Finance", name: "Finance" },
      { id: "Operations", name: "Operations" },
      { id: "Marketing", name: "Marketing" },
    ],
    "id",
    "name"
  );
  const teamOptions = mapSelectOptions(
    [
      { id: "Backend Team", name: "Backend Team" },
      { id: "People Ops", name: "People Ops" },
      { id: "Accounts Team", name: "Accounts Team" },
      { id: "Support Team", name: "Support Team" },
    ],
    "id",
    "name"
  );
  const managerOptions = mapSelectOptions(
    [
      { id: "Ali Imran", name: "Ali Imran" },
      { id: "Zubair Khan", name: "Zubair Khan" },
      { id: "Maryam Fatima", name: "Maryam Fatima" },
      { id: "Ayesha Noor", name: "Ayesha Noor" },
    ],
    "id",
    "name"
  );
  const locationOptions = mapSelectOptions(
    [
      { id: "Lahore", name: "Lahore" },
      { id: "Karachi", name: "Karachi" },
      { id: "Islamabad", name: "Islamabad" },
      { id: "Remote", name: "Remote" },
    ],
    "id",
    "name"
  );
  const typeOptions = mapSelectOptions(
    [
      { id: "Full-Time", name: "Full-Time" },
      { id: "Part-Time", name: "Part-Time" },
      { id: "Contract", name: "Contract" },
      { id: "Intern", name: "Intern" },
    ],
    "id",
    "name"
  );
  const workModeOptions = mapSelectOptions(
    [
      { id: "Onsite", name: "Onsite" },
      { id: "Hybrid", name: "Hybrid" },
      { id: "Remote", name: "Remote" },
    ],
    "id",
    "name"
  );
  const relationOptions = mapSelectOptions(
    [
      { id: "Father", name: "Father" },
      { id: "Mother", name: "Mother" },
      { id: "Spouse", name: "Spouse" },
      { id: "Sibling", name: "Sibling" },
    ],
    "id",
    "name"
  );

  const assetInventory = [
    {
      id: "AST-1001",
      type: "Laptop",
      model: "Dell Latitude 5440",
      serial: "DL5440-88K2",
      condition: "Excellent",
      status: "Available",
      location: "Lahore",
    },
    {
      id: "AST-1002",
      type: "Laptop",
      model: "HP EliteBook 840",
      serial: "HP840-F2Q9",
      condition: "Good",
      status: "Assigned",
      location: "Karachi",
    },
    {
      id: "AST-1031",
      type: "Access Card",
      model: "RFID Card",
      serial: "RFID-11392",
      condition: "Excellent",
      status: "Available",
      location: "Lahore",
    },
    {
      id: "AST-1044",
      type: "Headset",
      model: "Jabra Evolve2 40",
      serial: "JB40-7721",
      condition: "Excellent",
      status: "Available",
      location: "Islamabad",
    },
    {
      id: "AST-1052",
      type: "Monitor",
      model: "Dell P2422H",
      serial: "DP24-9922",
      condition: "Good",
      status: "Maintenance",
      location: "Lahore",
    },
    {
      id: "AST-1068",
      type: "Official SIM",
      model: "Corporate SIM",
      serial: "SIM-88816",
      condition: "Excellent",
      status: "Available",
      location: "Karachi",
    },
  ];
  const [assetTypeFilter, setAssetTypeFilter] = useState("");
  const [assetStatusFilter, setAssetStatusFilter] = useState("Available");
  const [assetSearch, setAssetSearch] = useState("");
  const assetTypeOptions = mapSelectOptions(
    [...new Set(assetInventory.map((a) => a.type))].map((v, i) => ({ id: `${i}`, name: v })),
    "id",
    "name"
  );
  const assetStatusOptions = mapSelectOptions(
    [
      { id: "Available", name: "Available" },
      { id: "Assigned", name: "Assigned" },
      { id: "Maintenance", name: "Maintenance" },
    ],
    "id",
    "name"
  );

  const updateSection = (section, field, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const toggleAsset = (assetId) => {
    setForm((prev) => {
      const already = prev.assets.assignedAssets.includes(assetId);
      return {
        ...prev,
        assets: {
          ...prev.assets,
          assignedAssets: already
            ? prev.assets.assignedAssets.filter((x) => x !== assetId)
            : [...prev.assets.assignedAssets, assetId],
        },
      };
    });
  };

  const addCustomField = () => {
    setForm((prev) => ({
      ...prev,
      custom: { ...prev.custom, fields: [...prev.custom.fields, { label: "", value: "" }] },
    }));
  };

  const updateCustomField = (idx, key, value) => {
    setForm((prev) => ({
      ...prev,
      custom: {
        ...prev.custom,
        fields: prev.custom.fields.map((f, i) => (i === idx ? { ...f, [key]: value } : f)),
      },
    }));
  };

  const removeCustomField = (idx) => {
    setForm((prev) => ({
      ...prev,
      custom: {
        ...prev.custom,
        fields:
          prev.custom.fields.length === 1
            ? prev.custom.fields
            : prev.custom.fields.filter((_, i) => i !== idx),
      },
    }));
  };

  const handleSaveDraft = () => {
    alert("Employee draft saved.");
  };

  const handleCreate = () => {
    if (!form.basics.name || !form.basics.email || !form.job.empId || !form.job.doj) {
      alert("Please complete required fields in Basics and Job tabs.");
      return;
    }
    alert("Employee created successfully.");
  };

  const renderBasics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <Input
        label="Name"
        value={form.basics.name}
        onChange={(e) => updateSection("basics", "name", e.target.value)}
        placeholder="Employee full name"
        isRequired
        noMargin
      />
      <CustomSelect
        label="Gender"
        name="gender"
        value={form.basics.gender}
        onChange={(v) => updateSection("basics", "gender", v)}
        options={genderOptions}
        placeholder="Select gender"
        controlHeight="2rem"
      />
      <Input
        label="DOB"
        type="date"
        value={form.basics.dob}
        onChange={(e) => updateSection("basics", "dob", e.target.value)}
        placeholder="Select date of birth"
        noMargin
      />
      <Input
        label="Email"
        type="email"
        value={form.basics.email}
        onChange={(e) => updateSection("basics", "email", e.target.value)}
        placeholder="name@company.com"
        isRequired
        noMargin
      />
      <Input
        label="Phone"
        value={form.basics.phone}
        onChange={(e) => updateSection("basics", "phone", e.target.value)}
        placeholder="+92 ..."
        isRequired
        noMargin
      />
      <div className="md:col-span-2">
        <Input
          label="Address"
          value={form.basics.address}
          onChange={(e) => updateSection("basics", "address", e.target.value)}
          placeholder="Residential address"
          noMargin
        />
      </div>
    </div>
  );

  const renderJob = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <Input
        label="Emp ID"
        value={form.job.empId}
        onChange={(e) => updateSection("job", "empId", e.target.value)}
        placeholder="EMP1010"
        isRequired
        noMargin
      />
      <Input
        label="DOJ"
        type="date"
        value={form.job.doj}
        onChange={(e) => updateSection("job", "doj", e.target.value)}
        placeholder="Select date of joining"
        isRequired
        noMargin
      />
      <CustomSelect
        label="Role"
        name="role"
        value={form.job.role}
        onChange={(v) => updateSection("job", "role", v)}
        options={roleOptions}
        placeholder="Select role"
        controlHeight="2rem"
      />
      <CustomSelect
        label="Grade"
        name="grade"
        value={form.job.grade}
        onChange={(v) => updateSection("job", "grade", v)}
        options={gradeOptions}
        placeholder="Select grade"
        controlHeight="2rem"
      />
      <CustomSelect
        label="Dept"
        name="dept"
        value={form.job.dept}
        onChange={(v) => updateSection("job", "dept", v)}
        options={deptOptions}
        placeholder="Select department"
        controlHeight="2rem"
      />
      <CustomSelect
        label="Team"
        name="team"
        value={form.job.team}
        onChange={(v) => updateSection("job", "team", v)}
        options={teamOptions}
        placeholder="Select team"
        controlHeight="2rem"
      />
      <CustomSelect
        label="Manager"
        name="manager"
        value={form.job.manager}
        onChange={(v) => updateSection("job", "manager", v)}
        options={managerOptions}
        placeholder="Select manager"
        controlHeight="2rem"
      />
      <CustomSelect
        label="Location"
        name="location"
        value={form.job.location}
        onChange={(v) => updateSection("job", "location", v)}
        options={locationOptions}
        placeholder="Select location"
        controlHeight="2rem"
      />
      <CustomSelect
        label="Type"
        name="type"
        value={form.job.type}
        onChange={(v) => updateSection("job", "type", v)}
        options={typeOptions}
        placeholder="Select employment type"
        controlHeight="2rem"
      />
      <CustomSelect
        label="Work Mode"
        name="work_mode"
        value={form.job.workMode}
        onChange={(v) => updateSection("job", "workMode", v)}
        options={workModeOptions}
        placeholder="Select work mode"
        controlHeight="2rem"
      />
    </div>
  );

  const renderContacts = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <Input
        label="Emergency Contact Name"
        value={form.contacts.emergencyName}
        onChange={(e) => updateSection("contacts", "emergencyName", e.target.value)}
        placeholder="Emergency contact full name"
        noMargin
      />
      <CustomSelect
        label="Relation"
        name="relation"
        value={form.contacts.emergencyRelation}
        onChange={(v) => updateSection("contacts", "emergencyRelation", v)}
        options={relationOptions}
        placeholder="Select relation"
        controlHeight="2rem"
      />
      <Input
        label="Emergency Phone"
        value={form.contacts.emergencyPhone}
        onChange={(e) => updateSection("contacts", "emergencyPhone", e.target.value)}
        placeholder="+92 ..."
        noMargin
      />
    </div>
  );

  const renderDocuments = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <FileUpload
        label="ID Document"
        name="idProof"
        value={form.documents.idProof}
        onChange={(e) => updateSection("documents", "idProof", e.target.files?.[0] || null)}
        noMargin
      />
      <FileUpload
        label="Resume"
        name="resume"
        value={form.documents.resume}
        onChange={(e) => updateSection("documents", "resume", e.target.files?.[0] || null)}
        noMargin
      />
      <FileUpload
        label="Offer Letter"
        name="offerLetter"
        value={form.documents.offerLetter}
        onChange={(e) => updateSection("documents", "offerLetter", e.target.files?.[0] || null)}
        noMargin
      />
    </div>
  );

  const renderAssets = () => {
    const q = assetSearch.trim().toLowerCase();
    const filteredAssets = assetInventory.filter((a) => {
      const typeOk = !assetTypeFilter || a.type === assetTypeFilter;
      const statusOk = !assetStatusFilter || a.status === assetStatusFilter;
      const searchOk =
        !q ||
        a.id.toLowerCase().includes(q) ||
        a.serial.toLowerCase().includes(q) ||
        a.model.toLowerCase().includes(q) ||
        a.type.toLowerCase().includes(q);
      return typeOk && statusOk && searchOk;
    });

    return (
      <div>
        <p className="text-xxs text-gray-600 mb-2">
          Assign specific assets from inventory records.
        </p>

        <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mb-3">
          <div className="w-full md:w-1/4 flex items-center mb-1">
            <SearchBar
              placeholder="Search asset id, serial, model..."
              onSearch={setAssetSearch}
            />
          </div>
          <div className="w-full flex items-center justify-end flex-col md:flex-row mt-2 md:mt-0 gap-2">
            <div className="mb-1 w-full md:w-[9rem]">
              <CustomSelect
                name="asset_type_filter"
                value={assetTypeFilter}
                onChange={setAssetTypeFilter}
                options={assetTypeOptions}
                placeholder="Asset Type"
                controlHeight="2rem"
              />
            </div>
            <div className="mb-1 w-full md:w-[9rem]">
              <CustomSelect
                name="asset_status_filter"
                value={assetStatusFilter}
                onChange={setAssetStatusFilter}
                options={assetStatusOptions}
                placeholder="Asset Status"
                controlHeight="2rem"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded bg-white max-h-[38vh]">
          <table className="w-full text-xxs border-collapse">
            <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
              <tr>
                <th className="px-3 py-2 text-left">Assign</th>
                <th className="px-3 py-2 text-left">Asset ID</th>
                <th className="px-3 py-2 text-left">Type</th>
                <th className="px-3 py-2 text-left">Model</th>
                <th className="px-3 py-2 text-left">Serial</th>
                <th className="px-3 py-2 text-left">Condition</th>
                <th className="px-3 py-2 text-left">Location</th>
                <th className="px-3 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.length > 0 ? (
                filteredAssets.map((asset, idx) => {
                  const isSelected = form.assets.assignedAssets.includes(asset.id);
                  const assignable = asset.status === "Available";
                  return (
                    <tr
                      key={asset.id}
                      className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
                    >
                      <td className="px-3 py-2">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          disabled={!assignable}
                          onChange={() => toggleAsset(asset.id)}
                          className="cursor-pointer disabled:cursor-not-allowed"
                        />
                      </td>
                      <td className="px-3 py-2 font-semibold text-gray-700">{asset.id}</td>
                      <td className="px-3 py-2">{asset.type}</td>
                      <td className="px-3 py-2">{asset.model}</td>
                      <td className="px-3 py-2">{asset.serial}</td>
                      <td className="px-3 py-2">{asset.condition}</td>
                      <td className="px-3 py-2">{asset.location}</td>
                      <td className="px-3 py-2">
                        <StatusDesign
                          statusId={
                            asset.status === "Available"
                              ? 1
                              : asset.status === "Assigned"
                                ? 3
                                : 2
                          }
                          label={asset.status}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-5 text-gray-500 italic">
                    No assets found for selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="text-[10px] text-gray-500 mt-2">
          Selected assets: {form.assets.assignedAssets.length}
        </p>
      </div>
    );
  };

  const renderCustom = () => (
    <div>
      <div className="flex justify-between items-center mb-2">
        <p className="text-xxs text-gray-600">Add custom fields for your policy needs.</p>
        <Button type="button" variant="secondary" onClick={addCustomField}>
          <span className="inline-flex items-center gap-1.5">
            <FiPlus size={12} />
            Add Field
          </span>
        </Button>
      </div>
      <div className="space-y-2">
        {form.custom.fields.map((field, idx) => (
          <div key={`custom-${idx}`} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2">
            <Input
              placeholder="Field label"
              value={field.label}
              onChange={(e) => updateCustomField(idx, "label", e.target.value)}
              noMargin
            />
            <Input
              placeholder="Field value"
              value={field.value}
              onChange={(e) => updateCustomField(idx, "value", e.target.value)}
              noMargin
            />
            <button
              type="button"
              className="h-8 px-2 rounded border border-gray-300 text-gray-500 hover:text-red-600 hover:border-red-300 cursor-pointer"
              onClick={() => removeCustomField(idx)}
            >
              <FiTrash2 size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const tabDefinitions = [
    {
      key: "basics",
      label: "Basics",
      content: renderBasics(),
    },
    {
      key: "job",
      label: "Job",
      content: renderJob(),
    },
    {
      key: "contacts",
      label: "Contacts",
      content: renderContacts(),
    },
    {
      key: "documents",
      label: "Documents",
      content: renderDocuments(),
    },
    {
      key: "assets",
      label: "Assets",
      content: renderAssets(),
    },
    {
      key: "custom",
      label: "Custom Fields",
      content: renderCustom(),
    },
  ];

  return (
    <Layout>
      <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-gray-700">Add Employee</h2>
            <p className="text-xxs text-gray-500">
              Multi-tab employee creation with draft save and duplicate detection.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="cancel" onClick={() => router.push("/employees/list")}>
              Cancel
            </Button>
            <Button type="button" variant="secondary" onClick={handleSaveDraft}>
              Save Draft
            </Button>
            <Button type="button" variant="success" onClick={handleCreate}>
              Create Employee
            </Button>
          </div>
        </div>

        {duplicateMatch && (
          <div className="mt-4 rounded border border-[#ffd9a8] bg-[#fff7eb] text-[#8a5b1f] px-3 py-2 text-xxs flex items-center gap-2">
            <FiAlertTriangle size={14} />
            Possible duplicate found with existing employee:{" "}
            <span className="font-semibold">{duplicateMatch.name}</span>
          </div>
        )}

        <div className="mt-2">
          <Tabs tabs={tabDefinitions} defaultTab="basics" />
        </div>
      </div>
    </Layout>
  );
}
