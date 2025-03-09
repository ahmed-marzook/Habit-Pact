import { useState } from "react";
import { useHabits } from "../../hooks/useHabitQuery";
import "./Habits.css";
import CreateHabitModal from "./modal/CreateHabitModal/CreateHabitModal";
import Habit from "./components/Habit/Habit";
import {
  NoteModalProvider,
  useNoteModal,
} from "../../contexts/NoteModalContext/NoteModalContext";
import HabitNoteModal from "./modal/HabitNoteModal/HabitNoteModal";

function HabitsContents() {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const { data: habits, isLoading } = useHabits();
  const {
    isNoteModalOpen,
    selectedDate,
    selectedHabitEntry,
    selectedHabit,
    closeNoteModal,
  } = useNoteModal();

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
      {selectedHabit && selectedDate && (
        <HabitNoteModal
          isOpen={isNoteModalOpen}
          onClose={closeNoteModal}
          habitEntry={selectedHabitEntry}
          habitDate={selectedDate}
        />
      )}
      <div className="habits__header">
        <h1 className="habits__title">My Habits</h1>
        <button className="habits__add-button" onClick={openModal}>
          + Add New Habit
        </button>
      </div>

      <div className="habits__list">
        {habits?.map((habit) => (
          <Habit key={habit.id} habit={habit} />
        ))}
      </div>
    </div>
  );
}

export default function Habits() {
  return (
    <NoteModalProvider>
      <HabitsContents />
    </NoteModalProvider>
  );
}
