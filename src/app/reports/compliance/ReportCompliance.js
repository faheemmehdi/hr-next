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

const complianceRows = [
  {
    id: 1,
    employee: "Hassan Raza",
    role: "Frontend Engineer",
    imageUrl: "/api/portraits/men/32.jpg",
    department: "Engineering",
    location: "Karachi HQ",
    country: "Pakistan",
    date: new Date(2026, 3, 1),
    pfOutput: 520,
    esiOutput: 140,
    taxFilingOutput: 410,
    filingStatus: "Filed",
    dueDate: new Date(2026, 3, 10),
  },
  {
    id: 2,
    employee: "Sana Yousaf",
    role: "Product Analyst",
    imageUrl: "/api/portraits/women/45.jpg",
    department: "Product",
    location: "Lahore Office",
    country: "Pakistan",
    date: new Date(2026, 3, 1),
    pfOutput: 485,
    esiOutput: 130,
    taxFilingOutput: 365,
    filingStatus: "Pending",
    dueDate: new Date(2026, 3, 10),
  },
  {
    id: 3,
    employee: "Bilal Ahmed",
    role: "HR Executive",
    imageUrl: "/api/portraits/men/21.jpg",
    department: "People",
    location: "Karachi HQ",
    country: "Pakistan",
    date: new Date(2026, 3, 1),
    pfOutput: 440,
    esiOutput: 122,
    taxFilingOutput: 330,
    filingStatus: "Filed",
    dueDate: new Date(2026, 3, 9),
  },
  {
    id: 4,
    employee: "Areeba Khan",
    role: "Sales Lead",
    imageUrl: "/api/portraits/women/67.jpg",
    department: "Sales",
    location: "Islamabad Office",
    country: "United Arab Emirates",
    date: new Date(2026, 3, 1),
    pfOutput: 390,
    esiOutput: 95,
    taxFilingOutput: 275,
    filingStatus: "Overdue",
    dueDate: new Date(2026, 3, 5),
  },
  {
    id: 5,
    employee: "Tariq Mehmood",
    role: "Operations Specialist",
    imageUrl: "/api/portraits/men/47.jpg",
    department: "Operations",
    location: "Dubai Office",
    country: "United Arab Emirates",
    date: new Date(2026, 3, 1),
    pfOutput: 405,
    esiOutput: 112,
    taxFilingOutput: 292,
    filingStatus: "Pending",
    dueDate: new Date(2026, 3, 12),
  },
  {
    id: 6,
    employee: "Maham Ali",
    role: "Finance Analyst",
    imageUrl: "/api/portraits/women/34.jpg",
    department: "Finance",
    location: "Remote",
    country: "United Kingdom",
    date: new Date(2026, 3, 1),
    pfOutput: 465,
    esiOutput: 128,
    taxFilingOutput: 350,
    filingStatus: "Filed",
    dueDate: new Date(2026, 3, 8),
  },
  {
    id: 7,
    employee: "Nabeel Shah",
    role: "Backend Engineer",
    imageUrl: "/api/portraits/men/58.jpg",
    department: "Engineering",
    location: "Lahore Office",
    country: "Pakistan",
    date: new Date(2026, 2, 1),
    pfOutput: 510,
    esiOutput: 138,
    taxFilingOutput: 405,
    filingStatus: "Filed",
    dueDate: new Date(2026, 2, 10),
  },
  {
    id: 8,
    employee: "Hira Ahmed",
    role: "People Partner",
    imageUrl: "/api/portraits/women/28.jpg",
    department: "People",
    location: "Karachi HQ",
    country: "Pakistan",
    date: new Date(2026, 2, 1),
    pfOutput: 430,
    esiOutput: 118,
    taxFilingOutput: 320,
    filingStatus: "Pending",
    dueDate: new Date(2026, 2, 10),
  },
  {
    id: 9,
    employee: "Usman Farooq",
    role: "Account Executive",
    imageUrl: "/api/portraits/men/64.jpg",
    department: "Sales",
    location: "Dubai Office",
    country: "United Arab Emirates",
    date: new Date(2026, 2, 1),
    pfOutput: 398,
    esiOutput: 100,
    taxFilingOutput: 284,
    filingStatus: "Overdue",
    dueDate: new Date(2026, 2, 6),
  },
  {
    id: 10,
    employee: "Rida Aslam",
    role: "UI Designer",
    imageUrl: "/api/portraits/women/39.jpg",
    department: "Product",
    location: "Remote",
    country: "United Kingdom",
    date: new Date(2026, 2, 1),
    pfOutput: 452,
    esiOutput: 121,
    taxFilingOutput: 338,
    filingStatus: "Filed",
    dueDate: new Date(2026, 2, 8),
  },
];

