import HabitDay from "../HabitDay/HabitDay";
import "./Habit.css";
import { getCurrentWeekStartingMonday } from "../../../../utils/dateUtils";
import HabitInfo from "../HabitInfo/HabitInfo";

type Props = {};

export default function Habit({}: Props) {
  const week = getCurrentWeekStartingMonday();

  return (
    <div className="habit">
      <div className="habit__header">
        <div className="habit__title">No Desserts</div>
        <div className="habit__target">Target: Daily </div>
      </div>
      <div className="habit__tracker">
        {week.map((d) => (
          <HabitDay dayOfTheWeek={d.dayName} />
        ))}
      </div>
      <HabitInfo />
    </div>
  );
}
