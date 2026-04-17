"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  FiUser,
  FiActivity,
  FiSettings,
  FiLogOut,
  FiPlus,
  FiCheck,
} from "react-icons/fi";
import { FaRegBell } from "react-icons/fa6";
import QuickAddModal from "./QuickAddModal";
export default function Navbar() {
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [openQuickAdd, setOpenQuickAdd] = useState(false);
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

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };
  
  const getNotificationInitial = (message) => {
    if (!message) return "N";
    return message.trim().charAt(0).toUpperCase();
  };

  
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
        <button
          type="button"
          onClick={() => setOpenQuickAdd(true)}
          className="h-7 px-2 rounded border border-gray-500 text-gray-200 hover:text-white hover:border-gray-300 text-xxs inline-flex items-center gap-1 cursor-pointer"
        >
          <FiPlus size={12} />
          Quick Add
        </button>

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
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] min-w-[15px] h-[15px] px-[3px] rounded-full inline-flex items-center justify-center leading-none">
                {unreadCount}
              </span>
            )}
          </button>

          {openNotif && (
            <div className="absolute right-0 mt-3 w-84 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-fade-in">
              <div className="px-4 py-3 border-b border-gray-200 bg-[#fafcff]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-gray-800">Notifications</p>
                    <span className="inline-flex items-center rounded-full bg-[#edf4ff] text-[#315d9c] px-2 py-[1px] text-[10px] font-medium">
                      {unreadCount} new
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="text-[10px] text-[#315d9c] font-medium hover:underline cursor-pointer"
                  >
                    Mark all read
                  </button>
                </div>
              </div>

              <ul className="max-h-84 overflow-y-auto custom-scrollbar bg-white">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <li
                      key={notif.id}
                      onClick={() => markAsRead(notif.id)}
                      className={`cursor-pointer transition border-b border-gray-100 last:border-b-0 ${
                        notif.read ? "bg-white hover:bg-gray-50" : "bg-[#f8fbff] hover:bg-[#f2f7ff]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 w-full px-4 py-3">
                        <div className={`h-8 w-8 rounded-full text-[10px] font-semibold inline-flex items-center justify-center flex-shrink-0 ${
                          notif.read ? "bg-gray-100 text-gray-500" : "bg-[#dce9ff] text-[#315d9c]"
                        }`}>
                          {getNotificationInitial(notif.message)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-xxs leading-4 ${
                              notif.read
                                ? "text-gray-700"
                                : "text-gray-800 font-semibold"
                            }`}
                          >
                            {notif.message}
                          </p>
                          <p className="text-[10px] text-gray-500 mt-1">Activity update</p>
                        </div>
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <span className="text-[10px] text-gray-500 whitespace-nowrap">
                            {notif.time}
                          </span>
                          {!notif.read && <span className="h-1.5 w-1.5 rounded-full bg-[#315d9c]" />}
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-8 text-center text-xxs text-gray-500">
                    No notifications available.
                  </li>
                )}
              </ul>

              <div className="px-4 py-2.5 text-center border-t border-gray-200 bg-white">
                <button
                  type="button"
                  className="text-xxs text-[#315d9c] font-semibold hover:underline cursor-pointer"
                >
                  See All Notifications
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <QuickAddModal
        isOpen={openQuickAdd}
        onClose={() => setOpenQuickAdd(false)}
      />
    </nav>
  );
}
