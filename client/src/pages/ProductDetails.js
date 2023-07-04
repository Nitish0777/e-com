import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-products/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <h1>Product Details</h1>
      <div className="row mt-2">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/products-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height={"400px"}
          />
        </div>
        <div className="col-md-6">
          <h1> Product Details </h1>
          <h2>Name: {product.name} </h2>
          <h2>Price: {product.price} </h2>
          <h2>Description: {product.description} </h2>
          <h2>Category: {product.category?.name} </h2>
          <button class="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
