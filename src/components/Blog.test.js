import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import BlogForm from "./BlogForm";


const blog = {
    id: "12345",
    title: "Testing blog",
    author: "Myself",
    url: "http://localhost",
    likes: 0,
    user: {
        username: "root"
    }
};

const user = {
    username: "root",
};

test("Blog component renders title and author only", () => {
    const mockSetBlogsHandler = jest.fn();
    const mockOnLikeHandler = jest.fn();

    render(<Blog blog={blog} setBlogs={mockSetBlogsHandler} user={user} onLike={mockOnLikeHandler} />);

    const title = screen.getByText("Testing blog", { exact: false });
    expect(title).toBeDefined();

    const author = screen.getByText("Myself", { exact: false });
    expect(author).toBeDefined();

    const url = screen.queryByText(blog.url);
    expect(url).toBeNull();

    const likes = screen.queryByText("likes");
    expect(likes).toBeNull();
});

test("URL and number of likes are shown when the button has been clicked", async () => {
    const mockSetBlogsHandler = jest.fn();
    const mockOnLikeHandler = jest.fn();

    render(<Blog user={user} blog={blog} setBlogs={mockSetBlogsHandler} onLike={mockOnLikeHandler} />);

    const usr = userEvent.setup();
    const button = screen.getByText("show");
    await usr.click(button);

    const likes = screen.getByText("likes", { exact: false });
    expect(likes).toBeDefined();

    const url = screen.getByText(blog.url, { exact: false });
    expect(url).toBeDefined();
});

test("Ensures if the like button clicked twice event handler calls twice", async () => {
    const mockSetBlogsHandler = jest.fn();
    const mockOnLikeHandler = jest.fn();

    render(<Blog user={user} blog={blog} setBlogs={mockSetBlogsHandler} onLike={mockOnLikeHandler} />);

    const usr = userEvent.setup();
    const showButton = screen.getByText("show");
    await usr.click(showButton);

    const likeButton = screen.getByText("like");
    await usr.click(likeButton);
    await usr.click(likeButton);
    expect(mockOnLikeHandler.mock.calls).toHaveLength(2);
});

test("The blog form calls the event handler it received with the right details", async () => {
    const createBlog = jest.fn();
    const usr = userEvent.setup();

    render(<BlogForm createBlog={createBlog} />);

    const title = screen.getByPlaceholderText("Example Title...");
    const author = screen.getByPlaceholderText("Nikola Tesla...");
    const url = screen.getByPlaceholderText("google.com");
    const sendButton = screen.getByText("create");

    await usr.type(title, "Blog by Test");
    await usr.type(author, "Jest");
    await usr.type(url, "https://jestjs.io");
    await usr.click(sendButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0]).toEqual({ title: "Blog by Test", author: "Jest", url: "https://jestjs.io" });
});