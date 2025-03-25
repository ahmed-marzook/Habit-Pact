import HabitDay from "../HabitDay/HabitDay";
import "./Habit.css";
import {
  getCurrentWeekStartingMonday,
  getCurrentMonthDays,
} from "../../../../utils/dateUtils";
import HabitInfo from "../HabitInfo/HabitInfo";
import HabitResponse from "../../../../types/habitResponse";
import { capitalizeFirstLetter } from "../../../../utils/stringUtils";
import { memo, useCallback, useMemo, useState } from "react";
import { HabitProvider } from "../../../../contexts/HabitContext/HabitContext";

type HabitProps = {
  habit: HabitResponse;
};

type ViewType = "week" | "month";

function Habit({ habit }: HabitProps) {
  const week = useMemo(() => getCurrentWeekStartingMonday(), []);
  const month = useMemo(() => getCurrentMonthDays(), []);

  const [currentView, setCurrentView] = useState<ViewType>("week");

  const getHabitDay = useCallback(
    (date: Date) => {
      const monthData = new Map(
        Object.entries(habit.currentYearCompletions.monthlyData)
      ).get((date.getMonth() + 1).toString());
      return monthData ? monthData[date.getDate()] : null;
    },
    [habit.currentYearCompletions.monthlyData]
  );

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
  };

  return (
    <HabitProvider habit={habit}>
      <div className="habit">
        <div className="habit__header">
          <div className="habit__title">{habit.name}</div>
          <div className="habit__view-controls">
            <div className="habit__view-buttons">
              <button
                className={`habit__view-button ${
                  currentView === "week" ? "habit__view-button--active" : ""
                }`}
                onClick={() => handleViewChange("week")}
              >
                W
              </button>
              <button
                className={`habit__view-button ${
                  currentView === "month" ? "habit__view-button--active" : ""
                }`}
                onClick={() => handleViewChange("month")}
              >
                M
              </button>
            </div>
            <div className="habit__target">
              Target: {capitalizeFirstLetter(habit.frequency.period)}
            </div>
          </div>
        </div>
        <div className="habit__tracker">
          {(currentView === "week" ? week : month).map((d) => (
            <HabitDay
              key={d.date.toString()}
              label={
                currentView === "week"
                  ? d.dayName.charAt(0).toUpperCase()
                  : d.date.getDate().toString()
              }
              date={d.date}
              habitDay={getHabitDay(d.date)}
            />
          ))}
        </div>
        <HabitInfo />
      </div>
    </HabitProvider>
  );
}

export default memo(Habit);
