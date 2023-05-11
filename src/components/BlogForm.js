import { useState } from "react";
import { createBlog } from "../reducers/blogsReducer";
import { useDispatch } from "react-redux";
import { TextField, Button, Paper } from "@mui/material";


const BlogForm = ({ blogFormRef }) => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const createBlogHandler = event => {
        event.preventDefault();
        dispatch(createBlog({ title, author, url }));
        blogFormRef.current.toggleVisibility();

        setTitle("");
        setAuthor("");
        setUrl("");
    };

    return (
        <Paper variant="outlined" sx={{ padding: 5 }}>
            <h3>Create new</h3>
            <form onSubmit={createBlogHandler}>
                <TextField
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                    sx={{ mb: 3 }}
                />
                <TextField
                    required
                    fullWidth
                    id="author"
                    label="Author"
                    value={author}
                    onChange={event => setAuthor(event.target.value)}
                    sx={{ mb: 3 }}
                />
                <TextField
                    required
                    fullWidth
                    id="url"
                    label="URL"
                    value={url}
                    onChange={event => setUrl(event.target.value)}
                    sx={{ mb: 3 }}
                />
                <Button type="submit" variant="outlined">create</Button>
                <Button type="button" onClick={() => blogFormRef.current.toggleVisibility()} color="warning">
                    Cancel
                </Button>
            </form>
        </Paper>
    );
};

export default BlogForm;