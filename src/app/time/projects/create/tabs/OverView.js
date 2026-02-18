import Button from "y@/app/components/Button";
import RichTextEditor from "y@/app/components/RichTextEditor";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
const projectTypes = mapSelectOptions(
    [
        { id: 1, name: "Internal" },
        { id: 2, name: "External" },
        { id: 3, name: "Research & Development" },
        { id: 4, name: "Maintenance" },
        { id: 5, name: "Consulting" },
        { id: 6, name: "Training" },
        { id: 7, name: "Marketing Campaign" },
        { id: 8, name: "Product Launch" },
        { id: 9, name: "Software Development" },
        { id: 10, name: "Customer Support" },
    ],
    "id",
    "name"
);
const priorities = mapSelectOptions(
    [
        { id: 1, name: "Low" },
        { id: 2, name: "Medium" },
        { id: 3, name: "High" },
        { id: 4, name: "Urgent" },
    ],
    "id",
    "name"
);
const statuses = mapSelectOptions(
    [
        { id: 1, name: "Planned" },
        { id: 2, name: "In Progress" },
        { id: 3, name: "On Hold" },
        { id: 4, name: "Completed" },
        { id: 5, name: "Cancelled" },
    ],
    "id",
    "name"
);

export default function OverView({ components, locations, departments, employees, data, updateData }) {
    const { CustomSelect, Input } = components;
    const onChange = (field, value) => {
        updateData({
            ...data,
            [field]: value,
        });
    };
    return (
        <>
            <div className="w-full text-xxs mt-5">
                <div className="w-full flex flex-col md:flex-row items-stretch gap-6">
                    <div className="w-full md:w-2/6 rounded-lg shadow-md border border-gray-200 p-4 md:p-6 flex flex-col">
                        <strong className="font-bold text-sm">Core Identity</strong>
                        <div className="w-full mt-2">
                            <Input
                                type="text"
                                label="Project Name"
                                name="pname"
                                placeholder="Project Name"
                                noMargin={true}
                                value={data.projectName}
                                onChange={(e) => onChange('projectName', e.target.value)}
                            />
                        </div>
                        <div className="w-full mt-2">
                            <Input
                                type="text"
                                label="Project Code"
                                name="pcode"
                                placeholder="e.g. HRM"
                                noMargin={true}
                                value={data.projectCode}
                                onChange={(e) => onChange('projectCode', e.target.value)}
                            />
                        </div>
                        <div className="w-full mt-2">
                            <CustomSelect
                                label="Project Type"
                                name="projectType"
                                value={data.type}
                                placeholder="Select Type"
                                onChange={(value) => onChange('type', value)}
                                options={projectTypes}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="w-full mt-2">
                            <label>Short Description</label>
                            <textarea
                                rows="4"
                                placeholder="Write description here..."
                                className="w-full mt-1 rounded border border-gray-300 p-3 text-gray-800 text-xxs resize-none 
                                focus:outline-none  focus:border-gray-600 transition-all duration-150"
                                value={data.short_desct || ""}
                                onChange={(e) => onChange('short_desct', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-2/6 rounded-lg shadow-md border border-gray-200 p-4 md:p-6 flex flex-col">
                        <strong className="font-bold text-sm">Client Details</strong>
                        <div className="w-full mt-2">
                            <Input
                                type="text"
                                label="Client / Business Unit"
                                name="client_name"
                                placeholder="Client Name"
                                noMargin={true}
                                value={data.client_name}
                                onChange={(e) => onChange('client_name', e.target.value)}
                            />
                        </div>
                        <div className="w-full mt-2">
                            <Input
                                type="email"
                                label="Client Email"
                                name="client_email"
                                placeholder="Client Email"
                                noMargin={true}
                                value={data.client_email}
                                onChange={(e) => onChange('client_email', e.target.value)}
                            />
                        </div>
                        <div className="w-full mt-2">
                            <Input
                                type="text"
                                label="Client Phone"
                                name="client_phone"
                                placeholder="+92 1234567890"
                                noMargin={true}
                                value={data.client_phone}
                                onChange={(e) => onChange('client_phone', e.target.value)}
                            />
                        </div>
                        <div className="w-full mt-2">
                            <label>Notes</label>
                            <textarea
                                rows="4"
                                placeholder="Additional client notes"
                                className="w-full mt-1 rounded border border-gray-300 p-3 text-gray-800 text-xxs resize-none 
                                focus:outline-none  focus:border-gray-600 transition-all duration-150"
                                value={data.client_note || ""}
                                onChange={(e) => onChange('client_note', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-2/6 rounded-lg shadow-md border border-gray-200 p-4 md:p-6 flex flex-col">
                        <strong className="font-bold text-sm">Ownership & Control</strong>
                        <div className="w-full mt-2">
                            <CustomSelect
                                label="Project Manager"
                                name="projectManager"
                                value={data.prjectManager}
                                placeholder="Select Manager"
                                onChange={(value) => onChange('projectManager', value)}
                                options={employees}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="w-full mt-2">
                            <CustomSelect
                                label="Reporting Manager"
                                name="reportingManager"
                                value={data.reportingManager}
                                placeholder="Select Manager"
                                onChange={(value) => onChange('reportingManager', value)}
                                options={employees}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="w-full mt-2">
                            <CustomSelect
                                label="Department"
                                name="department"
                                value={data.department}
                                placeholder="Select Department"
                                onChange={(value) => onChange('department', value)}
                                options={departments}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="w-full mt-2">
                            <CustomSelect
                                label="Location / Branch"
                                name="location"
                                value={data.location}
                                placeholder="Select Location"
                                onChange={(value) => onChange('location', value)}
                                options={locations}
                                controlHeight="2rem"
                                error={data.error && !data.location ? "Location is required" : ""}
                            />
                        </div>
                        <div className="w-full mt-2">
                            <CustomSelect
                                label="Priority"
                                name="priority"
                                value={data.priority}
                                placeholder="Select Priority"
                                onChange={(value) => onChange('priority', value)}
                                options={priorities}
                                controlHeight="2rem"
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full rounded-lg shadow-md border border-gray-200 p-4 flex flex-col md:flex-row gap-6 mt-6">
                    <div className="w-full">
                        <label>Project Summary</label>
                        <RichTextEditor />
                    </div>
                    <div className="w-full">
                        <label>Detailed Description</label>
                        <RichTextEditor />
                    </div>
                </div>

            </div>

        </>
    )
}