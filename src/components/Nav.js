import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/authReducer";
import { AppBar, Button, Toolbar } from "@mui/material";


const Nav = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const onLogoutHandler = () => {
        dispatch(logoutUser());
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Button component={NavLink} color="inherit" to="/" >
                    blogs
                </Button>
                <Button component={NavLink} color="inherit" to="/users" >
                    users
                </Button>
                <em>{user.name} logged in</em>
                <Button color="inherit" onClick={onLogoutHandler}>logout</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Nav;