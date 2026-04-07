"use client";
import { useMemo, useState } from "react";
import { format } from "date-fns";
import Layout from "y@/app/components/Layout";
import Button from "y@/app/components/Button";
import CustomSelect from "y@/app/components/CustomSelect";
import DateRangePicker from "y@/app/components/DateRagePicker";
import Modal from "y@/app/components/ModalShell";
import CheckboxDropdown from "y@/app/components/CheckboxDropdown";

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
  { value: "Austin", label: "Austin" },
  { value: "New York", label: "New York" },
  { value: "London", label: "London" },
  { value: "Remote", label: "Remote" },
  { value: "Dubai", label: "Dubai" },
];

const reportRows = [
  {
    id: 1,
    employee: "Harper Delgado",
    role: "Engineering Lead",
    department: "Engineering",
    location: "Austin",
    hireDate: new Date(2018, 2, 12),
    employmentType: "Full-Time",
    turnoverRate: 2.3,
    womenPct: 47,
    urmPct: 29,
    attritionRisk: "Low",
  },
  {
    id: 2,
    employee: "Priya Narang",
    role: "Senior Product Analyst",
    department: "Product",
    location: "New York",
    hireDate: new Date(2019, 6, 18),
    employmentType: "Full-Time",
    turnoverRate: 1.2,
    womenPct: 58,
    urmPct: 32,
    attritionRisk: "Moderate",
  },
  {
    id: 3,
    employee: "Tomas Vieira",
    role: "People Partner",
    department: "People",
    location: "Remote",
    hireDate: new Date(2020, 9, 3),
    employmentType: "Contract",
    turnoverRate: 0.8,
    womenPct: 52,
    urmPct: 41,
    attritionRisk: "Low",
  },
  {
    id: 4,
    employee: "Mara Chen",
    role: "Sales Director",
    department: "Sales",
    location: "London",
    hireDate: new Date(2023, 1, 20),
    employmentType: "Full-Time",
    turnoverRate: 4.6,
    womenPct: 39,
    urmPct: 23,
    attritionRisk: "High",
  },
  {
    id: 5,
    employee: "Liam Ortiz",
    role: "Operations Specialist",
    department: "Operations",
    location: "Austin",
    hireDate: new Date(2021, 4, 28),
    employmentType: "Contract",
    turnoverRate: 2.0,
    womenPct: 44,
    urmPct: 26,
    attritionRisk: "Low",
  },
  {
    id: 6,
    employee: "Sierra Kent",
    role: "Finance Business Partner",
    department: "Finance",
    location: "Dubai",
    hireDate: new Date(2017, 10, 9),
    employmentType: "Full-Time",
    turnoverRate: 1.4,
    womenPct: 51,
    urmPct: 34,
    attritionRisk: "Low",
  },
  {
    id: 7,
    employee: "Ariana Malik",
    role: "Engineering Manager",
    department: "Engineering",
    location: "Remote",
    hireDate: new Date(2022, 7, 11),
    employmentType: "Full-Time",
    turnoverRate: 2.8,
    womenPct: 48,
    urmPct: 31,
    attritionRisk: "Moderate",
  },
  {
    id: 8,
    employee: "Yusuf Rahman",
    role: "Finance Analyst",
    department: "Finance",
    location: "New York",
    hireDate: new Date(2024, 2, 8),
    employmentType: "Full-Time",
    turnoverRate: 3.2,
    womenPct: 42,
    urmPct: 28,
    attritionRisk: "Moderate",
  },
];

const columnOptions = [
  { value: "employee", label: "Employee" },
  { value: "department", label: "Department" },
  { value: "location", label: "Location" },
  { value: "employmentType", label: "Employment Type" },
  { value: "hireDate", label: "Hire Date" },
  { value: "tenure", label: "Tenure" },
  { value: "turnover", label: "Turnover %" },
  { value: "demographics", label: "Demographics" },
  { value: "attritionRisk", label: "Attrition Risk" },
];
const tableColumns = columnOptions.map((col) => ({ key: col.value, label: col.label }));

const getTenure = (hireDate) => {
  const today = new Date();
  const years = Math.max(0, today.getFullYear() - hireDate.getFullYear());
  return `${years} yrs`;
};

