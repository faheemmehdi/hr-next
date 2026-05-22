"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Layout from "y@/app/components/Layout";
import Button from "y@/app/components/Button";
import SearchBar from "y@/app/components/SearchBar";
import CustomSelect from "y@/app/components/CustomSelect";
import {
    FiArrowUpRight,
    FiClock,
    FiFileText,
    FiLayers,
    FiTrendingUp,
    FiUserCheck,
    FiUserMinus,
} from "react-icons/fi";

const employeeSeed = [
    { id: "EMP1001", name: "Ahsan Qureshi", department: "IT", team: "Backend Team", location: "Lahore", status: "Active", type: "Full-Time", month: "Jan" },
    { id: "EMP1002", name: "Sana Malik", department: "Finance", team: "Accounts Team", location: "Karachi", status: "Active", type: "Full-Time", month: "Feb" },
    { id: "EMP1003", name: "Hamza Rafi", department: "Support", team: "Support Team", location: "Islamabad", status: "Draft", type: "Full-Time", month: "Mar" },
    { id: "EMP1004", name: "Maryam Aslam", department: "HR", team: "HR Team", location: "Lahore", status: "Active", type: "Full-Time", month: "Jan" },
    { id: "EMP1005", name: "Usman Tariq", department: "Sales", team: "Regional Sales", location: "Karachi", status: "Resigned", type: "Full-Time", month: "Apr" },
    { id: "EMP1006", name: "Bilal Hussain", department: "Operations", team: "Operations Team", location: "Islamabad", status: "Terminated", type: "Contract", month: "May" },
    { id: "EMP1007", name: "Ayesha Noor", department: "Marketing", team: "Creative Team", location: "Lahore", status: "Active", type: "Full-Time", month: "Jun" },
    { id: "EMP1008", name: "Hina Javed", department: "IT", team: "Frontend Team", location: "Lahore", status: "Active", type: "Full-Time", month: "Apr" },
    { id: "EMP1009", name: "Zain Qureshi", department: "IT", team: "Backend Team", location: "Remote", status: "Active", type: "Contract", month: "Feb" },
    { id: "EMP1010", name: "Fatima Noor", department: "HR", team: "HR Team", location: "Lahore", status: "Draft", type: "Intern", month: "Mar" },
    { id: "EMP1011", name: "Ali Imran", department: "Operations", team: "Field Ops", location: "Karachi", status: "Active", type: "Full-Time", month: "May" },
    { id: "EMP1012", name: "Sara Ali", department: "Finance", team: "Accounts Team", location: "Lahore", status: "Active", type: "Full-Time", month: "Jun" },
];

const teamSeed = [
    { id: "TEAM-1", name: "Backend Team", members: 18, capacity: 24, active: true },
    { id: "TEAM-2", name: "Frontend Team", members: 14, capacity: 18, active: true },
    { id: "TEAM-3", name: "HR Team", members: 9, capacity: 12, active: true },
    { id: "TEAM-4", name: "Accounts Team", members: 11, capacity: 14, active: true },
    { id: "TEAM-5", name: "Operations Team", members: 16, capacity: 20, active: false },
];

const monthlyFlow = [
    { month: "Jan", joined: 9, exited: 1 },
    { month: "Feb", joined: 7, exited: 2 },
    { month: "Mar", joined: 8, exited: 1 },
    { month: "Apr", joined: 10, exited: 3 },
    { month: "May", joined: 6, exited: 2 },
    { month: "Jun", joined: 11, exited: 1 },
    { month: "Jul", joined: 8, exited: 2 },
    { month: "Aug", joined: 7, exited: 1 },
    { month: "Sep", joined: 9, exited: 2 },
    { month: "Oct", joined: 10, exited: 3 },
    { month: "Nov", joined: 6, exited: 2 },
    { month: "Dec", joined: 12, exited: 1 },
];

