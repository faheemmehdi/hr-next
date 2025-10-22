import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";

export default function CheckboxDropdown({
  label = "", // optional label
  columns = [],
  selected = [],
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = (col) => {
    if (selected.includes(col)) {
      onChange(selected.filter((c) => c !== col));
    } else {
      onChange([...selected, col]);
    }
  };

  const handleSelectAll = () => {
    if (selected.length === columns.length) onChange([]);
    else onChange(columns.map((col) => col.key));
  };

  return (
    <div className="w-full" ref={dropdownRef}>
      {label && (
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
          {label}
        </label>
      )}

      <div className="relative w-full">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-full border border-gray-300 bg-white text-gray-700 text-xxs px-3 py-2 rounded hover:bg-gray-50 transition"
        >
          <span className="text-gray-400">Select Columns</span>
          <FiChevronDown
            className={`w-4 h-4 transition-transform text-gray-400`}
          />
        </button>

        {open && (
          <div
            className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-xl z-50 overflow-hidden"
            style={{ animation: "fadeIn 0.15s ease-out" }}
          >
            <div className="p-2 max-h-[240px] overflow-y-auto text-xxs text-gray-700">
              <div
                onClick={handleSelectAll}
                className="flex items-center px-2 py-1 rounded hover:bg-gray-100 cursor-pointer font-medium"
              >
                <input
                  type="checkbox"
                  checked={selected.length === columns.length}
                  readOnly
                  className="mr-2 accent-blue-600"
                />
                Select All
              </div>
              <hr className="my-1" />
              {columns.map((col) => (
                <div
                  key={col.key}
                  onClick={() => handleToggle(col.key)}
                  className="flex items-center px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(col.key)}
                    readOnly
                    className="mr-2 accent-blue-600"
                  />
                  {col.label}
                  {selected.includes(col.key) && (
                    <FiCheck className="ml-auto text-blue-600 w-3.5 h-3.5" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
