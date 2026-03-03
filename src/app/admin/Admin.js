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
import Identity from "./organization/tabs/Identity";
import Esign from "./organization/tabs/ESign";
import ProjectManagement from "./organization/tabs/PManage";
import APIKeys from "./organization/tabs/APIKey";
import Tabs from "../components/Tabs";
import Modal from "../components/ModalShell";
import RichTextEditor from "../components/RichTextEditor";
import { Webhook } from "lucide-react";
import Webhooks from "./organization/tabs/WebHook";
import CompanyInfo from "./organization/tabs/CompanyInfo";
import LocalSetting from "./organization/tabs/LocaleSetting";
import Brandings from "./organization/tabs/Branding";


export default function Admin() {
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





    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold text-gray-700">
                        Organization Management
                    </h2>
                    

                </div>

             

               


            </div>
        </Layout>
    );
}
