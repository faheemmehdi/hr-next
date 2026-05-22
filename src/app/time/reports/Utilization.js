"use client";
import { useMemo, useState } from "react";
import Layout from "y@/app/components/Layout";
import Button from "y@/app/components/Button";
import CustomSelect from "y@/app/components/CustomSelect";
import Modal from "y@/app/components/ModalShell";

const timeframeOptions = [
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
];

const utilizationRows = [
  { entity: "Engineering", project: "Platform Revamp", utilization: 88 },
  { entity: "Customer Success", project: "Onboarding Program", utilization: 76 },
  { entity: "Finance", project: "Payroll Run", utilization: 69 },
  { entity: "Product", project: "AI Pilot", utilization: 91 },
  { entity: "Support", project: "Service Recovery", utilization: 74 },
];

const otRows = [
  { entity: "Engineering", note: "Go-live prep", hours: 62 },
  { entity: "Support", note: "Seasonal spike", hours: 41 },
  { entity: "IT Ops", note: "System upgrade", hours: 29 },
];

const idleRows = [
  { entity: "Marketing", note: "Campaign gap", hours: 15 },
  { entity: "Recruiting", note: "Interview motion", hours: 12 },
  { entity: "Legal", note: "Documentation", hours: 9 },
];

const sparkValues = [72, 81, 65, 90, 78, 85, 82];

export default function Utilization() {
  const [timeframe, setTimeframe] = useState("weekly");
  const [refreshing, setRefreshing] = useState(false);
  const [drilldown, setDrilldown] = useState(null);

  const statusCopy = useMemo(
    () => (refreshing ? "Refreshing data..." : `${timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} view`),
    [refreshing, timeframe]
  );

  const avgOt = (otRows.reduce((total, row) => total + row.hours, 0) / otRows.length).toFixed(1);
  const avgIdle = (idleRows.reduce((total, row) => total + row.hours, 0) / idleRows.length).toFixed(1);
  const totalOt = otRows.reduce((total, row) => total + row.hours, 0);
  const totalIdle = idleRows.reduce((total, row) => total + row.hours, 0);
  const topUtilized = utilizationRows.reduce((prev, curr) => (curr.utilization > prev.utilization ? curr : prev), utilizationRows[0]);
  const compactMetrics = [
    { title: "Avg Utilization", value: "82%", note: "Org average" },
    { title: "Top Department", value: topUtilized.entity, note: `${topUtilized.utilization}% utilized` },
    { title: "Tracked Projects", value: String(utilizationRows.length), note: "In this report" },
    { title: "Total Overtime", value: `${totalOt}h`, note: `Avg ${avgOt}h / team` },
    { title: "Total Idle", value: `${totalIdle}h`, note: `Avg ${avgIdle}h / team` },
  ];

  const handleRefresh = () => {
    if (refreshing) return;
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <Layout>
      <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6 space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-700">Utilization &amp; Efficiency</h2>
            <p className="text-xxs text-gray-500">Charts/tables for utilization, OT, and idle with drilldowns and exports.</p>
            <p className="text-xxs text-gray-400 mt-1">{statusCopy}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" type="button" onClick={() => setDrilldown("Export metrics")}>
              Export
            </Button>
            <Button variant="success" type="button" onClick={handleRefresh}>
              {refreshing ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {compactMetrics.map((metric) => (
            <div key={metric.title} className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 shadow-sm">
              <p className="text-[10px] uppercase tracking-wide text-gray-500">{metric.title}</p>
              <p className="text-sm font-semibold text-gray-800 mt-1 truncate">{metric.value}</p>
              <p className="text-[10px] text-gray-500 mt-0.5 truncate">{metric.note}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-3 rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="w-full md:w-[11rem]">
            <CustomSelect
              name="timeframe"
              label="Time frame"
              value={timeframe}
              options={timeframeOptions}
              onChange={setTimeframe}
              controlHeight="2rem"
            />
          </div>
          <p className="text-xxs text-gray-500">Tables: Utilization by Dept/Project, Overtime, Idle.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <p className="text-xs font-semibold text-gray-700">Utilization by Department / Project</p>
              <p className="text-xxs text-gray-500 mt-0.5">Current {timeframe} snapshot</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-3 text-left">Department</th>
                    <th className="px-4 py-3 text-left">Project</th>
                    <th className="px-4 py-3 text-left">Utilization</th>
                  </tr>
                </thead>
                <tbody>
                  {utilizationRows.map((row, idx) => (
                    <tr key={`${row.entity}-${row.project}`} className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50/60"}`}>
                      <td className="px-4 py-3 font-medium text-gray-800">{row.entity}</td>
                      <td className="px-4 py-3 text-gray-600">{row.project}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xxs text-gray-700">{row.utilization}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-gray-100">
                          <div className="h-1.5 rounded-full bg-[var(--color-primary)]" style={{ width: `${row.utilization}%` }} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs font-semibold text-gray-700">Overtime</p>
                  <p className="text-xxs text-gray-500">Last 7 days</p>
                </div>
                <span className="text-xxs font-semibold text-gray-700">Avg {avgOt} hrs</span>
              </div>
              <div className="space-y-3">
                {otRows.map((row) => (
                  <div key={row.entity}>
                    <div className="flex items-center justify-between text-xxs mb-1">
                      <span className="font-medium text-gray-700">{row.entity}</span>
                      <span className="text-gray-800">{row.hours} hrs</span>
                    </div>
                    <p className="text-[10px] text-gray-500 mb-1">{row.note}</p>
                    <div className="h-1.5 rounded-full bg-gray-100">
                      <div className="h-1.5 rounded-full bg-[var(--color-secondary)]" style={{ width: `${row.hours}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs font-semibold text-gray-700">Idle</p>
                  <p className="text-xxs text-gray-500">Underutilized teams</p>
                </div>
                <span className="text-xxs font-semibold text-gray-700">Avg {avgIdle} hrs</span>
              </div>
              <div className="space-y-3">
                {idleRows.map((row) => (
                  <div key={row.entity}>
                    <div className="flex items-center justify-between text-xxs mb-1">
                      <span className="font-medium text-gray-700">{row.entity}</span>
                      <span className="text-gray-800">{row.hours} hrs</span>
                    </div>
                    <p className="text-[10px] text-gray-500 mb-1">{row.note}</p>
                    <div className="h-1.5 rounded-full bg-gray-100">
                      <div className="h-1.5 rounded-full bg-[var(--color-success)]" style={{ width: `${row.hours}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-700">Efficiency Trend</p>
              <p className="text-xxs text-gray-500">Recent utilization movement</p>
            </div>
            <button type="button" className="text-xxs text-[var(--color-primary)] hover:underline" onClick={() => setDrilldown("Trend chart")}>Drilldown</button>
          </div>
          <div className="mt-4 flex items-end gap-2 h-24">
            {sparkValues.map((value, idx) => (
              <div key={`${value}-${idx}`} className="flex-1 min-w-[14px] flex flex-col items-center justify-end gap-1">
                <div
                  className="w-full rounded-sm"
                  style={{ height: `${value}%`, backgroundColor: "var(--color-primary)", opacity: 0.8 }}
                />
              </div>
            ))}
          </div>
        </div>

        {drilldown && (
          <Modal width="w-full md:w-5/12">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Drilldown - {drilldown}</h3>
            <p className="text-xxs text-gray-600">Export ready and schema-validated details for the selected metric.</p>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="cancel" onClick={() => setDrilldown(null)}>
                Close
              </Button>
              <Button variant="success">Export</Button>
            </div>
          </Modal>
        )}
      </div>
    </Layout>
  );
}
