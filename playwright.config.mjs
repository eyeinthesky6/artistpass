import { defineConfig } from "@playwright/test";

const pythonCommand = process.platform === "win32" ? "python" : "python3";

export default defineConfig({
  testDir: "tests",
  timeout: 20000,
  use: {
    baseURL: "http://localhost:4177",
    browserName: "chromium",
    headless: true
  },
  projects: [
    {
      name: "desktop-chromium",
      use: { viewport: { width: 1280, height: 720 } }
    },
    {
      name: "mobile-chromium",
      use: { viewport: { width: 390, height: 844 } }
    }
  ],
  webServer: {
    command: `${pythonCommand} -m http.server 4177`,
    port: 4177,
    reuseExistingServer: true
  }
});
