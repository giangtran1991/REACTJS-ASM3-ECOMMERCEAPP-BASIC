import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onLogout } from "../store/authSlice";

const Navbar = () => {
    const dispatch = useDispatch();
    // Cap nhat trang thai dang nhap va lay du lieu nguoi dung tu redux store
    const { isLoggedin, currentUser } = useSelector((store) => store.auth);
    const { totalQuantity } = useSelector((state) => state.cart);
    const navigate = useNavigate();
    // Xu ly dang xuat
    const logoutHandler = () => {
        dispatch(onLogout(currentUser));
        window.location.reload();
    };

    return (
        <div>
            <nav className="navbar navbar-expand-md justify-content-center">
                <button
                    className="navbar-brand fst-italic"
                    onClick={() => navigate("/")}
                >
                    BOUTIQUE
                </button>
                <div className="navbar-collapse collapse" id="collapsingNavbar">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <button
                                className="nav-link fst-italic"
                                style={{ color: "orange" }}
                                onClick={() => navigate("/")}
                            >
                                Home
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className="nav-link fst-italic"
                                onClick={() => navigate("/shop")}
                            >
                                Shop
                            </button>
                        </li>
                    </ul>
                    <ul className="nav-link navbar-nav ml-auto w-100 justify-content-end">
                        <li className="nav-item">
                            <button
                                className="nav-link"
                                onClick={() => navigate("/cart")}
                            >
                                <span className="fa fa-shopping-cart">
                                    <span className="fst-italic">
                                        Cart{isLoggedin && `(${totalQuantity})`}
                                    </span>
                                </span>
                            </button>
                        </li>
                        {!isLoggedin && (
                            <li className="nav-item">
                                <button
                                    className="nav-link"
                                    onClick={() => navigate("/login")}
                                >
                                    <span className="fa fa-user"></span>
                                    <i>Login</i>
                                </button>
                            </li>
                        )}
                        {isLoggedin && (
                            <li className="nav-item" style={{ margin: "12px" }}>
                                <span className="fa fa-user"></span>
                                <span className="fst-italic">
                                    {currentUser.enteredName}
                                </span>
                                <span className="fa fa-caret-down"></span>
                            </li>
                        )}
                        {isLoggedin && (
                            <li className="nav-item">
                                <button className="nav-link">
                                    <i onClick={logoutHandler}>(Logout)</i>
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
