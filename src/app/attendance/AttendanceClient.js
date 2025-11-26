"use client";
import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut, Pie, Radar, PolarArea, Line } from "react-chartjs-2";
import {
  AiOutlineUser,
  AiOutlineSchedule,
  AiOutlineClockCircle,
  AiOutlineWifi,
  AiOutlineWarning,
} from "react-icons/ai";
import {
  FiUser
} from "react-icons/fi";
import Layout from "../components/Layout";
import { ChartCard } from "../components/ChartCard";
import { format } from "date-fns";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend
);

const generalStats = [
  { title: "Active Employees", value: 1180, icon: <AiOutlineUser className="text-blue-600" /> },
  { title: "Monthly Attendance Rate", value: "92.5%", icon: <AiOutlineSchedule className="text-green-600" /> },
  { title: "Pending Regularization Requests", value: 12, icon: <AiOutlineClockCircle className="text-yellow-500" /> },
  { title: "Active Devices", value: "8", icon: <AiOutlineWifi className="text-green-600" /> },
  { title: "Attendance Exceptions", value: 45, icon: <AiOutlineWarning className="text-orange-500" /> },
];

const COLORS = {
  blue: [
    "rgba(59, 130, 246, 0.8)",    // blue-500
    "rgba(96, 165, 250, 0.7)",    // blue-400
    "rgba(37, 99, 235, 0.9)",     // blue-600
  ],
  green: [
    "rgba(22, 163, 74, 0.85)",    // green-600
    "rgba(34, 197, 94, 0.75)",    // green-500
    "rgba(21, 128, 61, 0.9)",     // green-700
  ],
  red: [
    "rgba(239, 68, 68, 0.85)",    // red-500
    "rgba(248, 113, 113, 0.7)",   // red-400
    "rgba(220, 38, 38, 0.9)",     // red-600
  ],
  orange: [
    "rgba(249, 115, 22, 0.85)",   // orange-500
    "rgba(251, 191, 36, 0.7)",    // yellow-400
    "rgba(202, 138, 4, 0.9)",     // yellow-700
  ],
  gray: [
    "rgba(107, 114, 128, 0.7)",   // gray-500
    "rgba(75, 85, 99, 0.6)",      // gray-600
    "rgba(55, 65, 81, 0.8)",      // gray-700
  ],
  purple: [
    "rgba(139, 92, 246, 0.85)",   // purple-500
    "rgba(165, 180, 252, 0.7)",   // purple-400
    "rgba(124, 58, 237, 0.9)",    // purple-600
  ],
  teal: [
    "rgba(20, 184, 166, 0.85)",   // teal-500
    "rgba(94, 234, 212, 0.7)",    // teal-400
    "rgba(13, 148, 136, 0.9)",    // teal-600
  ],
  pink: [
    "rgba(236, 72, 153, 0.85)",   // pink-500
    "rgba(251, 207, 232, 0.7)",   // pink-400
    "rgba(219, 39, 119, 0.9)",    // pink-600
  ],
  yellow: [
    "rgba(234, 179, 8, 0.85)",    // yellow-500
    "rgba(253, 224, 71, 0.7)",    // yellow-400
    "rgba(202, 138, 4, 0.9)",     // yellow-600
  ],
  cyan: [
    "rgba(6, 182, 212, 0.85)",    // cyan-500
    "rgba(165, 243, 252, 0.7)",   // cyan-400
    "rgba(8, 145, 178, 0.9)",     // cyan-600
  ],
};


