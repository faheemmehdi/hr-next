import {
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiMinusCircle,
  FiLoader,
} from "react-icons/fi";

const StatusDesign = ({ statusId, label }) => {
  // Define icon and color per status
  const statusMap = {
    1: { icon: <FiCheckCircle className="inline text-green-500 mr-1" />, color: "text-green-600" },   // Approved / Active
    2: { icon: <FiXCircle className="inline text-red-500 mr-1" />, color: "text-red-600" },           // Rejected / Error
    3: { icon: <FiClock className="inline text-yellow-500 mr-1" />, color: "text-yellow-600" },       // Pending / Warning
    4: { icon: <FiMinusCircle className="inline text-gray-500 mr-1" />, color: "text-gray-600" },     // Inactive / Unknown
    5: { icon: <FiLoader className="inline animate-spin text-blue-500 mr-1" />, color: "text-blue-600" }, // Info / Loading / In Progress
  };

  const { icon, color } = statusMap[statusId] || {
    icon: <FiMinusCircle className="inline text-gray-400 mr-1" />,
    color: "text-gray-500",
  };

  return (
    <span className={`inline-flex items-center text-xs font-semibold ${color}`}>
      {icon}
      {label || "Unknown"}
    </span>
  );
};

export default StatusDesign;
