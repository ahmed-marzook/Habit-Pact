import Frequency from "./frequency";

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
}
