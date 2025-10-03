"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  FiUser,
  FiActivity,
  FiSettings,
  FiLogOut,
  FiMoreVertical,
} from "react-icons/fi";
import { FaRegBell } from "react-icons/fa6";
export default function Navbar() {
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const profileRef = useRef(null);
  const notifRef = useRef(null);
const [notifications, setNotifications] = useState([
  {
    id: 1,
    message: "New employee Ali Khan has been added.",
    time: "2 mins ago",
    read: false,
  },
  {
    id: 2,
    message: "Payroll for September has been processed.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    message: "Leave request from Sarah.",
    time: "Yesterday",
    read: true,
  },
  {
    id: 4,
    message: "Meeting scheduled for tomorrow.",
    time: "2 days ago",
    read: false,
  },
  {
    id: 5,
    message: "Reminder: Update company policies.",
    time: "3 days ago",
    read: false,
  },
]);


  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target) &&
        notifRef.current &&
        !notifRef.current.contains(e.target)
      ) {
        setOpenProfile(false);
        setOpenNotif(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      style={{ backgroundImage: "var(--auth-pages-bg-color)" }}
      className="fixed top-0 left-0 right-0 h-11 ml-1 shadow-md flex items-center justify-between border-b border-gray-600 pr-4 z-50"
    >
      {/* Left - Logo */}
      <div className="relative w-40 ml-1 h-9">
        <Image
          src="/images/logo1.png"
          alt="Logo"
          fill
          className="object-contain object-left"
        />
      </div>

      {/* Right - Notifications & Profile */}
      <div className="flex items-center gap-4">
        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <div
            onClick={() => {
              setOpenProfile(!openProfile);
              setOpenNotif(false); // close notif if open
            }}
            className="flex items-center text-xs gap-2 cursor-pointer"
          >
            <Image
              src="/images/logo1.png" // replace with user image
              alt="User"
              width={32}
              height={32}
              className="rounded-full border border-gray-500"
            />
            <span className="text-xs text-gray-200">User Name</span>
          </div>

          {openProfile && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-fade-in">
              <p className="px-4 py-2 text-[11px] font-semibold text-gray-500 uppercase border-b border-gray-200">
                Welcome!
              </p>
              <ul className="flex flex-col text-sm text-gray-800">
                <li>
                  <Link
                    href="/profile"
                    className="flex items-center text-xs gap-2 px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpenProfile(false)}
                  >
                    <FiUser className="text-gray-600" /> Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/activity"
                    className="flex items-center text-xs gap-2 px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpenProfile(false)}
                  >
                    <FiActivity className="text-gray-600" /> Activity
                  </Link>
                </li>
                <li>
                  <Link
                    href="/preferences"
                    className="flex items-center text-xs gap-2 px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpenProfile(false)}
                  >
                    <FiSettings className="text-gray-600" /> Preferences
                  </Link>
                </li>

                <hr className="my-1 border-gray-200" />

                <li>
                  <Link
                    href="/logout"
                    className="flex items-center text-xs gap-2 px-4 py-2 hover:bg-gray-100 text-red-600"
                    onClick={() => setOpenProfile(false)}
                  >
                    <FiLogOut className="text-red-600" /> Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setOpenNotif(!openNotif);
              setOpenProfile(false); // close profile if open
            }}
            className="relative text-gray-200 hover:text-white mt-1 cursor-pointer"
          >
            <FaRegBell className="text-lg mt-1" />
            {/* Notification badge */}
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] px-[5px] py-[1px] rounded-full">
              {notifications.filter((n) => !n.read).length}
            </span>
          </button>

          {openNotif && (
            <div className="absolute -right-1 mt-3 w-72 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-fade-in">
              <p className="px-4 py-3 text-xs text-center font-semibold text-gray-800 uppercase border-b border-gray-200">
                Notifications
              </p>
              <ul className="max-h-80 overflow-y-auto custom-scrollbar">
                {notifications.map((notif, i) => (
                  <li
                    key={notif.id}
                    className={`px-4 py-3 flex items-start justify-between ${
                      i % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 transition`}
                  >
                    {/* Message + Time */}
                    <div className="flex flex-col pr-2">
                      <p className="text-xs text-gray-800 font-medium">
                        {notif.message}
                      </p>
                      <span className="text-[10px] text-gray-400">
                        {notif.time}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="px-4 py-3 text-center text-xs text-gray-600 border-t border-gray-200 hover:bg-gray-50 cursor-pointer">
                See All Notifications
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
