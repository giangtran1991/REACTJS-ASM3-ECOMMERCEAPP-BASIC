import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { showPopup } from "../store/popupSlice";
import { formatPrice } from "../utils/formatPrice";
import { API_URL } from "../utils/apiUrl";

const Products = () => {
    const [dataList, setDataList] = useState([]);
    const dispatch = useDispatch();
    const fetchProducts = async () => {
        try {
            const res = await fetch(`${API_URL}`);
            const data = await res.json();
            setDataList(data.slice(0, 8)); // Hien thi toi da 8 san pham
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <div className="products-title">
                <span className="fst-italic text-muted">MADE THE HARD WAY</span>
                <h4 className="fst-italic">TOP TRENDING PRODUCTS</h4>
            </div>
            <div className="products-list">
                {dataList.map((data) => (
                    <div key={data.img1} className="product">
                        <img
                            src={data.img1}
                            className="effective-img"
                            width="274"
                            height="274"
                            alt=""
                            onClick={() => dispatch(showPopup(data))}
                        />
                        <h6 className="fst-italic">{data.name}</h6>
                        <p className="text-muted fst-italic">
                            {formatPrice(data.price)} VND
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
