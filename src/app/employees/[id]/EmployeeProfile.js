"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "y@/app/components/Layout";
import Tabs from "y@/app/components/Tabs";
import Button from "y@/app/components/Button";
import Input from "y@/app/components/Input";
import RichTextEditor from "y@/app/components/RichTextEditor";
import CustomSelect from "y@/app/components/CustomSelect";
import FileUpload from "y@/app/components/FileUpload";
import Modal from "y@/app/components/ModalShell";
import StatusDesign from "y@/app/components/StatusColors";
import RowActions from "y@/app/components/RowActions";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import { FiFileText, FiMapPin, FiUploadCloud, FiUser, FiUsers, FiMail, FiPhone, FiBriefcase, FiLock, FiPlus, FiTrash2, FiEdit3, FiDownload, FiRefreshCw, FiCornerUpLeft, FiAlertTriangle } from "react-icons/fi";

const profileSeed = {
  "EMP1001": {
    empId: "EMP1001",
    name: "Ahsan Qureshi",
    role: "Software Engineer",
    dept: "IT",
    team: "Backend Team",
    manager: "Ali Imran",
    location: "Lahore",
    status: "Active",
    statusId: 1,
    email: "ahsan.qureshi@kairos.com",
    phone: "+92 300 1112233",
    dob: "1998-04-22",
    gender: "Male",
    joined: "2022-05-14",
    employmentType: "Full-Time",
    workMode: "Hybrid",
    address: "Model Town, Lahore",
    nationalId: "35202-1234567-1",
    emergency: {
      name: "Qureshi Ahmed",
      relation: "Father",
      phone: "+92 301 7722004",
    },
    notes: [
      { id: 1, title: "Performance", text: "Consistently delivered on release cycles.", by: "HR Admin" },
      { id: 2, title: "Manager Feedback", text: "Strong ownership in backend APIs.", by: "Ali Imran" },
    ],
    documents: [
      { id: 1, name: "Offer Letter.pdf", type: "Offer Letter", uploadedOn: "2022-05-10" },
      { id: 2, name: "CNIC.pdf", type: "ID Document", uploadedOn: "2022-05-11" },
    ],
    assets: [
      { id: "AST-1001", type: "Laptop", model: "Dell Latitude 5440", serial: "DL5440-88K2", status: "Assigned" },
      { id: "AST-1031", type: "Access Card", model: "RFID Card", serial: "RFID-11392", status: "Assigned" },
    ],
  },
};

const defaultProfile = {
  empId: "EMP-UNKNOWN",
  name: "Unknown Employee",
  role: "N/A",
  dept: "N/A",
  team: "N/A",
  manager: "N/A",
  location: "N/A",
  status: "Pending",
  statusId: 3,
  email: "n/a",
  phone: "n/a",
  dob: "n/a",
  gender: "n/a",
  joined: "2024-01-01",
  employmentType: "N/A",
  workMode: "N/A",
  address: "n/a",
  nationalId: "n/a",
  emergency: { name: "n/a", relation: "n/a", phone: "n/a" },
  notes: [],
  documents: [],
  assets: [],
};

const viewerRole = "HR Admin";

const rolePermissions = {
  "HR Admin": ["overview", "personal", "job", "contacts", "documents", "assets", "history", "access-log", "custom-fields", "api-integrations", "notes"],
  Manager: ["overview", "personal", "job", "contacts", "documents", "assets", "history", "access-log", "custom-fields", "api-integrations", "notes"],
  Employee: ["overview", "personal", "job", "contacts", "documents", "assets", "custom-fields"],
};

