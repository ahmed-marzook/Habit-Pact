import { memo, useCallback } from "react";
import CompletionEntry from "../../../../types/completionEntry";
import CompletionStatus from "../../../../types/enums/completionStatus.enum";
import "./HabitDay.css";
import { useRecordHabitCompletion } from "../../../../hooks/useHabitQuery";
import { useHabit } from "../../../../contexts/HabitContext/HabitContext";
import { useNoteModal } from "../../../../contexts/NoteModalContext/NoteModalContext";

type HabitDayProps = {
  label: string;
  date: Date;
  habitDay: CompletionEntry | null;
};

function HabitDay({ label, date, habitDay }: HabitDayProps) {
  const { openNoteModal } = useNoteModal();
  const { mutate } = useRecordHabitCompletion();
  const { habit } = useHabit();

  const handleOpenModal = () => {
    openNoteModal(habit, date, habitDay || undefined);
  };

  const getClassName = useCallback(() => {
    if (habitDay?.status === CompletionStatus.COMPLETED) {
      return "habit__day habit__day--completed";
    } else if (habitDay?.status === CompletionStatus.FAILED) {
      return "habit__day habit__day--missed";
    } else {
      return "habit__day";
    }
  }, [habitDay]);

  const cycleCompletionStatus = () => {
    const statuses = [
      CompletionStatus.FAILED,
      CompletionStatus.PENDING,
      CompletionStatus.COMPLETED,
    ];
    const currentIndex = statuses.indexOf(
      habitDay?.status || CompletionStatus.PENDING
    );
    const nextIndex = (currentIndex + 1) % statuses.length;
    const nextStatus = statuses[nextIndex];

    const data = {
      date,
      habitStatus: nextStatus,
    };
    mutate({ habitId: habit?.id, data });
  };

  return (
    <div className="habit__day-container">
      <button
        className={getClassName()}
        aria-label={label}
        onClick={cycleCompletionStatus}
      >
        {label}
      </button>
      <button
        className="habit__day-pencil-icon"
        aria-label={`Edit ${label}`}
        onClick={handleOpenModal}
      >
        ✏️
      </button>
    </div>
  );
}

export default memo(HabitDay);
