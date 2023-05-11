import { useDispatch, useSelector } from "react-redux";
import { useField } from "../hooks";
import { likeBlog, deleteBlog, makeComment } from "../reducers/blogsReducer";

const Blog = ({ blog }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [comment, resetComment] = useField("text");

    const likeHandler = () => {
        dispatch(likeBlog(blog));
    };

    const removeHandler = async () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            dispatch(deleteBlog(blog.id));
        }
    };

    const commentHandler = () => {
        if (comment.value.trim()) {
            dispatch(makeComment(blog.id, comment.value));
            resetComment();
        }
    };

    return (
        <div>
            <h3>{blog.title}</h3>
            <a href={blog.url}>{blog.url}</a>
            <p>{blog.likes} likes <button onClick={likeHandler}>like</button></p>
            <p>added by {blog.user.name}</p>
            {user !== null && user.username === blog.user.username && <button onClick={removeHandler}>remove</button>}
            <div>
                <h4>comments</h4>
                <p><input {...comment} /> <button onClick={commentHandler}>add comment</button></p>
                <ul>
                    {blog.comments.map((c, i) => (
                        <li key={i}>{c}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Blog;