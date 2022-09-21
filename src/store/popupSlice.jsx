import { createSlice } from "@reduxjs/toolkit";
// Set state popup hien thi chi tiet san pham
const initialState = {
    productInfo: {},
    isOpen: false,
};
// Tao actions khi hien thi popup, an popup
const popupSlice = createSlice({
    name: "popup",
    initialState,
    reducers: {
        showPopup: (state, action) => {
            state.isOpen = true;
            state.productInfo = action.payload;
        },
        hidePopup: (state, action) => {
            state.isOpen = false;
        },
    },
});

export const { showPopup, hidePopup } = popupSlice.actions;
export default popupSlice.reducer;
