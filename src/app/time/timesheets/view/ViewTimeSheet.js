"use client";

import { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaClock, FaFileExport, FaRegCalendarAlt, FaUserTie } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const statusColors = {
  Approved: "text-green-600",
  Rejected: "text-red-600",
  Pending: "text-yellow-500",
  Submitted: "text-blue-600",
};

const bgStatusColors = {
  Approved: "bg-green-100",
  Rejected: "bg-red-100",
  Pending: "bg-yellow-100",
  Submitted: "bg-blue-100",
};

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-xs tracking-wide
    ${bgStatusColors[status] || "bg-gray-200"} 
    ${statusColors[status] || "text-gray-600"}`}
    title={status}
  >
    {status === "Approved" && <FaCheckCircle />}
    {status === "Rejected" && <FaTimesCircle />}
    {status === "Pending" && <FaClock />}
    {status}
  </span>
);

export default function TimesheetDetail() {
  const employee = {
    photo: "/api/portraits/men/28.jpg",
    name: "Ahsan Qureshi",
    empId: "EMP301",
    designation: "Senior Software Engineer",
    department: "Engineering",
    location: "Lahore HQ",
    email: "ahsan.qureshi@example.com",
    phone: "+92 300 1234567",
  };

  const timesheetSummary = {
    period: "Mar 10 - Mar 16, 2025",
    status: "Approved",
    submittedOn: "Mar 17, 2025",
    approvedBy: "Sarah Ahmed",
    totalHours: 38.5,
    overtimeHours: 4,
    totalTasks: 5,
    completedTasks: 4,
    pendingTasks: 1,
  };

  const taskEntries = [
    {
      id: 1,
      taskName: "Design Homepage",
      project: "Website Redesign",
      date: "2025-03-10",
      hours: 8,
      taskStatus: "Completed",
      timesheetStatus: "Approved",
      notes: "Completed on time, client approved.",
      attachments: ["design-v1.png"],
    },
    {
      id: 2,
      taskName: "Develop API Endpoints",
      project: "Mobile App Backend",
      date: "2025-03-11",
      hours: 7.5,
      taskStatus: "In Progress",
      timesheetStatus: "Approved",
      notes: "Backend mostly done, need testing.",
      attachments: [],
    },
    // Add more tasks as needed
  ];

  const [managerComment, setManagerComment] = useState("");

  const weeklyHoursData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Hours Worked",
        data: [8, 7.5, 6, 3, 4, 2, 0],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderRadius: 6,
      },
    ],
  };

  const weeklyHoursOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { font: { weight: "600", size: 14 } } },
      tooltip: { enabled: true },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 12,
        ticks: { stepSize: 2 },
        grid: { color: "#f0f0f0" },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto p-8 font-sans text-gray-900 space-y-10">
      {/* Employee Profile & Timesheet Header */}
      <section className="flex flex-col md:flex-row items-center gap-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-lg p-6">
        <img
          src={employee.photo}
          alt={employee.name}
          className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
        />
        <div className="flex-1 space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">{employee.name}</h1>
          <p className="text-xl font-semibold text-blue-700 flex items-center gap-2">
            <FaUserTie /> {employee.designation} - {employee.department}
          </p>
          <p className="text-md text-gray-700">{employee.location}</p>
          <p className="text-gray-600">{employee.email} | {employee.phone}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-2">Timesheet Period</p>
          <p className="text-2xl font-bold">{timesheetSummary.period}</p>
          <div className="mt-3">
            <StatusBadge status={timesheetSummary.status} />
            <p className="text-sm text-gray-600 mt-1">
              Submitted: {timesheetSummary.submittedOn}
            </p>
            <p className="text-sm text-gray-600">
              Approved by: {timesheetSummary.approvedBy}
            </p>
          </div>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Hours Worked", value: `${timesheetSummary.totalHours} hrs` },
          { label: "Overtime Hours", value: `${timesheetSummary.overtimeHours} hrs` },
          { label: "Total Tasks", value: timesheetSummary.totalTasks },
          { label: "Tasks Completed", value: timesheetSummary.completedTasks },
          { label: "Tasks Pending", value: timesheetSummary.pendingTasks },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow cursor-default"
          >
            <p className="text-gray-500 font-medium tracking-wide">{label}</p>
            <p className="mt-2 text-3xl font-extrabold text-blue-600">{value}</p>
          </div>
        ))}
      </section>

      {/* Weekly Hours Chart */}
      <section className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Weekly Hours Breakdown
        </h2>
        <div className="max-w-4xl mx-auto">
          <Bar data={weeklyHoursData} options={weeklyHoursOptions} />
        </div>
      </section>

      {/* Task Entries Table */}
      <section className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">Task Entries</h2>
        <table className="min-w-full border-collapse border border-gray-200 text-left text-sm">
          <thead className="bg-blue-100 border-b border-blue-300">
            <tr>
              <th className="py-3 px-4 font-semibold">Task Name</th>
              <th className="py-3 px-4 font-semibold">Project</th>
              <th className="py-3 px-4 font-semibold">Date</th>
              <th className="py-3 px-4 font-semibold text-right">Hours</th>
              <th className="py-3 px-4 font-semibold">Task Status</th>
              <th className="py-3 px-4 font-semibold">Timesheet Status</th>
              <th className="py-3 px-4 font-semibold">Notes</th>
              <th className="py-3 px-4 font-semibold">Attachments</th>
            </tr>
          </thead>
          <tbody>
            {taskEntries.map(
              ({
                id,
                taskName,
                project,
                date,
                hours,
                taskStatus,
                timesheetStatus,
                notes,
                attachments,
              }) => (
                <tr
                  key={id}
                  className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-blue-700">{taskName}</td>
                  <td className="py-3 px-4">{project}</td>
                  <td className="py-3 px-4">{date}</td>
                  <td className="py-3 px-4 text-right font-semibold">{hours}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={taskStatus} />
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={timesheetStatus} />
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate" title={notes}>
                    {notes}
                  </td>
                  <td className="py-3 px-4">
                    {attachments.length > 0 ? (
                      <ul className="flex space-x-2 text-blue-600">
                        {attachments.map((file, idx) => (
                          <li key={idx}>
                            <a
                              href={`/${file}`}
                              target="_blank"
                              rel="noreferrer"
                              className="underline hover:text-blue-800"
                            >
                              {file}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-400 italic">No attachments</span>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </section>

      {/* Manager Feedback */}
      <section className="bg-white rounded-xl shadow-md p-6 max-w-4xl mx-auto space-y-3">
        <h2 className="text-2xl font-bold text-blue-700">Manager Feedback</h2>
        <textarea
          rows={4}
          value={managerComment}
          onChange={(e) => setManagerComment(e.target.value)}
          placeholder="Add your comments or feedback here..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />
      </section>

      {/* Action Buttons */}
      <section className="flex flex-wrap justify-center md:justify-end gap-4">
        <button
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition-shadow shadow-md"
          onClick={() => alert("Reject action triggered")}
        >
          <FaTimesCircle /> Reject
        </button>
        <button
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-shadow shadow-md"
          onClick={() => alert("Request changes action triggered")}
        >
          <FaClock /> Request Changes
        </button>
        <button
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-shadow shadow-md"
          onClick={() => alert("Approve action triggered")}
        >
          <FaCheckCircle /> Approve
        </button>
        <button
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 hover:bg-gray-100 transition-shadow shadow-sm"
          onClick={() => alert("Export PDF action triggered")}
        >
          <FaFileExport /> Export PDF
        </button>
      </section>
    </div>
  );
}
