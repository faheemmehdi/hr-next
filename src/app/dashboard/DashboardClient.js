"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "y@/app/components/Layout";
import Button from "y@/app/components/Button";
import SearchBar from "y@/app/components/SearchBar";
import CustomSelect from "y@/app/components/CustomSelect";
import Modal from "y@/app/components/ModalShell";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import {
  FiCheckSquare,
  FiDownload,
  FiRefreshCw,
  FiSettings,
  FiUserCheck,
  FiUserPlus,
  FiUsers,
  FiGift,
  FiClock,
  FiClipboard,
  FiArrowUpRight,
  FiBriefcase,
  FiCalendar,
  FiDollarSign,
  FiFileText,
  FiCreditCard,
  FiAlertCircle,
} from "react-icons/fi";
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const STORAGE_KEY = "hr_dashboard_layout_v1";

const WIDGET_DEFS = [
  {
    id: "headcount",
    title: "Headcount",
    subtitle: "Active employees",
    icon: FiUsers,
    iconBg: "bg-[#edf4ff]",
    iconColor: "text-[#315d9c]",
    lineColor: "#4c8fff",
    trend: [42, 47, 44, 51, 56, 60],
  },
  {
    id: "new-hires",
    title: "New Hires",
    subtitle: "Joined in selected period",
    icon: FiUserPlus,
    iconBg: "bg-[#effaf3]",
    iconColor: "text-[#2f7d4f]",
    lineColor: "#3fae72",
    trend: [3, 4, 2, 5, 4, 6],
  },
  {
    id: "attendance-today",
    title: "Attendance Today",
    subtitle: "Present employees",
    icon: FiUserCheck,
    iconBg: "bg-[#eef9ff]",
    iconColor: "text-[#0f6f8f]",
    lineColor: "#2b95b5",
    trend: [86, 88, 84, 90, 92, 91],
  },
  {
    id: "leave-today",
    title: "Leave Today",
    subtitle: "On approved leave",
    icon: FiClock,
    iconBg: "bg-[#fff8ed]",
    iconColor: "text-[#9a5d1d]",
    lineColor: "#d08b35",
    trend: [5, 7, 6, 4, 8, 6],
  },
  {
    id: "birthdays",
    title: "Birthdays",
    subtitle: "Celebrations in period",
    icon: FiGift,
    iconBg: "bg-[#fff1f6]",
    iconColor: "text-[#a43f73]",
    lineColor: "#cc5f96",
    trend: [1, 2, 3, 2, 4, 3],
  },
  {
    id: "pending-approvals",
    title: "Pending Approvals",
    subtitle: "Leaves, expenses, contracts",
    icon: FiClipboard,
    iconBg: "bg-[#f5f4ff]",
    iconColor: "text-[#5f54b7]",
    lineColor: "#7b70d8",
    trend: [12, 10, 11, 9, 8, 7],
  },
  {
    id: "open-positions",
    title: "Open Positions",
    subtitle: "Active recruitment jobs",
    icon: FiBriefcase,
    iconBg: "bg-[#edf8ff]",
    iconColor: "text-[#226d9f]",
    lineColor: "#3e9bd8",
    trend: [14, 15, 13, 12, 11, 10],
  },
  {
    id: "interviews-today",
    title: "Interviews Today",
    subtitle: "Scheduled interview slots",
    icon: FiCalendar,
    iconBg: "bg-[#f2f8ff]",
    iconColor: "text-[#2d5f99]",
    lineColor: "#5b8fce",
    trend: [5, 7, 6, 8, 7, 9],
  },
  {
    id: "expense-claims",
    title: "Expense Claims",
    subtitle: "Submitted claims queue",
    icon: FiDollarSign,
    iconBg: "bg-[#f4fff8]",
    iconColor: "text-[#2f8655]",
    lineColor: "#48af79",
    trend: [21, 24, 20, 26, 23, 19],
  },
  {
    id: "payroll-run-status",
    title: "Payroll Runs",
    subtitle: "Upcoming payroll actions",
    icon: FiCreditCard,
    iconBg: "bg-[#fff7ef]",
    iconColor: "text-[#9e5e1a]",
    lineColor: "#d48b3f",
    trend: [2, 2, 3, 2, 1, 2],
  },
  {
    id: "contracts-expiring",
    title: "Contracts Expiring",
    subtitle: "Due for renewal soon",
    icon: FiFileText,
    iconBg: "bg-[#fff2f5]",
    iconColor: "text-[#a24d68]",
    lineColor: "#cf6f8e",
    trend: [6, 5, 7, 9, 8, 7],
  },
  {
    id: "pending-regularizations",
    title: "Regularizations",
    subtitle: "Attendance correction queue",
    icon: FiAlertCircle,
    iconBg: "bg-[#fff3f1]",
    iconColor: "text-[#ab4e41]",
    lineColor: "#d67567",
    trend: [11, 9, 13, 10, 8, 7],
  },
  {
    id: "timesheet-approvals",
    title: "Timesheet Approvals",
    subtitle: "Awaiting manager approval",
    icon: FiCheckSquare,
    iconBg: "bg-[#eef7ff]",
    iconColor: "text-[#2f6aa3]",
    lineColor: "#5d97cf",
    trend: [29, 26, 28, 22, 19, 17],
  },
  {
    id: "leave-balance-alerts",
    title: "Leave Balance Alerts",
    subtitle: "Low balance employees",
    icon: FiCalendar,
    iconBg: "bg-[#fff8ef]",
    iconColor: "text-[#986225]",
    lineColor: "#d49a58",
    trend: [14, 13, 12, 11, 10, 9],
  },
  {
    id: "overtime-hours",
    title: "Overtime Hours",
    subtitle: "Tracked overtime load",
    icon: FiClock,
    iconBg: "bg-[#f2f9ff]",
    iconColor: "text-[#2d6f94]",
    lineColor: "#53a0cd",
    trend: [42, 38, 47, 44, 36, 33],
  },
  {
    id: "loan-deductions",
    title: "Loan Deductions",
    subtitle: "Payroll loan recoveries",
    icon: FiCreditCard,
    iconBg: "bg-[#f7f4ff]",
    iconColor: "text-[#6650ba]",
    lineColor: "#8773dd",
    trend: [16, 17, 18, 17, 15, 14],
  },
];

