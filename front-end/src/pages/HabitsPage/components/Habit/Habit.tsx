import HabitDay from "../HabitDay/HabitDay";
import "./Habit.css";
import { getCurrentWeekStartingMonday } from "../../../../utils/dateUtils";
import HabitInfo from "../HabitInfo/HabitInfo";
import HabitResponse from "../../../../types/habitResponse";

type HabitProps = {
  habit: HabitResponse;
};

export default function Habit({ habit }: HabitProps) {
  const week = getCurrentWeekStartingMonday();

  const dayData = habit.currentYearCompletions.monthlyData.ge;

  return (
    <div className="habit">
      <div className="habit__header">
        <div className="habit__title">{habit.name}</div>
        <div className="habit__target">Target: {habit.frequency.period} </div>
      </div>
      <div className="habit__tracker">
        {week.map((d) => (
          <HabitDay dayOfTheWeek={d.dayName} date={d.date} />
        ))}
      </div>
      <HabitInfo />
    </div>
  );
}
