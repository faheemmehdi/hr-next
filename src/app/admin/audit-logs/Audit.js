"use client";
import { useState } from "react";
import Layout from "y@/app/components/Layout";
import Button from "y@/app/components/Button";
import SearchBar from "y@/app/components/SearchBar";
import CustomSelect from "y@/app/components/CustomSelect";
import Input from "y@/app/components/Input";
import DateRangePicker from "y@/app/components/DateRagePicker";

const auditEntries = [
    {
        event: "User signed in",
        entity: "Authentication",
        actor: "ahmad.khan@company.com",
        ip: "45.33.112.3",
        timestamp: "2026-03-04 09:41",
    },
    {
        event: "API token created",
        entity: "Integrations",
        actor: "sara.ali@company.com",
        ip: "13.52.101.44",
        timestamp: "2026-03-03 17:20",
    },
    {
        event: "User profile updated",
        entity: "Users",
        actor: "omar.malik@company.com",
        ip: "34.201.76.15",
        timestamp: "2026-03-02 12:05",
    },
    {
        event: "Permission changed",
        entity: "Permissions",
        actor: "hr.system@company.com",
        ip: "3.120.56.66",
        timestamp: "2026-03-01 14:55",
    },
    {
        event: "Report downloaded",
        entity: "Reports",
        actor: "nida.khan@company.com",
        ip: "52.14.23.98",
        timestamp: "2026-02-28 10:10",
    },
    {
        event: "Password reset",
        entity: "Authentication",
        actor: "it.team@company.com",
        ip: "54.172.12.33",
        timestamp: "2026-02-25 08:10",
    },
    {
        event: "User invited",
        entity: "Users",
        actor: "ahmad.khan@company.com",
        ip: "45.33.112.3",
        timestamp: "2026-03-05 11:30",
    },
    {
        event: "Role updated",
        entity: "Roles",
        actor: "sara.ali@company.com",
        ip: "13.52.101.44",
        timestamp: "2026-03-05 15:45",
    },
    {
        event: "User invited",
        entity: "Users",
        actor: "ahmad.khan@company.com",
        ip: "45.33.112.3",
        timestamp: "2026-03-05 11:30",
    },
    {
        event: "Role updated",
        entity: "Roles",
        actor: "sara.ali@company.com",
        ip: "13.52.101.44",
        timestamp: "2026-03-05 15:45",
    },

];


export default function AuditLog() {
    const [search, setSearch] = useState("");
    const [range, setRange] = useState([
        {
            startDate: undefined,
            endDate: undefined,
            key: 'selection'
        }
    ]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");



    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
                <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-base font-semibold text-gray-700">
                                Audit Logs
                            </h2>
                            <p className="text-xxs text-gray-500">
                                System-wide data/access logs. Time/entity filters help you narrow down activity.
                            </p>
                        </div>
                        <Button variant="primary" type="button">
                            Export
                        </Button>
                    </div>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5">
                    <div className="w-full md:w-1/5 flex items-center mb-1">
                        <SearchBar
                            placeholder="Search by event, actor or entity..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="w-full flex items-center justify-end flex-col md:flex-row mt-2 md:mt-0 gap-2">
                        <div className="mb-1 w-full md:w-[12rem]">
                            <DateRangePicker range={range} setRange={setRange} />

                        </div>
                    </div>
                </div>


                <div className="overflow-x-auto shadow-md border border-gray-200 rounded max-h-[72vh]">
                    <table className="w-full text-xs border-collapse">
                        <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 text-left">Event</th>
                                <th className="px-4 py-3 text-left">Entity</th>
                                <th className="px-4 py-3 text-left">Actor</th>
                                <th className="px-4 py-3 text-left">IP</th>
                                <th className="px-4 py-3 text-left">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {auditEntries && auditEntries.length > 0 ? (
                                auditEntries.map((row, idx) => (
                                    <tr
                                        key={idx}
                                        className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors`}
                                    >
                                        <td className="px-4 py-3">{row.event}</td>
                                        <td className="px-4 py-3">{row.entity}</td>
                                        <td className="px-4 py-3">{row.actor}</td>
                                        <td className="px-4 py-3">{row.ip}</td>
                                        <td className="px-4 py-3">{row.timestamp}</td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={10} className="text-center py-4 text-gray-500 italic">
                                        No audit found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}
