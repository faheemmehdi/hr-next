import React from "react";
import { RiInformation2Line } from "react-icons/ri";

export default function Tooltip({ label = "" }) {
  if (!label) return null;

  return (
    <div className="relative inline-block">
      <RiInformation2Line
        className="text-gray-500 cursor-pointer hover:text-blue-500 transition-colors text-sm peer"
        tabIndex={0} // for keyboard focus
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 mt-1 w-max max-w-[200px]
          opacity-0 peer-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200
          bg-gray-800 text-white text-[10px] px-2 py-1 rounded shadow-md z-10 pointer-events-none"
        role="tooltip"
      >
        {label}
      </div>
    </div>
  );
}
