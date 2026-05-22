"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Layout from "y@/app/components/Layout";
import SearchBar from "y@/app/components/SearchBar";
import Button from "y@/app/components/Button";
import {
    FiArrowUpRight,
    FiBarChart2,
    FiCheckSquare,
    FiClock,
    FiClipboard,
    FiFileText,
    FiLayers,
    FiTarget,
} from "react-icons/fi";

const routes = {
    projects: "/time/projects",
    tasks: "/time/tasks",
    timesheets: "/time/timesheets",
    approvals: "/time/approvals",
    reports: "/time/reports",
};

const topMetrics = [
    { key: "active_projects", title: "Active Projects", value: 8, icon: FiLayers, tone: "bg-[#f1f7ff] text-[#315d9c]" },
    { key: "open_tasks", title: "Open Tasks", value: 23, icon: FiClipboard, tone: "bg-[#fff8ed] text-[#9a5d1d]" },
    { key: "submitted_timesheets", title: "Submitted Timesheets", value: 37, icon: FiFileText, tone: "bg-[#effaf3] text-[#2f7d4f]" },
    { key: "pending_approvals", title: "Pending Approvals", value: 12, icon: FiCheckSquare, tone: "bg-[#fff4f4] text-[#a03a3a]" },
    { key: "avg_utilization", title: "Avg Utilization", value: "82%", icon: FiTarget, tone: "bg-[#f5f3ff] text-[#5f54b7]" },
];

const projectStatusRows = [
    { label: "Active", count: 4, color: "#4c8fff" },
    { label: "On Hold", count: 2, color: "#d89a3f" },
    { label: "Completed", count: 2, color: "#2f7d4f" },
];

const taskFlow = [
    { month: "Jan", todo: 32, inProgress: 21, done: 28 },
    { month: "Feb", todo: 29, inProgress: 24, done: 31 },
    { month: "Mar", todo: 26, inProgress: 22, done: 36 },
    { month: "Apr", todo: 25, inProgress: 20, done: 38 },
    { month: "May", todo: 23, inProgress: 18, done: 42 },
    { month: "Jun", todo: 21, inProgress: 16, done: 45 },
    { month: "Jul", todo: 24, inProgress: 17, done: 44 },
    { month: "Aug", todo: 22, inProgress: 15, done: 47 },
    { month: "Sep", todo: 20, inProgress: 14, done: 49 },
    { month: "Oct", todo: 19, inProgress: 13, done: 51 },
    { month: "Nov", todo: 18, inProgress: 12, done: 53 },
    { month: "Dec", todo: 17, inProgress: 11, done: 55 },
];

const timesheetCompliance = [
    { team: "Engineering", submitted: 16, total: 18 },
    { team: "Product", submitted: 9, total: 10 },
    { team: "Operations", submitted: 7, total: 9 },
    { team: "Support", submitted: 5, total: 6 },
];

const approvalQueue = [
    { employee: "Aisha Khan", period: "Feb 14-20, 2026", hours: 40, status: "Pending" },
    { employee: "Bilal Ahmed", period: "Feb 14-20, 2026", hours: 38, status: "Pending" },
    { employee: "Hassan Raza", period: "Feb 7-13, 2026", hours: 36, status: "Pending" },
];

const reportWidgets = [
    { title: "Utilization Report", note: "Team-wise tracked hours and utilization trends" },
    { title: "Overtime Summary", note: "Department overtime load and cost impact" },
    { title: "Idle Time Insights", note: "Underutilized teams and capacity opportunities" },
];