function DonutSplit({ values, colors, sizeClass = "w-36 h-36" }) {
    const total = Math.max(1, values.reduce((sum, value) => sum + value, 0));
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;

    return (
        <svg viewBox="0 0 120 120" className={`${sizeClass} flex-shrink-0`}>
            <g transform="rotate(-90 60 60)">
                <circle cx="60" cy="60" r={radius} fill="none" stroke="#eef2f7" strokeWidth="12" />
                {values.map((value, idx) => {
                    const segment = (value / total) * circumference;
                    const dashOffset = -offset;
                    offset += segment;
                    return (
                        <circle
                            key={`seg-${idx}`}
                            cx="60"
                            cy="60"
                            r={radius}
                            fill="none"
                            stroke={colors[idx % colors.length]}
                            strokeWidth="12"
                            strokeDasharray={`${segment} ${circumference - segment}`}
                            strokeDashoffset={dashOffset}
                            strokeLinecap="butt"
                        />
                    );
                })}
            </g>
            <text x="60" y="56" textAnchor="middle" className="fill-gray-800 text-[12px] font-semibold">
                {total}
            </text>
            <text x="60" y="70" textAnchor="middle" className="fill-gray-500 text-[9px]">
                employees
            </text>
        </svg>
    );
}

function DualBars({ rows }) {
    const max = Math.max(...rows.flatMap((row) => [row.joined, row.exited]), 1);
    const ticks = [max, Math.round(max * 0.66), Math.round(max * 0.33), 0];
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-3">
            <div className="h-52 flex gap-3">
                <div className="w-8 h-full relative">
                    {ticks.map((tick, idx) => (
                        <span
                            key={`tick-${idx}`}
                            className="absolute -translate-y-1/2 text-[10px] text-gray-400"
                            style={{ top: `${(idx / (ticks.length - 1)) * 100}%` }}
                        >
                            {tick}
                        </span>
                    ))}
                </div>
                <div className="flex-1 h-full overflow-x-auto">
                    <div className="relative h-full min-w-[44rem]">
                        <div className="absolute inset-0 flex flex-col justify-between">
                            {ticks.map((_, idx) => (
                                <div key={`line-${idx}`} className="border-t border-gray-100" />
                            ))}
                        </div>
                        <div className="h-full flex items-end justify-between gap-2 relative z-10 pb-1">
                            {rows.map((row) => (
                                <div key={row.month} className="flex-1 min-w-0">
                                    <div className="h-44 flex items-end justify-center gap-2">
                                        <div className="flex flex-col items-center justify-end h-full">
                                            <span className="text-[10px] text-gray-600 font-medium mb-1">{row.joined}</span>
                                            <div
                                                className="w-4 rounded-t-md bg-[#5b8fce]"
                                                style={{ height: `${(row.joined / max) * 100}%` }}
                                                title={`Joined: ${row.joined}`}
                                            />
                                        </div>
                                        <div className="flex flex-col items-center justify-end h-full">
                                            <span className="text-[10px] text-gray-600 font-medium mb-1">{row.exited}</span>
                                            <div
                                                className="w-4 rounded-t-md bg-[#d49a58]"
                                                style={{ height: `${(row.exited / max) * 100}%` }}
                                                title={`Exited: ${row.exited}`}
                                            />
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-gray-500 text-center mt-1">{row.month}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function EmployeesClient() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [locationFilter, setLocationFilter] = useState("");

    const statusOptions = [
        { value: "Active", label: "Active" },
        { value: "Draft", label: "Draft" },
        { value: "Resigned", label: "Resigned" },
        { value: "Terminated", label: "Terminated" },
    ];

    const locationOptions = [
        { value: "Lahore", label: "Lahore" },
        { value: "Karachi", label: "Karachi" },
        { value: "Islamabad", label: "Islamabad" },
        { value: "Remote", label: "Remote" },
    ];

    const filteredEmployees = useMemo(() => {
        const q = search.trim().toLowerCase();
        return employeeSeed.filter((emp) => {
            const matchSearch =
                !q ||
                emp.name.toLowerCase().includes(q) ||
                emp.id.toLowerCase().includes(q) ||
                emp.department.toLowerCase().includes(q) ||
                emp.team.toLowerCase().includes(q);
            const matchStatus = !statusFilter || emp.status === statusFilter;
            const matchLocation = !locationFilter || emp.location === locationFilter;
            return matchSearch && matchStatus && matchLocation;
        });
    }, [search, statusFilter, locationFilter]);

    const stats = useMemo(() => {
        const total = filteredEmployees.length;
        const active = filteredEmployees.filter((e) => e.status === "Active").length;
        const drafts = filteredEmployees.filter((e) => e.status === "Draft").length;
        const resigned = filteredEmployees.filter((e) => e.status === "Resigned").length;
        const terminated = filteredEmployees.filter((e) => e.status === "Terminated").length;
        const teams = teamSeed.length;
        return { total, active, drafts, resigned, terminated, teams };
    }, [filteredEmployees]);

    const departmentRows = useMemo(() => {
        const map = {};
        filteredEmployees.forEach((emp) => {
            map[emp.department] = (map[emp.department] || 0) + 1;
        });
        return Object.entries(map)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 6);
    }, [filteredEmployees]);

    const teamLoadRows = useMemo(() => {
        return teamSeed.map((team) => ({
            ...team,
            load: Math.round((team.members / Math.max(1, team.capacity)) * 100),
        }));
    }, []);

    const employmentMix = useMemo(() => {
        const fullTime = filteredEmployees.filter((e) => e.type === "Full-Time").length;
        const contract = filteredEmployees.filter((e) => e.type === "Contract").length;
        const intern = filteredEmployees.filter((e) => e.type === "Intern").length;
        return [
            { label: "Full-Time", value: fullTime, color: "#4c8fff" },
            { label: "Contract", value: contract, color: "#2f7d4f" },
            { label: "Intern", value: intern, color: "#d89a3f" },
        ];
    }, [filteredEmployees]);

    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
                    <div>
                        <h2 className="text-base font-semibold text-gray-700">Employees Dashboard</h2>
                        <p className="text-xxs text-gray-500 mt-0.5">
                            Complete workforce visibility across employees list, teams, drafts, and separation lifecycle.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <Link href="/employees/list">
                            <Button variant="primary" type="button">Employees List</Button>
                        </Link>
                        <Link href="/employees/teams">
                            <Button variant="secondary" type="button">Teams</Button>
                        </Link>
                        <Link href="/employees/new">
                            <Button variant="success" type="button">Add Employee</Button>
                        </Link>
                    </div>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5 gap-2">
                    <div className="w-full md:w-1/4">
                        <SearchBar placeholder="Search name, id, department, team..." onSearch={setSearch} />
                    </div>
                    <div className="w-full md:w-auto flex items-center justify-end flex-col md:flex-row gap-2">
                        <div className="w-full md:w-[10rem]">
                            <CustomSelect
                                name="status_filter"
                                value={statusFilter}
                                placeholder="Status"
                                options={statusOptions}
                                onChange={setStatusFilter}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="w-full md:w-[10rem]">
                            <CustomSelect
                                name="location_filter"
                                value={locationFilter}
                                placeholder="Location"
                                options={locationOptions}
                                onChange={setLocationFilter}
                                controlHeight="2rem"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 mt-4">
                    <div className="rounded-lg border border-gray-200 bg-[#f3fbf6] p-3">
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] text-gray-500">Active</p>
                            <FiUserCheck className="text-[#2f7d4f]" size={13} />
                        </div>
                        <p className="text-sm font-semibold text-gray-800 mt-1">{stats.active}</p>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-[#fff9ef] p-3">
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] text-gray-500">Draft Profiles</p>
                            <FiFileText className="text-[#9a5d1d]" size={13} />
                        </div>
                        <p className="text-sm font-semibold text-gray-800 mt-1">{stats.drafts}</p>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-[#fff3f3] p-3">
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] text-gray-500">Resigned</p>
                            <FiUserMinus className="text-[#a03a3a]" size={13} />
                        </div>
                        <p className="text-sm font-semibold text-gray-800 mt-1">{stats.resigned}</p>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-[#f9f5ff] p-3">
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] text-gray-500">Terminated</p>
                            <FiClock className="text-[#6d56b5]" size={13} />
                        </div>
                        <p className="text-sm font-semibold text-gray-800 mt-1">{stats.terminated}</p>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-[#f3f8ff] p-3">
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] text-gray-500">Teams</p>
                            <FiLayers className="text-[#3468a9]" size={13} />
                        </div>
                        <p className="text-sm font-semibold text-gray-800 mt-1">{stats.teams}</p>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-4">
                    <div className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-gray-700">Employee Movement (Join vs Exit)</h3>
                            <span className="inline-flex items-center gap-1 text-[10px] text-gray-500">
                                <FiTrendingUp size={12} />
                                Full Year
                            </span>
                        </div>
                        <DualBars rows={monthlyFlow} />
                        <div className="mt-2 flex items-center gap-4 text-[10px] text-gray-600">
                            <span className="inline-flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-[#4c8fff]" />
                                Joined
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-[#d67c3e]" />
                                Exited (Resigned + Terminated)
                            </span>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm h-full">
                        <h3 className="text-sm font-semibold text-gray-700">Employment Mix</h3>
                        <p className="text-xxs text-gray-500 mt-0.5">Current workforce composition by contract type.</p>
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-[1fr_1.15fr] gap-4 items-stretch min-h-[14.5rem]">
                            <div className="rounded-lg border border-gray-100 bg-[#fbfcff] flex items-center justify-center p-3">
                                <DonutSplit
                                    values={employmentMix.map((item) => item.value)}
                                    colors={employmentMix.map((item) => item.color)}
                                    sizeClass="w-44 h-44"
                                />
                            </div>
                            <div className="rounded-lg border border-gray-100 p-3 flex flex-col justify-center">
                                <div className="space-y-3 w-full">
                                    {employmentMix.map((item) => {
                                        const total = Math.max(
                                            1,
                                            employmentMix.reduce((sum, current) => sum + current.value, 0)
                                        );
                                        const percent = Math.round((item.value / total) * 100);
                                        return (
                                            <div key={item.label}>
                                                <div className="flex items-center justify-between text-[11px] mb-1">
                                                    <span className="inline-flex items-center gap-1.5 text-gray-600">
                                                        <span className="h-2 w-2 rounded-full" style={{ background: item.color }} />
                                                        {item.label}
                                                    </span>
                                                    <span className="font-semibold text-gray-800">{item.value}</span>
                                                </div>
                                                <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full"
                                                        style={{ width: `${percent}%`, background: item.color }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-1 xl:grid-cols-3 gap-4">
                    <div className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm xl:col-span-1">
                        <h3 className="text-sm font-semibold text-gray-700">Top Departments</h3>
                        <p className="text-xxs text-gray-500 mt-0.5">Headcount distribution by department.</p>
                        <div className="mt-3 space-y-2.5">
                            {departmentRows.length > 0 ? (
                                departmentRows.map((row) => {
                                    const max = Math.max(...departmentRows.map((dep) => dep.count), 1);
                                    const width = Math.round((row.count / max) * 100);
                                    return (
                                        <div key={row.name}>
                                            <div className="flex items-center justify-between text-xxs">
                                                <span className="text-gray-700">{row.name}</span>
                                                <span className="text-gray-600 font-medium">{row.count}</span>
                                            </div>
                                            <div className="h-2 rounded-full bg-gray-100 mt-1 overflow-hidden">
                                                <div className="h-full rounded-full bg-[#4c8fff]" style={{ width: `${width}%` }} />
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-xxs text-gray-500 italic">No department data for current filters.</p>
                            )}
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm xl:col-span-1">
                        <h3 className="text-sm font-semibold text-gray-700">Team Capacity Snapshot</h3>
                        <p className="text-xxs text-gray-500 mt-0.5">Current load and available seats per team.</p>
                        <div className="mt-3 space-y-2.5">
                            {teamLoadRows.map((team) => (
                                <div key={team.id}>
                                    <div className="flex items-center justify-between text-xxs">
                                        <span className="text-gray-700">{team.name}</span>
                                        <span className="text-gray-600 font-medium">
                                            {team.members}/{team.capacity}
                                        </span>
                                    </div>
                                    <div className="h-2 rounded-full bg-gray-100 mt-1 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${team.active ? "bg-[#2f7d4f]" : "bg-[#d89a3f]"}`}
                                            style={{ width: `${team.load}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm xl:col-span-1">
                        <h3 className="text-sm font-semibold text-gray-700">Recent Module Highlights</h3>
                        <p className="text-xxs text-gray-500 mt-0.5">Latest employee lifecycle actions.</p>
                        <div className="mt-3 space-y-2.5">
                            {[
                                { title: "2 draft profiles pending completion", tone: "text-[#9a5d1d] bg-[#fff8ed]" },
                                { title: "1 resignation completed this week", tone: "text-[#a03a3a] bg-[#fff3f3]" },
                                { title: "2 teams above 80% capacity", tone: "text-[#315d9c] bg-[#f1f7ff]" },
                                { title: "5 new hires in current month", tone: "text-[#2f7d4f] bg-[#effaf3]" },
                            ].map((item) => (
                                <div key={item.title} className={`rounded-lg px-3 py-2 text-xxs ${item.tone}`}>
                                    <span className="inline-flex items-center gap-1.5">
                                        <FiArrowUpRight size={12} />
                                        {item.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default EmployeesClient;
