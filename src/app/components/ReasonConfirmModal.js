import React from "react";
import Button from "./Button";

const ReasonModal = ({
  isOpen,
  title,
  infoSection,
  onClose,
  onSubmit,
  submitLabel = "Submit",
  showReason = true,
  reasonTitle = 'Please provide a reason for this action.'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-4/12">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
        <div className="w-full text-xxs">
          {infoSection}
        </div>

        {showReason && (
          <>
            <p className="text-xxs text-gray-600 mb-3">
             {reasonTitle}
            </p>

            <div className="mb-6">
              <label
                htmlFor="reasonText"
                className="block text-xxs text-gray-700 mb-2"
              >
                Reason <span className="text-red-500">*</span>
              </label>
              <textarea
                id="reasonText"
                rows="4"
                placeholder="Write reason here..."
                className="w-full rounded border border-gray-300 p-3 text-gray-800 text-xxs resize-none 
                  focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-300 transition-all duration-150"
              />
            </div>
          </>
        )}
        <div className="flex justify-end gap-2">
          <Button variant="cancel" onClick={onClose}>
            Close
          </Button>
          <Button variant="danger" onClick={onSubmit}>
            {submitLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReasonModal;
