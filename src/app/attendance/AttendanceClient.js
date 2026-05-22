"use client";
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
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  AiOutlineUser,
  AiOutlineSchedule,
  AiOutlineClockCircle,
  AiOutlineWifi,
  AiOutlineWarning,
} from "react-icons/ai";
import { FiUser } from "react-icons/fi";
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

const dummyData = {
  monthlyAttendanceOverview: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Attendance %",
        data: [88, 92, 90, 94, 89, 93, 91, 87, 95, 92, 94, 96],
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return null;
          }

          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "#456882"); // Indigo 600
          gradient.addColorStop(1, "#1B3C53"); // Indigo 400

          return gradient;
        },
        hoverBackgroundColor: "#145a82",
      },
    ],
  },

  dailyAttendanceData: {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [
      {
        label: "Attendance %",
        data: [33, 51, 43, 66, 77],
        fill: true,
        backgroundColor: "rgba(251, 158, 58, 0.3)", // lighter orange fill with transparency
        borderColor: "#E6521F",                     // strong burnt orange for the line
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 6,
        tension: 0.3,                               // a bit smoother curve
      },
    ],
  },

  attendanceSummaryData: {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [79, 21],
        backgroundColor: ["#007E6E", "#73AF6F"],
        borderWidth: 0,
        hoverOffset: 10,
      },
    ],
  },

  attendanceExceptions: {
    labels: ["Late Arrivals", "Early Leaves", "No-Shows", "Unapproved Leaves"],
    datasets: [
      {
        data: [20, 10, 8, 7],
        backgroundColor: [
          "#2C74B3",
          "#205295",
          "#144272",
          "#0A2647",
        ],
        hoverOffset: 20,
      },
    ],
  },

  devicesUsage: {
    labels: ["Terminal 1", "Terminal 2", "Terminal 3", "Terminal 4", "Terminal 5"],
    datasets: [
      {
        label: "Active Devices",
        data: [3, 2, 1, 1, 1],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",  // blue
          "rgba(16, 185, 129, 0.8)",  // green
          "rgba(234, 179, 8, 0.8)",   // yellow
          "rgba(239, 68, 68, 0.8)",   // red
          "rgba(139, 92, 246, 0.8)",  // purple
        ],
      },
    ],
  },
};

