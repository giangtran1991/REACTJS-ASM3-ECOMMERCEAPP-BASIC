import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { Container, Row, Col } from "reactstrap";
import { formatPrice } from "../utils/formatPrice";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductDetail = ({ products, product, id }) => {
    // Lay trang thai nguoi dung tu redux store
    const { isLoggedin } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const [amount, setAmount] = useState(1);
    const [previewImg, setPreviewImg] = useState(product.img1);
    // Lay san pham cung danh muc voi san pham dang xem
    const relatedProduct = products.filter(
        (item) => item.category === product.category && item._id.$oid !== id
    );

    useEffect(() => {
        setPreviewImg(product.img1);
    }, [product]);
    // Ham them san pham vao gio hang
    const handleAddToCart = () => {
        if (!isLoggedin) {
            alert("You must be logged in!");
        } else {
            dispatch(addToCart({ product, amount }));
        }
    };
    // Ham tang, giam so luong san pham dang chon
    const increase = () => {
        setAmount((oldAmount) => {
            let tempAmount = oldAmount + 1;
            return tempAmount;
        });
    };
    const decrease = () => {
        setAmount((oldAmount) => {
            let tempAmount = oldAmount - 1;
            if (tempAmount < 1) {
                tempAmount = 1;
            }
            return tempAmount;
        });
    };

    return (
        <div className="product-detail">
            <section>
                <Container>
                    <Row>
                        <Col lg="2" md="2">
                            <div className="product__images ">
                                <div
                                    className="img__item mb-3"
                                    onClick={() => setPreviewImg(product.img1)}
                                >
                                    <img
                                        src={product.img1}
                                        alt=""
                                        className="w-50"
                                    />
                                </div>
                                <div
                                    className="img__item mb-3"
                                    onClick={() => setPreviewImg(product.img2)}
                                >
                                    <img
                                        src={product.img2}
                                        alt=""
                                        className="w-50"
                                    />
                                </div>

                                <div
                                    className="img__item  mb-3"
                                    onClick={() => setPreviewImg(product.img3)}
                                >
                                    <img
                                        src={product.img3}
                                        alt=""
                                        className="w-50"
                                    />
                                </div>
                                <div
                                    className="img__item"
                                    onClick={() => setPreviewImg(product.img4)}
                                >
                                    <img
                                        src={product.img4}
                                        alt=""
                                        className="w-50"
                                    />
                                </div>
                            </div>
                        </Col>

                        <Col lg="4" md="4">
                            <div className="product__main-img">
                                <img
                                    src={previewImg}
                                    alt=""
                                    className="w-100"
                                />
                            </div>
                        </Col>

                        <Col lg="6" md="6">
                            <div className="single__product-content">
                                <h2 className="fst-italic product__title mb-3">
                                    {product.name}
                                </h2>
                                <h5 className="text-muted fst-italic product__price">
                                    {product.price &&
                                        formatPrice(product.price)}{" "}
                                    VND
                                </h5>
                                <br></br>
                                <p className="text-muted fst-italic">
                                    {product.short_desc}
                                </p>
                                <p className=" fst-italic">
                                    <b>CATEGORY:</b>{" "}
                                    <span className="text-muted fst-italic">
                                        {product.category}
                                    </span>
                                </p>{" "}
                                <div className="add-to-cart-btn">
                                    <p className="text-muted fst-italic">
                                        QUANTITY
                                    </p>
                                    <FontAwesomeIcon
                                        icon={faCaretLeft}
                                        className="icon"
                                        onClick={decrease}
                                    />
                                    <h6>{amount}</h6>
                                    <FontAwesomeIcon
                                        icon={faCaretRight}
                                        className="icon"
                                        onClick={increase}
                                    />
                                    <button
                                        className="fst-italic"
                                        onClick={handleAddToCart}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <br></br>
                    <div>
                        <div className="description">
                            <p className="fst-italic">DESCRIPTION</p>
                        </div>
                        <br></br>
                        <h4 className="fst-italic">PRODUCT DESCRIPTION</h4>
                        <br></br>
                        {product.long_desc && (
                            <p
                                className="text-muted fst-italic"
                                dangerouslySetInnerHTML={{
                                    __html: product.long_desc.replace(
                                        /\n/g,
                                        "<br />"
                                    ),
                                }}
                            />
                        )}
                    </div>
                    <br></br>
                    <h4 className="fst-italic">RELATED PRODUCTS</h4>
                    <div className="col-9">
                        <div className="filter-list">
                            {relatedProduct.map((data) => (
                                <div key={data.img1} className="product">
                                    <img
                                        src={data.img1}
                                        className="effective-img"
                                        width="274"
                                        height="274"
                                        alt=""
                                    />
                                    <h6 className="fst-italic">{data.name}</h6>
                                    <p className="text-muted fst-italic">
                                        {formatPrice(data.price)} VND
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
};

export default ProductDetail;
