"use client";
import { useState } from "react";
import Layout from "y@/app/components/Layout";
import Tabs from "y@/app/components/Tabs";

import LocalSetting from "./tabs/LocaleSetting";
import Brandings from "./tabs/Branding";
import CompanyInfo from "./tabs/CompanyInfo";

export default function Organization() {
  const [activeTab, setActiveTab] = useState("ci");
  const activeTabLabel = {
    ci: "Company Info",
    ls: "Locale & Settings",
    branding: "Branding",
  }[activeTab];

  const tabs = [
    { key: "ci", label: "Company Info", content: <CompanyInfo /> },
    { key: "ls", label: "Locale & Settings", content: <LocalSetting /> },
    { key: "branding", label: "Branding", content: <Brandings /> },
  ];

  return (
    <Layout>
      <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h2 className="text-base font-semibold text-gray-700">Organization</h2>
            <p className="text-xxs text-gray-500 mt-0.5">
              Manage company identity, regional setup, and brand presentation.
            </p>
          </div>
          <span className="inline-flex items-center rounded-full bg-[#edf4ff] text-[#315d9c] px-2.5 py-1 text-[10px] font-medium w-fit">
            Active: {activeTabLabel}
          </span>
        </div>

        <Tabs tabs={tabs} defaultTab="ci" onTabChange={setActiveTab} align="left" />
      </div>
    </Layout>
  );
}
