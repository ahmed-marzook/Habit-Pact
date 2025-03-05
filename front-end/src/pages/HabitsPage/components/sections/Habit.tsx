import "./Habit.css";

type Props = {};

export default function Habit({}: Props) {
  return (
    <div className="habit">
      <div className="habit__header">
        <div className="habit__title">No Desserts</div>
        <div className="habit__streak">Current Streak: 5 days</div>
      </div>
      <div className="habit__tracker">
        <div className="habit__days">
          <div className="habit__day-container">
            <button
              className="habit__day habit__day--completed"
              aria-label="Monday completed"
            >
              M
            </button>
            <button className="habit__day-pencil-icon" aria-label="Edit Monday">
              ✏️
            </button>
          </div>
          <div className="habit__day-container">
            <button
              className="habit__day habit__day--completed"
              aria-label="Tuesday completed"
            >
              T
            </button>
            <button
              className="habit__day-pencil-icon"
              aria-label="Edit Tuesday"
            >
              ✏️
            </button>
          </div>
          <div className="habit__day-container">
            <button
              className="habit__day habit__day--missed"
              aria-label="Wednesday missed"
            >
              W
            </button>
            <button
              className="habit__day-pencil-icon"
              aria-label="Edit Wednesday"
            >
              ✏️
            </button>
          </div>
          <div className="habit__day-container">
            <button
              className="habit__day habit__day--completed"
              aria-label="Thursday completed"
            >
              T
            </button>
            <button
              className="habit__day-pencil-icon"
              aria-label="Edit Thursday"
            >
              ✏️
            </button>
          </div>
          <div className="habit__day-container">
            <button className="habit__day" aria-label="Friday">
              F
            </button>
            <button className="habit__day-pencil-icon" aria-label="Edit Friday">
              ✏️
            </button>
          </div>
          <div className="habit__day-container">
            <button
              className="habit__day habit__day--missed"
              aria-label="Saturday missed"
              onClick={() => console.log("habit clicked")}
            >
              S
            </button>
            <button
              className="habit__day-pencil-icon"
              aria-label="Edit Saturday"
              onClick={() => console.log("edit sat note")}
            >
              ✏️
            </button>
          </div>
          <div className="habit__day-container">
            <button
              className="habit__day habit__day--completed"
              aria-label="Sunday completed"
            >
              S
            </button>
            <button className="habit__day-pencil-icon" aria-label="Edit Sunday">
              ✏️
            </button>
          </div>
        </div>
      </div>
      <div className="habit__info">
        <div className="habit__info-item">
          <span>Success Rate: 78%</span>
        </div>
        <div className="habit__info-item">
          <span>Target: Daily</span>
        </div>
        <div className="habit__actions">
          <button className="habit__action-button habit__action--edit">
            Edit
          </button>
          <button className="habit__action-button habit__action--delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
