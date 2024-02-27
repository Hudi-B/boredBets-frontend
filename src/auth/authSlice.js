import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    isAdmin: false,
    userId: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action, action2) {
            state.isLoggedIn = true;
            state.isAdmin = action2;
            state.userId = action.payload;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.isAdmin = false;
            state.userId = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;