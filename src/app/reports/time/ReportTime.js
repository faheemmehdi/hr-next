"use client";
import { useMemo, useState } from "react";
import { format } from "date-fns";
import Layout from "y@/app/components/Layout";
import Button from "y@/app/components/Button";
import CustomSelect from "y@/app/components/CustomSelect";
import DateRangePicker from "y@/app/components/DateRagePicker";
import Modal from "y@/app/components/ModalShell";
import StatusDesign from "y@/app/components/StatusColors";
import CheckboxDropdown from "y@/app/components/CheckboxDropdown";
import { FiUser } from "react-icons/fi";

const departmentOptions = [
  { value: "All", label: "All Departments" },
  { value: "Engineering", label: "Engineering" },
  { value: "People", label: "People" },
  { value: "Product", label: "Product" },
  { value: "Sales", label: "Sales" },
  { value: "Operations", label: "Operations" },
  { value: "Finance", label: "Finance" },
];

const locationOptions = [
  { value: "All", label: "All Locations" },
  { value: "Karachi HQ", label: "Karachi HQ" },
  { value: "Lahore Office", label: "Lahore Office" },
  { value: "Islamabad Office", label: "Islamabad Office" },
  { value: "Dubai Office", label: "Dubai Office" },
  { value: "Remote", label: "Remote" },
];

const timeRows = [
  {
    id: 1,
    employee: "Hassan Raza",
    role: "Frontend Engineer",
    imageUrl: "/api/portraits/men/32.jpg",
    department: "Engineering",
    location: "Karachi HQ",
    project: "Web Revamp",
    date: new Date(2026, 3, 1),
    trackedHours: 9.2,
    billableHours: 7.4,
    nonBillableHours: 1.8,
    overtimeHours: 1.2,
    utilizationPct: 80,
    status: "Healthy",
  },
  {
    id: 2,
    employee: "Sana Yousaf",
    role: "Product Analyst",
    imageUrl: "/api/portraits/women/45.jpg",
    department: "Product",
    location: "Lahore Office",
    project: "Discovery Sprint",
    date: new Date(2026, 3, 1),
    trackedHours: 8.6,
    billableHours: 6.1,
    nonBillableHours: 2.5,
    overtimeHours: 0.6,
    utilizationPct: 71,
    status: "Needs Attention",
  },
  {
    id: 3,
    employee: "Bilal Ahmed",
    role: "HR Executive",
    imageUrl: "/api/portraits/men/21.jpg",
    department: "People",
    location: "Karachi HQ",
    project: "Onboarding Ops",
    date: new Date(2026, 3, 1),
    trackedHours: 8.1,
    billableHours: 5.3,
    nonBillableHours: 2.8,
    overtimeHours: 0,
    utilizationPct: 65,
    status: "Needs Attention",
  },
  {
    id: 4,
    employee: "Areeba Khan",
    role: "Sales Lead",
    imageUrl: "/api/portraits/women/67.jpg",
    department: "Sales",
    location: "Islamabad Office",
    project: "Enterprise Pitch",
    date: new Date(2026, 3, 1),
    trackedHours: 10.3,
    billableHours: 8.9,
    nonBillableHours: 1.4,
    overtimeHours: 2.3,
    utilizationPct: 86,
    status: "Overloaded",
  },
  {
    id: 5,
    employee: "Tariq Mehmood",
    role: "Operations Specialist",
    imageUrl: "/api/portraits/men/47.jpg",
    department: "Operations",
    location: "Dubai Office",
    project: "Shift Optimization",
    date: new Date(2026, 3, 1),
    trackedHours: 9,
    billableHours: 6.8,
    nonBillableHours: 2.2,
    overtimeHours: 1,
    utilizationPct: 76,
    status: "Healthy",
  },
  {
    id: 6,
    employee: "Maham Ali",
    role: "Finance Analyst",
    imageUrl: "/api/portraits/women/34.jpg",
    department: "Finance",
    location: "Remote",
    project: "Quarter Close",
    date: new Date(2026, 3, 1),
    trackedHours: 8.7,
    billableHours: 6,
    nonBillableHours: 2.7,
    overtimeHours: 0.7,
    utilizationPct: 69,
    status: "Needs Attention",
  },
  {
    id: 7,
    employee: "Nabeel Shah",
    role: "Backend Engineer",
    imageUrl: "/api/portraits/men/58.jpg",
    department: "Engineering",
    location: "Lahore Office",
    project: "API Hardening",
    date: new Date(2026, 2, 31),
    trackedHours: 9.6,
    billableHours: 8.2,
    nonBillableHours: 1.4,
    overtimeHours: 1.6,
    utilizationPct: 85,
    status: "Healthy",
  },
  {
    id: 8,
    employee: "Hira Ahmed",
    role: "People Partner",
    imageUrl: "/api/portraits/women/28.jpg",
    department: "People",
    location: "Karachi HQ",
    project: "Policy Refresh",
    date: new Date(2026, 2, 31),
    trackedHours: 8.2,
    billableHours: 5,
    nonBillableHours: 3.2,
    overtimeHours: 0.2,
    utilizationPct: 61,
    status: "Needs Attention",
  },
  {
    id: 9,
    employee: "Usman Farooq",
    role: "Account Executive",
    imageUrl: "/api/portraits/men/64.jpg",
    department: "Sales",
    location: "Dubai Office",
    project: "Pipeline Acceleration",
    date: new Date(2026, 2, 31),
    trackedHours: 9.8,
    billableHours: 8.4,
    nonBillableHours: 1.4,
    overtimeHours: 1.8,
    utilizationPct: 86,
    status: "Overloaded",
  },
  {
    id: 10,
    employee: "Rida Aslam",
    role: "UI Designer",
    imageUrl: "/api/portraits/women/39.jpg",
    department: "Product",
    location: "Remote",
    project: "Design System",
    date: new Date(2026, 2, 31),
    trackedHours: 8.4,
    billableHours: 6.7,
    nonBillableHours: 1.7,
    overtimeHours: 0.4,
    utilizationPct: 80,
    status: "Healthy",
  },
];

