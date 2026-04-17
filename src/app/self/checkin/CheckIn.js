"use client";
import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import Layout from "y@/app/components/Layout";
import CustomSelect from "y@/app/components/CustomSelect";
import SearchBar from "y@/app/components/SearchBar";
import StatusDesign from "y@/app/components/StatusColors";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import {
  FiClock,
  FiMapPin,
  FiSmartphone,
  FiCamera,
  FiTarget,
  FiCheckCircle,
  FiShield,
  FiWifi,
  FiNavigation,
  FiLogIn,
  FiLogOut,
} from "react-icons/fi";
import { MdOutlineQrCodeScanner } from "react-icons/md";

export default function CheckIn() {
  const [liveTime, setLiveTime] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("gps");
  const [workMode, setWorkMode] = useState("office");
  const [note, setNote] = useState("");
  const [locationState] = useState({
    place: "Head Office, Lahore",
    coords: "31.5204, 74.3587",
    accuracy: "14m",
    geofence: "Inside approved radius",
  });
  const [logs, setLogs] = useState([]);

  const shift = useMemo(
    () => ({
      name: "General Shift",
      start: "09:00 AM",
      end: "06:00 PM",
      grace: "15 min",
    }),
    []
  );

  const methodOptions = [
    { key: "gps", label: "GPS", hint: "Location based", icon: <FiNavigation size={16} /> },
    { key: "qr", label: "QR", hint: "Scanner based", icon: <MdOutlineQrCodeScanner size={17} /> },
    { key: "face", label: "Face", hint: "Identity match", icon: <FiCamera size={16} /> },
  ];

  const workModeOptions = mapSelectOptions(
    [
      { id: "office", name: "Office" },
      { id: "remote", name: "Remote" },
      { id: "client-site", name: "Client Site" },
    ],
    "id",
    "name"
  );

  const todayLogs = useMemo(
    () =>
      logs.filter(
        (item) =>
          format(item.timestamp, "yyyy-MM-dd") ===
          format(liveTime || new Date(), "yyyy-MM-dd")
      ),
    [logs, liveTime]
  );

  const latestCheckIn = useMemo(
    () => [...todayLogs].reverse().find((item) => item.type === "Check In"),
    [todayLogs]
  );
  const latestCheckOut = useMemo(
    () => [...todayLogs].reverse().find((item) => item.type === "Check Out"),
    [todayLogs]
  );
  const lastTodayAction = useMemo(
    () => [...todayLogs].sort((a, b) => a.timestamp - b.timestamp).at(-1),
    [todayLogs]
  );

  const isCheckedIn = lastTodayAction?.type === "Check In";

  const workingDuration = useMemo(() => {
    if (!latestCheckIn) return "00h 00m";
    const checkoutTime = latestCheckOut ? latestCheckOut.timestamp : new Date();
    const diffMs = checkoutTime - latestCheckIn.timestamp;
    if (diffMs <= 0) return "00h 00m";
    const diffMinutes = Math.floor(diffMs / 60000);
    const h = String(Math.floor(diffMinutes / 60)).padStart(2, "0");
    const m = String(diffMinutes % 60).padStart(2, "0");
    return `${h}h ${m}m`;
  }, [latestCheckIn, latestCheckOut, liveTime]);

  const filteredLogs = useMemo(() => {
    if (!searchQuery.trim()) return logs;
    const q = searchQuery.toLowerCase();
    return logs.filter(
      (item) =>
        item.type.toLowerCase().includes(q) ||
        item.method.toLowerCase().includes(q) ||
        item.workMode.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.note.toLowerCase().includes(q)
    );
  }, [logs, searchQuery]);

  useEffect(() => {
    const baseDate = new Date();
    setLogs([
      {
        id: 1,
        type: "Check In",
        timestamp: new Date(new Date(baseDate).setHours(8, 58, 0, 0)),
        method: "GPS",
        workMode: "Office",
        location: "Head Office, Lahore",
        note: "Reached before shift start.",
        statusId: 1,
        statusLabel: "Verified",
      },
      {
        id: 2,
        type: "Check Out",
        timestamp: new Date(new Date(baseDate).setHours(17, 34, 0, 0)),
        method: "Face",
        workMode: "Office",
        location: "Head Office, Lahore",
        note: "Client handoff done.",
        statusId: 1,
        statusLabel: "Verified",
      },
    ]);

    setLiveTime(new Date());
    const tick = setInterval(() => setLiveTime(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  const getMethodLabel = () => {
    if (selectedMethod === "qr") return "QR";
    if (selectedMethod === "face") return "Face";
    return "GPS";
  };

  const handleAction = (type) => {
    if ((type === "Check In" && isCheckedIn) || (type === "Check Out" && !isCheckedIn)) return;

    const now = new Date();
    const method = getMethodLabel();
    const statusId = selectedMethod === "face" ? 3 : 1;
    const statusLabel = selectedMethod === "face" ? "Pending Review" : "Verified";
    const modeLabel =
      workMode === "client-site" ? "Client Site" : workMode === "remote" ? "Remote" : "Office";

    setLogs((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        type,
        timestamp: now,
        method,
        workMode: modeLabel,
        location: locationState.place,
        note: note || `${type} captured via ${method}.`,
        statusId,
        statusLabel,
      },
    ]);
    setNote("");
  };

  return (
    <Layout>
      <div className="w-full min-h-[90vh] p-1 space-y-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-lg font-semibold text-gray-800 tracking-tight">Self Check-In/Out</h1>
              <p className="text-xxs text-gray-500 mt-1">
                Fast attendance capture with GPS, QR and face verification.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 px-4 py-3">
              <p className="text-xxs text-gray-500 font-medium">
                {liveTime ? format(liveTime, "eeee, dd MMM yyyy") : "--"}
              </p>
              <p className="text-base text-gray-800 font-semibold tracking-wide">
                {liveTime ? format(liveTime, "hh:mm:ss a") : "--:--:--"}
              </p>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xxs text-gray-500 font-medium">Shift</p>
                <div className="flex items-center gap-2 mt-1">
                  <FiClock className="text-blue-600" size={15} />
                  <p className="text-sm font-semibold text-gray-800">
                    {shift.name} | {shift.start} - {shift.end}
                  </p>
                </div>
                <p className="text-xxs text-gray-500 mt-1">Grace period: {shift.grace}</p>
              </div>
              <div className="px-3 py-2 rounded-lg bg-slate-50 border border-gray-100">
                <p className="text-xxs text-gray-500">Current Status</p>
                <div className="mt-1">
                  <StatusDesign statusId={isCheckedIn ? 3 : 1} label={isCheckedIn ? "Checked In" : "Ready"} />
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-white border border-gray-200 p-4">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <p className="text-sm font-semibold text-gray-800">Attendance Actions</p>
                <p className="text-xxs text-gray-500">
                  Method: <span className="font-semibold text-gray-700">{getMethodLabel()}</span>
                </p>
              </div>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleAction("Check In")}
                  disabled={isCheckedIn}
                  className={`min-h-[86px] rounded-xl border px-5 flex items-center gap-3 text-left transition ${
                    isCheckedIn
                      ? "border-gray-200 bg-white text-gray-400 cursor-not-allowed"
                      : "border-[#9adab5] bg-[#f3fcf7] text-[#166534] shadow-[0_0_0_2px_rgba(187,247,208,0.65),0_8px_18px_rgba(34,197,94,0.18)] hover:-translate-y-0.5 hover:shadow-[0_0_0_2px_rgba(187,247,208,0.82),0_12px_22px_rgba(34,197,94,0.24)] cursor-pointer"
                  }`}
                >
                  <span className={`w-11 h-11 rounded-xl flex items-center justify-center ${isCheckedIn ? "bg-gray-200" : "bg-[#c2e7d3]"}`}>
                    <FiLogIn size={19} />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-base font-semibold leading-none">Check In</span>
                    <span className="text-[11px] mt-1 opacity-80">Start attendance session</span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handleAction("Check Out")}
                  disabled={!isCheckedIn}
                  className={`min-h-[86px] rounded-xl border px-5 flex items-center gap-3 text-left transition ${
                    !isCheckedIn
                      ? "border-gray-200 bg-white text-gray-400 cursor-not-allowed"
                      : "border-[#e7aab6] bg-[#fff6f8] text-[#842029] shadow-[0_0_0_2px_rgba(252,213,222,0.75),0_8px_18px_rgba(225,29,72,0.15)] hover:-translate-y-0.5 hover:shadow-[0_0_0_2px_rgba(252,213,222,0.9),0_12px_22px_rgba(225,29,72,0.22)] cursor-pointer"
                  }`}
                >
                  <span className={`w-11 h-11 rounded-xl flex items-center justify-center ${!isCheckedIn ? "bg-gray-200" : "bg-[#efc6cf]"}`}>
                    <FiLogOut size={19} />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-base font-semibold leading-none">Check Out</span>
                    <span className="text-[11px] mt-1 opacity-80">Close attendance session</span>
                  </span>
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div className="rounded-xl bg-white border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-800">Context Capture</h3>
                <p className="text-xxs text-gray-500 mt-1">Choose verification mode.</p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {methodOptions.map((method) => (
                    <button
                      key={method.key}
                      type="button"
                      onClick={() => setSelectedMethod(method.key)}
                      className={`h-[92px] rounded-xl px-2 py-2 flex flex-col items-center justify-center gap-1 text-xxs transition cursor-pointer font-semibold border ${
                        selectedMethod === method.key
                          ? "bg-[#f6faff] border-[#78aeea] text-[#1d4e89] shadow-sm"
                          : "bg-[#fafcff] border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center ${selectedMethod === method.key ? "bg-[#e6f0fb]" : "bg-slate-100"}`}>
                        {method.icon}
                      </span>
                      <span>{method.label}</span>
                      <span className="text-[10px] font-medium text-gray-500">{method.hint}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-white border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-800">Action Details</h3>
                <p className="text-xxs text-gray-500 mt-1">Set context before attendance capture.</p>
                <div className="grid grid-cols-1 gap-3 mt-3">
                  <div>
                    <label className="text-xxs text-gray-600 font-medium mb-1 block">Work Mode</label>
                    <CustomSelect
                      name="work_mode"
                      value={workMode}
                      onChange={setWorkMode}
                      options={workModeOptions}
                      placeholder="Select work mode"
                      controlHeight="2.1rem"
                    />
                  </div>
                  <div>
                    <label className="text-xxs text-gray-600 font-medium mb-1 block">Capture Note</label>
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Optional note (visitor/client/remarks)"
                      className="w-full bg-slate-50 rounded-md border border-gray-200 px-3 py-[8px] text-xxs text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-300"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 mt-3">
                  Check-out is enabled only after a successful check-in.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800">Security & Connectivity</h3>
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between rounded-lg bg-[#f1f9f4] px-3 py-2">
                  <div className="flex items-center gap-2">
                    <FiWifi size={14} className="text-[#2a7f56]" />
                    <span className="text-xxs font-medium text-[#2a7f56]">Network</span>
                  </div>
                  <span className="text-xxs text-[#2a7f56]">Strong</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[#f1f6fc] px-3 py-2">
                  <div className="flex items-center gap-2">
                    <FiShield size={14} className="text-[#336b9b]" />
                    <span className="text-xxs font-medium text-[#336b9b]">Context Audit</span>
                  </div>
                  <span className="text-xxs text-[#336b9b]">Enabled</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[#fcf7ef] px-3 py-2">
                  <div className="flex items-center gap-2">
                    <FiCamera size={14} className="text-[#9a6a2a]" />
                    <span className="text-xxs font-medium text-[#9a6a2a]">Face Validation</span>
                  </div>
                  <span className="text-xxs text-[#9a6a2a]">On-demand</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800">Live Location Snapshot</h3>
              <div className="mt-3 space-y-2">
                <div className="flex items-start gap-2">
                  <FiMapPin className="text-blue-600 mt-0.5" size={14} />
                  <p className="text-xxs text-gray-700">{locationState.place}</p>
                </div>
                <div className="flex items-start gap-2">
                  <FiTarget className="text-blue-600 mt-0.5" size={14} />
                  <p className="text-xxs text-gray-700">Accuracy: {locationState.accuracy}</p>
                </div>
                <div className="flex items-start gap-2">
                  <FiSmartphone className="text-blue-600 mt-0.5" size={14} />
                  <p className="text-xxs text-gray-700">Coordinates: {locationState.coords}</p>
                </div>
                <div className="flex items-start gap-2">
                  <FiCheckCircle className="text-green-600 mt-0.5" size={14} />
                  <p className="text-xxs text-gray-700">{locationState.geofence}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
              <p className="text-xxs text-gray-500 font-medium">Today Summary</p>
              <p className="text-xxs text-gray-600 mt-2">
                In:{" "}
                <span className="font-semibold text-gray-800">
                  {latestCheckIn ? format(latestCheckIn.timestamp, "hh:mm a") : "--:--"}
                </span>
              </p>
              <p className="text-xxs text-gray-600 mt-1">
                Out:{" "}
                <span className="font-semibold text-gray-800">
                  {latestCheckOut ? format(latestCheckOut.timestamp, "hh:mm a") : "--:--"}
                </span>
              </p>
              <p className="text-xxs text-gray-600 mt-1">
                Worked: <span className="font-semibold text-gray-800">{workingDuration}</span>
              </p>
              <div className="mt-2">
                <StatusDesign
                  statusId={isCheckedIn ? 3 : 1}
                  label={isCheckedIn ? "Currently Active" : "Not Checked In"}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white shadow-sm border border-gray-100">
          <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <h2 className="text-sm font-semibold text-gray-700">Attendance Logs</h2>
            <div className="w-full md:w-64">
              <SearchBar placeholder="Search by method, type, note..." onSearch={setSearchQuery} />
            </div>
          </div>
          <div className="overflow-x-auto border-t border-gray-100">
            <table className="w-full text-xxs border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-3 py-2 text-left">Type</th>
                  <th className="px-3 py-2 text-left">Date</th>
                  <th className="px-3 py-2 text-left">Time</th>
                  <th className="px-3 py-2 text-left">Method</th>
                  <th className="px-3 py-2 text-left">Work Mode</th>
                  <th className="px-3 py-2 text-left">Location</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-left">Note</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.length > 0 ? (
                  [...filteredLogs]
                    .sort((a, b) => b.timestamp - a.timestamp)
                    .map((row, idx) => (
                      <tr key={row.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-3 py-2 font-semibold text-gray-700">{row.type}</td>
                        <td className="px-3 py-2 text-gray-600">{format(row.timestamp, "dd MMM yyyy")}</td>
                        <td className="px-3 py-2 text-gray-600">{format(row.timestamp, "hh:mm:ss a")}</td>
                        <td className="px-3 py-2 text-gray-600">{row.method}</td>
                        <td className="px-3 py-2 text-gray-600">{row.workMode}</td>
                        <td className="px-3 py-2 text-gray-600">{row.location}</td>
                        <td className="px-3 py-2">
                          <StatusDesign statusId={row.statusId} label={row.statusLabel} />
                        </td>
                        <td className="px-3 py-2 text-gray-600 max-w-[220px] truncate" title={row.note}>
                          {row.note}
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-3 py-6 text-center text-gray-500 italic">
                      No logs found for this search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
