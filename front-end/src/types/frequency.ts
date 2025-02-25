import Period from "./enums/period.enum";

/**
 * Frequency configuration for a habit
 */
export default interface Frequency {
  /**
   * Number of times the habit should be completed in the given period
   */
  times: number;

  /**
   * The time period for the frequency (daily, weekly, monthly)
   */
  period: Period;
}
