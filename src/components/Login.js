import { loginUser } from "../reducers/authReducer";
import { useField } from "../hooks";
import { useDispatch } from "react-redux";
import Notification from "./Notification";
import loginService from "../services/login";
import { notify } from "../reducers/notificationReducer";
import { TextField, Button } from "@mui/material";

const Login = () => {
    const dispatch = useDispatch();
    const [username, resetUsername] = useField("text");
    const [password, resetPassword] = useField("password");

    const loginHandler = async event => {
        event.preventDefault();
        try {
            const user = await loginService.login({ username: username.value, password: password.value });
            dispatch(loginUser(user));
            resetUsername();
            resetPassword();
        } catch (e) {
            dispatch(notify("wrong credentials", "error"));
        }

    };

    return (
        <div>
            <h2>Log in to application</h2>
            <Notification />
            <form onSubmit={loginHandler}>
                <div>
                    <TextField
                        id="username"
                        {...username}
                        required
                        label="username"
                        margin="normal"
                    />
                </div>
                <div>
                    <TextField
                        id="password"
                        {...password}
                        type="password"
                        required
                        label="password"
                        margin="normal"
                    />
                </div>
                <Button type="submit">Log In</Button>
            </form>
        </div>
    );
};

export default Login;