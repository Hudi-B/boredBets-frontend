import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { apiUrl } from '../boredLocal';

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
            state.wallet = action.payload.wallet
        },
        logout(state) {
            state.isLoggedIn = false;
            state.isAdmin = false;
            state.userId = null;
        },
    },
});

export const { login, logout} = authSlice.actions;
export default authSlice.reducer;