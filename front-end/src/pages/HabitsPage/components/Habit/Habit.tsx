import HabitDay from "../HabitDay/HabitDay";
import "./Habit.css";
import { getCurrentWeekStartingMonday } from "../../../../utils/dateUtils";
import HabitInfo from "../HabitInfo/HabitInfo";
import HabitResponse from "../../../../types/habitResponse";
import { capitalizeFirstLetter } from "../../../../utils/stringUtils";

type HabitProps = {
  habit: HabitResponse;
};

export default function Habit({ habit }: HabitProps) {
  const week = getCurrentWeekStartingMonday();

  const getHabitDay = (date: Date) => {
    const monthData = new Map(
      Object.entries(habit.currentYearCompletions.monthlyData)
    ).get((date.getMonth() + 1).toString());
    return monthData ? monthData[date.getDate()] : null;
  };

  return (
    <div className="habit">
      <div className="habit__header">
        <div className="habit__title">{habit.name}</div>
        <div className="habit__target">
          Target: {capitalizeFirstLetter(habit.frequency.period)}
        </div>
      </div>
      <div className="habit__tracker">
        {week.map((d) => (
          <HabitDay
            key={d.date.toString()}
            dayOfTheWeek={d.dayName}
            date={d.date}
            habitId={habit.id}
            habitDay={getHabitDay(d.date)}
          />
        ))}
      </div>
      <HabitInfo />
    </div>
  );
}
