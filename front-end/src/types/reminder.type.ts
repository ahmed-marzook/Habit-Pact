import Day from "./enums/day.enum";

/**
 * Reminder configuration for a habit
 */
export default interface Reminder {
  /**
   * Whether the reminder is enabled
   */
  enabled: boolean;

  /**
   * The time for the reminder in 24-hour format (HH:MM)
   */
  time: string;

  /**
   * Days of the week when the reminder should be triggered
   */
  days: Day[];
}
