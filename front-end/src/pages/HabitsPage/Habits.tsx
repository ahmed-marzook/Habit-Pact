import { useEffect, useState } from "react";
import { useHabits } from "../../hooks/useHabitQuery";
import "./Habits.css";
import CreateHabitModal from "./modal/CreateHabitModal";
import Habit from "./components/sections/Habit";

export default function Habits() {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const { data: habits, isLoading } = useHabits();

  if (!isLoading) {
    habits?.map((habit) => console.log(habit));
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
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
        <Habit />
        <Habit />
        <Habit />
        <Habit />
        <Habit />
        <Habit />
      </div>
    </div>
  );
}
