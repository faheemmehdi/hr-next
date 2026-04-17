"use client";

import { useMemo, useState } from "react";
import {
  FiBell,
  FiGlobe,
  FiGrid,
  FiRefreshCw,
  FiSave,
  FiSettings,
  FiSliders,
} from "react-icons/fi";
import Layout from "../components/Layout";
import Button from "../components/Button";
import CustomSelect from "../components/CustomSelect";
import { mapSelectOptions } from "../utils/mapSelectOptions";

const initialPreferences = {
  notifications: {
    email: true,
    sms: false,
    push: true,
    approvals: true,
    reminders: true,
  },
  appearance: {
    tableDensity: "normal",
    theme: "light",
    mode: "system",
  },
  workspace: {
    language: "en",
    timezone: "Asia/Karachi",
    dateFormat: "dd-mmm-yyyy",
    weekStartsOn: "monday",
    defaultLanding: "dashboard",
    autoRefresh: true,
  },
};

function PreferenceToggle({ label, hint, checked, onChange }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xxs font-medium text-gray-800">{label}</p>
          <p className="text-[10px] text-gray-500 mt-0.5">{hint}</p>
        </div>
        <button
          type="button"
          onClick={onChange}
          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
            checked ? "bg-[var(--color-primary)]" : "bg-gray-300"
          }`}
          aria-pressed={checked}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              checked ? "translate-x-4" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

export default function PreferencesClient() {
  const [preferences, setPreferences] = useState(initialPreferences);
  const [lastSavedAt, setLastSavedAt] = useState("Not saved yet");

  const isDirty = useMemo(
    () => JSON.stringify(preferences) !== JSON.stringify(initialPreferences),
    [preferences]
  );

  const tableDensityOptions = mapSelectOptions(
    [
      { id: "compact", name: "Compact" },
      { id: "normal", name: "Normal" },
      { id: "comfortable", name: "Comfortable" },
    ],
    "id",
    "name"
  );

  const themeOptions = mapSelectOptions(
    [
      { id: "light", name: "Light" },
      { id: "classic", name: "Classic" },
      { id: "contrast", name: "High Contrast" },
    ],
    "id",
    "name"
  );

  const modeOptions = mapSelectOptions(
    [
      { id: "system", name: "System Default" },
      { id: "light", name: "Light" },
      { id: "dark", name: "Dark" },
    ],
    "id",
    "name"
  );

  const languageOptions = mapSelectOptions(
    [
      { id: "en", name: "English" },
      { id: "ur", name: "Urdu" },
      { id: "ar", name: "Arabic" },
    ],
    "id",
    "name"
  );

  const timezoneOptions = mapSelectOptions(
    [
      { id: "Asia/Karachi", name: "Asia/Karachi" },
      { id: "Asia/Dubai", name: "Asia/Dubai" },
      { id: "Europe/London", name: "Europe/London" },
      { id: "America/New_York", name: "America/New_York" },
    ],
    "id",
    "name"
  );

  const dateFormatOptions = mapSelectOptions(
    [
      { id: "dd-mmm-yyyy", name: "DD-MMM-YYYY" },
      { id: "yyyy-mm-dd", name: "YYYY-MM-DD" },
      { id: "mm/dd/yyyy", name: "MM/DD/YYYY" },
    ],
    "id",
    "name"
  );

  const weekStartOptions = mapSelectOptions(
    [
      { id: "monday", name: "Monday" },
      { id: "sunday", name: "Sunday" },
    ],
    "id",
    "name"
  );

  const landingOptions = mapSelectOptions(
    [
      { id: "dashboard", name: "Dashboard" },
      { id: "employees", name: "Employees" },
      { id: "attendance", name: "Attendance" },
      { id: "reports", name: "Reports" },
    ],
    "id",
    "name"
  );

  const updateToggle = (section, key) => {
    setPreferences((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key],
      },
    }));
  };

  const updateSelect = (section, key, value) => {
    setPreferences((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleReset = () => {
    setPreferences(initialPreferences);
  };

  const handleSave = () => {
    const stamp = new Date().toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    setLastSavedAt(stamp);
    console.log("Saved Preferences:", preferences);
  };

  return (
    <Layout>
      <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div>
            <h1 className="text-base font-semibold text-gray-700">My Preferences</h1>
            <p className="text-xxs text-gray-500">
              Manage notification, appearance, and workspace behavior for your account.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-[10px] text-gray-600">
            <FiSettings size={12} />
            Last saved: {lastSavedAt}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="rounded-lg border border-gray-200 bg-[#f8fbff] p-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-gray-500">Active Notifications</p>
              <FiBell className="text-[#315d9c]" size={13} />
            </div>
            <p className="mt-1 text-sm font-semibold text-gray-800">
              {
                Object.values(preferences.notifications).filter(Boolean).length
              }
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-[#f7faf8] p-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-gray-500">Theme</p>
              <FiGrid className="text-[#2f7d4f]" size={13} />
            </div>
            <p className="mt-1 text-sm font-semibold text-gray-800 capitalize">
              {preferences.appearance.theme}
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-[#fff8f2] p-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-gray-500">Timezone</p>
              <FiGlobe className="text-[#9a5d1d]" size={13} />
            </div>
            <p className="mt-1 text-sm font-semibold text-gray-800">
              {preferences.workspace.timezone}
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-[#f5f4ff] p-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-gray-500">Unsaved Changes</p>
              <FiSliders className="text-[#5f54b7]" size={13} />
            </div>
            <p className="mt-1 text-sm font-semibold text-gray-800">
              {isDirty ? "Yes" : "No"}
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 xl:grid-cols-2 gap-4">
          <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-7 w-7 rounded-full bg-[#edf4ff] text-[#315d9c] inline-flex items-center justify-center">
                <FiBell size={13} />
              </span>
              <div>
                <h2 className="text-xs font-semibold text-gray-700">Notifications</h2>
                <p className="text-[10px] text-gray-500">Choose where important updates are delivered.</p>
              </div>
            </div>
            <div className="space-y-2">
              <PreferenceToggle
                label="Email Notifications"
                hint="Receive approvals, requests, and policy updates via email."
                checked={preferences.notifications.email}
                onChange={() => updateToggle("notifications", "email")}
              />
              <PreferenceToggle
                label="SMS Alerts"
                hint="Get urgent alerts on your registered mobile number."
                checked={preferences.notifications.sms}
                onChange={() => updateToggle("notifications", "sms")}
              />
              <PreferenceToggle
                label="In-App Push"
                hint="Show real-time alerts inside the platform."
                checked={preferences.notifications.push}
                onChange={() => updateToggle("notifications", "push")}
              />
              <PreferenceToggle
                label="Approval Reminders"
                hint="Notify when pending approvals are nearing SLA."
                checked={preferences.notifications.approvals}
                onChange={() => updateToggle("notifications", "approvals")}
              />
              <PreferenceToggle
                label="Task Reminders"
                hint="Remind me about due tasks and profile completion actions."
                checked={preferences.notifications.reminders}
                onChange={() => updateToggle("notifications", "reminders")}
              />
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-7 w-7 rounded-full bg-[#f5f4ff] text-[#5f54b7] inline-flex items-center justify-center">
                <FiGrid size={13} />
              </span>
              <div>
                <h2 className="text-xs font-semibold text-gray-700">Appearance</h2>
                <p className="text-[10px] text-gray-500">Tune visual density and interface style.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <CustomSelect
                label="Table Density"
                name="pref_table_density"
                value={preferences.appearance.tableDensity}
                onChange={(v) => updateSelect("appearance", "tableDensity", v)}
                options={tableDensityOptions}
                placeholder="Select density"
                controlHeight="2rem"
              />
              <CustomSelect
                label="Theme"
                name="pref_theme"
                value={preferences.appearance.theme}
                onChange={(v) => updateSelect("appearance", "theme", v)}
                options={themeOptions}
                placeholder="Select theme"
                controlHeight="2rem"
              />
              <div className="md:col-span-2">
                <CustomSelect
                  label="Display Mode"
                  name="pref_mode"
                  value={preferences.appearance.mode}
                  onChange={(v) => updateSelect("appearance", "mode", v)}
                  options={modeOptions}
                  placeholder="Select mode"
                  controlHeight="2rem"
                />
              </div>
            </div>
          </section>
        </div>

        <section className="mt-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-7 w-7 rounded-full bg-[#fff8ed] text-[#9a5d1d] inline-flex items-center justify-center">
              <FiGlobe size={13} />
            </span>
            <div>
              <h2 className="text-xs font-semibold text-gray-700">Workspace Preferences</h2>
              <p className="text-[10px] text-gray-500">Set locale and default navigation behavior for daily usage.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            <CustomSelect
              label="Language"
              name="pref_language"
              value={preferences.workspace.language}
              onChange={(v) => updateSelect("workspace", "language", v)}
              options={languageOptions}
              placeholder="Select language"
              controlHeight="2rem"
            />
            <CustomSelect
              label="Timezone"
              name="pref_timezone"
              value={preferences.workspace.timezone}
              onChange={(v) => updateSelect("workspace", "timezone", v)}
              options={timezoneOptions}
              placeholder="Select timezone"
              controlHeight="2rem"
            />
            <CustomSelect
              label="Date Format"
              name="pref_date_format"
              value={preferences.workspace.dateFormat}
              onChange={(v) => updateSelect("workspace", "dateFormat", v)}
              options={dateFormatOptions}
              placeholder="Select format"
              controlHeight="2rem"
            />
            <CustomSelect
              label="Week Starts On"
              name="pref_week_start"
              value={preferences.workspace.weekStartsOn}
              onChange={(v) => updateSelect("workspace", "weekStartsOn", v)}
              options={weekStartOptions}
              placeholder="Select day"
              controlHeight="2rem"
            />
            <CustomSelect
              label="Default Landing Page"
              name="pref_default_landing"
              value={preferences.workspace.defaultLanding}
              onChange={(v) => updateSelect("workspace", "defaultLanding", v)}
              options={landingOptions}
              placeholder="Select page"
              controlHeight="2rem"
            />
            <PreferenceToggle
              label="Auto Refresh Dashboards"
              hint="Auto-refresh key metrics every few minutes."
              checked={preferences.workspace.autoRefresh}
              onChange={() => updateToggle("workspace", "autoRefresh")}
            />
          </div>
        </section>

        <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap justify-end gap-2">
          <Button type="button" variant="cancel" onClick={handleReset}>
            <span className="inline-flex items-center gap-1.5">
              <FiRefreshCw size={12} />
              Reset
            </span>
          </Button>
          <Button type="button" variant="success" onClick={handleSave}>
            <span className="inline-flex items-center gap-1.5">
              <FiSave size={12} />
              Save Preferences
            </span>
          </Button>
        </div>
      </div>
    </Layout>
  );
}
