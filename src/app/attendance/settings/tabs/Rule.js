import CustomSelect from "y@/app/components/CustomSelect";
import Input from "y@/app/components/Input";
import Button from "y@/app/components/Button";
export default function Rule({settings, onChange, locations, shifts}){
    return (
          <div className="w-full text-xxs">
                            <div className="w-full flex-col md:flex-row flex items-center gap-4">
                                <div className="w-full md:w-1/4 mb-3">
                                    <div className="w-full">
                                        <CustomSelect
                                            label="Location"
                                            name="location"
                                            value={settings.location}
                                            placeholder="Select Location"
                                            onChange={(value) => {onChange('location', value)}}
                                            options={locations}
                                            controlHeight="2rem"
                                            error={settings.error && !settings.location ? "Location is required" : ""}
                                        />
                                    </div>
                                </div>
                                <div className="w-full md:w-1/4 mb-3">
                                    <div className="w-full">
                                        <CustomSelect
                                            label="Work Shift"
                                            name="shift"
                                            value={settings.shift}
                                            placeholder="Select Work Shift"
                                            onChange={(value) => {onChange('shift', value)}}
                                            options={shifts}
                                            controlHeight="2rem"
                                            error={settings.error && !settings.shift ? "Work Shift is required" : ""}
                                        />
                                    </div>
                                </div>
                                <div className="w-full md:w-1/4 mb-3 mt-1">
                                    <div className="w-full">
                                        <Input
                                            type="number"
                                            label="Minimum Overtime Threshold"
                                            name="minOvertime"
                                            placeholder="Enter minutes"
                                            noMargin={true}
                                            value={settings.minOvertime}
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>
                                <div className="w-full md:w-1/4 mb-3 mt-1">
                                    <div className="w-full">
                                        <Input
                                            type="number"
                                            label="Maximum Overtime Threshold"
                                            name="maxOvertime"
                                            placeholder="Enter minutes"
                                            noMargin={true}
                                            value={settings.maxOvertime}
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full flex-col md:flex-row gap-5">
                                <div className="w-full md:w-1/2 mt-3 p-5 border rounded border-gray-300">
                                    <div className="w-full flex justify-center mb-4"> <strong className="text-center">Late Arrival</strong></div>
                                    <div className="w-full flex-col flex items-center">
                                        <div className="w-full flex flex-col md:flex-row gap-4">
                                            <div className="flex items-center w-full md:w-1/2 mb-2">
                                                <div className="w-full">
                                                    <Input
                                                        type="number"
                                                        label="Grace Minutes"
                                                        name="lateGrace"
                                                        placeholder="Enter minutes"
                                                        noMargin={true}
                                                        value={settings.lateGrace}
                                                        onChange={onChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center w-full md:w-1/2 mb-2">
                                                <div className="w-full">
                                                    <Input
                                                        type="number"
                                                        label="Maximum Late Allowed"
                                                        name="maxLate"
                                                        placeholder="Enter number"
                                                        noMargin={true}
                                                        value={settings.maxLate}
                                                        onChange={onChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col md:flex-row gap-4">
                                            <div className="flex items-center w-full md:w-1/2 mb-2">
                                                <div className="w-full">
                                                    <Input
                                                        type="number"
                                                        label="Deduction per Late Attendance"
                                                        name="deductionLate"
                                                        placeholder="Enter amount"
                                                        noMargin={true}
                                                        value={settings.deductionLate}
                                                        onChange={onChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center w-full md:w-1/2 mb-2">
                                                <div className="w-full">
                                                    <Input
                                                        type="number"
                                                        label="Convert to Half Day if Late by (minutes)"
                                                        name="lateHalfday"
                                                        placeholder="Enter minutes"
                                                        noMargin={true}
                                                        value={settings.lateHalfday}
                                                        onChange={onChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 mt-3 p-5 border rounded border-gray-300">
                                    <div className="w-full flex justify-center mb-4"> <strong className="text-center">Early Leave</strong></div>
                                    <div className="w-full flex-col flex items-center">
                                        <div className="w-full flex flex-col md:flex-row gap-4">
                                            <div className="flex items-center w-full md:w-1/2 mb-2">
                                                <div className="w-full">
                                                    <Input
                                                        type="number"
                                                        label="Grace Minutes"
                                                        name="earlyGrace"
                                                        placeholder="Enter minutes"
                                                        noMargin={true}
                                                        value={settings.earlyGrace}
                                                        onChange={onChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center w-full md:w-1/2 mb-2">
                                                <div className="w-full">
                                                    <Input
                                                        type="number"
                                                        label="Maximum Early Leave Allowed"
                                                        name="maxEarlyLeave"
                                                        placeholder="Enter number"
                                                        noMargin={true}
                                                        value={settings.maxEarlyLeave}
                                                        onChange={onChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col md:flex-row gap-4">
                                            <div className="flex items-center w-full md:w-1/2 mb-2">
                                                <div className="w-full">
                                                    <Input
                                                        type="number"
                                                        label="Deduction per Early Leave Attendance"
                                                        name="deductionEarlyLeave"
                                                        placeholder="Enter amount"
                                                        noMargin={true}
                                                        value={settings.deductionEarlyLeave}
                                                        onChange={onChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center w-full md:w-1/2 mb-2">
                                                <div className="w-full">
                                                    <Input
                                                        type="number"
                                                        label="Convert to Half Day if Early Leave by (minutes)"
                                                        name="earlyHalfday"
                                                        placeholder="Enter minutes"
                                                        noMargin={true}
                                                        value={settings.earlyHalfday}
                                                        onChange={onChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex mt-6 justify-end">
                                <Button type="button" variant="success">Save Rules</Button>
                            </div>
                        </div>
    );
}