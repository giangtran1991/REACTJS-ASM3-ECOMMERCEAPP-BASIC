import React from "react";

const OtherInfo = () => {
    return (
        <div>
            <div className="other-info">
                <div className="info-item">
                    <h4 className="fst-italic">FREE SHIPPING</h4>
                    <span className="text-muted fst-italic">
                        Free shipping worldwide
                    </span>
                </div>
                <div className="info-item">
                    <h4 className="fst-italic">24 X 7 SERVICE</h4>
                    <span className="text-muted fst-italic">
                        Free shipping worldwide
                    </span>
                </div>
                <div className="info-item">
                    <h4 className="fst-italic">FESTIVAL OFFER</h4>
                    <span className="text-muted fst-italic">
                        Free shipping worldwide
                    </span>
                </div>
            </div>
            <div className="register-form">
                <div className="content fst-italic">
                    <h3>LET'S BE FRIENDS!</h3>
                    <span className="text-muted">
                        Nisi nisi tempor consequat laboris nisi.
                    </span>
                </div>
                <form className="contact-form">
                    <input
                        type="email"
                        className="form-input"
                        placeholder="Enter your email address"
                    />
                    <button
                        type="submit"
                        className="submit-btn bg-dark text-white"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OtherInfo;
