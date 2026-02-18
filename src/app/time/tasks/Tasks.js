"use client";
import Layout from "y@/app/components/Layout";
import Input from "y@/app/components/Input";
import { useState, useRef } from "react";
import SearchBar from "y@/app/components/SearchBar";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import CustomSelect from "y@/app/components/CustomSelect";
import {
    FiEdit3, FiEye
} from "react-icons/fi";
import { MdOutlineAssignment, MdOutlineRemoveRedEye, MdOutlineBlock } from "react-icons/md";
import { FaDotCircle } from "react-icons/fa";
import Button from "y@/app/components/Button";
import StatusDesign from "y@/app/components/StatusColors";
import ReasonModal from "y@/app/components/ReasonConfirmModal";
import RowActions from "y@/app/components/RowActions";
import Modal from "y@/app/components/ModalShell";
import "react-datepicker/dist/react-datepicker.css";
import FileUpload from "y@/app/components/FileUpload";
import RichTextEditor from "y@/app/components/RichTextEditor";

export default function ProjectTasks() {
    const [taskName, setTaskName] = useState("");
    const [search, setSearch] = useState("");
    const [projects, setProjects] = useState("");
    const [taskStartDate, setTaskStartDate] = useState("");
    const [taskDueDate, setTaskDueDate] = useState("");
    const [assignedEmp, setAssignedEmp] = useState("");
    const [assignedTeam, setAssignedTeam] = useState("");
    const [selectProject, setSelectProject] = useState("");
    const [estimatedHours, setEstimatedHours] = useState("");
    const [date, setDate] = useState("");
    const [taskType, setTaskType] = useState("");
    const [eligEmp, setEligEmp] = useState("");
    const [attach, setAttach] = useState("");
    const [eligTeam, setEligTeam] = useState("");
    const [status, setStatus] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isReasonOpen, setIsReasonOpen] = useState(false);
    const [isAddBonusOpen, setAddBonusOpen] = useState(false);
    const [taskPriority, setTaskPriority] = useState("");
    const [taskPrio, setTaskPrio] = useState("");
    const [showErrors, setShowErrors] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [isAssignOpen, setAssignOpen] = useState(false);
    const [bulkAction, setBulkAction] = useState(null);
    const [taskAssignedEmp, setTaskAssignedEmp] = useState("");
    const [desc, setDesc] = useState("");
    const [assignNote, setAssignNote] = useState('');
    const [assignStart, setAssignStart] = useState('');
    const [assignDue, setAssignDue] = useState('');

    const calendarRef = useRef(null);

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const openReasonModal = () => setIsReasonOpen(true);
    const closeReasonModal = () => setIsReasonOpen(false);
    const openAddTaskModal = () => setAddBonusOpen(true);
    const closeAddLeaveModal = () => setAddBonusOpen(false);
    const openAssignTaskModal = () => setAssignOpen(true);
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedRows([]);
            setSelectAll(false);
        } else {
            const allIds = tasksData.map((_, index) => index);
            setSelectedRows(allIds);
            setSelectAll(true);
        }
    };

    const handleRowSelect = (index) => {
        let updated = [...selectedRows];

        if (updated.includes(index)) {
            updated = updated.filter((i) => i !== index);
        } else {
            updated.push(index);
        }

        setSelectedRows(updated);
        setSelectAll(updated.length === tasksData.length);
    };
    const handleBulkAction = (val) => {
        if (!val) return;
        switch (val) {
            case 1:
                if (selectedRows.length === 0) {
                    alert("Please select rows first!");
                    return;
                }
                setAssignOpen(true);
                break;
            case 2:
                break;
            case 3:
                openReasonModal();
                break;
            case 4:
                // delete logic
                break;
            default:
                break;
        }
        // setStatus(val);
    };


    const tasksData = [
        {
            id: 1,
            taskName: "Design Homepage",
            project: "Website Redesign",
            createdAt: "2025-11-28",
            loggedHours: 12,
            assignedTo: "Alice",
            dueDate: "2025-12-10",
            description: "Create the main landing page design for the new website.",
            statusId: 1,
            status: "Active",
            workflowStatusId: 2, // To Do
            workflowStatus: "To Do",
        },
        {
            id: 2,
            taskName: "Develop API Endpoints",
            project: "Mobile App Backend",
            createdAt: "2025-11-25",
            loggedHours: 20,
            assignedTo: "Bob",
            dueDate: "2025-12-15",
            description: "Develop RESTful API endpoints for user authentication and data.",
            statusId: 1,
            status: "Active",
            workflowStatusId: 3, // In Progress
            workflowStatus: "In Progress",
        },
        {
            id: 3,
            taskName: "QA Testing",
            project: "Website Redesign",
            createdAt: "2025-11-26",
            loggedHours: 8,
            assignedTo: "Charlie",
            dueDate: "2025-12-12",
            description: "Test all new website features and report bugs.",
            statusId: 1,
            status: "Active",
            workflowStatusId: 1, // Complete
            workflowStatus: "Complete",
        },
        {
            id: 4,
            taskName: "Content Writing",
            project: "Blog Revamp",
            createdAt: "2025-11-27",
            loggedHours: 15,
            assignedTo: "Dana",
            dueDate: "2025-12-20",
            description: "Write new blog posts and update old content for SEO.",
            statusId: 1,
            status: "Active",
            workflowStatusId: 2, // To Do
            workflowStatus: "To Do",
        },
        {
            id: 5,
            taskName: "UI Improvements",
            project: "Mobile App",
            createdAt: "2025-11-24",
            loggedHours: 10,
            assignedTo: "Eva",
            dueDate: "2025-12-18",
            description: "Improve user interface based on feedback from beta users.",
            statusId: 2,
            status: "Inactive",
            workflowStatusId: 3, // In Progress
            workflowStatus: "In Progress",
        },
        {
            id: 6,
            taskName: "Deploy to Production",
            project: "Mobile App Backend",
            createdAt: "2025-11-29",
            loggedHours: 5,
            assignedTo: "Frank",
            dueDate: "2025-12-25",
            description: "Deploy backend services and monitor performance post-deployment.",
            statusId: 1,
            status: "Active",
            workflowStatusId: 2, // To Do
            workflowStatus: "To Do",
        },
    ];





    const locations = mapSelectOptions(
        [
            { id: 1, name: "Lahore" },
            { id: 2, name: "Multan" },
            { id: 3, name: "Karachi" },
            { id: 3, name: "Islamabad" },
            { id: 3, name: "Shaher Sultan" },
            { id: 3, name: "Rawalpindi" },
            { id: 3, name: "Kohat" },
        ],
        "id",
        "name"
    );

    const statuses = mapSelectOptions(
        [
            { id: 2, name: "Present" },
            { id: 1, name: "Absent" },
            { id: 3, name: "Late" },
            { id: 3, name: "Leave" }
        ],
        "id",
        "name"
    );
    const priorities = mapSelectOptions(
        [
            { id: 2, name: "High" },
            { id: 1, name: "Medium" },
            { id: 3, name: "Low" },
        ],
        "id",
        "name"
    );
    const bulk_actions = mapSelectOptions(
        [
            { id: 1, name: "Assign Task" },
            { id: 2, name: "Activate" },
            { id: 3, name: "Deactivate" },
            { id: 4, name: "Export Tasks" }
        ],
        "id",
        "name"
    );

    const frequencies = mapSelectOptions(
        [
            { id: 1, name: "Monthly" },
            { id: 2, name: "Quarterly" },
            { id: 3, name: "Yearly" },
            { id: 4, name: "On Joining" },
            { id: 5, name: "On Application" },
            { id: 6, name: "Manual Adjustment" }
        ],
        "id",
        "name"
    );
    const taskTypes = mapSelectOptions(
        [
            { id: 1, name: "Feature Development" },
            { id: 2, name: "Bug Fix" },
            { id: 3, name: "Improvement / Enhancement" },
            { id: 4, name: "Research / Analysis" },
            { id: 5, name: "Documentation" },
            { id: 6, name: "Testing / QA" },
            { id: 7, name: "Design / UI UX" },
            { id: 8, name: "Support / Maintenance" },
            { id: 9, name: "Deployment / Release" },
            { id: 10, name: "Other" }
        ],
        "id",
        "name"
    );

    const rotations = mapSelectOptions(
        [
            { id: 1, name: "None" },
            { id: 2, name: "Fixed" },
            { id: 3, name: "Rotational" },
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
                        Tasks
                    </h2>
                    <div className="flex gap-2">
                        {selectedRows.length > 0 && (
                            <div className="mt-[1px] min-w-[130px]">
                                <CustomSelect
                                    name="bulk_actions"
                                    value={bulkAction}
                                    placeholder="Bulk Actions"
                                    onChange={(val) => {
                                        setBulkAction(val);
                                        handleBulkAction(val);
                                    }}
                                    options={bulk_actions}
                                    controlHeight="2rem"
                                />
                            </div>
                        )}



                        <Button type="button" onClick={openAddTaskModal} variant="success">
                            Create Task
                        </Button>
                    </div>

                </div>

                <div className="w-full flex justify-between flex-col md:flex-row items-center my-2 mt-5">
                    <div className="w-full md:w-1/5 flex items-center mb-1">
                        <SearchBar
                            placeholder="Search by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="w-full flex items-center flex-col md:flex-row justify-end mt-2 md:mt-0 gap-2">
                        <div className="mb-1 w-full md:w-[9rem]">
                            <CustomSelect
                                name="projects"
                                value={projects}
                                placeholder="Project"
                                onChange={setProjects}
                                options={locations}
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
                        <div className="mb-1 w-full md:w-[9rem]">
                            <CustomSelect
                                name="taskEmp"
                                value={taskAssignedEmp}
                                placeholder="Assigned Emp"
                                onChange={setTaskAssignedEmp}
                                options={priorities}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="w-full md:w-[9rem]">
                            <Input
                                type="date"
                                name="date"
                                noMargin={true}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>
                </div>


                <div className="overflow-x-auto shadow-md border border-gray-200 rounded max-h-[72vh]">
                    <table className="w-full text-xs border-collapse">
                        <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="px-3 py-3">
                                    <input
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th className="px-4 py-3 text-left">Task Name</th>
                                <th className="px-4 py-3 text-left">Project</th>
                                <th className="px-4 py-3 text-left">Logged Hours</th>
                                <th className="px-4 py-3 text-left">Assigned To</th>
                                <th className="px-4 py-3 text-left">Created At</th>
                                <th className="px-4 py-3 text-left">Due Date</th>
                                <th className="px-4 py-3 text-left">Description</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {tasksData && tasksData.length > 0 ? (

                                tasksData.map((row, idx) => (
                                    <tr
                                        key={idx}
                                        className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors`}
                                    >
                                        <td className="px-3 py-3 text-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(idx)}
                                                onChange={() => handleRowSelect(idx)}
                                            />
                                        </td>
                                        <td className="px-4 py-3 truncate max-w-[120px]" title={row.taskName}>{row.taskName}</td>
                                        <td className="px-4 py-3">{row.project}</td>
                                        <td className="px-4 py-3">{row.loggedHours}</td>
                                        <td className="px-4 py-3">{row.assignedTo}</td>
                                        <td className="px-4 py-3">{row.createdAt}</td>
                                        <td className="px-4 py-3">{row.dueDate}</td>
                                        <td className="px-4 py-3 truncate max-w-[120px]" title={row.description}>
                                            {row.description}
                                        </td>
                                        <td className="px-4 py-3">
                                            <StatusDesign statusId={row.workflowStatusId} label={row.workflowStatus} />
                                        </td>
                                        <RowActions
                                            row={row}
                                            actions={[
                                                { label: "View Task", icon: MdOutlineRemoveRedEye, onClick: handleOpenModal },
                                                { label: "Edit Task", icon: FiEdit3 },
                                                { label: "Asssign Task", icon: MdOutlineAssignment, onClick: openAssignTaskModal },
                                                { label: "Deactivate Task", icon: MdOutlineBlock, color: "red", onClick: openReasonModal },
                                            ]}
                                        />
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={10} className="text-center py-4 text-gray-500 italic">
                                        No task found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>

                {isOpen && (
                    <Modal width="w-full md:w-5/12">
                        <div className="border-b border-gray-400 pb-3 mb-4">
                            <div className="flex justify-between">
                                <h2 className="text-lg font-semibold text-gray-800">Task Details</h2>
                                <span className="inline-flex items-center px-2 py-1 text-xxs font-medium rounded-full bg-green-100 text-green-700">
                                    Active
                                </span>
                            </div>
                            <p className="text-xxs text-gray-500">Created At 20 Dec, 2025 at 09:10 AM</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <p className="text-xxs text-gray-500 font-medium">Task Name</p>
                                <p className="text-xs font-semibold text-gray-800">Design Homepage</p>
                            </div>
                            <div>
                                <p className="text-xxs text-gray-500 font-medium">Project Name</p>
                                <p className="text-xs text-gray-800">Website Redesign</p>
                            </div>
                            <div>
                                <p className="text-xxs text-gray-500 font-medium">Logged Hours</p>
                                <p className="text-xs text-gray-800">23</p>
                            </div>
                        </div>


                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <p className="text-xxs text-gray-500 font-medium">Due Date</p>
                                <p className="text-xs text-gray-800">2025-12-10</p>
                            </div>
                            <div>
                                <p className="text-xxs text-gray-500 font-medium">Assigned To</p>
                                <p className="text-xs text-gray-800">Charlie</p>
                            </div>
                        </div>
                        <div className="border-t border-gray-400 pt-4 mb-4">

                            <p className="text-xxs text-gray-500 font-medium mb-1">Description</p>
                            <p className="text-xs text-gray-800 text-justify">
                                This is very important task.
                            </p>
                        </div>

                        <div className="border-t border-gray-400 pt-4 mb-4">
                            <p className="text-xxs text-gray-500 font-medium mb-2">Attachment</p>
                            <div className="bg-gray-50 border border-gray-200 rounded px-2 py-1 flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <FaDotCircle className="h-2 w-2 text-gray-500" />
                                    <span className="text-xxs text-gray-700">Card.jpg</span>
                                </div>
                                <button className="text-xxs text-blue-600 hover:underline cursor-pointer">View</button>
                            </div>
                        </div>
                        <div className="flex justify-end border-t border-gray-400 pt-4">
                            <Button variant="cancel" onClick={handleCloseModal}>
                                Close
                            </Button>
                            {/* <Button variant="success" onClick={handleSave}>
                                        Save
                                    </Button> */}
                        </div>
                    </Modal>
                )}


                {isAddBonusOpen && (
                    <Modal width="w-full md:w-6/12">
                        <h3 className="text-lg text-center font-semibold mb-4">Create Task</h3>
                        <div className="w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

                                <Input
                                    type="text"
                                    name="taskName"
                                    placeholder="Enter task name"
                                    label="Task Name"
                                    noMargin={true}
                                    value={taskName}
                                    onChange={(e) => setTaskName(e.target.value)}
                                    error={showErrors && !taskName ? "Task Name is required" : ""}
                                />

                                <CustomSelect
                                    name="projectName"
                                    label="Project"
                                    value={selectProject}
                                    placeholder="Select Project"
                                    onChange={setSelectProject}
                                    options={locations}
                                    controlHeight="2rem"
                                    error={showErrors && !selectProject ? "Rotation is required" : ""}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">

                                <Input
                                    type="date"
                                    name="taskStartDate"
                                    label="Start Date"
                                    noMargin={true}
                                    value={taskStartDate}
                                    onChange={(e) => setTaskStartDate(e.target.value)}
                                    error={showErrors && !taskStartDate ? "Start Date is required" : ""}
                                />
                                <Input
                                    type="date"
                                    name="taskDueDate"
                                    label="Due Date"
                                    noMargin={true}
                                    value={taskDueDate}
                                    onChange={(e) => setTaskDueDate(e.target.value)}
                                    error={showErrors && !taskDueDate ? "Due date is required" : ""}
                                />
                                <Input
                                    type="number"
                                    name="estimatedHours"
                                    label="Estimated Hours"
                                    placeholder="Estimated Hours"
                                    noMargin={true}
                                    value={estimatedHours}
                                    onChange={(e) => setEstimatedHours(e.target.value)}
                                    error={showErrors && !estimatedHours ? "Estimated Hours is required" : ""}
                                />
                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">

                                <CustomSelect
                                    name="taskType"
                                    label="Task Type / Category"
                                    value={taskType}
                                    placeholder="Select Type"
                                    onChange={setTaskType}
                                    options={taskTypes}
                                    controlHeight="2rem"
                                />
                                <CustomSelect
                                    name="assignedEmp"
                                    label="Assigned Employees"
                                    value={assignedEmp}
                                    placeholder="Select Employee"
                                    onChange={setAssignedEmp}
                                    options={locations}
                                    isMulti={true}
                                    controlHeight="2rem"
                                />
                                <CustomSelect
                                    name="assignedTeam"
                                    label="Assigned Team"
                                    value={assignedTeam}
                                    placeholder="Select Team"
                                    onChange={setAssignedTeam}
                                    options={locations}
                                    controlHeight="2rem"
                                />

                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <CustomSelect
                                    name="taskPriority"
                                    label="Priority"
                                    value={taskPrio}
                                    placeholder="Select Priority"
                                    onChange={setTaskPrio}
                                    options={priorities}
                                    controlHeight="2rem"
                                />
                                <FileUpload
                                    label="Attachment"
                                    name="attachment"
                                    onChange={(e) => setAttach(e.target.files[0])}
                                    value={attach}
                                />

                            </div>
                            <div className="w-full mb-3">
                                <label
                                    htmlFor="desc"
                                    className="block text-xxs text-gray-700 mb-2"
                                >
                                    Description
                                </label>
                                <RichTextEditor value={desc} onChange={setDesc} />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="cancel" onClick={closeAddLeaveModal}>
                                Cancel
                            </Button>
                            <Button variant="success">
                                Create
                            </Button>
                        </div>

                    </Modal>
                )}


                <ReasonModal
                    isOpen={isReasonOpen}
                    title="Deactivate Task"
                    infoSection={
                        <div className="border-gray-300 border-b py-1 mb-2">
                            <p className="text-xs text-gray-800 font-medium">
                                <span className="font-semibold">QA Testing</span>
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Project:</span> Website Redesign
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Due Date:</span> 2025-12-15
                            </p>
                            <p className="text-xxs text-gray-600">
                                <span>Assigned To:</span> Charlie
                            </p>

                        </div>}
                    onClose={closeReasonModal}
                    // onSubmit={handleReject}
                    variant="danger"
                    submitLabel="Deactivate"
                    reasonTitle="Please provide a reason to deactivate this task."
                />

                {isAssignOpen && (
                    <Modal width="w-full md:w-6/12">
                        <div className="border-b border-gray-400 pb-3 mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">Assign Task</h2>
                            <p className="text-xxs text-gray-500">
                                Assign selected tasks to employees or teams
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <CustomSelect
                                name="assignEmployees"
                                label="Assign to Employees"
                                value={eligEmp}
                                placeholder="Select Employees"
                                onChange={setEligEmp}
                                options={locations} // replace with real employee list
                                isMulti={true}
                                controlHeight="2rem"
                            />

                            <CustomSelect
                                name="assignTeams"
                                label="Assign to Team"
                                value={eligTeam}
                                placeholder="Select Team"
                                onChange={setEligTeam}
                                options={taskTypes}
                                controlHeight="2rem"
                            />

                            <Input
                                type="date"
                                label="Start Date"
                                name="assignSDate"
                                noMargin={true}
                                value={assignStart}
                                onChange={(e) => setAssignStart(e.target.value)}
                            />
                            <Input
                                type="date"
                                label="Due Date"
                                name="assignDDate"
                                noMargin={true}
                                value={assignDue}
                                onChange={(e) => setAssignDue(e.target.value)}
                            />
                            <CustomSelect
                                name="taskPriority"
                                label="Priority"
                                value={taskPriority}
                                placeholder="Select Priority"
                                onChange={setTaskPriority}
                                options={priorities}
                                controlHeight="2rem"
                            />
                        </div>

                        <div className="w-full">
                            <label className="text-xxs ">Assign Note</label>
                            <RichTextEditor value={assignNote} onChange={setAssignNote} />
                        </div>


                        <div className="text-xxs text-gray-700 mb-4">
                            <strong>Selected Tasks:</strong> {selectedRows.length}
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button variant="cancel" onClick={() => setAssignOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="success">
                                Assign
                            </Button>
                        </div>
                    </Modal>
                )}


            </div>
        </Layout>
    );
}
