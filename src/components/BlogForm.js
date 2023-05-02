import { useState } from "react";


const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const createBlogHandler = event => {
        event.preventDefault();
        createBlog({ title, author, url });

        setTitle("");
        setAuthor("");
        setUrl("");
    };

    return (
        <div>
            <h3>Create new</h3>
            <form onSubmit={createBlogHandler}>
                <div>
                    title
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                        placeholder="Example Title..."
                    />
                </div>
                <div>
                    author
                    <input
                        id="author"
                        type="text"
                        value={author}
                        onChange={event => setAuthor(event.target.value)}
                        placeholder="Nikola Tesla..."
                    />
                </div>
                <div>
                    url
                    <input
                        id="url"
                        type="text"
                        value={url}
                        onChange={event => setUrl(event.target.value)}
                        placeholder="google.com"
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default BlogForm;