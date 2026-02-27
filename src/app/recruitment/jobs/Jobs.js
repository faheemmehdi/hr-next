"use client";
import Layout from "y@/app/components/Layout";
import Input from "y@/app/components/Input";
import { useState, useEffect, useRef } from "react";
import SearchBar from "y@/app/components/SearchBar";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import CustomSelect from "y@/app/components/CustomSelect";
import {
    FiUser, FiEye
} from "react-icons/fi";
import { FaDotCircle } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Button from "y@/app/components/Button";
import StatusDesign from "y@/app/components/StatusColors";
import ReasonModal from "y@/app/components/ReasonConfirmModal";
import { useRouter } from "next/navigation";
import { MdDone, MdOutlineBlock } from "react-icons/md";
import RowActions from "y@/app/components/RowActions";
import DateRangePicker from "y@/app/components/DateRagePicker";

export default function RecruitmentJobs() {
    const [search, setSearch] = useState("");
    const [emptType, setEmptType] = useState("");
    const [selectDept, setSelectDept] = useState("");
    const [status, setStatus] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isReasonOpen, setIsReasonOpen] = useState(false);
    const [showErrors, setShowErrors] = useState(false);
    const [range, setRange] = useState([
        {
            startDate: undefined,
            endDate: undefined,
            key: 'selection'
        }
    ]);
    
    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const openReasonModal = () => setIsReasonOpen(true);
    const closeReasonModal = () => setIsReasonOpen(false);

    const router = useRouter();


    const jobOpeningsData = [
        {
            jobId: "1",
            jobTitle: "Frontend Developer",
            department: "Engineering",
            employmentType: "Full-Time",
            vacancies: 2,
            applications: 18,
            postedDate: "Jan 5, 2025",
            statusId: 1,
            status: "Open",
        },
        {
            jobId: "2",
            jobTitle: "HR Executive",
            department: "Human Resources",
            employmentType: "Full-Time",
            vacancies: 1,
            applications: 25,
            postedDate: "Feb 12, 2025",
            statusId: 1,
            status: "Open",
        },
        {
            jobId: "3",
            jobTitle: "Sales Manager",
            department: "Sales",
            employmentType: "Full-Time",
            vacancies: 1,
            applications: 14,
            postedDate: "Mar 3, 2025",
            statusId: 2,
            status: "Closed",
        },
      
        {
            jobId: "5",
            jobTitle: "Payroll Officer",
            department: "Finance",
            employmentType: "Part-Time",
            vacancies: 1,
            applications: 6,
            postedDate: "Apr 10, 2025",
            statusId: 3,
            status: "Draft",
        },
      
        {
            jobId: "7",
            jobTitle: "UI/UX Designer",
            department: "Engineering",
            employmentType: "Contract",
            vacancies: 1,
            applications: 12,
            postedDate: "May 8, 2025",
            statusId: 1,
            status: "Open",
        },
        {
            jobId: "8",
            jobTitle: "Business Analyst",
            department: "Operations",
            employmentType: "Full-Time",
            vacancies: 2,
            applications: 16,
            postedDate: "Jun 1, 2025",
            statusId: 2,
            status: "Closed",
        },
         {
            jobId: "10",
            jobTitle: "Accountant",
            department: "Finance",
            employmentType: "Full-Time",
            vacancies: 1,
            applications: 11,
            postedDate: "Jul 3, 2025",
            statusId: 4,
            status: "On Hold",
        },
        {
            jobId: "9",
            jobTitle: "Customer Support Executive",
            department: "Operations",
            employmentType: "Part-Time",
            vacancies: 4,
            applications: 22,
            postedDate: "Jun 15, 2025",
            statusId: 1,
            status: "Open",
        },
       
    ];


    const statuses = mapSelectOptions(
        [
            { id: 1, name: "Draft" },
            { id: 2, name: "Open" },
            { id: 3, name: "Closed" },
            { id: 4, name: "On Hold" }
        ],
        "id",
        "name"
    );
    const employmentTypes = mapSelectOptions(
        [
            { id: 1, name: "Full-Time" },
            { id: 2, name: "Part-Time" },
            { id: 3, name: "Contract" },
            { id: 4, name: "Internship" },
            { id: 5, name: "Temporary" }
        ],
        "id",
        "name"
    );
    const departments = mapSelectOptions(
        [
            { id: 1, name: "Human Resources" },
            { id: 2, name: "Engineering" },
            { id: 3, name: "Sales" },
            { id: 4, name: "Marketing" },
            { id: 5, name: "Finance" },
            { id: 6, name: "Operations" }
        ],
        "id",
        "name"
    );


    const employees = mapSelectOptions(
        [
            { id: 1, name: "Ahmad Khan" },
            { id: 2, name: "Sara Ali" },
            { id: 3, name: "Omar Malik" },
            { id: 4, name: "Ayesha Siddiqui" },
            { id: 5, name: "Bilal Shah" },
            { id: 6, name: "Fatima Noor" },
            { id: 7, name: "Usman Riaz" },
            { id: 8, name: "Hina Javed" },
            { id: 9, name: "Zain Qureshi" },
            { id: 10, name: "Maria Hassan" },
        ],
        "id",
        "name"
    );


    const permissionCategories = mapSelectOptions(
        [
            { id: "cat1", name: "User Management" },
            { id: "cat2", name: "Leave Management" },
            { id: "cat3", name: "Payroll" },
            { id: "cat6", name: "Performance Management" },
            { id: "cat5", name: "Attendance" },
            { id: "cat4", name: "Recruitment" },
        ],
        "id",
        "name"
    );



    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold text-gray-700">
                        Jobs
                    </h2>
                    <Button type="button" variant="success" onClick={() => router.push('/recruitment/jobs/add-job/')}>
                        Add Job
                    </Button>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5">
                    <div className="w-full md:w-1/5 flex items-center mb-1">
                        <SearchBar
                            placeholder="Search by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="w-full flex items-center justify-end flex-col md:flex-row mt-2 md:mt-0 gap-2">
                        <div className="mb-1 w-full md:w-[9rem]">
                            <CustomSelect
                                name="selectDept"
                                value={selectDept}
                                placeholder="Department"
                                onChange={setSelectDept}
                                options={departments}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="mb-1 w-full md:w-[9rem]">
                            <CustomSelect
                                name="selectEmpType"
                                value={emptType}
                                placeholder="Employment Type"
                                onChange={setEmptType}
                                options={employmentTypes}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="mb-1 w-full md:w-[9rem]">
                            <CustomSelect
                                name="status"
                                value={status}
                                placeholder="Status"
                                onChange={setStatus}
                                options={statuses}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="w-full md:w-[9rem]">
                            <DateRangePicker range={range} setRange={setRange} />
                        </div>
                    </div>
                </div>


                <div className="overflow-x-auto shadow-md border border-gray-200 rounded max-h-[72vh]">
                    <table className="w-full text-xs border-collapse">
                        <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="px-4 py-3 text-left">Job Title</th>
                                <th className="px-4 py-3 text-left">Department</th>
                                <th className="px-4 py-3 text-left">Employment Type</th>
                                <th className="px-4 py-3 text-center">Vacancies</th>
                                <th className="px-4 py-3 text-center">Applicants Count</th>
                                <th className="px-4 py-3 text-left">Posted On</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {jobOpeningsData && jobOpeningsData.length > 0 ? (
                                jobOpeningsData.map((row, idx) => (
                                    <tr
                                        key={idx}
                                        className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                            } hover:bg-gray-100 transition-colors`}
                                    >
                                        <td className="px-4 py-3 truncate max-w-[160px]">{row.jobTitle ?? ''}</td>
                                        <td className="px-4 py-3">{row.department ?? ''}</td>
                                        <td className="px-4 py-3">{row.employmentType ?? ''}</td>
                                        <td className="px-4 py-3 text-center">{row.vacancies ?? 0}</td>
                                        <td className="px-4 py-3 text-center">{row.applications ?? 0}</td>
                                        <td className="px-4 py-3">{row.postedDate ?? ''}</td>
                                        <td className="px-4 py-3">
                                            <StatusDesign statusId={row.statusId} label={row.status} />
                                        </td>

                                        <RowActions
                                            row={row}
                                            actions={[
                                                { label: "View Job", icon: MdOutlineRemoveRedEye},
                                                { label: "Deactivate Job", icon: MdOutlineBlock, color: "red", onClick: openReasonModal },
                                            ]}
                                        />

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-center py-4 text-gray-500 italic">
                                        No job found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                <ReasonModal
                    isOpen={isReasonOpen}
                    title="Deactivate Job"
                    infoSection={
                        <div className="border-gray-300 border-b p-1 mb-4">
                            <p className="text-xs text-gray-800 font-medium">
                                <strong className="font-semibold">Frontend Developer</strong>
                            </p>
                          <p className="text-xxs text-gray-600">
                                <strong>Department:</strong> Engineering
                            </p>
                            <p className="text-xxs text-gray-600">
                                <strong>Applicants Count:</strong> 13
                            </p>
                            <p className="text-xxs text-gray-600">
                                <strong>Posted On:</strong> Feb 12, 2025
                            </p>
                           
                        </div>}
                    onClose={closeReasonModal}
                    variant="danger"
                    // onSubmit={handleReject}
                    submitLabel="Deactivate Job"
                    reasonTitle="Please provide a reason for deactivating this job."
                />
            </div>
        </Layout>
    );
}
