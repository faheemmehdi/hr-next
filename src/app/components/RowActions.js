import { useState, useRef, useEffect } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

export default function RowActions({ row, actions = [] }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <td className="px-4 py-3 relative">
      <button
        onClick={(e) => { setOpen(!open); e.stopPropagation() }}
        className="p-1 rounded-full hover:bg-gray-100 transition cursor-pointer"
      >
        <BiDotsVerticalRounded className="text-gray-600 text-sm" />
      </button>

      {open && (
        <div
          ref={menuRef}
          className="absolute top-6 right-13 z-50 w-40 bg-white border border-gray-200 rounded-xl shadow-lg p-[5px]"
          style={{ minWidth: "8rem", width: "max-content" }}
        >
          <ul className="py-1 text-xxs text-gray-700">
            {actions.map((action, idx) => (
              <li key={idx}>
                <button
                  onClick={(e) => {
                    if (typeof action.onClick === "function") {
                      action.onClick(row);
                    }
                    e.stopPropagation();
                    setOpen(false);
                  }}
                  className={`flex items-center w-full px-3 py-2  cursor-pointer hover:bg-gray-50 ${action.color === "red"
                    ? "text-red-600"
                    : action.color === "green"
                      ? "hover:text-green-600"
                      : action.color === "gold"
                        ? "hover:text-yellow-600"
                        : "text-gray-700"
                    }`}
                >
                  {action.icon && (
                    <action.icon className="mr-2 text-sm" />
                  )}
                  {action.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </td>
  );
}
