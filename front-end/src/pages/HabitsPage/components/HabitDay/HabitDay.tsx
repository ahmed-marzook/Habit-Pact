import { memo, useCallback, useState } from "react";
import CompletionEntry from "../../../../types/completionEntry";
import CompletionStatus from "../../../../types/enums/completionStatus.enum";
import "./HabitDay.css";
import { useRecordHabitCompletion } from "../../../../hooks/useHabitQuery";
import HabitNoteModal from "../../modal/HabitNoteModal/HabitNoteModal";
import { useHabit } from "../../../../contexts/HabitContext/HabitContext";

type HabitDayProps = {
  dayOfTheWeek: string;
  date: Date;
  habitDay: CompletionEntry | null;
};

function HabitDay({ dayOfTheWeek, date, habitDay }: HabitDayProps) {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const { mutate } = useRecordHabitCompletion();
  const { habit: habitData } = useHabit();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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
      CompletionStatus.COMPLETED,
      CompletionStatus.PENDING,
      CompletionStatus.FAILED,
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
    mutate({ habitId: habitData?.id, data });
  };

  return (
    <div className="habit__day-container">
      <HabitNoteModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        habitEntry={habitDay ?? undefined}
        habitDate={date}
      />
      <button
        className={getClassName()}
        aria-label={dayOfTheWeek}
        onClick={cycleCompletionStatus}
      >
        {dayOfTheWeek.charAt(0).toUpperCase()}
      </button>
      <button
        className="habit__day-pencil-icon"
        aria-label={`Edit ${dayOfTheWeek}`}
        onClick={openModal}
      >
        ✏️
      </button>
    </div>
  );
}

export default memo(HabitDay);
