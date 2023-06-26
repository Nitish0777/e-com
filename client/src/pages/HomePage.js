import React from "react";
import Layout from "../components/Layout/Layout";

const HomePage = () => {
  return (
    <Layout
      title={"Welcome to P&D Electronics"}
      description={
        "Discover a wide selection of products at our online store. Shop for high-quality items in categories such as electronics, fashion, home decor, and more. Enjoy convenient shopping, fast shipping, and excellent customer service. Start exploring our e-commerce website today!"
      }
      keywords={
        "Online shopping, E-commerce store, Electronics, Fashion, Home decor"
      }
    >
      <h1>Home Page</h1>
    </Layout>
  );
};

export default HomePage;