const METRICS_BY_RANGE = {
  today: {
    headcount: { value: "248", delta: "+2.1%", isPositive: true },
    "new-hires": { value: "3", delta: "+1", isPositive: true },
    "attendance-today": { value: "91%", delta: "+4.0%", isPositive: true },
    "leave-today": { value: "6", delta: "-2", isPositive: true },
    birthdays: { value: "2", delta: "0", isPositive: true },
    "pending-approvals": { value: "17", delta: "+3", isPositive: false },
    "open-positions": { value: "10", delta: "-2", isPositive: true },
    "interviews-today": { value: "9", delta: "+2", isPositive: true },
    "expense-claims": { value: "19", delta: "-4", isPositive: true },
    "payroll-run-status": { value: "2", delta: "0", isPositive: true },
    "contracts-expiring": { value: "7", delta: "+1", isPositive: false },
    "pending-regularizations": { value: "7", delta: "-3", isPositive: true },
    "timesheet-approvals": { value: "17", delta: "-2", isPositive: true },
    "leave-balance-alerts": { value: "9", delta: "-1", isPositive: true },
    "overtime-hours": { value: "33", delta: "-11", isPositive: true },
    "loan-deductions": { value: "14", delta: "-1", isPositive: true },
  },
  week: {
    headcount: { value: "247", delta: "+1.7%", isPositive: true },
    "new-hires": { value: "8", delta: "+2", isPositive: true },
    "attendance-today": { value: "89%", delta: "+2.5%", isPositive: true },
    "leave-today": { value: "27", delta: "-4", isPositive: true },
    birthdays: { value: "5", delta: "+1", isPositive: true },
    "pending-approvals": { value: "26", delta: "-2", isPositive: true },
    "open-positions": { value: "12", delta: "-1", isPositive: true },
    "interviews-today": { value: "34", delta: "+6", isPositive: true },
    "expense-claims": { value: "87", delta: "+9", isPositive: false },
    "payroll-run-status": { value: "3", delta: "+1", isPositive: false },
    "contracts-expiring": { value: "18", delta: "+2", isPositive: false },
    "pending-regularizations": { value: "49", delta: "-6", isPositive: true },
    "timesheet-approvals": { value: "113", delta: "-18", isPositive: true },
    "leave-balance-alerts": { value: "57", delta: "-5", isPositive: true },
    "overtime-hours": { value: "284", delta: "+21", isPositive: false },
    "loan-deductions": { value: "96", delta: "+4", isPositive: false },
  },
  month: {
    headcount: { value: "244", delta: "+4.3%", isPositive: true },
    "new-hires": { value: "19", delta: "+5", isPositive: true },
    "attendance-today": { value: "88%", delta: "+1.1%", isPositive: true },
    "leave-today": { value: "102", delta: "+9", isPositive: false },
    birthdays: { value: "18", delta: "+3", isPositive: true },
    "pending-approvals": { value: "31", delta: "-6", isPositive: true },
    "open-positions": { value: "27", delta: "-5", isPositive: true },
    "interviews-today": { value: "118", delta: "+21", isPositive: true },
    "expense-claims": { value: "241", delta: "+17", isPositive: false },
    "payroll-run-status": { value: "8", delta: "+2", isPositive: false },
    "contracts-expiring": { value: "41", delta: "+6", isPositive: false },
    "pending-regularizations": { value: "196", delta: "-31", isPositive: true },
    "timesheet-approvals": { value: "422", delta: "-64", isPositive: true },
    "leave-balance-alerts": { value: "219", delta: "-22", isPositive: true },
    "overtime-hours": { value: "1183", delta: "+94", isPositive: false },
    "loan-deductions": { value: "387", delta: "+27", isPositive: false },
  },
};

