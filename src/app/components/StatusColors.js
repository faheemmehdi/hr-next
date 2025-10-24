const StatusDesign = ({statusId, label}) =>{
 const statusStyles = {
    1: "bg-green-100 text-green-700",   // Active / Online / Approved
    2: "bg-red-100 text-red-700",       // Rejected / Offline / Error
    3: "bg-yellow-100 text-yellow-700", // Pending / Warning
    4: "bg-gray-100 text-gray-700",     // Inactive / Unknown
    5: "bg-blue-100 text-blue-700",     // Info / Synced / In Progress
  };

  const badgeClass = statusStyles[statusId] || "bg-gray-100 text-gray-600";

  return (
    <span
      className={`px-2 py-1 rounded-full text-xxs font-medium ${badgeClass}`}
    >
      {label || "Unknown"}
    </span>
  );
}
export default StatusDesign;