const dummyData = {
  monthlyLeaveRequests: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Casual",
        data: [12, 15, 14, 18, 20, 25, 22, 17, 19, 23, 26, 30],
        backgroundColor: COLORS.teal[1],
      },
      {
        label: "Sick",
        data: [5, 6, 7, 4, 8, 6, 7, 5, 6, 4, 8, 7],
        backgroundColor: COLORS.orange[1],
      },
      {
        label: "Paid",
        data: [20, 25, 22, 28, 30, 35, 33, 31, 29, 30, 35, 38],
        backgroundColor: COLORS.blue[1],
      },
      {
        label: "Unpaid",
        data: [3, 2, 4, 3, 5, 4, 3, 4, 5, 6, 3, 4],
        backgroundColor: COLORS.pink[1],
      },
    ],
  },

  earningsBreakdown: {
    labels: ["Basic Salary", "Allowances", "Bonuses"],
    datasets: [
      {
        data: [12000000, 3500000, 1500000],
        backgroundColor: COLORS.blue,
        hoverOffset: 20,
      },
    ],
  },

  deductionsBreakdown: {
    labels: ["Tax", "Social Security", "Loans", "Other"],
    datasets: [
      {
        data: [1500000, 400000, 200000, 100000],
        backgroundColor: COLORS.red,
        hoverOffset: 20,
      },
    ],
  },

  netPayDistribution: {
    labels: [
      "Below 50k",
      "50k-70k",
      "70k-90k",
      "90k-110k",
      "110k-130k",
      "130k+",
    ],
    datasets: [
      {
        label: "Employees",
        data: [15, 40, 60, 45, 30, 10],
        fill: true,
        backgroundColor: "rgba(16, 185, 129, 0.35)",
        borderColor: COLORS.green[2],
        borderWidth: 2,
        pointBackgroundColor: COLORS.green[1],
        tension: 0.3,
      },
    ],
  },

  payrollStatus: {
    labels: ["Paid", "Pending", "Rejected"],
    datasets: [
      {
        label: "Count",
        data: [80, 10, 20],
        backgroundColor: [COLORS.green[0], COLORS.orange[1], COLORS.red[0]],
        borderWidth: 1,
      },
    ],
  },

  bonusDistribution: {
    labels: ["IT", "Finance", "Operations", "Sales", "Marketing"],
    datasets: [
      {
        label: "Bonus Paid (₨ thousands)",
        data: [600, 500, 400, 350, 300],
        backgroundColor: COLORS.blue,
        borderRadius: 6,
        maxBarThickness: 28,
      },
    ],
  },

  monthlyHolidays: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Holidays",
        data: [1, 0, 3, 0, 0, 0, 1, 0, 2, 0, 0, 3],
        fill: true,
        borderColor: "#db5e48",         // Orange smooth line
        backgroundColor: "#db5e48",
        borderWidth: 2,
        tension: 0.45,
        pointRadius: 6,
        pointBackgroundColor: "rgba(249,115,22,0.6)", // semi-transparent bubbles
        pointBorderColor: "#db5e48",
        pointBorderWidth: 2,
      },
    ],
  }
  ,
  monthlyLeaves: {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        label: "Leaves",
        data: [10, 20, 33, 10, 50, 70, 99, 111, 130, 158, 170, 88],
        fill: true,
        backgroundColor: "rgba(16, 185, 129, 0.15)", // green tint
        borderColor: "#10B981", // emerald
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "#10B981",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
      },
    ],
  }
  ,
  paymentModes: {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        label: "Leaves",
        data: [70, 30, 20],
        backgroundColor: [COLORS.green[0], COLORS.orange[1], COLORS.red[0]],
        hoverOffset: 20,
      },
    ],
  },

  employeePayrollCount: {
    labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: "Employees on Payroll",
        data: [200, 220, 260, 280, 300, 320],
        fill: false,
        borderColor: COLORS.blue[2],
        backgroundColor: COLORS.blue[2],
        tension: 0.3,
      },
    ],
  },

  topDepartmentsPayroll: {
    labels: ["IT", "Finance", "Operations", "Sales", "Marketing"],
    datasets: [
      {
        label: "Payroll Cost (₨ thousands)",
        data: [4800, 4200, 4000, 3500, 3000],
        backgroundColor: COLORS.red,
        borderRadius: 6,
        maxBarThickness: 24,
      },
    ],
  },
};


