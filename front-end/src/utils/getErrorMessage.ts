import axios from "axios";

export default function getErrorMessage(error: Error) {
  if (axios.isAxiosError(error)) {
    return error["response"]?.data.message;
  } else {
    return error.message;
  }
}