export default function AttendanceClient() {
  const presentCount = 79;
  const absentCount = 21;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const regularizationRequests = [
    {
      id: 2,
      employeeName: "Sara Ahmed",
      designation: "HR Manager",
      requestType: "Late Entry",
      requestDate: "2025-11-08",
      status: "Approved",
      imageUrl: "/api/portraits/women/22.jpg",
    },
    {
      id: 4,
      employeeName: "Nida Zafar",
      designation: "Marketing Lead",
      requestType: "Early Exit",
      requestDate: "2025-11-18",
      status: "Pending",
      imageUrl: "/api/portraits/women/24.jpg",
    },
    {
      id: 6,
      employeeName: "Ayesha Malik",
      designation: "Customer Support",
      requestType: "Missed Punch",
      requestDate: "2025-11-22",
      status: "Approved",
      imageUrl: "/api/portraits/women/26.jpg",
    },
    {
      id: 7,
      employeeName: "Bilal Shah",
      designation: "Backend Developer",
      requestType: "Late Entry",
      requestDate: "2025-11-25",
      status: "Pending",
      imageUrl: "/api/portraits/men/27.jpg",
    },
    {
      id: 8,
      employeeName: "Fatima Noor",
      designation: "QA Engineer",
      requestType: "Missed Punch",
      requestDate: "2025-11-10",
      status: "Approved",
      imageUrl: "/api/portraits/women/28.jpg",
    },
  ];


  return (
    <Layout>
      <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-base font-semibold text-gray-700">Attendance Dashboard</h2>
            <p className="text-xxs text-gray-500 mt-0.5">
              Real-time attendance visibility, requests monitoring, and exception insights.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-2 mb-4">
          {generalStats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col justify-between transition hover:shadow-md hover:border-gray-300"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xxs font-medium text-gray-600">{stat.title}</h3>
                <span className="w-8 h-8 rounded-full bg-[#edf4ff] text-[#315d9c] flex items-center justify-center border border-[#d7e6ff]">
                  {stat.icon}
                </span>
              </div>
              <p className="text-base font-semibold text-gray-800 mt-3">{stat.value}</p>
            </div>
          ))}
        </div>

      <div className="w-full space-y-4">

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ChartCard title="Daily Attendance Trends (Mon-Fri)" className="!shadow-sm !border !border-gray-200 !h-[24rem]">
            <div className="w-full flex justify-center">
              <div className="w-full h-[300px]">

                <Line
                  data={dummyData.dailyAttendanceData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        mode: "nearest",    // or "index"
                        intersect: false,   // so it shows on nearest point even if not directly hovering a point
                        callbacks: {
                          label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}%`, // shows label + value with percent
                        },
                      },
                    },
                    scales: {
                      x: {
                        ticks: { font: { size: 11 }, color: "#6b7280" },
                        min: -0.5,
                        max: 4.5,
                        grid: { display: false },
                      },
                      y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { stepSize: 10, color: "#6b7280" },
                        grid: { color: "rgba(0,0,0,0.06)" },
                      },
                    },
                    elements: {
                      point: {
                        radius: 0,         // hide points normally
                        hitRadius: 10,     // increase hit area so hover triggers easier
                        hoverRadius: 6,    // circle appears on hover
                      },
                    },
                  }}

                  height={230}
                />

              </div>
            </div>
          </ChartCard>
          <ChartCard title="Today's Attendance Summary" className="!shadow-sm !border !border-gray-200 !h-[24rem]">
            <div className="w-full flex flex-col items-center">
              <div className="relative w-[220px] h-[220px]">
                <Doughnut data={dummyData.attendanceSummaryData} options={{
                  maintainAspectRatio: false,
                  cutout: "86%", // donut thickness
                  plugins: {
                    tooltip: {
                      enabled: true,
                      callbacks: {
                        label: (context) => `${context.label}: ${context.parsed}%`,
                      },
                    },
                    legend: {
                      display: false,
                    },
                  },
                }} />
                <div
                  className="absolute inset-0 flex items-center justify-center font-bold text-[1.8rem] text-gray-700"
                >
                  79%
                </div>
              </div>

              <div className="mt-4 flex gap-6 text-xxs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full block" style={{ backgroundColor: "#007E6E" }}></span>
                  <span>Present: {presentCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full block" style={{ backgroundColor: "#73AF6F" }}></span>
                  <span>Absent: {absentCount}</span>
                </div>
              </div>
              <h5 className="mt-5 text-xxs text-gray-600">Track Employee Attendance Easily!</h5>
            </div>
          </ChartCard>


          {/* Keep Recent Leave Requests as is */}
          <ChartCard title="Regularization Requests" className="!shadow-sm !border !border-gray-200 !h-[24rem]">
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
                {regularizationRequests.length === 0 ? (
                  <p className="text-gray-500 text-center mt-8">No request found</p>
                ) : (
                  regularizationRequests.map((req, idx) => (
                    <div
                      key={req.id}
                      className={`flex items-center p-2.5 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } rounded-md border border-transparent hover:border-gray-200`}
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
                            {req.requestType}
                          </div>
                          <div className="text-xxs text-gray-400">
                            {format(new Date(req.requestDate), "dd MMM yyyy")}
                          </div>
                          <div
                            className={`mt-1 text-[10px] px-2 py-0.5 rounded-full ${req.status === "Approved"
                                ? "bg-[#effaf3] text-[#2f7d4f]"
                                : "bg-[#fff8ed] text-[#9a5d1d]"
                              }`}
                          >
                            {req.status}
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
          <ChartCard
            title="Monthly Attendance Overview"
            className="md:col-span-2 !shadow-sm !border !border-gray-200 !h-[24rem]"
          >
            <Bar
              data={dummyData.monthlyAttendanceOverview}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                  duration: 1000,
                  easing: "easeOutQuart",
                },
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    mode: "index",
                    intersect: false,
                    backgroundColor: "rgba(0,0,0,0.8)",
                    titleFont: { size: 14, weight: "bold" },
                    bodyFont: { size: 12 },
                    padding: 10,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                      label: (context) => `${context.dataset.label}: ${context.parsed.y}%`,
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      stepSize: 10,
                      color: "#666",
                      font: { size: 12 },
                    },
                    grid: { color: "rgba(0,0,0,0.06)" },
                  },
                  x: {
                    ticks: {
                      font: { size: 12 },
                      color: "#444",
                    },
                    grid: {
                      display: false,
                    },
                    offset: true,
                  },
                },
                elements: {
                    bar: {
                      barThickness: 10,
                      borderRadius: 6,
                      borderSkipped: false,
                    },
                  }
              }}
              height={110}
            />
          </ChartCard>


          <ChartCard title="Attendance Exceptions Breakdown" className="!shadow-sm !border !border-gray-200 !h-[24rem]">
            <div className="w-full flex justify-center">
              <div className="w-[300px] h-[300px]">
                <Doughnut
                  data={dummyData.attendanceExceptions}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: "70%",
                    plugins: {
                      legend: { position: "bottom", labels: { font: { size: 11 } } },
                      tooltip: {
                        callbacks: {
                          label: (ctx) => `${ctx.label}: ${ctx.parsed}`,
                        },
                      },
                    },
                  }}
                  width={180}
                  height={180}
                />
              </div>
            </div>
          </ChartCard>


        </section>
      </div>
      </div>
    </Layout>
  );
}
