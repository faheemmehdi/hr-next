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
import { BsSend } from "react-icons/bs";
import { MdOutlineRemoveRedEye, MdOutlineCalendarMonth, MdOutlineEventRepeat } from "react-icons/md";
import Button from "y@/app/components/Button";
import StatusDesign from "y@/app/components/StatusColors";
import ReasonModal from "y@/app/components/ReasonConfirmModal";
import { useRouter } from "next/navigation";
import { MdDone, MdOutlineBlock, MdOutlineRateReview, MdOutlineCheckCircleOutline } from "react-icons/md";
import RowActions from "y@/app/components/RowActions";
import DateRangePicker from "y@/app/components/DateRagePicker";
import Modal from "y@/app/components/ModalShell";
import RichTextEditor from "y@/app/components/RichTextEditor";
import FeedbackStars from "y@/app/components/FeedbackStars";

export default function Interview() {
    const [search, setSearch] = useState("");
    const [interType, setInterType] = useState("");
    const [interRound, setInterRound] = useState("");
    const [interviewer, setInterviewer] = useState("");
    const [interDate, setInterDate] = useState("");
    const [interTime, setInterTime] = useState("");
    const [status, setStatus] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [isReasonOpen, setIsReasonOpen] = useState(false);
    const [filterTime, setFilterTime] = useState("");
    const [candidate, setCandidate] = useState("");
    const [applyJob, setApplyJob] = useState("Web Developer");
    const [desc, setDesc] = useState("");
    const [feedNote, setFeedNote] = useState("");
    const [interviewMode, setInterviewMode] = useState("Online");
    const [candVal, setCandVal] = useState("Elon Star");
    const [techScore, setTechScore] = useState("");
    const [commScore, setCommScore] = useState("");
    const [range, setRange] = useState([
        {
            startDate: undefined,
            endDate: undefined,
            key: 'selection'
        }
    ]);

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const openFeedbackModal = () => setFeedbackOpen(true);
    const closeFeedbackModal = () => setFeedbackOpen(false);
    const openReasonModal = () => setIsReasonOpen(true);
    const closeReasonModal = () => setIsReasonOpen(false);

    const router = useRouter();


    const interviewsData = [
        {
            interviewId: "1",
            candidateName: "Ali Raza",
            jobApplied: "Frontend Developer",
            interviewType: "Technical",
            interviewRound: "Round 1",
            interviewer: "Ahmed HR",
            date: "Mar 12, 2025",
            time: "3:00 PM",
            mode: "Online",
            statusId: 3,
            status: "Scheduled",
            feedbackStatus: "Pending"
        },
        {
            interviewId: "2",
            candidateName: "Ahmed Khan",
            jobApplied: "HR Executive",
            interviewType: "HR",
            interviewRound: "Round 1",
            interviewer: "Sara Malik",
            date: "Mar 15, 2025",
            time: "11:00 AM",
            mode: "Onsite",
            statusId: 1,
            status: "Completed",
            feedbackStatus: "Submitted"
        },
        {
            interviewId: "3",
            candidateName: "Sara Malik",
            jobApplied: "Sales Manager",
            interviewType: "Final",
            interviewRound: "Final Round",
            interviewer: "Director Sales",
            date: "Mar 18, 2025",
            time: "2:00 PM",
            mode: "Online",
            statusId: 3,
            status: "Scheduled",
            feedbackStatus: "Pending"
        },
        {
            interviewId: "4",
            candidateName: "Usman Tariq",
            jobApplied: "UI/UX Designer",
            interviewType: "Technical",
            interviewRound: "Round 2",
            interviewer: "Lead Designer",
            date: "Mar 20, 2025",
            time: "4:30 PM",
            mode: "Onsite",
            statusId: 2,
            status: "Cancelled",
            feedbackStatus: ""
        },
        {
            interviewId: "5",
            candidateName: "Hira Noor",
            jobApplied: "Accountant",
            interviewType: "HR",
            interviewRound: "Round 1",
            interviewer: "Finance Manager",
            date: "Mar 22, 2025",
            time: "10:00 AM",
            mode: "Online",
            statusId: 1,
            status: "Completed",
            feedbackStatus: "Submitted"
        },

        // ✅ New Records Added

        {
            interviewId: "6",
            candidateName: "Bilal Ahmed",
            jobApplied: "Customer Support Executive",
            interviewType: "HR",
            interviewRound: "Round 1",
            interviewer: "Operations Manager",
            date: "Mar 25, 2025",
            time: "1:30 PM",
            mode: "Online",
            statusId: 4,
            status: "Rescheduled",
            feedbackStatus: "Pending"
        },
        {
            interviewId: "7",
            candidateName: "Ayesha Siddiqui",
            jobApplied: "Marketing Specialist",
            interviewType: "Technical",
            interviewRound: "Round 1",
            interviewer: "Marketing Lead",
            date: "Mar 26, 2025",
            time: "12:00 PM",
            mode: "Onsite",
            statusId: 3,
            status: "Scheduled",
            feedbackStatus: "Pending"
        },

    ];

    const statuses = mapSelectOptions(
        [
            { id: 1, name: "Scheduled" },
            { id: 2, name: "Completed" },
            { id: 3, name: "Rescheduled" },
            { id: 4, name: "Cancelled" }
        ],
        "id",
        "name"
    );
    // Interview Types
    const interviewTypes = mapSelectOptions(
        [
            { id: 1, name: "HR" },
            { id: 2, name: "Technical" },
            { id: 3, name: "Final" },
            { id: 4, name: "Group" },
            { id: 5, name: "Phone / Screening" }
        ],
        "id",
        "name"
    );

    // Interview Rounds
    const interviewRounds = mapSelectOptions(
        [
            { id: 1, name: "Round 1" },
            { id: 2, name: "Round 2" },
            { id: 3, name: "Round 3" },
            { id: 4, name: "Round 4" },
            { id: 5, name: "Round 5" },
            { id: 6, name: "Final Round" }
        ],
        "id",
        "name"
    );
    const candidates = mapSelectOptions(
        [
            { id: 1, name: "Ali Raza" },
            { id: 2, name: "Ahmed Khan" },
            { id: 3, name: "Sara Malik" },
            { id: 4, name: "Usman Tariq" },
            { id: 5, name: "Hira Noor" },
            { id: 6, name: "Bilal Ahmed" },
            { id: 7, name: "Ayesha Siddiqui" },
            { id: 8, name: "Farhan Ali" },
            { id: 9, name: "Nida Fatima" },
            { id: 10, name: "Hamza Iqbal" }
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
                        Interviews
                    </h2>
                    <Button type="button" variant="success" onClick={handleOpenModal}>
                        Schedule Interview
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
                        <div className=" w-full md:w-[9rem]">
                            <Input
                                type="time"
                                name="filterTime"
                                noMargin={true}
                                value={filterTime}
                                onChange={(e) => setFilterTime(e.target.value)}
                            />
                        </div>

                    </div>
                </div>


                <div className="overflow-x-auto shadow-md border border-gray-200 rounded max-h-[72vh]">
                    <table className="w-full text-xs border-collapse">
                        <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="px-4 py-3 text-left">Candidate Name</th>
                                <th className="px-4 py-3 text-left">Job Applied</th>
                                <th className="px-4 py-3 text-left">Interview Type</th>
                                <th className="px-4 py-3 text-left">Interview Round</th>
                                <th className="px-4 py-3 text-left">Interviewer</th>
                                <th className="px-4 py-3 text-left">Date</th>
                                <th className="px-4 py-3 text-left">Time</th>
                                <th className="px-4 py-3 text-left">Mode</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Feedback Status</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {interviewsData && interviewsData.length > 0 ? (
                                interviewsData.map((row, idx) => (
                                    <tr
                                        key={idx}
                                        className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                            } hover:bg-gray-100 transition-colors`}
                                    >
                                        <td className="px-4 py-3 truncate max-w-[160px]">{row.candidateName ?? ''}</td>
                                        <td className="px-4 py-3 truncate max-w-[160px]">{row.jobApplied ?? ''}</td>
                                        <td className="px-4 py-3">{row.interviewType ?? ''}</td>
                                        <td className="px-4 py-3">{row.interviewRound ?? ''}</td>
                                        <td className="px-4 py-3">{row.interviewer ?? ''}</td>
                                        <td className="px-4 py-3">{row.date ?? ''}</td>
                                        <td className="px-4 py-3">{row.time ?? ''}</td>
                                        <td className="px-4 py-3">{row.mode ?? ''}</td>
                                        <td className="px-4 py-3">
                                            <StatusDesign statusId={row.statusId} label={row.status} />
                                        </td>
                                        <td className="px-4 py-3">{row.feedbackStatus ?? ''}</td>

                                        <RowActions
                                            row={row}
                                            actions={[
                                                { label: "View Interview", icon: MdOutlineRemoveRedEye },
                                                { label: "Edit Interview", icon: FiEdit3 },
                                                { label: "Reschedule", icon: MdOutlineEventRepeat },
                                                { label: "Send Invite", icon: BsSend },
                                                { label: "Add Feedback", icon: MdOutlineRateReview, onClick: openFeedbackModal },
                                                { label: "Mark as Completed", icon: MdOutlineCheckCircleOutline },
                                                { label: "Cancel Interview", icon: MdOutlineBlock, color: "red", onClick: openReasonModal },
                                            ]}
                                        />

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-center py-4 text-gray-500 italic">
                                        No interview found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {isOpen && (
                    <Modal width="w-full md:w-6/12">
                        <h3 className="text-lg text-center font-semibold mb-4">Schedule Interview</h3>
                        <div className="w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                <CustomSelect
                                    name="candidateName"
                                    label="Candidate"
                                    value={candidate}
                                    placeholder="Select Candidate"
                                    onChange={setCandidate}
                                    options={candidates}
                                    controlHeight="2rem"
                                />

                                <Input
                                    type="text"
                                    name="appliedJob"
                                    label="Applied Job"
                                    noMargin={true}
                                    disabled={true}
                                    value={applyJob}
                                    onChange={(e) => setApplyJob(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">

                                <CustomSelect
                                    name="interType"
                                    label="Interview Type"
                                    value={interType}
                                    placeholder="Select Type"
                                    onChange={setInterType}
                                    options={interviewTypes}
                                    controlHeight="2rem"
                                />
                                <CustomSelect
                                    name="interRound"
                                    label="Interview Round"
                                    value={interRound}
                                    placeholder="Select Round"
                                    onChange={setInterRound}
                                    options={interviewRounds}
                                    controlHeight="2rem"
                                />
                                <CustomSelect
                                    name="interviewer"
                                    label="Interviewer"
                                    value={interviewer}
                                    placeholder="Select Interviewer"
                                    onChange={setInterviewer}
                                    options={candidates}
                                    controlHeight="2rem"
                                />
                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

                                <Input
                                    type="date"
                                    name="interDate"
                                    label="Schedule Date"
                                    noMargin={true}
                                    value={interDate}
                                    onChange={(e) => setInterDate(e.target.value)}
                                />
                                <Input
                                    type="time"
                                    name="intertime"
                                    label="Schedule Time"
                                    noMargin={true}
                                    value={interTime}
                                    onChange={(e) => setInterTime(e.target.value)}
                                />


                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                <div>
                                    <label className="block text-xxs font-medium mb-2">Interview Mode</label>
                                    <div className="flex gap-6">
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="interviewMode"
                                                value="Online"
                                                checked={interviewMode === "Online"}
                                                onChange={(e) => setInterviewMode(e.target.value)}
                                                className="form-radio h-4 w-4 text-blue-600"
                                            />
                                            <span className="ml-2 text-xxs text-gray-700">Online</span>
                                        </label>

                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="interviewMode"
                                                value="Onsite"
                                                checked={interviewMode === "Onsite"}
                                                onChange={(e) => setInterviewMode(e.target.value)}
                                                className="form-radio h-4 w-4 text-blue-600"
                                            />
                                            <span className="ml-2 text-xxs text-gray-700">Onsite</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4 w-full">
                                <label
                                    htmlFor=""
                                    className="block text-xxs text-gray-700 mb-2"
                                >
                                    Notes
                                </label>
                                <RichTextEditor value={desc} onChange={setDesc} />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="cancel" onClick={handleCloseModal}>
                                Cancel
                            </Button>
                            <Button variant="success">
                                Add Schedule
                            </Button>
                        </div>

                    </Modal>
                )}

                {feedbackOpen && (
                    <Modal width="w-10/12 md:w-6/12">
                        <h3 className="text-lg text-center font-semibold mb-4">Add Feedback</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

                            <Input
                                type="text"
                                name="candidate"
                                label="Candidate"
                                noMargin={true}
                                disabled={true}
                                  value={candVal}
                                onChange={(e) => setCandVal(e.target.value)}
                            />
                            <Input
                                type="text"
                                name="appliedJob"
                                label="Applied Job"
                                noMargin={true}
                                disabled={true}
                                value={applyJob}
                                onChange={(e) => setApplyJob(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">

                            <Input
                                type="number"
                                name="candidate"
                                label="Technical Score"
                                noMargin={true}
                                  value={techScore}
                                onChange={(e) => setTechScore(e.target.value)}
                            />
                            <Input
                                type="number"
                                name="candidate"
                                label="Communication Score"
                                noMargin={true}
                                  value={commScore}
                                onChange={(e) => setCommScore(e.target.value)}
                            />
                            <div className="ms-3">
                                <label className="block text-xxs font-medium mb-1">Overall Rating</label>
                                <div className="mt-3">
                                    <FeedbackStars gap="gap-3"/>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4 w-full">
                                <label
                                    htmlFor=""
                                    className="block text-xxs text-gray-700 mb-2"
                                >
                                    Notes
                                </label>
                                <RichTextEditor value={feedNote} onChange={setFeedNote} />
                            </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="cancel" onClick={closeFeedbackModal}>
                                Cancel
                            </Button>
                            <Button variant="success">
                                Add Feedback
                            </Button>
                        </div>

                    </Modal>
                )}

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
