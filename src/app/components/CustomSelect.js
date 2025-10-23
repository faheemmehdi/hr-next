"use client";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });


export default function CustomSelect({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select...",
  isSearchable = true,
  isMulti = false,
  error,
  variant = "default", // "default", "auth", "wizard"
  controlHeight = "2.75rem",
  controlWidth,
}) {
  const handleChange = (selected) => {
    if (isMulti) {
      onChange(selected ? selected.map((item) => item.value) : []);
    } else {
      onChange(selected ? selected.value : "");
    }
  };

  const getValue = () => {
    if (!value) return isMulti ? [] : null;
    if (isMulti) return options.filter((opt) => value.includes(opt.value));
    return options.find((opt) => opt.value === value) || null;
  };

  const baseStyles = {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    placeholder: (base) => ({
    ...base,
    color: "#9ca3af",
    display: "flex",
    alignItems: "center",
    height: "100%",
    fontWeight: 500,
  }),
    menu: (base) => ({
      ...base,
      borderRadius: "0.5rem",
      overflow: "hidden",
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: "180px",
      overflowY: "auto",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#2563eb"
        : state.isFocused
          ? "#f3f4f6"
          : "#fff",
      color: state.isSelected ? "#fff" : "#000",
      fontSize: "0.700rem",
    }),
    dropdownIndicator: (base, state) => ({
  ...base,
  padding: "2px 6px",
  color: "#9ca3af",
  svg: { width: "14px", height: "14px" },
}),

  };

  const variantStyles = {
    default: {
      control: (base, state) => ({
        ...base,
        borderColor: error ? "#dc2626" : state.isFocused ? "#000" : "#d1d5db",
        backgroundColor: "#fff",
        color: "#111827",
        boxShadow: "none",
        borderRadius: "0.2rem",
        width: "100%",               
    maxWidth: controlWidth || "100%",
        height: isMulti ? 'auto' : controlHeight,
        minHeight: isMulti ? 'auto' : controlHeight,
        paddingTop: 0,
        paddingBottom: 0,
        display: "flex",              
        alignItems: "center",       
        justifyContent: "space-between",
        fontSize: "0.700rem",
      }),

      singleValue: (base) => ({ ...base, color: "#111827" }),
      input: (base) => ({ ...base, color: "#111827" }),
    },

    auth: {
      control: (base, state) => ({
        ...base,
        borderColor: error ? "#ef4444" : state.isFocused ? "#2563eb" : "#4b5563",
        backgroundColor: "rgba(255,255,255,0.1)",
        color: "#fff",
        borderRadius: "0.5rem",
        minHeight: "3rem",
        fontSize: "0.700rem",
        boxShadow: "none",
        "&:hover": { borderColor: "#2563eb" },
      }),
      singleValue: (base) => ({ ...base, color: "#fff" }),
      input: (base) => ({ ...base, color: "#fff" }),
      placeholder: (base) => ({ ...base, color: "#9ca3af" }),
    },

    wizard: {
      control: (base, state) => ({
        ...base,
        borderColor: error ? "#ef4444" : state.isFocused ? "#2563eb" : "#4b5563",
        backgroundColor: "transparent",
        color: "#fff",
        borderRadius: "0.5rem",
        minHeight: "2.5rem",
        fontSize: "0.700rem",

        boxShadow: "none",
        "&:hover": { borderColor: "#2563eb" },
      }),
      singleValue: (base) => ({ ...base, color: "#fff" }),
      input: (base) => ({ ...base, color: "#fff" }),
      placeholder: (base) => ({ ...base, color: "#9ca3af" }),
    },
  };

  const customStyles = {
    ...baseStyles,
    ...(variantStyles[variant] || variantStyles.default),
  };

  return (
    <div className={`${variant === 'default' ? '' : 'mb-4'}`}>
      {label && (
        <label
          htmlFor={name}
          className={`block text-xxs font-medium mb-1 ${variant === "auth" || variant === "wizard"
            ? "text-gray-200"
            : "text-gray-700"
            }`}
        >
          {label}
        </label>
      )}

      <Select
        id={name}
        name={name}
        value={getValue()}
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
        isSearchable={isSearchable}
        isMulti={isMulti}
        styles={customStyles}
        menuPortalTarget={typeof document !== "undefined" ? document.body : null}
        components={{ IndicatorSeparator: () => null }}
        classNamePrefix="react-select"
      />

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
