/**
 * Streak information for a habit
 */
export default interface Streak {
  /**
   * Current streak count (consecutive completions)
   */
  current: number;

  /**
   * Longest streak achieved for this habit
   */
  longest: number;

  /**
   * ISO timestamp of when the habit was last completed
   */
  lastCompletedAt: string;
}
