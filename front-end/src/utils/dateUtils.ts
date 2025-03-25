/**
 * Date utility functions for working with weeks.
 */

/**
 * Returns an array of objects representing the current week starting from Monday.
 * Each object contains the date and the corresponding day name.
 *
 * @returns {Array<{date: Date, dayName: string}>} An array of objects with date and day name
 * @example
 * const weekDays = getCurrentWeekStartingMonday();
 * weekDays.forEach(day => {
 *   console.log(`${day.dayName}: ${day.date.toDateString()}`);
 * });
 */
export function getCurrentWeekStartingMonday(): {
  date: Date;
  dayName: string;
}[] {
  const today: Date = new Date();
  const day: number = today.getDay(); // 0 is Sunday, 1 is Monday, etc.
  const diff: number = day === 0 ? 6 : day - 1; // Adjust for Monday start (if Sunday, go back 6 days)

  const monday: Date = new Date(today);
  monday.setDate(today.getDate() - diff);
  monday.setHours(0, 0, 0, 0); // Set to beginning of day

  const week: { date: Date; dayName: string }[] = [];
  for (let i: number = 0; i < 7; i++) {
    const nextDay: Date = new Date(monday);
    nextDay.setDate(monday.getDate() + i);
    // Get the day name using toLocaleString
    const dayName: string = nextDay.toLocaleString("en-US", {
      weekday: "long",
    });

    week.push({
      date: nextDay,
      dayName: dayName,
    });
  }

  return week;
}

/**
 * Returns an array of objects representing the current week starting from Sunday.
 * Each object contains the date and the corresponding day name.
 *
 * @returns {Array<{date: Date, dayName: string}>} An array of objects with date and day name
 * @example
 * const weekDays = getCurrentWeekStartingSunday();
 * weekDays.forEach(day => {
 *   console.log(`${day.dayName}: ${day.date.toDateString()}`);
 * });
 */
export function getCurrentWeekStartingSunday(): {
  date: Date;
  dayName: string;
}[] {
  const today: Date = new Date();
  const day: number = today.getDay(); // 0 is Sunday, 1 is Monday, etc.

  const sunday: Date = new Date(today);
  sunday.setDate(today.getDate() - day);
  sunday.setHours(0, 0, 0, 0); // Set to beginning of day

  const week: { date: Date; dayName: string }[] = [];
  for (let i: number = 0; i < 7; i++) {
    const nextDay: Date = new Date(sunday);
    nextDay.setDate(sunday.getDate() + i);
    // Get the day name using toLocaleString
    const dayName: string = nextDay.toLocaleString("en-US", {
      weekday: "long",
    });

    week.push({
      date: nextDay,
      dayName: dayName,
    });
  }

  return week;
}

/**
 * Returns an array of objects representing all days in the current month.
 * Each object contains the date and the corresponding day name.
 *
 * @returns {Array<{date: Date, dayName: string}>} An array of objects with date and day name
 * @example
 * const monthDays = getCurrentMonthDays();
 * monthDays.forEach(day => {
 *   console.log(`${day.dayName}, ${day.date.toLocaleDateString()}`);
 * });
 */
export function getCurrentMonthDays(): {
  date: Date;
  dayName: string;
}[] {
  const today: Date = new Date();
  const year: number = today.getFullYear();
  const month: number = today.getMonth();

  // Create a new date for the first day of the current month
  const firstDay: Date = new Date(year, month, 1);

  // Calculate the number of days in the current month
  // By setting day to 0 of next month, we get the last day of current month
  const lastDay: Date = new Date(year, month + 1, 0);
  const daysInMonth: number = lastDay.getDate();

  const monthDays: { date: Date; dayName: string }[] = [];

  // Create an object for each day in the month
  for (let i: number = 0; i < daysInMonth; i++) {
    const currentDate: Date = new Date(firstDay);
    currentDate.setDate(i + 1);

    const dayName: string = currentDate.toLocaleString("en-US", {
      weekday: "long",
    });

    monthDays.push({
      date: new Date(currentDate), // Create a new Date object to avoid reference issues
      dayName: dayName,
    });
  }

  return monthDays;
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
