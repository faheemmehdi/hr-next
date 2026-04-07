"use client";
import { useMemo, useState } from "react";
import Layout from "y@/app/components/Layout";
import SearchBar from "y@/app/components/SearchBar";
import CustomSelect from "y@/app/components/CustomSelect";
import Button from "y@/app/components/Button";
import RowActions from "y@/app/components/RowActions";
import StatusDesign from "y@/app/components/StatusColors";
import ReasonModal from "y@/app/components/ReasonConfirmModal";
import { FiCheck, FiMinusCircle, FiMessageSquare } from "react-icons/fi";
import Input from "y@/app/components/Input";

const periods = [
    { value: "", label: "All periods" },
    { value: "2026-02-21", label: "Feb 21‑27, 2026" },
    { value: "2026-03-01", label: "Mar 1‑7, 2026" },
];

const initialApprovals = [
  {
    id: 1,
    employee: "Aisha Khan",
    period: "Feb 14-20, 2026",
    hours: "40",
    billable: "Yes",
    submitted: "2026-02-21",
    status: "Pending",
    statusId: 3,
  },
  {
    id: 2,
    employee: "Bilal Ahmed",
    period: "Feb 14-20, 2026",
    hours: "38",
    billable: "No",
    submitted: "2026-02-21",
    status: "Pending",
    statusId: 3,
  },
  {
    id: 3,
    employee: "Sara Ali",
    period: "Feb 7-13, 2026",
    hours: "42",
    billable: "Yes",
    submitted: "2026-02-14",
    status: "Approved",
    statusId: 1,
  },

  {
    id: 4,
    employee: "Hassan Raza",
    period: "Feb 7-13, 2026",
    hours: "36",
    billable: "Yes",
    submitted: "2026-02-14",
    status: "Pending",
    statusId: 3,
  },
  {
    id: 5,
    employee: "Fatima Noor",
    period: "Jan 31-Feb 6, 2026",
    hours: "41",
    billable: "Yes",
    submitted: "2026-02-07",
    status: "Approved",
    statusId: 1,
  },
  {
    id: 6,
    employee: "Usman Tariq",
    period: "Jan 31-Feb 6, 2026",
    hours: "39",
    billable: "No",
    submitted: "2026-02-07",
    status: "Rejected",
    statusId: 2,
  },
  {
    id: 7,
    employee: "Sana Javed",
    period: "Jan 24-30, 2026",
    hours: "40",
    billable: "Yes",
    submitted: "2026-01-31",
    status: "Approved",
    statusId: 1,
  },
  
];

