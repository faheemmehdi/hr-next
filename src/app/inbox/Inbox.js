"use client";
import { useMemo, useState } from "react";

import SearchBar from "y@/app/components/SearchBar";
import CustomSelect from "y@/app/components/CustomSelect";
import Button from "y@/app/components/Button";
import RowActions from "y@/app/components/RowActions";
import StatusDesign from "y@/app/components/StatusColors";
import Modal from "y@/app/components/ModalShell";
import ReasonModal from "y@/app/components/ReasonConfirmModal";
import { FiCheck, FiMinusCircle, FiMessageSquare, FiUserPlus } from "react-icons/fi";
import Layout from "../components/Layout";
import RichTextEditor from "../components/RichTextEditor";
import Input from "../components/Input";

const types = [
    { value: "", label: "All types" },
    { value: "Leave", label: "Leave" },
    { value: "Expense", label: "Expense" },
    { value: "Payroll", label: "Payroll" },
];

const statusOptions = [
    { value: "", label: "All statuses" },
    { value: "Pending", label: "Pending" },
    { value: "Approved", label: "Approved" },
    { value: "Rejected", label: "Rejected" },
];

const sampleApprovals = [
  {
    id: 1,
    type: "Leave",
    item: "Annual Leave",
    requestor: "Aisha Khan",
    date: "2026-03-04 08:52",
    status: "Pending",
    statusId: 3,
  },
  {
    id: 2,
    type: "Expense",
    item: "Travel Reimbursement",
    requestor: "Bilal Ahmed",
    date: "2026-03-03 16:20",
    status: "Pending",
    statusId: 3,
  },
  {
    id: 3,
    type: "Payroll",
    item: "Salary Review",
    requestor: "Sara Ali",
    date: "2026-03-01 11:15",
    status: "Approved",
    statusId: 1,
  },
  {
    id: 4,
    type: "Expense",
    item: "Office Supplies",
    requestor: "Faisal Khan",
    date: "2026-02-28 09:10",
    status: "Rejected",
    statusId: 2,
  },

  {
    id: 5,
    type: "Leave",
    item: "Sick Leave",
    requestor: "Hassan Raza",
    date: "2026-03-05 10:40",
    status: "Pending",
    statusId: 3,
  },
  {
    id: 6,
    type: "Expense",
    item: "Client Dinner",
    requestor: "Usman Tariq",
    date: "2026-03-02 19:15",
    status: "Approved",
    statusId: 1,
  },
  {
    id: 7,
    type: "Payroll",
    item: "Overtime Adjustment",
    requestor: "Fatima Noor",
    date: "2026-02-27 14:05",
    status: "Pending",
    statusId: 3,
  },
  {
    id: 8,
    type: "Leave",
    item: "Maternity Leave",
    requestor: "Sana Javed",
    date: "2026-02-25 09:30",
    status: "Approved",
    statusId: 1,
  }
];

const members = [
    { value: "nahid.akram@company.com", label: "Nahid Akram" },
    { value: "bilal.nasir@company.com", label: "Bilal Nasir" },
    { value: "tania.farooq@company.com", label: "Tania Farooq" },
];

