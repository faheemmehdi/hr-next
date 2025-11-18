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

const FILTERS = ["Monthly", "Yearly"];
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
        "rgba(59, 130, 246, 0.8)",
        "rgba(96, 165, 250, 0.7)",
        "rgba(37, 99, 235, 0.9)",
    ],
    green: [
        "rgba(22, 163, 74, 0.85)",
        "rgba(34, 197, 94, 0.75)",
        "rgba(21, 128, 61, 0.9)",
    ],
    red: [
        "rgba(239, 68, 68, 0.85)",
        "rgba(248, 113, 113, 0.7)",
        "rgba(220, 38, 38, 0.9)",
    ],
    orange: [
        "rgba(249, 115, 22, 0.85)",
        "rgba(251, 191, 36, 0.7)",
        "rgba(202, 138, 4, 0.9)",
    ],
    gray: [
        "rgba(107, 114, 128, 0.7)",
        "rgba(75, 85, 99, 0.6)",
        "rgba(55, 65, 81, 0.8)",
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
                backgroundColor: COLORS.blue[0],
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
                data: [280, 40, 10],
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

    taxContribution: {
        labels: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ],
        datasets: [
            {
                label: "Tax Collected (₨ thousands)",
                data: [120, 130, 125, 140, 150, 145, 135, 155, 160, 158, 170, 180],
                fill: true,
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                borderColor: COLORS.red[2],
                borderWidth: 2,
                tension: 0.4,
            },
        ],
    },

    paymentModes: {
        labels: ["Bank Transfer", "Cheque", "Cash"],
        datasets: [
            {
                label: "Payments",
                data: [280, 30, 20],
                backgroundColor: [COLORS.blue[2], COLORS.gray[2], COLORS.orange[0]],
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
                backgroundColor: COLORS.blue,
                borderRadius: 6,
                maxBarThickness: 30,
            },
        ],
    },
};


export default function PayRoll() {
    const [payrollFilter, setPayrollFilter] = useState("Monthly");
    const [bonusFilter, setBonusFilter] = useState("Monthly");
    const [taxFilter, setTaxFilter] = useState("Monthly");
    const [employeeFilter, setEmployeeFilter] = useState("Yearly");
    const [topDeptFilter, setTopDeptFilter] = useState("Monthly");
    const [monthVal, setMonthVal] = useState("");


    return (
        <>
            <div className="flex justify-between text-lg p-1 mb-2">
                <h2>Payroll Dashboard</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-2">
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
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-2 flex justify-between items-center my-4">
                <span className="font-medium text-sm">Monthly Record</span>
                <div className="w-full md:w-[11rem] mb-1">
                    <MonthPicker monthVal={monthVal} setMonthVal={setMonthVal} />
                </div>
            </div>
            <div className="min-h-screen max-w-7xl mx-auto">


                <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ChartCard
                        title="Monthly Payroll Expense"
                        filter={{ value: payrollFilter }}
                        onFilterChange={setPayrollFilter}
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

                {/* <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <ChartCard
                        title="Monthly Payroll Expense"
                        filter={{ value: payrollFilter }}
                        onFilterChange={setPayrollFilter}
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
                            height={180}
                        />
                    </ChartCard>

                    <ChartCard title="Earnings Breakdown">
                        <Doughnut
                            data={dummyData.earningsBreakdown}
                            options={{
                                responsive: true,
                                cutout: "65%",
                                plugins: {
                                    legend: { position: "bottom", labels: { font: { size: 12 } } },
                                    tooltip: {
                                        callbacks: {
                                            label: (ctx) =>
                                                `${ctx.label}: ₨${ctx.parsed.toLocaleString()}`,
                                        },
                                    },
                                },
                            }}
                            width={180}
                            height={180}
                        />
                    </ChartCard>

                    <ChartCard title="Deductions Breakdown">
                        <Pie
                            data={dummyData.deductionsBreakdown}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { position: "bottom", labels: { font: { size: 12 } } },
                                    tooltip: {
                                        callbacks: {
                                            label: (ctx) =>
                                                `${ctx.label}: ₨${ctx.parsed.toLocaleString()}`,
                                        },
                                    },
                                },
                            }}
                            width={180}
                            height={180}
                        />
                    </ChartCard>

                    <ChartCard title="Net Pay Distribution">
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
                    </ChartCard>

                    <ChartCard title="Payroll Status Overview">
                        <PolarArea
                            data={dummyData.payrollStatus}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { position: "right", labels: { font: { size: 11 } } },
                                },
                            }}
                            height={180}
                        />
                    </ChartCard>

                    <ChartCard
                        title="Bonus Distribution by Department"
                        filter={{ value: bonusFilter }}
                        onFilterChange={setBonusFilter}
                    >
                        <Bar
                            data={dummyData.bonusDistribution}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { display: false },
                                    tooltip: { mode: "nearest" },
                                },
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
                            height={160}
                        />
                    </ChartCard>

                    <ChartCard
                        title="Monthly Tax Contribution"
                        filter={{ value: taxFilter }}
                        onFilterChange={setTaxFilter}
                    >
                        <Line
                            data={dummyData.taxContribution}
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
                            height={160}
                        />
                    </ChartCard>

                    <ChartCard title="Payment Modes Usage">
                        <Pie
                            data={dummyData.paymentModes}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { position: "bottom", labels: { font: { size: 12 } } },
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
                    </ChartCard>

                    <ChartCard
                        title="Employee Payroll Count Over Years"
                        filter={{ value: employeeFilter }}
                        onFilterChange={setEmployeeFilter}
                    >
                        <Line
                            data={dummyData.employeePayrollCount}
                            options={{
                                responsive: true,
                                plugins: { legend: { display: false } },
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
                            height={160}
                        />
                    </ChartCard>

                    <ChartCard
                        title="Top 5 Departments by Payroll Cost"
                        filter={{ value: topDeptFilter }}
                        onFilterChange={setTopDeptFilter}
                    >
                        <Bar
                            data={dummyData.topDepartmentsPayroll}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { display: false },
                                    tooltip: { mode: "nearest" },
                                },
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
                            height={160}
                        />
                    </ChartCard>
                </section> */}
            </div>
        </>
    );
}
function ChartCard({ title, children, className = "" }) {
    return (
        <div className={`bg-white rounded-lg shadow-lg p-6 flex flex-col h-96 ${className}`}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-sm text-gray-900">{title}</h3>
            </div>
            {children}
        </div>
    );
}


