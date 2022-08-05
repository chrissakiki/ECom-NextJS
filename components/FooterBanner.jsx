import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";
const FooterBanner = ({
  footerBanner: { largeText1, desc, product, buttonText, image },
}) => {
  return (
    <div className="footer-banner-container">
      <h1>{largeText1}</h1>
      <div className="banner-desc">
        <p>{desc}</p>
      </div>
      <Link href={`/product/${product}`}>
        <button type="button">{buttonText}</button>
      </Link>

      <img src={urlFor(image)} className="footer-banner-image" />
    </div>
  );
};

export default FooterBanner;