export default function EmployeeProfile({ employeeId }) {
  const router = useRouter();
  const profile = profileSeed[employeeId] || { ...defaultProfile, empId: employeeId || defaultProfile.empId };

  const [notes, setNotes] = useState(profile.notes);
  const [docs, setDocs] = useState(
    (profile.documents || []).map((doc, idx) => ({
      id: doc.id || Date.now() + idx,
      title: doc.title || doc.name || "Untitled Document",
      type: doc.type || "Document",
      version: doc.version || "v1",
      uploadedBy: doc.uploadedBy || "HR Admin",
      date: doc.date || doc.uploadedOn || "2025-01-01",
      tags: Array.isArray(doc.tags) ? doc.tags : [],
      status: doc.status || "Active",
      statusId: doc.statusId || 1,
      name: doc.name || doc.title || "Document.pdf",
    }))
  );
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: profile.emergency.name,
      relation: profile.emergency.relation,
      phone: profile.emergency.phone,
      priority: "Primary",
    },
  ]);
  const [assets, setAssets] = useState(
    (profile.assets || []).map((asset, idx) => ({
      id: asset.id || `AST-${Date.now()}-${idx}`,
      type: asset.type || "Asset",
      serialOrId: asset.serial || asset.id || "",
      assignedOn: asset.assignedOn || profile.joined || new Date().toISOString().slice(0, 10),
      status: asset.status || "Assigned",
      statusId: asset.statusId || 3,
    }))
  );

  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [editingContactId, setEditingContactId] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    relation: "",
    phone: "",
    priority: "",
  });

  const [isDocOpen, setIsDocOpen] = useState(false);
  const [docTitle, setDocTitle] = useState("");
  const [docType, setDocType] = useState("");
  const [docTags, setDocTags] = useState("");
  const [docFile, setDocFile] = useState(null);
  const [replacingDocId, setReplacingDocId] = useState(null);
  const [isAssetOpen, setIsAssetOpen] = useState(false);
  const [assetMode, setAssetMode] = useState("assign");
  const [assetForm, setAssetForm] = useState({
    type: "",
    serialOrId: "",
    assignedOn: new Date().toISOString().slice(0, 10),
    selectedAssetId: "",
  });
  const [defaultTab, setDefaultTab] = useState("overview");
  const [tabsKey, setTabsKey] = useState(0);
  const [personalForm, setPersonalForm] = useState({
    name: profile.name,
    gender: profile.gender,
    dob: profile.dob,
    nationalId: profile.nationalId,
    address: profile.address,
    contact: profile.phone,
  });
  const [jobForm, setJobForm] = useState({
    role: profile.role,
    grade: "G3",
    dept: profile.dept,
    team: profile.team,
    manager: profile.manager,
    location: profile.location,
    employmentType: profile.employmentType,
    effectiveFrom: profile.joined,
    effectiveTo: "",
  });
  const [statusHistory] = useState([
    {
      id: 1,
      status: "Onboarded",
      statusId: 1,
      effectiveFrom: profile.joined,
      effectiveTo: "2023-03-31",
      updatedBy: "HR Admin",
    },
    {
      id: 2,
      status: "Confirmed",
      statusId: 1,
      effectiveFrom: "2023-04-01",
      effectiveTo: "2025-01-31",
      updatedBy: "HR Admin",
    },
    {
      id: 3,
      status: "Role Updated",
      statusId: 3,
      effectiveFrom: "2025-02-01",
      effectiveTo: "Present",
      updatedBy: "Ali Imran",
    },
  ]);
  const [changeHistory] = useState([
    {
      id: 1,
      field: "Role",
      oldValue: "Software Engineer",
      newValue: "Senior Software Engineer",
      by: "HR Admin",
      timestamp: "2026-02-10 10:42",
    },
    {
      id: 2,
      field: "Manager",
      oldValue: "Ali Imran",
      newValue: "Zubair Khan",
      by: "HR Admin",
      timestamp: "2026-01-04 14:17",
    },
    {
      id: 3,
      field: "Employment Type",
      oldValue: "Contract",
      newValue: "Full-Time",
      by: "HR Admin",
      timestamp: "2025-12-01 09:25",
    },
  ]);
  const [accessLogs] = useState([
    {
      id: 1,
      viewer: "HR Admin",
      purpose: "Contract Renewal Review",
      ip: "10.0.1.24",
      timestamp: "2026-03-12 11:08",
    },
    {
      id: 2,
      viewer: "Ali Imran",
      purpose: "Performance Discussion Prep",
      ip: "10.0.3.91",
      timestamp: "2026-03-10 16:41",
    },
    {
      id: 3,
      viewer: "Payroll Team",
      purpose: "Compensation Validation",
      ip: "10.0.7.12",
      timestamp: "2026-03-05 09:33",
    },
  ]);
  const [customFields, setCustomFields] = useState([
    { id: 1, label: "Shirt Size", type: "text", value: "M", required: false },
    { id: 2, label: "Probation End Date", type: "date", value: "2026-06-30", required: true },
    { id: 3, label: "ERP Access Level", type: "select", value: "Level 2", required: false },
  ]);
  const [newCustomField, setNewCustomField] = useState({
    label: "",
    type: "text",
    value: "",
    required: false,
  });
  const [integrationRows, setIntegrationRows] = useState([
    {
      id: 1,
      system: "Payroll Engine",
      externalId: "PR-EXT-1001",
      lastSync: "2026-04-11 09:41",
      status: "Connected",
      statusId: 1,
    },
    {
      id: 2,
      system: "ATS",
      externalId: "ATS-E-88A1",
      lastSync: "2026-04-10 14:22",
      status: "Connected",
      statusId: 1,
    },
    {
      id: 3,
      system: "Biometric Device",
      externalId: "BIO-5562",
      lastSync: "2026-04-08 18:06",
      status: "Sync Pending",
      statusId: 3,
    },
  ]);

  const docTypeOptions = mapSelectOptions(
    [
      { id: "Offer Letter", name: "Offer Letter" },
      { id: "ID Document", name: "ID Document" },
      { id: "Contract", name: "Contract" },
      { id: "Policy Ack", name: "Policy Ack" },
    ],
    "id",
    "name"
  );

  const permissions = rolePermissions[viewerRole] || rolePermissions.Employee;
  const canEditPersonal = viewerRole === "HR Admin";
  const canEditJob = viewerRole === "HR Admin" || viewerRole === "Manager";
  const canEditContacts = viewerRole === "HR Admin" || viewerRole === "Manager";
  const canEditDocuments = viewerRole === "HR Admin" || viewerRole === "Manager";
  const canEditAssets = viewerRole === "HR Admin" || viewerRole === "Manager";
  const canViewHistory = viewerRole === "HR Admin" || viewerRole === "Manager";
  const canViewAccessLog = viewerRole === "HR Admin" || viewerRole === "Manager";
  const canEditCustomFields = viewerRole === "HR Admin" || viewerRole === "Manager";
  const canEditIntegrations = viewerRole === "HR Admin" || viewerRole === "Manager";
  const roleOptions = mapSelectOptions(
    [
      { id: "Software Engineer", name: "Software Engineer" },
      { id: "Senior Software Engineer", name: "Senior Software Engineer" },
      { id: "Team Lead", name: "Team Lead" },
      { id: "HR Executive", name: "HR Executive" },
      { id: "Data Analyst", name: "Data Analyst" },
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
      { id: "G5", name: "G5" },
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
  const employmentTypeOptions = mapSelectOptions(
    [
      { id: "Full-Time", name: "Full-Time" },
      { id: "Part-Time", name: "Part-Time" },
      { id: "Contract", name: "Contract" },
      { id: "Intern", name: "Intern" },
    ],
    "id",
    "name"
  );
  const assetTypeOptions = mapSelectOptions(
    [
      { id: "Laptop", name: "Laptop" },
      { id: "Access Card", name: "Access Card" },
      { id: "Headset", name: "Headset" },
      { id: "Mobile Device", name: "Mobile Device" },
      { id: "Monitor", name: "Monitor" },
    ],
    "id",
    "name"
  );
  const contactRelationOptions = mapSelectOptions(
    [
      { id: "Father", name: "Father" },
      { id: "Mother", name: "Mother" },
      { id: "Spouse", name: "Spouse" },
      { id: "Sibling", name: "Sibling" },
      { id: "Friend", name: "Friend" },
    ],
    "id",
    "name"
  );
  const contactPriorityOptions = mapSelectOptions(
    [
      { id: "Primary", name: "Primary" },
      { id: "Secondary", name: "Secondary" },
    ],
    "id",
    "name"
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === "#personal") {
      setDefaultTab("personal");
      setTabsKey((k) => k + 1);
      return;
    }
    if (window.location.hash === "#job") {
      setDefaultTab("job");
      setTabsKey((k) => k + 1);
      return;
    }
    if (window.location.hash === "#contacts") {
      setDefaultTab("contacts");
      setTabsKey((k) => k + 1);
      return;
    }
    if (window.location.hash === "#documents") {
      setDefaultTab("documents");
      setTabsKey((k) => k + 1);
      return;
    }
    if (window.location.hash === "#assets") {
      setDefaultTab("assets");
      setTabsKey((k) => k + 1);
      return;
    }
    if (window.location.hash === "#history") {
      setDefaultTab("history");
      setTabsKey((k) => k + 1);
      return;
    }
    if (window.location.hash === "#access-log") {
      setDefaultTab("access-log");
      setTabsKey((k) => k + 1);
      return;
    }
    if (window.location.hash === "#custom-fields") {
      setDefaultTab("custom-fields");
      setTabsKey((k) => k + 1);
      return;
    }
    if (window.location.hash === "#api-&-integrations") {
      setDefaultTab("api-integrations");
      setTabsKey((k) => k + 1);
    }
  }, []);

  const tenure = useMemo(() => {
    const joinedDate = new Date(profile.joined);
    if (Number.isNaN(joinedDate.getTime())) return "N/A";
    const now = new Date();
    const months = (now.getFullYear() - joinedDate.getFullYear()) * 12 + (now.getMonth() - joinedDate.getMonth());
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    return `${years}y ${Math.max(remMonths, 0)}m`;
  }, [profile.joined]);

  const quickStats = [
    {
      label: "Tenure",
      value: tenure,
      icon: FiBriefcase,
      iconBg: "bg-[#edf4ff]",
      iconColor: "text-[#315d9c]",
    },
    {
      label: "Documents",
      value: String(docs.length),
      icon: FiFileText,
      iconBg: "bg-[#effaf3]",
      iconColor: "text-[#2f7d4f]",
    },
    {
      label: "Assets",
      value: String(assets.length),
      icon: FiUsers,
      iconBg: "bg-[#fff8ed]",
      iconColor: "text-[#9a5d1d]",
    },
    {
      label: "Notes",
      value: String(notes.length),
      icon: FiMail,
      iconBg: "bg-[#f5f4ff]",
      iconColor: "text-[#5f54b7]",
    },
  ];

  const cardCls = "rounded-xl border border-gray-200 bg-white p-4 shadow-sm";
  const kvLabel = "text-[10px] uppercase tracking-wide text-gray-500";
  const kvValue = "text-xs font-medium text-gray-800";

  const overviewContent = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <div className={cardCls}>
        <p className="text-xs font-semibold text-gray-700">Personal Snapshot</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <p className={kvLabel}>Name</p>
            <p className={kvValue}>{profile.name}</p>
          </div>
          <div>
            <p className={kvLabel}>Gender</p>
            <p className={kvValue}>{profile.gender}</p>
          </div>
          <div>
            <p className={kvLabel}>DOB</p>
            <p className={kvValue}>{profile.dob}</p>
          </div>
          <div>
            <p className={kvLabel}>Phone</p>
            <p className={kvValue}>{profile.phone}</p>
          </div>
        </div>
      </div>
      <div className={cardCls}>
        <p className="text-xs font-semibold text-gray-700">Job Snapshot</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <p className={kvLabel}>Role</p>
            <p className={kvValue}>{profile.role}</p>
          </div>
          <div>
            <p className={kvLabel}>Dept</p>
            <p className={kvValue}>{profile.dept}</p>
          </div>
          <div>
            <p className={kvLabel}>Team</p>
            <p className={kvValue}>{profile.team}</p>
          </div>
          <div>
            <p className={kvLabel}>Joined</p>
            <p className={kvValue}>{profile.joined}</p>
          </div>
        </div>
      </div>
      <div className={cardCls}>
        <p className="text-xs font-semibold text-gray-700">Work Details</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <p className={kvLabel}>Employment</p>
            <p className={kvValue}>{profile.employmentType}</p>
          </div>
          <div>
            <p className={kvLabel}>Work Mode</p>
            <p className={kvValue}>{profile.workMode}</p>
          </div>
          <div>
            <p className={kvLabel}>Location</p>
            <p className={`${kvValue} inline-flex items-center gap-1`}>
            <FiMapPin size={12} /> {profile.location}
            </p>
          </div>
          <div>
            <p className={kvLabel}>Address</p>
            <p className={kvValue}>{profile.address}</p>
          </div>
        </div>
      </div>
      <div className={cardCls}>
        <p className="text-xs font-semibold text-gray-700">Emergency Contact</p>
        <div className="mt-3 grid grid-cols-1 gap-2">
          <div>
            <p className={kvLabel}>Name</p>
            <p className={kvValue}>{profile.emergency.name}</p>
          </div>
          <div>
            <p className={kvLabel}>Relation</p>
            <p className={kvValue}>{profile.emergency.relation}</p>
          </div>
          <div>
            <p className={kvLabel}>Phone</p>
            <p className={kvValue}>{profile.emergency.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const personalContent = (
    <div className={cardCls}>
      <div className="flex items-center justify-between gap-2 mb-3">
        <div>
          <p className="text-xs font-semibold text-gray-700">Personal Information</p>
          <p className="text-[10px] text-gray-500">Sensitive fields are marked and role protected.</p>
        </div>
        {!canEditPersonal && (
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-600 px-2 py-[2px] text-[10px]">
            <FiLock size={10} />
            View only
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input
          label="Name"
          value={personalForm.name}
          onChange={(e) => setPersonalForm((p) => ({ ...p, name: e.target.value }))}
          placeholder="Employee full name"
          noMargin
          disabled={!canEditPersonal}
        />
        <CustomSelect
          label="Gender"
          name="personal_gender"
          value={personalForm.gender}
          onChange={(v) => setPersonalForm((p) => ({ ...p, gender: v }))}
          options={mapSelectOptions(
            [
              { id: "Male", name: "Male" },
              { id: "Female", name: "Female" },
              { id: "Other", name: "Other" },
            ],
            "id",
            "name"
          )}
          placeholder="Select gender"
          controlHeight="2rem"
        />
        <Input
          label="DOB"
          type="date"
          value={personalForm.dob}
          onChange={(e) => setPersonalForm((p) => ({ ...p, dob: e.target.value }))}
          placeholder="Date of birth"
          noMargin
          disabled={!canEditPersonal}
        />
        <div>
          <div className="flex items-center gap-1 mb-1">
            <span className="text-xxs font-medium text-gray-700">National ID</span>
            <span className="inline-flex items-center rounded-full bg-[#fff4e5] text-[#9c5d16] px-2 py-[1px] text-[10px] font-semibold">
              Sensitive
            </span>
          </div>
          <Input
            value={personalForm.nationalId}
            onChange={(e) => setPersonalForm((p) => ({ ...p, nationalId: e.target.value }))}
            placeholder="xxxxx-xxxxxxx-x"
            noMargin
            disabled={!canEditPersonal}
          />
        </div>
        <div className="md:col-span-2">
          <Input
            label="Address"
            value={personalForm.address}
            onChange={(e) => setPersonalForm((p) => ({ ...p, address: e.target.value }))}
            placeholder="Residential address"
            noMargin
            disabled={!canEditPersonal}
          />
        </div>
        <div className="md:col-span-2">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-xxs font-medium text-gray-700">Contact</span>
            <span className="inline-flex items-center rounded-full bg-[#edf6fc] text-[#2c648b] px-2 py-[1px] text-[10px] font-semibold">
              Restricted
            </span>
          </div>
          <Input
            value={personalForm.contact}
            onChange={(e) => setPersonalForm((p) => ({ ...p, contact: e.target.value }))}
            placeholder="+92 ..."
            noMargin
            disabled={!canEditPersonal}
          />
        </div>
      </div>

      {canEditPersonal && (
        <div className="mt-4 flex justify-end">
          <Button
            type="button"
            variant="success"
            onClick={() => alert("Personal information saved successfully.")}
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );

  const jobContent = (
    <div className="space-y-3">
      <div className={cardCls}>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div>
            <p className="text-xs font-semibold text-gray-700">Job Information</p>
            <p className="text-[10px] text-gray-500">Role, reporting line, and effective dates.</p>
          </div>
          {!canEditJob && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-600 px-2 py-[2px] text-[10px]">
              <FiLock size={10} />
              View only
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <CustomSelect
            label="Role"
            name="job_role"
            value={jobForm.role}
            onChange={(v) => setJobForm((p) => ({ ...p, role: v }))}
            options={roleOptions}
            placeholder="Select role"
            controlHeight="2rem"
          />
          <CustomSelect
            label="Grade"
            name="job_grade"
            value={jobForm.grade}
            onChange={(v) => setJobForm((p) => ({ ...p, grade: v }))}
            options={gradeOptions}
            placeholder="Select grade"
            controlHeight="2rem"
          />
          <CustomSelect
            label="Dept"
            name="job_dept"
            value={jobForm.dept}
            onChange={(v) => setJobForm((p) => ({ ...p, dept: v }))}
            options={deptOptions}
            placeholder="Select department"
            controlHeight="2rem"
          />
          <CustomSelect
            label="Team"
            name="job_team"
            value={jobForm.team}
            onChange={(v) => setJobForm((p) => ({ ...p, team: v }))}
            options={teamOptions}
            placeholder="Select team"
            controlHeight="2rem"
          />
          <CustomSelect
            label="Manager"
            name="job_manager"
            value={jobForm.manager}
            onChange={(v) => setJobForm((p) => ({ ...p, manager: v }))}
            options={managerOptions}
            placeholder="Select manager"
            controlHeight="2rem"
          />
          <CustomSelect
            label="Location"
            name="job_location"
            value={jobForm.location}
            onChange={(v) => setJobForm((p) => ({ ...p, location: v }))}
            options={locationOptions}
            placeholder="Select location"
            controlHeight="2rem"
          />
          <CustomSelect
            label="Employment Type"
            name="job_employment_type"
            value={jobForm.employmentType}
            onChange={(v) => setJobForm((p) => ({ ...p, employmentType: v }))}
            options={employmentTypeOptions}
            placeholder="Select type"
            controlHeight="2rem"
          />
          <Input
            label="Emp ID"
            value={profile.empId}
            disabled
            noMargin
          />
          <Input
            label="Effective From"
            type="date"
            value={jobForm.effectiveFrom}
            onChange={(e) => setJobForm((p) => ({ ...p, effectiveFrom: e.target.value }))}
            noMargin
            disabled={!canEditJob}
          />
          <Input
            label="Effective To"
            type="date"
            value={jobForm.effectiveTo}
            onChange={(e) => setJobForm((p) => ({ ...p, effectiveTo: e.target.value }))}
            noMargin
            disabled={!canEditJob}
          />
        </div>

        {canEditJob && (
          <div className="mt-4 flex justify-end">
            <Button
              type="button"
              variant="success"
              onClick={() => alert("Job information saved successfully.")}
            >
              Save
            </Button>
          </div>
        )}
      </div>

      <div className={cardCls}>
        <p className="text-xs font-semibold text-gray-700">Status History</p>
        <p className="text-[10px] text-gray-500 mt-1">Role/location and status timeline.</p>
        <div className="mt-3 overflow-x-auto border border-gray-200 rounded">
          <table className="w-full text-xxs border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-left">Effective From</th>
                <th className="px-3 py-2 text-left">Effective To</th>
                <th className="px-3 py-2 text-left">Updated By</th>
              </tr>
            </thead>
            <tbody>
              {statusHistory.map((row, idx) => (
                <tr key={row.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-3 py-2">
                    <StatusDesign statusId={row.statusId} label={row.status} />
                  </td>
                  <td className="px-3 py-2">{row.effectiveFrom}</td>
                  <td className="px-3 py-2">{row.effectiveTo}</td>
                  <td className="px-3 py-2">{row.updatedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const contactContent = (
    <div className={cardCls}>
      <div className="flex items-center justify-between gap-2 mb-3">
        <div>
          <p className="text-xs font-semibold text-gray-700">Emergency Contacts</p>
          <p className="text-[10px] text-gray-500">Manage emergency contact list with priority levels.</p>
        </div>
        <div className="flex gap-2">
          {canEditContacts && (
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                setEditingContactId(null);
                setContactForm({ name: "", relation: "", phone: "", priority: "Secondary" });
                setIsContactOpen(true);
              }}
            >
              <span className="inline-flex items-center gap-1.5">
                <FiPlus size={12} />
                Add Contact
              </span>
            </Button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded">
        <table className="w-full text-xxs border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Relation</th>
              <th className="px-3 py-2 text-left">Phone</th>
              <th className="px-3 py-2 text-left">Priority</th>
              {canEditContacts && <th className="px-3 py-2 text-left">Action</th>}
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((c, idx) => (
                <tr key={c.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-3 py-2">{c.name}</td>
                  <td className="px-3 py-2">{c.relation}</td>
                  <td className="px-3 py-2">{c.phone}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-[2px] ${
                        c.priority === "Primary"
                          ? "bg-[#edf4ff] text-[#315d9c]"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {c.priority}
                    </span>
                  </td>
                  {canEditContacts && (
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="p-1 rounded border border-gray-200 text-gray-600 hover:text-blue-700 hover:border-blue-200 cursor-pointer"
                          onClick={() => {
                            setEditingContactId(c.id);
                            setContactForm({
                              name: c.name,
                              relation: c.relation,
                              phone: c.phone,
                              priority: c.priority,
                            });
                            setIsContactOpen(true);
                          }}
                        >
                          <FiEdit3 size={12} />
                        </button>
                        <button
                          type="button"
                          className="p-1 rounded border border-gray-200 text-gray-600 hover:text-red-700 hover:border-red-200 cursor-pointer"
                          onClick={() => setContacts((prev) => prev.filter((x) => x.id !== c.id))}
                        >
                          <FiTrash2 size={12} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={canEditContacts ? 5 : 4} className="text-center py-4 text-gray-500 italic">
                  No emergency contacts added.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {canEditContacts && (
        <div className="mt-4 flex justify-end">
          <Button
            type="button"
            variant="success"
            onClick={() => alert("Contacts updated successfully.")}
          >
            Add/Update Contacts
          </Button>
        </div>
      )}
    </div>
  );

  const documentsContent = (
    <div className={cardCls}>
      <div className="flex items-center justify-between gap-2 mb-3">
        <div>
          <p className="text-xs font-semibold text-gray-700">Documents</p>
          <p className="text-[10px] text-gray-500">Versioned docs with tags and e-sign workflow.</p>
        </div>
        {!canEditDocuments ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-600 px-2 py-[2px] text-[10px]">
            <FiLock size={10} />
            View only
          </span>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setReplacingDocId(null);
                setDocTitle("");
                setDocType("");
                setDocTags("");
                setDocFile(null);
                setIsDocOpen(true);
              }}
            >
              Upload
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={() => alert("E-Sign request sent for selected document(s).")}
            >
              Request E-Sign
            </Button>
          </div>
        )}
      </div>

      <div className="overflow-x-auto overflow-y-visible border border-gray-200 rounded min-h-[16rem]">
        <table className="w-full text-xxs border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-3 py-3 text-left">Title</th>
              <th className="px-3 py-3 text-left">Type</th>
              <th className="px-3 py-3 text-left">Version</th>
              <th className="px-3 py-3 text-left">Uploaded by</th>
              <th className="px-3 py-3 text-left">Date</th>
              <th className="px-3 py-3 text-left">Tags</th>
              <th className="px-3 py-3 text-left">Status</th>
              <th className="px-3 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {docs.length > 0 ? (
              docs.map((doc, idx) => (
                <tr key={doc.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-3 py-3 font-medium text-gray-800">{doc.title}</td>
                  <td className="px-3 py-3">{doc.type}</td>
                  <td className="px-3 py-3">{doc.version}</td>
                  <td className="px-3 py-3">{doc.uploadedBy}</td>
                  <td className="px-3 py-3">{doc.date}</td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-1">
                      {doc.tags.length > 0 ? (
                        doc.tags.map((tag) => (
                          <span
                            key={`${doc.id}-${tag}`}
                            className="inline-flex items-center rounded-full bg-[#edf4ff] text-[#315d9c] px-2 py-[1px] text-[10px] font-medium"
                          >
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <StatusDesign statusId={doc.statusId || 1} label={doc.status || "Active"} />
                  </td>
                  <RowActions
                    row={doc}
                    actions={[
                      {
                        label: "Download",
                        icon: FiDownload,
                        onClick: (row) => alert(`Downloaded: ${row.title}`),
                        color: "green",
                      },
                      ...(canEditDocuments
                        ? [
                            {
                              label: "Replace",
                              icon: FiRefreshCw,
                              onClick: (row) => {
                                setReplacingDocId(row.id);
                                setDocTitle(row.title);
                                setDocType(row.type);
                                setDocTags((row.tags || []).join(", "));
                                setDocFile(null);
                                setIsDocOpen(true);
                              },
                            },
                            {
                              label: "Delete",
                              icon: FiTrash2,
                              onClick: (row) => setDocs((prev) => prev.filter((x) => x.id !== row.id)),
                              color: "red",
                            },
                          ]
                        : []),
                    ]}
                  />
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500 italic">
                  No documents available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const assetsContent = (
    <div className={cardCls}>
      <div className="flex items-center justify-between gap-2 mb-3">
        <div>
          <p className="text-xs font-semibold text-gray-700">Assets</p>
          <p className="text-[10px] text-gray-500">Assigned assets, returns, and loss tracking.</p>
        </div>
        {!canEditAssets ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-600 px-2 py-[2px] text-[10px]">
            <FiLock size={10} />
            View only
          </span>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                setAssetMode("assign");
                setAssetForm({
                  type: "",
                  serialOrId: "",
                  assignedOn: new Date().toISOString().slice(0, 10),
                  selectedAssetId: "",
                });
                setIsAssetOpen(true);
              }}
            >
              Assign Asset
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setAssetMode("return");
                setAssetForm((prev) => ({ ...prev, selectedAssetId: "" }));
                setIsAssetOpen(true);
              }}
            >
              Return
            </Button>
          </div>
        )}
      </div>

      <div className="overflow-x-auto overflow-y-visible border border-gray-200 rounded min-h-[15rem]">
        <table className="w-full text-xxs border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-3 py-3 text-left">Type</th>
              <th className="px-3 py-3 text-left">Serial/ID</th>
              <th className="px-3 py-3 text-left">Assigned On</th>
              <th className="px-3 py-3 text-left">Status</th>
              <th className="px-3 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.length > 0 ? (
              assets.map((asset, idx) => (
                <tr key={asset.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-3 py-3">{asset.type}</td>
                  <td className="px-3 py-3 font-medium text-gray-800">{asset.serialOrId}</td>
                  <td className="px-3 py-3">{asset.assignedOn}</td>
                  <td className="px-3 py-3">
                    <StatusDesign statusId={asset.statusId || 3} label={asset.status || "Assigned"} />
                  </td>
                  <RowActions
                    row={asset}
                    actions={[
                      ...(canEditAssets && asset.status !== "Returned"
                        ? [
                            {
                              label: "Return",
                              icon: FiCornerUpLeft,
                              onClick: (row) =>
                                setAssets((prev) =>
                                  prev.map((x) =>
                                    x.id === row.id
                                      ? { ...x, status: "Returned", statusId: 2 }
                                      : x
                                  )
                                ),
                            },
                          ]
                        : []),
                      ...(canEditAssets
                        ? [
                            {
                              label: "Mark Lost",
                              icon: FiAlertTriangle,
                              color: "red",
                              onClick: (row) =>
                                setAssets((prev) =>
                                  prev.map((x) =>
                                    x.id === row.id
                                      ? { ...x, status: "Lost", statusId: 4 }
                                      : x
                                  )
                                ),
                            },
                          ]
                        : []),
                    ]}
                  />
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500 italic">
                  No assets assigned.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const historyContent = (
    <div className={cardCls}>
      <div className="flex items-center justify-between gap-2 mb-3">
        <div>
          <p className="text-xs font-semibold text-gray-700">Change History</p>
          <p className="text-[10px] text-gray-500">Immutable change log with before/after values.</p>
        </div>
        {!canViewHistory ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-600 px-2 py-[2px] text-[10px]">
            <FiLock size={10} />
            Restricted
          </span>
        ) : (
          <Button
            type="button"
            variant="secondary"
            onClick={() => alert("History log exported successfully.")}
          >
            Export Log
          </Button>
        )}
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded min-h-[14rem]">
        <table className="w-full text-xxs border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-3 py-3 text-left">Field</th>
              <th className="px-3 py-3 text-left">Old</th>
              <th className="px-3 py-3 text-left">New</th>
              <th className="px-3 py-3 text-left">By</th>
              <th className="px-3 py-3 text-left">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {changeHistory.length > 0 ? (
              changeHistory.map((row, idx) => (
                <tr key={row.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-3 py-3 font-medium text-gray-800">{row.field}</td>
                  <td className="px-3 py-3 text-gray-600">{row.oldValue}</td>
                  <td className="px-3 py-3 text-gray-800">{row.newValue}</td>
                  <td className="px-3 py-3">{row.by}</td>
                  <td className="px-3 py-3">{row.timestamp}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500 italic">
                  No change log records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const accessLogContent = (
    <div className={cardCls}>
      <div className="flex items-center justify-between gap-2 mb-3">
        <div>
          <p className="text-xs font-semibold text-gray-700">Access Log</p>
          <p className="text-[10px] text-gray-500">Data access records with viewer purpose trace.</p>
        </div>
        {!canViewAccessLog ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-600 px-2 py-[2px] text-[10px]">
            <FiLock size={10} />
            Restricted
          </span>
        ) : (
          <Button
            type="button"
            variant="secondary"
            onClick={() => alert("Access log exported successfully.")}
          >
            Export
          </Button>
        )}
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded min-h-[14rem]">
        <table className="w-full text-xxs border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-3 py-3 text-left">Viewer</th>
              <th className="px-3 py-3 text-left">Purpose</th>
              <th className="px-3 py-3 text-left">IP</th>
              <th className="px-3 py-3 text-left">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {accessLogs.length > 0 ? (
              accessLogs.map((row, idx) => (
                <tr key={row.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-3 py-3 font-medium text-gray-800">{row.viewer}</td>
                  <td className="px-3 py-3">{row.purpose}</td>
                  <td className="px-3 py-3">{row.ip}</td>
                  <td className="px-3 py-3">{row.timestamp}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500 italic">
                  No access log records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const customFieldsContent = (
    <div className={cardCls}>
      <div className="flex items-center justify-between gap-2 mb-3">
        <div>
          <p className="text-xs font-semibold text-gray-700">Custom Fields</p>
          <p className="text-[10px] text-gray-500">Organization-defined dynamic employee fields.</p>
        </div>
        {!canEditCustomFields && (
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-600 px-2 py-[2px] text-[10px]">
            <FiLock size={10} />
            View only
          </span>
        )}
      </div>

      <div className="space-y-3">
        {customFields.length > 0 ? (
          customFields.map((field) => (
            <div key={field.id} className="rounded-lg border border-gray-200 bg-white p-3">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                <div className="md:col-span-4">
                  <Input
                    label="Field"
                    value={field.label}
                    placeholder="Field name"
                    noMargin
                    disabled={!canEditCustomFields}
                    onChange={(e) =>
                      setCustomFields((prev) =>
                        prev.map((x) =>
                          x.id === field.id ? { ...x, label: e.target.value } : x
                        )
                      )
                    }
                  />
                </div>
                <div className="md:col-span-3">
                  <CustomSelect
                    label="Type"
                    name={`cf_type_${field.id}`}
                    value={field.type}
                    options={mapSelectOptions(
                      [
                        { id: "text", name: "Text" },
                        { id: "number", name: "Number" },
                        { id: "date", name: "Date" },
                        { id: "select", name: "Select" },
                      ],
                      "id",
                      "name"
                    )}
                    placeholder="Type"
                    controlHeight="2rem"
                    onChange={(v) =>
                      setCustomFields((prev) =>
                        prev.map((x) =>
                          x.id === field.id ? { ...x, type: v } : x
                        )
                      )
                    }
                  />
                </div>
                <div className="md:col-span-4">
                  <Input
                    label="Value"
                    type={field.type === "date" ? "date" : field.type === "number" ? "number" : "text"}
                    value={field.value}
                    placeholder="Value"
                    noMargin
                    disabled={!canEditCustomFields}
                    onChange={(e) =>
                      setCustomFields((prev) =>
                        prev.map((x) =>
                          x.id === field.id ? { ...x, value: e.target.value } : x
                        )
                      )
                    }
                  />
                </div>
                <div className="md:col-span-1 flex justify-end">
                  {canEditCustomFields && (
                    <button
                      type="button"
                      className="h-8 w-8 inline-flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:text-red-700 hover:border-red-200 cursor-pointer"
                      onClick={() => setCustomFields((prev) => prev.filter((x) => x.id !== field.id))}
                    >
                      <FiTrash2 size={13} />
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <label className="inline-flex items-center gap-1.5 text-xxs text-gray-600">
                  <input
                    type="checkbox"
                    checked={field.required}
                    disabled={!canEditCustomFields}
                    onChange={(e) =>
                      setCustomFields((prev) =>
                        prev.map((x) =>
                          x.id === field.id ? { ...x, required: e.target.checked } : x
                        )
                      )
                    }
                  />
                  Required field
                </label>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-xxs text-gray-500 italic text-center">
            No custom fields configured.
          </div>
        )}
      </div>

      {canEditCustomFields && (
        <div className="mt-3 rounded-lg border border-gray-200 bg-[#fafbfc] p-3">
          <p className="text-xxs font-semibold text-gray-700 mb-2">Add Dynamic Field</p>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
            <div className="md:col-span-4">
              <Input
                label="Field"
                value={newCustomField.label}
                placeholder="e.g. Blood Group"
                noMargin
                onChange={(e) => setNewCustomField((p) => ({ ...p, label: e.target.value }))}
              />
            </div>
            <div className="md:col-span-3">
              <CustomSelect
                label="Type"
                name="new_cf_type"
                value={newCustomField.type}
                onChange={(v) => setNewCustomField((p) => ({ ...p, type: v }))}
                options={mapSelectOptions(
                  [
                    { id: "text", name: "Text" },
                    { id: "number", name: "Number" },
                    { id: "date", name: "Date" },
                    { id: "select", name: "Select" },
                  ],
                  "id",
                  "name"
                )}
                placeholder="Type"
                controlHeight="2rem"
              />
            </div>
            <div className="md:col-span-4">
              <Input
                label="Default Value"
                value={newCustomField.value}
                placeholder="Optional"
                noMargin
                onChange={(e) => setNewCustomField((p) => ({ ...p, value: e.target.value }))}
              />
            </div>
            <div className="md:col-span-1 flex justify-end">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  if (!newCustomField.label.trim()) return;
                  setCustomFields((prev) => [
                    ...prev,
                    {
                      id: Date.now(),
                      label: newCustomField.label.trim(),
                      type: newCustomField.type,
                      value: newCustomField.value,
                      required: newCustomField.required,
                    },
                  ]);
                  setNewCustomField({ label: "", type: "text", value: "", required: false });
                }}
              >
                Add
              </Button>
            </div>
          </div>
          <div className="mt-2">
            <label className="inline-flex items-center gap-1.5 text-xxs text-gray-600">
              <input
                type="checkbox"
                checked={newCustomField.required}
                onChange={(e) => setNewCustomField((p) => ({ ...p, required: e.target.checked }))}
              />
              Required field
            </label>
          </div>
        </div>
      )}

      {canEditCustomFields && (
        <div className="mt-4 flex justify-end">
          <Button
            type="button"
            variant="success"
            onClick={() => alert("Custom fields saved successfully.")}
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );

  const apiIntegrationsContent = (
    <div className={cardCls}>
      <div className="flex items-center justify-between gap-2 mb-3">
        <div>
          <p className="text-xs font-semibold text-gray-700">API & Integrations</p>
          <p className="text-[10px] text-gray-500">External IDs and sync state across connected systems.</p>
        </div>
        {!canEditIntegrations ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-600 px-2 py-[2px] text-[10px]">
            <FiLock size={10} />
            View only
          </span>
        ) : (
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              const now = new Date().toISOString().slice(0, 16).replace("T", " ");
              setIntegrationRows((prev) =>
                prev.map((row) => ({
                  ...row,
                  lastSync: now,
                  status: "Connected",
                  statusId: 1,
                }))
              );
              alert("Manual sync completed.");
            }}
          >
            Sync Now
          </Button>
        )}
      </div>

      <div className="overflow-x-auto overflow-y-visible border border-gray-200 rounded min-h-[14rem]">
        <table className="w-full text-xxs border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-3 py-3 text-left">System</th>
              <th className="px-3 py-3 text-left">External ID</th>
              <th className="px-3 py-3 text-left">Last Sync</th>
              <th className="px-3 py-3 text-left">Status</th>
              <th className="px-3 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {integrationRows.length > 0 ? (
              integrationRows.map((row, idx) => (
                <tr key={row.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-3 py-3 font-medium text-gray-800">{row.system}</td>
                  <td className="px-3 py-3">{row.externalId}</td>
                  <td className="px-3 py-3">{row.lastSync}</td>
                  <td className="px-3 py-3">
                    <StatusDesign statusId={row.statusId} label={row.status} />
                  </td>
                  <RowActions
                    row={row}
                    actions={[
                      ...(canEditIntegrations
                        ? [
                            {
                              label: "Sync Now",
                              icon: FiRefreshCw,
                              color: "green",
                              onClick: (current) => {
                                const now = new Date().toISOString().slice(0, 16).replace("T", " ");
                                setIntegrationRows((prev) =>
                                  prev.map((x) =>
                                    x.id === current.id
                                      ? { ...x, lastSync: now, status: "Connected", statusId: 1 }
                                      : x
                                  )
                                );
                              },
                            },
                            {
                              label: "Disconnect",
                              icon: FiTrash2,
                              color: "red",
                              onClick: (current) =>
                                setIntegrationRows((prev) =>
                                  prev.map((x) =>
                                    x.id === current.id
                                      ? { ...x, status: "Disconnected", statusId: 4 }
                                      : x
                                  )
                                ),
                            },
                          ]
                        : []),
                    ]}
                  />
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500 italic">
                  No integrations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const notesContent = (
    <div className="grid grid-cols-1 gap-3">
      {notes.length > 0 ? (
        notes.map((note) => (
          <div key={note.id} className={cardCls}>
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-semibold text-gray-800">{note.title}</p>
              <span className="text-[10px] text-gray-500">By {note.by}</span>
            </div>
            <div
              className="text-xxs text-gray-700 mt-1 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
              dangerouslySetInnerHTML={{ __html: note.text }}
            />
          </div>
        ))
      ) : (
        <div className={cardCls}>
          <p className="text-xxs text-gray-500 italic">No notes added yet.</p>
        </div>
      )}
    </div>
  );

  const allTabs = [
    { key: "overview", label: "Overview", content: overviewContent },
    { key: "personal", label: "Personal", content: personalContent },
    { key: "job", label: "Job", content: jobContent },
    { key: "contacts", label: "Contacts", content: contactContent },
    { key: "documents", label: "Documents", content: documentsContent },
    { key: "assets", label: "Assets", content: assetsContent },
    { key: "history", label: "History", content: historyContent },
    { key: "access-log", label: "Access Log", content: accessLogContent },
    { key: "custom-fields", label: "Custom Fields", content: customFieldsContent },
    { key: "api-integrations", label: "API & Integrations", content: apiIntegrationsContent },
    { key: "notes", label: "Notes", content: notesContent },
  ];

  const visibleTabs = allTabs.filter((tab) => permissions.includes(tab.key));

  const handleSharePdf = () => {
    alert("Profile PDF shared successfully.");
  };

  const handleSaveNote = () => {
    const plainText = noteText.replace(/<[^>]*>/g, "").trim();
    if (!noteTitle.trim() || !plainText) return;
    setNotes((prev) => [
      { id: Date.now(), title: noteTitle.trim(), text: noteText.trim(), by: "HR Admin" },
      ...prev,
    ]);
    setNoteTitle("");
    setNoteText("");
    setIsNoteOpen(false);
  };

  const handleUploadDoc = () => {
    if (!docType || !docFile || !docTitle.trim()) return;
    const today = new Date().toISOString().slice(0, 10);
    const parsedTags = docTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (replacingDocId) {
      setDocs((prev) =>
        prev.map((doc) => {
          if (doc.id !== replacingDocId) return doc;
          const currentVersionNum = Number(String(doc.version || "v1").replace("v", "")) || 1;
          const nextVersion = `v${currentVersionNum + 1}`;
          return {
            ...doc,
            title: docTitle.trim(),
            name: docFile.name,
            type: docType,
            tags: parsedTags,
            date: today,
            uploadedBy: viewerRole,
            version: nextVersion,
            status: "Replaced",
            statusId: 3,
          };
        })
      );
    } else {
      setDocs((prev) => [
        {
          id: Date.now(),
          title: docTitle.trim(),
          name: docFile.name,
          type: docType,
          version: "v1",
          uploadedBy: viewerRole,
          date: today,
          tags: parsedTags,
          status: "Active",
          statusId: 1,
        },
        ...prev,
      ]);
    }

    setDocTitle("");
    setDocType("");
    setDocTags("");
    setDocFile(null);
    setReplacingDocId(null);
    setIsDocOpen(false);
  };

  const handleAssetAction = () => {
    if (assetMode === "assign") {
      if (!assetForm.type || !assetForm.serialOrId || !assetForm.assignedOn) return;
      setAssets((prev) => [
        {
          id: `AST-${Date.now()}`,
          type: assetForm.type,
          serialOrId: assetForm.serialOrId,
          assignedOn: assetForm.assignedOn,
          status: "Assigned",
          statusId: 3,
        },
        ...prev,
      ]);
      setIsAssetOpen(false);
      return;
    }

    if (!assetForm.selectedAssetId) return;
    setAssets((prev) =>
      prev.map((asset) =>
        asset.id === assetForm.selectedAssetId
          ? { ...asset, status: "Returned", statusId: 2 }
          : asset
      )
    );
    setIsAssetOpen(false);
  };

  return (
    <Layout>
      <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
        <div className="rounded-xl border border-gray-200 bg-gradient-to-r from-white via-[#f8fbff] to-white p-4">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 rounded-full bg-[#edf4ff] border border-[#d6e5ff] flex items-center justify-center">
              <FiUser className="text-[#315d9c]" size={18} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{profile.name}</h2>
                <p className="text-xxs text-gray-500">
                  {profile.role} | {profile.empId}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <StatusDesign statusId={profile.statusId} label={profile.status} />
                  <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-600 px-2 py-[2px] text-[10px]">
                    <FiMail size={10} />
                    {profile.email}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-600 px-2 py-[2px] text-[10px]">
                    <FiPhone size={10} />
                    {profile.phone}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="secondary" onClick={() => router.push("/employees/new")}>
              Edit
              </Button>
              <Button type="button" variant="primary" onClick={() => setIsNoteOpen(true)}>
              Add Note
              </Button>
              <Button type="button" variant="success" onClick={() => setIsDocOpen(true)}>
              Upload Doc
              </Button>
              <Button type="button" variant="cancel" onClick={handleSharePdf}>
              Share PDF
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickStats.map((stat) => (
            <div key={stat.label} className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-gray-500">{stat.label}</p>
                <span className={`h-7 w-7 rounded-full ${stat.iconBg} flex items-center justify-center`}>
                  <stat.icon className={stat.iconColor} size={13} />
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-800 mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded border border-gray-200 bg-gray-50 px-3 py-2 flex items-center gap-2 text-xxs text-gray-600">
          <FiUsers size={12} />
          Viewer Role: <span className="font-semibold">{viewerRole}</span>
          <span className="text-gray-500">| Permission-based sections enabled</span>
        </div>

        <Tabs
          key={`employee-tabs-${tabsKey}`}
          tabs={visibleTabs}
          defaultTab={defaultTab}
          isCol
          onTabChange={(tabKey) => {
            if (typeof window === "undefined") return;
            const cleanPath = `${window.location.pathname}${window.location.search}`;
            window.history.replaceState(
              null,
              "",
              tabKey === "personal"
                ? `${cleanPath}#personal`
                : tabKey === "job"
                  ? `${cleanPath}#job`
                  : tabKey === "contacts"
                    ? `${cleanPath}#contacts`
                  : tabKey === "documents"
                      ? `${cleanPath}#documents`
                      : tabKey === "assets"
                        ? `${cleanPath}#assets`
                        : tabKey === "history"
                          ? `${cleanPath}#history`
                          : tabKey === "access-log"
                            ? `${cleanPath}#access-log`
                            : tabKey === "custom-fields"
                              ? `${cleanPath}#custom-fields`
                              : tabKey === "api-integrations"
                                ? `${cleanPath}#api-&-integrations`
                  : cleanPath
            );
          }}
        />
      </div>

      {isNoteOpen && (
        <Modal width="w-full md:w-6/12">
          <h3 className="text-base font-semibold text-gray-800">Add Note</h3>
          <p className="text-xxs text-gray-500 mt-1 mb-3">Add a profile note for this employee.</p>
          <Input
            label="Title"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            placeholder="Note title"
          />
          <label className="text-xxs font-medium text-gray-700 mb-1 block">Note</label>
          <RichTextEditor
            value={noteText}
            onChange={setNoteText}
            placeholder="Write note..."
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="cancel" onClick={() => setIsNoteOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="success" onClick={handleSaveNote}>
              Save Note
            </Button>
          </div>
        </Modal>
      )}

      {isDocOpen && (
        <Modal width="w-full md:w-6/12">
          <h3 className="text-base font-semibold text-gray-800">
            {replacingDocId ? "Replace Document" : "Upload Document"}
          </h3>
          <p className="text-xxs text-gray-500 mt-1 mb-3">
            {replacingDocId ? "Replace existing version and keep audit continuity." : "Upload employee related document."}
          </p>
          <Input
            label="Title"
            value={docTitle}
            onChange={(e) => setDocTitle(e.target.value)}
            placeholder="Document title"
          />
          <CustomSelect
            label="Document Type"
            name="doc_type"
            value={docType}
            onChange={setDocType}
            options={docTypeOptions}
            placeholder="Select document type"
            controlHeight="2rem"
          />
          <Input
            label="Tags"
            value={docTags}
            onChange={(e) => setDocTags(e.target.value)}
            placeholder="e.g. NDA, Legal, FY26"
          />
          <FileUpload
            label="Document"
            name="employee_doc"
            value={docFile}
            onChange={(e) => setDocFile(e.target.files?.[0] || null)}
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="cancel" onClick={() => setIsDocOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="success" onClick={handleUploadDoc}>
              <span className="inline-flex items-center gap-1.5">
                <FiUploadCloud size={13} />
                {replacingDocId ? "Replace" : "Upload"}
              </span>
            </Button>
          </div>
        </Modal>
      )}

      {isContactOpen && (
        <Modal width="w-full md:w-6/12">
          <h3 className="text-base font-semibold text-gray-800">
            {editingContactId ? "Update Contact" : "Add Contact"}
          </h3>
          <p className="text-xxs text-gray-500 mt-1 mb-3">
            Maintain emergency contact details.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="Name"
              value={contactForm.name}
              onChange={(e) => setContactForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Contact full name"
              noMargin
            />
            <CustomSelect
              label="Relation"
              name="contact_relation"
              value={contactForm.relation}
              onChange={(v) => setContactForm((p) => ({ ...p, relation: v }))}
              options={contactRelationOptions}
              placeholder="Select relation"
              controlHeight="2rem"
            />
            <Input
              label="Phone"
              value={contactForm.phone}
              onChange={(e) => setContactForm((p) => ({ ...p, phone: e.target.value }))}
              placeholder="+92 ..."
              noMargin
            />
            <CustomSelect
              label="Priority"
              name="contact_priority"
              value={contactForm.priority}
              onChange={(v) => setContactForm((p) => ({ ...p, priority: v }))}
              options={contactPriorityOptions}
              placeholder="Select priority"
              controlHeight="2rem"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="cancel" onClick={() => setIsContactOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="success"
              onClick={() => {
                if (!contactForm.name || !contactForm.relation || !contactForm.phone || !contactForm.priority) return;
                if (editingContactId) {
                  setContacts((prev) =>
                    prev.map((x) =>
                      x.id === editingContactId
                        ? { ...x, ...contactForm }
                        : x
                    )
                  );
                } else {
                  setContacts((prev) => [
                    ...prev,
                    { id: Date.now(), ...contactForm },
                  ]);
                }
                setIsContactOpen(false);
                setEditingContactId(null);
                setContactForm({ name: "", relation: "", phone: "", priority: "" });
              }}
            >
              {editingContactId ? "Update" : "Add Contact"}
            </Button>
          </div>
        </Modal>
      )}

      {isAssetOpen && (
        <Modal width="w-full md:w-6/12">
          <h3 className="text-base font-semibold text-gray-800">
            {assetMode === "assign" ? "Assign Asset" : "Return Asset"}
          </h3>
          <p className="text-xxs text-gray-500 mt-1 mb-3">
            {assetMode === "assign"
              ? "Assign a new asset to this employee."
              : "Select an assigned asset to mark as returned."}
          </p>

          {assetMode === "assign" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <CustomSelect
                label="Type"
                name="asset_type"
                value={assetForm.type}
                onChange={(v) => setAssetForm((p) => ({ ...p, type: v }))}
                options={assetTypeOptions}
                placeholder="Select asset type"
                controlHeight="2rem"
              />
              <Input
                label="Serial/ID"
                value={assetForm.serialOrId}
                onChange={(e) => setAssetForm((p) => ({ ...p, serialOrId: e.target.value }))}
                placeholder="Asset serial or ID"
                noMargin
              />
              <Input
                label="Assigned On"
                type="date"
                value={assetForm.assignedOn}
                onChange={(e) => setAssetForm((p) => ({ ...p, assignedOn: e.target.value }))}
                noMargin
              />
            </div>
          ) : (
            <CustomSelect
              label="Asset"
              name="asset_return_id"
              value={assetForm.selectedAssetId}
              onChange={(v) => setAssetForm((p) => ({ ...p, selectedAssetId: v }))}
              options={mapSelectOptions(
                assets
                  .filter((asset) => asset.status !== "Returned")
                  .map((asset) => ({
                    id: asset.id,
                    name: `${asset.type} - ${asset.serialOrId}`,
                  })),
                "id",
                "name"
              )}
              placeholder="Select assigned asset"
              controlHeight="2rem"
            />
          )}

          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="cancel" onClick={() => setIsAssetOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="success"
              onClick={handleAssetAction}
            >
              {assetMode === "assign" ? "Assign Asset" : "Return"}
            </Button>
          </div>
        </Modal>
      )}
    </Layout>
  );
}
