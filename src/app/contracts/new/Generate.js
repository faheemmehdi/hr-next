"use client";

import { useEffect, useMemo, useState } from "react";
import Layout from "y@/app/components/Layout";
import Button from "y@/app/components/Button";
import Input from "y@/app/components/Input";
import CustomSelect from "y@/app/components/CustomSelect";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import { FiFileText, FiLink2, FiSend, FiShield } from "react-icons/fi";

const employeeData = [
  {
    id: "EMP001",
    name: "Ali Khan",
    email: "ali.khan@kairos.com",
    department: "Engineering",
    job_title: "Senior Frontend Engineer",
    start_date: "2026-04-10",
    end_date: "2027-04-09",
    reporting_manager: "Usman Tariq",
    company_name: "Kairos Services",
  },
  {
    id: "EMP002",
    name: "Sara Ahmed",
    email: "sara.ahmed@kairos.com",
    department: "HR",
    job_title: "HR Executive",
    start_date: "2026-04-12",
    end_date: "2027-04-11",
    reporting_manager: "Fatima Noor",
    company_name: "Kairos Services",
  },
  {
    id: "EMP003",
    name: "Hamza Ali",
    email: "hamza.ali@kairos.com",
    department: "Finance",
    job_title: "Accounts Officer",
    start_date: "2026-04-15",
    end_date: "2027-04-14",
    reporting_manager: "Ayesha Noor",
    company_name: "Kairos Services",
  },
];

const templateData = [
  {
    id: "T001",
    name: "Employment Agreement",
    category: "Offer & Onboarding",
    content:
      "<p>This Employment Agreement is made between <strong>{{company_name}}</strong> and <strong>{{employee_name}}</strong>.</p><p>Position: <strong>{{job_title}}</strong> | Department: <strong>{{department}}</strong>.</p><p>Employment starts on <strong>{{start_date}}</strong> and remains valid until <strong>{{end_date}}</strong>.</p><p>Reporting Manager: <strong>{{reporting_manager}}</strong>.</p>",
    variables: ["company_name", "employee_name", "job_title", "department", "start_date", "end_date", "reporting_manager"],
  },
  {
    id: "T002",
    name: "Internship Contract",
    category: "Offer & Onboarding",
    content:
      "<p>This contract confirms internship of <strong>{{employee_name}}</strong> in <strong>{{department}}</strong>.</p><p>Internship period: <strong>{{start_date}}</strong> to <strong>{{end_date}}</strong>.</p><p>Mentor/Manager: <strong>{{reporting_manager}}</strong>.</p>",
    variables: ["employee_name", "department", "start_date", "end_date", "reporting_manager"],
  },
  {
    id: "T003",
    name: "NDA Contract",
    category: "Compliance",
    content:
      "<p>On {{start_date}}, <strong>{{employee_name}}</strong> enters a confidentiality agreement with <strong>{{company_name}}</strong>.</p><p>Role covered: {{job_title}}.</p>",
    variables: ["start_date", "employee_name", "company_name", "job_title"],
  },
];

