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

const kpiRows = [
    { title: "Utilization", value: "82%", note: "Across the organization" },
    { title: "Overtime", value: "5.8 hrs", note: "Rolling 7-day average" },
    { title: "Idle", value: "7.4 hrs", note: "Tracked across departments" },
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

const gradientBar = (value) => (
    <div className="h-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${value}%` }} />
);

export default function Utilization() {
    const [timeframe, setTimeframe] = useState("weekly");
    const [refreshing, setRefreshing] = useState(false);
    const [drilldown, setDrilldown] = useState(null);

    const statusCopy = useMemo(
        () => (refreshing ? "Refreshing data…" : `${timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} view`),
        [refreshing, timeframe]
    );

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    };

    return (
        <Layout>
            <div className="bg-white shadow-xl rounded-2xl border border-gray-200 min-h-[90vh] p-6 space-y-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-base font-semibold text-gray-700">Utilization & Efficiency</h2>
                        <p className="text-xxs text-gray-500">Charts/tables for utilization, OT, and idle with drilldowns and exports.</p>
                        <p className="text-xxs text-gray-400 mt-1">{statusCopy}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <Button variant="primary" type="button" onClick={() => setDrilldown("Export metrics")}>
                            Export
                        </Button>
                        <Button variant="success" type="button" onClick={handleRefresh} disabled={refreshing}>
                            {refreshing ? "Refreshing…" : "Refresh"}
                        </Button>
                      
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {kpiRows.map((row) => (
                        <div key={row.title} className="rounded-2xl border border-gray-200 bg-gradient-to-br from-slate-50 to-white p-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <p className="text-[0.6rem] uppercase tracking-[0.35em] text-gray-400">{row.title}</p>
                                <span className="text-[0.6rem] font-semibold text-gray-500">{row.note}</span>
                            </div>
                            <p className="text-3xl font-bold text-gray-900 mt-3">{row.value}</p>
                            <button className="mt-2 text-xxs text-[var(--color-primary)] font-semibold underline underline-offset-2" onClick={() => setDrilldown(row.title)}>
                                Drilldown
                            </button>
                        </div>
                    ))}
                </div>

                <div className="space-y-6">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <CustomSelect
                            name="timeframe"
                            label="Time frame"
                            value={timeframe}
                            options={timeframeOptions}
                            onChange={setTimeframe}
                            controlHeight="2.3rem"
                        />
                        <p className="text-xxs text-gray-500">Tables: Utilization by Dept/Project; OT; Idle.</p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[0.6rem] uppercase tracking-[0.35em] text-gray-500">Utilization by Dept / Project</p>
                                    <p className="text-xxs text-gray-400">Drilldown ready · current {timeframe} view</p>
                                </div>
                                <span className="border border-dashed border-gray-300 px-3 py-1 rounded-full text-[0.65rem] text-gray-500">Snapshot</span>
                            </div>
                            <div className="overflow-hidden rounded-2xl border border-gray-100">
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
                                            <tr key={row.entity} className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                                                <td className="px-4 py-3 font-semibold text-gray-800">{row.entity}</td>
                                                <td className="px-4 py-3 text-gray-600">{row.project}</td>
                                                <td className="px-4 py-3 text-right">
                                                    <div className="text-xxs font-semibold text-gray-900">{row.utilization}%</div>
                                                    <div className="mt-1 h-1 rounded-full bg-slate-100">
                                                        <div className="h-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${row.utilization}%` }} />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[0.6rem] uppercase tracking-[0.3em] text-gray-500">Overtime</p>
                                        <p className="text-xxs text-gray-400">Last 7 days</p>
                                    </div>
                                    <span className="text-xxs font-semibold text-gray-900">avg. {otRows.reduce((total, row) => total + row.hours, 0) / otRows.length} hrs</span>
                                </div>
                                <div className="space-y-3">
                                    {otRows.map((row) => (
                                        <div key={row.entity} className="flex items-center justify-between gap-3">
                                            <div className="flex-1">
                                                <p className="text-xxs font-semibold text-gray-800">{row.entity}</p>
                                                <p className="text-[0.65rem] text-gray-500">{row.note}</p>
                                            </div>
                                            <div className="flex flex-col items-end gap-1">
                                                <span className="text-sm font-bold text-gray-900">{row.hours} hrs</span>
                                                <div className="w-24 h-1 rounded-full bg-slate-100">
                                                    <div className="h-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" style={{ width: `${row.hours}%` }} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[0.6rem] uppercase tracking-[0.3em] text-gray-500">Idle</p>
                                        <p className="text-xxs text-gray-400">Teams with underutilized hours</p>
                                    </div>
                                    <span className="text-xxs font-semibold text-gray-900">avg. {idleRows.reduce((total, row) => total + row.hours, 0) / idleRows.length} hrs</span>
                                </div>
                                <div className="space-y-3">
                                    {idleRows.map((row) => (
                                        <div key={row.entity} className="flex items-center justify-between gap-3">
                                            <div className="flex-1">
                                                <p className="text-xxs font-semibold text-gray-800">{row.entity}</p>
                                                <p className="text-[0.65rem] text-gray-500">{row.reason}</p>
                                            </div>
                                            <div className="flex flex-col items-end gap-1">
                                                <span className="text-sm font-bold text-gray-900">{row.hours} hrs</span>
                                                <div className="w-24 h-1 rounded-full bg-slate-100">
                                                    <div className="h-1 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600" style={{ width: `${row.hours}%` }} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-5 text-white shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[0.65rem] uppercase tracking-[0.4em] text-white/70">Trend</p>
                                <h3 className="text-2xl font-semibold mt-2">Efficiency trend</h3>
                            </div>
                            <button className="text-xxs text-white/70 underline" onClick={() => setDrilldown("Trend chart")}>
                                Drilldown
                            </button>
                        </div>
                        <div className="mt-5 flex items-end gap-3">
                            {sparkValues.map((value, idx) => (
                                <div
                                    key={idx}
                                    className="rounded-full bg-white/80"
                                    style={{ width: "10px", height: `${value}%` }}
                                />
                            ))}
                        </div>
                        <div className="mt-6 grid grid-cols-3 gap-3 text-xxs">
                            <div className="rounded-xl bg-white/10 px-3 py-2">
                                <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/60">Util</p>
                                <p className="text-lg font-semibold">82%</p>
                            </div>
                            <div className="rounded-xl bg-white/10 px-3 py-2">
                                <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/60">OT</p>
                                <p className="text-lg font-semibold">5.8 hrs</p>
                            </div>
                            <div className="rounded-xl bg-white/10 px-3 py-2">
                                <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/60">Idle</p>
                                <p className="text-lg font-semibold">7.4 hrs</p>
                            </div>
                        </div>
                    </div>
                </div>

                {drilldown && (
                    <Modal width="w-full md:w-5/12">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Drilldown · {drilldown}</h3>
                        <p className="text-xxs text-gray-600">
                            Export ready and schema-validated details for the selected metric.
                        </p>
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
