import Layout from "../components/Layout";
import { FiSettings } from "react-icons/fi";
import Link from "next/link";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaClock,
  FaUserTimes,
  FaUmbrellaBeach,
} from "react-icons/fa";

function AttendanceClient() {
  const stats = [
    {
      title: "Check-In Employees",
      value: 117,
      icon: <FaSignInAlt className="text-green-500 text-xl" />,
    },
    {
      title: "Check-Out Employees",
      value: 212,
      icon: <FaSignOutAlt className="text-pink-500 text-xl" />,
    },
    {
      title: "Late Employees",
      value: 15,
      icon: <FaClock className="text-orange-500 text-xl" />,
    },
    {
      title: "Absent Employees",
      value: 15,
      icon: <FaUserTimes className="text-red-600 text-xl" />,
    },
    {
      title: "Employees on Leave",
      value: 8,
      icon: <FaUmbrellaBeach className="text-blue-500 text-xl" />,
    },
  ];

  return (
    <Layout>
      <div className="flex justify-between text-lg p-1 mb-2">
        <h2>Attendance Management</h2>
        <Link href="/attendance/settings">
          <FiSettings className="text-gray-600 cursor-pointer" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-2">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col justify-between hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-medium text-gray-600">
                {stat.title}
              </h3>
              {stat.icon}
            </div>
            <p className="text-sm font-semibold text-gray-800 mt-3">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
export default AttendanceClient;