function SparklineMini({ points, color, id }) {
  const width = 230;
  const height = 46;
  const paddingX = 6;
  const paddingY = 5;
  const baseY = height - paddingY;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = Math.max(1, max - min);

  const mapped = points.map((point, idx) => {
    const x = paddingX + (idx * (width - paddingX * 2)) / Math.max(1, points.length - 1);
    const y = baseY - ((point - min) / span) * (height - paddingY * 2);
    return { x, y };
  });

  const linePoints = mapped.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPath = `M ${mapped[0].x} ${baseY} L ${linePoints} L ${
    mapped[mapped.length - 1].x
  } ${baseY} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-12">
      <defs>
        <linearGradient id={`grad-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.34" />
          <stop offset="100%" stopColor={color} stopOpacity="0.04" />
        </linearGradient>
        <filter id={`glow-${id}`}>
          <feGaussianBlur stdDeviation="2.2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <line x1={0} y1={baseY - 22} x2={width} y2={baseY - 22} stroke="#eef2f7" strokeWidth="1" />
      <line x1={0} y1={baseY - 10} x2={width} y2={baseY - 10} stroke="#f3f5f9" strokeWidth="1" />
      <path d={areaPath} fill={`url(#grad-${id})`} />
      <polyline
        points={linePoints}
        fill="none"
        stroke={color}
        opacity="0.18"
        strokeWidth="5.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points={linePoints}
        fill="none"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#glow-${id})`}
      />
      {mapped.map((p, idx) => (
        <circle
          key={`${id}-dot-${idx}`}
          cx={p.x}
          cy={p.y}
          r={idx === mapped.length - 1 ? 2.8 : 2}
          fill={idx === mapped.length - 1 ? color : "#ffffff"}
          stroke={color}
          strokeWidth={1.2}
        />
      ))}
    </svg>
  );
}

