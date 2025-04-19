import CompletionStatus from "./enums/completionStatus.enum";

type RecordHabitCompletionRequest = {
  date: string | Date;
  habitStatus: CompletionStatus;
  notes?: string;
};

export default RecordHabitCompletionRequest;