export default function Approvals() {
    const [approvals, setApprovals] = useState(initialApprovals);
    const [search, setSearch] = useState("");
    const [date, onDateChange] = useState("");
    const [periodFilter, setPeriodFilter] = useState("");
    const [selectedIds, setSelectedIds] = useState([]);
    const [reasonModalOpen, setReasonModalOpen] = useState(false);
    const [reasonContext, setReasonContext] = useState(null);
    const [comment, setComment] = useState("");

    const filteredApprovals = useMemo(() => {
        const term = search.trim().toLowerCase();
        return approvals.filter((approval) => {
            const matchesSearch =
                !term ||
                approval.employee.toLowerCase().includes(term) ||
                approval.period.toLowerCase().includes(term);
            const matchesPeriod = periodFilter ? approval.period === periodFilter : true;
            return matchesSearch && matchesPeriod;
        });
    }, [approvals, search, periodFilter]);

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

    const openReasonModal = (ids, label, status, statusId) => {
        if (!ids.length) return;
        setReasonContext({ ids, label, status, statusId });
        setComment("");
        setReasonModalOpen(true);
    };

    const handleReasonSubmit = () => {
        if (!reasonContext) return;
        setApprovals((prev) =>
            prev.map((item) =>
                reasonContext.ids.includes(item.id)
                    ? { ...item, status: reasonContext.status, statusId: reasonContext.statusId }
                    : item
            )
        );
        setSelectedIds([]);
        setReasonModalOpen(false);
    };

    const performApprove = (ids) => {
        setApprovals((prev) =>
            prev.map((item) =>
                ids.includes(item.id) ? { ...item, status: "Approved", statusId: 2 } : item
            )
        );
        setSelectedIds([]);
    };

    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-base font-semibold text-gray-700">
                            Timesheet Approvals
                        </h2>
                        <p className="text-xxs text-gray-500">
                            Manager queue with batch actions. Comment required on reject.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant="success"
                            type="button"
                            onClick={() => performApprove(selectedIds)}
                            disabled={!selectedIds.length}
                        >
                            Approve
                        </Button>
                        <Button
                            variant="danger"
                            type="button"
                            onClick={() =>
                                openReasonModal(selectedIds, "Batch reject", "Rejected", 3)
                            }
                            disabled={!selectedIds.length}
                        >
                            Reject
                        </Button>
                        <Button variant="primary" type="button">
                            Export
                        </Button>
                    </div>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5">
                    <div className="w-full md:w-1/5 flex items-center mb-1">
                        <SearchBar
                            placeholder="Search by employee or period..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="w-full flex items-center justify-end flex-col md:flex-row mt-2 md:mt-0 gap-2">
                        <div className="mb-1 w-full md:w-[9rem]">
                            <CustomSelect
                                name="period"
                                value={periodFilter}
                                options={periods}
                                onChange={setPeriodFilter}
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
                                <th className="px-4 py-3 text-left">Employee</th>
                                <th className="px-4 py-3 text-left">Period</th>
                                <th className="px-4 py-3 text-left">Hours</th>
                                <th className="px-4 py-3 text-left">Billable</th>
                                <th className="px-4 py-3 text-left">Submitted</th>
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
                                    <td className="px-4 py-3 font-semibold text-gray-800">{approval.employee}</td>
                                    <td className="px-4 py-3">{approval.period}</td>
                                    <td className="px-4 py-3">{approval.hours}</td>
                                    <td className="px-4 py-3">{approval.billable}</td>
                                    <td className="px-4 py-3">{approval.submitted}</td>
                                    <td className="px-4 py-3">
                                        <StatusDesign statusId={approval.statusId} label={approval.status} />
                                    </td>
                                        <RowActions
                                            row={approval}
                                            actions={[
                                                {
                                                    label: "Approve",
                                                    icon: FiCheck,
                                                    onClick: (row) => performApprove([row.id]),
                                                },
                                                {
                                                    label: "Reject",
                                                    icon: FiMinusCircle,
                                                    color: "red",
                                                    onClick: (row) =>
                                                        openReasonModal([row.id], row.item, "Rejected", 3),
                                                },
                                                {
                                                    label: "Request Change",
                                                    icon: FiMessageSquare,
                                                    onClick: (row) =>
                                                        openReasonModal(
                                                            [row.id],
                                                            row.item,
                                                            "Change requested",
                                                            4
                                                        ),
                                                },
                                            ]}
                                        />
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {reasonModalOpen && (
                    <ReasonModal
                        isOpen={reasonModalOpen}
                        title={reasonContext?.status === "Rejected" ? "Reject Timesheet" : "Request Change"}
                        desc={comment}
                        setDesc={setComment}
                        infoSection={
                            <div className="text-xxs text-gray-600">
                                {reasonContext?.label ?? "Action requires a comment."}
                            </div>
                        }
                        onClose={() => setReasonModalOpen(false)}
                        onSubmit={handleReasonSubmit}
                        variant={reasonContext?.status === "Rejected" ? "danger" : "success"}
                        submitLabel={reasonContext?.status === "Rejected" ? "Reject" : "Request change"}
                        reasonTitle="Please explain why you are rejecting or requesting a change."
                    />
                )}
            </div>
        </Layout>
    );
}
