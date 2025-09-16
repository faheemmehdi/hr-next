import Select from "react-select";

export default function CustomSelect(props) {
  const {
    label,
    name,
    value,
    onChange,
    options = [],
    placeholder = "Select...",
    isSearchable = true,
    isMulti = false,
    error,
    setError, // 👈 expect a setter from parent
    variant = "default", // 👈 new prop
  } = props;

  const getValue = () => {
    if (!value) return isMulti ? [] : null;
    if (isMulti) {
      return options.filter((option) => value.includes(option.value));
    } else {
      return options.find((option) => option.value === value) || null;
    }
  };

  const handleChange = (selected) => {
    if (isMulti) {
      const vals = selected.map((item) => item.value);
      onChange(vals);
      if (setError) setError(name, "");
    } else {
      const val = selected ? selected.value : "";
      onChange(val);
      if (setError) setError(name, "");
    }
  };

  // ✅ Define variant-based styles
  const baseStyles = {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    valueContainer: (base) => ({ ...base, paddingLeft: "0.5rem" }),
    placeholder: (base) => ({ ...base, color: "#9ca3af" }),
  };

  const variantStyles = {
    default: {
      control: (base, state) => {
        let borderColor = "#d1d5db"; // gray-300
        if (error) borderColor = "#dc2626"; // red-600
        else if (state.isFocused) borderColor = "#000000"; // black

        return {
          ...base,
          borderRadius: "0.25rem",
          borderWidth: "1px",
          borderColor,
          backgroundColor: "#ffffff",
          color: "#111827",
          boxShadow: "none",
          padding: "2px",
          fontSize: "0.875rem",
          height: "2.75rem",
          "&:hover": { borderColor },
        };
      },
    },
    auth: {
      control: (base, state) => {
        let borderColor = "#4b5563"; // gray-600 default
        if (error) borderColor = "#4b5563"; // red-600
        else if (state.isFocused) borderColor = "#2563eb"; // blue-600

        return {
          ...base,
          borderRadius: "0.5rem",
          borderWidth: "1px",
          borderColor,
          backgroundColor: "transparent",
          color: "#ffffff",
          boxShadow: "none",
          padding: "6px",
          fontSize: "1rem",
          height: "3.25rem",
          "&:hover": { borderColor },
        };
      },
      placeholder: (base) => ({ ...base, color: "#9ca3af" }),
      singleValue: (base) => ({ ...base, color: "#ffffff" }),
      input: (base) => ({ ...base, color: "#ffffff" }),
      option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected
          ? "#2563eb"
          : state.isFocused
          ? "#1e293b"
          : "#ffffff",
        color: state.isSelected ? "#ffffff" : "#000",
        color: state.isFocused ? "#ffffff" : "#000",
      }),
    },
    wizard: {
      control: (base, state) => {
        let borderColor = "#4b5563"; // gray-600 default
        if (error) borderColor = "#4b5563"; // red-600
        else if (state.isFocused) borderColor = "#2563eb"; // blue-600

        return {
          ...base,
          borderRadius: "0.5rem",
          borderWidth: "1px",
          borderColor,
          backgroundColor: "transparent",
          color: "#ffffff",
          boxShadow: "none",
          padding: "6px",
          fontSize: "0.75rem",
          height: "2.82rem",
          "&:hover": { borderColor },
        };
      },
      indicatorsContainer: (base) => ({
        ...base,
        height: "100%", // take full height of control
        display: "flex",
        alignItems: "center", // vertical center
      }),
      placeholder: (base) => ({ ...base, color: "#9ca3af" }),
      singleValue: (base) => ({ ...base, color: "#ffffff" }),
      input: (base) => ({ ...base, color: "#ffffff" }),
      option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected
          ? "#2563eb"
          : state.isFocused
          ? "#1e293b"
          : "#ffffff",
        color: state.isSelected ? "#ffffff" : "#000",
        color: state.isFocused ? "#ffffff" : "#000",
        fontSize: "0.75rem",
      }),
    },
  };

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className={
            variant === "auth"
              ? "block text-xxs font-medium text-white mb-2"
              : variant === "wizard"
              ? "text-xxs font-medium text-gray-200 mb-2"
              : "block text-xxs font-medium text-gray-700 mb-1"
          }
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
        placeholder={
          variant !== "auth" || (variant !== "wizard" && placeholder)
        }
        isSearchable={isSearchable}
        isMulti={isMulti}
        className="react-select-container"
        classNamePrefix="react-select"
        menuPlacement="auto"
        menuPosition="fixed"
        menuPortalTarget={typeof window !== "undefined" ? document.body : null}
        components={{ IndicatorSeparator: () => null }}
        styles={{
          ...baseStyles,
          ...(variantStyles[variant] || variantStyles.default),
        }}
      />

      {error && <p className="text-xxs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
