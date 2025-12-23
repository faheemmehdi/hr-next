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
import BasicInfo from "./tabs/BasicInfo";
import TimeLine from "./tabs/TimeLine";
import Financial from "./tabs/Financial";

const components = {
    CustomSelect, Input
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


function CreateProject() {

    const [projectData, setProjectData] = useState({
        basicInfo: {
            projectName: '',
            projectCode: '',
            client: '',
            projectManager: '',
            location: '',
            type: '',
            priority: '',
            status: '',
            error: '',
        },
        timeline: {
            startDate: '',
            endDate: '',
            deadline: '',
        }
    });


    const tabs = [
        {
            key: "basic", label: "Basic Info", content: <BasicInfo components={components} locations={locations} employees={employees} data={projectData.basicInfo}
                updateData={(updatedBasicInfo) =>
                    setProjectData((prev) => ({ ...prev, basicInfo: updatedBasicInfo }))
                } />
        },
        { key: "timeline", label: "Date & Timeline", content: <TimeLine data={projectData.timeline}  updateData={(updateTimeline) =>
                    setProjectData((prev) => ({ ...prev, timeline: updateTimeline }))
                }  /> },
                 { key: "financial", label: "Financials & Budget", content: <Financial /> },
    ];

    return (
        <Layout>
            <div className="flex justify-between text-lg p-1 mb-1">
                <h2>Create Project</h2>
            </div>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[80vh] p-5">
                <Tabs tabs={tabs} defaultTab="basic" align="left" />
            </div>
        </Layout>
    )
}
export default CreateProject;