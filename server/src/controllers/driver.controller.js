import Driver from "../models/driver.model.js";
import Product from "../models/product.model.js";
import fs from "fs";
import path from "path";

/* ==========================================================
   CREATE DRIVER
========================================================== */

export const createDriver = async (req, res) => {
  try {
    // const { product, type, subtype, title, version, environment } = req.body;
    const { product, type, version, environment } = req.body;

    if (!product || !type || !version || !environment) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const productExist = await Product.findById(product);

    if (!productExist) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (!req.files?.driver) {
      return res.status(400).json({
        success: false,
        message: "Driver ZIP file is required",
      });
    }

    const driverPath = "/" + req.files.driver[0].path.replace(/\\/g, "/");

    const driver = await Driver.create({
      product,
      type,
      version,
      environment,
      driverFile: driverPath,
    });

    res.status(201).json({
      success: true,
      message: "Driver uploaded successfully",
      driver,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================================
   GET ALL DRIVERS
========================================================== */

export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find()
      .populate("product", "name category slug")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: drivers.length,
      drivers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================================
   GET DRIVERS OF SINGLE PRODUCT
========================================================== */

// export const getDriversByProduct = async (req, res) => {
//   try {
//     const { productId } = req.params;

//     const drivers = await Driver.find({
//       product: productId,
//     }).sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       drivers,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


export const getDriversByProduct = async (req, res) => {
  try {
    const { product } = req.query;

    // Filter object
    const filter = {};

    // Agar product selected hai
    if (product) {
      filter.product = product;
    }

    const drivers = await Driver.find(filter)
      .populate("product", "name category")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: drivers.length,
      drivers,
    });
  } catch (error) {
    console.error("Get Drivers Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch drivers",
    });
  }
};

/* ==========================================================
   GET SINGLE DRIVER
========================================================== */

export const getSingleDriver = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id).populate("product");

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    res.status(200).json({
      success: true,
      driver,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================================
   UPDATE DRIVER
========================================================== */

export const updateDriver = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    const { product, type, version, environment } = req.body;

    if (product) {
      const productExist = await Product.findById(product);

      if (!productExist) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      driver.product = product;
    }

    if (type) driver.type = type;

    if (version) driver.version = version;

    if (environment) driver.environment = environment;

    /* ZIP Replace */

    if (req.files?.driver) {
      if (driver.driverFile) {
        const oldPath = path.join(
          process.cwd(),
          driver.driverFile.replace(/^\//, ""),
        );

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      driver.driverFile = "/" + req.files.driver[0].path.replace(/\\/g, "/");
    }

    await driver.save();

    res.status(200).json({
      success: true,
      message: "Driver updated successfully",
      driver,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================================
   DELETE DRIVER
========================================================== */

export const deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    if (driver.driverFile) {
      const filePath = path.join(
        process.cwd(),
        driver.driverFile.replace(/^\//, ""),
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await driver.deleteOne();

    res.status(200).json({
      success: true,
      message: "Driver deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
