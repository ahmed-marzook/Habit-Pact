import HabitDay from "../HabitDay/HabitDay";
import "./Habit.css";
import { getCurrentWeekStartingMonday } from "../../../../utils/dateUtils";
import HabitInfo from "../HabitInfo/HabitInfo";
import HabitResponse from "../../../../types/habitResponse";
import { capitalizeFirstLetter } from "../../../../utils/stringUtils";
import { memo, useCallback, useMemo } from "react";
import { HabitProvider } from "../../../../contexts/HabitContext/HabitContext";

type HabitProps = {
  habit: HabitResponse;
};

function Habit({ habit }: HabitProps) {
  const week = useMemo(() => getCurrentWeekStartingMonday(), []);

  const getHabitDay = useCallback(
    (date: Date) => {
      const monthData = new Map(
        Object.entries(habit.currentYearCompletions.monthlyData)
      ).get((date.getMonth() + 1).toString());
      return monthData ? monthData[date.getDate()] : null;
    },
    [habit.currentYearCompletions.monthlyData]
  );

  return (
    <HabitProvider habit={habit}>
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
              habitDay={getHabitDay(d.date)}
            />
          ))}
        </div>
        <HabitInfo habit={habit} />
      </div>
    </HabitProvider>
  );
}

export default memo(Habit);
