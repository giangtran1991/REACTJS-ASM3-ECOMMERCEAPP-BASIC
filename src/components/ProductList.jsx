import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { formatPrice } from "../utils/formatPrice";
import { API_URL } from "../utils/apiUrl";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const navigate = useNavigate();
    // Ham chuyen trang Detail Page
    const handleToDetailPage = (productId) => {
        navigate(`/detail/${productId}`);
    };

    const fetchProducts = async () => {
        try {
            const res = await fetch(`${API_URL}`);
            const data = await res.json();
            setProducts(data);
            setFilterList(data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);
    // Ham loc san pham hien thi theo category
    const filterProductsHandler = (category) => {
        if (category !== "") {
            setFilterList(
                products.filter((product) => product.category === category)
            );
        } else {
            setFilterList(products);
        }
    };
    return (
        <div className="product-list">
            <div className="row">
                <h5 className="col-3 fw-bold fst-italic">CATEGORIES</h5>
                <div className="col-3">
                    <input
                        style={{ marginLeft: "0.8vw" }}
                        type="text"
                        placeholder="Enter Search Here!"
                    />
                </div>
                <select
                    className="col-2 selectpicker ml-auto"
                    style={{ marginLeft: "23vw" }}
                >
                    <option value="default">Default sorting</option>
                    <option value="DownToUp">Price: Low to High</option>
                    <option value="UpToDown">Price: High to Low</option>
                </select>
            </div>
            <div className="row">
                <div className="col-3 fst-italic">
                    <p className="category fw-bold bg-dark text-white">APPLE</p>
                    <button
                        className="btn fst-italic text-muted"
                        onClick={() => filterProductsHandler("")}
                    >
                        All
                    </button>
                    <br></br>
                    <p className="category fw-bold">IPHONE & MAC</p>
                    <button
                        className="btn fst-italic text-muted"
                        onClick={() => filterProductsHandler("iphone")}
                    >
                        Iphone
                    </button>
                    <br></br>
                    <button
                        className="btn fst-italic text-muted"
                        onClick={() => filterProductsHandler("ipad")}
                    >
                        Ipad
                    </button>
                    <br></br>
                    <button
                        className="btn fst-italic text-muted"
                        onClick={() => filterProductsHandler("macbook")}
                    >
                        Macbook
                    </button>
                    <br></br>
                    <p className="category fw-bold">WIRELESS</p>
                    <button
                        className="btn fst-italic text-muted"
                        onClick={() => filterProductsHandler("watch")}
                    >
                        Watch
                    </button>
                    <br></br>
                    <button
                        className="btn fst-italic text-muted"
                        onClick={() => filterProductsHandler("airpod")}
                    >
                        Airpod
                    </button>
                    <br></br>
                    <p className="category fw-bold">OTHER</p>
                    <button
                        className="btn fst-italic text-muted"
                        onClick={() => filterProductsHandler("mouse")}
                    >
                        Mouse
                    </button>
                    <br></br>
                    <button
                        className="btn fst-italic text-muted"
                        onClick={() => filterProductsHandler("keyboard")}
                    >
                        Keyboard
                    </button>
                    <br></br>
                    <button
                        className="btn fst-italic text-muted"
                        onClick={() => filterProductsHandler("other")}
                    >
                        Other
                    </button>
                </div>

                <div className="col-9">
                    <div className="filter-list">
                        {filterList.map((data) => (
                            <div key={data.img1} className="product">
                                <img
                                    src={data.img1}
                                    className="effective-img"
                                    width="274"
                                    height="274"
                                    alt=""
                                    onClick={() =>
                                        handleToDetailPage(data._id.$oid)
                                    }
                                />
                                <h6 className="fst-italic">{data.name}</h6>
                                <span className="text-muted fst-italic">
                                    {formatPrice(data.price)} VND
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
