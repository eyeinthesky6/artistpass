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
    await page.getByRole("button", { name: "Contact Ananya Rao", exact: true }).first().click();
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
    const btn = page.getByRole("button", { name: "Contact Ananya Rao", exact: true }).first();
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

  test("Enter submits the Admin password form", async ({ page }) => {
    await page.getByRole("button", { name: "Admin", exact: true }).click();
    const form = page.locator("form[aria-label='Admin unlock']");
    await expect(form).toBeVisible();

    await form.getByLabel("Admin password").fill("test-password");
    await form.getByLabel("Admin password").press("Enter");

    await expect(page.getByText("Open section", { exact: true })).toBeVisible();
  });

  test("the Unlock button submits the Admin password form", async ({ page }) => {
    await page.getByRole("button", { name: "Admin", exact: true }).click();
    const form = page.locator("form[aria-label='Admin unlock']");
    await form.getByLabel("Admin password").fill("test-password");
    await form.getByRole("button", { name: "Unlock", exact: true }).click();

    await expect(page.getByText("Open section", { exact: true })).toBeVisible();
  });

  test("the official demo mode keeps Admin read-only", async ({ page }) => {
    await page.addInitScript(() => {
      window.ARTISTPASS_RUNTIME = { adminReadOnly: true };
    });
    await page.reload();
    await page.waitForSelector("#dc-root");

    await page.getByRole("button", { name: "Admin", exact: true }).click();
    const form = page.locator("form[aria-label='Admin unlock']");
    await expect(form).toBeVisible();
    await expect(form.getByRole("button", { name: "Demo read-only", exact: true })).toBeDisabled();
    await expect(form.locator("input[type='password']")).toBeDisabled();
  });
});
