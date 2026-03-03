"use client";
import Link from "next/link";
import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiDollarSign,
  FiTrendingUp,
  FiUserPlus,
  FiBarChart2,
  FiSettings,
  FiClock,
  FiActivity,
  FiLink,
  FiPackage,
  FiLayers
} from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
const menuItems = [
  {
    icon: <FiHome className="text-md" />,
    href: "/dashboard",
    label: "Dashboard",
    description: "Track key metrics and performance insights",
    dropdown: [
      { label: "Overview", href: "/dashboard/overview" },
      { label: "Stats", href: "/dashboard/stats" },
      { label: "Reports", href: "/dashboard/reports" },
    ],
  },
  {
    icon: <FiLayers className="text-md" />,
    label: "Organization",
    href: "#", // parent item for dropdown
    description: "Company info and office locations",
    dropdown: [
      { label: "Organization Profile", href: "/admin/organization" },
      { label: "Locations", href: "/admin/locations" },
    ],
  },
  {
    icon: <FiUsers className="text-md" />,
    href: "/employees",
    label: "Employees",
    description: "Manage staff records and attendance details",
    dropdown: [
      { label: "List", href: "/employees/list" },
      { label: "Departments", href: "/employees/departments" },
      { label: "Teams", href: "/employees/teams" },
    ],
  },
  {
    icon: <FiClock className="text-md" />,
    href: "/attendance",
    label: "Attendance",
    description: "Monitor employee check-in and working hours",
    dropdown: [
      { label: "Daily Logs", href: "/attendance/daily" },
      { label: "Monthly Report", href: "/attendance/monthly" },
      { label: "Regularization Requests", href: "/attendance/regularizations" },
      { label: "Devices & Terminals", href: "/attendance/terminals" },
      { label: "Attendance Setting", href: "/attendance/settings" },
      { label: "Shift Schedules", href: "/attendance/shifts" },
    ],
  },
  {
    icon: <FiActivity className="text-md" />,
    href: "/time",
    label: "Time Tracking",
    description: "Tasks, projects, and timesheets",
    dropdown: [
      { label: "Projects", href: "/time/projects" },
      { label: "Tasks", href: "/time/tasks" },
      { label: "Timesheets", href: "/time/timesheets" },
      { label: "Approvals", href: "/time/approvals" },
      { label: "Reports", href: "/time/reports" },
    ],
  },
  {
    icon: <LuCalendarDays className="text-md" />,
    label: "Leave & Holidays",
    href: "/leave",
    description: "Manage leave types, requests, and calendars",
    dropdown: [
      { label: "Leave Requests", href: "/leave/requests", },
      { label: "Leave Types & Policies", href: "/leave/settings", },
      { label: "Holiday Calendars", href: "/leave/holidays", },
      { label: "Team Leave Calendar", href: "/leave/team", },
      { label: "Leave Balances", href: "/leave/balances", },
    ],
  },
  {
    icon: <FiPackage className="text-md" />,
    href: "/assets",
    label: "Assets",
    description: "Handle salary, bonuses, and deductions",
    dropdown: [
      { label: "Asset Catalog", href: "/assets/list" },
      { label: "Asset Policies", href: "/assets/policies" },
    ],
  },
  {
    icon: <FiDollarSign className="text-md" />,
    href: "/payroll",
    label: "Payroll",
    description: "Handle salary, bonuses, and deductions",
    dropdown: [
      { label: "Payrolls", href: "/payroll/list" },
      { label: "Salary Slip", href: "/payroll/salary-slip" },
      { label: "Bonuses", href: "/payroll/bonuses" },
      { label: "Expenses", href: "/payroll/expenses" },
      { label: "Loans", href: "/payroll/loans" },
      { label: "OverTime", href: "/payroll/overtime" },
      { label: "Payroll Runs", href: "/payroll/runs" },
      { label: "Bank Integration", href: "/payroll/banks" },
      { label: "Current Compennsation", href: "/payroll/compensation" },
      { label: "Tax", href: "/payroll/tax" },
    ],
  },
  {
    icon: <FiTrendingUp className="text-md" />,
    href: "/performance",
    label: "Performance",
    description: "Track employee performance and evaluations",
    dropdown: [
      { label: "Reviews", href: "/performance/reviews" },
      { label: "Goals", href: "/performance/goals" },
      { label: "KPI Reports", href: "/performance/kpi-reports" },
    ],
  },
  {
    icon: <FiUserPlus className="text-md" />,
    href: "/recruitment",
    label: "Recruitment",
    description: "Manage job postings and applicant tracking",
    dropdown: [
      { label: "Job Openings", href: "/recruitment/jobs" },
      { label: "Applicants", href: "/recruitment/applicants" },
      { label: "Interviews", href: "/recruitment/interviews" },
    ],
  },
  {
    icon: <FiBarChart2 className="text-md" />,
    href: "/reports",
    label: "Reports",
    description: "Generate HR and organizational reports",
    dropdown: [
      { label: "Employee", href: "/reports/employee" },
      { label: "Finance", href: "/reports/finance" },
      { label: "Custom", href: "/reports/custom" },
    ],
  },
  {
    icon: <FiLink className="text-md" />,
    href: "/integrations",
    label: "Integrations & APIs",

  },
  {
    icon: <FiSettings className="text-md" />,
    href: "/settings",
    label: "Settings",
    description: "Configure system preferences and user roles",
    dropdown: [
      { label: "General", href: "/settings/general" },
      { label: "Role", href: "/settings/roles" },
      { label: "Permission", href: "/settings/permissions" },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside
      style={{ backgroundImage: "var(--auth-pages-bg-color)" }}
      className="fixed top-11 left-0 w-11 ml-1 h-[calc(100vh-2.75rem)] pt-6 flex flex-col items-center space-y-2 z-40"
    >
      {menuItems.map((item, idx) => (
        <div
          key={idx}
          className={`relative w-full ${item.dropdown ? "group" : ""}`}
        >
          <Link
            href={item.href}
            className={`w-full flex justify-center py-1 text-gray-300 hover:text-white ${item.dropdown ? "hover:bg-white/30" : ""
              }`}
          >
            {item.icon}
          </Link>

          {/* Render dropdown only if it exists */}
          {item.dropdown && (
            <div className="absolute left-full top-0 ml-1 hidden group-hover:block z-50">
              <div className="w-52 bg-white text-black rounded shadow-lg border border-gray-200 p-2 animate-fade-in">
                {/* Render description if exists */}
                {item.description && (
                  <p className="text-xs px-2 py-1 border-b border-gray-200">
                    <span className="font-semibold">{item.label}</span>
                    <br />
                    <span className="text-gray-500 text-[11px]">
                      {item.description}
                    </span>
                  </p>
                )}

                <ul className="flex flex-col">
                  {item.dropdown.map((drop, i) => (
                    <li key={i}>
                      <Link
                        href={drop.href}
                        className="block px-3 py-1 text-xxs hover:bg-gray-100 rounded"
                      >
                        {drop.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      ))}
    </aside>
  );
}
