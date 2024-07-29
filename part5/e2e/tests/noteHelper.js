const loginWith = async (page, username, pswrd) => {
  await page.getByRole("button", { name: "login" }).click()
  await page.getByTestId("username").fill(username)
  await page.getByTestId("password").fill(pswrd)
  await page.getByRole("button", { name: "login" }).click()
}

const createNote = async (page, noteContent) => {
  await page.getByRole("button", { name: "add note" }).click()
  await page.getByTestId("note").fill(noteContent)
  await page.getByRole("button", { name: "Add" }).click()
  await page.getByText(noteContent).waitFor()
}

export {
  loginWith,
  createNote
}