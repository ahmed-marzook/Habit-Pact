import { createContext, ReactNode, useContext, useState } from "react";
import CompletionEntry from "../../types/completionEntry";
import HabitResponse from "../../types/habitResponse";

type NoteModalContextType = {
  isNoteModalOpen: boolean;
  selectedDate: Date | null;
  selectedHabitEntry: CompletionEntry | undefined;
  selectedHabit: HabitResponse | null;
  openNoteModal: (
    habit: HabitResponse,
    date: Date,
    habitEntry?: CompletionEntry
  ) => void;
  closeNoteModal: () => void;
};

const NoteModalContext = createContext<NoteModalContextType | undefined>(
  undefined
);

export const NoteModalProvider = ({ children }: { children: ReactNode }) => {
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHabitEntry, setSelectedHabitEntry] = useState<
    CompletionEntry | undefined
  >(undefined);
  const [selectedHabit, setSelectedHabit] = useState<HabitResponse | null>(
    null
  );

  const openNoteModal = (
    habit: HabitResponse,
    date: Date,
    habitEntry?: CompletionEntry
  ) => {
    setSelectedHabit(habit);
    setSelectedDate(date);
    setSelectedHabitEntry(habitEntry);
    setIsNoteModalOpen(true);
  };

  const closeNoteModal = () => {
    setIsNoteModalOpen(false);
  };

  return (
    <NoteModalContext.Provider
      value={{
        isNoteModalOpen,
        selectedDate,
        selectedHabitEntry,
        selectedHabit,
        openNoteModal,
        closeNoteModal,
      }}
    >
      {children}
    </NoteModalContext.Provider>
  );
};

export const useNoteModal = () => {
  const context = useContext(NoteModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
