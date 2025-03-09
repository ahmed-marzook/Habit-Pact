import React, { createContext, useContext, useMemo } from "react";
import HabitResponse from "../../types/habitResponse";

type HabitContextType = {
  habit: HabitResponse;
};

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{
  habit: HabitResponse;
  children: React.ReactNode;
}> = ({ habit, children }) => {
  const value = useMemo(() => ({ habit }), [habit]);
  return (
    <HabitContext.Provider value={value}>{children}</HabitContext.Provider>
  );
};

export const useHabit = (): HabitContextType => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error("useHabit must be used within a HabitProvider");
  }
  return context;
};
