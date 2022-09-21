import React from "react";
import Cart from "../components/Cart";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CartPage = () => {
    return (
        <React.Fragment>
            <Navbar />
            <div className="banner-shop">
                <h3 className="banner-item fst-italic">CART</h3>
                <p className="banner-item fst-italic text-muted">CART</p>
            </div>
            <Cart />
            <Footer />
        </React.Fragment>
    );
};

export default CartPage;
