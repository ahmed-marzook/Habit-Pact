import Frequency from "./frequency";
import Reminder from "./reminder.type";

/**
 * Request object for creating a new habit
 */
export default interface CreateHabitRequest {
  /**
   * Name of the habit
   */
  name: string;

  /**
   * Description of the habit
   */
  description: string;

  /**
   * Frequency configuration for the habit
   */
  frequency: Frequency;

  /**
   * Tags associated with the habit for categorization
   */
  tags: string[];

  /**
   * Reminder configuration for the habit
   */
  reminder: Reminder;
}
