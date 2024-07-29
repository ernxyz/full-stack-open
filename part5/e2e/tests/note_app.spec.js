const { test, describe, expect, beforeEach } = require("@playwright/test")
const { loginWith, createNote } = require("./noteHelper")

// npm test -- --project chromium
// npm test -- --ui

const BLOG_APP_URL = "/"
const BACK_END_APP_URL = "/api"

describe("Note app", () => {

  beforeEach(async ({ page, request }) => {
    await request.post(`${BACK_END_APP_URL}/testing/reset`)
    await request.post(`${BACK_END_APP_URL}/users`, {
      data: {
        name: "Administrador",
        username: "admin",
        password: "admin123",
      }
    })

    await page.goto(BLOG_APP_URL)
  })

  test("front page can be opened", async ({ page }) => {
    const locator = await page.getByText("Notes")
    await expect(locator).toBeVisible()
    await expect(page.getByText("Note app, Ernesto Colmenares")).toBeVisible()
  })

  test("log in form can be opened", async ({ page }) => {
    loginWith(page, "admin", "admin123")

    await expect(page.getByText("Administrador logged-in")).toBeVisible()
  })

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      loginWith(page, "admin", "admin123")
    })

    test("a new note can be created", async ({ page }) => {
      createNote(page, "new note by playwright")
      await expect(page.getByText("new note by playwright")).toBeVisible()
    })

    describe("and several notes exists", () => {
      beforeEach(async ({ page }) => {
        createNote(page, "several notes #1")
        createNote(page, "several notes #2")
        createNote(page, "several notes #3")
      })

      test("a note's importance can be changed", async ({ page }) => {
        // await page.pause()
        const otherNoteText = await page.getByText("several notes #2")
        const otherNoteElement = await otherNoteText.locator("..")

        await otherNoteElement
          .getByRole("button", { name: "make not important" }).click()

        await expect(otherNoteElement.getByText("make important")).toBeVisible()
      })
    })
  })

  test("failed login attemp", async ({ page }) => {
    loginWith(page, "admin", "12345678")

    const errorDiv = await page.locator(".error")
    await expect(errorDiv).toContainText("wrong credentials")
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('background-color', 'rgb(255, 99, 71)')
    await expect(page.getByText("Administrador logged-in")).not.toBeVisible()
  })
})