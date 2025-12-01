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
    AiOutlineFileText,
    AiOutlineClockCircle,
    AiOutlineCheckCircle,
    AiOutlineCloseCircle,
    AiOutlineUser
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

const leaveStats = [
    { title: "Total Leave Requests", value: 156, icon: <AiOutlineFileText className="text-blue-600" /> },
    { title: "Pending Approvals", value: 25, icon: <AiOutlineClockCircle className="text-yellow-500" /> },
    { title: "Approved Leaves", value: 110, icon: <AiOutlineCheckCircle className="text-green-600" /> },
    { title: "Rejected Leaves", value: 21, icon: <AiOutlineCloseCircle className="text-red-600" /> },
    { title: "Employees Currently on Leave", value: 18, icon: <AiOutlineUser className="text-indigo-600" /> },
];


const dummyData = {
    monthlyLeaveRequests: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Casual",
                data: [12, 15, 14, 18, 20, 25, 22, 17, 19, 23, 26, 30],
                backgroundColor: "rgba(59, 130, 246, 0.6)",  // Medium Blue
            },
            {
                label: "Sick",
                data: [5, 6, 7, 4, 8, 6, 7, 5, 6, 4, 8, 7],
                backgroundColor: "rgba(202, 138, 4, 0.6)",   // Golden Yellow
            },
            {
                label: "Paid",
                data: [20, 25, 22, 28, 30, 35, 33, 31, 29, 30, 35, 38],
                backgroundColor: "rgba(5, 150, 105, 0.6)",   // Deep Teal
            },
            {
                label: "Unpaid",
                data: [3, 2, 4, 3, 5, 4, 3, 4, 5, 6, 3, 4],
                backgroundColor: "rgba(219, 39, 119, 0.6)",  // Rich Pink/Magenta
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
    leaveStatuses: {
        labels: ["Approved", "Pending", "Rejected"],
        datasets: [
            {
                label: "Leaves",
                data: [70, 30, 20],
                backgroundColor: [
                    "#48a090",  // Soft Teal
                    "#f5b041",  // Warm Amber
                    "#dc5a5a",  // Muted Coral Red
                ],

                hoverOffset: 20,
            },
        ],
    },

};


export default function Leaves() {
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
                <h2>Leaves Dashboard</h2>

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-2 mb-4">
                {leaveStats.map((stat, idx) => (
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
                                    data={dummyData.leaveStatuses}
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


