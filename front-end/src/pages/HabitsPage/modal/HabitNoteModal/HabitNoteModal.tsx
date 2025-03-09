import Modal from "react-modal";
import "./HabitNoteModal.css";
import CompletionEntry from "../../../../types/completionEntry";
import { useRecordHabitCompletion } from "../../../../hooks/useHabitQuery";
import CompletionStatus from "../../../../types/enums/completionStatus.enum";
import { useState } from "react";
import { useNoteModal } from "../../../../contexts/NoteModalContext/NoteModalContext";

interface HabitNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  habitEntry: CompletionEntry | undefined;
  habitDate: Date;
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
  habitEntry,
  habitDate,
}: HabitNoteModalProps) {
  const [notes, setNotes] = useState<string>(habitEntry?.notes || "");
  const { selectedHabit } = useNoteModal();
  const { mutate, isPending, isError, error } =
    useRecordHabitCompletion(onClose);

  const addNote = (formData: FormData) => {
    if (!selectedHabit) return;

    const data = {
      date: habitDate,
      habitStatus: habitEntry?.status || CompletionStatus.PENDING,
      notes: (formData.get("notes") as string) || "",
    };
    try {
      mutate({ habitId: selectedHabit.id, data });
    } catch (error) {
      console.error(error);
    }
  };

  if (!selectedHabit) return null;

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
          <h2 className="habit-note-modal__title">{selectedHabit.name}</h2>
          <p className="habit-note-modal__subtitle">
            {habitDate.toISOString().split("T")[0]}
          </p>
        </div>

        {/* Modal Body */}
        <form action={addNote}>
          <div className="habit-note-modal__body">
            <div className="habit-note-modal__section">
              <div className="habit-note-modal__input-group">
                <label className="habit-note-modal__label">Note</label>
                <textarea
                  onChange={(e) => setNotes(e.target.value)}
                  className="habit-note-modal__textarea"
                  placeholder="Add your notes for this day..."
                  rows={6}
                  value={notes}
                  name="notes"
                ></textarea>
                {isError && (
                  <p className="habit-note-modal__error">{error.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="habit-note-modal__footer">
            <button
              type="button"
              className="habit-note-modal__button habit-note-modal__button--cancel"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="habit-note-modal__button habit-note-modal__button--primary"
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save Note"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
