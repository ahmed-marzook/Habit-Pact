import Modal from "react-modal";
import "./HabitNoteModal.css";
import CompletionEntry from "../../../../types/completionEntry";

interface HabitNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  habitEntry: CompletionEntry | null;
  habitName: string;
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
    maxHeight: "90vh",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(3px)",
  },
};

export default function HabitNoteModal({
  isOpen,
  onClose,
}: HabitNoteModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Habit Note"
      ariaHideApp={false}
    >
      <div className="habit-note-modal">
        {/* Modal Header */}
        <div className="habit-note-modal__header">
          <h2 className="habit-note-modal__title">HABIT NAME</h2>
          <p className="habit-note-modal__subtitle">2023-12-23</p>
        </div>

        {/* Modal Body */}
        <form>
          <div className="habit-note-modal__body">
            <div className="habit-note-modal__section">
              <div className="habit-note-modal__input-group">
                <label className="habit-note-modal__label">Note</label>
                <textarea
                  className="habit-note-modal__textarea"
                  placeholder="Add your notes for this day..."
                  rows={6}
                ></textarea>
                {/* {errorMessage && (
                  <p className="habit-note-modal__error">{errorMessage}</p>
                )} */}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="habit-note-modal__footer">
            <button
              type="button"
              className="habit-note-modal__button habit-note-modal__button--cancel"
              onClick={onClose}
              //   disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="habit-note-modal__button habit-note-modal__button--primary"
              //   disabled={isSaving}
            >
              {/* {isSaving ? "Saving..." : "Save Note"} */}
              Save Note
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
