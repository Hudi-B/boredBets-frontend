import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: null,
    isAdmin: false,
    userId: null,
    wallet: 0
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.isAdmin = action.payload.admin;
            state.userId = action.payload.id;
            state.wallet = action.payload.wallet;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.isAdmin = false;
            state.userId = null;
        },
        updateWallet(state, action) {
            state.wallet = action.payload;
        }
    },
});

export const { login, logout, updateWallet } = authSlice.actions;
export default authSlice.reducer;