import { test, expect } from "@playwright/test";

const customName = "María Santos";

async function loadCustomizedProfile(page) {
  await page.addInitScript(({ name }) => {
    localStorage.setItem("artistPassConfig_v1", JSON.stringify({ name }));
  }, { name: customName });
  await page.goto("/");
  await page.waitForSelector("#dc-root");
}

test.describe("configured artist identity", () => {
  test("uses the configured name in public labels", async ({ page }) => {
    await loadCustomizedProfile(page);

    await expect(page.getByRole("heading", {
      name: `Forward ${customName} to a casting or production contact`
    })).toBeVisible();

    await page.getByRole("button", { name: `Contact ${customName}`, exact: true }).first().click();
    const dialog = page.getByRole("dialog", { name: `Contact ${customName}` });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("button", { name: `WhatsApp ${customName}` })).toBeVisible();
    await expect(dialog.getByRole("link", { name: `Call ${customName}` })).toBeVisible();
    await expect(dialog.getByRole("link", { name: `Email ${customName}` })).toBeVisible();
  });

  test("uses a safe configured-name stem for generated downloads", async ({ page }) => {
    await page.route("https://cdn.jsdelivr.net/npm/html2canvas@**", route => route.abort());
    await page.addInitScript(() => {
      window.html2canvas = async () => {
        const canvas = document.createElement("canvas");
        canvas.width = 2;
        canvas.height = 2;
        canvas.getContext("2d").fillRect(0, 0, 2, 2);
        return canvas;
      };
    });
    await loadCustomizedProfile(page);

    const cardDownload = page.waitForEvent("download");
    await page.getByRole("button", { name: "Image", exact: true }).click();
    const card = await cardDownload;
    expect(card.suggestedFilename()).toBe("maria-santos-casting-card.png");

    const galleryDownload = page.waitForEvent("download");
    await page.getByRole("button", { name: "Download all images", exact: true }).click();
    expect((await galleryDownload).suggestedFilename()).toBe("maria-santos-01.png");
  });
});
