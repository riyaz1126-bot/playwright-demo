import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({
  path: ".envi.staging"
});

//dotenv.config(); // loads .env file

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",

  timeout: 60 * 1000,

  expect: {
    timeout: 60 * 1000,
  },

  reporter: "html",

  use: {
    baseURL: process.env.BASE_URL,
    browserName: "chromium",
    headless: false,
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
});
