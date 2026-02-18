import Button from "y@/app/components/Button";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import { TiPlus } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import RichTextEditor from "y@/app/components/RichTextEditor";
const billingTypes = mapSelectOptions(
    [
        { id: 1, name: "Hourly (Time & Material)" },
        { id: 2, name: "Fixed Price" },
        { id: 3, name: "Milestone Based" },
        { id: 4, name: "Retainer / Monthly" },
        { id: 5, name: "Per Task" },
        { id: 6, name: "Per Resource" },
        { id: 7, name: "Commission Based" },
        { id: 8, name: "Cost Plus" },
        { id: 9, name: "Non-Billable" },
        { id: 10, name: "Internal Cost Center" },
    ],
    "id",
    "name"
);
const billingRates = mapSelectOptions(
    [
        { id: 1, name: "Fixed Price" },
        { id: 2, name: "Hourly Rate" },
        { id: 3, name: "Daily Rate" },
        { id: 4, name: "Milestone Based" },
        { id: 5, name: "Retainer" },
        { id: 6, name: "Per User/License" },
        { id: 7, name: "Commission Based" },
        { id: 8, name: "Cost Plus" },
        { id: 9, name: "Time & Materials" },
        { id: 10, name: "Non-billable" },
    ],
    "id",
    "name"
);
const currencies = mapSelectOptions(
    [
        { id: 'USD', name: 'USD - US Dollar' },
        { id: 'EUR', name: 'EUR - Euro' },
        { id: 'GBP', name: 'GBP - British Pound' },
        { id: 'PKR', name: 'PKR - Pakistani Rupee' },
        { id: 'JPY', name: 'JPY - Japanese Yen' },
        { id: 'AUD', name: 'AUD - Australian Dollar' },
        { id: 'CAD', name: 'CAD - Canadian Dollar' },
        { id: 'CHF', name: 'CHF - Swiss Franc' },
        { id: 'CNY', name: 'CNY - Chinese Yuan' },
        { id: 'INR', name: 'INR - Indian Rupee' },
        // add more as needed
    ],
    "id",
    "name"
);

