import React from "react";
import { useNavigate } from "react-router-dom";
import product_1 from "./../assets/product_1.png";
import product_2 from "./../assets/product_2.png";
import product_3 from "./../assets/product_3.png";
import product_4 from "./../assets/product_4.png";
import product_5 from "./../assets/product_5.png";

const CategoriesList = () => {
    const navigate = useNavigate();
    // Ham chuyen trang ShopPage
    const handleToShopPage = () => {
        navigate("/shop");
    };
    return (
        <div className="categories-list">
            <div className="text-md-center">
                <span className="text-muted fst-italic">
                    CAREFULLY CREATED COLLECTIONS
                </span>
                <h4 className="fst-italic">BROWSE OUR CATEGORIES</h4>
            </div>
            <div className="text-md-center">
                <img
                    src={product_1}
                    className="effective-img"
                    alt=""
                    width="548"
                    height="325"
                    onClick={handleToShopPage}
                />
                <img
                    src={product_2}
                    className="effective-img"
                    alt=""
                    width="548"
                    height="325"
                    onClick={handleToShopPage}
                />
                <img
                    src={product_3}
                    className="effective-img"
                    alt=""
                    width="364"
                    height="325"
                    onClick={handleToShopPage}
                />
                <img
                    src={product_4}
                    className="effective-img"
                    alt=""
                    width="364"
                    height="325"
                    onClick={handleToShopPage}
                />
                <img
                    src={product_5}
                    className="effective-img"
                    alt=""
                    width="364"
                    height="325"
                    onClick={handleToShopPage}
                />
            </div>
        </div>
    );
};

export default CategoriesList;