export default function Generates() {
  const [employeeId, setEmployeeId] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [mappings, setMappings] = useState({});
  const [draftSavedAt, setDraftSavedAt] = useState("");

  const employeeOptions = mapSelectOptions(
    employeeData.map((e) => ({ id: e.id, name: `${e.name} (${e.id})` })),
    "id",
    "name"
  );

  const templateOptions = mapSelectOptions(
    templateData.map((t) => ({ id: t.id, name: `${t.name} - ${t.category}` })),
    "id",
    "name"
  );

  const selectedEmployee = useMemo(
    () => employeeData.find((e) => e.id === employeeId) || null,
    [employeeId]
  );

  const selectedTemplate = useMemo(
    () => templateData.find((t) => t.id === templateId) || null,
    [templateId]
  );

  useEffect(() => {
    if (!selectedTemplate) {
      setMappings({});
      return;
    }

    const nextMappings = {};
    selectedTemplate.variables.forEach((v) => {
      if (v === "employee_name") {
        nextMappings[v] = selectedEmployee?.name || "";
      } else {
        nextMappings[v] = selectedEmployee?.[v] || "";
      }
    });
    setMappings(nextMappings);
  }, [selectedTemplate, selectedEmployee]);

  const autoFillPercent = useMemo(() => {
    if (!selectedTemplate || selectedTemplate.variables.length === 0) return 0;
    const filled = selectedTemplate.variables.filter((v) => (mappings[v] || "").trim() !== "").length;
    return Math.round((filled / selectedTemplate.variables.length) * 100);
  }, [selectedTemplate, mappings]);

  const previewHTML = useMemo(() => {
    if (!selectedTemplate) return "<p>Select an employee and template to generate preview.</p>";

    return selectedTemplate.content.replace(/{{(.*?)}}/g, (_, key) => {
      const cleanKey = key.trim();
      const value = mappings[cleanKey];
      return value && String(value).trim() !== ""
        ? `<span style="font-weight:600">${value}</span>`
        : `<span style="color:#9ca3af">[${cleanKey}]</span>`;
    });
  }, [selectedTemplate, mappings]);

  const updateMapping = (key, value) => {
    setMappings((prev) => ({ ...prev, [key]: value }));
  };

  const handleGenerate = () => {
    if (!employeeId || !templateId) return;
    alert("Contract generated successfully.");
  };

  const handleSendESign = () => {
    if (!employeeId || !templateId) return;
    alert("Contract sent for e-sign.");
  };

  const handleSaveDraft = () => {
    if (!employeeId || !templateId) return;
    const now = new Date();
    setDraftSavedAt(now.toLocaleString());
  };

  const handleDownloadPdf = () => {
    if (!employeeId || !templateId) return;
    alert("Downloading PDF...");
  };

  return (
    <Layout>
      <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-base font-semibold text-gray-700">Generate Contract</h2>
            <p className="text-xxs text-gray-500">
              Create a contract from template with auto-filled variables and preview.
            </p>
          </div>
          <div className="rounded-lg border border-[#dce9ff] bg-[#f3f8ff] px-3 py-2">
            <p className="text-[10px] text-[#315d9c] font-medium">Auto-Fill Completion</p>
            <p className="text-xs text-[#1d4e89] font-semibold">{autoFillPercent}%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 mt-5">
          <div className="xl:col-span-2 space-y-4">
            <div className="rounded-lg border border-gray-200 p-4 bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-700">Generation Inputs</h3>
              <div className="mt-3 grid grid-cols-1 gap-3">
                <CustomSelect
                  name="employee"
                  label="Employee"
                  value={employeeId}
                  onChange={setEmployeeId}
                  options={employeeOptions}
                  placeholder="Select employee"
                  controlHeight="2rem"
                />
                <CustomSelect
                  name="template"
                  label="Template"
                  value={templateId}
                  onChange={setTemplateId}
                  options={templateOptions}
                  placeholder="Select template"
                  controlHeight="2rem"
                />
                <Input
                  type="date"
                  name="expiry_date"
                  label="Expiry"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  noMargin
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-2">
                <FiLink2 className="text-blue-600" size={14} />
                <h3 className="text-sm font-semibold text-gray-700">Variable Mapping</h3>
              </div>
              <p className="text-[10px] text-gray-500 mt-1">
                Adjust values before generating final contract.
              </p>

              {selectedTemplate ? (
                <div className="mt-3 space-y-2 max-h-[44vh] overflow-y-auto pr-1">
                  {selectedTemplate.variables.map((v) => (
                    <div key={v} className="grid grid-cols-5 items-center gap-2">
                      <label className="col-span-2 text-xxs text-gray-600 font-medium">{`{{${v}}}`}</label>
                      <div className="col-span-3">
                        <Input
                          type="text"
                          name={`mapping_${v}`}
                          value={mappings[v] || ""}
                          onChange={(e) => updateMapping(v, e.target.value)}
                          placeholder={`Enter ${v}`}
                          noMargin
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-3 rounded border border-dashed border-gray-300 bg-gray-50 p-4 text-center text-xxs text-gray-500">
                  Select a template to load variables.
                </div>
              )}
            </div>
          </div>

          <div className="xl:col-span-3 rounded-lg border border-gray-200 bg-white">
            <div className="border-b border-gray-200 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiFileText size={14} className="text-blue-600" />
                <h3 className="text-sm font-semibold text-gray-700">Contract Preview</h3>
              </div>
              <div className="inline-flex items-center gap-1 rounded-full bg-[#edf4ff] text-[#315d9c] px-3 py-1 text-[10px] font-semibold">
                {selectedTemplate ? selectedTemplate.name : "No Template Selected"}
              </div>
            </div>

            <div className="p-4 max-h-[62vh] overflow-y-auto">
              <div className="rounded border border-gray-200 bg-gray-50 p-4 min-h-[48vh]">
                <div
                  className="text-xxs text-gray-700 leading-relaxed space-y-2"
                  dangerouslySetInnerHTML={{ __html: previewHTML }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-[#d8e6ff] bg-[#f4f8ff] p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
            <Button type="button" variant="primary" onClick={handleGenerate}>
              <span className="inline-flex items-center gap-1.5">
                <FiFileText size={13} />
                Generate
              </span>
            </Button>
            <Button type="button" variant="secondary" onClick={handleSendESign}>
              <span className="inline-flex items-center gap-1.5">
                <FiSend size={13} />
                Send for E-Sign
              </span>
            </Button>
            <Button type="button" variant="cancel" onClick={handleSaveDraft}>
              Save Draft
            </Button>
            <Button type="button" variant="success" onClick={handleDownloadPdf}>
              Download PDF
            </Button>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-[10px] text-gray-500">
              {draftSavedAt ? `Draft saved at ${draftSavedAt}` : "No draft saved yet."}
            </p>
            <div className="inline-flex items-center gap-1 text-[10px] text-gray-600">
              <FiShield size={12} />
              E-Sign and template values are audit-tracked.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
