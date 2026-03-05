"use client";
import { useEffect, useMemo, useState } from "react";
import Layout from "y@/app/components/Layout";
import Button from "y@/app/components/Button";
import SearchBar from "y@/app/components/SearchBar";
import CustomSelect from "y@/app/components/CustomSelect";
import Input from "y@/app/components/Input";
import Modal from "y@/app/components/ModalShell";

const notificationTemplates = [
    {
        id: 1,
        template: "New hire onboarding",
        channel: "Email",
        trigger: "Employee created",
        updated: "2026-03-05 10:32",
        subject: "Welcome to {company}, {firstName}!",
        body: "Hello {firstName},\n\nYour onboarding buddy {buddyName} will reach out soon. Please complete your paperwork via {portalLink}.",
        variables: ["{firstName}", "{company}", "{buddyName}", "{portalLink}"],
        versions: ["Live • v1.4", "Draft • v1.5"],
    },
    {
        id: 2,
        template: "Password reset",
        channel: "SMS",
        trigger: "Password reset requested",
        updated: "2026-03-03 14:18",
        subject: "Reset your password",
        body: "Use {resetToken} to reset your password. The link expires in 10 minutes.",
        variables: ["{resetToken}", "{expirationMinutes}"],
        versions: ["Live • v2.2", "Draft • v2.3"],
    },
    {
        id: 3,
        template: "Monthly payroll reminder",
        channel: "Push",
        trigger: "Payroll run scheduled",
        updated: "2026-02-27 09:05",
        subject: "Payroll is closing soon",
        body: "Hi {firstName}, the payroll run is scheduled for {payrollDate}. Review your timesheet before {cutoffTime}.",
        variables: ["{firstName}", "{payrollDate}", "{cutoffTime}"],
        versions: ["Live • v1.1", "Version history"],
    },
    {
        id: 4,
        template: "Leave request approval",
        channel: "Email",
        trigger: "Leave requested",
        updated: "2026-03-04 16:45",
        subject: "Your leave request has been approved",
        body: "Hello {firstName},\n\nYour leave request from {startDate} to {endDate} has been approved by {managerName}.",
        variables: ["{firstName}", "{startDate}", "{endDate}", "{managerName}"],
        versions: ["Live • v1.0", "Draft • v1.1"],
    },
    {
        id: 5,
        template: "Invoice generated",
        channel: "Email",
        trigger: "Invoice created",
        updated: "2026-03-02 11:30",
        subject: "Your invoice #{invoiceNumber} is ready",
        body: "Hello {firstName},\n\nInvoice #{invoiceNumber} for {amount} has been generated. You can view and pay it here: {invoiceLink}.",
        variables: ["{firstName}", "{invoiceNumber}", "{amount}", "{invoiceLink}"],
        versions: ["Live • v1.2", "Draft • v1.3"],
    },
    {
        id: 6,
        template: "Policy update notification",
        channel: "Push",
        trigger: "Policy updated",
        updated: "2026-03-01 09:00",
        subject: "New company policy: {policyTitle}",
        body: "Hi {firstName},\n\nPlease review the updated company policy: {policyLink}. It will take effect from {effectiveDate}.",
        variables: ["{firstName}", "{policyTitle}", "{policyLink}", "{effectiveDate}"],
        versions: ["Live • v1.0"],
    },
    {
        id: 7,
        template: "System maintenance alert",
        channel: "SMS",
        trigger: "Scheduled maintenance",
        updated: "2026-02-28 18:00",
        subject: "System maintenance notification",
        body: "Attention {firstName},\n\nThe system will be down for maintenance from {startTime} to {endTime}. Please save your work.",
        variables: ["{firstName}", "{startTime}", "{endTime}"],
        versions: ["Live • v1.0", "Draft • v1.1"],
    },
];

const channelOptions = [
    { value: "Email", label: "Email" },
    { value: "SMS", label: "SMS" },
    { value: "Push", label: "Push" },
];

const triggerOptions = [
    { value: "Employee created", label: "Employee created" },
    { value: "Password reset requested", label: "Password reset requested" },
    { value: "Payroll run scheduled", label: "Payroll run scheduled" },
];

