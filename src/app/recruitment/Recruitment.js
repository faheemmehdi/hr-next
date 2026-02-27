"use client";

import Layout from "../components/Layout";
import { ChartCard } from "../components/ChartCard";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import {
    FiBriefcase,
    FiUsers,
    FiCalendar,
    FiCheckCircle,
    FiClock,
    FiTrendingUp,
} from "react-icons/fi";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend
);

const recruitmentStats = [
    { title: "Active Jobs", value: 156, icon: <FiBriefcase className="text-blue-600" /> },
    { title: "Applicants in Pipeline", value: 25, icon: <FiUsers className="text-cyan-500" /> },
    { title: "Interviews Scheduled", value: 110, icon: <FiCalendar className="text-amber-500" /> },
    { title: "Offers Extended", value: 21, icon: <FiCheckCircle className="text-emerald-600" /> },
    { title: "Avg. Time to Hire (Days)", value: 18, icon: <FiClock className="text-violet-500" /> },
];

const jobStatusData = {
    labels: ["Open", "Screening", "Interview", "Offer", "Closed"],
    datasets: [
        {
            data: [18, 12, 9, 5, 11],
            backgroundColor: [
                "#0ea5e9",
                "#38bdf8",
                "#facc15",
                "#34d399",
                "#a855f7",
            ],
            hoverOffset: 18,
        },
    ],
};

const pipelineData = {
    labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    datasets: [
        {
            label: "New Applicants",
            data: [42, 57, 63, 84, 92, 104],
            borderColor: "#2563eb",
            backgroundColor: "rgba(37, 99, 235, 0.26)",
            borderWidth: 3,
            tension: 0.35,
            pointRadius: 4,
        },
        {
            label: "Advanced to Interview",
            data: [18, 24, 28, 32, 37, 44],
            borderColor: "#0ea5e9",
            backgroundColor: "rgba(14, 165, 233, 0.2)",
            borderWidth: 3,
            tension: 0.35,
            pointRadius: 4,
        },
    ],
};

const interviewOutcomeData = {
    labels: ["Passed", "Borderline", "Rejected"],
    datasets: [
        {
            label: "Interviews (Last 6 weeks)",
            data: [32, 10, 18],
            backgroundColor: ["#22c55e", "#eab308", "#ef4444"],
        },
    ],
};

const applicantSources = [
    { name: "LinkedIn", value: 38, color: "#2563eb" },
    { name: "Employee Referrals", value: 26, color: "#10b981" },
    { name: "Company Website", value: 14, color: "#6366f1" },
    { name: "Job Boards", value: 12, color: "#f97316" },
    { name: "University Drives", value: 6, color: "#ec4899" },
];

const hiringDepartments = [
    { department: "Engineering", roles: 6, focus: "+2 since Jan" },
    { department: "Sales", roles: 4, focus: "High priority" },
    { department: "HR", roles: 3, focus: "Onboarding wave" },
    { department: "Finance", roles: 2, focus: "Replacing two exits" },
];

const upcomingInterviews = [
    {
        candidate: "Ayesha Malik",
        role: "Lead Product Designer",
        time: "Today · 11:00 AM",
        stage: "Stage 2 - Portfolio Review",
        flag: "High priority",
    },
    {
        candidate: "Haroon Siddiqui",
        role: "Backend Engineer",
        time: "Today · 2:30 PM",
        stage: "Stage 1 - Technical",
        flag: "Urgent",
    },
    {
        candidate: "Farah Rahman",
        role: "Talent Acquisition Partner",
        time: "Feb 26 · 10:30 AM",
        stage: "Stage 1 - Culture Fit",
        flag: "Panel interview",
    },
    {
        candidate: "Zain Qureshi",
        role: "Senior Accountant",
        time: "Mar 2 · 4:00 PM",
        stage: "Stage 1 - HR",
        flag: "Second pass",
    },
    {
        candidate: "Sana Butt",
        role: "Marketing Associate",
        time: "Mar 4 · 9:00 AM",
        stage: "Stage 3 - Final",
        flag: "Offer ready",
    },
];

const conversionStages = [
    { label: "Applied", value: 100 },
    { label: "Screened", value: 48 },
    { label: "Interviewed", value: 23 },
    { label: "Offer", value: 8 },
];

