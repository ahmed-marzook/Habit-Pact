import react from "@vitejs/plugin-react-swc";

import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   allowedHosts: ["f63e-194-120-133-90.ngrok-free.app"],
  // },
});
