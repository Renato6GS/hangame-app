import { test } from "@playwright/test";

test("test achievement page and reset it", async ({ page }) => {
  await page.goto("https://www.hangame.app/");
  await page.getByRole("link", { name: "Achievements" }).click();
  await page.getByRole("heading", { name: "First win" }).click();
  await page.getByRole("heading", { name: "First lose" }).click();
  await page.getByRole("button", { name: "Reset achievements" }).click();
  await page.getByRole("heading", { name: "Achievements reset successfully" }).click();
});
