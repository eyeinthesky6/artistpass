import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests",
  timeout: 20000,
  use: {
    baseURL: "http://localhost:4177",
    browserName: "chromium",
    headless: true
  },
  webServer: {
    command: "python3 -m http.server 4177",
    port: 4177,
    reuseExistingServer: true
  }
});
