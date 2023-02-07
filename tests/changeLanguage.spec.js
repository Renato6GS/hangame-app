import { test } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://www.hangame.app/");
  await page.getByRole("link", { name: "Change language" }).click();
  await page.getByRole("link", { name: "Spanish" }).click();
  await page.getByText("Seleccione un modo de juego").click();
  await page.getByRole("link", { name: "Cambiar idioma" }).click();
  await page.getByRole("link", { name: "Inglés" }).click();
  await page.getByText("Select a game mode").click();
});
