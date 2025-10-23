"use client";
import { Switch } from "@headlessui/react";
import React from "react";

const ToggleSwitch = ({ label, checked, onChange, error, className = "" }) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <div className="flex items-center justify-between gap-3">
                {label && (
                    <label className="text-xxs font-medium text-gray-700">{label}</label>
                )}

                <Switch
                    checked={checked}
                    onChange={onChange}
                    className={`${checked ? "bg-[var(--toggle-btn)]" : "bg-gray-300"
                        } relative inline-flex h-4 w-8 items-center rounded-full transition-colors duration-300`}
                >
                    <span
                        className={`${checked ? "translate-x-4" : "translate-x-1"
                            } inline-block transform rounded-full bg-white transition-transform duration-300 ease-out`} style={{ height: "11px", width: "11px" }}
                    />
                </Switch>
            </div>

            {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
        </div>
    );
};

export default ToggleSwitch;
