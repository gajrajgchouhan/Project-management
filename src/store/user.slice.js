import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: localStorage.getItem("user"),
        chatToken: localStorage.getItem("chatToken"),
    },
    reducers: {
        setUser: (state, action) => {
            console.log("reducer called");
            state.user = action.payload;
            // save all keys of state.user
            Object.keys(state.user).forEach((key) => {
                localStorage.setItem(key, state.user[key]);
            });
        },
        logout: (state) => {
            state.user = {};
            localStorage.removeItem("user");
            localStorage.removeItem("chatToken");
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
