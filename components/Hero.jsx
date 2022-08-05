import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";
const Hero = ({ banner }) => {
  return (
    <div className="hero-banner-container">
      <h1>{banner.largeText1}</h1>
      <img
        src={urlFor(banner.image)}
        alt="headphones"
        className="hero-banner-image"
      />

      <div className="desc">
        <p> {banner.desc} </p>
      </div>

      <Link href={`/product/${banner.product}`}>
        <button type="button">{banner.buttonText}</button>
      </Link>
    </div>
  );
};

export default Hero;
