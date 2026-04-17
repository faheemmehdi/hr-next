"use client";

import { useMemo, useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  FiBriefcase,
  FiCalendar,
  FiDownload,
  FiEdit3,
  FiLock,
  FiMail,
  FiMapPin,
  FiPhone,
  FiUploadCloud,
  FiUser,
} from "react-icons/fi";
import Layout from "../components/Layout";
import Tabs from "../components/Tabs";
import Button from "../components/Button";
import Input from "../components/Input";
import Modal from "../components/ModalShell";
import StatusDesign from "../components/StatusColors";

const profileData = {
  fullName: "Muhammad Ahmad",
  email: "ahmad.khan@kairos.com",
  phone: "+92 300 1234567",
  cnic: "35202-9876543-1",
  dob: "1990-01-15",
  role: "HR Manager",
  locale: "English",
  timezone: "Asia/Karachi",
  address: "Bosan Road, Gulgasht-3, Multan",
  employeeId: "EMP-86576",
  employeeEmail: "m.ahmad@kairos.com",
  designation: "HR Manager",
  employmentType: "Permanent",
  department: "Human Resources",
  joiningDate: "2025-01-01",
  shift: "Night",
  contractExpiryDate: "2026-02-20",
};

const attendanceSeed = [
  { date: "2026-04-01", day: "Wednesday", checkIn: "08:00 AM", checkOut: "04:30 PM", hours: "8.5", status: "Present", statusId: 1 },
  { date: "2026-04-02", day: "Thursday", checkIn: "08:05 AM", checkOut: "04:15 PM", hours: "8.1", status: "Present", statusId: 1 },
  { date: "2026-04-03", day: "Friday", checkIn: "09:20 AM", checkOut: "04:10 PM", hours: "6.8", status: "Late", statusId: 3 },
  { date: "2026-04-04", day: "Saturday", checkIn: "-", checkOut: "-", hours: "-", status: "Weekend", statusId: 4 },
  { date: "2026-04-05", day: "Sunday", checkIn: "-", checkOut: "-", hours: "-", status: "Weekend", statusId: 4 },
  { date: "2026-04-06", day: "Monday", checkIn: "08:12 AM", checkOut: "04:16 PM", hours: "8.0", status: "Present", statusId: 1 },
  { date: "2026-04-07", day: "Tuesday", checkIn: "-", checkOut: "-", hours: "-", status: "Sick Leave", statusId: 5 },
  { date: "2026-04-08", day: "Wednesday", checkIn: "-", checkOut: "-", hours: "-", status: "Absent", statusId: 2 },
];

const documentSeed = [
  { id: 1, title: "Resume.pdf", type: "Resume", uploadedOn: "2025-01-03", status: "Verified", statusId: 1 },
  { id: 2, title: "CNIC.pdf", type: "ID Document", uploadedOn: "2025-01-03", status: "Verified", statusId: 1 },
  { id: 3, title: "Employment Contract.pdf", type: "Contract", uploadedOn: "2025-01-05", status: "Pending", statusId: 3 },
  { id: 4, title: "NDA.pdf", type: "Agreement", uploadedOn: "2025-01-05", status: "Verified", statusId: 1 },
];

