import axios, { AxiosError } from "axios";
import APIErrorResponse from "../types/ErrorResponse";
import { toast } from "react-toastify";

interface ErrorHandlerOptions {
  defaultMessage?: string;
  shouldShowFieldErrors?: boolean;
}

export const handleApiError = (
  error: unknown,
  options: ErrorHandlerOptions = {}
) => {
  const {
    defaultMessage = "An unexpected error occurred",
    shouldShowFieldErrors = false,
  } = options;

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<APIErrorResponse>;
    const fieldErrors = axiosError.response?.data?.fieldErrors;

    // Handle field-specific errors if enabled and available
    if (shouldShowFieldErrors && fieldErrors && fieldErrors.length > 0) {
      fieldErrors.forEach((fieldError) => {
        toast.error(fieldError.message, {
          icon: <span>❌</span>,
          position: "top-right",
        });
      });
    } else {
      // Show general error message
      const errorMessage = axiosError.response?.data?.message || defaultMessage;
      toast.error(errorMessage, {
        icon: <span>❌</span>,
      });
    }
  } else {
    toast.error(defaultMessage, {
      icon: <span>❌</span>,
    });
  }

  throw error; // Re-throw the error for further handling if needed
};
