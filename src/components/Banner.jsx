import React from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const navigate = useNavigate();
    // Ham chuyen trang ShopPage
    const handleToShopPage = () => {
        navigate("/shop");
    };
    return (
        <div className="banner">
            <div className="text">
                <p className="text-muted">
                    <i>NEW INSPIRATION 2020</i>
                </p>
                <h2>
                    <i>20% OFF ON NEW SEASON</i>
                </h2>
            </div>
            <button
                type="button"
                className="btn btn-dark"
                onClick={handleToShopPage}
            >
                <span className="fst-italic">Browse collections</span>
            </button>
        </div>
    );
};

export default Banner;