const columnDefinitions = {
  employee: {
    label: "Employee",
    render: (row) => (
      <div>
        <p className="text-xxs font-semibold text-gray-800">{row.employee}</p>
        <p className="text-[11px] text-gray-500">{row.role}</p>
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
  employmentType: {
    label: "Employment Type",
    render: (row) => <span className="text-xxs text-gray-700">{row.employmentType}</span>,
    exportValue: (row) => row.employmentType,
  },
  hireDate: {
    label: "Hire Date",
    render: (row) => <span className="text-xxs text-gray-700">{format(row.hireDate, "dd MMM yyyy")}</span>,
    exportValue: (row) => format(row.hireDate, "yyyy-MM-dd"),
  },
  tenure: {
    label: "Tenure",
    render: (row) => <span className="text-xxs text-gray-700">{getTenure(row.hireDate)}</span>,
    exportValue: (row) => getTenure(row.hireDate),
  },
  turnover: {
    label: "Turnover %",
    render: (row) => <span className="text-xxs text-gray-700">{row.turnoverRate.toFixed(1)}%</span>,
    exportValue: (row) => `${row.turnoverRate.toFixed(1)}%`,
  },
  demographics: {
    label: "Demographics",
    render: (row) => <span className="text-xxs text-gray-700">Women {row.womenPct}% | URM {row.urmPct}%</span>,
    exportValue: (row) => `Women ${row.womenPct}% | URM ${row.urmPct}%`,
  },
  attritionRisk: {
    label: "Attrition Risk",
    render: (row) => {
      const tone =
        row.attritionRisk === "Low"
          ? "bg-[#e6faf0] text-green-700"
          : row.attritionRisk === "Moderate"
            ? "bg-[#faf4cd] text-yellow-700"
            : "bg-[#fce8ee] text-red-700";
      return <span className={`inline-flex text-xxs font-semibold rounded-2xl px-2 py-[3px] ${tone}`}>{row.attritionRisk}</span>;
    },
    exportValue: (row) => row.attritionRisk,
  },
};

export default function ReportEmp() {
  const [range, setRange] = useState([
    {
      startDate: new Date(new Date().setDate(new Date().getDate() - 90)),
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
    "hireDate",
    "turnover",
    "demographics",
    "attritionRisk",
  ]);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [drilldown, setDrilldown] = useState(null);

  const filteredRows = useMemo(() => {
    const { startDate, endDate } = range[0];
    return reportRows.filter((row) => {
      const matchesDepartment = department === "All" || row.department === department;
      const matchesLocation = location === "All" || row.location === location;
      const withinDate =
        !startDate || !endDate || (row.hireDate >= startDate && row.hireDate <= endDate);
      return matchesDepartment && matchesLocation && withinDate;
    });
  }, [department, location, range]);

  const metrics = useMemo(() => {
    const total = filteredRows.length;
    const avgTurnover = total
      ? filteredRows.reduce((sum, row) => sum + row.turnoverRate, 0) / total
      : 0;
    const avgWomen = total
      ? filteredRows.reduce((sum, row) => sum + row.womenPct, 0) / total
      : 0;
    const avgUrm = total
      ? filteredRows.reduce((sum, row) => sum + row.urmPct, 0) / total
      : 0;

    return [
      {
        key: "headcount",
        title: "Headcount",
        value: `${total}`,
        sub: "Employees in current filter",
        lines: [
          `${filteredRows.filter((r) => r.employmentType === "Full-Time").length} full-time`,
          `${filteredRows.filter((r) => r.employmentType === "Contract").length} contract`,
          `${filteredRows.filter((r) => r.attritionRisk === "High").length} high attrition risk`,
        ],
      },
      {
        key: "turnover",
        title: "Turnover",
        value: `${avgTurnover.toFixed(1)}%`,
        sub: "Average turnover rate",
        lines: [
          `${filteredRows.filter((r) => r.attritionRisk === "High").length} high risk`,
          `${filteredRows.filter((r) => r.attritionRisk === "Moderate").length} moderate risk`,
          `${filteredRows.filter((r) => r.attritionRisk === "Low").length} low risk`,
        ],
      },
      {
        key: "demographics",
        title: "Demographics",
        value: `Women ${avgWomen.toFixed(0)}% | URM ${avgUrm.toFixed(0)}%`,
        sub: "Average representation snapshot",
        lines: [
          `${filteredRows.filter((r) => r.womenPct >= 50).length} records with women >= 50%`,
          `${filteredRows.filter((r) => r.urmPct >= 30).length} records with URM >= 30%`,
          `${total} records considered`,
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
    triggerDownload(csv, "employees-report.csv", "text/csv;charset=utf-8");
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
        <head><title>Employees Report</title></head>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <h3 style="margin:0 0 8px 0;">Employees Report</h3>
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
            <h2 className="text-base font-semibold text-gray-700">Employees Reports</h2>
            <p className="text-xxs text-gray-500">Headcount/turnover/demographics with drilldowns.</p>
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
              <p className="text-xxs text-gray-500 mt-1">{metric.sub}</p>
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
            <p className="text-xxs text-gray-500">Date/Dept/Location filters for metrics, table and exports.</p>
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
            <p className="text-xxs text-gray-500">Configurable columns for employee report output.</p>
          </div>
          <div className="w-full md:w-80 mt-2 md:mt-0">
            <CheckboxDropdown
              columns={tableColumns}
              selected={selectedColumns}
              onChange={setSelectedColumns}
            />
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
                    No records found for selected filters.
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
