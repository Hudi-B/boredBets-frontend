import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: null,
    isAdmin: false,
    userId: null,
    username: null,
    wallet: 0,
    imageUrl: null
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
            state.username = action.payload.username
            state.imageUrl = action.payload.imageUrl
        },
        logout(state) {
            state.isLoggedIn = false;
            state.isAdmin = false;
            state.userId = null;
            state.wallet = 0
            state.imageUrl = null
        },
        updateWallet(state, action) {
            state.wallet = action.payload;
        },
        updateProfilePicture(state, action) {
            state.imageUrl = action.payload;
        },
        updateUsername(state, action) {
            state.username = action.payload;
        }
    },
});

export const { login, logout, updateWallet, updateProfilePicture, updateUsername } = authSlice.actions;
export default authSlice.reducer;