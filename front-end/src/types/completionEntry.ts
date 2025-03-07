import CompletionStatus from "./enums/completionStatus.enum";

/**
 * Represents a single completion entry with status and optional notes
 */
export default interface CompletionEntry {
  /**
   * Status of completion
   */
  status: CompletionStatus;

  /**
   * Optional notes about the completion
   */
  notes?: string;
}
