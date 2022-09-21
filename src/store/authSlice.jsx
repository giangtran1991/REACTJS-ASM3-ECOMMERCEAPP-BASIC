import { createSlice } from "@reduxjs/toolkit";
// Set state du lieu nguoi dung hien tai
const initialState = {
    currentUser: localStorage.getItem("current-user")
        ? JSON.parse(localStorage.getItem("current-user"))
        : {},
    isLoggedin: localStorage.getItem("current-user") ? true : false,
};
// Tao actions khi login, logout
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        onLogin: (state, action) => {
            state.isLoggedin = true;
            state.currentUser = action.payload;
            localStorage.setItem(
                "current-user",
                JSON.stringify(state.currentUser)
            );
        },
        onLogout: (state, action) => {
            state.isLoggedin = false;
            state.currentUser = action.payload;
            localStorage.removeItem("current-user");
        },
    },
});

export const { onLogin, onLogout } = authSlice.actions;

export default authSlice.reducer;
