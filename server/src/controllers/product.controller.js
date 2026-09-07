import Product from "../models/product.model.js";
import slugify from "slugify";
import fs from "fs";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const { name, category, introduction } = req.body;

    if (!name || !category || !introduction) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.files?.image) {
      return res.status(400).json({ message: "Product image required" });
    }

    if (!req.files?.datasheet) {
      return res.status(400).json({ message: "Datasheet PDF required" });
    }

    let specifications = [];
    if (req.body.specifications) {
      specifications = JSON.parse(req.body.specifications);
    }

    const imagePath = "/" + req.files.image[0].path.replace(/\\/g, "/");

    const datasheetPath = "/" + req.files.datasheet[0].path.replace(/\\/g, "/");

    const slug =
      slugify(name, { lower: true, strict: true }) + "-" + Date.now();

    const product = await Product.create({
      name,
      slug,
      category,
      image: imagePath,
      introduction,
      specifications,
      datasheet: datasheetPath,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};

    if (category) {
      // validate category
      if (!["server", "workstation"].includes(category)) {
        return res.status(400).json({
          success: false,
          message: "Invalid category",
        });
      }

      filter.category = category;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//  Get All Product By Category
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (!["server", "workstation"].includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category",
      });
    }

    const products = await Product.find({ category }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET PRODUCT BY SLUG
export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ slug });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export const getProductBySlug = async (req, res) => {
//   try {
//     const product = await Product.findOne({
//       slug: req.params.slug,
//     });

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.status(200).json({
//       success: true,
//       product,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Product By ID For UPdate Product ------ Get Single Product details by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Edit Product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, introduction, specifications } = req.body;

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    }

    // Dynamic Updating
    existingProduct.name = name || existingProduct.name;
    existingProduct.category = category || existingProduct.category;
    existingProduct.introduction = introduction || existingProduct.introduction;

    if (specifications) {
      existingProduct.specifications =
        typeof specifications === "string"
          ? JSON.parse(specifications)
          : specifications;
    }

    // Handle Image Upload if new file provided
    if (req.files?.image) {
      existingProduct.image = req.files.image[0].path;
    }

    //Handle Datasheet Upload if new file provided
    if (req.files?.datasheet) {
      existingProduct.datasheet = req.files.datasheet[0].path;
    }

    await existingProduct.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Product Updated Successfully",
        product: existingProduct,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Product update failed" });
  }
};
