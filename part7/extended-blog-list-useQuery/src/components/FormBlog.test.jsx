import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormBlog from "./FormBlog";
import { beforeEach, expect, test } from "vitest";

describe("<FormBlog />", () => {
  const user = {
    username: "admin",
    name: "Admin",
  };

  const blog = {
    title: "test blog",
    author: user,
    url: "testing-vitest.com",
    likes: 99,
  };

  test("the form calls the event handler it received as props with the right details when a new blog is created", async () => {
    const mockHandler = vi.fn();

    render(<FormBlog addBlog={mockHandler} />);

    const userForEvent = userEvent.setup();
    const titleInput = screen.getByPlaceholderText(
      "what's the title of your blog?",
    );
    const urlInput = screen.getByPlaceholderText(
      "what's the URL of your blog?",
    );
    const addBlogBtn = screen.getByText("Add");

    await userForEvent.type(titleInput, blog.title);
    await userForEvent.type(urlInput, blog.url);
    await userForEvent.click(addBlogBtn);

    expect(mockHandler.mock.calls).toHaveLength(1);
  });
});
