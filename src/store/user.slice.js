import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: localStorage.getItem("user"),
    },
    reducers: {
        setUser: (state, action) => {
            console.log("reducer called");
            state.user = action.payload;
            localStorage.setItem("user", action.payload);
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
