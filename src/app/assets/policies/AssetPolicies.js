"use client";
import Layout from "y@/app/components/Layout";
import Button from "y@/app/components/Button";
import { useState } from "react";
import { FiSave, FiEdit, FiAlertTriangle, FiPercent, FiRotateCcw, FiClock } from "react-icons/fi";

const defaultPolicies = [
  {
    title: "Return Rules",
    icon: FiRotateCcw,
    description:
      "Defines conditions under which assets must be returned, timelines, and penalties for non-compliance.",
    fields: [
      { label: "Return Timeframe (Days)", value: "7" },
      { label: "Late Return Penalty (%)", value: "5" },
      { label: "Approval Required For Exceptions", value: "Asset Governance Office" },
    ],
  },
  {
    title: "Depreciation Policy",
    icon: FiPercent,
    description:
      "Specifies annual depreciation percentages and residual value handling for financial reporting.",
    fields: [
      { label: "Hardware Depreciation (%)", value: "20" },
      { label: "Vehicle Depreciation (%)", value: "15" },
      { label: "Software Amortization (%)", value: "33" },
    ],
  },
  {
    title: "Escalation Contacts",
    icon: FiAlertTriangle,
    description:
      "Lists escalation hierarchy for lost, damaged, or non-compliant assets.",
    fields: [
      { label: "Level 1 Contact", value: "Asset Custodian" },
      { label: "Level 2 Contact", value: "Risk & Security Team" },
      { label: "Level 3 Contact", value: "Executive Council" },
    ],
  },
  {
    title: "SLA Reminders",
    icon: FiClock,
    description:
      "Defines service-level agreements for maintenance, repairs, and compliance updates.",
    fields: [
      { label: "Maintenance SLA (Hours)", value: "48" },
      { label: "Critical Incident SLA (Hours)", value: "4" },
      { label: "Audit Compliance Review Frequency", value: "Quarterly" },
    ],
  },
];

export default function AssetPolicies() {
  const [policies, setPolicies] = useState(defaultPolicies);
  const [editing, setEditing] = useState(false);

  const handleChange = (policyIndex, fieldIndex, newValue) => {
    const updated = [...policies];
    updated[policyIndex].fields[fieldIndex].value = newValue;
    setPolicies(updated);
  };

  const savePolicies = () => {
    console.log("Saving policies:", policies);
    // TODO: send to backend API
    setEditing(false);
  };

  return (
    <Layout>
      <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6 space-y-8">
        
        {/* Header */}
        <header className="flex flex-col lg:flex-row justify-between gap-4 border-b pb-4 border-gray-100">
          <div>
           
            <h1 className="text-xl font-bold text-gray-800">
              Asset Policies
            </h1>
            <p className="text-gray-600 text-xxs">
              Configure return rules, depreciation percentages, escalation contacts, and SLA reminders.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xxs">
            {!editing ? (
              <Button variant="outline" onClick={() => setEditing(true)}>
                <FiEdit className="inline mr-2" /> Edit Policies
              </Button>
            ) : (
              <Button variant="success" onClick={savePolicies}>
                 Save Policies
              </Button>
            )}
          </div>
        </header>

        {/* Policy Sections */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {policies.map((policy, pIndex) => {
            const Icon = policy.icon;
            return (
              <div
                key={policy.title}
                className="border border-gray-200 rounded-xl p-5 bg-white shadow hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 text-lg">
                    <Icon />
                  </div>
                  <h2 className="text-base font-semibold text-gray-800">
                    {policy.title}
                  </h2>
                </div>

                <p className="text-xxs text-gray-500 mb-4">
                  {policy.description}
                </p>

                <div className="space-y-3">
                  {policy.fields.map((field, fIndex) => (
                    <div key={field.label} className="flex flex-col">
                      <label className="text-xxs text-gray-500 mb-1">
                        {field.label}
                      </label>
                      {editing ? (
                        <input
                          type="text"
                          value={field.value}
                          onChange={(e) =>
                            handleChange(pIndex, fIndex, e.target.value)
                          }
                          className="border border-gray-300 rounded-md p-2 text-xxs focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                      ) : (
                        <div className="bg-gray-50 border border-gray-200 rounded-md p-2 text-xxs text-gray-700">
                          {field.value}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </Layout>
  );
}