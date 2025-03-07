import CompletionEntry from "../../../../types/completionEntry";
import CompletionStatus from "../../../../types/enums/completionStatus.enum";
import "./HabitDay.css";

type HabitDayProps = {
  dayOfTheWeek: string;
  date: Date;
  habitId: string;
  habitDay: CompletionEntry | null;
};

export default function HabitDay({
  dayOfTheWeek,
  date,
  habitDay,
  habitId,
}: HabitDayProps) {
  const getClassName = () => {
    if (habitDay?.status === CompletionStatus.COMPLETED) {
      return "habit__day habit__day--completed";
    } else if (habitDay?.status === CompletionStatus.FAILED) {
      return "habit__day habit__day--missed";
    } else {
      return "habit__day";
    }
  };
  return (
    <div className="habit__day-container">
      <button className={getClassName()} aria-label="Monday completed">
        {dayOfTheWeek.charAt(0).toUpperCase()}
      </button>
      <button
        className="habit__day-pencil-icon"
        aria-label={`Edit ${dayOfTheWeek}`}
      >
        ✏️
      </button>
    </div>
  );
}