function SortableWidgetCard({ widget, metric, config }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: widget.id,
  });
  const Icon = widget.icon;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={`rounded-xl bg-white/95 p-4 shadow-sm ring-1 ring-gray-100 transition hover:shadow-md hover:-translate-y-0.5 cursor-grab ${
        isDragging ? "shadow-lg ring-2 ring-[#dbe8ff] cursor-grabbing" : ""
      }`}
    >
      <div
        className="h-1.5 rounded-full mb-3"
        style={{
          background: `linear-gradient(90deg, ${widget.lineColor}33 0%, ${widget.lineColor}11 100%)`,
        }}
      />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xxs text-gray-500">{widget.subtitle}</p>
          <h3 className="text-sm font-semibold text-gray-800">{widget.title}</h3>
        </div>
        <span
          className={`h-10 w-10 rounded-full ${widget.iconBg} ring-1 ring-black/5 shadow-sm flex items-center justify-center`}
        >
          <Icon className={`${widget.iconColor} text-sm`} />
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <p className="text-xl font-semibold text-gray-800">{metric.value}</p>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold ${
            metric.isPositive
              ? "bg-[#effaf3] text-[#2f7d4f]"
              : "bg-[#fff3f3] text-[#a03a3a]"
          }`}
        >
          <FiArrowUpRight size={11} className={!metric.isPositive ? "rotate-90" : ""} />
          {metric.delta}
        </span>
      </div>

      {config?.showTrend !== false && (
        <div className="mt-4 rounded-lg bg-gradient-to-b from-white to-gray-50/60 px-2 py-1">
          <div className="px-1">
            <span className="text-[10px] text-gray-500">Recent 6 periods</span>
          </div>
          <SparklineMini points={widget.trend} color={widget.lineColor} id={widget.id} />
        </div>
      )}
    </div>
  );
}

export default function DashboardClient() {
  const router = useRouter();
  const sensors = useSensors(useSensor(PointerSensor));

  const [layout, setLayout] = useState(WIDGET_DEFS.map((w) => w.id));
  const [visibleMap, setVisibleMap] = useState(
    WIDGET_DEFS.reduce((acc, w) => ({ ...acc, [w.id]: true }), {})
  );
  const [widgetConfig, setWidgetConfig] = useState(
    WIDGET_DEFS.reduce(
      (acc, w) => ({
        ...acc,
        [w.id]: { showTrend: true, highlightThreshold: "" },
      }),
      {}
    )
  );
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [range, setRange] = useState("today");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchResetKey, setSearchResetKey] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.layout) && parsed.layout.length) {
        const defaults = WIDGET_DEFS.map((w) => w.id);
        const sanitized = parsed.layout.filter((id) => defaults.includes(id));
        const merged = [...sanitized, ...defaults.filter((id) => !sanitized.includes(id))];
        setLayout(merged);
      }
      if (parsed.visibleMap && typeof parsed.visibleMap === "object") {
        setVisibleMap((prev) => ({ ...prev, ...parsed.visibleMap }));
      }
      if (parsed.widgetConfig && typeof parsed.widgetConfig === "object") {
        setWidgetConfig((prev) => ({ ...prev, ...parsed.widgetConfig }));
      }
    } catch {
      // Keep default dashboard layout if persisted data cannot be read.
    }
    setLastUpdated(new Date().toLocaleString());
  }, []);

  useEffect(() => {
    const payload = JSON.stringify({ layout, visibleMap, widgetConfig });
    localStorage.setItem(STORAGE_KEY, payload);
  }, [layout, visibleMap, widgetConfig]);

  const rangeOptions = mapSelectOptions(
    [
      { id: "today", name: "Today" },
      { id: "week", name: "This Week" },
      { id: "month", name: "This Month" },
    ],
    "id",
    "name"
  );

  const departmentOptions = mapSelectOptions(
    [
      { id: "Engineering", name: "Engineering" },
      { id: "HR", name: "HR" },
      { id: "Finance", name: "Finance" },
      { id: "Operations", name: "Operations" },
    ],
    "id",
    "name"
  );

  const locationOptions = mapSelectOptions(
    [
      { id: "HQ", name: "HQ" },
      { id: "Remote", name: "Remote" },
      { id: "Hybrid", name: "Hybrid" },
    ],
    "id",
    "name"
  );

  const orderedWidgets = useMemo(() => {
    const mapById = new Map(WIDGET_DEFS.map((w) => [w.id, w]));
    return layout.map((id) => mapById.get(id)).filter(Boolean);
  }, [layout]);

  const visibleWidgets = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orderedWidgets.filter((w) => {
      const matchesSearch =
        !q || w.title.toLowerCase().includes(q) || w.subtitle.toLowerCase().includes(q);
      return Boolean(visibleMap[w.id]) && matchesSearch;
    });
  }, [orderedWidgets, visibleMap, search]);

  const scopedMetrics = useMemo(() => {
    const deptFactorMap = {
      Engineering: 1.06,
      HR: 0.92,
      Finance: 0.95,
      Operations: 1.02,
    };
    const locationFactorMap = {
      HQ: 1.03,
      Remote: 0.94,
      Hybrid: 1.0,
    };

    const deptFactor = department ? deptFactorMap[department] || 1 : 1;
    const locationFactor = location ? locationFactorMap[location] || 1 : 1;
    const factor = deptFactor * locationFactor;

    const formatMetricValue = (raw) => {
      const isPercent = raw.includes("%");
      const numeric = Number(raw.replace("%", ""));
      if (Number.isNaN(numeric)) return raw;
      const adjusted = Math.max(0, numeric * factor);
      if (isPercent) return `${Math.round(adjusted)}%`;
      return String(Math.round(adjusted));
    };

    const scoped = {};
    for (const [id, metric] of Object.entries(METRICS_BY_RANGE[range])) {
      scoped[id] = {
        ...metric,
        value: formatMetricValue(metric.value),
      };
    }
    return scoped;
  }, [range, department, location]);

  const totalWidgets = WIDGET_DEFS.length;
  const activeWidgets = visibleWidgets.length;
  const positiveCount = visibleWidgets.filter((w) => scopedMetrics[w.id]?.isPositive).length;
  const healthScore = activeWidgets ? Math.round((positiveCount / activeWidgets) * 100) : 0;

  const onDragEnd = useCallback((event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setLayout((prev) => {
      const oldIdx = prev.indexOf(active.id);
      const newIdx = prev.indexOf(over.id);
      if (oldIdx < 0 || newIdx < 0) return prev;
      return arrayMove(prev, oldIdx, newIdx);
    });
  }, []);

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date().toLocaleString());
    }, 700);
  };

  const exportSnapshot = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      filters: { range, department: department || "All", location: location || "All" },
      widgets: visibleWidgets.map((w) => ({
        id: w.id,
        title: w.title,
        value: scopedMetrics[w.id].value,
        delta: scopedMetrics[w.id].delta,
      })),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dashboard_snapshot.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="relative overflow-hidden bg-white w-full rounded-lg shadow-sm border border-gray-200 min-h-[90vh] p-6">
        <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#eef5ff] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-[#f6f9ff] blur-3xl" />

        <div className="relative flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="pt-1">
            <h2 className="text-lg font-semibold text-gray-800">Org Dashboard</h2>
            <p className="text-xxs text-gray-500 mt-1">
              HR KPIs with draggable widgets, saved layouts, and quick filters.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="primary" onClick={() => router.push("/quick-add")}>
              <span className="inline-flex items-center gap-1.5">
                <FiCheckSquare size={13} />
                Quick Add
              </span>
            </Button>
            <Button type="button" variant="secondary" onClick={() => setIsCustomizeOpen(true)}>
              <span className="inline-flex items-center gap-1.5">
                <FiSettings size={13} />
                Customize Widgets
              </span>
            </Button>
            <Button type="button" variant="cancel" onClick={exportSnapshot}>
              <span className="inline-flex items-center gap-1.5">
                <FiDownload size={13} />
                Export Snapshot
              </span>
            </Button>
            <Button type="button" variant="success" onClick={refreshData}>
              <span className="inline-flex items-center gap-1.5">
                <FiRefreshCw size={13} className={isRefreshing ? "animate-spin" : ""} />
                Refresh
              </span>
            </Button>
          </div>
        </div>

        <div className="relative mt-4 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-3 items-center">
          <div className="max-w-sm">
            <SearchBar
              key={`dashboard-search-${searchResetKey}`}
              placeholder="Search widgets..."
              onSearch={setSearch}
            />
          </div>
          <div className="flex items-center justify-start lg:justify-end flex-wrap gap-2">
            <div className="w-full sm:w-[9rem]">
              <CustomSelect
                name="dashboard_range"
                value={range}
                onChange={setRange}
                placeholder="Range"
                options={rangeOptions}
                controlHeight="2rem"
              />
            </div>
            <div className="w-full sm:w-[9rem]">
              <CustomSelect
                name="dashboard_department"
                value={department}
                onChange={setDepartment}
                placeholder="Department"
                options={departmentOptions}
                controlHeight="2rem"
              />
            </div>
            <div className="w-full sm:w-[9rem]">
              <CustomSelect
                name="dashboard_location"
                value={location}
                onChange={setLocation}
                placeholder="Location"
                options={locationOptions}
                controlHeight="2rem"
              />
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-[#edf4ff] text-[#315d9c] px-3 py-1 text-[10px] font-semibold">
            Visible: {activeWidgets} / {totalWidgets}
          </span>
          <span className="inline-flex items-center rounded-full bg-[#effaf3] text-[#2f7d4f] px-3 py-1 text-[10px] font-semibold">
            Health: {healthScore}% Positive Trend
          </span>
          <span className="inline-flex items-center rounded-full bg-white text-gray-700 px-3 py-1 text-[10px] font-semibold ring-1 ring-gray-200">
            Scope: <span className="ml-1">{department || "All Departments"} | {location || "All Locations"}</span>
          </span>
        </div>

        <div className="flex items-center justify-between mt-3 mb-3">
          <p className="text-[10px] text-gray-500">
            {lastUpdated ? `Last updated: ${lastUpdated}` : "Last updated: --"}
          </p>
          <button
            type="button"
            className="text-[10px] text-[#315d9c] cursor-pointer hover:underline"
            onClick={() => {
              setSearch("");
              setRange("today");
              setDepartment("");
              setLocation("");
              setSearchResetKey((prev) => prev + 1);
            }}
          >
            Clear quick filters
          </button>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={visibleWidgets.map((w) => w.id)} strategy={rectSortingStrategy}>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {visibleWidgets.map((widget) => (
                <SortableWidgetCard
                  key={widget.id}
                  widget={widget}
                  metric={scopedMetrics[widget.id]}
                  config={widgetConfig[widget.id]}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {visibleWidgets.length === 0 && (
          <div className="rounded border border-dashed border-gray-300 bg-gray-50 mt-3 p-6 text-center text-xxs text-gray-500">
            No widgets matched your filters. Use Customize Widgets or clear filters.
          </div>
        )}
      </div>

      {isCustomizeOpen && (
        <Modal width="w-full md:w-8/12">
          <div className="border-b border-gray-200 pb-3 mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Customize Widgets</h3>
            <p className="text-xxs text-gray-500">
              Configure visibility and widget behavior. Layout order is saved automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[58vh] overflow-y-auto pr-1">
            {orderedWidgets.map((widget) => (
              <div key={widget.id} className="rounded border border-gray-200 bg-gray-50 p-3">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{widget.title}</p>
                    <p className="text-[10px] text-gray-500">{widget.subtitle}</p>
                  </div>
                  <label className="inline-flex items-center gap-2 text-xxs text-gray-600">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      checked={Boolean(visibleMap[widget.id])}
                      onChange={(e) =>
                        setVisibleMap((prev) => ({ ...prev, [widget.id]: e.target.checked }))
                      }
                    />
                    Visible
                  </label>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <label className="inline-flex items-center gap-2 text-xxs text-gray-600">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      checked={widgetConfig[widget.id]?.showTrend !== false}
                      onChange={(e) =>
                        setWidgetConfig((prev) => ({
                          ...prev,
                          [widget.id]: { ...prev[widget.id], showTrend: e.target.checked },
                        }))
                      }
                    />
                    Show mini trend
                  </label>
                  <input
                    type="number"
                    placeholder="Alert threshold"
                    value={widgetConfig[widget.id]?.highlightThreshold || ""}
                    onChange={(e) =>
                      setWidgetConfig((prev) => ({
                        ...prev,
                        [widget.id]: {
                          ...prev[widget.id],
                          highlightThreshold: e.target.value,
                        },
                      }))
                    }
                    className="w-28 h-8 text-xxs px-2 rounded border border-gray-300 bg-white"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button
              type="button"
              variant="cancel"
              onClick={() => {
                setLayout(WIDGET_DEFS.map((w) => w.id));
                setVisibleMap(WIDGET_DEFS.reduce((acc, w) => ({ ...acc, [w.id]: true }), {}));
                setWidgetConfig(
                  WIDGET_DEFS.reduce(
                    (acc, w) => ({
                      ...acc,
                      [w.id]: { showTrend: true, highlightThreshold: "" },
                    }),
                    {}
                  )
                );
              }}
            >
              Reset Defaults
            </Button>
            <Button type="button" variant="success" onClick={() => setIsCustomizeOpen(false)}>
              Done
            </Button>
          </div>
        </Modal>
      )}
    </Layout>
  );
}
