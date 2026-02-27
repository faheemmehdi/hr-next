"use client";
import Layout from "y@/app/components/Layout";
import Input from "y@/app/components/Input";
import { useState, useEffect, useRef } from "react";
import SearchBar from "y@/app/components/SearchBar";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import CustomSelect from "y@/app/components/CustomSelect";
import {
    FiUser, FiEdit3
} from "react-icons/fi";
import { IoSync } from "react-icons/io5";
import { FaDotCircle, FaSyncAlt } from "react-icons/fa";
import { MdOutlineRemoveRedEye, MdOutlineCalendarMonth  } from "react-icons/md";
import Button from "y@/app/components/Button";
import StatusDesign from "y@/app/components/StatusColors";
import ReasonModal from "y@/app/components/ReasonConfirmModal";
import { useRouter } from "next/navigation";
import { MdDone, MdOutlineBlock } from "react-icons/md";
import RowActions from "y@/app/components/RowActions";
import DateRangePicker from "y@/app/components/DateRagePicker";

export default function Applicants() {
    const [search, setSearch] = useState("");
    const [emptType, setEmptType] = useState("");
    const [selectDept, setSelectDept] = useState("");
    const [status, setStatus] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isReasonOpen, setIsReasonOpen] = useState(false);
    const [showErrors, setShowErrors] = useState(false);
    const [experience, setExperience] = useState("");
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


    const applicantsData = [
        {
            applicantId: "1",
            candidateName: "Ali Raza",
            jobApplied: "Frontend Developer",
            department: "Engineering",
            appliedDate: "Jan 10, 2025",
            experience: "3 Years",
            status: "New",
            statusId: 1,
            rating: 4,
            source: "LinkedIn",
        },
        {
            applicantId: "2",
            candidateName: "Ahmed Khan",
            jobApplied: "HR Executive",
            department: "Human Resources",
            appliedDate: "Feb 14, 2025",
            experience: "2 Years",
            status: "Screening",
            statusId: 6,
            rating: 3,
            source: "Company Website",
        },
        {
            applicantId: "3",
            candidateName: "Sara Malik",
            jobApplied: "Sales Manager",
            department: "Sales",
            appliedDate: "Mar 5, 2025",
            experience: "5 Years",
            status: "Interviewed",
            statusId: 3,
            rating: 5,
            source: "Referral",
        },
        {
            applicantId: "4",
            candidateName: "Usman Tariq",
            jobApplied: "UI/UX Designer",
            department: "Engineering",
            appliedDate: "May 12, 2025",
            experience: "4 Years",
            status: "Shortlisted",
            statusId: 4,
            rating: 4,
            source: "Indeed",
        },
        {
            applicantId: "5",
            candidateName: "Hira Noor",
            jobApplied: "Accountant",
            department: "Finance",
            appliedDate: "Jul 8, 2025",
            experience: "6 Years",
            status: "Offer Sent",
            statusId: 5,
            rating: 5,
            source: "LinkedIn",
        },
        {
            applicantId: "6",
            candidateName: "Bilal Ahmed",
            jobApplied: "Customer Support Executive",
            department: "Operations",
            appliedDate: "Jun 18, 2025",
            experience: "1 Year",
            status: "Rejected",
            statusId: 2,
            rating: 2,
            source: "Facebook",
        }
    ];

    const statuses = mapSelectOptions(
        [
            { id: 1, name: "New" },
            { id: 2, name: "Screening" },
            { id: 3, name: "Interviewed" },
            { id: 4, name: "Shortlisted" },
            { id: 5, name: "Offer Sent" },
            { id: 6, name: "Rejected" }
        ],
        "id",
        "name"
    );
    const experiences = mapSelectOptions(
        [
            { id: 0, name: "0 Year" },
            { id: 1, name: "1 Year" },
            { id: 2, name: "2 Year" },
            { id: 3, name: "3 Year" },
            { id: 4, name: "4 Year" },
            { id: 5, name: "5 Year" },
            { id: 6, name: "6 Year" },
            { id: 7, name: "7 Year" },
            { id: 8, name: "8 Year" },
            { id: 9, name: "9 Year" },
            { id: 10, name: "10 Year" },
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


    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold text-gray-700">
                        Applicants
                    </h2>
                    <Button type="button" variant="success" onClick={() => router.push('/recruitment/jobs/add-job/')}>
                        Export Applicants
                    </Button>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5">
                    <div className="w-full md:w-1/5 flex items-center mb-1">
                        <SearchBar
                            placeholder="Search by name or job..."
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
                                name="experience"
                                value={experience}
                                placeholder="Experience"
                                onChange={setExperience}
                                options={experiences}
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
                                <th className="px-4 py-3 text-left">Candidate Name</th>
                                <th className="px-4 py-3 text-left">Job Applied</th>
                                <th className="px-4 py-3 text-left">Department</th>
                                <th className="px-4 py-3 text-left">Applied Date</th>
                                <th className="px-4 py-3 text-center">Experience</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Rating</th>
                                <th className="px-4 py-3 text-left">Source</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {applicantsData && applicantsData.length > 0 ? (
                                applicantsData.map((row, idx) => (
                                    <tr
                                        key={idx}
                                        className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                            } hover:bg-gray-100 transition-colors`}
                                    >
                                        <td className="px-4 py-3 truncate max-w-[160px]">{row.candidateName ?? ''}</td>
                                        <td className="px-4 py-3 truncate max-w-[160px]">{row.jobApplied ?? ''}</td>
                                        <td className="px-4 py-3">{row.department ?? ''}</td>
                                        <td className="px-4 py-3">{row.appliedDate ?? ''}</td>
                                        <td className="px-4 py-3 text-center">{row.experience ?? ''}</td>
                                        <td className="px-4 py-3">
                                            <StatusDesign statusId={row.statusId} label={row.status} />
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span key={star}>
                                                        {star <= row.rating ? "⭐" : ""}
                                                    </span>
                                                ))}
                                                <span className="text-sm text-gray-500 ml-1">
                                                    ({row.rating}/5)
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">{row.source ?? ''}</td>

                                        <RowActions
                                            row={row}
                                            actions={[
                                                { label: "View Applicant", icon: MdOutlineRemoveRedEye },
                                                { label: "Edit Applicant", icon: FiEdit3 },
                                                { label: "Change Status", icon: IoSync },
                                                { label: "Schedule Interview", icon: MdOutlineCalendarMonth },
                                                { label: "Reject", icon: MdOutlineBlock, color: "red", onClick: openReasonModal },
                                            ]}
                                        />

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-center py-4 text-gray-500 italic">
                                        No applicant found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <ReasonModal
                    isOpen={isReasonOpen}
                    title="Reject Applicant"
                    infoSection={
                        <div className="border-gray-300 border-b p-1 mb-4">
                            <p className="text-xs text-gray-800 font-medium">
                                <strong className="font-semibold">Muhammad Gulzar</strong>
                            </p>
                            <p className="text-xxs text-gray-600">
                                <strong>Department:</strong> Engineering
                            </p>
                            <p className="text-xxs text-gray-600">
                                <strong>Experience:</strong> 4 Years
                            </p>
                            <p className="text-xxs text-gray-600">
                                <strong>Applied Date:</strong> Feb 12, 2025
                            </p>

                        </div>}
                    onClose={closeReasonModal}
                    variant="danger"
                    // onSubmit={handleReject}
                    submitLabel="Reject Applicant"
                    reasonTitle="Please provide a reason for rejecting this applicant."
                />
            </div>
        </Layout>
    );
}