const columnOptions = [
  { value: "employee", label: "Employee" },
  { value: "department", label: "Department" },
  { value: "location", label: "Location" },
  { value: "country", label: "Country" },
  { value: "date", label: "Period" },
  { value: "pfOutput", label: "PF Output" },
  { value: "esiOutput", label: "ESI Output" },
  { value: "taxFilingOutput", label: "Tax Filing Output" },
  { value: "dueDate", label: "Due Date" },
  { value: "filingStatus", label: "Filing Status" },
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
  country: {
    label: "Country",
    render: (row) => <span className="text-xxs text-gray-700">{row.country}</span>,
    exportValue: (row) => row.country,
  },
  date: {
    label: "Period",
    render: (row) => <span className="text-xxs text-gray-700">{format(row.date, "MMM yyyy")}</span>,
    exportValue: (row) => format(row.date, "yyyy-MM"),
  },
  pfOutput: {
    label: "PF Output",
    render: (row) => <span className="text-xxs text-gray-700">{currency(row.pfOutput)}</span>,
    exportValue: (row) => row.pfOutput,
  },
  esiOutput: {
    label: "ESI Output",
    render: (row) => <span className="text-xxs text-gray-700">{currency(row.esiOutput)}</span>,
    exportValue: (row) => row.esiOutput,
  },
  taxFilingOutput: {
    label: "Tax Filing Output",
    render: (row) => <span className="text-xxs text-gray-700">{currency(row.taxFilingOutput)}</span>,
    exportValue: (row) => row.taxFilingOutput,
  },
  dueDate: {
    label: "Due Date",
    render: (row) => <span className="text-xxs text-gray-700">{format(row.dueDate, "dd MMM yyyy")}</span>,
    exportValue: (row) => format(row.dueDate, "yyyy-MM-dd"),
  },
  filingStatus: {
    label: "Filing Status",
    render: (row) => {
      const statusId = row.filingStatus === "Filed" ? 1 : row.filingStatus === "Pending" ? 3 : 2;
      return <StatusDesign statusId={statusId} label={row.filingStatus} />;
    },
    exportValue: (row) => row.filingStatus,
  },
};

const complianceByCountry = [
  { country: "Pakistan", pf: 2815, esi: 748, tax: 2065, filingRate: 86 },
  { country: "United Arab Emirates", pf: 1193, esi: 307, tax: 851, filingRate: 63 },
  { country: "United Kingdom", pf: 917, esi: 249, tax: 688, filingRate: 81 },
];

const getCountryBar = (pct) => {
  if (pct >= 80) return "bg-green-500";
  if (pct >= 65) return "bg-yellow-500";
  return "bg-red-500";
};

