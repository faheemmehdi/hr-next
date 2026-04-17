"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Layout from "y@/app/components/Layout";
import SearchBar from "y@/app/components/SearchBar";
import StatusDesign from "y@/app/components/StatusColors";
import {
  FiActivity,
  FiBell,
  FiCheckCircle,
  FiDatabase,
  FiLayers,
  FiMapPin,
  FiPieChart,
  FiShield,
  FiTag,
  FiUsers,
} from "react-icons/fi";

const routes = {
  profile: "/admin/organization",
  locations: "/admin/locations",
  departments: "/admin/departments",
  users: "/admin/users",
  tags: "/admin/tags",
  audit: "/admin/audit-logs",
  notifications: "/admin/notifications",
  security: "/admin/security",
  customFields: "/admin/custom-fields",
  data: "/admin/data",
};

const profileStats = {
  completion: 86,
  verifiedDocs: 7,
  pendingDocs: 1,
  lastUpdate: "15 Apr 2026",
};

const locationStats = [
  { name: "Lahore HQ", employees: 214 },
  { name: "Karachi", employees: 128 },
  { name: "Islamabad", employees: 73 },
  { name: "Remote", employees: 96 },
];

const departmentStats = [
  { name: "Engineering", employees: 176 },
  { name: "HR", employees: 48 },
  { name: "Finance", employees: 35 },
  { name: "Operations", employees: 92 },
  { name: "Sales", employees: 64 },
];

const adminUsers = [
  { name: "Ayesha Noor", role: "Super Admin", lastActive: "5 min ago", actions: 38, statusId: 1, statusLabel: "Online" },
  { name: "Ali Imran", role: "Org Admin", lastActive: "21 min ago", actions: 26, statusId: 1, statusLabel: "Online" },
  { name: "Usman Tariq", role: "Security Admin", lastActive: "2 hrs ago", actions: 12, statusId: 3, statusLabel: "Idle" },
];

const tagUsage = [
  { tag: "Remote", count: 118 },
  { tag: "Critical", count: 64 },
  { tag: "Compliance", count: 52 },
  { tag: "Onboarding", count: 39 },
  { tag: "Policy", count: 31 },
];

const auditTrend = [
  { day: "Mon", total: 210, risky: 11 },
  { day: "Tue", total: 242, risky: 13 },
  { day: "Wed", total: 228, risky: 9 },
  { day: "Thu", total: 266, risky: 16 },
  { day: "Fri", total: 279, risky: 19 },
  { day: "Sat", total: 181, risky: 7 },
  { day: "Sun", total: 164, risky: 6 },
];

const notificationStats = {
  channels: [
    { name: "In-App", sent: 1240 },
    { name: "Email", sent: 790 },
    { name: "SMS", sent: 214 },
  ],
  queue: [
    { title: "Policy update broadcast", pending: 46 },
    { title: "Payroll reminder", pending: 19 },
    { title: "Security advisory", pending: 11 },
  ],
};

const securityStats = {
  score: 91,
  incidents: [
    { label: "Blocked suspicious logins", value: 17 },
    { label: "MFA failures", value: 23 },
    { label: "Policy violations", value: 4 },
  ],
};

const customFieldStats = [
  { type: "Text", count: 24 },
  { type: "Select", count: 13 },
  { type: "Date", count: 9 },
  { type: "Number", count: 6 },
];

const importExportStats = {
  monthly: [
    { month: "Jan", imports: 18, exports: 10 },
    { month: "Feb", imports: 22, exports: 12 },
    { month: "Mar", imports: 16, exports: 14 },
    { month: "Apr", imports: 25, exports: 17 },
    { month: "May", imports: 21, exports: 13 },
    { month: "Jun", imports: 24, exports: 15 },
  ],
  recentJobs: [
    { id: "JOB-3392", type: "Import", file: "employee_bulk_apr.csv", statusId: 1, statusLabel: "Completed" },
    { id: "JOB-3395", type: "Export", file: "audit_logs_q2.csv", statusId: 1, statusLabel: "Completed" },
    { id: "JOB-3401", type: "Import", file: "department_map.xlsx", statusId: 3, statusLabel: "Processing" },
  ],
};

