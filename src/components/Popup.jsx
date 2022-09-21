import { useDispatch, useSelector } from "react-redux";
import { hidePopup } from "./../store/popupSlice";
import { formatPrice } from "../utils/formatPrice";
import { useNavigate } from "react-router-dom";

const Popup = () => {
    const navigate = useNavigate();
    // Ham chuyen trang xem chi tiet san pham
    const handleToDetailPage = (productId) => {
        navigate(`/detail/${productId}`);
        dispatch(hidePopup());
    };
    const dispatch = useDispatch();
    // Lay du lieu san pham tu redux store
    const { productInfo } = useSelector((store) => store.popup);

    return (
        <div className="popup-background">
            <div className="popup-container">
                <div className="title-close-btn">
                    <button
                        onClick={() => {
                            dispatch(hidePopup());
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="row">
                    <div className="col-md-6 d-flex justify-content-center mx-auto product">
                        <img src={productInfo.img1} alt="" />
                    </div>
                    <div className="col-md-6 d-flex flex-column justify-content-center">
                        <h3 className="fst-italic">{productInfo.name}</h3>
                        <h5 className="text-muted fst-italic">
                            {formatPrice(productInfo.price)} VND
                        </h5>

                        <p className="text-muted fst-italic">
                            {productInfo.long_desc}
                        </p>
                        <div className="view-detail-btn">
                            <button
                                onClick={() =>
                                    handleToDetailPage(productInfo._id.$oid)
                                }
                            >
                                <span className="fa fa-shopping-cart"></span>
                                <i> View Details</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Popup;
