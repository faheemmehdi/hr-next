"use client";
import { useState } from "react";
import Layout from "y@/app/components/Layout";
import Tabs from "y@/app/components/Tabs";
import CompanyInfo from "./tabs/CompanyInfo";
import LocalSetting from "./tabs/LocaleSetting";
import Brandings from "./tabs/Branding";

export default function Organization() {
  const [activeTab, setActiveTab] = useState("ci");

  const tabs = [
    { key: "ci", label: "Company Info", content: <CompanyInfo /> },
    { key: "ls", label: "Locale & Settings", content: <LocalSetting /> },
    { key: "branding", label: "Branding", content: <Brandings /> },
  ];

  return (
    <Layout>
      <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-semibold text-gray-700">Organization</h2>
        </div>

        <Tabs tabs={tabs} defaultTab="ci" onTabChange={setActiveTab} align="center" />
      </div>
    </Layout>
  );
}
