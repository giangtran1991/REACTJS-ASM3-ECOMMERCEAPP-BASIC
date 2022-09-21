import popupReducer from "./popupSlice";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        popup: popupReducer,
        auth: authReducer,
        cart: cartReducer,
    },
});
