import { useRef } from "react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Notification from "./Notification";
import Togglable from "./Togglable";
import blogService from "../services/blogs";


const BlogList = ({ blogs, user, onLogout, setBlogs, info, notifyWith }) => {
    const blogFormRef = useRef();
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

    const likeHandler = async blog => {
        const updatedBlog = await blogService.update(
            blog.id, { ...blog, user: blog.user.id, likes: blog.likes + 1 }
        );
        setBlogs(prev => prev.map(b => b.id !== blog.id ? b : updatedBlog));
    };

    const createBlog = async blog => {
        try {
            const newBlog = await blogService.create(blog);
            setBlogs(prev => prev.concat(newBlog));
            notifyWith(`a new blog ${blog.title} by ${blog.author} added`);
            blogFormRef.current.toggleVisibility();
        } catch (e) {
            notifyWith(e.response.data.error, "error");
        }
    };

    return(
        <div>
            <h2>blogs</h2>
            <Notification info={info} />
            <p>{user.name} logged in <button onClick={onLogout}>logout</button></p>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm createBlog={createBlog} />
            </Togglable>
            {sortedBlogs.map(b => <Blog key={b.id} blog={b} setBlogs={setBlogs} user={user} onLike={likeHandler} />)}
        </div>
    );
};

export default BlogList;