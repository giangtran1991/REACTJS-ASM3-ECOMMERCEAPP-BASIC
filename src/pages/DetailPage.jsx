import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";
import { API_URL } from "../utils/apiUrl";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const DetailPage = () => {
    // Lay id cua san pham de hien thi
    const { productId } = useParams();
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState("");

    const fetchProducts = useCallback(async () => {
        try {
            const res = await fetch(`${API_URL}`);
            const data = await res.json();
            setProducts(data);
            setProduct(data.find((product) => product._id.$oid === productId));
        } catch (error) {
            console.error(error);
        }
    }, [productId]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <React.Fragment>
            <Navbar />
            <ProductDetail
                products={products}
                product={product}
                id={productId}
            />
            <Footer />
        </React.Fragment>
    );
};

export default DetailPage;
