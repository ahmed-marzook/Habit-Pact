import { useState } from "react";
import { useHabits } from "../../hooks/useHabitQuery";
import "./Habits.css";
import CreateHabitModal from "./modal/CreateHabitModal";

export default function Habits() {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const { data: habit } = useHabits();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="habits">
      <CreateHabitModal isOpen={modalIsOpen} onClose={closeModal} />
      <div className="habits__header">
        <h1 className="habits__title">My Habits</h1>
        <button className="habits__add-button" onClick={openModal}>
          + Add New Habit
        </button>
      </div>

      <div className="habits__list">
        <div className="habit">
          <div className="habit__header">
            <div className="habit__title">No Desserts</div>
            <div className="habit__streak">Current Streak: 5 days</div>
          </div>
          <div className="habit__tracker">
            <div className="habit__days">
              <div className="habit__day habit__day--completed">M</div>
              <div className="habit__day habit__day--completed">T</div>
              <div className="habit__day habit__day--completed">W</div>
              <div className="habit__day habit__day--missed">T</div>
              <div className="habit__day habit__day--completed">F</div>
              <div className="habit__day habit__day--completed">S</div>
              <div className="habit__day">S</div>
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
              <button className="habit__action-button">Edit</button>
              <button className="habit__action-button">Delete</button>
            </div>
          </div>
        </div>

        <div className="habit">
          <div className="habit__header">
            <div className="habit__title">Exercise</div>
            <div className="habit__streak">Current Streak: 3 days</div>
          </div>
          <div className="habit__tracker">
            <div className="habit__days">
              <div className="habit__day habit__day--completed">M</div>
              <div className="habit__day habit__day--missed">T</div>
              <div className="habit__day habit__day--completed">W</div>
              <div className="habit__day habit__day--completed">T</div>
              <div className="habit__day habit__day--completed">F</div>
              <div className="habit__day">S</div>
              <div className="habit__day">S</div>
            </div>
          </div>
          <div className="habit__info">
            <div className="habit__info-item">
              <span>Success Rate: 85%</span>
            </div>
            <div className="habit__info-item">
              <span>Target: 5 times/week</span>
            </div>
            <div className="habit__actions">
              <button className="habit__action-button">Edit</button>
              <button className="habit__action-button">Delete</button>
            </div>
          </div>
        </div>

        <div className="habit">
          <div className="habit__header">
            <div className="habit__title">Pray in the morning</div>
            <div className="habit__streak">Current Streak: 7 days</div>
          </div>
          <div className="habit__tracker">
            <div className="habit__days">
              <div className="habit__day habit__day--completed">M</div>
              <div className="habit__day habit__day--completed">T</div>
              <div className="habit__day habit__day--completed">W</div>
              <div className="habit__day habit__day--completed">T</div>
              <div className="habit__day habit__day--completed">F</div>
              <div className="habit__day habit__day--completed">S</div>
              <div className="habit__day habit__day--completed">S</div>
            </div>
          </div>
          <div className="habit__info">
            <div className="habit__info-item">
              <span>Success Rate: 92%</span>
            </div>
            <div className="habit__info-item">
              <span>Target: Daily</span>
            </div>
            <div className="habit__actions">
              <button className="habit__action-button">Edit</button>
              <button className="habit__action-button">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
