import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShoppingCart,
  AiFillDelete,
} from "react-icons/ai";
import toast from "react-hot-toast";
import { useAppContext } from "../AppProvider";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";
import axios from "axios";

const Cart = () => {
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    removeItem,
  } = useAppContext();
  const cartRef = useRef();

  React.useEffect(() => {
    const close = (e) => {
      if (!cartRef.current.contains(e.target)) {
        setShowCart(false);
      }
    };

    document.addEventListener("mousedown", close);

    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleCheckout = async () => {
    const stripe = await getStripe();

    try {
      const { data } = await axios.post("/api/stripe", { cartItems });
      toast.loading("Redirecting...");
      stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      return Promise.reject(error);
    }
  };
  return (
    <div className="cart-wrapper">
      <div className="cart-container" ref={cartRef}>
        <button
          className="cart-heading"
          type="button"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">( {totalQuantities} items )</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShoppingCart size={100} color="#324d67" />
            <h3>Your Cart is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item?._id}>
                <img
                  src={urlFor(item.image && item.image[0])}
                  alt="Product"
                  className="cart-product-image "
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item?.name}</h5>
                    <h4>${item?.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuantity(item, "decrease")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item?.quantity}</span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuantity(item, "increase")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => removeItem(item)}
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
