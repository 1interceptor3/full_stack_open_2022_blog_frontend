import { useRef } from "react";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import BlogList from "./BlogList";
import { Box } from "@mui/material";

const Home = () => {
    const blogFormRef = useRef();

    return (
        <Box>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm blogFormRef={blogFormRef} />
            </Togglable>
            <BlogList />
        </Box>
    );
};

export default Home;