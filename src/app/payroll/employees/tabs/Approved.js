import Input from "y@/app/components/Input";
import SearchBar from "y@/app/components/SearchBar";
import CustomSelect from "y@/app/components/CustomSelect";
import {
    FiUser
} from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import StatusDesign from "y@/app/components/StatusColors";
import { RxCross2 } from "react-icons/rx";
import { MdDone } from "react-icons/md";
import { IoCheckmarkDone } from "react-icons/io5";
import { BiTimeFive } from "react-icons/bi";
import RowActions from "y@/app/components/RowActions";
export default function Approved({
    data = [],
    departments = [],
    statuses = [],
    department,
    onDepartmentChange,
    designationVal,
    onDesignationChange,
    search,
    onSearch,
    status,
    onStatusChange,
    date,
    onDateChange,
    onReject
}) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    return (
        <div>
            <div className="flex justify-between items-center my-3 mt-1">
                <div className="w-1/5 flex items-center mb-1">
                    <SearchBar
                        placeholder="Search by name or ID..."
                        value={search}
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <div className="mb-1 w-[9rem]">
                        <CustomSelect
                            name="department"
                            value={department}
                            placeholder="Department"
                            onChange={onDepartmentChange}
                            options={departments}
                            controlHeight="2rem"
                        />
                    </div>
                    <div className="mb-1 w-[9rem]">
                        <CustomSelect
                            name="desig"
                            value={designationVal}
                            placeholder="Designation"
                            onChange={onDesignationChange}
                            options={departments}
                            controlHeight="2rem"
                        />
                    </div>
                    
                </div>
            </div>
            <div className="overflow-x-auto -mt-2">
                <table className="w-full text-xs border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="px-4 py-3 text-left rounded-tl-md">Emp ID</th>
                            <th className="px-4 py-3 text-left">Name</th>
                            <th className="px-4 py-3 text-left">Department</th>
                            <th className="px-4 py-3 text-left">Designation</th>
                            <th className="px-4 py-3 text-left">Basic Salary</th>
                            <th className="px-4 py-3 text-left">Allowances</th>
                            <th className="px-4 py-3 text-left">Deductions</th>
                            <th className="px-4 py-3 text-left">Net Pay</th>
                            <th className="px-4 py-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-xxs">
                        {data.map((row, idx) => (
                            <tr
                                key={idx}
                                className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    } hover:bg-gray-100 transition-colors`}
                            >
                                <td className="px-4 py-3">{row.empId}</td>
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
                                <td className="px-4 py-3">{row.department}</td>
                                <td className="px-4 py-3">{row.designation}</td>
                                <td className="px-4 py-3">{row.basicSalary.toLocaleString()}</td>
                                <td className="px-4 py-3">{(row.allowances.housing + row.allowances.medical + row.allowances.transport).toLocaleString()}</td>
                                <td className="px-4 py-3">{(row.deductions.tax + row.deductions.absences + row.deductions.lateArrival).toLocaleString()}</td>
                                <td className="px-4 py-3">{row.netPay.toLocaleString()}</td>
                               
                                <RowActions
                                    row={row}
                                    actions={[
                                        { label: "View Detail", icon: MdOutlineRemoveRedEye },
                                        { label: "Mark as Paid", icon: IoCheckmarkDone, color: "green", onClick: () => onReject("paid", row) },
                                        { label: "Pending", icon: BiTimeFive, color: "gold", onClick: () => onReject("pending", row) },
                                        { label: "Reject", icon: RxCross2, color: "red", onClick: () => onReject("reject", row) },
                                    ]}
                                />

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}