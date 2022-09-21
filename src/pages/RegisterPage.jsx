import React from "react";
import useInput from "../hooks/use-input";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// Lay du lieu danh sach tai khoan tu localStorage
const userArr = JSON.parse(localStorage.getItem("user-arr")) || [];

const RegisterPage = () => {
    const navigate = useNavigate();
    // Ham chuyen trang Login
    const handleToLoginPage = () => {
        navigate("/login");
    };
    // Kiem tra email da dang ky truoc do chua
    const emailIsNotRegistered = (email) => {
        for (let i = 0; i < userArr.length; i++) {
            if (email === userArr[i].enteredEmail) {
                return false;
            }
        }
        return true;
    };
    // Validate du lieu nhap vao
    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetNameInput,
    } = useInput((value) => value.trim() !== "");

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputIsInValid,
        valueChangeHandler: emailInputChangeHandler,
        inputBlurHandler: emailInputBlurHandler,
        reset: resetEmailInput,
    } = useInput(
        (value) =>
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                String(value).toLowerCase()
            ) && emailIsNotRegistered(value)
    );

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: passwordInputIsInValid,
        valueChangeHandler: passwordInputChangeHandler,
        inputBlurHandler: passwordInputBlurHandler,
        reset: resetPasswordInput,
    } = useInput((value) => value.length >= 8);

    const {
        value: enteredPhone,
        isValid: enteredPhoneIsValid,
        hasError: phoneInputIsInValid,
        valueChangeHandler: phoneInputChangeHandler,
        inputBlurHandler: phoneInputBlurHandler,
        reset: resetPhoneInput,
    } = useInput(
        (value) => new RegExp(/^[0-9\b]+$/).test(value) && value.length === 10
    );

    let formIsValid = false;

    if (
        enteredNameIsValid &&
        enteredEmailIsValid &&
        enteredPasswordIsValid &&
        enteredPhoneIsValid
    ) {
        formIsValid = true;
    }
    // Ham xu ly dang ki
    const formSubmissionHandler = (e) => {
        e.preventDefault();

        if (
            !enteredNameIsValid ||
            !enteredEmailIsValid ||
            !enteredPasswordIsValid ||
            !enteredPhoneIsValid
        ) {
            return;
        }
        const user = {
            enteredName,
            enteredEmail,
            enteredPassword,
            enteredPhone,
        };
        // Them user moi vao he thong
        userArr.push(user);
        // Cap nhat du lieu vao localStorage
        localStorage.setItem("user-arr", JSON.stringify(userArr));
        resetNameInput();
        resetEmailInput();
        resetPasswordInput();
        resetPhoneInput();
        // Chuyen trang Login
        handleToLoginPage();
    };
    // Hien thi loi khi nguoi dung nhap sai
    const nameInputClasses = nameInputHasError
        ? "form-control invalid"
        : "form-control";

    const emailInputClasses = emailInputIsInValid
        ? "form-control invalid"
        : "form-control";

    const passwordInputClasses = passwordInputIsInValid
        ? "form-control invalid"
        : "form-control";

    const phoneInputClasses = phoneInputIsInValid
        ? "form-control invalid"
        : "form-control";

    return (
        <React.Fragment>
            <Navbar />
            <div className="register">
                <div className="signup-form">
                    <form onSubmit={formSubmissionHandler}>
                        <h2 className="fst-italic">Sign Up</h2>
                        <div className={nameInputClasses}>
                            <input
                                type="text"
                                id="name"
                                onChange={nameChangeHandler}
                                onBlur={nameBlurHandler}
                                value={enteredName}
                                placeholder="Full Name"
                            />
                        </div>
                        {nameInputHasError && (
                            <p className="error-text">Name must not be empty</p>
                        )}
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
                            <p className="error-text">
                                Please enter a valid email
                            </p>
                        )}
                        {!emailIsNotRegistered(enteredEmail) && (
                            <p className="error-text">Your email is exists!</p>
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
                                Password must more than 8 characters.
                            </p>
                        )}

                        <div className={phoneInputClasses}>
                            <input
                                type="text"
                                id="phone"
                                onChange={phoneInputChangeHandler}
                                onBlur={phoneInputBlurHandler}
                                value={enteredPhone}
                                placeholder="Phone"
                            />
                        </div>
                        {phoneInputIsInValid && (
                            <p className="error-text">
                                Please enter a valid phone
                            </p>
                        )}
                        <button className="btn-signup" disabled={!formIsValid}>
                            SIGN UP
                        </button>

                        <div className="text-center fst-italic">
                            Login?
                            <NavLink
                                to="/login"
                                style={{ textDecoration: "none" }}
                            >
                                {" "}
                                Click
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
};

export default RegisterPage;
