"use client";
import CustomSelect from "y@/app/components/CustomSelect";
import Input from "y@/app/components/Input";
import ToggleSwitch from "y@/app/components/ToggleSwitch";
import Button from "y@/app/components/Button";
export default function General({settings, onChange, locations, shifts, allModes, handleModeToggle, weekdays, workingDays, weekendDays, timeZones, modes, handleSave,toggleWorkingDay,
    toggleWeekendDay,}) {



    return (
       <div className="w-full text-xxs">
                            <div className="w-full flex-col md:flex-row flex items-center">
                                <div className="flex items-center w-full gap-3 mb-3 md:mb-0 md:w-1/3">
                                    <ToggleSwitch
                                        label="Enable Attendance"
                                        checked={settings.attendanceEnabled}
                                        onChange={(value) => onChange("attendanceEnabled", value)}
                                    />
                                </div>
                                <div className="w-full md:w-1/3">
                                    <div className="w-full sm:w-2/3">
                                        <CustomSelect
                                            label="Location"
                                            name="location"
                                            value={settings.location}
                                            placeholder="Select Location"
                                            onChange={(value) => onChange("location", value)}
                                            options={locations}
                                            controlHeight="2rem"
                                            error={settings.error && !settings.location ? "Location is required" : ""}
                                        />
                                    </div>
                                </div>
                                <div className="w-full md:w-1/3">
                                    <div className="w-full sm:w-2/3">
                                        <CustomSelect
                                            label="Work Shift"
                                            name="shift"
                                            value={settings.shift}
                                            placeholder="Select Work Shift"
                                            onChange={(value) => onChange("shift", value)}
                                            options={shifts}
                                            controlHeight="2rem"
                                            error={settings.error && !settings.shift ? "Work Shift is required" : ""}
                                        />
                                    </div>
                                </div>
                            </div>

                            {settings.attendanceEnabled && <div className="w-full">
                                <div className="w-full mt-7">
                                    <span>Attendance Modes</span>
                                    <div className="flex flex-wrap gap-3 mt-3">
                                        {allModes.map((mode) => (
                                            <div
                                                key={mode.key}
                                                className="flex items-center justify-between border border-gray-200 rounded px-4 py-2 bg-gray-50 hover:bg-gray-100 transition w-full sm:w-[19%]"
                                            >
                                                <div className="flex items-center gap-2 text-gray-700 text-xs">
                                                    <span className="text-gray-500 text-base">{mode.icon}</span>
                                                    {mode.label}
                                                </div>

                                                <ToggleSwitch
                                                    checked={modes[mode.key]}
                                                    onChange={() => handleModeToggle(mode.key)}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                </div>


                                <div className="w-full flex flex-col md:flex-row mt-10">
                                    <div className="flex items-center gap-3 w-full mb-3 md:mb-0 md:w-1/3">
                                        <ToggleSwitch
                                            label="Enable Geo-fence"
                                            checked={settings.enableGeo}
                                           onChange={(value) => onChange("enableGeo", value)}
                                        />
                                    </div>
                                    {settings.enableGeo && <div className="flex items-center w-full md:w-1/3">
                                        <div className="w-full md:w-3/4">
                                            <Input
                                                type="number"
                                                label="Geo-fence (meters)"
                                                name="geoRange"
                                                placeholder="Enter Radius (e.g.200)"
                                                noMargin={true}
                                                value={settings.geoRange}
                                                onChange={onChange}
                                                error={settings.error && settings.enableGeo && !settings.geoRange ? "Geo-fence is required" : ""}

                                            />
                                        </div>
                                    </div>}
                                </div>

                                <div className="w-full flex mt-10">
                                    <div className="w-1/2">
                                        <div className="w-5/6">
                                            <span>Working Days</span>
                                            <div className="flex flex-wrap gap-3 mt-3">
                                                {weekdays.map((day) => (
                                                    <label
                                                        key={day.key}
                                                        className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded cursor-pointer bg-gray-50 hover:bg-gray-100 transition text-xxs text-gray-700"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={workingDays[day.key]}
                                                           onChange={() => toggleWorkingDay(day.key)}
                                                            className="accent-[var(--toggle-btn)] w-3.5 h-3.5 cursor-pointer"
                                                        />

                                                        <span>{day.label}</span>
                                                    </label>
                                                ))}
                                                {settings.error && !settings.weekCheck && <p className="text-red-500 text-xs mt-1 ml-1">Select at least single day</p>}

                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-1/2">
                                        <div className="w-5/6">
                                            <span>Weekend Days</span>

                                            <div className="flex flex-wrap gap-3 mt-3">
                                                {weekdays.map((day) => (
                                                    <label
                                                        key={day.key}
                                                        className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded cursor-pointer bg-gray-50 hover:bg-gray-100 transition text-xxs text-gray-700"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={weekendDays[day.key]}
                                                            onChange={() => toggleWeekendDay(day.key)}
                                                            className="accent-[var(--toggle-btn)] w-3.5 h-3.5 cursor-pointer"
                                                        />

                                                        <span>{day.label}</span>
                                                    </label>
                                                ))}
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="w-full flex flex-col md:flex-row mt-10">
                                    <div className="w-full md:w-1/3">

                                        <div className="w-full sm:w-3/4">
                                            <CustomSelect
                                                label="Timezone"
                                                name="timezone"
                                                value={settings.timeZone}
                                                placeholder="Select Timezone"
                                                onChange={(value) => {onChange('timeZone', value)}}
                                                options={timeZones}
                                                controlHeight="2rem"
                                                error={settings.error && settings.attendanceEnabled && !settings.timeZone ? "Timezone is required" : ""}
                                            />
                                        </div>

                                    </div>
                                    <div className="w-full md:w-1/3">
                                        <div className="w-full md:w-3/4">
                                            <Input
                                                type="time"
                                                label="Office Start"
                                                name="officeStart"
                                                noMargin={true}
                                                value={settings.officeStart}
                                                onChange={onChange}
                                                error={settings.error && settings.attendanceEnabled && !settings.officeStart ? "Office Start time is required" : ""}

                                            />
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/3">
                                        <div className="w-full md:w-3/4">
                                            <Input
                                                type="time"
                                                label="Office End"
                                                name="officeEnd"
                                                noMargin={true}
                                                value={settings.officeEnd}
                                                onChange={onChange}
                                                error={settings.error && settings.attendanceEnabled && !settings.officeEnd ? "Office End time is required" : ""}

                                            />
                                        </div>
                                    </div>
                                </div>


                                <div className="w-full flex flex-col md:flex-row mt-3">
                                    <div className="w-full md:w-1/3">
                                        <div className="w-3/4">
                                            <Input
                                                type="number"
                                                label="Break Hours"
                                                name="breakHours"
                                                placeholder="Enter Break Hours"
                                                noMargin={true}
                                                value={settings.breakHours}
                                                onChange={onChange}
                                                error={settings.error && settings.attendanceEnabled && !settings.breakHours ? "Break Hours is required" : ""}

                                            />
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/3">
                                        <div className="w-full md:w-3/4">
                                            <Input
                                                type="time"
                                                label="Break Start"
                                                name="breakStart"
                                                noMargin={true}
                                                value={settings.breakStart}
                                                onChange={onChange}
                                                error={settings.error && settings.attendanceEnabled && !settings.breakStart ? "Break Start time is required" : ""}

                                            />
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/3">
                                        <div className="w-full md:w-3/4">
                                            <Input
                                                type="time"
                                                label="Break End"
                                                name="breakEnd"
                                                noMargin={true}
                                                value={settings.breakEnd}
                                                onChange={onChange}
                                                error={settings.error && settings.attendanceEnabled && !settings.breakEnd ? "Break End time is required" : ""}

                                            />
                                        </div>
                                    </div>
                                </div>


                            </div>}
                            <div className="w-full flex mt-10 justify-end">
                                <Button type="button" variant="success" onClick={handleSave}>Save Setting</Button>
                            </div>

                        </div>
    );
}
