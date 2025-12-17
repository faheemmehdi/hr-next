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



function CreateProject() {

    const [projectData, setProjectData] = useState({
        basicInfo: {
            projectName: '',
            projectCode: '',
            client: '',
            projectManager: '',
        },
        timeline: {
            startDate: '',
            endDate: '',
        }
    });


    const tabs = [
        {
            key: "basic", label: "Basic Info", content: <BasicInfo components={components} locations={locations} data={projectData.basicInfo}
                updateData={(updatedBasicInfo) =>
                    setProjectData((prev) => ({ ...prev, basicInfo: updatedBasicInfo }))
                } />
        },
        { key: "timeline", label: "Date & Timeline", content: <TimeLine /> },
    ];

    return (
        <Layout>
            <div className="flex justify-between text-lg p-1 mb-1">
                <h2>Create Project</h2>
            </div>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-screen p-5">
                <Tabs tabs={tabs} defaultTab="basic" align="left" />

            </div>
        </Layout>
    )
}
export default CreateProject;