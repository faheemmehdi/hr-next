"use client";
import Layout from "../components/Layout";
import { useState, useRef } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { CiUnlock, CiEdit } from "react-icons/ci";
import { FiDownload } from "react-icons/fi";
import Input from "../components/Input";

export default function ProfileClient() {
  const [crop, setCrop] = useState({ unit: "%", width: 60, aspect: 1 }); // react-image-crop crop object
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);
  const [activeTab, setActiveTab] = useState("info");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // dataURL
  const [preview, setPreview] = useState(null);
  const [date, setDate] = useState("");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // Simple validation
  const validatePassword = () => {
    const errors = {};
    if (!passwordData.current) errors.current = "Current password required";
    if (!passwordData.new) errors.new = "New password required";
    if (passwordData.new && passwordData.new.length < 8)
      errors.new = "Password must be at least 8 characters";
    if (passwordData.confirm !== passwordData.new)
      errors.confirm = "Passwords do not match";
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdatePassword = () => {
    if (!validatePassword()) return;

    // Perform update password logic here (API call)
    console.log("Password updated:", passwordData);

    // Close modal and reset fields
    setPasswordData({ current: "", new: "", confirm: "" });
    setPasswordErrors({});
    setIsPasswordModalOpen(false);
  };
  const attendanceData = [
    {
      date: "01-08-2025",
      day: "Friday",
      checkIn: "08:00 AM",
      checkOut: "04:30 PM",
      hours: "8.5",
      status: "Present",
    },
    {
      date: "02-08-2025",
      day: "Saturday",
      checkIn: "-",
      checkOut: "-",
      hours: "-",
      status: "Weekend",
    },
    {
      date: "03-08-2025",
      day: "Sunday",
      checkIn: "-",
      checkOut: "-",
      hours: "-",
      status: "Weekend",
    },
    {
      date: "04-08-2025",
      day: "Monday",
      checkIn: "08:05 AM",
      checkOut: "04:15 PM",
      hours: "8.0",
      status: "Present",
    },
    {
      date: "05-08-2025",
      day: "Tuesday",
      checkIn: "08:10 AM",
      checkOut: "04:20 PM",
      hours: "8.1",
      status: "Present",
    },
    {
      date: "06-08-2025",
      day: "Wednesday",
      checkIn: "09:30 AM",
      checkOut: "04:00 PM",
      hours: "6.5",
      status: "Late",
    },
    {
      date: "07-08-2025",
      day: "Thursday",
      checkIn: "08:00 AM",
      checkOut: "04:10 PM",
      hours: "8.2",
      status: "Present",
    },
    {
      date: "08-08-2025",
      day: "Friday",
      checkIn: "-",
      checkOut: "-",
      hours: "-",
      status: "Absent",
    },
    {
      date: "08-08-2025",
      day: "Friday",
      checkIn: "08:00 AM",
      checkOut: "04:10 PM",
      hours: "8.2",
      status: "Present",
    },
    {
      date: "08-08-2025",
      day: "Tuesday",
      checkIn: "08:00 AM",
      checkOut: "04:00 PM",
      hours: "8.0",
      status: "Present",
    },
    {
      date: "09-08-2025",
      day: "Saturday",
      checkIn: "-",
      checkOut: "-",
      hours: "-",
      status: "Weekend",
    },
    {
      date: "10-08-2025",
      day: "Sunday",
      checkIn: "-",
      checkOut: "-",
      hours: "-",
      status: "Weekend",
    },
    {
      date: "11-08-2025",
      day: "Monday",
      checkIn: "-",
      checkOut: "-",
      hours: "-",
      status: "Sick Leave",
    },
  ];
  const files = [
    { name: "Resume.pdf", extension: "PDF" },
    { name: "ProjectPlan.docx", extension: "DOCX" },
    { name: "Presentation.pptx", extension: "PPTX" },
    { name: "Budget.xlsx", extension: "XLSX" },
    { name: "Presentation.pptx", extension: "PPTX" },
  ];
  // helper: get cropped image from an <img> and crop (pixel values)
  async function getCroppedImg(image, crop) {
    if (!crop || !image) return null;

    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = Math.round(crop.width);
    canvas.height = Math.round(crop.height);

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
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

  // file input handler (same as yours)
  function onFileChange(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedFile(reader.result);
        setIsModalOpen(true);
      };
      reader.readAsDataURL(file);
      e.target.value = "";
    }
  }

  // Save button handler: use imgRef and completedCrop
  async function onSaveCropped() {
    if (!completedCrop || !imgRef.current) return;
    try {
      const { blob, base64 } = await getCroppedImg(
        imgRef.current,
        completedCrop
      );

      setPreview(base64);

      // prepare FormData to send later
      const formData = new FormData();
      formData.append("file", blob, "profile.jpg");

      // example: await fetch("/api/upload", { method: "POST", body: formData });

      setIsModalOpen(false);
    } catch (err) {
      console.error("Crop error:", err);
    }
  }

  return (
    <Layout>
      {/* Profile Header */}
      <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 p-6 flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Avatar */}
        <div className="w-3/12 flex">
          <div
            className="w-40 h-40 ml-10 flex-shrink-0 rounded-full overflow-hidden border border-gray-300 bg-gray-100 cursor-pointer relative group"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <img
              src={preview || "/images/logo1.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 bg-opacity-40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition">
              Change Photo
            </div>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFileChange}
            />
          </div>
        </div>
        {/* Left side: Profile */}
        <div className="w-10/12">
          <div className="w-full flex justify-between">
            <h2 className="text-md font-semibold text-gray-800">
              Muhammad Ahmad
            </h2>
            <div className="flex">
              <CiEdit className="mr-3 text-lg cursor-pointer" />
              <CiUnlock
                className="text-lg cursor-pointer"
                onClick={() => setIsPasswordModalOpen(true)}
              />
            </div>
          </div>
          <div className="flex w-full">
            {/* Info */}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-2 gap-x-6 mt-4 text-xs">
              <p>
                <span className="text-gray-500 mt-1 block">
                  Email <br />
                </span>
                email@gmail.com
              </p>
              <p>
                <span className="text-gray-500 mt-1 block">
                  Phone <br />
                </span>
                +1 123 456 7890
              </p>
              <p>
                <span className="text-gray-500 mt-1 block">
                  CNIC <br />
                </span>
                4859302049945
              </p>
              <p>
                <span className="text-gray-500 mt-1 block">
                  Date of Birth <br />
                </span>
                15 Jan 1990
              </p>
              <p>
                <span className="text-gray-500 mt-1 block">
                  Role <br />
                </span>
                Admin
              </p>
              <p>
                <span className="text-gray-500 mt-1 block">
                  Locale <br />
                </span>
                English
              </p>
              <p>
                <span className="text-gray-500 mt-1 block">
                  Timezone <br />
                </span>
                Asia/Karachi
              </p>
              <p>
                <span className="text-gray-500 mt-1 block">
                  Address <br />
                </span>
                Bosan Road Gulgasht-3 Multan
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b-2 border-gray-100  mt-3 font-medium">
        <button
          onClick={() => setActiveTab("info")}
          className={`px-4 py-2 border-b-3 text-xs font-bold cursor-pointer ${
            activeTab === "info"
              ? "border-blue-900 text-blue-900"
              : "border-transparent text-gray-600 hover:text-blue-900"
          }`}
        >
          Employee Info
        </button>
        <button
          onClick={() => setActiveTab("attendance")}
          className={`px-4 py-2 border-b-3 text-xs font-bold cursor-pointer ${
            activeTab === "attendance"
              ? "border-blue-900 text-blue-900"
              : "border-transparent text-gray-600 hover:text-blue-900"
          }`}
        >
          Attendance
        </button>
        <button
          onClick={() => setActiveTab("documents")}
          className={`px-4 py-2 border-b-3 text-xs font-bold cursor-pointer ${
            activeTab === "documents"
              ? "border-blue-900 text-blue-900"
              : "border-transparent text-gray-600 hover:text-blue-900"
          }`}
        >
          Documents
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mt-4">
        {activeTab === "info" && (
          <div>
            <h2 className="text-sm font-semibold mb-2">
              Employment Information
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-2 gap-x-6 mt-4 text-xs">
              <p>
                <span className="text-gray-500 mt-1 block">
                  Employee ID <br />
                </span>
                86576
              </p>
              <p>
                <span className="text-gray-500 mt-1 block">
                  Employee Email <br />
                </span>
                employee@gmail.com
              </p>
              <p>
                <span className="text-gray-500 mt-1 block">
                  Designation <br />
                </span>
                HR Manager
              </p>
              <p>
                <span className="text-gray-500 mt-1 block">
                  Employement Type <br />
                </span>
                Permanent
              </p>
              <p>
                <span className="text-gray-500 mt-1 block">
                  Department <br />
                </span>
                Human Resources
              </p>
              <p>
                <span className="text-gray-500 mt-1 block">
                  Joining Date <br />
                </span>
                01-Jan-2025
              </p>
              <p>
                <span className="text-gray-500 mt-1 block">
                  Working Shift <br />
                </span>
                Night
              </p>
              <p>
                <span className="text-gray-500 mt-1 block">
                  Contact Expiry Date <br />
                </span>
                20-Feb-2026
              </p>
            </div>
          </div>
        )}

        {activeTab === "attendance" && (
          <div>
            <div className="flex justify-between">
              <h2 className="text-sm font-semibold">Monthly Attendance</h2>
              <Input
                type="date"
                name="date"
                value={date} // controlled value
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="overflow-x-auto -mt-2">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left rounded-tl-md">Date</th>
                    <th className="px-4 py-2 text-left">Day</th>
                    <th className="px-4 py-2 text-left">Check-in</th>
                    <th className="px-4 py-2 text-left">Check-out</th>
                    <th className="px-4 py-2 text-left">Working Hours</th>
                    <th className="px-4 py-2 text-left rounded-tr-md">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition-colors`}
                    >
                      <td className="px-4 py-3">{row.date}</td>
                      <td className="px-4 py-3">{row.day}</td>
                      <td className="px-4 py-3">{row.checkIn}</td>
                      <td className="px-4 py-3">{row.checkOut}</td>
                      <td className="px-4 py-3">{row.hours}</td>
                      <td
                        className={`px-4 py-3 font-medium ${
                          row.status === "Present"
                            ? "text-green-600"
                            : row.status === "Late"
                            ? "text-orange-600"
                            : row.status === "Absent"
                            ? "text-red-600"
                            : row.status === "Sick Leave"
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                      >
                        {row.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div>
            <h2 className="text-sm font-semibold mb-2">Documents</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-4 gap-4">
              {files.map((file, idx) => (
                <div
                  key={idx}
                  className="bg-gray-100 rounded-lg p-4 flex flex-col justify-between h-24 shadow-sm"
                >
                  {/* File extension */}
                  <div className="text-gray-500 font-semibold text-xs">
                    {file.extension}
                  </div>

                  {/* Bottom row: file name + download */}
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-800 font-medium text-xs truncate">
                      {file.name}
                    </span>
                    <button className="text-gray-600 hover:text-gray-800">
                      <FiDownload />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* crop modal (replace your previous modal) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-4 relative">
            <div className="w-full h-[270px] overflow-auto flex items-center justify-center bg-gray-50">
              {selectedFile ? (
                <ReactCrop
                  crop={crop}
                  onChange={(newCrop) => setCrop(newCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
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
                <p className="text-gray-500">No image selected</p>
              )}
            </div>

            <div className="flex justify-end gap-3 text-xs mt-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor"
                onClick={onSaveCropped}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-5 relative">
            <h2 className="text-sm font-semibold mb-4">Update Password</h2>

            <Input
              type="password"
              label="Current Password"
              name="current"
              value={passwordData.current}
              onChange={handlePasswordChange}
              error={passwordErrors.current}
            />
            <Input
              type="password"
              label="New Password"
              name="new"
              value={passwordData.new}
              onChange={handlePasswordChange}
              error={passwordErrors.new}
            />
            <Input
              type="password"
              label="Confirm New Password"
              name="confirm"
              value={passwordData.confirm}
              onChange={handlePasswordChange}
              error={passwordErrors.confirm}
            />

            <div className="flex justify-end gap-3 text-xs mt-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
                onClick={() => setIsPasswordModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white cursor-pointer rounded-md hover:bg-green-700"
                onClick={handleUpdatePassword}
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
