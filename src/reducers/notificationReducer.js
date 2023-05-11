import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: { message: null },
    reducers: {
        setNotification(state, action) {
            return action.payload;
        },
        resetNotification() {
            return { message: null };
        }
    }
});

export const { setNotification, resetNotification } = notificationSlice.actions;

export const notify = (message, type = "info") => {
    return dispatch => {
        dispatch(setNotification({ message, type }));
        setTimeout(() => dispatch(resetNotification()), 3000);
    };
};

export default notificationSlice.reducer;