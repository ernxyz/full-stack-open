import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Togglable from "./Togglable"
import Blog from "./Blog"
import { beforeEach, expect, test } from "vitest"

describe("<Togglable />", () => {
  const user = {
    username: "admin",
    name: "Admin",

  }

  const blog = {
    title: "test blog",
    author: user,
    url: "testing-vitest.com",
    likes: 99
  }

  const addLike = () => {
    console.log("liked")
  }

  const deleteBlog = () => {
    console.log("deleted")
  }

  test("renders the blog's title and author, but does not render its URL or number of likes by default", () => {
    const { container } = render(
      <Blog blog={blog} user={user} addLike={addLike} deleteBlog={deleteBlog} />
    )

    const divBlog = container.querySelector(".blog")
    const divToggable = container.querySelector(".hidenContent")

    expect(divBlog).toHaveTextContent(
      "test blog"
    )
    expect(divBlog).toHaveTextContent(
      "Admin"
    )

    expect(divToggable).toHaveStyle("display: none")
  })

  test("screen debug", () => {
    const { container } = render(<Blog blog={blog} user={user} addLike={addLike} deleteBlog={deleteBlog} />)

    screen.debug(container)
  })

  test("blog's URL and number of likes are shown when the button controlling the shown details has been clicked", async () => {
    const mockHandler = vi.fn()

    const { container } = render(
      <Blog blog={blog} user={user} addLike={addLike} deleteBlog={deleteBlog} detailsTest={mockHandler} />
    )

    const targetContent = container.querySelector(".hidenContent")

    const clicker = userEvent.setup()
    const showDetailsBtn = screen.getByText("Details")

    await clicker.click(showDetailsBtn)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(targetContent).toHaveTextContent("testing-vitest.com").and.toHaveTextContent("99")
  })

  test("if the like button is clicked twice, the event handler the component received as props is called twice", async () => {
    const mockHandler = vi.fn()

    const { container } = render(
      <Blog blog={blog} user={user} addLike={mockHandler} deleteBlog={deleteBlog} />
    )

    const clicker = userEvent.setup()
    const showDetailsBtn = screen.getByText("Details")

    await clicker.click(showDetailsBtn)

    const likeBtn = screen.getByText("👍")
    await clicker.dblClick(likeBtn)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})