const columnOptions = [
  { value: "employee", label: "Employee" },
  { value: "department", label: "Department" },
  { value: "location", label: "Location" },
  { value: "project", label: "Project" },
  { value: "date", label: "Date" },
  { value: "trackedHours", label: "Tracked (hrs)" },
  { value: "billableHours", label: "Billable (hrs)" },
  { value: "nonBillableHours", label: "Non-Billable (hrs)" },
  { value: "overtimeHours", label: "Overtime (hrs)" },
  { value: "utilizationPct", label: "Utilization %" },
  { value: "status", label: "Status" },
];
const tableColumns = columnOptions.map((col) => ({ key: col.value, label: col.label }));

const columnDefinitions = {
  employee: {
    label: "Employee",
    render: (row) => (
      <div className="flex items-center gap-2">
        {row.imageUrl ? (
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${row.imageUrl}`}
            alt={row.employee}
            className="w-7 h-7 rounded-full object-cover border border-gray-300"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
            <FiUser className="text-gray-500" size={12} />
          </div>
        )}
        <div>
          <p className="text-xxs font-semibold text-gray-800">{row.employee}</p>
          <p className="text-[11px] text-gray-500">{row.role}</p>
        </div>
      </div>
    ),
    exportValue: (row) => `${row.employee} (${row.role})`,
  },
  department: {
    label: "Department",
    render: (row) => <span className="text-xxs text-gray-700">{row.department}</span>,
    exportValue: (row) => row.department,
  },
  location: {
    label: "Location",
    render: (row) => <span className="text-xxs text-gray-700">{row.location}</span>,
    exportValue: (row) => row.location,
  },
  project: {
    label: "Project",
    render: (row) => <span className="text-xxs text-gray-700">{row.project}</span>,
    exportValue: (row) => row.project,
  },
  date: {
    label: "Date",
    render: (row) => <span className="text-xxs text-gray-700">{format(row.date, "dd MMM yyyy")}</span>,
    exportValue: (row) => format(row.date, "yyyy-MM-dd"),
  },
  trackedHours: {
    label: "Tracked (hrs)",
    render: (row) => <span className="text-xxs text-gray-700">{row.trackedHours.toFixed(1)}</span>,
    exportValue: (row) => row.trackedHours.toFixed(1),
  },
  billableHours: {
    label: "Billable (hrs)",
    render: (row) => <span className="text-xxs text-gray-700">{row.billableHours.toFixed(1)}</span>,
    exportValue: (row) => row.billableHours.toFixed(1),
  },
  nonBillableHours: {
    label: "Non-Billable (hrs)",
    render: (row) => <span className="text-xxs text-gray-700">{row.nonBillableHours.toFixed(1)}</span>,
    exportValue: (row) => row.nonBillableHours.toFixed(1),
  },
  overtimeHours: {
    label: "Overtime (hrs)",
    render: (row) => <span className="text-xxs text-gray-700">{row.overtimeHours.toFixed(1)}</span>,
    exportValue: (row) => row.overtimeHours.toFixed(1),
  },
  utilizationPct: {
    label: "Utilization %",
    render: (row) => <span className="text-xxs text-gray-700">{row.utilizationPct}%</span>,
    exportValue: (row) => `${row.utilizationPct}%`,
  },
  status: {
    label: "Status",
    render: (row) => {
      const statusId = row.status === "Healthy" ? 1 : row.status === "Needs Attention" ? 3 : 2;
      return <StatusDesign statusId={statusId} label={row.status} />;
    },
    exportValue: (row) => row.status,
  },
};

export default function ReportTime() {
  const [range, setRange] = useState([
    {
      startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [department, setDepartment] = useState("All");
  const [location, setLocation] = useState("All");
  const [selectedColumns, setSelectedColumns] = useState([
    "employee",
    "department",
    "location",
    "project",
    "date",
    "billableHours",
    "nonBillableHours",
    "overtimeHours",
    "utilizationPct",
    "status",
  ]);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [drilldown, setDrilldown] = useState(null);

  const filteredRows = useMemo(() => {
    const { startDate, endDate } = range[0];
    return timeRows.filter((row) => {
      const deptMatch = department === "All" || row.department === department;
      const locationMatch = location === "All" || row.location === location;
      const dateMatch = !startDate || !endDate || (row.date >= startDate && row.date <= endDate);
      return deptMatch && locationMatch && dateMatch;
    });
  }, [range, department, location]);

  const metrics = useMemo(() => {
    const total = filteredRows.length;
    const tracked = filteredRows.reduce((sum, row) => sum + row.trackedHours, 0);
    const billable = filteredRows.reduce((sum, row) => sum + row.billableHours, 0);
    const nonBillable = filteredRows.reduce((sum, row) => sum + row.nonBillableHours, 0);
    const overtime = filteredRows.reduce((sum, row) => sum + row.overtimeHours, 0);
    const utilization = tracked ? (billable / tracked) * 100 : 0;
    const billableRatio = tracked ? (billable / tracked) * 100 : 0;
    const nonBillableRatio = tracked ? (nonBillable / tracked) * 100 : 0;

    return [
      {
        key: "utilization",
        title: "Utilization",
        value: `${utilization.toFixed(1)}%`,
        desc: `${billable.toFixed(1)} billable hrs out of ${tracked.toFixed(1)} tracked hrs`,
        lines: [
          `${filteredRows.filter((row) => row.utilizationPct >= 80).length} team members >= 80%`,
          `${filteredRows.filter((row) => row.utilizationPct < 70).length} team members < 70%`,
          `${total} records considered`,
        ],
      },
      {
        key: "billable-vs-nonbillable",
        title: "Billable vs Non-Billable",
        value: `${billableRatio.toFixed(1)}% / ${nonBillableRatio.toFixed(1)}%`,
        desc: `${billable.toFixed(1)}h billable and ${nonBillable.toFixed(1)}h non-billable`,
        lines: [
          `${filteredRows.filter((row) => row.billableHours >= 7).length} records with >= 7 billable hrs`,
          `${filteredRows.filter((row) => row.nonBillableHours >= 2).length} records with >= 2 non-billable hrs`,
          `${tracked.toFixed(1)} total tracked hrs in filter`,
        ],
      },
      {
        key: "overtime",
        title: "Overtime",
        value: `${overtime.toFixed(1)}h`,
        desc: "Total overtime in selected period",
        lines: [
          `${filteredRows.filter((row) => row.overtimeHours >= 2).length} records with heavy overtime`,
          `${filteredRows.filter((row) => row.overtimeHours > 0 && row.overtimeHours < 2).length} records with light overtime`,
          `${filteredRows.filter((row) => row.overtimeHours === 0).length} records with no overtime`,
        ],
      },
    ];
  }, [filteredRows]);

  const exportRows = useMemo(() => {
    return filteredRows.map((row) => {
      const out = {};
      selectedColumns.forEach((key) => {
        const label = columnDefinitions[key]?.label || key;
        const getter = columnDefinitions[key]?.exportValue;
        out[label] = getter ? getter(row) : "";
      });
      return out;
    });
  }, [filteredRows, selectedColumns]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLastUpdated(new Date());
    }, 1000);
  };

  const triggerDownload = (content, name, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    if (!exportRows.length || !selectedColumns.length) return;
    const headers = Object.keys(exportRows[0]);
    const rows = exportRows.map((row) =>
      headers.map((h) => `"${String(row[h] ?? "").replace(/"/g, '""')}"`).join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    triggerDownload(csv, "time-report.csv", "text/csv;charset=utf-8");
  };

  const exportPDF = () => {
    if (!exportRows.length || !selectedColumns.length) return;
    const headers = Object.keys(exportRows[0]);
    const tableRows = exportRows
      .map(
        (row) =>
          `<tr>${headers
            .map((h) => `<td style=\"border:1px solid #d1d5db;padding:8px;font-size:12px;\">${row[h]}</td>`)
            .join("")}</tr>`
      )
      .join("");

    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html>
        <head><title>Time Report</title></head>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <h3 style="margin:0 0 8px 0;">Time Report</h3>
          <p style="margin:0 0 12px 0; font-size:12px; color:#4b5563;">Generated: ${format(new Date(), "dd MMM yyyy hh:mm a")}</p>
          <table style="border-collapse: collapse; width: 100%;">
            <thead>
              <tr>${headers
                .map(
                  (h) =>
                    `<th style="border:1px solid #d1d5db;padding:8px;text-align:left;background:#f3f4f6;font-size:12px;">${h}</th>`
                )
                .join("")}</tr>
            </thead>
            <tbody>${tableRows}</tbody>
          </table>
        </body>
      </html>
    `);
    win.document.close();
    win.focus();
    win.print();
  };

  return (
    <Layout>
      <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-700">Time Reports</h2>
            <p className="text-xxs text-gray-500">Utilization, billable vs non-billable, overtime.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" type="button" onClick={exportCSV} disabled={!exportRows.length || !selectedColumns.length}>
              Export CSV
            </Button>
            <Button variant="secondary" type="button" onClick={exportPDF} disabled={!exportRows.length || !selectedColumns.length}>
              Export PDF
            </Button>
            <Button variant="success" type="button" onClick={handleRefresh}>
              {refreshing ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
          {metrics.map((metric) => (
            <div key={metric.key} className="border border-gray-200 rounded p-3 bg-white">
              <p className="text-xxs font-semibold text-gray-700">{metric.title}</p>
              <h3 className="text-base font-semibold text-gray-800 mt-1">{metric.value}</h3>
              <p className="text-xxs text-gray-500 mt-1">{metric.desc}</p>
              <button
                type="button"
                className="text-xxs mt-2 text-[var(--color-primary)] underline cursor-pointer"
                onClick={() => setDrilldown(metric)}
              >
                Drilldown
              </button>
            </div>
          ))}
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5">
          <div>
            <p className="text-xxs font-semibold text-gray-700">Filters</p>
            <p className="text-xxs text-gray-500">Date/Dept/Location filters for all time report areas.</p>
            <p className="text-xxs text-gray-400 mt-1">Last updated: {format(lastUpdated, "dd MMM yyyy hh:mm a")}</p>
          </div>
          <div className="w-full md:w-auto flex items-center justify-end flex-col md:flex-row mt-2 md:mt-0 gap-2">
            <div className="w-full md:w-[13rem]">
              <DateRangePicker range={range} setRange={setRange} />
            </div>
            <div className="w-full md:w-[9rem]">
              <CustomSelect
                name="department"
                value={department}
                onChange={setDepartment}
                options={departmentOptions}
                controlHeight="2rem"
              />
            </div>
            <div className="w-full md:w-[9rem]">
              <CustomSelect
                name="location"
                value={location}
                onChange={setLocation}
                options={locationOptions}
                controlHeight="2rem"
              />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-3">
          <div>
            <h3 className="text-base font-semibold text-gray-700">Report Table</h3>
            <p className="text-xxs text-gray-500">Configurable columns for time report table.</p>
          </div>
          <div className="w-full md:w-80 mt-2 md:mt-0">
            <CheckboxDropdown columns={tableColumns} selected={selectedColumns} onChange={setSelectedColumns} />
          </div>
        </div>

        <div className="overflow-x-auto shadow-md border border-gray-200 rounded max-h-[72vh]">
          <table className="w-full text-xs border-collapse">
            <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
              <tr>
                {selectedColumns.map((key) => (
                  <th key={key} className="px-4 py-3 text-left">{columnDefinitions[key]?.label || key}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-xxs">
              {!selectedColumns.length ? (
                <tr>
                  <td className="px-4 py-4 text-gray-500" colSpan={1}>Please select at least one column.</td>
                </tr>
              ) : filteredRows.length ? (
                filteredRows.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors`}
                  >
                    {selectedColumns.map((key) => (
                      <td key={`${row.id}-${key}`} className="px-4 py-3 align-top">
                        {columnDefinitions[key]?.render(row)}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-4 text-gray-500" colSpan={selectedColumns.length || 1}>
                    No time records found for selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {drilldown && (
          <Modal width="w-full md:w-5/12">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{drilldown.title} Drilldown</h3>
            <div className="text-xxs text-gray-600 space-y-2">
              {drilldown.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="cancel" type="button" onClick={() => setDrilldown(null)}>
                Close
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </Layout>
  );
}
