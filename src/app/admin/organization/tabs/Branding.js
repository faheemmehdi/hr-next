"use client";
import { useState } from "react";
import Input from "y@/app/components/Input";
import Button from "y@/app/components/Button";
import { FiDroplet, FiEye } from "react-icons/fi";

export default function Brandings() {
  const [tagline, setTagline] = useState("People first, always.");
  const [description, setDescription] = useState(
    "A modern HR platform built to keep teams connected."
  );

  const [primaryColor, setPrimaryColor] = useState("#2563eb");
  const [accentColor, setAccentColor] = useState("#16a34a");
  const [textColor, setTextColor] = useState("#111827");

  const resetBranding = () => {
    setTagline("People first, always.");
    setDescription("A modern HR platform built to keep teams connected.");
    setPrimaryColor("#2563eb");
    setAccentColor("#16a34a");
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
    <div className="grid lg:grid-cols-12 gap-4">
      <div className="lg:col-span-7 bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-5">
        <div>
          <h2 className="text-sm font-semibold text-gray-700">Branding Settings</h2>
          <p className="text-xxs text-gray-500">
            Configure organization-level brand messaging and colors.
          </p>
        </div>

        <Input
          label="Brand Tagline"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="Short inspiring line"
        />

        <div className="space-y-1">
          <label className="text-xxs font-medium text-gray-700">Brand Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your company brand personality"
            className="w-full rounded border border-gray-300 px-3 py-2 text-xxs focus:border-gray-600 focus:outline-none"
          />
        </div>

        <div>
          <p className="text-xxs font-medium text-gray-700 mb-2">Brand Colors</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-lg border border-gray-200 p-2">
              <p className="text-[10px] uppercase tracking-wide text-gray-500 mb-1">Primary</p>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="h-8 w-10 rounded border border-gray-200 cursor-pointer"
                />
                <span className="text-xxs text-gray-700 font-medium">{primaryColor}</span>
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 p-2">
              <p className="text-[10px] uppercase tracking-wide text-gray-500 mb-1">Accent</p>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="h-8 w-10 rounded border border-gray-200 cursor-pointer"
                />
                <span className="text-xxs text-gray-700 font-medium">{accentColor}</span>
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 p-2">
              <p className="text-[10px] uppercase tracking-wide text-gray-500 mb-1">Text</p>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="h-8 w-10 rounded border border-gray-200 cursor-pointer"
                />
                <span className="text-xxs text-gray-700 font-medium">{textColor}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-1">
          <Button variant="cancel" onClick={resetBranding}>
            Reset
          </Button>
          <Button variant="success" onClick={handleSaveBrand}>
            Save Branding
          </Button>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-3">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-7 w-7 rounded-full bg-[#edf4ff] text-[#315d9c] inline-flex items-center justify-center">
              <FiEye size={13} />
            </span>
            <div>
              <h3 className="text-xs font-semibold text-gray-700">Live Preview</h3>
              <p className="text-[10px] text-gray-500">Sample UI appearance with selected branding.</p>
            </div>
          </div>

          <div
            className="rounded-lg p-4"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
            }}
          >
            <p className="text-sm font-semibold" style={{ color: textColor }}>
              {tagline}
            </p>
            <p className="text-xxs mt-1 opacity-90" style={{ color: textColor }}>
              {description}
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-7 w-7 rounded-full bg-[#f7faf8] text-[#2f7d4f] inline-flex items-center justify-center">
              <FiDroplet size={13} />
            </span>
            <h3 className="text-xs font-semibold text-gray-700">Usage Preview</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded border border-gray-200 p-3">
              <p className="text-[10px] text-gray-500">Primary Button</p>
              <button
                className="mt-2 px-3 py-1.5 rounded text-xxs font-semibold text-white"
                style={{ background: primaryColor }}
              >
                Action
              </button>
            </div>
            <div className="rounded border border-gray-200 p-3">
              <p className="text-[10px] text-gray-500">Accent Indicator</p>
              <div className="h-2 rounded mt-3" style={{ background: accentColor }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
