export default function BasicInfo(components, locations, data, updateData) {
const {CustomSelect} = components;

    return (
        <>
            <div className="w-full text-xxs">
                <div className="w-full flex-col md:flex-row flex items-center gap-4">
                    {/* <div className="w-full md:w-1/4 mb-3">
                        <div className="w-full">
                            <CustomSelect
                                label="Location"
                                name="location"
                                value={settings.location}
                                placeholder="Select Location"
                                onChange={(value) => { onChange('location', value) }}
                                options={locations}
                                controlHeight="2rem"
                                error={settings.error && !settings.location ? "Location is required" : ""}
                            />
                        </div>
                    </div> */}
                    {/* <div className="w-full md:w-1/4 mb-3">
                        <div className="w-full">
                            <CustomSelect
                                label="Work Shift"
                                name="shift"
                                value={settings.shift}
                                placeholder="Select Work Shift"
                                onChange={(value) => { onChange('shift', value) }}
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
                    </div> */}
                </div>
            </div>
        </>
    )
}