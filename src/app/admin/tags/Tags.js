"use client";
import { useMemo, useState } from "react";
import Layout from "y@/app/components/Layout";
import Button from "y@/app/components/Button";
import SearchBar from "y@/app/components/SearchBar";
import Input from "y@/app/components/Input";
import CustomSelect from "y@/app/components/CustomSelect";
import Modal from "y@/app/components/ModalShell";
import RowActions from "y@/app/components/RowActions";
import ReasonModal from "y@/app/components/ReasonConfirmModal";
import { FiTrash2, FiRepeat } from "react-icons/fi";
import RichTextEditor from "y@/app/components/RichTextEditor";

const baseTagList = [
    { id: 1, name: "Urgent", textColor: "#ffffff", bgColor: "#f87171", usage: 34 },
    { id: 2, name: "Payroll", textColor: "#000000", bgColor: "#fbbf24", usage: 18 },
    { id: 5, name: "Finance", textColor: "#ffffff", bgColor: "#8b5cf6", usage: 22 },
    { id: 6, name: "HR", textColor: "#000000", bgColor: "#fcd34d", usage: 12 },
    { id: 7, name: "Compliance", textColor: "#ffffff", bgColor: "#f97316", usage: 7 },
    { id: 8, name: "Marketing", textColor: "#000000", bgColor: "#a3e635", usage: 19 },
    { id: 9, name: "Operations", textColor: "#ffffff", bgColor: "#22d3ee", usage: 16 },
];

