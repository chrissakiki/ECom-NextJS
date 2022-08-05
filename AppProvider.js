import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const values = JSON.parse(localStorage.getItem("CAE"));

    if (values) {
      setCartItems(values.products);
      setTotalQuantities(values.quantity);
      setTotalPrice(values.total);
    }
  }, []);

  useEffect(() => {
    const values = {
      products: cartItems,
      quantity: totalQuantities,
      total: totalPrice,
    };
    cartItems.length > 0 && localStorage.setItem("CAE", JSON.stringify(values));
  }, [cartItems]);

  const AddToCart = (product, quantity) => {
    const alreadyInCart = cartItems.find((item) => item._id === product._id);
    setTotalPrice((totalPrice += product.price * quantity));
    setTotalQuantities((totalQuantities += quantity));

    if (alreadyInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        } else {
          return cartProduct;
        }
      });

      setCartItems(updatedCartItems);
    } else {
      // product.quantity = quantity;
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }
    setQty(1);
    toast.success(`${qty} ${product.name} has been added to your cart`);
    console.log(cartItems);
  };

  const removeItem = (product) => {
    setCartItems(cartItems.filter((item) => item._id !== product._id));
    setTotalQuantities(totalQuantities - product.quantity);
    setTotalPrice(totalPrice - product.price * product.quantity);
  };

  const toggleCartItemQuantity = (product, value) => {
    if (value === "increase") {
      const updatedCartItems = cartItems.map((item) => {
        if (item._id === product._id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        } else {
          return item;
        }
      });
      setCartItems(updatedCartItems);
      setTotalPrice(totalPrice + product.price);
      setTotalQuantities(totalQuantities + 1);
    } else if (value === "decrease") {
      if (product.quantity <= 1) {
        return removeItem(product);
      }
      const updatedCartItems = cartItems.map((item) => {
        if (item._id === product._id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        } else {
          return item;
        }
      });
      setCartItems(updatedCartItems);
      setTotalPrice(totalPrice - product.price);
      setTotalQuantities(totalQuantities - 1);
    }
  };

  const increaseQty = () => {
    setQty(qty + 1);
  };
  const decreaseQty = () => {
    if (qty <= 1) {
      return;
    }
    setQty(qty - 1);
  };

  const initialState = {
    setShowCart,
    showCart,
    setCartItems,
    cartItems,
    setTotalPrice,
    totalPrice,
    setTotalQuantities,
    totalQuantities,
    qty,
    increaseQty,
    decreaseQty,
    AddToCart,
    toggleCartItemQuantity,
    removeItem,
  };
  return (
    <AppContext.Provider value={initialState}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
export default AppProvider;
