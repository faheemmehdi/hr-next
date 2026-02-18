import {
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiMinusCircle,
  FiInfo,
} from "react-icons/fi";

const StatusDesign = ({ statusId, label }) => {
  // Define icon and color per status
  const statusMap = {
    1: { icon: <FiCheckCircle className="inline text-green-700 mr-1" />, color: "text-green-700", bg: "bg-[#e6faf0]" },   // Approved / Active
    2: { icon: <FiXCircle className="inline text-red-700 mr-1" />, color: "text-red-700", bg: "bg-[#fce8ee]" },           // Rejected / Error
    3: { icon: <FiClock className="inline text-yellow-700 mr-1" />, color: "text-yellow-700", bg: "bg-[#faf4cd]" },       // Pending / Warning
    4: { icon: <FiMinusCircle className="inline text-gray-700 mr-1" />, color: "text-gray-700", bg: "bg-gray-100" },     // Inactive / Unknown
    5: { icon: <FiInfo className="inline text-blue-700 mr-1" />, color: "text-blue-700", bg: "bg-[#edf6fc]" }, // Info / Loading / In Progress
  };

  const { icon, color, bg } = statusMap[statusId] || {
    icon: <FiMinusCircle className="inline text-gray-400 mr-1" />,
    color: "text-gray-500",
    bg: "bg-gray-100"
  };

  return (
    <span className={`inline-flex items-center text-xxs font-semibold ${color} ${bg} rounded-2xl px-2 py-[4px]`}>
      {icon}
      {label || "Unknown"}
    </span>
  );
};

export default StatusDesign;
