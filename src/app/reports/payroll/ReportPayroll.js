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

const payrollRows = [
  {
    id: 1,
    employee: "Hassan Raza",
    role: "Frontend Engineer",
    imageUrl: "/api/portraits/men/32.jpg",
    department: "Engineering",
    location: "Karachi HQ",
    month: "Apr 2026",
    date: new Date(2026, 3, 1),
    payrollCost: 4100,
    budgetCost: 3950,
    varianceAmount: 150,
    variancePct: 3.8,
    taxDeduction: 385,
    netPay: 3310,
    status: "Healthy",
  },
  {
    id: 2,
    employee: "Sana Yousaf",
    role: "Product Analyst",
    imageUrl: "/api/portraits/women/45.jpg",
    department: "Product",
    location: "Lahore Office",
    month: "Apr 2026",
    date: new Date(2026, 3, 1),
    payrollCost: 3750,
    budgetCost: 3600,
    varianceAmount: 150,
    variancePct: 4.2,
    taxDeduction: 330,
    netPay: 3030,
    status: "Watch",
  },
  {
    id: 3,
    employee: "Bilal Ahmed",
    role: "HR Executive",
    imageUrl: "/api/portraits/men/21.jpg",
    department: "People",
    location: "Karachi HQ",
    month: "Apr 2026",
    date: new Date(2026, 3, 1),
    payrollCost: 3200,
    budgetCost: 3150,
    varianceAmount: 50,
    variancePct: 1.6,
    taxDeduction: 260,
    netPay: 2650,
    status: "Healthy",
  },
  {
    id: 4,
    employee: "Areeba Khan",
    role: "Sales Lead",
    imageUrl: "/api/portraits/women/67.jpg",
    department: "Sales",
    location: "Islamabad Office",
    month: "Apr 2026",
    date: new Date(2026, 3, 1),
    payrollCost: 5200,
    budgetCost: 4600,
    varianceAmount: 600,
    variancePct: 13,
    taxDeduction: 540,
    netPay: 4060,
    status: "Critical",
  },
  {
    id: 5,
    employee: "Tariq Mehmood",
    role: "Operations Specialist",
    imageUrl: "/api/portraits/men/47.jpg",
    department: "Operations",
    location: "Dubai Office",
    month: "Apr 2026",
    date: new Date(2026, 3, 1),
    payrollCost: 3650,
    budgetCost: 3500,
    varianceAmount: 150,
    variancePct: 4.3,
    taxDeduction: 310,
    netPay: 2940,
    status: "Watch",
  },
  {
    id: 6,
    employee: "Maham Ali",
    role: "Finance Analyst",
    imageUrl: "/api/portraits/women/34.jpg",
    department: "Finance",
    location: "Remote",
    month: "Apr 2026",
    date: new Date(2026, 3, 1),
    payrollCost: 3950,
    budgetCost: 3850,
    varianceAmount: 100,
    variancePct: 2.6,
    taxDeduction: 350,
    netPay: 3180,
    status: "Healthy",
  },
  {
    id: 7,
    employee: "Nabeel Shah",
    role: "Backend Engineer",
    imageUrl: "/api/portraits/men/58.jpg",
    department: "Engineering",
    location: "Lahore Office",
    month: "Mar 2026",
    date: new Date(2026, 2, 1),
    payrollCost: 4300,
    budgetCost: 4000,
    varianceAmount: 300,
    variancePct: 7.5,
    taxDeduction: 405,
    netPay: 3470,
    status: "Watch",
  },
  {
    id: 8,
    employee: "Hira Ahmed",
    role: "People Partner",
    imageUrl: "/api/portraits/women/28.jpg",
    department: "People",
    location: "Karachi HQ",
    month: "Mar 2026",
    date: new Date(2026, 2, 1),
    payrollCost: 3350,
    budgetCost: 3300,
    varianceAmount: 50,
    variancePct: 1.5,
    taxDeduction: 275,
    netPay: 2780,
    status: "Healthy",
  },
  {
    id: 9,
    employee: "Usman Farooq",
    role: "Account Executive",
    imageUrl: "/api/portraits/men/64.jpg",
    department: "Sales",
    location: "Dubai Office",
    month: "Mar 2026",
    date: new Date(2026, 2, 1),
    payrollCost: 4700,
    budgetCost: 4350,
    varianceAmount: 350,
    variancePct: 8,
    taxDeduction: 470,
    netPay: 3730,
    status: "Critical",
  },
  {
    id: 10,
    employee: "Rida Aslam",
    role: "UI Designer",
    imageUrl: "/api/portraits/women/39.jpg",
    department: "Product",
    location: "Remote",
    month: "Mar 2026",
    date: new Date(2026, 2, 1),
    payrollCost: 3550,
    budgetCost: 3450,
    varianceAmount: 100,
    variancePct: 2.9,
    taxDeduction: 290,
    netPay: 2860,
    status: "Healthy",
  },
];