function formatIsoDate(isoDate) {
  if (!isoDate || isoDate === "-") return "-";
  const [y, m, d] = isoDate.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${d} ${months[Number(m) - 1] || ""} ${y}`;
}

export default function ProfileClient() {
  const fileInputRef = useRef(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 60, aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [selectedMonth, setSelectedMonth] = useState("2026-04");
  const [documents] = useState(documentSeed);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  const filteredAttendance = useMemo(
    () => attendanceSeed.filter((row) => row.date.startsWith(selectedMonth)),
    [selectedMonth]
  );

  const attendanceStats = useMemo(() => {
    const present = filteredAttendance.filter((r) => r.status === "Present").length;
    const absent = filteredAttendance.filter((r) => r.status === "Absent").length;
    const leaves = filteredAttendance.filter((r) => r.status === "Sick Leave").length;
    return { present, absent, leaves };
  }, [filteredAttendance]);

  const handlePasswordChange = (e) => {
    setPasswordData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validatePassword = () => {
    const errors = {};
    if (!passwordData.current.trim()) errors.current = "Current password required";
    if (!passwordData.next.trim()) errors.next = "New password required";
    if (passwordData.next && passwordData.next.length < 8) errors.next = "Password must be at least 8 characters";
    if (!passwordData.confirm.trim()) errors.confirm = "Confirm password required";
    if (passwordData.next !== passwordData.confirm) errors.confirm = "Passwords do not match";
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdatePassword = () => {
    if (!validatePassword()) return;
    setPasswordData({ current: "", next: "", confirm: "" });
    setPasswordErrors({});
    setIsPasswordModalOpen(false);
    alert("Password updated successfully.");
  };

  const passwordChecks = useMemo(
    () => ({
      minLength: passwordData.next.length >= 8,
      hasNumber: /\d/.test(passwordData.next),
      hasLetter: /[A-Za-z]/.test(passwordData.next),
      match: passwordData.next.length > 0 && passwordData.next === passwordData.confirm,
    }),
    [passwordData.next, passwordData.confirm]
  );

  const passwordStrength = useMemo(() => {
    let score = 0;
    if (passwordChecks.minLength) score += 1;
    if (passwordChecks.hasNumber) score += 1;
    if (passwordChecks.hasLetter) score += 1;
    if (passwordData.next.length >= 12) score += 1;

    if (score <= 1) return { label: "Weak", bar: "w-1/4", color: "bg-red-500" };
    if (score === 2) return { label: "Fair", bar: "w-2/4", color: "bg-yellow-500" };
    if (score === 3) return { label: "Good", bar: "w-3/4", color: "bg-blue-500" };
    return { label: "Strong", bar: "w-full", color: "bg-green-500" };
  }, [passwordChecks, passwordData.next.length]);

  async function getCroppedImg(image, cropData) {
    if (!cropData || !image) return null;

    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = Math.round(cropData.width);
    canvas.height = Math.round(cropData.height);

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.drawImage(
      image,
      cropData.x * scaleX,
      cropData.y * scaleY,
      cropData.width * scaleX,
      cropData.height * scaleY,
      0,
      0,
      cropData.width,
      cropData.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }
          const base64 = canvas.toDataURL("image/jpeg");
          resolve({ blob, base64 });
        },
        "image/jpeg",
        0.95
      );
    });
  }

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedFile(reader.result);
      setIsCropModalOpen(true);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const onSaveCropped = async () => {
    if (!completedCrop || !imgRef.current) return;
    try {
      const result = await getCroppedImg(imgRef.current, completedCrop);
      if (!result) return;
      setPreview(result.base64);
      setIsCropModalOpen(false);
    } catch (err) {
      console.error("Crop error:", err);
    }
  };

  const infoContent = (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <p className="text-xs font-semibold text-gray-700">Personal Information</p>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xxs">
          <div>
            <p className="text-gray-500">Email</p>
            <p className="text-gray-800 font-medium">{profileData.email}</p>
          </div>
          <div>
            <p className="text-gray-500">Phone</p>
            <p className="text-gray-800 font-medium">{profileData.phone}</p>
          </div>
          <div>
            <p className="text-gray-500">CNIC</p>
            <p className="text-gray-800 font-medium">{profileData.cnic}</p>
          </div>
          <div>
            <p className="text-gray-500">Date of Birth</p>
            <p className="text-gray-800 font-medium">{formatIsoDate(profileData.dob)}</p>
          </div>
          <div>
            <p className="text-gray-500">Locale</p>
            <p className="text-gray-800 font-medium">{profileData.locale}</p>
          </div>
          <div>
            <p className="text-gray-500">Timezone</p>
            <p className="text-gray-800 font-medium">{profileData.timezone}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-gray-500">Address</p>
            <p className="text-gray-800 font-medium">{profileData.address}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <p className="text-xs font-semibold text-gray-700">Employment Information</p>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xxs">
          <div>
            <p className="text-gray-500">Employee ID</p>
            <p className="text-gray-800 font-medium">{profileData.employeeId}</p>
          </div>
          <div>
            <p className="text-gray-500">Employee Email</p>
            <p className="text-gray-800 font-medium">{profileData.employeeEmail}</p>
          </div>
          <div>
            <p className="text-gray-500">Designation</p>
            <p className="text-gray-800 font-medium">{profileData.designation}</p>
          </div>
          <div>
            <p className="text-gray-500">Employment Type</p>
            <p className="text-gray-800 font-medium">{profileData.employmentType}</p>
          </div>
          <div>
            <p className="text-gray-500">Department</p>
            <p className="text-gray-800 font-medium">{profileData.department}</p>
          </div>
          <div>
            <p className="text-gray-500">Role</p>
            <p className="text-gray-800 font-medium">{profileData.role}</p>
          </div>
          <div>
            <p className="text-gray-500">Joining Date</p>
            <p className="text-gray-800 font-medium">{formatIsoDate(profileData.joiningDate)}</p>
          </div>
          <div>
            <p className="text-gray-500">Contract Expiry Date</p>
            <p className="text-gray-800 font-medium">{formatIsoDate(profileData.contractExpiryDate)}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const attendanceContent = (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-gray-700">Monthly Attendance</p>
            <p className="text-xxs text-gray-500 mt-1">Track check-in/check-out and daily status.</p>
          </div>
          <div className="w-full max-w-[12rem]">
            <Input
              type="month"
              name="attendanceMonth"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              noMargin
            />
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-[#d9eadf] bg-gradient-to-br from-[#f7fcf8] to-[#eef9f1] px-3 py-3 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-wide text-[#4d7b5f]">Present</p>
              <span className="h-2 w-2 rounded-full bg-[#2f7d4f]" />
            </div>
            <p className="text-base font-semibold text-[#1f5e3a] mt-1">{attendanceStats.present}</p>
            <p className="text-[10px] text-[#5f8f72] mt-0.5">Working days marked present</p>
          </div>
          <div className="rounded-xl border border-[#f0dddf] bg-gradient-to-br from-[#fff9f9] to-[#fff0f1] px-3 py-3 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-wide text-[#8d4c53]">Absent</p>
              <span className="h-2 w-2 rounded-full bg-[#bd4f5f]" />
            </div>
            <p className="text-base font-semibold text-[#7b323d] mt-1">{attendanceStats.absent}</p>
            <p className="text-[10px] text-[#a2686f] mt-0.5">Missed attendance records</p>
          </div>
          <div className="rounded-xl border border-[#e4e6f6] bg-gradient-to-br from-[#fafbff] to-[#f1f3ff] px-3 py-3 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-wide text-[#535f98]">Leave</p>
              <span className="h-2 w-2 rounded-full bg-[#5f54b7]" />
            </div>
            <p className="text-base font-semibold text-[#3f4b85] mt-1">{attendanceStats.leaves}</p>
            <p className="text-[10px] text-[#6d79ab] mt-0.5">Approved leave days</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm overflow-x-auto">
        <table className="w-full text-xxs border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-3 py-3 text-left">Date</th>
              <th className="px-3 py-3 text-left">Day</th>
              <th className="px-3 py-3 text-left">Check-in</th>
              <th className="px-3 py-3 text-left">Check-out</th>
              <th className="px-3 py-3 text-left">Working Hours</th>
              <th className="px-3 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendance.length > 0 ? (
              filteredAttendance.map((row, idx) => (
                <tr key={`${row.date}-${idx}`} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-3 py-3">{formatIsoDate(row.date)}</td>
                  <td className="px-3 py-3">{row.day}</td>
                  <td className="px-3 py-3">{row.checkIn}</td>
                  <td className="px-3 py-3">{row.checkOut}</td>
                  <td className="px-3 py-3">{row.hours}</td>
                  <td className="px-3 py-3">
                    <StatusDesign statusId={row.statusId} label={row.status} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-4 text-center text-gray-500 italic">
                  No attendance records for selected month.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const documentsContent = (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold text-gray-700">Documents</p>
          <p className="text-xxs text-gray-500 mt-1">Personal and employment documents.</p>
        </div>
        <Button type="button" variant="secondary" onClick={() => alert("Upload flow will be connected here.")}>
          <span className="inline-flex items-center gap-1.5">
            <FiUploadCloud size={13} />
            Upload
          </span>
        </Button>
      </div>

      <div className="mt-3 overflow-x-auto border border-gray-200 rounded">
        <table className="w-full text-xxs border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-3 py-3 text-left">Title</th>
              <th className="px-3 py-3 text-left">Type</th>
              <th className="px-3 py-3 text-left">Uploaded On</th>
              <th className="px-3 py-3 text-left">Status</th>
              <th className="px-3 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, idx) => (
              <tr key={doc.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-3 py-3 font-medium text-gray-800">{doc.title}</td>
                <td className="px-3 py-3">{doc.type}</td>
                <td className="px-3 py-3">{formatIsoDate(doc.uploadedOn)}</td>
                <td className="px-3 py-3">
                  <StatusDesign statusId={doc.statusId} label={doc.status} />
                </td>
                <td className="px-3 py-3">
                  <button
                    type="button"
                    onClick={() => alert(`Downloading ${doc.title}`)}
                    className="h-7 px-2.5 inline-flex items-center gap-1.5 rounded-md border border-[#d9e5f4] bg-[#f8fbff] text-[#315d9c] text-xxs font-medium hover:bg-[#edf4ff] transition cursor-pointer"
                  >
                    <FiDownload size={11} />
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const tabs = [
    { key: "info", label: "Employee Info", content: infoContent },
    { key: "attendance", label: "Attendance", content: attendanceContent },
    { key: "documents", label: "Documents", content: documentsContent },
  ];

  return (
    <Layout>
      <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 p-5">
        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className="h-24 w-24 rounded-full overflow-hidden border border-gray-300 bg-gray-100 cursor-pointer group relative"
              onClick={() => fileInputRef.current?.click()}
            >
              <img src={preview || "/images/logo1.png"} alt="Profile" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xxs font-medium">
                Change
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800">{profileData.fullName}</h2>
              <p className="text-xxs text-gray-500 mt-0.5">{profileData.designation}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-600 px-2 py-[2px] text-[10px]">
                  <FiMail size={10} />
                  {profileData.email}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-600 px-2 py-[2px] text-[10px]">
                  <FiPhone size={10} />
                  {profileData.phone}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-600 px-2 py-[2px] text-[10px]">
                  <FiMapPin size={10} />
                  {profileData.timezone}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button type="button" variant="secondary" onClick={() => alert("Edit profile flow will be connected here.")}>
              <span className="inline-flex items-center gap-1.5">
                <FiEdit3 size={13} />
                Edit
              </span>
            </Button>
            <Button type="button" variant="primary" onClick={() => setIsPasswordModalOpen(true)}>
              <span className="inline-flex items-center gap-1.5">
                <FiLock size={13} />
                Update Password
              </span>
            </Button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="rounded-lg border border-gray-200 bg-[#f8fbff] p-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-gray-500">Employee ID</p>
              <FiUser className="text-[#315d9c]" size={13} />
            </div>
            <p className="mt-1 text-xs font-semibold text-gray-800">{profileData.employeeId}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-[#f7faf8] p-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-gray-500">Department</p>
              <FiBriefcase className="text-[#2f7d4f]" size={13} />
            </div>
            <p className="mt-1 text-xs font-semibold text-gray-800">{profileData.department}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-[#fff8f2] p-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-gray-500">Joining Date</p>
              <FiCalendar className="text-[#9a5d1d]" size={13} />
            </div>
            <p className="mt-1 text-xs font-semibold text-gray-800">{formatIsoDate(profileData.joiningDate)}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-[#f5f4ff] p-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-gray-500">Current Status</p>
              <FiBriefcase className="text-[#5f54b7]" size={13} />
            </div>
            <div className="mt-1">
              <StatusDesign statusId={1} label="Active" />
            </div>
          </div>
        </div>
      </div>

      <Tabs tabs={tabs} defaultTab="info" isCol />

      {isCropModalOpen && (
        <Modal width="w-full md:w-5/12">
          <h3 className="text-sm font-semibold text-gray-800">Adjust Profile Photo</h3>
          <p className="text-xxs text-gray-500 mt-1 mb-3">Crop and save your new profile picture.</p>

          <div className="w-full h-[300px] overflow-auto flex items-center justify-center bg-gray-50 rounded border border-gray-200">
            {selectedFile ? (
              <ReactCrop
                crop={crop}
                onChange={(newCrop) => setCrop(newCrop)}
                onComplete={(cropData) => setCompletedCrop(cropData)}
                keepSelection
                ruleOfThirds
              >
                <img
                  ref={imgRef}
                  src={selectedFile}
                  alt="Crop source"
                  onLoad={(e) => (imgRef.current = e.currentTarget)}
                  className="max-h-[340px] object-contain"
                />
              </ReactCrop>
            ) : (
              <p className="text-gray-500 text-xxs">No image selected.</p>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="cancel" onClick={() => setIsCropModalOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="success" onClick={onSaveCropped}>
              Save
            </Button>
          </div>
        </Modal>
      )}

      {isPasswordModalOpen && (
        <Modal width="w-full md:w-5/12">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-start gap-2">
              <span className="h-8 w-8 rounded-full bg-[#edf4ff] text-[#315d9c] inline-flex items-center justify-center mt-0.5">
                <FiLock size={13} />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-gray-800">Update Password</h3>
                <p className="text-xxs text-gray-500 mt-0.5">
                  Keep your account secure with a stronger password.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-[#fafbfc] p-3 mb-3">
            <Input
              type="password"
              label="Current Password"
              name="current"
              value={passwordData.current}
              onChange={handlePasswordChange}
              error={passwordErrors.current}
              placeholder="Enter current password"
            />
            <Input
              type="password"
              label="New Password"
              name="next"
              value={passwordData.next}
              onChange={handlePasswordChange}
              error={passwordErrors.next}
              placeholder="Enter new password"
            />
            <Input
              type="password"
              label="Confirm New Password"
              name="confirm"
              value={passwordData.confirm}
              onChange={handlePasswordChange}
              error={passwordErrors.confirm}
              placeholder="Re-enter new password"
            />

            <div className="mt-1">
              <div className="flex items-center justify-between text-[10px] text-gray-600 mb-1">
                <span>Password strength</span>
                <span className="font-medium">{passwordData.next ? passwordStrength.label : "Not set"}</span>
              </div>
              <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                <div className={`h-full ${passwordStrength.bar} ${passwordStrength.color} transition-all duration-300`} />
              </div>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1 text-[10px]">
                <p className={passwordChecks.minLength ? "text-green-600" : "text-gray-500"}>At least 8 characters</p>
                <p className={passwordChecks.hasLetter ? "text-green-600" : "text-gray-500"}>Contains a letter</p>
                <p className={passwordChecks.hasNumber ? "text-green-600" : "text-gray-500"}>Contains a number</p>
                <p className={passwordChecks.match ? "text-green-600" : "text-gray-500"}>Passwords match</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-3">
            <Button type="button" variant="cancel" onClick={() => setIsPasswordModalOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="primary" onClick={handleUpdatePassword}>
              Update Password
            </Button>
          </div>
        </Modal>
      )}
    </Layout>
  );
}
