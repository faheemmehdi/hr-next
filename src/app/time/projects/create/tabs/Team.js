import FileUpload from "y@/app/components/FileUpload";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
const teams = mapSelectOptions(
    [
        { id: 1, name: "Development Team" },
        { id: 2, name: "Design Team" },
        { id: 3, name: "QA Team" },
        { id: 4, name: "Marketing Team" },
        { id: 5, name: "Sales Team" },
        { id: 6, name: "HR Team" },
        { id: 7, name: "Finance Team" },
        { id: 8, name: "Operations Team" },
    ],
    "id",
    "name"
);
const fileTypes = mapSelectOptions(
    [
        { id: 1, name: "Project Proposal" },
        { id: 2, name: "Contract / Agreement" },
        { id: 3, name: "Scope of Work (SOW)" },
        { id: 4, name: "Requirement Document (BRD)" },
        { id: 5, name: "Technical Specification" },
        { id: 6, name: "Invoice / Billing Document" },
        { id: 7, name: "Timeline / Milestone Plan" },
        { id: 8, name: "Design Files" },
        { id: 9, name: "NDA / Legal Document" },
        { id: 10, name: "Other / Miscellaneous" },
    ],
    "id",
    "name"
);

export default function Team({ components, data, employees, departments, updateData }) {
    const { CustomSelect, Input, ToggleSwitch } = components;
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
                        <strong className="font-bold text-sm">Team Assignment</strong>

                        <div className="w-full mt-2">
                            <CustomSelect
                                label="Assigned Employees"
                                name="assignedEmp"
                                value={data.assignedEmp}
                                placeholder="Select Employee"
                                onChange={(value) => onChange('assignedEmp', value)}
                                options={employees}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="w-full mt-2">
                            <CustomSelect
                                label="Assigned Teams"
                                name="assignedTeam"
                                value={data.assignedTeam}
                                placeholder="Select Team"
                                onChange={(value) => onChange('assignedTeam', value)}
                                options={teams}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="w-full mt-2">
                            <CustomSelect
                                label="Assigned Departments"
                                name="assignedDept"
                                value={data.assignedDept}
                                placeholder="Select Department"
                                onChange={(value) => onChange('assignedDept', value)}
                                options={departments}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="w-full mt-2">
                            <Input
                                type="text"
                                label="External Contributor / Vendor"
                                name="vendor"
                                placeholder="Enter Name"
                                noMargin={true}
                                value={data.vendor}
                                onChange={(e) => onChange('vendor', e.target.value)}
                            />

                        </div>
                    </div>
                    <div className="w-full md:w-2/6 rounded-lg shadow-md border border-gray-200 p-4 md:p-6 flex flex-col">
                        <strong className="font-bold text-sm">Scope & Responsibility</strong>

                        <div className="w-full mt-2">
                            <label>Responsibility Notes</label>
                            <textarea
                                rows="4"
                                placeholder="Responsibility notes"
                                className="w-full mt-1 rounded border border-gray-300 p-3 text-gray-800 text-xxs resize-none 
                                focus:outline-none  focus:border-gray-600 transition-all duration-150"
                                value={data.resNote || ""}
                                onChange={(e) => onChange('resNote', e.target.value)}
                            />
                        </div>
                        <div className="w-full mt-2">
                            <label>Deliverables Summary</label>
                            <textarea
                                rows="4"
                                placeholder="Deliverable summary"
                                className="w-full mt-1 rounded border border-gray-300 p-3 text-gray-800 text-xxs resize-none 
                                focus:outline-none  focus:border-gray-600 transition-all duration-150"
                                value={data.deliverSummary || ""}
                                onChange={(e) => onChange('deliverSummary', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-2/6 rounded-lg shadow-md border border-gray-200 p-4 md:p-6 flex flex-col">
                        <strong className="font-bold text-sm">Documentation</strong>
                        <div className="w-full mt-2">
                            <CustomSelect
                                label="Document Type"
                                name="documentType"
                                value={data.docType}
                                placeholder="Select Type"
                                onChange={(value) => onChange('docType', value)}
                                options={fileTypes}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="w-full mt-2">
                            <FileUpload
                                label="Attachment"
                                name="attachment"
                                onChange={(e) => onChange('docFile', e.target.value[0])}
                                // value={data.docFile}
                            />
                        </div>
                         <div className="w-full mt-2">
                            <Input
                                type="text"
                                label="Linked External Docs"
                                name="externalLink"
                                placeholder="Google Drive, etc."
                                noMargin={true}
                                value={data.externalLink}
                                onChange={(e) => onChange('externalLink', e.target.value)}
                            />

                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}