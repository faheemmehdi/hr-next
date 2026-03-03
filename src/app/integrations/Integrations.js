"use client";
import Layout from "y@/app/components/Layout";
import Input from "y@/app/components/Input";
import { useState, useEffect, useRef } from "react";
import SearchBar from "y@/app/components/SearchBar";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import CustomSelect from "y@/app/components/CustomSelect";
import {
    FiUser, FiEye
} from "react-icons/fi";
import { FaDotCircle } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Button from "y@/app/components/Button";
import Identity from "./tabs/Identity";
import Esign from "./tabs/ESign";
import ProjectManagement from "./tabs/PManage";
import APIKeys from "./tabs/APIKey";
import Tabs from "../components/Tabs";
import Modal from "../components/ModalShell";
import RichTextEditor from "../components/RichTextEditor";
import { Webhook } from "lucide-react";
import Webhooks from "./tabs/WebHook";


export default function Integration() {
    const [activeTab, setActiveTab] = useState("iv");
    const [date, setDate] = useState("");
    const [designationVal, setDesignationVal] = useState("");
    const [search, setSearch] = useState("");
    const [pname, setPname] = useState("");
    const [token, setToken] = useState("");
    const [env, setEnv] = useState("");
    const [desc, setDesc] = useState("");
    const [employee, setEmployee] = useState("");
    const [department, setDepartment] = useState("");
    const [docType, setDocType] = useState("");
    const [status, setStatus] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [webhookName, setWebhookName] = useState(false);
    const [webhookEvent, setWebhookEvent] = useState("");
    const [webhookMethod, setWebhookMethod] = useState("");
    const [webhookSecret, setWebhookSecret] = useState("");
    const [webhookUrl, setWebhookUrl] = useState("");

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const openReasonModal = (type, row) => {
        setModalType(type);
        setSelectedRow(row);
        setIsReasonOpen(true);
    };

    const closeReasonModal = () => {
        setIsReasonOpen(false);
        setModalType(null);
        setSelectedRow(null);
    };






    const departments = mapSelectOptions(
        [
            { id: 1, name: "Human Resources" },
            { id: 2, name: "Finance" },
            { id: 3, name: "Marketing" },
            { id: 4, name: "Sales" },
            { id: 5, name: "Customer Support" },
            { id: 6, name: "Operations" },
            { id: 7, name: "IT & Infrastructure" },
            { id: 8, name: "Research & Development" },
            { id: 9, name: "Design" },
            { id: 10, name: "Administration" },
        ],
        "id",
        "name"
    );


    const locations = mapSelectOptions(
        [
            { id: 1, name: "Lahore" },
            { id: 2, name: "Multan" },
            { id: 3, name: "Karachi" },
            { id: 3, name: "Islamabad" },
            { id: 3, name: "Shaher Sultan" },
            { id: 3, name: "Rawalpindi" },
            { id: 3, name: "Kohat" },
        ],
        "id",
        "name"
    );

    const statuses = mapSelectOptions(
        [
            { id: 2, name: "Present" },
            { id: 1, name: "Absent" },
            { id: 3, name: "Late" },
            { id: 3, name: "Leave" }
        ],
        "id",
        "name"
    );

    const environments = mapSelectOptions(
        [
            { id: 1, name: "Sandbox" },
            { id: 2, name: "Production" },
        ],
        "id",
        "name"
    );
    const methods = [
        { value: "POST", label: "POST" },
        { value: "GET", label: "GET" },
        { value: "PUT", label: "PUT" },
        { value: "DELETE", label: "DELETE" },
    ];
    const documentTypes = mapSelectOptions(
        [
            { id: 1, name: "Passport" },
            { id: 2, name: "National ID Card" },
            { id: 3, name: "Driver License" },
            { id: 4, name: "Residence Permit" },
            { id: 5, name: "Work Permit" },
        ],
        "id",
        "name"
    );
    const employees = mapSelectOptions(
        [
            { id: 1, name: "Ahmad Raza" },
            { id: 2, name: "Fatima Khan" },
            { id: 3, name: "Ali Qureshi" },
            { id: 4, name: "Sara Malik" },
            { id: 5, name: "Bilal Ahmed" },
            { id: 6, name: "Zainab Iqbal" },
            { id: 7, name: "Usman Tariq" },
            { id: 8, name: "Hira Shah" },
            { id: 9, name: "Hamza Sheikh" },
            { id: 10, name: "Maryam Noor" },
        ],
        "id",
        "name"
    );

    const filters = {
        departments,
        statuses,
        department,
        onDepartmentChange: setDepartment,
        designationVal,
        onDesignationChange: setDesignationVal,
        search,
        onSearch: setSearch,
        status,
        onStatusChange: setStatus,
        date,
        onDateChange: setDate,
        onReject: openReasonModal


    }
    const tabs = [
        { key: "iv", label: "Identity Verification", content: <Identity {...filters} /> },
        { key: "esign", label: "E-Sign Providers", content: <Esign {...filters} /> },
        { key: "pm", label: "Project Management", content: <ProjectManagement {...filters} /> },
        { key: "api", label: "API Keys", content: <APIKeys {...filters} /> },
        { key: "hook", label: "Webhooks", content: <Webhooks {...filters} /> },
    ];


    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold text-gray-700">
                        Integration & APIs
                    </h2>
                    <div className="flex gap-2">
                        {/* <Button type="button" variant="transparent" color="#7764e3" bgColor="transparent">
                            Export Payroll
                        </Button> */}
                        <Button type="button" variant="success" onClick={handleOpenModal}>
                            {activeTab === 'iv' ? "Add Provider" :
                                activeTab === 'esign' ? "Add E-Sign Provider" :
                                    activeTab === 'pm' ? "Add Management" :
                                        activeTab === 'api' ? "Add API" :
                                            activeTab === 'hook' ? "Add Webhook" :
                                                "Add Item"}
                        </Button>


                    </div>

                </div>

                <Tabs tabs={tabs} defaultTab="iv" onTabChange={setActiveTab} align="center" />

                {isOpen && (
                    <Modal width="w-11/12 md:w-6/12">
                        <div className="mb-3">
                            <div className="flex justify-center">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {activeTab === 'iv' && "Add new Provider"}
                                    {activeTab === 'esign' && "Add new E-Sign Provider"}
                                    {activeTab === 'pm' && "Add new Project Management"}
                                    {activeTab === 'api' && "Add new API Key"}
                                    {activeTab === 'hook' && "Add new Webhook"}

                                </h2>
                            </div>
                        </div>

                        {/* General Fields */}
                        {activeTab !== 'hook' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                {/* Provider Name */}
                                {activeTab !== 'pm' && activeTab !== 'api' && (
                                    <Input
                                        type="text"
                                        name="providerName"
                                        placeholder="Enter provider name"
                                        label="Provider Name"
                                        noMargin={true}
                                        value={pname}
                                        onChange={(e) => setPname(e.target.value)}
                                    />
                                )}

                                {/* Key Name for API Tab */}
                                {activeTab === 'api' && (
                                    <Input
                                        type="text"
                                        name="keyName"
                                        placeholder="Enter key name"
                                        label="Key Name"
                                        noMargin={true}
                                        value={pname}
                                        onChange={(e) => setPname(e.target.value)}
                                    />
                                )}

                                {/* Project Name for PM Tab */}
                                {activeTab === 'pm' && (
                                    <Input
                                        type="text"
                                        name="projectName"
                                        placeholder="Enter project name"
                                        label="Project Name"
                                        noMargin={true}
                                        value={pname}
                                        onChange={(e) => setPname(e.target.value)}
                                    />
                                )}

                                {/* API Key / Token for IV and PM Tabs */}
                                {(activeTab === 'iv' || activeTab === 'pm') && (
                                    <Input
                                        type="text"
                                        name="apiToken"
                                        placeholder="Enter key / token"
                                        label="API Key / Token"
                                        noMargin={true}
                                        value={token}
                                        onChange={(e) => setToken(e.target.value)}
                                    />
                                )}

                                {/* API Key for E-Sign and API Tabs */}
                                {(activeTab === 'esign' || activeTab === 'api') && (
                                    <Input
                                        type="text"
                                        name="apiKey"
                                        placeholder="Enter API key"
                                        label="API Key"
                                        noMargin={true}
                                        value={token}
                                        onChange={(e) => setToken(e.target.value)}
                                    />
                                )}
                            </div>
                        )}

                        {/* Environment / Region, Document Types, Secret Key */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                            {/* Environment / Region */}
                            {activeTab !== 'api' && activeTab !== 'hook' && (
                                <CustomSelect
                                    name="environment"
                                    label="Environment / Region"
                                    placeholder="Select Environment"
                                    value={env}
                                    onChange={setEnv}
                                    options={environments}
                                    controlHeight="2rem"
                                />
                            )}

                            {/* Document Types only for IV Tab */}
                            {activeTab === 'iv' && (
                                <CustomSelect
                                    name="docType"
                                    label="Document Types"
                                    placeholder="Select Type"
                                    value={docType}
                                    onChange={setDocType}
                                    isMulti={true}
                                    options={documentTypes}
                                    controlHeight="2rem"
                                />
                            )}

                            {/* Secret Key for E-Sign and API Tabs */}
                            {(activeTab === 'esign' || activeTab === 'api') && (
                                <Input
                                    type="text"
                                    name="secretKey"
                                    placeholder="Enter secret key"
                                    label="Secret Key"
                                    noMargin={true}
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                />
                            )}
                        </div>

                        {/* E-Sign specific fields */}
                        {activeTab === 'esign' && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                                <Input
                                    type="text"
                                    name="accountId"
                                    placeholder="Enter account ID"
                                    label="Account ID"
                                    noMargin={true}
                                    value={pname}
                                    onChange={(e) => setPname(e.target.value)}
                                />
                                <Input
                                    type="text"
                                    name="clientId"
                                    placeholder="Enter client ID"
                                    label="Client ID"
                                    noMargin={true}
                                    value={pname}
                                    onChange={(e) => setPname(e.target.value)}
                                />
                                <Input
                                    type="text"
                                    name="clientSecret"
                                    placeholder="Enter client secret"
                                    label="Client Secret"
                                    noMargin={true}
                                    value={pname}
                                    onChange={(e) => setPname(e.target.value)}
                                />
                            </div>
                        )}

                        {/* Webhook Fields */}
                        {activeTab === 'hook' && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                    <Input
                                        type="text"
                                        name="webhookName"
                                        placeholder="Enter webhook name"
                                        label="Webhook Name"
                                        noMargin={true}
                                        value={webhookName}
                                        onChange={(e) => setWebhookName(e.target.value)}
                                    />
                                    <Input
                                        type="text"
                                        name="secretKey"
                                        placeholder="Enter secret key"
                                        label="Secret Key"
                                        noMargin={true}
                                        value={webhookSecret}
                                        onChange={(e) => setWebhookSecret(e.target.value)}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                                    <Input
                                        type="text"
                                        name="eventName"
                                        placeholder="Enter event"
                                        label="Event Name"
                                        noMargin={true}
                                        value={webhookEvent}
                                        onChange={(e) => setWebhookEvent(e.target.value)}
                                    />
                                    <Input
                                        type="text"
                                        name="endpointUrl"
                                        placeholder="Enter URL"
                                        label="URL"
                                        noMargin={true}
                                        value={webhookUrl}
                                        onChange={(e) => setWebhookUrl(e.target.value)}
                                    />
                                    <CustomSelect
                                        name="method"
                                        label="Method"
                                        placeholder="Select Method"
                                        value={webhookMethod}
                                        onChange={setWebhookMethod}
                                        options={methods}
                                        controlHeight="2rem"
                                    />
                                </div>
                            </>
                        )}
                        <div className="mt-4">
                            <label
                                htmlFor="reasonText"
                                className="block text-xxs text-gray-700 mb-2"
                            >
                                Remarks / Description
                            </label>
                            <RichTextEditor value={desc} onChange={setDesc} />
                        </div>
                        <div className="flex justify-end gap-2 pt-3">
                            <Button variant="cancel" onClick={handleCloseModal}>
                                Cancel
                            </Button>
                            <Button variant="success">
                                {activeTab === 'iv' && "Add Provider"}
                                {activeTab === 'esign' && "Add E-Sign Provider"}
                                {activeTab === 'pm' && "Add Management"}
                                {activeTab === 'api' && "Add API"}
                                {activeTab === 'hook' && "Add Webhook"}
                            </Button>
                        </div>
                    </Modal>


                )}



            </div>
        </Layout>
    );
}
