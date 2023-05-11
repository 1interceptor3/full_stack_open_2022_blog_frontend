import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const authSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        loginUser(state, action) {
            window.localStorage.setItem("loggedUser", JSON.stringify(action.payload));
            return action.payload;
        },
        logoutUser() {
            window.localStorage.removeItem("loggedUser");
            blogService.setToken("");
            return null;
        },
        setUser(state, action) {
            blogService.setToken(action.payload.token);
            return action.payload;
        }
    }
});

export const { loginUser, logoutUser, setUser } = authSlice.actions;

export const initUser = () => {
    return dispatch => {
        const loggedUserJSON = window.localStorage.getItem("loggedUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(setUser(user));
        }
    };
};

export default authSlice.reducer;