import { test } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://www.hangame.app");
  await page.getByRole("link", { name: "Single player" }).click();
  await page.getByRole("button", { name: "Easy" }).click();
  await page.getByRole("button", { name: "Geography" }).click();
  await page.getByText("Difficulty: Easy").click();
  await page.getByText("Topic: Geography").click();
  await page.getByRole("button", { name: "Start game" }).click();
  await page.getByRole("button", { name: "A", exact: true }).click();
  await page.getByRole("button", { name: "Clues: 3" }).click();
  await page.getByRole("button", { name: "Generate clue" }).click();
  await page.getByRole("button", { name: "OK" }).click();
});
