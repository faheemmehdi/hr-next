"use client";
import { useMemo, useState } from "react";
import Layout from "y@/app/components/Layout";
import Button from "y@/app/components/Button";
import Input from "y@/app/components/Input";
import CustomSelect from "y@/app/components/CustomSelect";
import ToggleSwitch from "y@/app/components/ToggleSwitch";
import SearchBar from "y@/app/components/SearchBar";
import Modal from "y@/app/components/ModalShell";
import RichTextEditor from "y@/app/components/RichTextEditor";

const ssoOptions = [
    { value: "Azure AD", label: "Azure AD" },
    { value: "Google Workspace", label: "Google Workspace" },
    { value: "Okta", label: "Okta" },
];

const retentionOptions = [
    { value: "90", label: "90 days" },
    { value: "180", label: "180 days" },
    { value: "365", label: "365 days" },
    { value: "730", label: "730 days" },
];

const passwordComplexity = [
    { value: "medium", label: "Medium (letters + numbers)" },
    { value: "high", label: "High (letters + numbers + symbols)" },
    { value: "custom", label: "Custom" },
];



export default function Security() {
    const [search, setSearch] = useState("");
    const [provider, setProvider] = useState("Azure AD");
    const [ssoUrl, setSsoUrl] = useState("https://login.microsoftonline.com/{{tenant}}/oauth2/v2.0/authorize");
    const [twoFaEnabled, setTwoFaEnabled] = useState(true);
    const [twoFaMethod, setTwoFaMethod] = useState("SMS");
    const [passwordLength, setPasswordLength] = useState(12);
    const [passwordPolicy, setPasswordPolicy] = useState("high");
    const [retention, setRetention] = useState("365");
    const [dlpEnabled, setDlpEnabled] = useState(true);
    const [dlpRules, setDlpRules] = useState("");
    const [isTestOpen, setIsTestOpen] = useState(false);
    const [testAccount, setTestAccount] = useState("");

    const overviewRow = useMemo(() => {
        return [
            {
                provider,
                twoFa: twoFaEnabled ? `Enforced (${twoFaMethod})` : "Disabled",
                password: `${passwordLength}+ chars, ${passwordPolicy}`,
                retention: `${retention} days`,
                dlp: dlpEnabled ? "Active" : "Disabled",
                updated: "2026-03-05 09:30:00",
            },
        ];
    }, [provider, twoFaEnabled, twoFaMethod, passwordLength, passwordPolicy, retention, dlpEnabled]);

    const filteredOverview = useMemo(() => {
        if (!search) return overviewRow;
        const keyword = search.toLowerCase();
        return overviewRow.filter((row) =>
            [row.provider, row.twoFa, row.password, row.retention, row.dlp]
                .join(" ")
                .toLowerCase()
                .includes(keyword)
        );
    }, [search, overviewRow]);

    const openTestModal = () => setIsTestOpen(true);
    const closeTestModal = () => {
        setIsTestOpen(false);
        setTestAccount("");
    };

    const summaryCopy =
        "SSO, 2FA, password policy, retention, and DLP settings give you quick control over the organization’s security posture.";

    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
                <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-base font-semibold text-gray-700">
                                Security & Privacy
                            </h2>
                            <p className="text-xxs text-gray-500">{summaryCopy}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="primary" type="button" onClick={openTestModal}>
                                Test SSO
                            </Button>
                        </div>
                    </div>
                </div>



                <div className="mt-6 shadow-md border border-gray-200 rounded overflow-hidden">
                    <div className="overflow-x-auto shadow-md border border-gray-200 rounded max-h-[72vh]">
                        <table className="w-full text-xs border-collapse">
                            <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                                <tr>
                                    <th className="px-4 py-3 text-left">SSO Provider</th>
                                    <th className="px-4 py-3 text-left">2FA Policy</th>
                                    <th className="px-4 py-3 text-left">Password Policy</th>
                                    <th className="px-4 py-3 text-left">Data Retention</th>
                                    <th className="px-4 py-3 text-left">DLP</th>
                                    <th className="px-4 py-3 text-left">Updated At</th>
                                </tr>
                            </thead>
                            <tbody className="text-xxs">
                                {filteredOverview.map((row, idx) => (
                                    <tr
                                        key={`row-${idx}`}
                                        className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}
                                    >
                                        <td className="px-4 py-3 text-gray-800">{row.provider}</td>
                                        <td className="px-4 py-3 text-gray-600">{row.twoFa}</td>
                                        <td className="px-4 py-3 text-gray-600">{row.password}</td>
                                        <td className="px-4 py-3 text-gray-600">{row.retention}</td>
                                        <td className="px-4 py-3 text-gray-600">{row.dlp}</td>
                                        <td className="px-4 py-3 text-gray-600">{row.updated}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
                    <div className="shadow-md border border-gray-200 rounded p-4 space-y-4">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800">SSO Provider</h3>
                            <p className="text-xxs text-gray-500">Configure identity provider connection.</p>
                        </div>
                        <CustomSelect
                            name="ssoProvider"
                            label="SSO Provider"
                            value={provider}
                            options={ssoOptions}
                            onChange={setProvider}
                            controlHeight="2.25rem"
                        />
                        <Input
                            label="Login URL"
                            type="text"
                            value={ssoUrl}
                            onChange={(e) => setSsoUrl(e.target.value)}
                        />
                    </div>

                    <div className="shadow-md border border-gray-200 rounded p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-800">2FA Policy</h3>
                                <p className="text-xxs text-gray-500">Enforce multi-factor authentication.</p>
                            </div>
                            <ToggleSwitch
                                label="Enforced"
                                checked={twoFaEnabled}
                                onChange={setTwoFaEnabled}
                            />
                        </div>
                        <CustomSelect
                            name="twoFaMethod"
                            label="Primary method"
                            value={twoFaMethod}
                            options={[
                                { value: "SMS", label: "SMS" },
                                { value: "App", label: "Authenticator app" },
                                { value: "Email", label: "Email link" },
                            ]}
                            onChange={setTwoFaMethod}
                            controlHeight="2.25rem"
                        />
                    </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
                    <div className="shadow-md border border-gray-200 rounded p-4 space-y-4">
                        <h3 className="text-sm font-semibold text-gray-800">Password Policy</h3>
                        <Input
                            type="number"
                            label="Minimum length"
                            value={passwordLength}
                            onChange={(e) => setPasswordLength(Number(e.target.value))}
                        />
                        <CustomSelect
                            name="passwordPolicy"
                            label="Complexity"
                            value={passwordPolicy}
                            options={passwordComplexity}
                            onChange={setPasswordPolicy}
                            controlHeight="2.25rem"
                        />
                    </div>

                    <div className="shadow-md border border-gray-200 rounded p-4 space-y-4">
                        <h3 className="text-sm font-semibold text-gray-800">Data Retention</h3>
                        <p className="text-xxs text-gray-500">Retain logs and backups.</p>
                        <CustomSelect
                            name="retention"
                            label="Retention window"
                            value={retention}
                            options={retentionOptions}
                            onChange={setRetention}
                            controlHeight="2.25rem"
                        />
                    </div>
                </div>

                <div className="mt-6 shadow-md border border-gray-200 rounded p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800">DLP Rules</h3>
                            <p className="text-xxs text-gray-500">Control sensitive data movements.</p>
                        </div>
                        <ToggleSwitch
                            label="Enabled"
                            checked={dlpEnabled}
                            onChange={setDlpEnabled}
                        />
                    </div>
                    <div className="w-full mb-3">
                        <label
                            htmlFor="desc"
                            className="block text-xxs text-gray-700 mb-2"
                        >
                            Description
                        </label>
                        <RichTextEditor value={dlpRules} onChange={setDlpRules} />
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2 items-center justify-end">
                    <Button variant="success" type="button">
                        Save
                    </Button>
                    <Button variant="primary" type="button" onClick={openTestModal}>
                        Test SSO
                    </Button>
                </div>

                {isTestOpen && (
                    <Modal width="w-full md:w-5/12">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Test SSO</h3>
                        <Input
                            type="text"
                            label="Test account"
                            value={testAccount}
                            onChange={(e) => setTestAccount(e.target.value)}
                            placeholder="admin@example.com"
                        />
                        <p className="text-xxs text-gray-500">
                            A test login will be performed for {provider}. This ensures the redirect URL and metadata are healthy.
                        </p>
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
                                Run test
                            </Button>
                        </div>
                    </Modal>
                )}





            </div>
        </Layout>
    );
}
