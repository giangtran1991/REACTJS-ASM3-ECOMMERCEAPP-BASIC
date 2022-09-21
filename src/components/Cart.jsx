import { React } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
    faLongArrowAltLeft,
    faLongArrowAltRight,
    faGift,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatPrice } from "../utils/formatPrice";
import CartItem from "./CartItem";

const Cart = () => {
    // Lay du lieu gio hang tu redux store
    const { cartItems, totalQuantity, totalAmount } = useSelector(
        (state) => state.cart
    );
    // Cap nhat trang thai nguoi dung tu redux store
    const { isLoggedin } = useSelector((store) => store.auth);

    const navigate = useNavigate();
    // Ham chuyen trang checkout
    const checkoutHandler = () => {
        if (!isLoggedin) {
            alert("You must be logged in!");
            return;
        } else {
            navigate("/checkout");
        }
    };
    // Giao dien trang Cart khi khong co san pham trong gio hang
    if (totalQuantity === 0) {
        return (
            <div className="no-items">
                <h2 className=" fst-italic">No items in cart...</h2>
                <NavLink
                    className="btn p-0 text-dark btn-sm fst-italic"
                    to={`/shop`}
                >
                    Continue shopping
                </NavLink>
            </div>
        );
    }

    return (
        <div className="cart fst-italic">
            <section className="py-5">
                <h2 className="h5 text-uppercase mb-4">Shopping cart</h2>
                <div className="row">
                    <div className="col-lg-8 mb-4 mb-lg-0">
                        <div className="table-responsive mb-4">
                            <table className="table">
                                <thead className="bg-light">
                                    <tr className="text-center">
                                        <th className="border-0" scope="col">
                                            {" "}
                                            <p className="text-small text-uppercase">
                                                Image
                                            </p>
                                        </th>
                                        <th className="border-0" scope="col">
                                            {" "}
                                            <p className="text-small text-uppercase">
                                                Product
                                            </p>
                                        </th>
                                        <th className="border-0" scope="col">
                                            {" "}
                                            <p className="text-small text-uppercase">
                                                Price
                                            </p>
                                        </th>
                                        <th className="border-0" scope="col">
                                            {" "}
                                            <p className="text-small text-uppercase">
                                                Quantity
                                            </p>
                                        </th>
                                        <th className="border-0" scope="col">
                                            {" "}
                                            <p className="text-small text-uppercase">
                                                Total
                                            </p>
                                        </th>
                                        <th className="border-0" scope="col">
                                            {" "}
                                            <p className="text-small text-uppercase">
                                                Remove
                                            </p>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <CartItem
                                            key={item.id}
                                            {...item}
                                            // id={item.id}
                                            // name={item.name}
                                            // img={item.img}
                                            // price={item.price}
                                            // quantity={item.quantity}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-light px-4 py-3">
                            <div className="row align-items-center text-center ">
                                <div className="col-md-6 mb-3 mb-md-0 text-md-left">
                                    <NavLink
                                        className="btn p-0 text-dark btn-sm"
                                        to={`/shop`}
                                    >
                                        <FontAwesomeIcon
                                            icon={faLongArrowAltLeft}
                                            className="inc-btn p-0 ml-2"
                                        />
                                        Continue shopping
                                    </NavLink>
                                </div>
                                <div className="col-md-6 text-md-right">
                                    <span
                                        className="btn btn-outline-dark btn-sm"
                                        onClick={checkoutHandler}
                                    >
                                        Proceed to checkout{" "}
                                        <FontAwesomeIcon
                                            icon={faLongArrowAltRight}
                                            className="inc-btn p-0 ml-2"
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card border-0 rounded-0 p-lg-4 bg-light">
                            <div className="card-body">
                                <h5 className="text-uppercase mb-4">
                                    Cart total
                                </h5>
                                <ul className="list-unstyled mb-0">
                                    <li className="d-flex align-items-center justify-content-between">
                                        <p className="text-uppercase small font-weight-bold">
                                            Subtotal
                                        </p>
                                        <span className="text-muted small">
                                            {formatPrice(totalAmount)} VND
                                        </span>
                                    </li>
                                    <li className="border-bottom my-2"></li>
                                    <li className="d-flex align-items-center justify-content-between mb-4">
                                        <p className="text-uppercase small font-weight-bold">
                                            Total
                                        </p>
                                        <span>
                                            {formatPrice(totalAmount)} VND
                                        </span>
                                    </li>
                                </ul>
                                <div className="coupon">
                                    <input placeholder="Enter your coupon"></input>
                                    <button className="bg-dark text-white">
                                        <FontAwesomeIcon
                                            icon={faGift}
                                            className="inc-btn p-0 ml-2"
                                        />{" "}
                                        Apply coupon
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Cart;
