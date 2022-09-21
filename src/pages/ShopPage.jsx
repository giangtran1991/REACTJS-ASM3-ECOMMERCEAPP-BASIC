import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";

const ShopPage = () => {
    return (
        <React.Fragment>
            <Navbar />
            <div className="banner-shop">
                <h3 className="banner-item fst-italic">SHOP</h3>
                <p className="banner-item fst-italic text-muted">SHOP</p>
            </div>
            <ProductList />
            <Footer />
        </React.Fragment>
    );
};

export default ShopPage;