export default function ReportCompliance() {
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
    "country",
    "date",
    "pfOutput",
    "esiOutput",
    "taxFilingOutput",
    "filingStatus",
  ]);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [drilldown, setDrilldown] = useState(null);

  const filteredRows = useMemo(() => {
    const { startDate, endDate } = range[0];
    return complianceRows.filter((row) => {
      const deptMatch = department === "All" || row.department === department;
      const locationMatch = location === "All" || row.location === location;
      const dateMatch = !startDate || !endDate || (row.date >= startDate && row.date <= endDate);
      return deptMatch && locationMatch && dateMatch;
    });
  }, [range, department, location]);

  const metrics = useMemo(() => {
    const total = filteredRows.length;
    const pfTotal = filteredRows.reduce((sum, row) => sum + row.pfOutput, 0);
    const esiTotal = filteredRows.reduce((sum, row) => sum + row.esiOutput, 0);
    const taxTotal = filteredRows.reduce((sum, row) => sum + row.taxFilingOutput, 0);
    const filed = filteredRows.filter((row) => row.filingStatus === "Filed").length;
    const filingRate = total ? (filed / total) * 100 : 0;

    return [
      {
        key: "pf-outputs",
        title: "PF Outputs",
        value: currency(pfTotal),
        desc: "Provident fund output in selected scope",
        lines: [
          `${filteredRows.filter((row) => row.country === "Pakistan").length} Pakistan records`,
          `${filteredRows.filter((row) => row.pfOutput >= 450).length} high PF output records`,
          `${currency(total ? pfTotal / total : 0)} average PF output per record`,
        ],
      },
      {
        key: "esi-outputs",
        title: "ESI Outputs",
        value: currency(esiTotal),
        desc: "Employee state insurance output",
        lines: [
          `${filteredRows.filter((row) => row.esiOutput >= 120).length} high ESI records`,
          `${currency(total ? esiTotal / total : 0)} average ESI output per record`,
          `${filteredRows.filter((row) => row.filingStatus === "Pending").length} pending filings impacting ESI`,
        ],
      },
      {
        key: "tax-filing",
        title: "Tax Filing Outputs",
        value: `${filingRate.toFixed(1)}% filed`,
        desc: `${currency(taxTotal)} total tax filing output`,
        lines: [
          `${filed} filed records`,
          `${filteredRows.filter((row) => row.filingStatus === "Pending").length} pending filings`,
          `${filteredRows.filter((row) => row.filingStatus === "Overdue").length} overdue filings`,
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
    triggerDownload(csv, "compliance-report.csv", "text/csv;charset=utf-8");
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
        <head><title>Compliance Report</title></head>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <h3 style="margin:0 0 8px 0;">Compliance Report</h3>
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
            <h2 className="text-base font-semibold text-gray-700">Compliance Reports</h2>
            <p className="text-xxs text-gray-500">PF/ESI/tax filing outputs per country.</p>
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
              <p className="text-xxs font-semibold text-gray-700">Country Filing Outputs</p>
              <p className="text-xxs text-gray-500">PF/ESI/tax output summary by country.</p>
            </div>
            <p className="text-xxs text-gray-400 mt-2 md:mt-0">Last updated: {format(lastUpdated, "dd MMM yyyy hh:mm a")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
            {complianceByCountry.map((item) => (
              <div key={item.country} className="border border-gray-200 rounded p-2">
                <p className="text-xxs text-gray-700 font-semibold">{item.country}</p>
                <p className="text-[11px] text-gray-500">PF {currency(item.pf)} | ESI {currency(item.esi)} | Tax {currency(item.tax)}</p>
                <div className="w-full h-2 bg-gray-100 rounded mt-2 overflow-hidden">
                  <div className={`h-2 ${getCountryBar(item.filingRate)}`} style={{ width: `${item.filingRate}%` }} />
                </div>
                <p className="text-[11px] text-gray-500 mt-1">{item.filingRate}% filing completion</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5">
          <div>
            <p className="text-xxs font-semibold text-gray-700">Filters</p>
            <p className="text-xxs text-gray-500">Date/Dept/Location filters for all compliance report areas.</p>
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
            <p className="text-xxs text-gray-500">Configurable columns for compliance report table.</p>
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
                    No compliance records found for selected filters.
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
