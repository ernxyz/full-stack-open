const loginWith = async (page, username, pswrd) => {
  await page.getByRole("button", { name: "Login" }).click()
  await page.getByTestId("username").fill(username)
  await page.getByTestId("password").fill(pswrd)
  await page.getByRole("button", { name: "Log in" }).click()
}

const createBlog = async (page, blogTitle, blogUrl) => {
  await page.getByRole("button", { name: "add blog" }).click()
  await page.locator("#title").fill(blogTitle)
  await page.locator("#url").fill(blogUrl)
  await page.getByRole("button", { name: "Add" }).click()
}

const likeBlog = async (page, blogTitle) => {
  const blog = await page.getByText(blogTitle).locator("..")
  await blog.getByRole("button", { name: "Details" }).click()
  page.on("dialog", dialog => dialog.accept())
  await blog.getByRole("button", { name: "👍" }).click()
  await blog.getByRole("button", { name: "Hide" }).click()
}

export {
  loginWith,
  createBlog,
  likeBlog
}