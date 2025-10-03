"use client";
import { useState } from "react";
import Layout from "../components/Layout";

export default function PreferencesClient() {
  const [preferences, setPreferences] = useState({
    notifications: {
      email: false,
      sms: false,
      push: false,
    },
    appearance: {
      darkMode: false,
      tableDensity: "",
      theme: "",
    },
  });

  const handleCheckboxChange = (section, key) => {
    setPreferences((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key],
      },
    }));
  };

  const handleSelectChange = (section, key, value) => {
    setPreferences((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleReset = () => {
    setPreferences({
      notifications: {
        email: false,
        sms: false,
        push: false,
      },
      appearance: {
        darkMode: false,
        tableDensity: "",
        theme: "",
      },
    });
  };

  const handleSave = () => {
    console.log("Saved Preferences:", preferences);
    // API call can be made here
  };

  return (
    <Layout>
      <div className="w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-lg font-semibold mb-6">My Preferences</h1>

        {/* Notifications Section */}
        <section className="mb-6">
          <h2 className="text-sm font-medium text-gray-700 mb-3">
            Notifications
          </h2>
          <div className="flex flex-col sm:flex-row text-xxs gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={preferences.notifications.email}
                onChange={() => handleCheckboxChange("notifications", "email")}
                className="w-3 h-3 text-blue-600 border-gray-300 rounded"
              />
              Email Notifications
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={preferences.notifications.sms}
                onChange={() => handleCheckboxChange("notifications", "sms")}
                className="w-3 h-3 text-blue-600 border-gray-300 rounded"
              />
              SMS Notifications
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={preferences.notifications.push}
                onChange={() => handleCheckboxChange("notifications", "push")}
                className="w-3 h-3 text-blue-600 border-gray-300 rounded"
              />
              Push Notifications
            </label>
          </div>
        </section>

        <hr className="my-6 border-gray-200" />

        {/* Appearance Section */}
        <section className="mb-6">
          <h2 className="text-sm font-medium text-gray-700 mb-3">Appearance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-center">
            <div className="flex flex-col">
              <label className="text-gray-500 text-xs mb-1">
                Table Density
              </label>
              <select
                value={preferences.appearance.tableDensity}
                onChange={(e) =>
                  handleSelectChange(
                    "appearance",
                    "tableDensity",
                    e.target.value
                  )
                }
                className="border border-gray-300 rounded px-2 py-1 text-xs h-8 focus:outline-none focus:ring-1 focus:ring-blue-400"
              >
                <option value="">Select Density</option>
                <option value="compact">Compact</option>
                <option value="normal">Normal</option>
                <option value="comfortable">Comfortable</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500 text-xs mb-1">Theme</label>
              <select
                value={preferences.appearance.theme}
                onChange={(e) =>
                  handleSelectChange("appearance", "theme", e.target.value)
                }
                className="border border-gray-300 rounded px-2 py-1 text-xs h-8 focus:outline-none focus:ring-1 focus:ring-blue-400"
              >
                <option value="">Select Theme</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="blue">Blue</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500 text-xs mb-1">Mode</label>
              <select
                value={preferences.appearance.mode}
                onChange={(e) =>
                  handleSelectChange("appearance", "mode", e.target.value)
                }
                className="border border-gray-300 rounded px-2 py-1 text-xs h-8 focus:outline-none focus:ring-1 focus:ring-blue-400"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer text-xs"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            className="px-4 py-2  bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer  text-xs"
            onClick={handleSave}
          >
            Save Preferences
          </button>
        </div>
      </div>
    </Layout>
  );
}
