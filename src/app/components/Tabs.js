import React, { useState } from "react";

const Tabs = ({ tabs, defaultTab, onTabChange, align = "left", isCol }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].key);
  const flexDirectionClass = isCol ? "" : "bg-white rounded-lg shadow-md border border-gray-200 p-6";
  const alignmentClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
    between: "justify-between",
  };
  const handleTabClick = (key) => {
    setActiveTab(key);
    if (onTabChange) onTabChange(key);
  };

  return (
    <div>
      {/* Tab Header */}
      <div className={`flex ${alignmentClasses[align]} gap-2 border-b-2 border-gray-100 mt-3 font-medium`}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabClick(tab.key)}
            className={`px-4 py-2 border-b-3 text-sm font-bold cursor-pointer transition-colors duration-200 ${activeTab === tab.key
                ? "border-[var(--active-tabs)] text-[var(--active-tabs)]"
                : "border-transparent text-gray-600 hover:text-[var(--active-tabs)]"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={`${flexDirectionClass} mt-4`}>
        {tabs.find((t) => t.key === activeTab)?.content}
      </div>
    </div>
  );
};

export default Tabs;
