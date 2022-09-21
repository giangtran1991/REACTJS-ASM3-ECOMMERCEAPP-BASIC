import React from "react";
import { useSelector } from "react-redux";
import useInput from "../hooks/use-input";
import { formatPrice } from "../utils/formatPrice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CheckoutPage = () => {
    // Lay du lieu gio hang tu redux store
    const { cartItems, totalAmount } = useSelector((state) => state.cart);
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
    } = useInput((value) =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            String(value).toLowerCase()
        )
    );

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

    const {
        value: enteredAddress,
        isValid: enteredAddressIsValid,
        hasError: addressInputIsInValid,
        valueChangeHandler: addressInputChangeHandler,
        inputBlurHandler: addressInputBlurHandler,
        reset: resetAddressInput,
    } = useInput((value) => value.trim() !== "" && value.length >= 20);

    let formIsValid = false;

    if (
        enteredNameIsValid &&
        enteredEmailIsValid &&
        enteredAddressIsValid &&
        enteredPhoneIsValid
    ) {
        formIsValid = true;
    }
    // Ham submit du lieu
    const formSubmissionHandler = (e) => {
        e.preventDefault();

        if (
            !enteredNameIsValid ||
            !enteredEmailIsValid ||
            !enteredAddressIsValid ||
            !enteredPhoneIsValid
        ) {
            return;
        }
        resetNameInput();
        resetEmailInput();
        resetAddressInput();
        resetPhoneInput();
        alert("Your order is successfully!");
    };

    return (
        <React.Fragment>
            <Navbar />
            <div className="banner-checkout">
                <h3 className="banner-item-left fst-italic">CHECKOUT</h3>
                <p className="banner-item-right fst-italic">
                    HOME / CART / <span className="text-muted">CHECKOUT</span>
                </p>
            </div>
            <div className="checkout fst-italic">
                <section className="py-5">
                    <h2 className="h5 text-uppercase mb-4">Billing details</h2>
                    <div className="row">
                        <div className="col-lg-8">
                            <form onSubmit={formSubmissionHandler}>
                                <div className="row">
                                    <div className="col-lg-12 form-group">
                                        <label
                                            className="text-small text-uppercase text-muted"
                                            htmlFor="Fullname"
                                        >
                                            Full Name:{" "}
                                        </label>
                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            id="name"
                                            onChange={nameChangeHandler}
                                            onBlur={nameBlurHandler}
                                            value={enteredName}
                                            placeholder="Enter Your Full Name Here!"
                                        />
                                        {nameInputHasError && (
                                            <p className="error-text">
                                                Name must not be empty
                                            </p>
                                        )}
                                    </div>
                                    <div className="col-lg-12 form-group">
                                        <label
                                            className="text-small text-uppercase  text-muted"
                                            htmlFor="Email"
                                        >
                                            Email:{" "}
                                        </label>
                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            id="email"
                                            onChange={emailInputChangeHandler}
                                            onBlur={emailInputBlurHandler}
                                            value={enteredEmail}
                                            placeholder="Enter Your Email Here!"
                                        />
                                        {emailInputIsInValid && (
                                            <p className="error-text">
                                                Please enter a valid email
                                            </p>
                                        )}
                                    </div>
                                    <div className="col-lg-12 form-group">
                                        <label
                                            className="text-small text-uppercase  text-muted"
                                            htmlFor="Phone"
                                        >
                                            Phone Number:{" "}
                                        </label>
                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            id="phone"
                                            onChange={phoneInputChangeHandler}
                                            onBlur={phoneInputBlurHandler}
                                            value={enteredPhone}
                                            placeholder="Enter Your Phone Number Here!"
                                        />
                                        {phoneInputIsInValid && (
                                            <p className="error-text">
                                                Please enter a valid phone
                                            </p>
                                        )}
                                    </div>
                                    <div className="col-lg-12 form-group">
                                        <label
                                            className="text-small text-uppercase  text-muted"
                                            htmlFor="Address"
                                        >
                                            Address:{" "}
                                        </label>
                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            id="address"
                                            onChange={addressInputChangeHandler}
                                            onBlur={addressInputBlurHandler}
                                            value={enteredAddress}
                                            placeholder="Enter Your Address Here!"
                                        />
                                        {addressInputIsInValid && (
                                            <p className="error-text">
                                                * Please Check Your Address!
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        className=" btn-order fst-italic"
                                        disabled={!formIsValid}
                                    >
                                        Place order
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-4">
                            <div className="card border-0 rounded-0 p-lg-4 bg-light">
                                <div className="card-body">
                                    <h5 className="text-uppercase mb-4">
                                        Your order
                                    </h5>
                                    <ul className="list-unstyled mb-0">
                                        {cartItems &&
                                            cartItems.map((item) => (
                                                <div key={item.id}>
                                                    <li className="d-flex align-items-center justify-content-between">
                                                        <strong
                                                            className="small font-weight-bold"
                                                            style={{
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            {item.name}
                                                        </strong>
                                                        <br></br>
                                                        <span
                                                            className="text-muted small"
                                                            style={{
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            {formatPrice(
                                                                item.price
                                                            )}{" "}
                                                            VND x{" "}
                                                            {item.quantity}
                                                        </span>
                                                    </li>
                                                    <li className="border-bottom my-2"></li>
                                                </div>
                                            ))}
                                        <li className="d-flex align-items-center justify-content-between">
                                            <strong className="text-uppercase small font-weight-bold">
                                                Total
                                            </strong>
                                            <span>
                                                {formatPrice(totalAmount)} VND
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </React.Fragment>
    );
};

export default CheckoutPage;
