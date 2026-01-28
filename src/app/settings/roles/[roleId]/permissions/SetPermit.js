"use client";
import { useState } from "react";
import Button from "y@/app/components/Button";
import Layout from "y@/app/components/Layout";
import SearchBar from "y@/app/components/SearchBar";

export default function SetPermit({ roleId }) {
    const [search, setSearch] = useState("");
    const [userSearch, setUserSearch] = useState("");

    const permissionData = [
        {
            categoryId: "1",
            categoryName: "Employee Management",
            permissions: [
                { id: "1", name: "View Employee" },
                { id: "2", name: "Create Employee" },
                { id: "3", name: "Edit Employee" },
                { id: "4", name: "Delete Employee" },
                { id: "11", name: "Import Employees" },
                { id: "12", name: "Export Employees" },
                { id: "13", name: "View Employee Documents" },
            ],
        },
        {
            categoryId: "2",
            categoryName: "Leave Management",
            permissions: [
                { id: "5", name: "View Leave Requests" },
                { id: "6", name: "Apply Leave" },
                { id: "7", name: "Approve Leave" },
                { id: "14", name: "Reject Leave" },
                { id: "15", name: "Manage Leave Types" },
            ],
        },
        {
            categoryId: "3",
            categoryName: "Payroll",
            permissions: [
                { id: "8", name: "View Payroll" },
                { id: "9", name: "Process Payroll" },
                { id: "16", name: "Generate Payslip" },
                { id: "17", name: "Download Payslip" },
            ],
        },
        {
            categoryId: "4",
            categoryName: "Attendance",
            permissions: [
                { id: "18", name: "View Attendance" },
                { id: "19", name: "Mark Attendance" },
                { id: "20", name: "Edit Attendance" },
                { id: "21", name: "Export Attendance Report" },
                { id: "72", name: "View Users" },
                { id: "73", name: "Activate User" },
                { id: "74", name: "Deactivate User" },
                { id: "67", name: "Create Announcement" },
                { id: "68", name: "Edit Announcement" },
                { id: "69", name: "Delete Announcement" },
            ],
        },

    ];


    const assignedUsers = [
        {
            id: "EMP301",
            name: "Ahsan Qureshi",
            imageUrl: "/api/portraits/men/28.jpg",
            department: "Human Resources",
            designation: "HR Executive",
        },
        {
            id: "EMP302",
            name: "Sana Imran",
            imageUrl: "/api/portraits/women/34.jpg",
            department: "Finance",
            designation: "Accounts Officer",
        },
        {
            id: "EMP303",
            name: "Tahir Hussain",
            imageUrl: "/api/portraits/men/19.jpg",
            department: "Operations",
            designation: "Operations Coordinator",
        },
        {
            id: "EMP304",
            name: "Nimra Gul",
            imageUrl: "/api/portraits/women/41.jpg",
            department: "IT",
            designation: "System Analyst",
        },
{
            id: "EMP305",
            name: "Rana Qureshi",
            imageUrl: "/api/portraits/men/29.jpg",
            department: "Human Resources",
            designation: "HR Executive",
        },

    ];


    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 p-6">

                <div className="flex justify-between items-center w-full my-5">
                    <h3 className="text-base font-semibold text-gray-700">
                        Role: <span className="font-medium">HR Executive</span>
                    </h3>
                    <span className="inline-flex items-center px-3 py-2 text-xxs font-medium rounded-full bg-green-100 text-green-700">
                        Active
                    </span>
                </div>

                <div className="flex justify-between items-center w-full my-2">
                    <h3 className="text-base font-semibold text-gray-700">
                        Assigned Users
                    </h3>
                    <div className="w-1/5 flex items-center mb-1">
                        <SearchBar
                            placeholder="Search by name or ID..."
                            value={userSearch}
                            onChange={(e) => setUserSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto mb-11 shadow-md border border-gray-200 rounded max-h-[48vh]">
                    <table className="w-full text-xs border-collapse">
                        <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="px-4 py-3 text-left">EMP ID</th>
                                <th className="px-4 py-3 text-left">Employee Name</th>
                                <th className="px-4 py-3 text-left">Department</th>
                                <th className="px-4 py-3 text-left">Designation</th>
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {assignedUsers.map((row, idx) => (
                                <tr
                                    key={idx}
                                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        } hover:bg-gray-100 transition-colors`}
                                >
                                    <td className="px-4 py-3">{row.id ?? ''}</td>
                                    <td className="px-4 py-3 flex items-center gap-2">
                                        {row.imageUrl ? (
                                            <img
                                                src={`${baseUrl}${row.imageUrl}`}
                                                alt={row.name}
                                                className="w-7 h-7 rounded-full object-cover border border-gray-300"
                                            />
                                        ) : (
                                            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                                                <FiUser className="text-gray-500" />
                                            </div>
                                        )}
                                        <span className="truncate max-w-[120px]" title={row.name}>{row.name}</span>

                                    </td>
                                    <td className="px-4 py-3">{row.department ?? ''}</td>
                                    <td className="px-4 py-3">{row.designation ?? ''}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                <h3 className="text-base font-semibold text-gray-700 mb-1">
                    Permissions
                </h3>
                <div className="w-full flex justify-between items-center px-1 py-2">
                    <div className="w-1/5 flex items-center mb-1">
                        <SearchBar
                            placeholder="Search permissions..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Button type="button" variant="success">
                        Save Permissions
                    </Button>
                </div>
                <div className="overflow-x-auto w-full mx-auto max-h-[67vh]">
                    {permissionData.map(({ categoryId, categoryName, permissions }) => (
                        <section key={categoryId} className=" p-4 border-b border-gray-200">
                            <h2 className="mb-3 font-semibold text-gray-700 pb-1 text-xs sticky top-0 bg-white z-10">
                                {categoryName}
                            </h2>

                            <div className="flex flex-wrap gap-4">
                                {permissions.map(({ id, name }) => (
                                    <label
                                        key={id}
                                        className="flex items-center cursor-pointer select-none text-xxs hover:bg-gray-50 p-1 transition w-[150px] rounded"
                                        title={name}
                                    >
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-3 w-3 text-blue-600 mr-2"
                                        />
                                        <span className="truncate text-gray-600">{name}</span>
                                    </label>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
