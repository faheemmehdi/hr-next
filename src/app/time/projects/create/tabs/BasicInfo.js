import Button from "y@/app/components/Button";
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

export default function BasicInfo({ components, locations, employees, data, updateData }) {
    const { CustomSelect, Input } = components;
    const onChange = (field, value) => {
        updateData({
            ...data,
            [field]: value,
        });
    };
    return (
        <>
            <div className="w-full text-xxs">
                <div className="w-full flex-col md:flex-row flex items-center gap-4">
                    <div className="w-full md:w-1/4 mb-3">
                        <div className="w-full">
                            <CustomSelect
                                label="Location"
                                name="location"
                                value={data.location}
                                placeholder="Select Location"
                                onChange={(value) => onChange('location', value)}
                                options={locations}
                                controlHeight="2rem"
                                error={data.error && !data.location ? "Location is required" : ""}
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/4 mb-3 mt-1">
                        <div className="w-full">
                            <Input
                                type="text"
                                label="Project Name"
                                name="pname"
                                placeholder="Enter name"
                                noMargin={true}
                                value={data.projectName}
                                onChange={(e) => onChange('projectName', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/4 mb-3 mt-1">
                        <div className="w-full">
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
                    </div>
                    <div className="w-full md:w-1/4 mb-3 mt-1">
                        <div className="w-full">
                            <Input
                                type="text"
                                label="Client"
                                name="client"
                                placeholder="Enter client"
                                noMargin={true}
                                value={data.client}
                                onChange={(e) => onChange('client', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full flex-col md:flex-row flex gap-4">
                    <div className="w-full md:w-1/2 gap-4">
                        <div className="w-full flex-col md:flex-row flex gap-4">
                             <div className="w-full md:w-1/2 mb-3">
                                <div className="w-full">
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
                            </div>
                            <div className="w-full md:w-1/2 mb-3">
                                <div className="w-full">
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
                            </div>
                           
                        </div>
                        <div className="w-full flex-col md:flex-row flex gap-4">
                             <div className="w-full md:w-1/2 mb-3">
                                <div className="w-full">
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
                            <div className="w-full md:w-1/2 mb-3">
                                <div className="w-full">
                                    <CustomSelect
                                        label="Status"
                                        name="status"
                                        value={data.status}
                                        placeholder="Select Status"
                                        onChange={(value) => onChange('status', value)}
                                        options={statuses}
                                        controlHeight="2rem"
                                    />

                                </div>
                            </div>
                           
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="w-full">
                            <label>Project Description</label>
                            <textarea
                                rows="4"
                                placeholder="Write description here..."
                                className="w-full mt-1 rounded border border-gray-300 p-3 text-gray-800 text-xxs resize-none 
                                focus:outline-none  focus:border-gray-600 transition-all duration-150"
                                style={{ height: '75pt' }}
                            />
                        </div>

                    </div>
                </div>
               <div className="w-full text-end mt-3">
                               <Button type="button" variant="success">Save Info</Button>
                           </div>
            </div>
        </>
    )
}