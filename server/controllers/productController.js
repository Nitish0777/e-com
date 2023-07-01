import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";

export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    //validate
    if (!name || !description || !price || !category || !quantity) {
      return res.status(400).send({
        success: false,
        message: "All fields in Create Product  required",
      });
    }
    if (photo && photo.size > 1000000) {
      return res.status(400).send({
        success: false,
        message: "Image must be less than 1MB",
      });
    }
    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product created successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

export const getProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(10)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalProducts: products.length,
      message: "All products get successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all products",
      error,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    if (!product) {
      return res.status(400).send({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Single product get successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting single product",
      error,
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ _id: req.params.pid })
      .select("photo");
    if (!product) {
      return res.status(400).send({
        success: false,
        message: "Product photo not found",
      });
    }
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting product photo",
      error,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ _id: req.params.pid })
      .select("-photo");
    if (!product) {
      return res.status(400).send({
        success: false,
        message: "Product not found",
      });
    }
    await product.remove();
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting product",
      error,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    //validate
    if (!name || !description || !price || !category || !quantity) {
      return res.status(400).send({
        success: false,
        message: "All fields in update Product  required",
      });
    }
    if (photo && photo.size > 1000000) {
      return res.status(500).send({
        success: false,
        message: "Image must be less than 1MB",
      });
    }
    const products = await productModel.findByIdAndUpdate(
      { _id: req.params.pid },
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product update successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating product",
      error,
    });
  }
};
