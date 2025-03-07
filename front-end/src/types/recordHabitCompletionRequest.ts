import CompletionStatus from "./enums/completionStatus.enum";

type RecordHabitCompletionRequest = {
  date: Date;
  habitStatus: CompletionStatus;
  notes?: string;
};

export default RecordHabitCompletionRequest;
