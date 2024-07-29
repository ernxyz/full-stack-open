// npm run test -- --ui
// npm test -- --project chromium

const { describe, test, expect, beforeEach } = require("@playwright/test")
const { loginWith, createBlog, likeBlog } = require("./blogHelper")

const BLOG_URL = "http://localhost:5173"

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post(`${BLOG_URL}/api/testing/reset`)
    await request.post(`${BLOG_URL}/api/users/`, {
      data: {
        name: "Admin",
        username: "admin",
        password: "admin123",
      }
    })

    await request.post(`${BLOG_URL}/api/users/`, {
      data: {
        name: "Dev",
        username: "dev",
        password: "dev123",
      }
    })
    
    await page.goto(BLOG_URL)
  })

  test("show login form", async ({ page }) => {
    await page.getByRole("button", { name: "Login" }).click()
    await expect(page.getByRole("button", { name: "Log in"})).toBeVisible()
  })

  describe("log in", () => {
    test("wrong credentials", async ({ page }) => {
      await loginWith(page, "admin", "admin12345678")
      await expect(page.getByText("Wrong credentials")).toBeVisible()
    })

    test("successfully", async ({ page }) => {
      await loginWith(page, "admin", "admin123")
      await expect(page.getByText("Hey welcome, Admin")).toBeVisible()
    })

    describe("when logged-in", () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, "admin", "admin123")
      })

      test("a new blog can be created", async ({ page }) => {
        await createBlog(page, "blog by playwright #1", "blog1.com")

        await expect(page.getByText("blog by playwright #1")).toBeVisible()
      })

      test("a blog can be liked", async ({ page }) => {
        await createBlog(page, "blog by playwright #1", "blog1.com")

        const blogToTest = await page.locator(".blog")

        await blogToTest.getByRole("button", { name: "Details" }).click()

        await expect(blogToTest.getByText("Likes: 0")).toBeVisible()
        
        await blogToTest.getByRole("button", { name: "👍" }).click()
        
        await expect(blogToTest.getByText("Likes: 1")).toBeVisible()
      })

      test("a blog can be deleted", async ({ page }) => {
        await createBlog(page, "blog by playwright #1", "blog1.com")

        const blogToTest = await page.locator(".blog")
        await blogToTest.getByRole("button", { name: "Details" }).click()

        page.on("dialog", dialog => dialog.accept())
        await blogToTest.getByRole("button", { name: "🗑️" }).click()

        await expect(blogToTest).not.toBeVisible()
      })

      test("just the user that added the blog can delete it", async ({ page }) => {
        await createBlog(page, "check delete blog", "checkingdelete.com")
        await expect(page.getByText("check delete blog")).toBeVisible()

        await page.getByRole("button", { name: "Logout" }).click()
        await loginWith(page, "dev", "dev123")

        const blogToTest = await page.getByText("check delete blog").locator("..")
        await blogToTest.getByRole("button", { name: "Details" }).click()

        await expect(blogToTest.getByRole("button", { name: "🗑️" })).not.toBeVisible()
      })

      test("most liked blog first", async ({ page }) => {
        await createBlog(page, "blog number one", "bno.com")
        await page.getByText("blog number one").waitFor()
        await createBlog(page, "blog number two", "bnt.com")
        await page.getByText("blog number two").waitFor()

        await likeBlog(page, "blog number two")

        const blogs = await page.locator(".blog").all()

        await expect(blogs[0].getByText("blog number two")).toBeVisible()
        await blogs[0].getByRole("button", { name: "Details"}).click()
        await expect(blogs[0].getByText("Likes: 1")).toBeVisible()

        await expect(blogs[1].getByText("blog number one")).toBeVisible()
        await blogs[1].getByRole("button", { name: "Details"}).click()
        await expect(blogs[1].getByText("Likes: 0")).toBeVisible()
      })
    })
  })
})
