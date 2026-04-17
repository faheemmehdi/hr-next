"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "./ModalShell";
import Button from "./Button";
import Input from "./Input";
import CustomSelect from "./CustomSelect";
import FileUpload from "./FileUpload";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";

const QUICK_TYPES = [
  { key: "employee", label: "Employee" },
  { key: "leave", label: "Leave" },
  { key: "time", label: "Time" },
  { key: "attendance", label: "Attendance" },
  { key: "contract", label: "Contract" },
  { key: "expense", label: "Expense" },
  { key: "payroll-run", label: "Payroll Run" },
];

const fullFormRouteMap = {
  employee: "/employees/list",
  leave: "/leave/requests",
  time: "/time/tasks",
  attendance: "/attendance/daily",
  contract: "/contracts/new",
  expense: "/payroll/expenses",
  "payroll-run": "/payroll/runs",
};

const employeeOptions = mapSelectOptions(
  [
    { id: "EMP001", name: "Ali Khan (EMP001)" },
    { id: "EMP002", name: "Sara Ahmed (EMP002)" },
    { id: "EMP003", name: "Hamza Ali (EMP003)" },
  ],
  "id",
  "name"
);

const departmentOptions = mapSelectOptions(
  [
    { id: "Engineering", name: "Engineering" },
    { id: "HR", name: "HR" },
    { id: "Finance", name: "Finance" },
    { id: "Operations", name: "Operations" },
  ],
  "id",
  "name"
);

const managerOptions = mapSelectOptions(
  [
    { id: "Usman Tariq", name: "Usman Tariq" },
    { id: "Fatima Noor", name: "Fatima Noor" },
    { id: "Ayesha Noor", name: "Ayesha Noor" },
  ],
  "id",
  "name"
);

const leaveTypeOptions = mapSelectOptions(
  [
    { id: "Annual Leave", name: "Annual Leave" },
    { id: "Sick Leave", name: "Sick Leave" },
    { id: "Casual Leave", name: "Casual Leave" },
  ],
  "id",
  "name"
);

const projectOptions = mapSelectOptions(
  [
    { id: "Website Revamp", name: "Website Revamp" },
    { id: "Payroll Automation", name: "Payroll Automation" },
    { id: "Onboarding Workflow", name: "Onboarding Workflow" },
  ],
  "id",
  "name"
);

const taskOptions = mapSelectOptions(
  [
    { id: "UI Polish", name: "UI Polish" },
    { id: "API Integration", name: "API Integration" },
    { id: "Testing", name: "Testing" },
  ],
  "id",
  "name"
);

const inOutOptions = mapSelectOptions(
  [
    { id: "In", name: "In" },
    { id: "Out", name: "Out" },
  ],
  "id",
  "name"
);

const templateOptions = mapSelectOptions(
  [
    { id: "Employment Agreement", name: "Employment Agreement" },
    { id: "Internship Contract", name: "Internship Contract" },
    { id: "NDA Contract", name: "NDA Contract" },
  ],
  "id",
  "name"
);

const expenseCategoryOptions = mapSelectOptions(
  [
    { id: "Travel", name: "Travel" },
    { id: "Meals", name: "Meals" },
    { id: "Office Supplies", name: "Office Supplies" },
  ],
  "id",
  "name"
);

