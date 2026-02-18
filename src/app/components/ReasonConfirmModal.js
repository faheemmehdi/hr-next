import React from "react";
import Button from "./Button";
import Modal from "./ModalShell";
import RichTextEditor from "./RichTextEditor";
const ReasonModal = ({
  isOpen,
  title,
  desc,
  setDesc,
  infoSection,
  onClose,
  onSubmit,
  submitLabel = "Submit",
  showReason = true,
  variant = 'success',
  reasonHeading = 'Reason',
  reasonTitle = 'Please provide a reason for this action.'
}) => {
  if (!isOpen) return null;

  return (
    <Modal width="w-11/12 md:w-5/12">
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
              {reasonHeading} <span className="text-red-500">*</span>
            </label>
            <RichTextEditor value={desc} onChange={setDesc} />
          </div>
        </>
      )}
      <div className="flex justify-end gap-2">
        <Button variant="cancel" onClick={onClose}>
          Cancel
        </Button>
        <Button variant={`${variant}`} onClick={onSubmit}>
          {submitLabel}
        </Button>
      </div>
    </Modal>
  );
};

export default ReasonModal;