export default function TimeLine({ components, data, employees, updateData }) {
    const { CustomSelect, Input, ToggleSwitch } = components;
    const addMilestone = () => {
        updateData({
            ...data,
            milestones: [...(data.milestones || []), { name: '', dueDate: '', linkedBilling: '' }],
        });
    };

    // Update a milestone field by index
    const onMilestoneChange = (index, field, value) => {
        const updatedMilestones = data.milestones.map((ms, i) =>
            i === index ? { ...ms, [field]: value } : ms
        );
        updateData({ ...data, milestones: updatedMilestones });
    };
    const onChange = (field, value) => {
        updateData({
            ...data,
            [field]: value,
        });
    };
    function onRemoveMilestone(index) {
        if (!data.milestones) return;

        const newMilestones = [...data.milestones];
        newMilestones.splice(index, 1);

        updateData({
            ...data,
            milestones: newMilestones,
        });
    }




    return (
        <>
            <div className="w-full text-xxs mt-5">
                <div className="w-full flex flex-col md:flex-row items-stretch gap-6">
                    <div className="w-full md:w-8/12 rounded-lg shadow-md border border-gray-200 p-4 md:p-6 ">
                        <strong className="font-bold text-sm text-center">Timeline</strong>
                        <div className="flex flex-col md:flex-row w-full gap-6 mb-2">
                            <div className="w-full md:w-1/3 mt-2">
                                <Input
                                    type="date"
                                    label="Start Date"
                                    name="sdate"
                                    noMargin={true}
                                    value={data.startDate}
                                    onChange={(e) => onChange('startDate', e.target.value)}
                                />
                            </div>
                            <div className="w-full md:w-1/3 mt-2">
                                <Input
                                    type="date"
                                    label="End Date"
                                    name="edate"
                                    noMargin={true}
                                    value={data.endDate}
                                    onChange={(e) => onChange('endDate', e.target.value)}
                                />
                            </div>
                            <div className="w-full md:w-1/3 mt-2">
                                <Input
                                    type="number"
                                    label="Estimated Duration (Days)"
                                    name="edate"
                                    placeholder="Estimated Days"
                                    noMargin={true}
                                    value={data.duration}
                                    onChange={(e) => onChange('duration', e.target.value)}
                                />
                            </div>
                        </div>
                        {data.milestones?.map((milestone, index) => (
                            <div
                                style={{ paddingTop: "0px" }}
                                key={index}
                                className="mb-3 p-4 md:p-6 bg-white rounded shadow-md border border-gray-200"
                            >
                                <div className="flex justify-end pt-2 text-sm"><RxCross2 className="cursor-pointer" onClick={() => onRemoveMilestone(index)} /></div>
                                <div className="flex flex-col md:flex-row w-full gap-6">
                                    <div className="w-full md:w-1/3 mt-1">
                                        <Input
                                            type="text"
                                            label="Milestone Name"
                                            name={`milestoneName-${index}`}
                                            placeholder="Milestone Name"
                                            noMargin={true}
                                            value={milestone.name || ""}
                                            onChange={e => onMilestoneChange(index, 'name', e.target.value)}
                                        />
                                    </div>

                                    <div className="w-full md:w-1/3 mt-1">
                                        <Input
                                            type="date"
                                            label="Due Date"
                                            name={`milestoneDueDate-${index}`}
                                            noMargin={true}
                                            value={milestone.dueDate || ""}
                                            onChange={e => onMilestoneChange(index, 'dueDate', e.target.value)}
                                        />
                                    </div>

                                    <div className="w-full md:w-1/3 mt-1">
                                        <Input
                                            type="text"
                                            label="Linked Billing"
                                            name={`linkedBilling-${index}`}
                                            placeholder="e.g., 20% payment on completion"
                                            noMargin={true}
                                            value={milestone.linkedBilling || ""}
                                            onChange={e => onMilestoneChange(index, 'linkedBilling', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="w-full mt-4">
                                    <label className="block text-xxs font-medium text-gray-700 mb-1">Notes</label>
                                                                 <RichTextEditor />
                                </div>
                            </div>
                        ))}


                        <div className="flex justify-end w-full mt-2">
                            <Button type="button" variant="primary" onClick={addMilestone}>
                                <span className="flex justify-center items-center gap-1"><TiPlus /> <span>Add Milestone</span></span>
                            </Button>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 rounded-lg shadow-md border border-gray-200 p-4 md:p-6 ">
                        <strong className="font-bold text-sm text-center">Billing & Costing</strong>
                        <div className="w-full mt-2">
                            <ToggleSwitch
                                label="Billable Project"
                                checked={data.billable}
                                onChange={(value) => onChange("billable", value)}
                            />
                        </div>
                        {data.billable && (
                            <>
                                <div className="w-full mt-2">
                                    <CustomSelect
                                        label="Billing Type"
                                        name="billing_type"
                                        value={data.billing_type}
                                        placeholder="Select Type"
                                        onChange={(value) => onChange('billing_type', value)}
                                        options={billingTypes}
                                        controlHeight="2rem"
                                    />
                                </div>
                                <div className="w-full mt-2">
                                    <CustomSelect
                                        label="Billing Rate"
                                        name="billing_rate"
                                        value={data.billing_rate}
                                        placeholder="Select Rate"
                                        onChange={(value) => onChange('billing_rate', value)}
                                        options={billingRates}
                                        controlHeight="2rem"
                                    />
                                </div>
                                <div className="w-full mt-2">
                                    <CustomSelect
                                        label="Currency"
                                        name="currency"
                                        value={data.currency}
                                        placeholder="Select Currency"
                                        onChange={(value) => onChange('currency', value)}
                                        options={currencies}
                                        controlHeight="2rem"
                                    />
                                </div>
                                <div className="w-full mt-2">
                                    <Input
                                        type="number"
                                        label="Estimated Budget"
                                        name="ebudget"
                                        placeholder="Estimated Budget"
                                        noMargin={true}
                                        value={data.estimated_budget}
                                        onChange={(e) => onChange('estimated_budget', e.target.value)}
                                    />
                                </div>
                                <div className="w-full mt-3">
                                    <ToggleSwitch
                                        label="Overtime Allowed"
                                        checked={data.overtime_allow}
                                        onChange={(value) => onChange("overtime_allow", value)}
                                    />
                                </div>
                                {data.overtime_allow &&
                                    <div className="w-full mt-2">
                                        <Input
                                            type="number"
                                            label="Overtime Rate"
                                            name="overtimeRate"
                                            placeholder="Overtime Rate"
                                            noMargin={true}
                                            value={data.overtime_rate}
                                            onChange={(e) => onChange('overtime_rate', e.target.value)}
                                        />
                                    </div>}
                            </>
                        )}

                    </div>
                </div>


            </div>

        </>
    )
}