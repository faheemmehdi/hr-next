import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
  placeholder,
  icon,
  variant = "default", // 👈 "auth" or "form"
}) {
  const [showPassword, setShowPassword] = useState(false);

  const finalType = type === "password" && showPassword ? "text" : type;

  // Define style presets
  const variants = {
    default: {
      label: "block text-xxs font-medium text-gray-700 mb-1",
      input:
        "w-full px-4 py-2 border rounded focus:outline-none mb-1 text-xxs h-8 lg:h-10",
    },
    auth: {
      label: "block text-xxs  text-white mb-2 mt-3",
      input:
        "w-full px-4 py-3 mb-1 rounded-md text-white text-xxs h-10 shadow-sm border border-gray-600 bg-transparent focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400",
    },
    wizard: {
      label: "capitalize text-xxs font-medium text-white mb-2 mt-1",
      input:
        "w-full px-4 py-3 bg-white/10 mb-2 rounded-md outline-blue-400 text-white border border-gray-500 text-xxs h-9 shadow-sm",
    },
  };

  return (
    <div className="mb-4">
      {label && <label className={variants[variant].label}>{label}</label>}

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}

        <input
          type={finalType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${variants[variant].input}
            ${icon ? "pl-10" : "pl-4"}
            ${
              type === "password" ? "pr-14" : ""
            }  /* more space for text button */
            ${
              variant === "default"
                ? error
                  ? "border-red-500"
                  : "border-gray-300 focus:border-gray-600"
                : ""
            }`}
        />

        {/* Password toggle text */}
        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-lg text-white font-medium focus:outline-none cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FiEyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <FiEye className="h-4 w-4 text-gray-400" />
            )}
          </button>
        )}
      </div>

      {error && <p className="text-xxs text-red-600 ">{error}</p>}
    </div>
  );
}
