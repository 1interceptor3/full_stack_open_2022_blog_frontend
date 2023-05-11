import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const usersSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        setUsers(state, action) {
            return action.payload;
        }
    }
});

export const { setUsers } = usersSlice.actions;

export const initUsers = () => {
    return async dispatch => {
        const users = await userService.getALl();
        dispatch(setUsers(users));
    };
};

export default usersSlice.reducer;