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
import { FaMoneyBillWave, FaUserSlash, FaUserCheck } from "react-icons/fa";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import MonthPicker from "../components/MonthPicker";
import { ChartCard } from "../components/ChartCard";


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

const stats = [
    {
        title: "Total Payroll Cost",
        value: "2,540,000 PKR",
        icon: <FaMoneyBillWave className="text-blue-600 text-xl" />,
    },
    {
        title: "Total Deductions",
        value: "320,850 PKR",
        icon: <MdOutlineRemoveCircleOutline className="text-red-600 text-xl" />,
    },
    {
        title: "Net Salary Paid",
        value: "2,219,150 PKR",
        icon: <FaUserCheck className="text-green-600 text-xl" />,
    },
    {
        title: "Pending Salaries",
        value: 14,
        icon: <AiOutlineClockCircle className="text-amber-600 text-xl" />,
    },
    {
        title: "Excluded Employees",
        value: 9,
        icon: <FaUserSlash className="text-gray-600 text-xl" />,
    }
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
    totalPayrollExpense: {
        labels: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ],
        datasets: [
            {
                label: "Payroll Expense (₨ thousands)",
                data: [12000, 13000, 12500, 14000, 15000, 14500, 13500, 15500, 16000, 15800, 17000, 18000],
                backgroundColor: COLORS.gray[0],
                borderRadius: 5,
                maxBarThickness: 24,
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


export default function PayRoll() {
    const [topDeptFilter, setTopDeptFilter] = useState("Monthly");
    const [monthVal, setMonthVal] = useState("");


    return (
        <>
            <div className="flex justify-between text-lg p-1 mb-2">
                <h2>Payroll Dashboard</h2>
                <div className="w-full md:w-[11rem]">
                    <MonthPicker monthVal={monthVal} setMonthVal={setMonthVal} />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-2 mb-4">
                {stats.map((stat, idx) => (
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
                        title="Monthly Payroll Expense"
                        className="md:col-span-2"
                    >
                        <Bar
                            data={dummyData.totalPayrollExpense}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { display: false },
                                    tooltip: { mode: "index", intersect: false },
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        ticks: {
                                            callback: (v) => `₨${v}k`,
                                            font: { size: 11 },
                                        },
                                    },
                                    x: {
                                        ticks: { font: { size: 11 } },
                                    },
                                },
                            }}
                            height={110}
                        />
                    </ChartCard>

                    <ChartCard title="Earnings Breakdown">
                        <div className="w-full flex justify-center">
                            <div className="" style={{ width: 300, height: 300 }}>
                                <Doughnut
                                    data={dummyData.earningsBreakdown}
                                    options={{
                                        responsive: true,
                                        cutout: "72%",
                                        plugins: {
                                            legend: { position: "bottom", labels: { font: { size: 11 } } },
                                            tooltip: {
                                                callbacks: {
                                                    label: (ctx) =>
                                                        `${ctx.label}: ₨${ctx.parsed.toLocaleString()}`,
                                                },
                                            },
                                        },
                                    }}
                                    width={160}
                                    height={160}
                                />
                            </div>
                        </div>
                    </ChartCard>

                </section>

                <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">



                    <ChartCard title="Net Pay Distribution">
                        <div className="w-full flex justify-center">
                            <div className="" style={{ width: 300, height: 300 }}>
                                <Radar
                                    data={dummyData.netPayDistribution}
                                    options={{
                                        responsive: true,
                                        scales: {
                                            r: { angleLines: { display: true }, suggestedMin: 0, suggestedMax: 70 },
                                        },
                                        plugins: { legend: { display: false }, tooltip: { enabled: true } },
                                    }}
                                    height={180}
                                />
                            </div></div>
                    </ChartCard>
                    <ChartCard title="Payroll Status Overview">
                        <div className="w-full flex justify-center">
                            <div className="" style={{ width: 400, height: 330 }}>
                                <PolarArea
                                    data={dummyData.payrollStatus}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: { position: "right", labels: { font: { size: 11 } } },
                                        },
                                    }}
                                    height={130}
                                />
                            </div></div>
                    </ChartCard>

                    <ChartCard
                        title="Top 5 Departments by Payroll Cost"
                        filter={{ value: topDeptFilter }}
                        onFilterChange={setTopDeptFilter}
                    >
                        <div className="w-full flex justify-center">
                            <div className="" style={{ width: 400, height: 330 }}>
                                <Bar
                                    data={dummyData.topDepartmentsPayroll}
                                    options={{
                                        responsive: true,
                                        indexAxis: "y",
                                        plugins: {
                                            legend: { display: false },
                                            tooltip: { mode: "nearest" },
                                        },
                                        scales: {
                                            x: {
                                                beginAtZero: true,
                                                ticks: { font: { size: 11 } },
                                            },
                                            y: {
                                                ticks: { font: { size: 11 } },
                                            },
                                        },
                                    }}
                                    height={200}
                                />
                            </div></div>
                    </ChartCard>

                </section>

            </div>
        </>
    );
}



