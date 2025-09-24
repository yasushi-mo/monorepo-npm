import { test, expect } from "@playwright/test";

test("has a user list heading", async ({ page }) => {
  await page.goto("http://localhost:3000");
  const heading = page.getByRole("heading", { name: "ユーザー一覧" });
  await expect(heading).toBeVisible();
});

test("shows user list from backend", async ({ page }) => {
  await page.goto("http://localhost:3000");
  const userList = page.getByRole("list");
  await expect(userList).toBeVisible();

  // バックエンドから取得したユーザーが表示されていることを確認
  await expect(page.getByText("田中太郎 - tanaka@example.com")).toBeVisible();
});
