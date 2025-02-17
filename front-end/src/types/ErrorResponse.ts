export default interface APIErrorResponse {
  debugMessage?: string;
  fieldErrors?: {
    object: string;
    field: string;
    rejectedValue: string;
    message: string;
  }[];
  message: string;
  path: string;
  status: string;
  timestamp: string;
}
