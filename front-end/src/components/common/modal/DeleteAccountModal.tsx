import { ChangeEvent, useEffect, useState } from "react";
import "./DeleteAccountModal.css";
import Modal from "react-modal";
import warningIcon from "../../../assets/warning-icon.svg";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    border: "none",
    borderRadius: "12px",
    backgroundColor: "transparent",
    overflow: "visible",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(3px)",
  },
};

export default function DeleteAccountModal({
  isOpen,
  onClose,
  onDelete,
}: DeleteAccountModalProps) {
  const [confirmText, setConfirmText] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setConfirmText("");
      setIsConfirmed(false);
    }
  }, [isOpen]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmText(value);
    setIsConfirmed(value.toUpperCase() === "DELETE");
  };

  const handleDelete = () => {
    if (isConfirmed) {
      onDelete();
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Delete Account Confirmation"
      ariaHideApp={false}
    >
      <div className="delete-modal">
        {/* Modal Header */}
        <div className="delete-modal__header">
          <div className="delete-modal__icon">
            <img
              src={warningIcon}
              alt="Warning"
              className="delete-modal__warning-svg"
            />
          </div>
          <h2 className="delete-modal__title">Delete Account</h2>
        </div>

        {/* Modal Body */}
        <div className="delete-modal__body">
          <p className="delete-modal__text">
            Are you sure you want to delete your account? This action{" "}
            <span className="delete-modal__text--highlight">
              cannot be undone
            </span>
            . All your data, habits, progress and history will be permanently
            removed.
          </p>

          <p className="delete-modal__text">
            If you're sure you want to proceed, please type "
            <span className="delete-modal__text--highlight">DELETE</span>" in
            the field below to confirm.
          </p>

          <div className="delete-modal__confirm">
            <label htmlFor="confirm-delete" className="delete-modal__label">
              Type{" "}
              <span className="delete-modal__text--highlight">"DELETE"</span> to
              confirm
            </label>
            <input
              type="text"
              id="confirm-delete"
              className="delete-modal__input"
              value={confirmText}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="delete-modal__footer">
          <button
            className="delete-modal__button delete-modal__button--cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="delete-modal__button delete-modal__button--danger"
            disabled={!isConfirmed}
            onClick={handleDelete}
          >
            Delete Account
          </button>
        </div>
      </div>
    </Modal>
  );
}
