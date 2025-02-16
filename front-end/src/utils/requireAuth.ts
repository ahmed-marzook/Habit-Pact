import { redirect } from "react-router-dom";

import { toast } from "react-toastify";

import { authService } from "../services/api/authAPI";

let lastVerificationTime = 0;
const VERIFICATION_INTERVAL = 5 * 60 * 1000; // 5 minutes

export async function requireAuth() {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Please sign in to continue");
    throw redirect("/login");
  }

  // Only verify with the server if enough time has passed
  const currentTime = Date.now();
  if (currentTime - lastVerificationTime > VERIFICATION_INTERVAL) {
    try {
      const user = await authService.getCurrentUser();
      lastVerificationTime = currentTime;
      return user;
    } catch (error) {
      // Axios interceptor will handle 401 errors
      throw redirect("/login");
    }
  }
  console.log("IM Here 2");
  return true;
}
