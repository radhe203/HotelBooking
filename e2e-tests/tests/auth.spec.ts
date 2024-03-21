import { test, expect } from '@playwright/test';
const UI_URL = "http://localhost:5173/"



test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  //get the sign in button
  await page.getByRole('link', { name: "Sign In" }).click()

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible()
  await page.locator("[type=email]").fill("1@1.com")
  await page.locator("[type=password]").fill("123456")

  await page.getByRole("button", { name: "Sign in" }).click()

  await expect(page.getByText("Login Success")).toBeVisible()
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible()
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible()
  await expect(page.getByRole("button", { name: "Log out" })).toBeVisible()

});


test("should allow user to register", async ({ page }) => {
  const testEmail = `test_register_${Math.floor(Math.random()*90000)+10000}@test.com`
  await page.goto(UI_URL)
  await page.getByRole('link', { name: "Sign In" }).click()
  await page.getByRole('link', { name: "create an account" }).click()
  await expect(page.getByRole("heading", { name: "Create an account" })).toBeVisible()
  await page.locator("[name=firstname]").fill("firstname_test")
  await page.locator("[name=lastname]").fill("lastname_test")
  await page.locator("[name=email]").fill(testEmail)
  await page.locator("[name=password]").fill("123456")
  await page.locator("[name=confirmPassword]").fill("123456")
  await page.getByRole('button', { name: "Create An account" }).click()
  //expect
  await expect(page.getByText("Register Success")).toBeVisible()
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible()
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible()
  await expect(page.getByRole("button", { name: "Log out" })).toBeVisible()

})