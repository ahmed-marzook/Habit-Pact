export default interface APIErrorResponse {
  debugMessage?: string;
  fieldErrors?: null | Record<string, string[]>;
  message: string;
  path: string;
  status: string;
  timestamp: string;
}
