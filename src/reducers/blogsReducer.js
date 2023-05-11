import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { notify } from "./notificationReducer";


const blogsSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload;
        },
        appendBlog(state, action) {
            return state.concat(action.payload);
        },
        updateBlog(state, action) {
            const id = action.payload.id;
            return state.map(b => b.id !== id ? b : action.payload);
        },
        removeBlog(state, action) {
            return [...state].filter(b => b.id !== action.payload);
        }
    }
});

export const { setBlogs, appendBlog, updateBlog, removeBlog } = blogsSlice.actions;

export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll();
        dispatch(setBlogs(blogs));
    };
};

export const createBlog = blog => {
    return async dispatch => {
        try {
            const newBlog = await blogService.create(blog);
            dispatch(appendBlog(newBlog));
            dispatch(notify(`a new blog ${newBlog.title} by ${newBlog.author} added`));
        } catch (e) {
            console.log(e);
        }
    };
};

export const likeBlog = blog => {
    return async dispatch => {
        const updatedBlog = await blogService.update(blog.id, {
            ...blog, user: blog.user.id, likes: blog.likes + 1
        });
        dispatch(updateBlog(updatedBlog));
    };
};

export const deleteBlog = id => {
    return async dispatch => {
        await blogService.remove(id);
        dispatch(removeBlog(id));
    };
};

export const makeComment = (id, comment) => {
    return async dispatch => {
        const updatedBlog = await blogService.comment(id, comment);
        dispatch(updateBlog(updatedBlog));
    };
};

export default blogsSlice.reducer;