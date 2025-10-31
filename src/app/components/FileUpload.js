import { RiInformation2Line } from "react-icons/ri";
import { HiOutlinePaperClip } from "react-icons/hi";

export default function FileUpload({
  label,
  name,
  onChange,
  value,
  error,
  noMargin = false,
  tooltip = "",
  variant = "default",
}) {
  const variants = {
    default: {
      label: "text-xxs font-medium text-gray-700 mb-1",
      wrapper:
        "w-full border rounded border-gray-300 focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 flex items-center overflow-hidden text-xxs h-6 lg:h-8 mb-1",
      iconBox: "bg-gray-100 text-gray-600 px-3 py-2 flex items-center justify-center border-r border-gray-300",
      textBox: "flex-1 px-3 py-1 text-gray-500 cursor-pointer truncate",
    }
  };

  const v = variants[variant];

  return (
    <div className={`${noMargin ? "" : "mb-4"}`}>
      {/* Label + Tooltip (same as Input) */}
      {label && (
        <label className={`${v.label} flex items-center gap-1 relative`}>
          <span>{label}</span>
          {tooltip && (
            <div className="relative">
              <RiInformation2Line className="text-gray-500 cursor-pointer hover:text-blue-500 transition-colors text-sm peer" />
              <div
                className="absolute left-1/2 -translate-x-1/2 mt-1 w-max max-w-[200px]
                opacity-0 peer-hover:opacity-100 transition-opacity duration-200
                bg-gray-800 text-white text-[10px] px-2 py-1 rounded shadow-md z-10 pointer-events-none"
              >
                {tooltip}
              </div>
            </div>
          )}
        </label>
      )}

      {/* Upload input */}
      <label htmlFor={name} className={`${v.wrapper} cursor-pointer`}>
        {/* Left icon box */}
        <div className={`${v.iconBox}`}>
          <HiOutlinePaperClip className="w-4 h-4" />
        </div>

        {/* Right text box */}
        <div className={`${v.textBox}`}>
          {value && value.name ? value.name : "Choose file..."}
        </div>

        {/* Hidden input */}
        <input
          id={name}
          name={name}
          type="file"
          onChange={onChange}
          className="hidden"
        />
      </label>

      {/* Error */}
      {error && <p className="text-xxs text-red-500 mt-[2px]">{error}</p>}
    </div>
  );
}