export default function QuickAddModal({
  isOpen,
  onClose,
  defaultType = "employee",
}) {
  const router = useRouter();
  const [type, setType] = useState(defaultType);
  const [form, setForm] = useState({});

  useEffect(() => {
    if (!isOpen) return;
    setType(defaultType || "employee");
    setForm({});
  }, [isOpen, defaultType]);

  const activeType = useMemo(
    () => QUICK_TYPES.find((item) => item.key === type) || QUICK_TYPES[0],
    [type]
  );

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const requiredByType = {
    employee: ["name", "email", "department", "manager"],
    leave: ["leaveType", "startDate", "endDate", "reason"],
    time: ["project", "task", "note"],
    attendance: ["employee", "inOut", "reason"],
    contract: ["employee", "template"],
    expense: ["category", "amount", "receipt"],
    "payroll-run": ["period"],
  };

  const isValid = (requiredByType[type] || []).every((field) => {
    const value = form[field];
    if (field === "receipt") return Boolean(value);
    return typeof value === "string" ? value.trim() !== "" : Boolean(value);
  });

  const handleSubmit = () => {
    if (!isValid) return;
    alert(`${activeType.label} quick entry submitted.`);
    onClose?.();
  };

  const handleOpenFullForm = () => {
    const route = fullFormRouteMap[type];
    if (!route) return;
    const params = new URLSearchParams();
    Object.entries(form).forEach(([k, v]) => {
      if (typeof v === "string" && v.trim() !== "") params.set(k, v);
    });
    router.push(params.toString() ? `${route}?${params.toString()}` : route);
    onClose?.();
  };

  const renderFormByType = () => {
    if (type === "employee") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            label="Name"
            value={form.name || ""}
            onChange={(e) => setField("name", e.target.value)}
            placeholder="Employee full name"
            noMargin
          />
          <Input
            label="Email"
            type="email"
            value={form.email || ""}
            onChange={(e) => setField("email", e.target.value)}
            placeholder="name@company.com"
            noMargin
          />
          <CustomSelect
            label="Dept"
            name="department"
            value={form.department || ""}
            onChange={(v) => setField("department", v)}
            options={departmentOptions}
            placeholder="Select department"
            controlHeight="2rem"
          />
          <CustomSelect
            label="Manager"
            name="manager"
            value={form.manager || ""}
            onChange={(v) => setField("manager", v)}
            options={managerOptions}
            placeholder="Select manager"
            controlHeight="2rem"
          />
        </div>
      );
    }

    if (type === "leave") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <CustomSelect
            label="Type"
            name="leaveType"
            value={form.leaveType || ""}
            onChange={(v) => setField("leaveType", v)}
            options={leaveTypeOptions}
            placeholder="Select leave type"
            controlHeight="2rem"
          />
          <Input
            label="Reason"
            value={form.reason || ""}
            onChange={(e) => setField("reason", e.target.value)}
            placeholder="Short reason"
            noMargin
          />
          <Input
            label="Start Date"
            type="date"
            value={form.startDate || ""}
            onChange={(e) => setField("startDate", e.target.value)}
            noMargin
          />
          <Input
            label="End Date"
            type="date"
            value={form.endDate || ""}
            onChange={(e) => setField("endDate", e.target.value)}
            noMargin
          />
        </div>
      );
    }

    if (type === "time") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <CustomSelect
            label="Project"
            name="project"
            value={form.project || ""}
            onChange={(v) => setField("project", v)}
            options={projectOptions}
            placeholder="Select project"
            controlHeight="2rem"
          />
          <CustomSelect
            label="Task"
            name="task"
            value={form.task || ""}
            onChange={(v) => setField("task", v)}
            options={taskOptions}
            placeholder="Select task"
            controlHeight="2rem"
          />
          <div className="md:col-span-2">
            <Input
              label="Note"
              value={form.note || ""}
              onChange={(e) => setField("note", e.target.value)}
              placeholder="What are you working on?"
              noMargin
            />
          </div>
        </div>
      );
    }

    if (type === "attendance") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <CustomSelect
            label="Employee"
            name="employee"
            value={form.employee || ""}
            onChange={(v) => setField("employee", v)}
            options={employeeOptions}
            placeholder="Select employee"
            controlHeight="2rem"
          />
          <CustomSelect
            label="In/Out"
            name="inOut"
            value={form.inOut || ""}
            onChange={(v) => setField("inOut", v)}
            options={inOutOptions}
            placeholder="Select"
            controlHeight="2rem"
          />
          <div className="md:col-span-2">
            <Input
              label="Reason"
              value={form.reason || ""}
              onChange={(e) => setField("reason", e.target.value)}
              placeholder="Reason for manual entry"
              noMargin
            />
          </div>
        </div>
      );
    }

    if (type === "contract") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <CustomSelect
            label="Employee"
            name="employee"
            value={form.employee || ""}
            onChange={(v) => setField("employee", v)}
            options={employeeOptions}
            placeholder="Select employee"
            controlHeight="2rem"
          />
          <CustomSelect
            label="Template"
            name="template"
            value={form.template || ""}
            onChange={(v) => setField("template", v)}
            options={templateOptions}
            placeholder="Select template"
            controlHeight="2rem"
          />
        </div>
      );
    }

    if (type === "expense") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <CustomSelect
            label="Category"
            name="category"
            value={form.category || ""}
            onChange={(v) => setField("category", v)}
            options={expenseCategoryOptions}
            placeholder="Select category"
            controlHeight="2rem"
          />
          <Input
            label="Amount"
            type="number"
            value={form.amount || ""}
            onChange={(e) => setField("amount", e.target.value)}
            placeholder="0.00"
            noMargin
          />
          <div className="md:col-span-2">
            <FileUpload
              label="Receipt"
              name="quick_expense_receipt"
              value={form.receipt || null}
              onChange={(e) => setField("receipt", e.target.files?.[0] || null)}
              noMargin
            />
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input
          label="Period"
          type="month"
          value={form.period || ""}
          onChange={(e) => setField("period", e.target.value)}
          noMargin
        />
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <Modal width="w-full md:w-7/12">
      <div className="border-b border-gray-200 pb-3 mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Quick Add - {activeType.label}
        </h3>
        <p className="text-xxs text-gray-500">
          Create core items quickly, then continue in full form if needed.
        </p>
      </div>

      <div className="mb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-2">
          {QUICK_TYPES.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                setType(item.key);
                setForm({});
              }}
              className={`px-2 py-2 rounded border text-xxs cursor-pointer transition ${
                type === item.key
                  ? "bg-[#edf4ff] border-[#bcd4f6] text-[#1d4e89] font-semibold"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {renderFormByType()}

      <div className="flex justify-end gap-2 mt-6">
        <Button type="button" variant="cancel" onClick={onClose}>
          Close
        </Button>
        <Button type="button" variant="secondary" onClick={handleOpenFullForm}>
          Open Full Form
        </Button>
        <Button
          type="button"
          variant="success"
          onClick={handleSubmit}
        >
          Create / Submit
        </Button>
      </div>
    </Modal>
  );
}