export default function RecruitmentDashboard() {
    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Recruitment Intelligence
                            </h2>
                            <p className="text-xxs text-gray-500">
                                A consolidated view of jobs, applicants, and interviews for the
                                recruitment team.
                            </p>
                        </div>
                        <div className="text-xxs text-gray-500">
                            Updated Feb 24, 2026 · {" "}
                            <span className="font-semibold text-gray-700">Live feed</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-2 mb-4">
                        {recruitmentStats.map((stat, idx) => (
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

                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <ChartCard title="Job Status Snapshot">
                            <div className="flex-1 flex flex-col items-center">
                                <Doughnut
                                    data={jobStatusData}
                                    options={{
                                        responsive: true,
                                        plugins: { legend: { position: "bottom" } },
                                    }}
                                    width={200}
                                    height={200}
                                />
                                <p className="text-xs text-gray-500 mt-3">
                                    Tracks every open role from screening to closure.
                                </p>
                            </div>
                        </ChartCard>

                        <ChartCard title="Applicant Pipeline" className="lg:col-span-2">
                            <div className="w-full flex justify-center">
                                <div className="w-full max-w-4xl">
                                    <Line
                                        data={pipelineData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            plugins: {
                                                tooltip: { mode: "index", intersect: false },
                                                legend: { position: "top" },
                                            },
                                            scales: {
                                                y: {
                                                    beginAtZero: true,
                                                    grid: { color: "rgba(148, 163, 184, 0.2)" },
                                                    ticks: { color: "#475569" },
                                                },
                                                x: {
                                                    grid: { display: false },
                                                    ticks: { color: "#475569" },
                                                },
                                            },
                                        }}
                                        height={230}
                                    />
                                </div>
                            </div>
                        </ChartCard>
                    </section>

                    <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                        <ChartCard title="Interview Outcomes" className="xl:col-span-1">
                            <div className="w-full flex justify-center">
                                <div className="w-full max-w-sm">
                                    <Bar
                                        data={interviewOutcomeData}
                                        options={{
                                            responsive: true,
                                            scales: {
                                                y: { beginAtZero: true, grid: { color: "rgba(148, 163, 184, 0.3)" } },
                                                x: { grid: { display: false } },
                                            },
                                            plugins: {
                                                legend: { display: false },
                                                tooltip: { callbacks: { label: (ctx) => `${ctx.parsed.y} candidates` } },
                                            },
                                        }}
                                        height={220}
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-3">
                                Shows how interviews conclude over the last six weeks.
                            </p>
                        </ChartCard>

                        <ChartCard title="Applicant Sources" className="xl:col-span-2">
                            <div className="space-y-4">
                                {applicantSources.map((source) => (
                                    <div key={source.name} className="flex flex-col gap-1">
                                        <div className="flex justify-between text-xs font-semibold text-gray-600">
                                            <span>{source.name}</span>
                                            <span>{source.value}%</span>
                                        </div>
                                        <div className="h-1 w-full rounded-full bg-gray-200 overflow-hidden">
                                            <div
                                                style={{ width: `${source.value}%`, background: source.color }}
                                                className="h-full"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ChartCard>
                    </section>

                    <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                        <ChartCard title="Top Hiring Departments" className="xl:col-span-2">
                            <div className="space-y-3">
                                {hiringDepartments.map((dept) => (
                                    <div
                                        key={dept.department}
                                        className="flex items-center justify-between border-b border-dashed border-gray-200 pb-4"
                                    >
                                        <div>
                                            <p className="text-sm font-semibold text-gray-800">{dept.department}</p>
                                            <p className="text-xs text-gray-500">{dept.focus}</p>
                                        </div>
                                        <div className="text-sm font-semibold text-gray-900">{dept.roles} roles</div>
                                    </div>
                                ))}
                            </div>
                        </ChartCard>

                        <ChartCard title="Stage Conversion Rate" className="xl:col-span-1">
                            <div className="space-y-3 pt-2">
                                {conversionStages.map((stage) => (
                                    <div key={stage.label} className="space-y-1">
                                        <div className="flex items-center justify-between text-xs font-semibold text-gray-600">
                                            <span>{stage.label}</span>
                                            <span>{stage.value}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                style={{ width: `${stage.value}%` }}
                                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ChartCard>
                    </section>

                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <ChartCard title="Upcoming Interviews">
                            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
                                {upcomingInterviews.map((interview) => (
                                    <div
                                        key={interview.candidate}
                                        className="flex items-start justify-between gap-4"
                                    >
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-semibold text-gray-900">
                                                {interview.candidate}
                                            </p>
                                            <p className="text-xs text-gray-500">{interview.role}</p>
                                            <p className="text-xxs text-gray-500">{interview.stage}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-semibold text-gray-700">{interview.time}</p>
                                            <p className="text-xxs text-amber-600">{interview.flag}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ChartCard>

                        <ChartCard title="Momentum Builder" className="flex flex-col">
                            <div className="flex-1 flex flex-col justify-between">
                                <p className="text-sm text-gray-500">
                                    Focus areas for the coming weeks include ramping up screening and
                                    keeping today’s pipeline flowing smoothly.
                                </p>
                                <div className="flex items-center gap-3">
                                    <FiTrendingUp className="text-emerald-500" />
                                    <p className="text-sm font-semibold text-gray-800">
                                        18% boost in candidate throughput
                                    </p>
                                </div>
                                <div className="text-xs text-gray-500">
                                    Sustainable ramp-up by reinforcing applicant engagement and
                                    interviewer availability.
                                </div>
                            </div>
                        </ChartCard>
                    </section>
                </div>
            </div>
        </Layout>
    );
}