export default function Tag() {
    const [tags, setTags] = useState(baseTagList);
    const [search, setSearch] = useState("");
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [newTagName, setNewTagName] = useState("");
    const [newTagTextColor, setNewTagTextColor] = useState("#000000");
    const [newTagBgColor, setNewTagBgColor] = useState("#c7d2fe");
    const [isMergeOpen, setIsMergeOpen] = useState(false);
    const [mergeSource, setMergeSource] = useState(null);
    const [mergeTarget, setMergeTarget] = useState("");
    const [mergeNotes, setMergeNotes] = useState("");
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deleteTag, setDeleteTag] = useState(null);
    const [deleteReason, setDeleteReason] = useState("");

    const filteredTags = useMemo(() => {
        if (!search) return tags;
        return tags.filter((tag) =>
            `${tag.name}`.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, tags]);

    const tagOptions = useMemo(
        () => tags.map((tag) => ({ value: tag.id, label: tag.name })),
        [tags]
    );

    const openAddModal = () => setIsAddOpen(true);
    const closeAddModal = () => setIsAddOpen(false);
    const openMergeModal = (tag) => {
        setMergeSource(tag);
        setMergeTarget("");
        setMergeNotes("");
        setIsMergeOpen(true);
    };
    const closeMergeModal = () => {
        setIsMergeOpen(false);
        setMergeSource(null);
        setMergeTarget("");
        setMergeNotes("");
    };
    const openDeleteModal = (tag) => {
        setDeleteTag(tag);
        setDeleteReason("");
        setIsDeleteOpen(true);
    };
    const closeDeleteModal = () => {
        setIsDeleteOpen(false);
        setDeleteTag(null);
        setDeleteReason("");
    };

    const handleAddTag = () => {
        if (!newTagName.trim()) return;
        const trimmedName = newTagName.trim();
        const isDuplicate = tags.some(
            (tag) => tag.name.toLowerCase() === trimmedName.toLowerCase()
        );
        if (isDuplicate) return;
        setTags((prev) => [
            ...prev,
            {
                id: Date.now(),
                name: trimmedName,
                textColor: newTagTextColor || "#000000",
                bgColor: newTagBgColor || "#c7d2fe",
                usage: 0,
            },
        ]);
        setNewTagName("");
        setNewTagTextColor("#000000");
        setNewTagBgColor("#c7d2fe");
        closeAddModal();
    };

    const handleMerge = () => {
        if (!mergeSource || !mergeTarget) return;
        setTags((prev) => {
            const sourceTag = prev.find((tag) => String(tag.id) === String(mergeSource.id));
            const targetTag = prev.find((tag) => String(tag.id) === String(mergeTarget));
            if (!sourceTag || !targetTag) return prev;
            return prev
                .map((tag) =>
                    tag.id === targetTag.id
                        ? { ...tag, usage: tag.usage + sourceTag.usage }
                        : tag
                )
                .filter((tag) => tag.id !== sourceTag.id);
        });
        closeMergeModal();
    };

    const handleDelete = () => {
        if (!deleteTag) return;
        setTags((prev) => prev.filter((tag) => tag.id !== deleteTag.id));
        closeDeleteModal();
    };

    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-base font-semibold text-gray-700">
                                Tags
                            </h2>
                            <p className="text-xxs text-gray-500">
                                Global tags; color coding. Merge tags to keep the workspace clean.
                            </p>
                        </div>
                        <Button onClick={openAddModal} variant="success">
                            Add Tag
                        </Button>
                    </div>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5">

                    <div className="w-full md:w-1/5 flex items-center mb-1">
                        <SearchBar
                            placeholder="Search tag name..."
                            onSearch={setSearch}
                        />
                    </div>
                </div>

               <div className="overflow-x-auto shadow-md border border-gray-200 rounded max-h-[72vh]">
                    <table className="w-full text-xs border-collapse">
                        <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 text-left">Tag Name</th>
                                <th className="px-4 py-3 text-left">Background</th>
                                <th className="px-4 py-3 text-left">Text Color</th>
                                <th className="px-4 py-3 text-left">Usage</th>
                                <th className="px-4 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {filteredTags.length > 0 ? (
                                filteredTags.map((tag, idx) => (
                                    <tr
                                        key={tag.id}
                                        className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors`}
                                    >
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center"
                                                    style={{
                                                        backgroundColor: tag.bgColor,
                                                        color: tag.textColor,
                                                    }}
                                                >
                                                    {tag.name[0]}
                                                </span>
                                                <div>
                                                    <p className="font-semibold text-gray-800">
                                                        {tag.name}
                                                    </p>
                                                    <p className="text-xxs text-gray-500">
                                                        Global tag
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-6 h-6 rounded border border-gray-200"
                                                    style={{ backgroundColor: tag.bgColor }}
                                                />
                                                <span className="text-xxs text-gray-600">
                                                    {tag.bgColor}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">


                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-6 h-6 rounded border border-gray-200"
                                                    style={{ backgroundColor: tag.textColor }}
                                                />
                                                <span className="text-xxs text-gray-600">
                                                    {tag.textColor}
                                                </span>
                                            </div>


                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="font-semibold text-gray-900">
                                                {tag.usage}
                                            </span>
                                            <p className="text-xxs text-gray-500">usage</p>
                                        </td>
                                        <RowActions
                                            row={tag}
                                            actions={[
                                                {
                                                    label: "Merge Tag",
                                                    icon: FiRepeat,
                                                    color: "gold",
                                                    onClick: (row) => openMergeModal(row),
                                                },
                                                {
                                                    label: "Delete Tag",
                                                    icon: FiTrash2,
                                                    color: "red",
                                                    onClick: (row) => openDeleteModal(row),
                                                },
                                            ]}
                                        />
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-6 text-gray-500 italic">
                                        No tags found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isAddOpen && (
                <Modal width="w-full md:w-5/12">
                    <h3 className="text-lg text-center font-semibold mb-4">Add new Tag</h3>
                    <div className="grid gap-4">
                        <Input
                            type="text"
                            label="Tag Name"
                            placeholder="e.g. Governance"
                            value={newTagName}
                            onChange={(e) => setNewTagName(e.target.value)}
                        // isRequired
                        />
                        <div className="grid grid-cols-2 gap-9">
                            <div>
                                <p className="text-xxs font-medium text-gray-700 mb-1">
                                    Background Color
                                </p>
                                <div className="flex items-center gap-3">
                                    <Input
                                        type="text"
                                        placeholder="#c7d2fe"
                                        value={newTagBgColor}
                                        onChange={(e) => setNewTagBgColor(e.target.value)}
                                        noMargin
                                    />
                                    <input
                                        type="color"
                                        value={newTagBgColor}
                                        onChange={(e) => setNewTagBgColor(e.target.value)}
                                        className="h-10 w-10 rounded border border-gray-200 p-0"
                                    />

                                </div>
                            </div>
                            <div>
                                <p className="text-xxs font-medium text-gray-700 mb-1">
                                    Text Color
                                </p>
                                <div className="flex items-center gap-3">
                                    <Input
                                        type="text"
                                        placeholder="#000000"
                                        value={newTagTextColor}
                                        onChange={(e) => setNewTagTextColor(e.target.value)}
                                        noMargin
                                    />
                                    <input
                                        type="color"
                                        value={newTagTextColor}
                                        onChange={(e) => setNewTagTextColor(e.target.value)}
                                        className="h-10 w-10 rounded border border-gray-200 p-0"
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                        <Button variant="cancel" onClick={closeAddModal}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddTag} variant="success">
                            Create Tag
                        </Button>
                    </div>
                </Modal>
            )}

            {isMergeOpen && mergeSource && (
                <Modal width="w-full md:w-6/12">
                    <div className="border-b border-gray-200 pb-3 mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Merge Tag
                        </h3>
                        <p className="text-xxs text-gray-500">
                            Combine "{mergeSource.name}" with another global tag.
                        </p>
                    </div>
                    <div className="space-y-4 text-xxs text-gray-700">
                        <div className="flex items-center gap-3">
                            <span
                                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center"
                                style={{
                                    backgroundColor: mergeSource.bgColor,
                                    color: mergeSource.textColor,
                                }}
                            >
                                {mergeSource.name[0]}
                            </span>
                            <div>
                                <p className="font-semibold text-gray-800">
                                    {mergeSource.name}
                                </p>
                                <p className="text-xxs text-gray-500">
                                    Usage: {mergeSource.usage}
                                </p>
                            </div>
                        </div>
                        <CustomSelect
                            name="mergeTarget"
                            label="Target tag"
                            value={mergeTarget}
                            placeholder="Choose a parent tag"
                            options={tagOptions.filter((opt) => opt.value !== mergeSource.id)}
                            onChange={setMergeTarget}
                            controlHeight="2rem"
                        />
                        <div className="w-full mb-3">
                            <label
                                htmlFor="desc"
                                className="block text-xxs text-gray-700 mb-2"
                            >
                                Note
                            </label>
                            <RichTextEditor value={mergeNotes} onChange={setMergeNotes} />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="cancel" onClick={closeMergeModal}>
                            Cancel
                        </Button>
                        <Button variant="success" onClick={handleMerge}>
                            Merge Tags
                        </Button>
                    </div>
                </Modal>
            )}

            <ReasonModal
                isOpen={isDeleteOpen}
                title="Delete Tag"
                desc={deleteReason}
                setDesc={setDeleteReason}
                infoSection={
                    <div className="border-gray-300 border-b py-1 mb-2">
                        <p className="text-xs text-gray-800 font-medium">
                            <span className="font-semibold">{deleteTag?.name || "Tag"}</span>
                        </p>
                        <p className="text-xxs text-gray-600">
                            <span>Color:</span> (BG: {deleteTag?.bgColor || "-"}, Text: {deleteTag?.textColor || "-"})
                        </p>
                        <p className="text-xxs text-gray-600">
                            <span>Usage:</span> {deleteTag?.usage ?? "-"}
                        </p>
                    </div>}
                onClose={closeDeleteModal}
                onSubmit={handleDelete}
                variant="danger"
                submitLabel="Delete"
                reasonTitle="Please provide a reason to delete this tag."
            />
        </Layout>
    );
}
