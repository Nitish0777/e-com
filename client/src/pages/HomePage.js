import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
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
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default HomePage;
