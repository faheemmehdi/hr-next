"use client";
import { useState } from "react";
import Input from "y@/app/components/Input";
import Button from "y@/app/components/Button";

export default function Brandings() {
  const [tagline, setTagline] = useState("People first, always.");
  const [description, setDescription] = useState(
    "A modern HR platform built to keep teams connected."
  );

  const [primaryColor, setPrimaryColor] = useState("#2563eb");
  const [accentColor, setAccentColor] = useState("#ec4899");
  const [textColor, setTextColor] = useState("#111827");

  const resetBranding = () => {
    setTagline("People first, always.");
    setDescription("A modern HR platform built to keep teams connected.");
    setPrimaryColor("#2563eb");
    setAccentColor("#ec4899");
    setTextColor("#111827");
  };

  const handleSaveBrand = () => {
    console.log("Branding kit", {
      tagline,
      description,
      primaryColor,
      accentColor,
      textColor,
    });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">

      {/* LEFT SIDE FORM */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">

        <div>
          <h2 className="text-sm font-semibold text-gray-800">
            Branding Settings
          </h2>
          <p className="text-xs text-gray-500">
            Customize how your HR platform looks across the system.
          </p>
        </div>

        {/* Tagline */}
        <Input
          label="Brand Tagline"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="Short inspiring line"
        />

        {/* Description */}
        <div className="space-y-1">
          <label className="text-xxs font-semibold text-gray-600">
            Brand Description
          </label>

          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your company brand personality"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xxs focus:border-slate-800 focus:outline-none"
          />
        </div>

        {/* Colors */}
        <div className="grid grid-cols-3 gap-4 pt-2">

          <div>
            <p className="text-xxs font-semibold uppercase text-gray-500 mb-1">
              Primary
            </p>
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="h-10 w-full rounded-lg border border-gray-200 cursor-pointer"
            />
          </div>

          <div>
            <p className="text-xxs font-semibold uppercase text-gray-500 mb-1">
              Accent
            </p>
            <input
              type="color"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="h-10 w-full rounded-lg border border-gray-200 cursor-pointer"
            />
          </div>

          <div>
            <p className="text-xxs font-semibold uppercase text-gray-500 mb-1">
              Text
            </p>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="h-10 w-full rounded-lg border border-gray-200 cursor-pointer"
            />
          </div>

        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="cancel" onClick={resetBranding}>
            Reset
          </Button>

          <Button variant="success" onClick={handleSaveBrand}>
            Save Branding
          </Button>
        </div>
      </div>

      {/* RIGHT SIDE LIVE PREVIEW */}

      <div className="space-y-5">

        <div>
          <h2 className="text-sm font-semibold text-gray-800">
            Live Brand Preview
          </h2>
          <p className="text-xxs text-gray-500">
            See how your brand will appear inside the HR system.
          </p>
        </div>

        {/* Hero preview */}
        <div
          className="rounded-xl p-6 text-white shadow-md"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
          }}
        >
          <p
            className="text-sm font-semibold"
            style={{ color: textColor }}
          >
            {tagline}
          </p>

          <p
            className="text-xxs opacity-90 mt-1"
            style={{ color: textColor }}
          >
            {description}
          </p>
        </div>

        {/* UI preview cards */}

        <div className="grid grid-cols-2 gap-4">

          <div className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white">
            <p className="text-xxs text-gray-500">Employees</p>
            <p className="text-lg font-semibold text-gray-800">1,248</p>
            <div
              className="h-1 rounded mt-2"
              style={{ background: primaryColor }}
            />
          </div>

          <div className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white">
            <p className="text-xxs text-gray-500">Attendance</p>
            <p className="text-lg font-semibold text-gray-800">96%</p>
            <div
              className="h-1 rounded mt-2"
              style={{ background: accentColor }}
            />
          </div>

        </div>

        {/* Button preview */}

        <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
          <p className="text-xxs text-gray-500 mb-3">
            Button Preview
          </p>

          <button
            className="px-4 py-2 text-xxs font-semibold rounded-lg text-white"
            style={{ background: primaryColor }}
          >
            Primary Button
          </button>
        </div>

      </div>

    </div>
  );
}