"use client";
import Layout from "y@/app/components/Layout";
import Input from "y@/app/components/Input";
import { useState } from "react";
import SearchBar from "y@/app/components/SearchBar";
import { mapSelectOptions } from "y@/app/utils/mapSelectOptions";
import CustomSelect from "y@/app/components/CustomSelect";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineRemoveRedEye, MdOutlineBlock } from "react-icons/md";
import Button from "y@/app/components/Button";
import StatusDesign from "y@/app/components/StatusColors";
import ToggleSwitch from "y@/app/components/ToggleSwitch";
import ReasonModal from "y@/app/components/ReasonConfirmModal";
import RowActions from "y@/app/components/RowActions";
import Modal from "y@/app/components/ModalShell";
import RichTextEditor from "y@/app/components/RichTextEditor";

export default function AllExpenses() {
    const [employee, setEmployee] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("");
    const [search, setSearch] = useState("");
    const [receipt, setReceipt] = useState(null);
    const [desc, setDesc] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isReasonOpen, setIsReasonOpen] = useState(false);
    const [isAddExpenseOpen, setAddExpenseOpen] = useState(false);
    const [active, setActive] = useState(true);
    const [showErrors, setShowErrors] = useState(false);

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const openReasonModal = () => setIsReasonOpen(true);
    const closeReasonModal = () => setIsReasonOpen(false);
    const openAddExpenseModal = () => setAddExpenseOpen(true);
    const closeAddExpenseModal = () => setAddExpenseOpen(false);

   const expensesData = [
    {
        employee: "Ahmad Khan",
        category: "Travel",
        amount: 1500,
        date: "2026-02-25",
        receipt: "receipt1.pdf",
        statusId: 3,
        status: "Pending",
        description: "Taxi fare for client meeting.",
    },
    {
        employee: "Sara Ali",
        category: "Meals",
        amount: 800,
        date: "2026-02-20",
        receipt: "receipt2.jpg",
        statusId: 1,
        status: "Approved",
        description: "Team lunch for project completion.",
    },
    {
        employee: "Bilal Ahmed",
        category: "Office Supplies",
        amount: 1200,
        date: "2026-02-18",
        receipt: "receipt3.pdf",
        statusId: 2,
        status: "Rejected",
        description: "Purchased stationery for department.",
    },
    {
        employee: "Ayesha Khan",
        category: "Training",
        amount: 5000,
        date: "2026-02-15",
        receipt: "receipt4.pdf",
        statusId: 3,
        status: "Pending",
        description: "Online course fee reimbursement.",
    },
    {
        employee: "Hassan Raza",
        category: "Travel",
        amount: 2200,
        date: "2026-02-10",
        receipt: "receipt5.pdf",
        statusId: 1,
        status: "Approved",
        description: "Flight tickets for client presentation.",
    },
    {
        employee: "Fatima Noor",
        category: "Meals",
        amount: 950,
        date: "2026-02-08",
        receipt: "receipt6.jpg",
        statusId: 2,
        status: "Rejected",
        description: "Client lunch during meeting.",
    },
    {
        employee: "Omar Farooq",
        category: "Miscellaneous",
        amount: 400,
        date: "2026-02-05",
        receipt: "receipt7.pdf",
        statusId: 3,
        status: "Pending",
        description: "Parking charges for office visit.",
    },
    {
        employee: "Sara Ali",
        category: "Training",
        amount: 3000,
        date: "2026-01-28",
        receipt: "receipt8.pdf",
        statusId: 1,
        status: "Approved",
        description: "Certification course enrollment.",
    },
    {
        employee: "Ahmad Khan",
        category: "Office Supplies",
        amount: 700,
        date: "2026-01-25",
        receipt: "receipt9.pdf",
        statusId: 3,
        status: "Pending",
        description: "Printer cartridges and papers.",
    },
    {
        employee: "Bilal Ahmed",
        category: "Meals",
        amount: 650,
        date: "2026-01-20",
        receipt: "receipt10.jpg",
        statusId: 1,
        status: "Approved",
        description: "Team breakfast for project kickoff.",
    },
];

    const employees = mapSelectOptions(
        [
            { id: 1, name: "Ahmad Khan" },
            { id: 2, name: "Sara Ali" },
            { id: 3, name: "Bilal Ahmed" },
            { id: 4, name: "Ayesha Khan" },
        ],
        "id",
        "name"
    );

    const categories = mapSelectOptions(
        [
            { id: 1, name: "Travel" },
            { id: 2, name: "Meals" },
            { id: 3, name: "Office Supplies" },
            { id: 4, name: "Training" },
            { id: 5, name: "Miscellaneous" },
        ],
        "id",
        "name"
    );

    const statuses = mapSelectOptions(
        [
            { id: 1, name: "Pending" },
            { id: 2, name: "Approved" },
            { id: 3, name: "Rejected" },
        ],
        "id",
        "name"
    );

    return (
        <Layout>
            <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold text-gray-700">Expenses</h2>
                    <Button type="button" onClick={openAddExpenseModal} variant="success">
                        Add Expense
                    </Button>
                </div>

                {/* Filters */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center my-2 mt-5">
                    <div className="w-full md:w-1/5 flex items-center mb-1">
                        <SearchBar
                            placeholder="Search by employee or category..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="w-full flex items-center justify-end flex-col md:flex-row mt-2 md:mt-0 gap-2">
                        <div className="mb-1 w-full md:w-[9rem]">
                            <CustomSelect
                                name="employee"
                                value={employee}
                                placeholder="Employee"
                                onChange={setEmployee}
                                options={employees}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="mb-1 w-full md:w-[9rem]">
                            <CustomSelect
                                name="category"
                                value={category}
                                placeholder="Category"
                                onChange={setCategory}
                                options={categories}
                                controlHeight="2rem"
                            />
                        </div>
                        <div className="mb-1 w-full md:w-[9rem]">
                            <CustomSelect
                                name="status"
                                value={status}
                                placeholder="Status"
                                onChange={setStatus}
                                options={statuses}
                                controlHeight="2rem"
                            />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto shadow-md border border-gray-200 rounded max-h-[72vh]">
                    <table className="w-full text-xs border-collapse">
                        <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="px-4 py-3 text-left">Employee</th>
                                <th className="px-4 py-3 text-left">Category</th>
                                <th className="px-4 py-3 text-left">Description</th>
                                <th className="px-4 py-3 text-left">Amount</th>
                                <th className="px-4 py-3 text-left">Date</th>
                                <th className="px-4 py-3 text-left">Receipt</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xxs">
                            {expensesData.length > 0 ? (
                                expensesData.map((row, idx) => (
                                    <tr
                                        key={idx}
                                        className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors`}
                                    >
                                        <td className="px-4 py-3 truncate max-w-[120px]" title={row.employee}>{row.employee}</td>
                                        <td className="px-4 py-3">{row.category}</td>
                                        <td className="px-4 py-3 truncate max-w-[150px]" title={row.description}>{row.description}</td>
                                        <td className="px-4 py-3">{row.amount.toLocaleString()}</td>
                                        <td className="px-4 py-3">{row.date}</td>
                                        <td className="px-4 py-3">{row.receipt}</td>
                                        <td className="px-4 py-3">
                                            <StatusDesign statusId={row.statusId} label={row.status} />
                                        </td>

                                        <RowActions
                                            row={row}
                                            actions={[
                                                { label: "View Expense", icon: MdOutlineRemoveRedEye, onClick: handleOpenModal },
                                                { label: "Edit Expense", icon: FiEdit3 },
                                                { label: "Reject Expense", icon: MdOutlineBlock, color: "red", onClick: openReasonModal },
                                            ]}
                                        />
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="text-center py-4 text-gray-500 italic">
                                        No expenses found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* View Expense Modal */}
                {isOpen && (
                    <Modal width="w-full md:w-5/12">
                        <div className="border-b border-gray-400 pb-3 mb-4">
                            <div className="flex justify-between">
                                <h2 className="text-lg font-semibold text-gray-800">Expense Details</h2>
                                <span className="inline-flex items-center px-2 py-1 text-xxs font-medium rounded-full bg-yellow-100 text-yellow-700">
                                    Pending
                                </span>
                            </div>
                            <p className="text-xxs text-gray-500">Submitted on 25 Feb, 2026</p>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button variant="cancel" onClick={handleCloseModal}>
                                Close
                            </Button>
                        </div>
                    </Modal>
                )}

                {/* Add Expense Modal */}
                {isAddExpenseOpen && (
                    <Modal width="w-full md:w-6/12">
                        <h3 className="text-lg text-center font-semibold mb-4">Add Expense</h3>
                        <div className="w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                <CustomSelect
                                    name="employee"
                                    label="Employee"
                                    value={employee}
                                    placeholder="Select Employee"
                                    onChange={setEmployee}
                                    options={employees}
                                    controlHeight="2rem"
                                    error={showErrors && !employee ? "Employee is required" : ""}
                                />
                                <CustomSelect
                                    name="category"
                                    label="Category"
                                    value={category}
                                    placeholder="Select Category"
                                    onChange={setCategory}
                                    options={categories}
                                    controlHeight="2rem"
                                    error={showErrors && !category ? "Category is required" : ""}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                                <Input
                                    type="number"
                                    name="amount"
                                    placeholder="Enter amount"
                                    label="Amount"
                                    noMargin={true}
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    error={showErrors && !amount ? "Amount is required" : ""}
                                />
                                <Input
                                    type="date"
                                    name="date"
                                    placeholder="Select date"
                                    label="Date"
                                    noMargin={true}
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    error={showErrors && !date ? "Date is required" : ""}
                                />
                                <div className="w-full flex items-center">
                                    <div className="w-full md:w-37 md:mt-4">
                                        <ToggleSwitch
                                            label="Active Status"
                                            checked={active}
                                            onChange={setActive}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full mb-3">
                                <label htmlFor="desc" className="block text-xxs text-gray-700 mb-2">
                                    Description
                                </label>
                                <RichTextEditor value={desc} onChange={setDesc} />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="cancel" onClick={closeAddExpenseModal}>Cancel</Button>
                            <Button variant="success">Add Expense</Button>
                        </div>
                    </Modal>
                )}

                {/* Reason Modal for Rejection */}
                <ReasonModal
                    isOpen={isReasonOpen}
                    title="Reject Expense"
                    infoSection={
                        <div className="border-gray-300 border-b py-1 mb-2">
                            <p className="text-xs text-gray-800 font-medium">
                                <span className="font-semibold">Travel Expense</span>
                            </p>
                            <p className="text-xxs text-gray-600"><span>Employee:</span> Ahmad Khan</p>
                            <p className="text-xxs text-gray-600"><span>Amount:</span> 1500</p>
                            <p className="text-xxs text-gray-600"><span>Category:</span> Travel</p>
                        </div>
                    }
                    onClose={closeReasonModal}
                    variant="danger"
                    submitLabel="Reject"
                    reasonTitle="Please provide a reason to reject this expense."
                />

            </div>
        </Layout>
    );
}