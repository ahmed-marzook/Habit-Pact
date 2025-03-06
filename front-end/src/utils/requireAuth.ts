import { toast } from "react-toastify";

import { authService } from "../services/api/authService";

let lastVerificationTime = 0;
const VERIFICATION_INTERVAL = 5 * 60 * 1000; // 5 minutes

export async function requireAuth() {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Please sign in to continue");
    window.location.replace("/login");
  }

  const currentTime = Date.now();
  if (currentTime - lastVerificationTime > VERIFICATION_INTERVAL) {
    try {
      const user = await authService.getCurrentUser();
      lastVerificationTime = currentTime;
      return user;
    } catch (error) {
      authService.logout();
      window.location.replace("/login");
    }
  }
  return true;
}