function HorizontalBars({ rows, color = "#4c8fff" }) {
  const max = Math.max(...rows.map((r) => r.employees || r.count || r.sent || r.value), 1);
  return (
    <div className="space-y-2.5">
      {rows.map((row, idx) => {
        const value = row.employees || row.count || row.sent || row.value;
        const label = row.name || row.tag || row.label || row.type || `Item ${idx + 1}`;
        const key = row.id || row.key || label;
        return (
          <div key={key}>
            <div className="flex items-center justify-between text-xxs">
              <p className="text-gray-700">{label}</p>
              <p className="text-gray-500 font-medium">{value}</p>
            </div>
            <div className="h-2 rounded-full bg-gray-100 mt-1 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${(value / max) * 100}%`, background: color }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DualColumnChart({ rows }) {
  const max = Math.max(...rows.flatMap((r) => [r.imports, r.exports]), 1);
  return (
    <div className="h-44 flex items-end justify-between gap-2">
      {rows.map((r) => (
        <div key={r.month} className="flex-1 min-w-0">
          <div className="h-36 flex items-end justify-center gap-1">
            <div className="w-3 rounded-t bg-[#4c8fff]" style={{ height: `${(r.imports / max) * 100}%` }} title={`Imports: ${r.imports}`} />
            <div className="w-3 rounded-t bg-[#2f7d4f]" style={{ height: `${(r.exports / max) * 100}%` }} title={`Exports: ${r.exports}`} />
          </div>
          <p className="text-[10px] text-gray-500 text-center mt-1">{r.month}</p>
        </div>
      ))}
    </div>
  );
}

function DonutBreakdown({
  rows,
  colors = ["#4c8fff", "#2f7d4f", "#6f63cd", "#d89a3f"],
  sizeClass = "w-24 h-24",
  subtitle = "total",
}) {
  const normalized = rows.map((r, idx) => ({
    label: r.name || r.tag || r.label || r.type || `Item ${idx + 1}`,
    value: r.employees || r.count || r.sent || r.value || 0,
  }));
  const total = Math.max(1, normalized.reduce((acc, r) => acc + r.value, 0));
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 120 120" className={`${sizeClass} flex-shrink-0`}>
        <g transform="rotate(-90 60 60)">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="#eef2f7" strokeWidth="12" />
          {normalized.map((r, idx) => {
            const segment = (r.value / total) * circumference;
            const color = colors[idx % colors.length];
            const dashOffset = -offset;
            offset += segment;
            return (
              <circle
                key={`donut-${r.label}`}
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke={color}
                strokeWidth="12"
                strokeDasharray={`${segment} ${circumference - segment}`}
                strokeDashoffset={dashOffset}
                strokeLinecap="butt"
              />
            );
          })}
        </g>
        <text x="60" y="56" textAnchor="middle" className="fill-gray-800 text-[13px] font-semibold">
          {total}
        </text>
        <text x="60" y="70" textAnchor="middle" className="fill-gray-500 text-[9px]">
          {subtitle}
        </text>
      </svg>

      <div className="space-y-1.5 min-w-0">
        {normalized.map((r, idx) => (
          <div key={`legend-${r.label}`} className="flex items-center justify-between gap-3 text-[10px]">
            <span className="inline-flex items-center gap-1.5 text-gray-600">
              <span className="h-2 w-2 rounded-full" style={{ background: colors[idx % colors.length] }} />
              {r.label}
            </span>
            <span className="text-gray-700 font-medium">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function VerticalBars({ rows, color = "#2f7d4f" }) {
  const normalized = rows.map((r, idx) => ({
    label: r.name || r.tag || r.label || r.type || `Item ${idx + 1}`,
    value: r.employees || r.count || r.sent || r.value || 0,
  }));
  const max = Math.max(...normalized.map((r) => r.value), 1);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3">
      <div className="h-[12rem] border-l border-b border-gray-200 pl-2 pr-1 pt-2">
        <div className="h-full flex items-end justify-between gap-2">
          {normalized.map((r) => {
            const percent = (r.value / max) * 100;
            return (
              <div key={`v-${r.label}`} className="flex-1 min-w-0">
                <div className="h-36 relative flex items-end justify-center">
                  <span
                    className="absolute text-[10px] font-semibold text-gray-700"
                    style={{ bottom: `calc(${percent}% + 6px)` }}
                  >
                    {r.value}
                  </span>
                  <div
                    className="w-8 rounded-t-md"
                    style={{
                      height: `${percent}%`,
                      background: color,
                    }}
                    title={`${r.label}: ${r.value}`}
                  />
                </div>
                <p className="text-[10px] text-gray-600 text-center mt-1.5 truncate">{r.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MiniSpark({ rows }) {
  const w = 380;
  const h = 120;
  const px = 10;
  const py = 14;
  const max = Math.max(...rows.flatMap((r) => [r.total, r.risky]));
  const min = Math.min(...rows.flatMap((r) => [r.total, r.risky]));
  const span = Math.max(1, max - min);
  const step = (w - px * 2) / (rows.length - 1);
  const y = (v) => h - py - ((v - min) / span) * (h - py * 2);
  const totalPts = rows.map((r, i) => `${px + i * step},${y(r.total)}`).join(" ");
  const riskyPts = rows.map((r, i) => `${px + i * step},${y(r.risky)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-28">
      <polyline points={totalPts} fill="none" stroke="#4c8fff" strokeWidth="2.2" />
      <polyline points={riskyPts} fill="none" stroke="#d67c3e" strokeWidth="2.2" />
      {rows.map((r, i) => (
        <text key={`d-${r.day}`} x={px + i * step} y={h - 2} textAnchor="middle" className="fill-gray-500 text-[9px]">
          {r.day}
        </text>
      ))}
    </svg>
  );
}

export default function OrgDashboard() {
  const [search, setSearch] = useState("");

  const totalLocations = locationStats.length;
  const totalDepartments = departmentStats.length;
  const totalAdmins = adminUsers.length;
  const totalTags = tagUsage.reduce((a, t) => a + t.count, 0);
  const notificationQueueTotal = notificationStats.queue.reduce((a, q) => a + q.pending, 0);

  const cards = useMemo(
    () => [
      { key: "Organization Profile", route: routes.profile },
      { key: "Locations", route: routes.locations },
      { key: "Departments", route: routes.departments },
      { key: "Admin Users", route: routes.users },
      { key: "Tags", route: routes.tags },
      { key: "Audit Logs", route: routes.audit },
      { key: "Notifications", route: routes.notifications },
      { key: "Security & Privacy", route: routes.security },
      { key: "Custom Fields", route: routes.customFields },
      { key: "Data Import/Export", route: routes.data },
    ].filter((c) => c.key.toLowerCase().includes(search.trim().toLowerCase())),
    [search]
  );

  return (
    <Layout>
      <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-gray-700">Organization Intelligence Dashboard</h2>
            <p className="text-xxs text-gray-500 mt-0.5">
              Dedicated operational overview for each Organization module with charts, counts, and activity signals.
            </p>
          </div>
          <div className="w-full lg:w-[22rem]">
            <SearchBar placeholder="Search module blocks..." onSearch={setSearch} />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
          <div className="rounded-lg border border-gray-200 bg-[#f8fbff] p-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-gray-500">Locations</p>
              <FiMapPin className="text-[#315d9c]" size={13} />
            </div>
            <p className="text-sm font-semibold text-gray-800 mt-1">{totalLocations}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-[#f7faf8] p-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-gray-500">Departments</p>
              <FiLayers className="text-[#2f7d4f]" size={13} />
            </div>
            <p className="text-sm font-semibold text-gray-800 mt-1">{totalDepartments}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-[#fff8ed] p-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-gray-500">Admin Users</p>
              <FiUsers className="text-[#9a5d1d]" size={13} />
            </div>
            <p className="text-sm font-semibold text-gray-800 mt-1">{totalAdmins}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-[#f5f4ff] p-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-gray-500">Tag Assignments</p>
              <FiTag className="text-[#5f54b7]" size={13} />
            </div>
            <p className="text-sm font-semibold text-gray-800 mt-1">{totalTags}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-[#fff6f0] p-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-gray-500">Notif Queue</p>
              <FiBell className="text-[#b36a22]" size={13} />
            </div>
            <p className="text-sm font-semibold text-gray-800 mt-1">{notificationQueueTotal}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 xl:grid-cols-2 gap-4">
          {cards.some((c) => c.key === "Organization Profile") && (
            <Link href={routes.profile} className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700">Organization Profile</h3>
                <StatusDesign statusId={1} label="Configured" />
              </div>
              <p className="text-xxs text-gray-500 mt-1">Company identity, legal docs, and profile completion quality.</p>
              <div className="mt-3">
                <div className="flex items-center justify-between text-xxs">
                  <span className="text-gray-600">Profile Completeness</span>
                  <span className="font-semibold text-gray-800">{profileStats.completion}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 mt-1 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#4c8fff] to-[#7da8ff]" style={{ width: `${profileStats.completion}%` }} />
                </div>
                <div className="mt-2 flex items-center gap-3 text-[10px] text-gray-500">
                  <span>Verified Docs: {profileStats.verifiedDocs}</span>
                  <span>Pending: {profileStats.pendingDocs}</span>
                  <span>Updated: {profileStats.lastUpdate}</span>
                </div>
              </div>
            </Link>
          )}

          {cards.some((c) => c.key === "Locations") && (
            <Link href={routes.locations} className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="text-sm font-semibold text-gray-700">Locations</h3>
              <p className="text-xxs text-gray-500 mt-1">Employee distribution across operational locations.</p>
              <div className="mt-0 -my-6">
                <DonutBreakdown
                  rows={locationStats}
                  colors={["#4c8fff", "#2f7d4f", "#6f63cd", "#d89a3f"]}
                  sizeClass="w-36 h-36"
                  subtitle="employees"
                />
              </div>
            </Link>
          )}

          {cards.some((c) => c.key === "Departments") && (
            <Link href={routes.departments} className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="text-sm font-semibold text-gray-700">Departments</h3>
              <p className="text-xxs text-gray-500 mt-1">Headcount composition by department.</p>
              <div className="mt-3">
                <VerticalBars rows={departmentStats} color="#2f7d4f" />
              </div>
            </Link>
          )}

          {cards.some((c) => c.key === "Admin Users") && (
            <Link href={routes.users} className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="text-sm font-semibold text-gray-700">Admin Users</h3>
              <p className="text-xxs text-gray-500 mt-1">Access owners with latest activity and admin workload.</p>
              <div className="mt-3 space-y-2">
                {adminUsers.map((u) => (
                  <div key={u.name} className="flex items-center justify-between rounded-lg border border-gray-200 p-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className="h-8 w-8 rounded-full bg-[#edf4ff] text-[#315d9c] text-[10px] font-semibold inline-flex items-center justify-center">
                        {u.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </span>
                      <div>
                        <p className="text-xxs font-medium text-gray-800">{u.name}</p>
                        <p className="text-[10px] text-gray-500">{u.role} | {u.lastActive}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-[2px] text-[10px] font-medium ${
                          u.statusId === 1
                            ? "bg-[#ecf8f0] text-[#2f7d4f]"
                            : u.statusId === 3
                              ? "bg-[#fff8ed] text-[#9a5d1d]"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            u.statusId === 1
                              ? "bg-[#2f7d4f]"
                              : u.statusId === 3
                                ? "bg-[#9a5d1d]"
                                : "bg-gray-500"
                          }`}
                        />
                        {u.statusLabel}
                      </span>
                      <p className="text-[10px] text-gray-500 mt-1">{u.actions} actions</p>
                    </div>
                  </div>
                ))}
              </div>
            </Link>
          )}

          {cards.some((c) => c.key === "Tags") && (
            <Link href={routes.tags} className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="text-sm font-semibold text-gray-700">Tags</h3>
              <p className="text-xxs text-gray-500 mt-1">Most used organization tags and classification pressure points.</p>
              <div className="mt-3">
                <HorizontalBars rows={tagUsage} color="#6f63cd" />
              </div>
            </Link>
          )}

          {cards.some((c) => c.key === "Audit Logs") && (
            <Link href={routes.audit} className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700">Audit Logs</h3>
                <span className="inline-flex items-center gap-1 text-[10px] text-[#315d9c]">
                  <FiActivity size={11} /> Weekly Trend
                </span>
              </div>
              <p className="text-xxs text-gray-500 mt-1">Daily log volume and risky event movement.</p>
              <div className="mt-2">
                <MiniSpark rows={auditTrend} />
                <div className="flex items-center gap-3 text-[10px] text-gray-500 mt-1">
                  <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#4c8fff]" /> Total</span>
                  <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#d67c3e]" /> Risky</span>
                </div>
              </div>
            </Link>
          )}

          {cards.some((c) => c.key === "Notifications") && (
            <Link href={routes.notifications} className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
              <p className="text-xxs text-gray-500 mt-1">Channel throughput and current notification queue.</p>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <DonutBreakdown rows={notificationStats.channels} colors={["#4c8fff", "#2f7d4f", "#6f63cd"]} />
                </div>
                <div className="space-y-2">
                  {notificationStats.queue.map((q) => (
                    <div key={q.title} className="rounded border border-gray-200 p-2">
                      <p className="text-xxs text-gray-700">{q.title}</p>
                      <p className="text-[10px] text-gray-500 mt-1">{q.pending} pending sends</p>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          )}

          {cards.some((c) => c.key === "Security & Privacy") && (
            <Link href={routes.security} className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700">Security & Privacy</h3>
                <StatusDesign statusId={1} label="Protected" />
              </div>
              <p className="text-xxs text-gray-500 mt-1">Security health score and incident watchlist.</p>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="rounded-lg border border-[#dce9ff] bg-[#f5f9ff] p-3">
                  <p className="text-[10px] text-[#315d9c]">Security Score</p>
                  <p className="text-lg font-semibold text-[#315d9c] mt-1">{securityStats.score}/100</p>
                  <div className="h-2 rounded-full bg-white mt-2 overflow-hidden">
                    <div className="h-full bg-[#315d9c]" style={{ width: `${securityStats.score}%` }} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  {securityStats.incidents.map((s) => (
                    <div key={s.label} className="flex items-center justify-between text-xxs rounded border border-gray-200 px-2 py-1.5">
                      <span className="text-gray-700">{s.label}</span>
                      <span className="text-gray-500 font-medium">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          )}

          {cards.some((c) => c.key === "Custom Fields") && (
            <Link href={routes.customFields} className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="text-sm font-semibold text-gray-700">Custom Fields</h3>
              <p className="text-xxs text-gray-500 mt-1">Field type footprint and structure complexity.</p>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                <DonutBreakdown rows={customFieldStats} colors={["#2f7d4f", "#4c8fff", "#d89a3f", "#6f63cd"]} />
                <HorizontalBars rows={customFieldStats} color="#2f7d4f" />
              </div>
            </Link>
          )}

          {cards.some((c) => c.key === "Data Import/Export") && (
            <Link href={routes.data} className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm hover:shadow-md transition xl:col-span-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700">Data Import/Export</h3>
                <span className="inline-flex items-center gap-1 text-[10px] text-[#315d9c]">
                  <FiDatabase size={11} /> Monthly Jobs
                </span>
              </div>
              <p className="text-xxs text-gray-500 mt-1">Import/export trend and latest job execution states.</p>
              <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded border border-gray-200 p-3">
                  <DualColumnChart rows={importExportStats.monthly} />
                  <div className="flex items-center justify-center gap-3 text-[10px] text-gray-500">
                    <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded bg-[#4c8fff]" /> Imports</span>
                    <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded bg-[#2f7d4f]" /> Exports</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {importExportStats.recentJobs.map((j) => (
                    <div key={j.id} className="rounded border border-gray-200 p-2.5 flex items-center justify-between">
                      <div>
                        <p className="text-xxs font-medium text-gray-800">{j.id} | {j.type}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">{j.file}</p>
                      </div>
                      <StatusDesign statusId={j.statusId} label={j.statusLabel} />
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          )}
        </div>

        {cards.length === 0 && (
          <div className="mt-6 rounded border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
            <p className="text-xs text-gray-700 font-medium">No module block matched your search.</p>
            <p className="text-xxs text-gray-500 mt-1">Search using Organization, Security, Audit, or other module names.</p>
          </div>
        )}

        <div className="mt-4 rounded-lg border border-[#dbe8ff] bg-[#f4f8ff] px-3 py-2 flex items-center justify-between">
          <p className="text-[11px] text-[#315d9c] inline-flex items-center gap-2">
            <FiPieChart size={12} />
            Each Organization item is represented by a dedicated chart/list block.
          </p>
          <p className="text-[11px] text-[#315d9c] inline-flex items-center gap-2">
            <FiBell size={12} />
            10 module insights loaded
          </p>
        </div>
      </div>
    </Layout>
  );
}
