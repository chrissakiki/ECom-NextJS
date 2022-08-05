import React from "react";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Cart } from "./";
import { useAppContext } from "../AppProvider";
import MainLogo from "../assets/images/logo.png";
import Image from "next/image";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useAppContext();
  return (
    <div className="navbar-container">
      <Link href="/">
        <div className="logo-container">
          <Image src={MainLogo} alt="logo" width={38} height={36} />
          <p className="logo">3 Store</p>
        </div>
      </Link>

      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShoppingCart />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
