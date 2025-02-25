import Frequency from "./frequency";
import Reminder from "./reminder.type";
import Streak from "./streak";

/**
 * Response object for habit data
 */
export default interface HabitResponse {
  /**
   * Unique identifier for the habit
   */
  id: string;

  /**
   * ID of the user who owns this habit
   */
  userId: string;

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
   * Whether the habit is archived
   */
  archived: boolean;

  /**
   * Streak information for the habit
   */
  streak: Streak;

  /**
   * Reminder configuration for the habit
   */
  reminder: Reminder;

  /**
   * ISO timestamp of when the habit was created
   */
  createdAt: string;

  /**
   * ISO timestamp of when the habit was last updated
   */
  updatedAt: string;
}
