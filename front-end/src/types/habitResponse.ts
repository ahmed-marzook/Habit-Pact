import CurrentYearCompletions from "./currentYearCompletions";
import Frequency from "./frequency";

/**
 * Response object containing detailed information about a habit
 */
export default interface HabitResponse {
  /**
   * Unique identifier of the habit
   */
  id: string;

  /**
   * ID of the user who owns the habit
   */
  userId: string;

  /**
   * Name of the habit
   */
  name: string;

  /**
   * Detailed description of the habit
   */
  description: string;

  /**
   * Frequency configuration of the habit
   */
  frequency: Frequency;

  /**
   * Indicates if the habit is archived
   */
  archived: boolean;

  /**
   * Timestamp when the habit was created
   */
  createdAt: string;

  /**
   * Timestamp when the habit was last updated
   */
  updatedAt: string;

  /**
   * Completion data for the current year organized by month and day
   */
  currentYearCompletions: CurrentYearCompletions;
}
