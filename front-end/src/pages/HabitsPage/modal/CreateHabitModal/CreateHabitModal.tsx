import { useState } from "react";
import "./CreateHabitModal.css";
import Modal from "react-modal";
import { useCreateHabit } from "../../../../hooks/useHabitQuery";
import CreateHabitRequest from "../../../../types/createHabitRequest";
import Period from "../../../../types/enums/period.enum";

interface CreateHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
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

// const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CreateHabitModal({
  isOpen,
  onClose,
}: CreateHabitModalProps) {
  const [frequencyPeriod, setFrequencyPeriod] = useState("DAILY");

  const handleFrequencyPeriodChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFrequencyPeriod(event.target.value);
  };

  const { mutate } = useCreateHabit(onClose);

  async function createHabit(formData: FormData) {
    const createHabitRequest: CreateHabitRequest = {
      name: formData.get("habitName") as string,
      description: formData.get("habitDescription") as string,
      frequency: {
        times: parseInt(formData.get("frequencyAmount") as string) || 1,
        period: formData.get("frequencyPeriod") as Period,
      },
    };

    try {
      await mutate(createHabitRequest);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Create New Habit"
      ariaHideApp={false}
    >
      <div className="habit-modal">
        {/* Modal Header */}
        <div className="habit-modal__header">
          <h2 className="habit-modal__title">Create New Habit</h2>
          <p className="habit-modal__subtitle">
            Define your new habit to track
          </p>
        </div>

        {/* Modal Body */}
        <form action={createHabit}>
          <div className="habit-modal__body">
            {/* Basic Information */}
            <div className="habit-modal__section">
              <div className="habit-modal__input-group">
                <label className="habit-modal__label">Habit Name*</label>
                <input
                  type="text"
                  className="habit-modal__input"
                  placeholder="e.g., Morning Meditation"
                  name="habitName"
                />
              </div>

              <div className="habit-modal__input-group">
                <label className="habit-modal__label">Description</label>
                <textarea
                  className="habit-modal__textarea"
                  placeholder="Describe your habit..."
                  name="habitDescription"
                ></textarea>
              </div>
            </div>

            {/* Frequency */}
            <div className="habit-modal__section">
              <h3 className="habit-modal__section-title">Frequency</h3>

              <div className="habit-modal__frequency-container">
                {frequencyPeriod !== "DAILY" && (
                  <div className="habit-modal__input-group habit-modal__input-group--inline">
                    <input
                      type="number"
                      className="habit-modal__input habit-modal__input--small"
                      min="1"
                      defaultValue="1"
                      name="frequencyAmount"
                      title="Frequency Amount"
                    />
                    <span className="habit-modal__frequency-text">time(s)</span>
                  </div>
                )}

                <div className="habit-modal__input-group habit-modal__input-group--inline">
                  <label
                    htmlFor="frequencyPeriod"
                    className="habit-modal__label sr-only"
                  >
                    Frequency Period
                  </label>
                  <select
                    id="frequencyPeriod"
                    className="habit-modal__select"
                    defaultValue="DAILY"
                    name="frequencyPeriod"
                    onChange={handleFrequencyPeriodChange}
                  >
                    <option value="DAILY">Daily</option>
                    <option value="WEEKLY">per week</option>
                    <option value="MONTHLY">per month</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tags
          <div className="habit-modal__section">
            <h3 className="habit-modal__section-title">Tags</h3>

            <div className="habit-modal__input-group">
              <div className="habit-modal__tag-input-container">
                <input
                  type="text"
                  className="habit-modal__input"
                  placeholder="Add tags (press Enter)"
                />
                <button className="habit-modal__tag-add-button">Add</button>
              </div>
            </div>

            <div className="habit-modal__tags-container">
              <span className="habit-modal__tag">
                wellness
                <button className="habit-modal__tag-remove">×</button>
              </span>
              <span className="habit-modal__tag">
                mindfulness
                <button className="habit-modal__tag-remove">×</button>
              </span>
              <span className="habit-modal__tag">
                morning-routine
                <button className="habit-modal__tag-remove">×</button>
              </span>
            </div>
          </div> */}

            {/* Reminders
          <div className="habit-modal__section">
            <div className="habit-modal__reminder-header">
              <h3 className="habit-modal__section-title">Reminders</h3>
              <label className="habit-modal__toggle-switch">
                <input
                  type="checkbox"
                  className="habit-modal__toggle-input"
                  defaultChecked
                />
                <span className="habit-modal__toggle-slider"></span>
              </label>
            </div>

            <div className="habit-modal__reminder-options">
              <div className="habit-modal__input-group">
                <label className="habit-modal__label">Reminder Time</label>
                <input
                  type="time"
                  className="habit-modal__input"
                  defaultValue="08:00"
                />
              </div>

              <div className="habit-modal__input-group">
                <label className="habit-modal__label">Reminder Days</label>
                <div className="habit-modal__days-container">
                  {DAYS_OF_WEEK.map((day) => (
                    <button
                      key={day}
                      className={`habit-modal__day-button ${
                        ["Mon", "Tue", "Wed", "Thu", "Fri"].includes(day)
                          ? "habit-modal__day-button--active"
                          : ""
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div> */}
          </div>

          {/* Modal Footer */}
          <div className="habit-modal__footer">
            <button
              className="habit-modal__button habit-modal__button--cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="habit-modal__button habit-modal__button--primary">
              Create Habit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