export default function Inbox() {
    const [approvals, setApprovals] = useState(sampleApprovals);
    const [search, setSearch] = useState("");
    const [date, onDateChange] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [selectedIds, setSelectedIds] = useState([]);
    const [requestModal, setRequestModal] = useState(false);
    const [reassignModal, setReassignModal] = useState(false);
    const [rejectModal, setRejectModal] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [comment, setComment] = useState("");
    const [reassignTo, setReassignTo] = useState("");
    const [rejectReason, setRejectReason] = useState("");
    const [rejectTargetIds, setRejectTargetIds] = useState([]);
    const [rejectInfo, setRejectInfo] = useState("");

    const filteredApprovals = useMemo(() => {
        const term = search.trim().toLowerCase();
        return approvals.filter((approval) => {
            const matchesSearch =
                !term ||
                approval.item.toLowerCase().includes(term) ||
                approval.requestor.toLowerCase().includes(term);
            const matchesType = typeFilter ? approval.type === typeFilter : true;
            const matchesStatus = statusFilter ? approval.status === statusFilter : true;
            return matchesSearch && matchesType && matchesStatus;
        });
    }, [approvals, search, typeFilter, statusFilter]);

    const toggleSelect = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === filteredApprovals.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredApprovals.map((item) => item.id));
        }
    };

    const updateStatus = (ids, status, statusId) => {
        setApprovals((prev) =>
            prev.map((item) => (ids.includes(item.id) ? { ...item, status, statusId } : item))
        );
        setSelectedIds([]);
    };

    const openRequestModal = (item) => {
        setCurrentItem(item);
        setComment("");
        setRequestModal(true);
    };

    const openReassignModal = (item) => {
        setCurrentItem(item);
        setReassignTo("");
        setReassignModal(true);
    };

    const openRejectReason = (ids, info) => {
        if (!ids.length) return;
        setRejectTargetIds(ids);
        setRejectInfo(info);
        setRejectReason("");
        setRejectModal(true);
    };

    const handleRejectConfirmed = () => {
        updateStatus(rejectTargetIds, "Rejected", 3);
        setRejectModal(false);
    };

    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-base font-semibold text-gray-700">
                            Approvals Center
                        </h2>
                        <p className="text-xxs text-gray-500">
                            Unified approvals across modules with batch actions, comments, and quick filters.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button variant="danger" type="button" onClick={() => openRejectReason(selectedIds, `${selectedIds.length} selected approvals`)} disabled={!selectedIds.length}>
                            Reject
                        </Button>
                        <Button variant="success" type="button" onClick={() => updateStatus(selectedIds, "Approved", 2)} disabled={!selectedIds.length}>
                            Approve
                        </Button>
                    </div>
                </div>


                <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5">
                    <div className="w-full md:w-1/5 flex items-center mb-1">
                        <SearchBar
                            placeholder="Search by item or requestor..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="w-full flex items-center justify-end flex-col md:flex-row mt-2 md:mt-0 gap-2">
                        <div className="mb-1 w-full md:w-[9rem]">
                            <CustomSelect
                                name="filterType"
                                value={typeFilter}
                                options={types}
                                onChange={setTypeFilter}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="mb-1 w-full md:w-[9rem]">
                            <CustomSelect
                                ame="filterStatus"
                                value={statusFilter}
                                options={statusOptions}
                                onChange={setStatusFilter}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="w-full md:w-[9rem]">
                             <Input
                                type="date"
                                name="date"
                                noMargin={true}
                                value={date}
                                onChange={(e) => onDateChange(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto shadow-md border border-gray-200 rounded max-h-[72vh]">
                    <table className="w-full text-xs border-collapse">
                        <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                            <tr>
                                <th className="px-3 py-2 text-left">
                                    <input
                                        type="checkbox"
                                        checked={
                                            selectedIds.length > 0 &&
                                            selectedIds.length === filteredApprovals.length
                                        }
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th className="px-4 py-3 text-left">Type</th>
                                <th className="px-4 py-3 text-left">Item</th>
                                <th className="px-4 py-3 text-left">Requestor</th>
                                <th className="px-4 py-3 text-left">Date</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredApprovals.map((approval, idx) => (
                                <tr
                                    key={approval.id}
                                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
                                >
                                    <td className="px-3 py-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(approval.id)}
                                            onChange={() => toggleSelect(approval.id)}
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-gray-800 font-semibold">
                                        {approval.type}
                                    </td>
                                    <td className="px-4 py-3">{approval.item}</td>
                                    <td className="px-4 py-3">{approval.requestor}</td>
                                    <td className="px-4 py-3">{approval.date}</td>
                                    <td className="px-4 py-3">
                                        <StatusDesign statusId={approval.statusId} label={approval.status} />
                                    </td>

                                    <RowActions
                                        row={approval}
                                        actions={[
                                            {
                                                label: "Approve",
                                                icon: FiCheck,
                                                onClick: (row) => updateStatus([row.id], "Approved", 2),
                                            },
                                            {
                                                label: "Reject",
                                                icon: FiMinusCircle,
                                                color: "red",
                                                onClick: (row) => openRejectReason([row.id], row.item),
                                            },
                                            {
                                                label: "Request Info",
                                                icon: FiMessageSquare,
                                                onClick: openRequestModal,
                                            },
                                            {
                                                label: "Reassign",
                                                icon: FiUserPlus,
                                                onClick: openReassignModal,
                                            },
                                        ]}
                                    />

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {requestModal && (
                    <Modal width="w-full md:w-5/12">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Request Info</h3>
                        <p className="text-xxs text-gray-500 mb-2">
                            Ask {currentItem?.requestor} for more details on {currentItem?.item}.
                        </p>
                        <div className="w-full mb-3">
                            <label
                                htmlFor="desc"
                                className="block text-xxs text-gray-700 mb-2"
                            >
                                Description
                            </label>
                            <RichTextEditor value={comment} onChange={setComment} />
                        </div>
                        <div className="flex justify-end gap-2 mt-3">
                            <Button variant="cancel" onClick={() => setRequestModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="success" onClick={() => setRequestModal(false)}>
                                Send request
                            </Button>
                        </div>
                    </Modal>
                )}

                {reassignModal && (
                    <Modal width="w-full md:w-5/12">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Reassign Request</h3>
                        <p className="text-xxs text-gray-500 mb-2">
                            Reassign {currentItem?.item} approval to another reviewer.
                        </p>
                        <CustomSelect
                            name="reassignTo"
                            label="Assign to"
                            value={reassignTo}
                            options={members}
                            onChange={setReassignTo}
                            controlHeight="2rem"
                            isSearchable
                        />
                        <div className="flex justify-end gap-2 mt-3">
                            <Button variant="cancel" onClick={() => setReassignModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="success" onClick={() => setReassignModal(false)}>
                                Reassign
                            </Button>
                        </div>
                    </Modal>
                )}
                <ReasonModal
                    isOpen={rejectModal}
                    title="Reject Approval"
                    desc={rejectReason}
                    setDesc={setRejectReason}
                    infoSection={
                        <div className="text-xxs text-gray-600">
                            {rejectInfo}
                        </div>
                    }
                    onClose={() => setRejectModal(false)}
                    onSubmit={handleRejectConfirmed}
                    submitLabel="Reject"
                    variant="danger"
                    reasonTitle="Provide a reason for rejection."
                />
            </div>
        </Layout>
    );
}
