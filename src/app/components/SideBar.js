"use client";
import Link from "next/link";
import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiDollarSign,
  FiFileText,
  FiTrendingUp,
  FiUserPlus,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi"; // ✅ Feather icons

const menuItems = [
  {
    icon: <FiHome className="text-md" />,
    href: "/dashboard",
    label: "Dashboard",
    description: "Track key metrics and performance insights",
    dropdown: ["Overview", "Stats", "Reports"],
  },
  {
    icon: <FiUsers className="text-md" />,
    href: "/employees",
    label: "Employees",
    description: "Manage staff records and attendance details",
    dropdown: ["List", "Departments", "Roles"],
  },
  {
    icon: <FiCalendar className="text-md" />,
    href: "/attendance",
    label: "Attendance",
    description: "Monitor employee check-in and working hours",
    dropdown: ["Daily Logs", "Monthly Report", "Late/Early"],
  },
  {
    icon: <FiDollarSign className="text-md" />,
    href: "/payroll",
    label: "Payroll",
    description: "Handle salary, bonuses, and deductions",
    dropdown: ["Salary Slip", "Bonuses", "Tax"],
  },
  {
    icon: <FiFileText className="text-md" />,
    href: "/leave-requests",
    label: "Leave Requests",
    description: "Review and manage employee leave applications",
    dropdown: ["Pending", "Approved", "Rejected"],
  },
  {
    icon: <FiTrendingUp className="text-md" />,
    href: "/performance",
    label: "Performance",
    description: "Track employee performance and evaluations",
    dropdown: ["Reviews", "Goals", "KPI Reports"],
  },
  {
    icon: <FiUserPlus className="text-md" />,
    href: "/recruitment",
    label: "Recruitment",
    description: "Manage job postings and applicant tracking",
    dropdown: ["Job Openings", "Applicants", "Interviews"],
  },
  {
    icon: <FiBarChart2 className="text-md" />,
    href: "/reports",
    label: "Reports",
    description: "Generate HR and organizational reports",
    dropdown: ["Employee", "Finance", "Custom"],
  },
  {
    icon: <FiSettings className="text-md" />,
    href: "/settings",
    label: "Settings",
    description: "Configure system preferences and user roles",
    dropdown: ["General", "Roles", "Permissions"],
  },
];

export default function Sidebar() {
  return (
    <aside
      style={{ backgroundImage: "var(--auth-pages-bg-color)" }}
      className="fixed top-11 left-0 w-11 ml-1 h-[calc(100vh-2.75rem)] pt-6 flex flex-col items-center space-y-2 z-40"
    >
      {menuItems.map((item, idx) => (
        <div key={idx} className="relative group w-full">
          <Link
            href={item.href}
            className="w-full hover:bg-white/30 flex justify-center py-1 text-gray-300 hover:text-white"
          >
            {item.icon}
          </Link>

          {/* Dropdown card */}
          <div className="absolute left-full top-0 ml-1 hidden group-hover:block z-50">
            <div className="w-52 bg-white text-black rounded shadow-lg border border-gray-200 p-2 animate-fade-in">
              <p className="text-xs px-2 py-1 border-b border-gray-200">
                <span className="font-semibold">{item.label}</span>
                <br />
                <span className="text-gray-500 text-[11px]">
                  {item.description}
                </span>
              </p>

              <ul className="flex flex-col">
                {item.dropdown.map((drop, i) => (
                  <li
                    key={i}
                    className="px-3 py-1 text-xs hover:bg-gray-100 cursor-pointer rounded"
                  >
                    {drop}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </aside>
  );
}
