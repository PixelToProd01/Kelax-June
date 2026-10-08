import Product from "../models/product.model.js";
import slugify from "slugify";
import fs from "fs";
import path from "path";

// ============================================================
// DELETE OLD PRODUCT FILE
// ============================================================
const deleteUploadedFile = (fileUrl) => {
  try {
    if (!fileUrl) return;

    /*
      DB example:
      /uploads/products/server/images/old.jpg

      Convert to:
      uploads/products/server/images/old.jpg
    */

    const relativePath = fileUrl.replace(/^\/+/, "").replace(/\//g, path.sep);

    const filePath = path.resolve(relativePath);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);

      console.log("Old file deleted:", filePath);
    } else {
      console.log("Old file not found:", filePath);
    }
  } catch (error) {
    console.error("Old file deletion failed:", error.message);
  }
};

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

// ================= DELETE PRODUCT =================
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find product first
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ==========================================
    // DELETE PRODUCT IMAGE FROM SERVER
    // ==========================================
    if (product.image) {
      deleteUploadedFile(product.image);
    }

    // ==========================================
    // DELETE PRODUCT DATASHEET FROM SERVER
    // ==========================================
    if (product.datasheet) {
      deleteUploadedFile(product.datasheet);
    }

    // ==========================================
    // DELETE PRODUCT FROM DATABASE
    // ==========================================
    await product.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Product, image and datasheet deleted successfully",
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    return res.status(500).json({
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

// ============================================================
// UPDATE PRODUCT
// ============================================================
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, category, introduction, specifications } = req.body;

    // ----------------------------------------------------------
    // Find existing product
    // ----------------------------------------------------------
    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    // ----------------------------------------------------------
    // Update normal fields
    // ----------------------------------------------------------
    existingProduct.name = name || existingProduct.name;

    existingProduct.category = category || existingProduct.category;

    existingProduct.introduction = introduction ?? existingProduct.introduction;

    // ----------------------------------------------------------
    // Update specifications
    // ----------------------------------------------------------
    if (specifications !== undefined) {
      try {
        existingProduct.specifications =
          typeof specifications === "string"
            ? JSON.parse(specifications)
            : specifications;
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Invalid specifications format",
        });
      }
    }

    // ==========================================================
    // IMAGE REPLACEMENT
    // ==========================================================
    if (req.files?.image?.[0]) {
      // Save old image path BEFORE replacing it
      const oldImage = existingProduct.image;

      // Convert Windows path to URL path
      const newImage = "/" + req.files.image[0].path.replace(/\\/g, "/");

      // Update DB with new image
      existingProduct.image = newImage;

      // Delete old image from server
      if (oldImage && oldImage !== newImage) {
        deleteUploadedFile(oldImage);
      }
    }

    // ==========================================================
    // DATASHEET REPLACEMENT
    // ==========================================================
    if (req.files?.datasheet?.[0]) {
      // Save old datasheet path BEFORE replacing it
      const oldDatasheet = existingProduct.datasheet;

      // Convert Windows path to URL path
      const newDatasheet =
        "/" + req.files.datasheet[0].path.replace(/\\/g, "/");

      // Update DB with new datasheet
      existingProduct.datasheet = newDatasheet;

      // Delete old datasheet from server
      if (oldDatasheet && oldDatasheet !== newDatasheet) {
        deleteUploadedFile(oldDatasheet);
      }
    }

    // ----------------------------------------------------------
    // Save product
    // ----------------------------------------------------------
    await existingProduct.save();

    return res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product: existingProduct,
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Product update failed",
      error: error.message,
    });
  }
};
