import Product from "../models/product.model.js";
import Warranty from "../models/warranty.model.js";

// helper function (date format)
const formatDate = (date) => {
  const d = new Date(date);
  return `${String(d.getDate()).padStart(2, "0")}/${String(
    d.getMonth() + 1,
  ).padStart(2, "0")}/${d.getFullYear()}`;
};

export const createWarranty = async (req, res) => {
  try {
    const {
      category,
      serialNumber,
      modelNumber,
      customerName,
      customerEmail,
      customerContact,
      customerAddress,
      // customerCompany,
      resellerName,
      productConfiguration,
      warrantyType,
      validFrom,
      validTo,
    } = req.body;

    if (
      !category ||
      !serialNumber ||
      !modelNumber ||
      // !customerName ||
      // !customerEmail ||
      // !customerContact ||
      // !customerAddress ||
      // !customerCompany ||
      !resellerName ||
      !productConfiguration ||
      !validFrom ||
      !validTo
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const productExist = await Product.findById(modelNumber);

    if (!productExist) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // if (!req.files?.image) {
    //   return res
    //     .status(400)
    //     .json({ message: "Image is Required for Warranty" });
    // }

    // const imagePath = "/" + req.files.image[0].path.replace(/\\/g, "/");

    // ✅ CHECK DUPLICATE MANUALLY (extra safety)
    const existing = await Warranty.findOne({
      serialNumber: serialNumber.toUpperCase(),
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Warranty already exists for this Serial Number",
      });
    }

    const warranty = await Warranty.create({
      category,
      serialNumber: serialNumber.toUpperCase(),
      modelNumber,
      customerName,
      customerEmail,
      customerContact,
      customerAddress,
      // customerCompany,
      resellerName,
      // image: imagePath,
      productConfiguration,
      warrantyType,
      validFrom,
      validTo,
    });

    res.status(201).json({
      success: true,
      message: "Warranty Created Successfully",
      warranty: {
        ...warranty._doc,
        validFrom: formatDate(warranty.validFrom),
        validTo: formatDate(warranty.validTo),
      },
    });
  } catch (error) {
    console.error(error);

    // ✅ HANDLE DUPLICATE ERROR (MONGO ERROR CODE)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate Serial Number not allowed",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ USER: Get Warranty by Serial
export const getWarrantyBySerial = async (req, res) => {
  try {
    const { serial } = req.params;

    const warranty = await Warranty.findOne({
      serialNumber: serial.toUpperCase(),
    }).populate("modelNumber", "name category");

    if (!warranty) {
      return res.status(404).json({
        success: false,
        message: "This Serial Number Not Exist",
      });
    }

    res.status(200).json({
      success: true,
      warranty,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Admin :- Get All Products Warranties
export const getAllWarranties = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const warranties = await Warranty.find()
      .populate("modelNumber", "name category")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Warranty.countDocuments();

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      warranties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= UPDATE WARRANTY (ADMIN) ================= */
export const updateWarranty = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      category,
      serialNumber,
      modelNumber,
      customerName,
      customerEmail,
      customerContact,
      customerAddress,
      resellerName,
      productConfiguration,
      warrantyType,
      validFrom,
      validTo,
    } = req.body;

    // Validate MongoDB warranty ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid warranty ID",
      });
    }

    // Required fields
    if (
      !category ||
      !serialNumber?.trim() ||
      !modelNumber ||
      !resellerName?.trim() ||
      !productConfiguration?.trim() ||
      !validFrom ||
      !validTo
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    if (!["server", "workstation"].includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product type",
      });
    }

    if (!["NBD", "MissionCritical"].includes(warrantyType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid warranty type",
      });
    }

    const startDate = new Date(validFrom);
    const endDate = new Date(validTo);

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid warranty dates",
      });
    }

    if (endDate < startDate) {
      return res.status(400).json({
        success: false,
        message: "Warranty end date cannot be before start date",
      });
    }

    // Verify product exists and belongs to selected category
    const product = await Product.findById(modelNumber);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const productCategory = (
      product.type ||
      product.category ||
      ""
    ).toLowerCase();

    if (productCategory !== category) {
      return res.status(400).json({
        success: false,
        message: "Selected product does not match product type",
      });
    }

    // Check duplicate serial number, excluding this warranty
    const normalizedSerial = serialNumber.trim().toUpperCase();

    const duplicate = await Warranty.findOne({
      serialNumber: normalizedSerial,
      _id: { $ne: id },
    });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "Another warranty already exists for this Serial Number",
      });
    }

    const warranty = await Warranty.findByIdAndUpdate(
      id,
      {
        $set: {
          category,
          serialNumber: normalizedSerial,
          modelNumber,
          customerName: customerName?.trim() || "",
          customerEmail: customerEmail?.trim() || "",
          customerContact: customerContact?.trim() || "",
          customerAddress: customerAddress?.trim() || "",
          resellerName: resellerName.trim(),
          productConfiguration: productConfiguration.trim(),
          warrantyType,
          validFrom: startDate,
          validTo: endDate,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    ).populate("modelNumber", "name category type");

    if (!warranty) {
      return res.status(404).json({
        success: false,
        message: "Warranty not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Warranty updated successfully",
      warranty,
    });
  } catch (error) {
    console.error("Update warranty error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate Serial Number not allowed",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update warranty",
    });
  }
};

// ✅ Admin :- Delete Warranty
export const deleteWarranties = async (req, res) => {
  try {
    const warranties = await Warranty.findById(req.params.id);

    if (!warranties) {
      return res.status(404).json({ message: "This Serial Number Not Exist" });
    }

    await warranties.deleteOne();

    res.status(200).json({
      success: true,
      message: "Warranty deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
