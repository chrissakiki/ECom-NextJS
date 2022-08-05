import React from "react";

import { client } from "../lib/client";
import { Product, FooterBanner, Hero } from "../components";
const Home = ({ productsData, bannerData }) => {
  return (
    <>
      <Hero banner={bannerData.length && (bannerData[2] || bannerData[1])} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Headphones and Speakers of many variations</p>
      </div>
      <div className="products-container">
        {productsData?.map((product) => (
          <React.Fragment key={product._id}>
            <Product product={product} />
          </React.Fragment>
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
      <div className="products-heading">
        <h2>Latest Products</h2>
        <p>Our Latest Headphones and Speakers</p>
      </div>
      <div className="products-container">
        {productsData?.slice(0, 4).map((product) => (
          <React.Fragment key={product._id}>
            <Product product={product} />
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const productsData = await client.fetch(query);
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {
      productsData,
      bannerData,
    },
  };
};

export default Home;
