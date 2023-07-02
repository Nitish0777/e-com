import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.categories);
        toast.success("Product get successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error loading categories");
    }
  };

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-products`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Error in getting all products");
    }
  };

  //handle filters
  const handleFilters = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getAllProducts();
  }, []);

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
      <div className="row mt-3 ">
        <div className="col-md-2">
          <h4 className="text-center">Filter By category </h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                className="pb-2 ps-4"
                onChange={(e) => handleFilters(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Prices </h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio
                    value={p.array}
                    onChange={(e) => handleFilters(e.target.checked, p._id)}
                  >
                    {p.name}
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
        </div>
        <div className="col-md-9">
          {JSON.stringify(radio, null, 4)}
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products.map((product) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/products-photo/${product._id}`}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <button className="btn btn-primary ms-1">Add to Cart</button>
                  <button className="btn btn-secondary ms-1">
                    View Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
