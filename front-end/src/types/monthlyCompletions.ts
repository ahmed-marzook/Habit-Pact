import CompletionEntry from "./completionEntry";

/**
 * Represents a collection of daily completions for a month
 * Keys are day numbers (1-31)
 */
export default interface MonthlyCompletions {
  [day: string]: CompletionEntry;
}
