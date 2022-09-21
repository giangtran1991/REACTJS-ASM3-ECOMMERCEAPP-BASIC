import { createSlice } from "@reduxjs/toolkit";
// Lay du lieu tu localStorage
const currentUser = localStorage.getItem("current-user")
    ? JSON.parse(localStorage.getItem("current-user"))
    : {};
const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
const owner = currentUser.enteredEmail;
const cartOwner = cart.find((cartItem) => cartItem.userEmail === owner) ?? [];
let cartOthers = cart.filter((cartItem) => cartItem.userEmail !== owner) ?? [];
// Set state gio hang cua nguoi dung hien tai
const initialState = {
    userEmail: owner,
    cartItems: cartOwner.cartItems ?? [],
    totalQuantity: cartOwner.totalQuantity ?? 0,
    totalAmount: cartOwner.totalAmount ?? 0,
};
// Tao actions khi them, sua, xoa san pham trong gio hang
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, { payload }) => {
            const newItem = payload.product;
            const isItemExist = state.cartItems.find(
                (item) => item.id === newItem._id.$oid
            );
            if (!isItemExist) {
                state.cartItems.push({
                    id: newItem._id.$oid,
                    name: newItem.name,
                    img: newItem.img1,
                    price: Number(newItem.price),
                    quantity: payload.amount,
                });
            } else {
                state.cartItems = state.cartItems.map((item) => {
                    if (item.id === newItem._id.$oid) {
                        return {
                            ...item,
                            quantity: item.quantity + payload.amount,
                        };
                    } else {
                        return item;
                    }
                });
            }
            state.totalQuantity += payload.amount;
            state.totalAmount += newItem.price * payload.amount;
            updateLS(state);
        },

        removeFromCart: (state, { payload }) => {
            state.cartItems = state.cartItems.filter(
                (item) => item.id !== payload.id
            );
            state.totalQuantity -= payload.quantity;
            state.totalAmount -= payload.price * payload.quantity;
            updateLS(state);
        },

        addItemQuantity: (state, { payload }) => {
            state.cartItems = state.cartItems.map((item) => {
                if (item.id === payload.id) {
                    return { ...item, quantity: item.quantity + 1 };
                } else {
                    return item;
                }
            });
            state.totalQuantity++;
            state.totalAmount += payload.price;
            updateLS(state);
        },

        subtractItemQuantity: (state, { payload }) => {
            const subItem = state.cartItems.find(
                (item) => item.id === payload.id
            );
            if (subItem.quantity === 1) {
                state.cartItems = state.cartItems.filter(
                    (item) => item.id !== subItem.id
                );
            } else {
                subItem.quantity -= 1;
            }
            state.totalQuantity--;
            state.totalAmount -= subItem.price;
            updateLS(state);
        },
    },
});

// Ham update du lieu vao local storage
function updateLS(state) {
    let cartItemArr = [];
    cartItemArr.push({
        userEmail: state.userEmail,
        cartItems: state.cartItems,
        totalQuantity: state.totalQuantity,
        totalAmount: state.totalAmount,
    });
    localStorage.setItem(
        "cart",
        JSON.stringify([...cartOthers, ...cartItemArr])
    );
}

export const {
    addToCart,
    removeFromCart,
    addItemQuantity,
    subtractItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
