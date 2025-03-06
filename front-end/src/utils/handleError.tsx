import axios, { AxiosError } from "axios";
import APIErrorResponse from "../types/errorResponse";
import { toast } from "react-toastify";
import { authService } from "../services/api/authService";

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

    // Handle 403 Forbidden error
    if (axiosError.response?.status === 403) {
      toast.error("Session expired. Please log in again.", {
        icon: <span>❌</span>,
      });
      // Perform logout and redirect to login page
      // Assuming you have a logout function
      authService.logout();
      window.location.replace("/login");
    }

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
        icon: <span>"❌"</span>,
      });
    }
  } else {
    toast.error(defaultMessage, {
      icon: <span>❌</span>,
    });
    window.location.replace("/login");
  }

  throw error; // Re-throw the error for further handling if needed
};
