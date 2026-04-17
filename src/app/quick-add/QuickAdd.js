"use client";

import { useState } from "react";
import Layout from "y@/app/components/Layout";
import Button from "y@/app/components/Button";
import QuickAddModal from "y@/app/components/QuickAddModal";

export default function QuickAddPage() {
  const [open, setOpen] = useState(true);

  return (
    <Layout>
      <div className="bg-white w-full rounded-lg shadow-md border border-gray-200 min-h-[90vh] p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-base font-semibold text-gray-700">Quick Add</h2>
            <p className="text-xxs text-gray-500">
              Create core HR records quickly, then move to full form when needed.
            </p>
          </div>
          <Button type="button" variant="primary" onClick={() => setOpen(true)}>
            Open Quick Add
          </Button>
        </div>
      </div>

      <QuickAddModal isOpen={open} onClose={() => setOpen(false)} />
    </Layout>
  );
}
