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

const leaveRows = [
  {
    id: 1,
    employee: "Hassan Raza",
    role: "Frontend Engineer",
    imageUrl: "/api/portraits/men/32.jpg",
    department: "Engineering",
    location: "Karachi HQ",
    leaveType: "Annual",
    date: new Date(2026, 3, 3),
    usedDays: 10,
    balanceDays: 12,
    accrualForecastDays: 18,
    status: "Healthy",
  },
  {
    id: 2,
    employee: "Sana Yousaf",
    role: "Product Analyst",
    imageUrl: "/api/portraits/women/45.jpg",
    department: "Product",
    location: "Lahore Office",
    leaveType: "Sick",
    date: new Date(2026, 3, 3),
    usedDays: 8,
    balanceDays: 5,
    accrualForecastDays: 10,
    status: "Watch",
  },
  {
    id: 3,
    employee: "Bilal Ahmed",
    role: "HR Executive",
    imageUrl: "/api/portraits/men/21.jpg",
    department: "People",
    location: "Karachi HQ",
    leaveType: "Annual",
    date: new Date(2026, 3, 3),
    usedDays: 14,
    balanceDays: 3,
    accrualForecastDays: 8,
    status: "Critical",
  },
  {
    id: 4,
    employee: "Areeba Khan",
    role: "Sales Lead",
    imageUrl: "/api/portraits/women/67.jpg",
    department: "Sales",
    location: "Islamabad Office",
    leaveType: "Annual",
    date: new Date(2026, 3, 2),
    usedDays: 11,
    balanceDays: 9,
    accrualForecastDays: 14,
    status: "Healthy",
  },
  {
    id: 5,
    employee: "Tariq Mehmood",
    role: "Operations Specialist",
    imageUrl: "/api/portraits/men/47.jpg",
    department: "Operations",
    location: "Dubai Office",
    leaveType: "Comp-off",
    date: new Date(2026, 3, 2),
    usedDays: 5,
    balanceDays: 4,
    accrualForecastDays: 7,
    status: "Watch",
  },
  {
    id: 6,
    employee: "Maham Ali",
    role: "Finance Analyst",
    imageUrl: "/api/portraits/women/34.jpg",
    department: "Finance",
    location: "Remote",
    leaveType: "Annual",
    date: new Date(2026, 3, 2),
    usedDays: 9,
    balanceDays: 11,
    accrualForecastDays: 16,
    status: "Healthy",
  },
  {
    id: 7,
    employee: "Nabeel Shah",
    role: "Backend Engineer",
    imageUrl: "/api/portraits/men/58.jpg",
    department: "Engineering",
    location: "Lahore Office",
    leaveType: "Sick",
    date: new Date(2026, 3, 1),
    usedDays: 7,
    balanceDays: 4,
    accrualForecastDays: 9,
    status: "Watch",
  },
  {
    id: 8,
    employee: "Hira Ahmed",
    role: "People Partner",
    imageUrl: "/api/portraits/women/28.jpg",
    department: "People",
    location: "Karachi HQ",
    leaveType: "Annual",
    date: new Date(2026, 3, 1),
    usedDays: 12,
    balanceDays: 2,
    accrualForecastDays: 7,
    status: "Critical",
  },
  {
    id: 9,
    employee: "Usman Farooq",
    role: "Account Executive",
    imageUrl: "/api/portraits/men/64.jpg",
    department: "Sales",
    location: "Dubai Office",
    leaveType: "Annual",
    date: new Date(2026, 3, 1),
    usedDays: 8,
    balanceDays: 8,
    accrualForecastDays: 12,
    status: "Healthy",
  },
  {
    id: 10,
    employee: "Rida Aslam",
    role: "UI Designer",
    imageUrl: "/api/portraits/women/39.jpg",
    department: "Product",
    location: "Remote",
    leaveType: "Comp-off",
    date: new Date(2026, 2, 31),
    usedDays: 4,
    balanceDays: 6,
    accrualForecastDays: 10,
    status: "Watch",
  },
];

const columnOptions = [
  { value: "employee", label: "Employee" },
  { value: "department", label: "Department" },
  { value: "location", label: "Location" },
  { value: "leaveType", label: "Leave Type" },
  { value: "date", label: "Date" },
  { value: "usedDays", label: "Used (days)" },
  { value: "balanceDays", label: "Balance (days)" },
  { value: "accrualForecastDays", label: "Forecast (days)" },
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
  leaveType: {
    label: "Leave Type",
    render: (row) => <span className="text-xxs text-gray-700">{row.leaveType}</span>,
    exportValue: (row) => row.leaveType,
  },
  date: {
    label: "Date",
    render: (row) => <span className="text-xxs text-gray-700">{format(row.date, "dd MMM yyyy")}</span>,
    exportValue: (row) => format(row.date, "yyyy-MM-dd"),
  },
  usedDays: {
    label: "Used (days)",
    render: (row) => <span className="text-xxs text-gray-700">{row.usedDays}</span>,
    exportValue: (row) => row.usedDays,
  },
  balanceDays: {
    label: "Balance (days)",
    render: (row) => <span className="text-xxs text-gray-700">{row.balanceDays}</span>,
    exportValue: (row) => row.balanceDays,
  },
  accrualForecastDays: {
    label: "Forecast (days)",
    render: (row) => <span className="text-xxs text-gray-700">{row.accrualForecastDays}</span>,
    exportValue: (row) => row.accrualForecastDays,
  },
  status: {
    label: "Status",
    render: (row) => {
      const statusId = row.status === "Healthy" ? 1 : row.status === "Watch" ? 3 : 2;
      return <StatusDesign statusId={statusId} label={row.status} />;
    },
    exportValue: (row) => row.status,
  },
};

