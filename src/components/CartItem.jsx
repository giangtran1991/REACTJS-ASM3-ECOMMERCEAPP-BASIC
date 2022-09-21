import { useDispatch } from "react-redux";
import {
    removeFromCart,
    addItemQuantity,
    subtractItemQuantity,
} from "../store/cartSlice";
import {
    faCaretLeft,
    faCaretRight,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatPrice } from "../utils/formatPrice";

const CartItem = ({ id, name, img, price, quantity }) => {
    const dispatch = useDispatch();
    // Hien thi chi tiet moi san pham trong gio hang
    return (
        <tr className="text-center">
            <td className="pl-0 border-0">
                <div className="media align-items-center justify-content-center">
                    <img src={img} alt="..." width="70" />
                </div>
            </td>
            <td className="align-middle border-0">
                <div className="media align-items-center justify-content-center">
                    {name}
                </div>
            </td>

            <td className="align-middle border-0">
                <p className="mb-0 text-muted small">
                    {formatPrice(price)} VND
                </p>
            </td>
            <td className="align-middle border-0">
                <div className="quantity justify-content-center">
                    <button
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                            dispatch(subtractItemQuantity({ id, price }))
                        }
                    >
                        <FontAwesomeIcon
                            icon={faCaretLeft}
                            className="inc-btn p-0"
                        />
                    </button>
                    <p>{quantity}</p>
                    <button
                        style={{ cursor: "pointer" }}
                        onClick={() => dispatch(addItemQuantity({ id, price }))}
                    >
                        <FontAwesomeIcon
                            icon={faCaretRight}
                            className="inc-btn p-0"
                        />
                    </button>
                </div>
            </td>
            <td className="align-middle border-0">
                <p className="mb-0 text-muted small">
                    {formatPrice(price * quantity)} VND
                </p>
            </td>
            <td className="align-middle border-0">
                <button
                    className="border-0"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                        dispatch(removeFromCart({ id, quantity, price }))
                    }
                >
                    <FontAwesomeIcon
                        icon={faTrashCan}
                        className="icon small text-muted"
                    />
                </button>
            </td>
        </tr>
    );
};

export default CartItem;
