import "./HabitDay.css";

type HabitDayProps = {
  dayOfTheWeek: string;
  date: Date;
};

export default function HabitDay({ dayOfTheWeek, date }: HabitDayProps) {
  return (
    <div className="habit__day-container">
      <button
        className="habit__day habit__day--completed"
        aria-label="Monday completed"
      >
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
