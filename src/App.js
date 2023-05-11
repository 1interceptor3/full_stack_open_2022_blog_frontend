import { useEffect } from "react";
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import { initBlogs } from "./reducers/blogsReducer";
import { initUser } from "./reducers/authReducer";
import { initUsers } from "./reducers/usersReducer";
import Notification from "./components/Notification";
import { Routes, Route, Navigate, useMatch } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import UserList from "./components/UserList";
import User from "./components/User";
import Blog from "./components/Blog";
import { Container } from "@mui/material";

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const userMatch = useMatch("/users/:id");
    const matchedUser = useSelector(state => {
        if (userMatch) {
            return state.users.find(u => u.id === userMatch.params.id);
        }
        return null;
    });

    const blogMatch = useMatch("/blogs/:id");
    const matchedBlog = useSelector(state => {
        if (blogMatch) {
            return state.blogs.find(b => b.id === blogMatch.params.id);
        }
        return null;
    });

    useEffect(() => {
        dispatch(initBlogs());
        dispatch(initUser());
        dispatch(initUsers());
    }, [dispatch]);

    return (
        <Container>
            { user && <Nav /> }
            <h1>Blogs App</h1>
            <Notification />

            <Routes>
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                <Route path="/users" element={user ? <UserList /> : <Navigate to="/login" />} />
                <Route path="/users/:id" element={user ? <User user={matchedUser} /> : <Navigate to="/login" />} />
                <Route path="/blogs/:id" element={user ? <Blog blog={matchedBlog} /> : <Navigate to="/login" /> } />
                <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            </Routes>
        </Container>
    );
};

export default App;