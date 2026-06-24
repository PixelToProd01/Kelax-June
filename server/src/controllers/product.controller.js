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

    const imagePath =
      "/" + req.files.image[0].path.replace(/\\/g, "/");

    const datasheetPath =
      "/" + req.files.datasheet[0].path.replace(/\\/g, "/");

    const slug =
      slugify(name, { lower: true, strict: true }) +
      "-" +
      Date.now();

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
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.image) {
      fs.unlinkSync(product.image.substring(1));
    }

    if (product.datasheet) {
      fs.unlinkSync(product.datasheet.substring(1));
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};