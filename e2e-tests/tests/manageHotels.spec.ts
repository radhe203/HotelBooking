import { test, expect } from '@playwright/test';
import path from 'path';
const UI_URL = "http://localhost:5173/"



test.beforeEach(async ({ page }) => {
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
})

test("should allow user to add hotel", async ({ page }) => {
    await page.goto(`${UI_URL}add-hotels`)

    await page.locator('[name="name"]').fill("Test Hotel");
    await page.locator('[name="city"]').fill("Test City");
    await page.locator('[name="country"]').fill("Test Country");
    await page
        .locator('[name="description"]')
        .fill("This is a description for the Test Hotel");
    await page.locator('[name="pricePerNight"]').fill("100");
    await page.selectOption('select[name="starRating"]', "3");

    await page.getByText("Budget").click();

    await page.getByLabel("Free Wifi").check();
    await page.getByLabel("Parking").check();

    await page.locator('[name="adultCount"]').fill("2");
    await page.locator('[name="childCount"]').fill("4");

    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "1.jpg"),
        path.join(__dirname, "files", "2.jpg"),
    ]);

    await page.getByRole("button", { name: "save" }).click()
    await expect(page.getByText("Hotel added successfully")).toBeVisible({ timeout: 6000000 })
})


test("should Display Hotels", async ({ page }) => {

    await page.goto(`${UI_URL}my-hotels`)
    await expect(page.getByText("Dublin Getaways")).toBeVisible()
    // await expect(page.getByText(':has-text("Lorem ipsum dolor sit amet,")')).toBeVisible()
    await expect(page.getByText("Dublin, Ireland")).toBeVisible()
    await expect(page.getByText("All Inclusive")).toBeVisible()
    await expect(page.getByText("₹119 per night")).toBeVisible()
    await expect(page.getByText("2 adults, 3 children")).toBeVisible()
    await expect(page.getByText("2 adults, 3 children")).toBeVisible()
    await expect(page.getByText("2 Star Rating")).toBeVisible()
    await expect(page.getByRole('link', { name: "Add hotel" })).toBeVisible()
    await expect(page.getByRole('link', { name: "View Details" })).toBeVisible()

})

test("should edit hotel", async ({ page }) => {

    await page.goto(`${UI_URL}my-hotels`)
    await page.getByRole('link', { name: "View Details" }).click()

    await page.waitForSelector('[name="name"]', { state: "attached" })
    await expect(page.locator('[name="name"]')).toHaveValue("Dublin Getaways")
    await page.locator('[name="name"]').fill("Dublin Getaways UPDATED")

    await page.getByRole("button", { name: "Save" }).click()
    await expect(page.getByText("Hotel updated successfully")).toBeVisible({ timeout: 6000000 })

})