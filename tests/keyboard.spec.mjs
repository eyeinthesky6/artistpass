import { test, expect } from "@playwright/test";

test.describe("keyboard accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("#dc-root");
  });

  test("focus-visible styles exist", async ({ page }) => {
    const has = await page.evaluate(() => {
      const sheets = document.querySelectorAll("style");
      return Array.from(sheets).some(s => s.textContent.includes("focus-visible"));
    });
    expect(has).toBe(true);
  });

  test("Escape closes contact dialog", async ({ page }) => {
    await page.locator("button[aria-label='Contact Ananya']").first().click();
    await expect(page.locator("[role='dialog']")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("[role='dialog']")).not.toBeVisible();
  });

  test("Escape closes admin panel", async ({ page }) => {
    const adminBtn = page.getByRole("button", { name: "Admin", exact: true });
    await adminBtn.click();
    await expect(page.locator(".adminPanel")).toBeVisible({ timeout: 10000 });
    await page.keyboard.press("Escape");
    await expect(page.locator(".adminPanel")).not.toBeVisible();
  });

  test("focus returns to trigger after closing contact", async ({ page }) => {
    const btn = page.locator("button[aria-label='Contact Ananya']").first();
    await btn.click();
    await page.keyboard.press("Escape");
    await expect(btn).toBeFocused();
  });

  test("focus returns to trigger after closing admin", async ({ page }) => {
    const adminBtn = page.getByRole("button", { name: "Admin", exact: true });
    await adminBtn.click();
    await expect(page.locator(".adminPanel")).toBeVisible({ timeout: 10000 });
    await page.keyboard.press("Escape");
    await expect(page.locator(".adminPanel")).not.toBeVisible();
    await expect(adminBtn).toBeFocused();
  });
});
