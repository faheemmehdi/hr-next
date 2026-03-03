"use client";
import Layout from "y@/app/components/Layout";
import Input from "y@/app/components/Input";
import { useState, useEffect, useRef } from "react";
import SearchBar from "y@/app/components/SearchBar";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";

import Tabs from "y@/app/components/Tabs";
import CompanyInfo from "./tabs/CompanyInfo";
import LocalSetting from "./tabs/LocaleSetting";
import Brandings from "./tabs/Branding";


export default function Organization() {
    const [activeTab, setActiveTab] = useState("ci");
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
        { key: "ci", label: "Company Info", content: <CompanyInfo {...filters} /> },
        { key: "ls", label: "Locale & Settings", content: <LocalSetting {...filters} /> },
        { key: "branding", label: "Branding", content: <Brandings {...filters} /> },
    ];


    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold text-gray-700">
                        Organization
                    </h2>
                    

                </div>

                <Tabs tabs={tabs} defaultTab="ci" onTabChange={setActiveTab} align="center" />

               


            </div>
        </Layout>
    );
}
