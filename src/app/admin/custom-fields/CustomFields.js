"use client";
import { useMemo, useState } from "react";
import Layout from "y@/app/components/Layout";
import SearchBar from "y@/app/components/SearchBar";
import CustomSelect from "y@/app/components/CustomSelect";
import Button from "y@/app/components/Button";
import Input from "y@/app/components/Input";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineBlock } from "react-icons/md";
import RowActions from "y@/app/components/RowActions";
import Modal from "y@/app/components/ModalShell";
import ToggleSwitch from "y@/app/components/ToggleSwitch";
import ReasonModal from "y@/app/components/ReasonConfirmModal";

const typeOptions = [
    { value: "text", label: "Text" },
    { value: "number", label: "Number" },
    { value: "date", label: "Date" },
    { value: "select", label: "Select" },
    { value: "tag", label: "Tag" },
    { value: "file", label: "File" },
];

const initialForm = {
    id: null,
    entity: "",
    field: "",
    type: "text",
    options: "",
    validation: "",
    required: true,
    active: true,
};

const baseFields = [
    {
        id: 1,
        entity: "Employee",
        field: "Emergency Contact",
        type: "text",
        options: "",
        validation: "Max 100 characters",
        required: true,
        active: true,
    },
    {
        id: 2,
        entity: "Asset",
        field: "Warranty Expiration",
        type: "date",
        options: "",
        validation: "",
        required: false,
        active: true,
    },
    {
        id: 3,
        entity: "Expense",
        field: "Receipt Type",
        type: "select",
        options: "Travel,Meal,Office,Other",
        validation: "Must select one",
        required: true,
        active: true,
    },
    {
        id: 4,
        entity: "Projects",
        field: "Billable",
        type: "tag",
        options: "Yes,No",
        validation: "Supports multiple tags",
        required: false,
        active: false,
    },
    {
        id: 5,
        entity: "Leave",
        field: "Medical Document",
        type: "file",
        options: "",
        validation: "PDF/JPG only",
        required: false,
        active: true,
    },
];

