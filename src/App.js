import { useState, useEffect } from "react";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [info, setInfo] = useState({ message: null });

    const notifyWith = (message, type="info") => {
        setInfo({
            message, type
        });

        setTimeout(() => {
            setInfo({ message: null } );
        }, 3000);
    };

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        );
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const onLoginHandler = async event => {
        event.preventDefault();

        try {
            const user = await loginService.login({ username, password });
            setUser(user);
            window.localStorage.setItem("loggedUser", JSON.stringify(user));
            setUsername("");
            setPassword("");
        } catch (exception) {
            notifyWith("wrong username or password", "error");
        }
    };

    const onLogoutHandler = () => {
        window.localStorage.removeItem("loggedUser");
        blogService.setToken("");
        setUser(null);
    };

    return (
        <div>
            {user === null && <Login
                onLogin={onLoginHandler}
                username={username} setUsername={setUsername}
                password={password} setPassword={setPassword}
                info={info} notifyWith={notifyWith}
            />}
            {user && <BlogList
                blogs={blogs} user={user} onLogout={onLogoutHandler} setBlogs={setBlogs}
                info={info} notifyWith={notifyWith}
            />}
        </div>
    );
};

export default App;