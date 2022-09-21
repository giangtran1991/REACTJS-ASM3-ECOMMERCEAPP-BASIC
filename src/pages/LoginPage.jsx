import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/use-input";
import { onLogin } from "../store/authSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

let currentUser;

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Ham chuyen trang HomePage
    const handleToHomePage = () => {
        navigate("/");
    };
    // Validate du lieu nhap vao
    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputIsInValid,
        valueChangeHandler: emailInputChangeHandler,
        inputBlurHandler: emailInputBlurHandler,
    } = useInput((value) =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            String(value).toLowerCase()
        )
    );

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: passwordInputIsInValid,
        valueChangeHandler: passwordInputChangeHandler,
        inputBlurHandler: passwordInputBlurHandler,
        reset: resetPasswordInput,
    } = useInput((value) => value.trim() !== "");

    let formIsValid = false;

    if (enteredEmailIsValid && enteredPasswordIsValid) {
        formIsValid = true;
    }
    // Ham xu ly dang nhap
    const loginHandler = (e) => {
        e.preventDefault();

        if (!enteredEmailIsValid || !enteredPasswordIsValid) {
            return;
        }

        // Lay du lieu danh sach tai khoan tu localStorage
        const userArr = JSON.parse(localStorage.getItem("user-arr")) || [];
        // Neu du lieu hop le tim kiem xem email va mat khau co trong he thong chua
        currentUser = userArr.find(
            (user) =>
                user.enteredEmail === enteredEmail &&
                user.enteredPassword === enteredPassword
        );
        if (currentUser) {
            dispatch(onLogin(currentUser));
            handleToHomePage();
            window.location.reload();
            // Neu thong tin khong khop bao loi cho nguoi dung
        } else {
            resetPasswordInput();
            alert(
                "Login fail, please input exactly your username and password"
            );
        }
    };
    // Hien thi loi khi nguoi dung nhap sai
    const emailInputClasses = emailInputIsInValid
        ? "form-control invalid"
        : "form-control";

    const passwordInputClasses = passwordInputIsInValid
        ? "form-control invalid"
        : "form-control";

    return (
        <React.Fragment>
            <Navbar />
            <div className="register">
                <div
                    className="signup-form "
                    style={{ paddingBottom: "100px", paddingTop: "100px" }}
                >
                    <form onSubmit={loginHandler}>
                        <h2 className="fst-italic">Sign In</h2>
                        <div className={emailInputClasses}>
                            <input
                                type="text"
                                id="email"
                                onChange={emailInputChangeHandler}
                                onBlur={emailInputBlurHandler}
                                value={enteredEmail}
                                placeholder="Email"
                            />
                        </div>
                        {emailInputIsInValid && (
                            <p className="error-text">Please enter an email</p>
                        )}
                        <div className={passwordInputClasses}>
                            <input
                                type="password"
                                id="password"
                                onChange={passwordInputChangeHandler}
                                onBlur={passwordInputBlurHandler}
                                value={enteredPassword}
                                placeholder="Password"
                            />
                        </div>
                        {passwordInputIsInValid && (
                            <p className="error-text">
                                Please enter a password
                            </p>
                        )}
                        <button className="btn-signup" disabled={!formIsValid}>
                            SIGN IN
                        </button>
                        <div className="text-center fst-italic">
                            Create an account?
                            <NavLink
                                to="/register"
                                style={{ textDecoration: "none" }}
                            >
                                {" "}
                                Sign up
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
};

export default LoginPage;