export default function CustomFields() {
    const [customFields, setCustomFields] = useState(baseFields);
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [formValues, setFormValues] = useState(initialForm);
    const [selectedField, setSelectedField] = useState(baseFields[0]);
    const [isReasonOpen, setReasonOpen] = useState(false);
    const [reasonTarget, setReasonTarget] = useState(null);
    const [reasonText, setReasonText] = useState("");

    const filteredFields = useMemo(() => {
        const term = search.trim().toLowerCase();
        return customFields.filter((field) => {
            const matchesTerm =
                !term ||
                field.entity.toLowerCase().includes(term) ||
                field.field.toLowerCase().includes(term) ||
                field.type.toLowerCase().includes(term);
            const matchesType = typeFilter ? field.type === typeFilter : true;
            return matchesTerm && matchesType;
        });
    }, [customFields, search, typeFilter]);

    const openAddModal = () => {
        setFormValues(initialForm);
        setModalOpen(true);
    };

    const openEditModal = (field) => {
        setFormValues({ ...field });
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleSave = () => {
        if (!formValues.entity || !formValues.field) {
            return;
        }

        if (formValues.id) {
            setCustomFields((prev) =>
                prev.map((field) => (field.id === formValues.id ? formValues : field))
            );
        } else {
            setCustomFields((prev) => [
                ...prev,
                { ...formValues, id: Date.now() },
            ]);
        }

        setSelectedField(formValues);
        setModalOpen(false);
    };

    const openReasonModal = (field) => {
        setReasonTarget(field);
        setReasonText("");
        setReasonOpen(true);
    };

    const closeReasonModal = () => {
        setReasonTarget(null);
        setReasonOpen(false);
    };

    const handleDeactivate = () => {
        if (!reasonTarget) return;
        setCustomFields((prev) =>
            prev.map((field) =>
                field.id === reasonTarget.id ? { ...field, active: false } : field
            )
        );
        setReasonOpen(false);
    };

    const showOptionsField = ["select", "tag"].includes(formValues.type);

    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-base font-semibold text-gray-700">
                            Custom Fields
                        </h2>
                        <p className="text-xxs text-gray-500">
                            Create fields per entity with validation. Types: text, number, date, select, tag, file.
                        </p>
                    </div>
                    <Button variant="success" onClick={openAddModal}>
                        Add Field
                    </Button>
                </div>
                <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5">
                    <div className="w-full md:w-1/5">
                        <SearchBar
                            placeholder="Search entity or field..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 mt-2 md:mt-0">
                        <div className="w-[9rem]">
                            <CustomSelect
                                name="filterType"
                                value={typeFilter}
                                placeholder="Type"
                                options={typeOptions}
                                onChange={setTypeFilter}
                                controlHeight="2rem"
                            />
                        </div>
                    </div>
                </div>


                <div className="overflow-x-auto shadow-md border border-gray-200 rounded max-h-[72vh]">
                    <table className="w-full text-xs border-collapse">
                        <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 text-left">Entity</th>
                                <th className="px-4 py-3 text-left">Field</th>
                                <th className="px-4 py-3 text-left">Type</th>
                                <th className="px-4 py-3 text-left">Required</th>
                                <th className="px-4 py-3 text-left">Active?</th>
                                <th className="px-4 py-3 text-left">Options</th>
                                <th className="px-4 py-3 text-left">Validation</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {filteredFields.map((field, idx) => (
                                <tr
                                    key={field.id}
                                    onClick={() => setSelectedField(field)}
                                    className={`cursor-pointer ${idx % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-gray-100 transition`}
                                >
                                    <td className="px-4 py-3">{field.entity}</td>
                                    <td className="px-4 py-3">{field.field}</td>
                                    <td className="px-4 py-3">{field.type}</td>
                                    <td className="px-4 py-3 font-semibold text-gray-800">
                                        {field.required ? "Yes" : "No"}
                                    </td>
                                    <td className="px-4 py-3 font-semibold text-gray-800">
                                        {field.active ? "Yes" : "No"}
                                    </td>
                                    <td className="px-4 py-3">{field.options || "—"}</td>
                                    <td className="px-4 py-3">{field.validation || "—"}</td>
                                    <RowActions
                                        row={field}
                                        actions={[
                                            {
                                                label: "Edit Field",
                                                icon: FiEdit3,
                                                onClick: (row) => openEditModal(row),
                                            },
                                            {
                                                label: "Deactivate",
                                                icon: MdOutlineBlock,
                                                color: "red",
                                                onClick: (row) => openReasonModal(row),
                                            },
                                        ]}
                                    />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {selectedField && (
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        <div className="shadow-md border border-gray-200 rounded p-4">
                            <p className="text-xxs uppercase tracking-wide text-gray-500">
                                Details
                            </p>
                            <h3 className="text-sm font-semibold text-gray-800 mt-2">
                                {selectedField.entity} · {selectedField.field}
                            </h3>
                            <p className="text-xxs text-gray-600 mt-2">
                                Type: <span className="font-semibold">{selectedField.type}</span>
                            </p>
                            <p className="text-xxs text-gray-600">
                                Required: {selectedField.required ? "Yes" : "No"}
                            </p>
                            <p className="text-xxs text-gray-600">
                                Active: {selectedField.active ? "Yes" : "No"}
                            </p>
                        </div>
                        <div className="shadow-md border border-gray-200 rounded p-4 space-y-2">
                            <p className="text-xxs uppercase tracking-wide text-gray-500">
                                Options & Validation
                            </p>
                            <p className="text-xxs text-gray-600">
                                Options: {selectedField.options || "N/A"}
                            </p>
                            <p className="text-xxs text-gray-600">
                                Validation: {selectedField.validation || "N/A"}
                            </p>
                        </div>
                    </div>
                )}

                {isModalOpen && (
                    <Modal width="w-full md:w-5/12">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            {formValues.id ? "Edit Field" : "Add Field"}
                        </h3>
                        <div className="space-y-3 text-xxs">
                            <Input
                                label="Entity"
                                value={formValues.entity}
                                onChange={(e) =>
                                    setFormValues((prev) => ({ ...prev, entity: e.target.value }))
                                }
                                placeholder="e.g. Employee"
                            />
                            <Input
                                label="Field Name"
                                value={formValues.field}
                                onChange={(e) =>
                                    setFormValues((prev) => ({ ...prev, field: e.target.value }))
                                }
                                placeholder="e.g. Emergency Contact"
                            />
                            <CustomSelect
                                name="type"
                                label="Type"
                                value={formValues.type}
                                options={typeOptions}
                                onChange={(value) =>
                                    setFormValues((prev) => ({ ...prev, type: value }))
                                }
                                controlHeight="2.25rem"
                            />
                            {showOptionsField && (
                                <Input
                                    label="Options (comma separated)"
                                    value={formValues.options}
                                    onChange={(e) =>
                                        setFormValues((prev) => ({ ...prev, options: e.target.value }))
                                    }
                                />
                            )}
                            <Input
                                label="Validation"
                                value={formValues.validation}
                                onChange={(e) =>
                                    setFormValues((prev) => ({ ...prev, validation: e.target.value }))
                                }
                                placeholder="e.g. Must be a valid email"
                            />
                            <ToggleSwitch
                                label="Required"
                                checked={formValues.required}
                                onChange={(value) =>
                                    setFormValues((prev) => ({ ...prev, required: value }))
                                }
                            />
                            <ToggleSwitch
                                label="Active"
                                checked={formValues.active}
                                onChange={(value) =>
                                    setFormValues((prev) => ({ ...prev, active: value }))
                                }
                            />
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="cancel" onClick={closeModal}>
                                Cancel
                            </Button>
                            <Button variant="success" onClick={handleSave}>
                                Save Field
                            </Button>
                        </div>
                    </Modal>
                )}

                <ReasonModal
                    isOpen={isReasonOpen}
                    title="Deactivate Custom Field"
                    desc={reasonText}
                    setDesc={setReasonText}
                    infoSection={
                        reasonTarget && (
                            <div className="text-xxs text-gray-600">
                                {reasonTarget.entity} · {reasonTarget.field}
                            </div>
                        )
                    }
                    onClose={closeReasonModal}
                    onSubmit={handleDeactivate}
                    variant="danger"
                    submitLabel="Deactivate"
                    reasonTitle="Why are you deactivating this field?"
                />
            </div>
        </Layout>
    );
}
