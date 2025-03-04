/**
 * Date utility functions for working with weeks.
 */

/**
 * Get current week starting with Monday.
 * @returns An array of Date objects for each day of the current week starting with Monday.
 */
export function getCurrentWeekStartingMonday(): Date[] {
  const today: Date = new Date();
  const day: number = today.getDay(); // 0 is Sunday, 1 is Monday, etc.
  const diff: number = day === 0 ? 6 : day - 1; // Adjust for Monday start (if Sunday, go back 6 days)

  const monday: Date = new Date(today);
  monday.setDate(today.getDate() - diff);
  monday.setHours(0, 0, 0, 0); // Set to beginning of day

  const week: Date[] = [];
  for (let i: number = 0; i < 7; i++) {
    const nextDay: Date = new Date(monday);
    nextDay.setDate(monday.getDate() + i);
    week.push(nextDay);
  }

  return week;
}

/**
 * Get current week starting with Sunday.
 * @returns An array of Date objects for each day of the current week starting with Sunday.
 */
export function getCurrentWeekStartingSunday(): Date[] {
  const today: Date = new Date();
  const day: number = today.getDay();

  const sunday: Date = new Date(today);
  sunday.setDate(today.getDate() - day);
  sunday.setHours(0, 0, 0, 0); // Set to beginning of day

  const week: Date[] = [];
  for (let i: number = 0; i < 7; i++) {
    const nextDay: Date = new Date(sunday);
    nextDay.setDate(sunday.getDate() + i);
    week.push(nextDay);
  }

  return week;
}

/**
 * Get month information for a specific weekday from a week array
 * @param weekArray Array of dates representing a week
 * @param dayIndex Index of the day (0 for first day, 1 for second day, etc.)
 * @returns Object containing month information
 */
export function getMonthForWeekday(
  weekArray: Date[],
  dayIndex: number
): {
  monthIndex: number; // 0-11
  monthNumber: number; // 1-12
  monthName: string;
} {
  if (dayIndex < 0 || dayIndex >= weekArray.length) {
    throw new Error(
      `Day index ${dayIndex} is out of range (0-${weekArray.length - 1})`
    );
  }

  const date: Date = weekArray[dayIndex];
  const monthIndex: number = date.getMonth();

  const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return {
    monthIndex,
    monthNumber: monthIndex + 1,
    monthName: monthNames[monthIndex],
  };
}
