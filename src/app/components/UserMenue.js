"use client";
import { useState, useRef, useEffect } from "react";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import Image from "next/image";
export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClose = () => setOpen(false);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="flex items-center space-x-2 text-gray-700"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Image
          src="/images/logo.webp"
          alt="Logo"
          width={40}
          height={40}
          className="rounded-full border border-gray-300"
        />

        <span className="hidden md:block font-medium text-gray-300">
          User Name
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50">
          <div className="px-4 py-2 text-xxs text-gray-400 border-b">
            WELCOME!
          </div>
          <a
            href="/profile"
            onClick={handleClose}
            className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
          >
            <FiUser className="mr-2" /> My Profile
          </a>
          <a
            href="/settings"
            onClick={handleClose}
            className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
          >
            <FiSettings className="mr-2" /> Preferences
          </a>
          <button
            onClick={handleClose}
            className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
          >
            <FiLogOut className="mr-2" /> Logout
          </button>
        </div>
      )}
    </div>
  );
}
