import React from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useAppContext } from "../AppProvider";
import { runFireworks } from "../lib/utils";
const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useAppContext();

  React.useEffect(() => {
    localStorage.removeItem("CAE");
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order</h2>
        <p className="email-msg">
          For a follow up on your order, contact us on 03/444333{" "}
        </p>
        <p className="description">
          If you have any questions, please email us on
          <a className="email" href="mailto:example@example.com">
            example@example.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="200px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
