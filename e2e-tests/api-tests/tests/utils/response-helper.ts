import { expect } from "@playwright/test";

import moment from "moment";

interface ErrorResponse {
  status: string;
  timestamp: string;
  message: string;
  debugMessage: string;
  fieldErrors: any;
  path: string;
}

export function expectErrorResponse(
  data: ErrorResponse,
  {
    status,
    message,
    path,
    fieldErrors = null,
  }: {
    status: string;
    message: string;
    path: string;
    fieldErrors?: any;
  }
) {
  // Verify timestamp is recent
  const formattedDate = moment(data.timestamp, "DD-MM-YYYY HH:mm:ss").format(
    "DD-MM-YYYY HH:mm"
  );
  const currentDate = moment().format("DD-MM-YYYY HH:mm");
  expect(formattedDate).toBe(currentDate);

  // Verify error properties
  expect(data).toHaveProperty("status", status);
  expect(data).toHaveProperty("message", message);
  expect(data).toHaveProperty("debugMessage", message);
  expect(data).toHaveProperty("fieldErrors", fieldErrors);
  expect(data).toHaveProperty("path", path);
}
