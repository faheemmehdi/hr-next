"use client";

import { useState } from "react";
import Layout from "y@/app/components/Layout";
import { Check } from "lucide-react";
import Input from "y@/app/components/Input";
import CustomSelect from "y@/app/components/CustomSelect";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import Button from "y@/app/components/Button";
import RichTextEditor from "y@/app/components/RichTextEditor";
import FileUpload from "y@/app/components/FileUpload";

const steps = [
    { id: 1, title: "Basic Information" },
    { id: 2, title: "Job Details" },
    { id: 3, title: "Compensation" },
    { id: 4, title: "Publish & Status" },
];
const employmentTypes = mapSelectOptions(
    [
        { id: 1, name: "Full-Time" },
        { id: 2, name: "Part-Time" },
        { id: 3, name: "Contract" },
        { id: 4, name: "Internship" },
        { id: 5, name: "Temporary" }
    ],
    "id",
    "name"
);
const locations = mapSelectOptions(
    [
        { id: 1, name: "Onsite" },
        { id: 2, name: "Remote" },
        { id: 3, name: "Hybrid" },
        { id: 4, name: "Field" },
        { id: 5, name: "Flexible" },
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
const currencies = mapSelectOptions(
  [
    { id: 1, name: "USD - US Dollar" },
    { id: 2, name: "EUR - Euro" },
    { id: 3, name: "GBP - British Pound" },
    { id: 4, name: "PKR - Pakistani Rupee" },
    { id: 5, name: "INR - Indian Rupee" },
    { id: 6, name: "JPY - Japanese Yen" },
    { id: 7, name: "AUD - Australian Dollar" },
  ],
  "id",
  "name"
);
const statuses = mapSelectOptions(
  [
    { id: 1, name: "Draft" },
    { id: 2, name: "Open" },
    { id: 3, name: "On Hold" }
  ],
  "id",
  "name"
);

export default function AddJob() {
    const [currentStep, setCurrentStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState([]);
    const [jobTitle, setJobTitle] = useState("");
    const [department, setDepartment] = useState("");
    const [empType, setEmpType] = useState("");
    const [location, setLocation] = useState("");
    const [vacancies, setVacancies] = useState("");
    const [desc, setDesc] = useState("");
    const [responsi, setResponsi] = useState("");
    const [reqSkills, setReqSkills] = useState("");
    const [minSal, setMinSal] = useState("");
    const [maxSal, setMaxSal] = useState("");
    const [currency, setCurrency] = useState("");
    const [deadLine, setDeadLine] = useState("");
    const [status, setStatus] = useState("");
    const [file, setFile] = useState("");

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCompletedSteps((prev) =>
                prev.includes(currentStep) ? prev : [...prev, currentStep]
            );
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        <h2 className="text-base font-semibold text-gray-700">Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-9 mb-5">

                            <Input
                                type="text"
                                name="jobTitle"
                                label="Job Title"
                                placeholder="Enter Job name"
                                noMargin={true}
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                            />

                            <CustomSelect
                                name="department"
                                label="Department"
                                value={department}
                                onChange={setDepartment}
                                placeholder="Select Department"
                                options={departments}
                                controlHeight="2rem"
                            />


                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-9 mb-5">

                            <CustomSelect
                                name="empType"
                                label="Employment Type"
                                value={empType}
                                onChange={setEmpType}
                                placeholder="Select Type"
                                options={employmentTypes}
                                controlHeight="2rem"
                            />

                            <CustomSelect
                                name="location"
                                label="Location"
                                value={location}
                                onChange={setLocation}
                                placeholder="Select Location"
                                options={locations}
                                controlHeight="2rem"
                            />


                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-9 mb-5">


                            <Input
                                type="number"
                                name="vacancies"
                                label="Vacancies"
                                placeholder="Number of Vacancies"
                                noMargin={true}
                                value={vacancies}
                                onChange={(e) => setVacancies(e.target.value)}
                            />

                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <h2 className="text-base font-semibold text-gray-700">Job Details</h2>
                        <div className="w-full mb-6">
                            <label
                                htmlFor=""
                                className="block text-xxs text-gray-700 mb-2"
                            >
                                Description
                            </label>
                            <RichTextEditor value={desc} onChange={setDesc} />
                        </div>
                        <div className="w-full mb-6">
                            <label
                                htmlFor=""
                                className="block text-xxs text-gray-700 mb-2"
                            >
                                Responsibilities
                            </label>
                            <RichTextEditor value={responsi} onChange={setResponsi} />
                        </div>
                        <div className="w-full mb-3">
                            <label
                                htmlFor=""
                                className="block text-xxs text-gray-700 mb-2"
                            >
                                Required Skills
                            </label>
                            <RichTextEditor value={reqSkills} onChange={setReqSkills} />
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                       <h2 className="text-base font-semibold text-gray-700">Compensation</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-9 mb-5">

                            <Input
                                type="number"
                                name="minSal"
                                label="Salary Min"
                                placeholder="Minimum Salary"
                                noMargin={true}
                                value={minSal}
                                onChange={(e) => setMinSal(e.target.value)}
                            />

                            <Input
                                type="number"
                                name="maxSal"
                                label="Salary Max"
                                placeholder="Maximum Salary"
                                noMargin={true}
                                value={maxSal}
                                onChange={(e) => setMaxSal(e.target.value)}
                            />

                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-9 mb-5">

                           <CustomSelect
                                name="currency"
                                label="Currency"
                                value={currency}
                                onChange={setCurrency}
                                placeholder="Select Currency"
                                options={currencies}
                                controlHeight="2rem"
                            />

                        </div>
                    </>
                );
            case 4:
                return (
                    <>
                       <h2 className="text-base font-semibold text-gray-700">Publish & Status</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-9 mb-5">

                            <Input
                                type="date"
                                name="deadline"
                                label="Application Deadline"
                                noMargin={true}
                                value={deadLine}
                                onChange={(e) => setDeadLine(e.target.value)}
                            />

                            <CustomSelect
                                name="status"
                                label="Status"
                                value={status}
                                onChange={setStatus}
                                placeholder="Select Status"
                                options={statuses}
                                controlHeight="2rem"
                            />


                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-9 mb-5">

                           <FileUpload
                                label="Job Banner / Featured Image"
                                name="attachment"
                                onChange={(e) =>  setFile(e.target.value[0])}
                                value={file}
                            />
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Sidebar */}
                    <div className="md:w-1/5 border-r border-gray-200 pr-6">
                        <ul className="space-y-5">
                            {steps.map((step) => {
                                const isActive = currentStep === step.id;
                                const isCompleted = completedSteps.includes(step.id);
                                const isClickable = isCompleted || isActive;

                                return (
                                    <li
                                        key={step.id}
                                        onClick={() => {
                                            if (isClickable) setCurrentStep(step.id);
                                        }}
                                        className={`flex items-center gap-3 pb-4 border-b transition-all
    ${isActive
                                                ? "border-b-blue-600/45"
                                                : isCompleted
                                                    ? "border-b-green-600/45"
                                                    : "border-b-gray-400/45"
                                            }
    ${isClickable ? "cursor-pointer" : "cursor-default opacity-50"}
  `}
                                    >

                                        <div
                                            className={`w-6 h-6 flex items-center justify-center rounded-full text-sm font-medium transition-all
              ${isActive
                                                    ? "bg-blue-600 text-white text-xxs"
                                                    : isCompleted
                                                        ? "bg-green-600 text-white"
                                                        : "bg-gray-200 text-gray-600 text-xxs"
                                                }`}
                                        >
                                            {isCompleted ? <Check size={13} /> : step.id}
                                        </div>

                                        <span
                                            className={`text-sm font-medium transition-all text-xxs
              ${isActive
                                                    ? "text-blue-600"
                                                    : isCompleted
                                                        ? "text-green-600"
                                                        : "text-gray-500"
                                                }`}
                                        >
                                            {step.title}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>


                    {/* Form Area */}
                    <div className="md:w-3/4 flex flex-col justify-between">

                        <div className="space-y-6">
                            {renderStepContent()}
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 mt-10">
                            {currentStep > 1 && (
                                <Button type="button" variant="cancel" onClick={handlePrevious}>
                                    Previous
                                </Button>
                            )}

                            {currentStep < steps.length ? (
                                <Button type="button" variant="success" onClick={handleNext}>
                                    Save & Next
                                </Button>
                            ) : (
                                <Button type="button" variant="success">
                                    Save Job
                                </Button>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
}