export default function AttendanceClient() {
  const [payrollFilter, setPayrollFilter] = useState("Monthly");
  const [bonusFilter, setBonusFilter] = useState("Monthly");
  const [taxFilter, setTaxFilter] = useState("Monthly");
  const [employeeFilter, setEmployeeFilter] = useState("Yearly");
  const [topDeptFilter, setTopDeptFilter] = useState("Monthly");
  const [monthVal, setMonthVal] = useState("");

  const requests = [
    {
      id: 1,
      employeeName: "Ali Khan",
      designation: "Software Engineer",
      leaveType: "Casual",
      startDate: "2025-11-10",
      endDate: "2025-11-12",
      status: "Pending",
      imageUrl: "/api/portraits/men/11.jpg",
    },
    {
      id: 2,
      employeeName: "Sara Ahmed",
      designation: "HR Manager",
      leaveType: "Sick",
      startDate: "2025-11-08",
      endDate: "2025-11-09",
      status: "Approved",
      imageUrl: "/api/portraits/women/12.jpg",
    },
    {
      id: 3,
      employeeName: "Usman Tariq",
      designation: "Accountant",
      leaveType: "Paid",
      startDate: "2025-11-15",
      endDate: "2025-11-20",
      status: "Rejected",
      imageUrl: "/api/portraits/men/13.jpg",
    },
    {
      id: 4,
      employeeName: "Nida Zafar",
      designation: "Marketing Lead",
      leaveType: "Unpaid",
      startDate: "2025-11-18",
      endDate: "2025-11-19",
      status: "Pending",
      imageUrl: "/api/portraits/women/14.jpg",
    },

    {
      id: 5,
      employeeName: "Hamza Ali",
      designation: "Sales Executive",
      leaveType: "Casual",
      startDate: "2025-11-21",
      endDate: "2025-11-23",
      status: "Approved",
      imageUrl: "/api/portraits/men/15.jpg",
    },
  ];

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <Layout>
      <div className="flex justify-between text-lg p-1 mb-2">
        <h2>Attendance Dashboard</h2>

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-2 mb-4">
        {generalStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col justify-between hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-medium text-gray-600">
                {stat.title}
              </h3>
              {stat.icon}
            </div>
            <p className="text-sm font-semibold text-gray-800 mt-3">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="min-h-screen w-full">


        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ChartCard
            title="Monthly Leave Trends"
            filter={{ value: payrollFilter }}
            onFilterChange={setPayrollFilter}
            className="md:col-span-2"
          >
            <Bar
              data={dummyData.monthlyLeaveRequests}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  tooltip: { mode: "index", intersect: false },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                  x: {
                    ticks: { font: { size: 11 } },
                  },
                },
              }}
              height={110}
            />
          </ChartCard>

          <ChartCard title=" Recent Leave Requests">
            <div className="w-full flex justify-center">
              <div
                style={{
                  overflowY: "auto",
                  height: 300,
                  width: "100%",
                  scrollbarWidth: "thin",
                  msOverflowStyle: "auto",
                }}
              >
                {requests.length === 0 ? (
                  <p className="text-gray-500 text-center mt-8">No new leave requests</p>
                ) : (
                  requests.map((req, idx) => (
                    <div
                      key={req.id}
                      className={`flex items-center p-2 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } rounded-md`}
                    >
                      {req.imageUrl ? (
                        <img
                          src={`${baseUrl}${req.imageUrl}`}
                          alt={req.employeeName}
                          className="w-10 h-10 rounded-full object-cover border border-gray-300 flex-shrink-0 mr-4"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mr-4">
                          <FiUser className="text-gray-400" />
                        </div>
                      )}

                      <div className="flex justify-between items-center w-full min-w-0">
                        <div className="flex flex-col min-w-0 flex-1 pr-4">
                          <div
                            className="text-xs font-semibold text-gray-900 truncate"
                            title={req.employeeName}
                          >
                            {req.employeeName}
                          </div>
                          <div
                            className="text-xxs text-gray-500 truncate"
                            title={req.designation || "Designation not set"}
                          >
                            {req.designation || "Designation not set"}
                          </div>
                        </div>

                        <div className="flex flex-col items-end whitespace-nowrap flex-1 pl-4">
                          <div className="text-xxs text-gray-700 capitalize font-medium mb-1">
                            {req.leaveType} Leave
                          </div>
                          <div className="text-xxs text-gray-400">
                            {format(new Date(req.startDate), "dd MMM yyyy")}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>


          </ChartCard>

        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">

          <ChartCard title="Leaves Per Month">
            <div className="w-full flex justify-center">
              <div className="" style={{ width: 400, height: 330 }}>
                <Line
                  data={dummyData.monthlyLeaves}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: false }, tooltip: { mode: "nearest" } },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: { font: { size: 11 } },
                      },
                      x: {
                        ticks: { font: { size: 11 } },
                      },
                    },
                  }}
                  height={230}
                />
              </div></div>
          </ChartCard>

          <ChartCard title="Leave Requests">
            <div className="w-full flex justify-center">
              <div className="" style={{ width: 288, height: 288 }}>
                <Pie
                  data={dummyData.paymentModes}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "bottom", labels: { font: { size: 11 } } },
                      tooltip: {
                        callbacks: {
                          label: (ctx) =>
                            `${ctx.label}: ${ctx.parsed.toLocaleString()}`,
                        },
                      },
                    },
                  }}
                  width={180}
                  height={180}
                />
              </div></div>
          </ChartCard>


          <ChartCard
            title="Holidays Per Month"
          >
            <div className="w-full flex justify-center">
              <div className="" style={{ width: 400, height: 330 }}>
                <Line
                  data={dummyData.monthlyHolidays}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: false }, tooltip: { mode: "nearest" } },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: { font: { size: 11 } },
                      },
                      x: {
                        ticks: { font: { size: 11 } },
                      },
                    },
                  }}
                  height={230}
                />
              </div></div>
          </ChartCard>

        </section>


      </div>
    </Layout>
  );
}