const forecastByType = [
  { type: "Annual", pct: 82, note: "Stable accrual" },
  { type: "Sick", pct: 61, note: "Monitor trend" },
  { type: "Comp-off", pct: 74, note: "Balanced" },
];

const getForecastBar = (pct) => {
  if (pct >= 80) return "bg-green-500";
  if (pct >= 65) return "bg-yellow-500";
  return "bg-red-500";
};

export default function ReportLeave() {
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
    "leaveType",
    "date",
    "usedDays",
    "balanceDays",
    "accrualForecastDays",
    "status",
  ]);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [drilldown, setDrilldown] = useState(null);

  const filteredRows = useMemo(() => {
    const { startDate, endDate } = range[0];
    return leaveRows.filter((row) => {
      const deptMatch = department === "All" || row.department === department;
      const locationMatch = location === "All" || row.location === location;
      const dateMatch = !startDate || !endDate || (row.date >= startDate && row.date <= endDate);
      return deptMatch && locationMatch && dateMatch;
    });
  }, [range, department, location]);

  const metrics = useMemo(() => {
    const total = filteredRows.length;
    const used = filteredRows.reduce((sum, row) => sum + row.usedDays, 0);
    const balance = filteredRows.reduce((sum, row) => sum + row.balanceDays, 0);
    const forecast = filteredRows.reduce((sum, row) => sum + row.accrualForecastDays, 0);
    const avgUsage = total ? used / total : 0;

    return [
      {
        key: "usage",
        title: "Leave Usage",
        value: `${used} days`,
        desc: `Average ${avgUsage.toFixed(1)} days used per employee`,
        lines: [
          `${filteredRows.filter((row) => row.usedDays >= 10).length} high-usage profiles`,
          `${filteredRows.filter((row) => row.leaveType === "Annual").length} annual leave records`,
          `${total} records analyzed`,
        ],
      },
      {
        key: "balances",
        title: "Balances",
        value: `${balance} days`,
        desc: "Total current leave balance",
        lines: [
          `${filteredRows.filter((row) => row.balanceDays <= 3).length} low-balance profiles`,
          `${filteredRows.filter((row) => row.balanceDays >= 8).length} healthy balances`,
          `${filteredRows.filter((row) => row.status === "Critical").length} critical alerts`,
        ],
      },
      {
        key: "accrual-forecast",
        title: "Accrual Forecast",
        value: `${forecast} days`,
        desc: "Projected accrued leave in selected scope",
        lines: [
          `${filteredRows.filter((row) => row.accrualForecastDays >= 12).length} strong forecast profiles`,
          `${filteredRows.filter((row) => row.accrualForecastDays < 8).length} weak forecast profiles`,
          `${forecastByType.length} leave categories tracked`,
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
    triggerDownload(csv, "leave-report.csv", "text/csv;charset=utf-8");
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
        <head><title>Leave Report</title></head>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <h3 style="margin:0 0 8px 0;">Leave Report</h3>
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
            <h2 className="text-base font-semibold text-gray-700">Leave Reports</h2>
            <p className="text-xxs text-gray-500">Leave usage, balances, accrual forecasts.</p>
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

        <div className="border border-gray-200 rounded p-3 bg-white mt-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xxs font-semibold text-gray-700">Accrual Forecast</p>
              <p className="text-xxs text-gray-500">Leave-type forecast strength for selected scope.</p>
            </div>
            <p className="text-xxs text-gray-400 mt-2 md:mt-0">Last updated: {format(lastUpdated, "dd MMM yyyy hh:mm a")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
            {forecastByType.map((item) => (
              <div key={item.type} className="border border-gray-200 rounded p-2">
                <p className="text-xxs text-gray-700 font-semibold">{item.type}</p>
                <p className="text-[11px] text-gray-500">{item.note}</p>
                <div className="w-full h-2 bg-gray-100 rounded mt-2 overflow-hidden">
                  <div className={`h-2 ${getForecastBar(item.pct)}`} style={{ width: `${item.pct}%` }} />
                </div>
                <p className="text-[11px] text-gray-500 mt-1">{item.pct}%</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5">
          <div>
            <p className="text-xxs font-semibold text-gray-700">Filters</p>
            <p className="text-xxs text-gray-500">Date/Dept/Location filters for all leave report areas.</p>
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
            <p className="text-xxs text-gray-500">Configurable columns for leave report table.</p>
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
                    No leave records found for selected filters.
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
