import { useState } from "react";
import PropTypes from "prop-types";
import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs, user, onLike }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5
    };
    const [showMore, setShowMore] = useState(false);

    const removeHandler = async () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            await blogService.remove(blog.id);
            setBlogs(prev => prev.filter(b => b.id !== blog.id));
        }
    };

    return (
        <div style={blogStyle} className="blog">
            {blog.title} {blog.author} <button onClick={() => setShowMore(!showMore)}>{showMore ? "hide" : "show"}</button>
            {showMore &&
                <div>
                    {blog.url}<br/>
                    likes {blog.likes} <button onClick={() => onLike(blog)}>like</button><br/>
                    {blog.user.name}<br/>
                    {user.username === blog.user.username && <button onClick={removeHandler}>remove</button>}
                </div>
            }
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    setBlogs: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

export default Blog;