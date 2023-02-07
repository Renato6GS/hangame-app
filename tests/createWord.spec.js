import { test } from "@playwright/test";

test("create a new game with a custom word", async ({ page }) => {
  await page.goto("https://www.hangame.app/");
  await page.getByRole("link", { name: "Create word" }).click();
  await page.getByPlaceholder("e.g. Freeway").click();
  await page.getByPlaceholder("e.g. Freeway").fill("t");
  await page.getByPlaceholder("e.g. Freeway").fill("te");
  await page.getByPlaceholder("e.g. Freeway").fill("tes");
  await page.getByPlaceholder("e.g. Freeway").fill("test");
  await page.getByPlaceholder("e.g. Freeway").fill("testi");
  await page.getByPlaceholder("e.g. Freeway").fill("testin");
  await page.getByPlaceholder("e.g. Freeway").fill("testing");
  await page.getByRole("button", { name: "Start" }).click();
  await page.getByRole("button", { name: "T", exact: true }).click();
  await page.getByRole("button", { name: "Clues: 1" }).click();
});

test("share a word with empty field", async ({ page }) => {
  await page.goto("https://www.hangame.app/");
  await page.getByRole("link", { name: "Create word" }).click();
  await page.getByRole("button", { name: "Share" }).click();
  await page.getByRole("heading", { name: "Empty field" }).click();
});
