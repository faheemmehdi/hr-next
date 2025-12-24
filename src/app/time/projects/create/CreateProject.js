"use client";
import Layout from "y@/app/components/Layout";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { FaMapMarkerAlt, FaFingerprint, FaMobileAlt, FaQrcode, FaIdCard, FaUserCheck } from "react-icons/fa";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import CustomSelect from "y@/app/components/CustomSelect";
import Input from "y@/app/components/Input";
import Button from "y@/app/components/Button";
import ToggleSwitch from "y@/app/components/ToggleSwitch";
import Tabs from "y@/app/components/Tabs";
import TimeLine from "./tabs/TimeLine";
import OverView from "./tabs/OverView";

const components = {
    CustomSelect, Input, ToggleSwitch
};
const locations = mapSelectOptions(
    [
        { id: 1, name: "Lahore" },
        { id: 2, name: "Multan" },
        { id: 4, name: "Karachi" },
        { id: 5, name: "Islamabad" },
        { id: 6, name: "Shaher Sultan" },
        { id: 7, name: "Rawalpindi" },
        { id: 8, name: "Kohat" },
    ],
    "id",
    "name"
);

const employees = mapSelectOptions(
    [
        { id: 1, name: "Ahmad Khan" },
        { id: 2, name: "Sara Ali" },
        { id: 3, name: "Omar Malik" },
        { id: 4, name: "Ayesha Siddiqui" },
        { id: 5, name: "Bilal Shah" },
        { id: 6, name: "Fatima Noor" },
        { id: 7, name: "Usman Riaz" },
        { id: 8, name: "Hina Javed" },
        { id: 9, name: "Zain Qureshi" },
        { id: 10, name: "Maria Hassan" },
    ],
    "id",
    "name"
);

const departments = mapSelectOptions(
    [
        { id: 1, name: "Finance" },
        { id: 2, name: "Human Resources" },
        { id: 3, name: "Information Technology" },
        { id: 4, name: "Marketing" },
        { id: 5, name: "Operations" },
        { id: 6, name: "Sales" },
        { id: 7, name: "Customer Support" },
        { id: 8, name: "Legal" },
        { id: 9, name: "Research & Development" },
        { id: 10, name: "Administration" },
    ],
    "id",
    "name"
);

function CreateProject() {

    const [projectData, setProjectData] = useState({
        overView: {
            projectName: '',
            projectCode: '',
            type: '',
            short_desct: '',
            client_name: '',
            client_email: '',
            client_phone: '',
            client_note: '',
            projectManager: '',
            reportingManager: '',
            location: '',
            department: '',
            priority: '',
            error: '',
            project_summary: '',
            project_detail: '',
        },
        timeline: {
            startDate: '',
            endDate: '',
            duration: '',
            billable: '',
            billing_type: '',
            billing_rate: '',
            currency: '',
            estimated_budget: '',
            overtime_allow: '',
            overtime_rate: '',

        }
    });


    const tabs = [
        {
            key: "overView", label: "Project OverView", content: <OverView components={components} locations={locations} employees={employees} departments={departments} data={projectData.overView}
                updateData={(updateOverView) =>
                    setProjectData((prev) => ({ ...prev, overView: updateOverView }))
                } />
        },
        {
            key: "timeline", label: "Schedule & Financials", content: <TimeLine components={components} data={projectData.timeline} updateData={(updateTimeline) =>
                setProjectData((prev) => ({ ...prev, timeline: updateTimeline }))
            } />
        },
    ];

    return (
        <Layout>
            <div className="flex justify-between text-lg p-1 mb-1">
                <h2>Create Project</h2>
            </div>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[80vh] p-5">
                <Tabs tabs={tabs} defaultTab="overView" align="left" isCol />
                <div className="w-full text-end mt-5">
                    <Button type="button" variant="success">Save & Continue</Button>
                </div>
            </div>
        </Layout>
    )
}
export default CreateProject;