function DonutBreakdown({ rows }) {
    const total = Math.max(1, rows.reduce((sum, item) => sum + item.count, 0));
    const radius = 32;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;
    return (
        <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 110 110" className="w-44 h-44">
                <g transform="rotate(-90 55 55)">
                    <circle cx="55" cy="55" r={radius} fill="none" stroke="#eef2f7" strokeWidth="12" />
                    {rows.map((row) => {
                        const seg = (row.count / total) * circumference;
                        const dashOffset = -offset;
                        offset += seg;
                        return (
                            <circle
                                key={row.label}
                                cx="55"
                                cy="55"
                                r={radius}
                                fill="none"
                                stroke={row.color}
                                strokeWidth="12"
                                strokeDasharray={`${seg} ${circumference - seg}`}
                                strokeDashoffset={dashOffset}
                            />
                        );
                    })}
                </g>
                <text x="55" y="51" textAnchor="middle" className="fill-gray-800 text-[13px] font-semibold">
                    {total}
                </text>
                <text x="55" y="65" textAnchor="middle" className="fill-gray-500 text-[9px]">
                    projects
                </text>
            </svg>
            <div className="mt-2 w-full space-y-1.5">
                {rows.map((row) => (
                    <div key={row.label} className="flex items-center justify-between text-[11px]">
                        <span className="inline-flex items-center gap-1.5 text-gray-600">
                            <span className="h-2 w-2 rounded-full" style={{ background: row.color }} />
                            {row.label}
                        </span>
                        <span className="font-semibold text-gray-800">{row.count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function TripleBars({ rows }) {
    const max = Math.max(...rows.flatMap((r) => [r.todo, r.inProgress, r.done]), 1);
    return (
        <div className="h-52 overflow-x-auto">
            <div className="h-full min-w-[46rem] flex items-end justify-between gap-2">
                {rows.map((row) => (
                    <div key={row.month} className="flex-1 min-w-0">
                        <div className="h-44 flex items-end justify-center gap-1.5">
                            <div className="w-2.5 rounded-t bg-[#6b7280]" style={{ height: `${(row.todo / max) * 100}%` }} />
                            <div className="w-2.5 rounded-t bg-[#d89a3f]" style={{ height: `${(row.inProgress / max) * 100}%` }} />
                            <div className="w-2.5 rounded-t bg-[#2f7d4f]" style={{ height: `${(row.done / max) * 100}%` }} />
                        </div>
                        <p className="text-[10px] text-gray-500 text-center mt-1">{row.month}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function TimeTracking() {
    const [search, setSearch] = useState("");

    const moduleCards = useMemo(() => {
        const cards = [
            { key: "Projects", route: routes.projects },
            { key: "Tasks", route: routes.tasks },
            { key: "Timesheets", route: routes.timesheets },
            { key: "Approvals", route: routes.approvals },
            { key: "Reports", route: routes.reports },
        ];
        const q = search.trim().toLowerCase();
        if (!q) return cards;
        return cards.filter((card) => card.key.toLowerCase().includes(q));
    }, [search]);

    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
                    <div>
                        <h2 className="text-base font-semibold text-gray-700">Time Tracking Dashboard</h2>
                        <p className="text-xxs text-gray-500 mt-0.5">
                            Unified overview for projects, tasks, timesheets, approvals, and reporting insights.
                        </p>
                    </div>
                    <div className="w-full lg:w-[22rem]">
                        <SearchBar placeholder="Search module cards..." onSearch={setSearch} />
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
                    {topMetrics.map((metric) => {
                        const Icon = metric.icon;
                        return (
                            <div key={metric.key} className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <p className="text-[10px] text-gray-500">{metric.title}</p>
                                    <span className={`w-7 h-7 rounded-full flex items-center justify-center ${metric.tone}`}>
                                        <Icon size={13} />
                                    </span>
                                </div>
                                <p className="text-sm font-semibold text-gray-800 mt-1">{metric.value}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-4 grid grid-cols-1 xl:grid-cols-[1fr_3fr] gap-4">
                    {moduleCards.some((m) => m.key === "Projects") && (
                        <Link href={routes.projects} className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm hover:shadow-md transition">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-gray-700">Projects</h3>
                                <FiLayers className="text-[#315d9c]" size={15} />
                            </div>
                            <p className="text-xxs text-gray-500 mt-1">Project pipeline by status and execution load.</p>
                            <div className="mt-3">
                                <DonutBreakdown rows={projectStatusRows} />
                            </div>
                        </Link>
                    )}

                    {moduleCards.some((m) => m.key === "Tasks") && (
                        <Link href={routes.tasks} className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm hover:shadow-md transition">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-gray-700">Tasks</h3>
                                <FiClipboard className="text-[#9a5d1d]" size={15} />
                            </div>
                            <p className="text-xxs text-gray-500 mt-1">Task flow from backlog to completion.</p>
                            <div className="mt-2">
                                <TripleBars rows={taskFlow} />
                            </div>
                            <div className="mt-2 flex items-center gap-3 text-[10px] text-gray-600">
                                <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#6b7280]" />To Do</span>
                                <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#d89a3f]" />In Progress</span>
                                <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#2f7d4f]" />Done</span>
                            </div>
                        </Link>
                    )}
                </div>

                <div className="mt-4 grid grid-cols-1 xl:grid-cols-3 gap-4">
                    {moduleCards.some((m) => m.key === "Timesheets") && (
                        <Link href={routes.timesheets} className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm hover:shadow-md transition xl:col-span-1">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-gray-700">Timesheets</h3>
                                <FiClock className="text-[#2f7d4f]" size={15} />
                            </div>
                            <p className="text-xxs text-gray-500 mt-1">Submission compliance by team.</p>
                            <div className="mt-3 space-y-2.5">
                                {timesheetCompliance.map((row) => {
                                    const pct = Math.round((row.submitted / row.total) * 100);
                                    return (
                                        <div key={row.team}>
                                            <div className="flex items-center justify-between text-xxs">
                                                <span className="text-gray-700">{row.team}</span>
                                                <span className="text-gray-600 font-medium">{row.submitted}/{row.total}</span>
                                            </div>
                                            <div className="h-2 rounded-full bg-gray-100 mt-1 overflow-hidden">
                                                <div className="h-full rounded-full bg-[#5b8fce]" style={{ width: `${pct}%` }} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Link>
                    )}

                    {moduleCards.some((m) => m.key === "Approvals") && (
                        <Link href={routes.approvals} className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm hover:shadow-md transition xl:col-span-1">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-gray-700">Approvals</h3>
                                <FiCheckSquare className="text-[#a03a3a]" size={15} />
                            </div>
                            <p className="text-xxs text-gray-500 mt-1">Pending manager approvals queue.</p>
                            <div className="mt-3 space-y-2.5">
                                {approvalQueue.map((row) => (
                                    <div key={`${row.employee}-${row.period}`} className="rounded-lg border border-gray-200 p-2.5">
                                        <div className="flex items-center justify-between">
                                            <p className="text-xxs font-semibold text-gray-800">{row.employee}</p>
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#fff8ed] text-[#9a5d1d]">{row.status}</span>
                                        </div>
                                        <p className="text-[10px] text-gray-500 mt-1">{row.period}</p>
                                        <p className="text-[10px] text-gray-600 mt-0.5">{row.hours} hrs logged</p>
                                    </div>
                                ))}
                            </div>
                        </Link>
                    )}

                    {moduleCards.some((m) => m.key === "Reports") && (
                        <Link href={routes.reports} className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm hover:shadow-md transition xl:col-span-1">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-gray-700">Reports</h3>
                                <FiBarChart2 className="text-[#5f54b7]" size={15} />
                            </div>
                            <p className="text-xxs text-gray-500 mt-1">Utilization, overtime, and idle insights.</p>
                            <div className="mt-3 space-y-2">
                                {reportWidgets.map((widget) => (
                                    <div key={widget.title} className="rounded-lg bg-[#f8fbff] border border-[#e5edf8] px-3 py-2">
                                        <p className="text-xxs font-semibold text-gray-800">{widget.title}</p>
                                        <p className="text-[10px] text-gray-500 mt-0.5">{widget.note}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-3">
                                <Button type="button" variant="primary">
                                    <span className="inline-flex items-center gap-1">
                                        Open Reports
                                        <FiArrowUpRight size={12} />
                                    </span>
                                </Button>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </Layout>
    );
}