const columnOptions = [
  { value: "employee", label: "Employee" },
  { value: "department", label: "Department" },
  { value: "location", label: "Location" },
  { value: "month", label: "Month" },
  { value: "payrollCost", label: "Payroll Cost" },
  { value: "budgetCost", label: "Budget Cost" },
  { value: "varianceAmount", label: "Variance Amount" },
  { value: "variancePct", label: "Variance %" },
  { value: "taxDeduction", label: "Tax Deduction" },
  { value: "netPay", label: "Net Pay" },
  { value: "status", label: "Status" },
];
const tableColumns = columnOptions.map((col) => ({ key: col.value, label: col.label }));

const currency = (value) => `$${value.toLocaleString()}`;

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
  month: {
    label: "Month",
    render: (row) => <span className="text-xxs text-gray-700">{row.month}</span>,
    exportValue: (row) => row.month,
  },
  payrollCost: {
    label: "Payroll Cost",
    render: (row) => <span className="text-xxs text-gray-700">{currency(row.payrollCost)}</span>,
    exportValue: (row) => row.payrollCost,
  },
  budgetCost: {
    label: "Budget Cost",
    render: (row) => <span className="text-xxs text-gray-700">{currency(row.budgetCost)}</span>,
    exportValue: (row) => row.budgetCost,
  },
  varianceAmount: {
    label: "Variance Amount",
    render: (row) => <span className="text-xxs text-gray-700">{currency(row.varianceAmount)}</span>,
    exportValue: (row) => row.varianceAmount,
  },
  variancePct: {
    label: "Variance %",
    render: (row) => <span className="text-xxs text-gray-700">{row.variancePct.toFixed(1)}%</span>,
    exportValue: (row) => `${row.variancePct.toFixed(1)}%`,
  },
  taxDeduction: {
    label: "Tax Deduction",
    render: (row) => <span className="text-xxs text-gray-700">{currency(row.taxDeduction)}</span>,
    exportValue: (row) => row.taxDeduction,
  },
  netPay: {
    label: "Net Pay",
    render: (row) => <span className="text-xxs text-gray-700">{currency(row.netPay)}</span>,
    exportValue: (row) => row.netPay,
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

const taxSummaryByType = [
  { type: "Income Tax", amount: 1890, pct: 74 },
  { type: "Social Contributions", amount: 420, pct: 16 },
  { type: "Other Deductions", amount: 245, pct: 10 },
];

const getTaxBar = (pct) => {
  if (pct >= 65) return "bg-blue-600";
  if (pct >= 40) return "bg-blue-500";
  return "bg-blue-400";
};

export default function ReportPayroll() {
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
    "month",
    "payrollCost",
    "varianceAmount",
    "variancePct",
    "taxDeduction",
    "netPay",
    "status",
  ]);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [drilldown, setDrilldown] = useState(null);

  const filteredRows = useMemo(() => {
    const { startDate, endDate } = range[0];
    return payrollRows.filter((row) => {
      const deptMatch = department === "All" || row.department === department;
      const locationMatch = location === "All" || row.location === location;
      const dateMatch = !startDate || !endDate || (row.date >= startDate && row.date <= endDate);
      return deptMatch && locationMatch && dateMatch;
    });
  }, [range, department, location]);

  const metrics = useMemo(() => {
    const total = filteredRows.length;
    const totalPayroll = filteredRows.reduce((sum, row) => sum + row.payrollCost, 0);
    const totalVariance = filteredRows.reduce((sum, row) => sum + row.varianceAmount, 0);
    const avgVariancePct = total ? filteredRows.reduce((sum, row) => sum + row.variancePct, 0) / total : 0;
    const totalTax = filteredRows.reduce((sum, row) => sum + row.taxDeduction, 0);

    return [
      {
        key: "costs",
        title: "Costs",
        value: currency(totalPayroll),
        desc: `Total payroll cost across ${total} records`,
        lines: [
          `${filteredRows.filter((row) => row.payrollCost >= 4500).length} high-cost payroll records`,
          `${currency(filteredRows.reduce((sum, row) => sum + row.netPay, 0))} total net pay`,
          `${currency(filteredRows.reduce((sum, row) => sum + row.budgetCost, 0))} total budgeted cost`,
        ],
      },
      {
        key: "variances",
        title: "Variances",
        value: `${avgVariancePct.toFixed(1)}%`,
        desc: `${currency(totalVariance)} total variance amount`,
        lines: [
          `${filteredRows.filter((row) => row.variancePct >= 8).length} high variance records`,
          `${filteredRows.filter((row) => row.variancePct < 4).length} stable variance records`,
          `${currency(totalPayroll - filteredRows.reduce((sum, row) => sum + row.budgetCost, 0))} variance vs budget`,
        ],
      },
      {
        key: "tax-summaries",
        title: "Tax Summaries",
        value: currency(totalTax),
        desc: "Total tax deductions in selected scope",
        lines: [
          `${filteredRows.filter((row) => row.taxDeduction >= 400).length} records with high tax deduction`,
          `${(total ? (totalTax / total).toFixed(1) : 0)} average tax per record`,
          `${filteredRows.filter((row) => row.status === "Critical").length} records needing payroll review`,
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
    triggerDownload(csv, "payroll-report.csv", "text/csv;charset=utf-8");
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
        <head><title>Payroll Report</title></head>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <h3 style="margin:0 0 8px 0;">Payroll Report</h3>
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
            <h2 className="text-base font-semibold text-gray-700">Payroll Reports</h2>
            <p className="text-xxs text-gray-500">Costs, variances, tax summaries.</p>
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
              <p className="text-xxs font-semibold text-gray-700">Tax Summary Breakdown</p>
              <p className="text-xxs text-gray-500">Tax components split for selected scope.</p>
            </div>
            <p className="text-xxs text-gray-400 mt-2 md:mt-0">Last updated: {format(lastUpdated, "dd MMM yyyy hh:mm a")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
            {taxSummaryByType.map((item) => (
              <div key={item.type} className="border border-gray-200 rounded p-2">
                <p className="text-xxs text-gray-700 font-semibold">{item.type}</p>
                <p className="text-[11px] text-gray-500">{currency(item.amount)}</p>
                <div className="w-full h-2 bg-gray-100 rounded mt-2 overflow-hidden">
                  <div className={`h-2 ${getTaxBar(item.pct)}`} style={{ width: `${item.pct}%` }} />
                </div>
                <p className="text-[11px] text-gray-500 mt-1">{item.pct}%</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5">
          <div>
            <p className="text-xxs font-semibold text-gray-700">Filters</p>
            <p className="text-xxs text-gray-500">Date/Dept/Location filters for all payroll report areas.</p>
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
            <p className="text-xxs text-gray-500">Configurable columns for payroll report table.</p>
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
                    No payroll records found for selected filters.
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
