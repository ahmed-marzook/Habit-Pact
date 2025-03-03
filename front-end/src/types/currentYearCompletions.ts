import MonthlyCompletions from "./monthlyCompletions";

/**
 * Represents completions data for current year organized by month
 * Keys are month numbers (1-12)
 */
export default interface CurrentYearCompletions {
  /**
   * Monthly completion data indexed by month number (1-12)
   */
  monthlyData: {
    [month: string]: MonthlyCompletions;
  };
}
