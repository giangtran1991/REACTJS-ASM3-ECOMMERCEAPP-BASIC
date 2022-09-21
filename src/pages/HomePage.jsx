import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import Banner from "./../components/Banner";
import CategoriesList from "./../components/CategoriesList";
import Products from "../components/Products";
import OtherInfo from "../components/OtherInfo";
import Popup from "../components/Popup";

const HomePage = () => {
    const { isOpen } = useSelector((store) => store.popup);
    return (
        <React.Fragment>
            {isOpen && <Popup />}
            <Navbar />
            <Banner />
            <CategoriesList />
            <Products />
            <OtherInfo />
            <Footer />
        </React.Fragment>
    );
};

export default HomePage;