const formatTimestamp = (value) => {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
};

export default function Notifications() {
    const [search, setSearch] = useState("");
    const [channelFilter, setChannelFilter] = useState("");
    const [triggerFilter, setTriggerFilter] = useState("");
    const [selectedTemplateId, setSelectedTemplateId] = useState(notificationTemplates[0]?.id);
    const [editorValues, setEditorValues] = useState({
        subject: notificationTemplates[0]?.subject || "",
        body: notificationTemplates[0]?.body || "",
        channel: notificationTemplates[0]?.channel || "",
        trigger: notificationTemplates[0]?.trigger || "",
    });
    const [selectedVersion, setSelectedVersion] = useState(notificationTemplates[0]?.versions?.[0] || "");
    const [isTestOpen, setIsTestOpen] = useState(false);
    const [testRecipient, setTestRecipient] = useState("");

    const selectedTemplate = notificationTemplates.find((template) => template.id === selectedTemplateId) || notificationTemplates[0];

    useEffect(() => {
        if (selectedTemplate) {
            setEditorValues({
                subject: selectedTemplate.subject,
                body: selectedTemplate.body,
                channel: selectedTemplate.channel,
                trigger: selectedTemplate.trigger,
            });
            setSelectedVersion(selectedTemplate.versions?.[0] || "");
        }
    }, [selectedTemplate]);

    const filteredTemplates = useMemo(() => {
        const keyword = search.trim().toLowerCase();
        return notificationTemplates.filter((template) => {
            const matchesSearch =
                !keyword ||
                template.template.toLowerCase().includes(keyword) ||
                template.channel.toLowerCase().includes(keyword) ||
                template.trigger.toLowerCase().includes(keyword);
            const matchesChannel = channelFilter ? template.channel === channelFilter : true;
            const matchesTrigger = triggerFilter ? template.trigger === triggerFilter : true;
            return matchesSearch && matchesChannel && matchesTrigger;
        });
    }, [search, channelFilter, triggerFilter]);

    const handleSave = () => {
        setIsTestOpen(false);
    };

    const handleSendTest = () => {
        setIsTestOpen(true);
    };

    const closeTestModal = () => {
        setIsTestOpen(false);
        setTestRecipient("");
    };

    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
                <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-base font-semibold text-gray-700">
                                Notification Templates & Rules
                            </h2>
                            <p className="text-xxs text-gray-500">
                                Template editor with variables and triggers. Save drafts, send tests, and manage versions without leaving the panel.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="cancel" type="button">
                                Disable Template
                            </Button>
                            <Button variant="primary" type="button" onClick={handleSendTest}>
                                Send Test
                            </Button>
                        </div>
                    </div>
                </div>


                <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5">
                    <div className="w-full md:w-1/5 flex items-center mb-1">
                        <SearchBar
                            placeholder="Search template, channel, trigger..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="w-full flex items-center justify-end flex-col md:flex-row mt-2 md:mt-0 gap-2">
                        <div className="mb-1 w-full md:w-[9rem]">

                            <CustomSelect
                                name="triggerFilter"
                                value={triggerFilter}
                                placeholder="All triggers"
                                options={triggerOptions}
                                onChange={setTriggerFilter}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="mb-1 w-full md:w-[9rem]">
                            <CustomSelect
                                name="channelFilter"
                                value={channelFilter}
                                placeholder="All channels"
                                options={channelOptions}
                                onChange={setChannelFilter}
                                controlHeight="2rem"
                            />
                        </div>

                    </div>
                </div>







                <div className="mt-3 grid gap-6 lg:grid-cols-[2fr_1fr]">
                    <div className="shadow-md border border-gray-200 rounded overflow-hidden">
                        <div className="overflow-x-auto shadow-md border border-gray-200 rounded max-h-[72vh]">
                            <table className="w-full text-xs border-collapse">
                                <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Template</th>
                                        <th className="px-4 py-3 text-left">Channel</th>
                                        <th className="px-4 py-3 text-left">Trigger</th>
                                        <th className="px-4 py-3 text-left">Updated At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTemplates.length > 0 ? (
                                        filteredTemplates.map((template, idx) => (
                                            <tr
                                                key={template.id}
                                                onClick={() => setSelectedTemplateId(template.id)}
                                                className={`cursor-pointer ${selectedTemplateId === template.id ? "bg-slate-300/50 border-l-4 border-[var(--color-primary)]" : idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}
                                            >
                                                <td className="px-4 py-3 font-semibold text-gray-800">
                                                    {template.template}
                                                </td>
                                                <td className="px-4 py-3 text-gray-600">{template.channel}</td>
                                                <td className="px-4 py-3 text-gray-600">{template.trigger}</td>
                                                <td className="px-4 py-3 text-gray-600">
                                                    {template.updated}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="text-center py-6 text-gray-500 italic">
                                                No templates match the filters.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="shadow-md border border-gray-200 rounded p-4 space-y-4">
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <p className="text-xxs text-gray-500">Subject / Title</p>
                                <p className="text-sm font-semibold text-gray-800">
                                    Editing: {selectedTemplate?.template}
                                </p>
                            </div>
                            <div className="text-xxs text-gray-500">
                                Versions
                            </div>
                        </div>
                        <CustomSelect
                            name="versions"
                            label="Version"
                            value={selectedVersion}
                            placeholder="Select version"
                            options={(selectedTemplate?.versions || []).map((version) => ({
                                value: version,
                                label: version,
                            }))}
                            onChange={setSelectedVersion}
                            controlHeight="2.25rem"
                            isSearchable={false}
                        />
                        <Input
                            type="text"
                            label="Subject / Title"
                            value={editorValues.subject}
                            onChange={(e) =>
                                setEditorValues((prev) => ({ ...prev, subject: e.target.value }))
                            }
                        />
                        <div>
                            <label className="text-xxs font-medium text-gray-700 mb-1 block">
                                Body
                            </label>
                            <textarea
                                className="w-full min-h-[140px] rounded border border-gray-300 px-3 py-2 text-xxs focus:border-gray-600 focus:outline-none"
                                value={editorValues.body}
                                onChange={(e) =>
                                    setEditorValues((prev) => ({ ...prev, body: e.target.value }))
                                }
                            />
                        </div>
                        <CustomSelect
                            name="channel"
                            label="Channel"
                            value={editorValues.channel}
                            placeholder="Select channel"
                            options={channelOptions}
                            onChange={(value) =>
                                setEditorValues((prev) => ({ ...prev, channel: value }))
                            }
                            controlHeight="2.25rem"
                        />
                        <CustomSelect
                            name="trigger"
                            label="Trigger"
                            value={editorValues.trigger}
                            placeholder="Select trigger"
                            options={triggerOptions}
                            onChange={(value) =>
                                setEditorValues((prev) => ({ ...prev, trigger: value }))
                            }
                            controlHeight="2.25rem"
                        />
                        <div>
                            <p className="text-xxs font-medium text-gray-700 mb-2">
                                Variables
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {(selectedTemplate?.variables || []).map((variable) => (
                                    <span
                                        key={variable}
                                        className="text-xxs rounded-full border border-gray-200 px-2 py-1 bg-slate-50 text-slate-600"
                                    >
                                        {variable}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="primary" type="button" onClick={handleSave}>
                                Save
                            </Button>
                            <Button variant="secondary" type="button" onClick={handleSendTest}>
                                Send Test
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {isTestOpen && (
                <Modal width="w-full md:w-5/12">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Send Test
                    </h3>
                    <div className="space-y-3">
                        <Input
                            type="email"
                            label="Recipient email"
                            value={testRecipient}
                            onChange={(e) => setTestRecipient(e.target.value)}
                            placeholder="you@example.com"
                        />
                        <p className="text-xxs text-gray-500">
                            A test notification will be sent over {editorValues.channel} to this address.
                        </p>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="cancel" onClick={closeTestModal}>
                            Cancel
                        </Button>
                        <Button
                            variant="success"
                            onClick={() => {
                                closeTestModal();
                            }}
                        >
                            Send test
                        </Button>
                    </div>
                </Modal>
            )}
        </Layout>
    );
}
