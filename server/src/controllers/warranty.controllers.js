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
      customerName,
      resellerName,
      customerAddress,
      productConfiguration,
      serialNumber,
      productName,
      warrantyType,
      validFrom,
      validTo,
    } = req.body;

    if (
      !customerName ||
      !resellerName ||
      !customerAddress ||
      !productConfiguration ||
      !serialNumber ||
      !productName ||
      !validFrom ||
      !validTo
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    if (!req.files?.image) {
      return res
        .status(400)
        .json({ message: "Image is Required for Warranty" });
    }

    const imagePath = "/" + req.files.image[0].path.replace(/\\/g, "/");

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
      customerName,
      image: imagePath,
      resellerName,
      customerAddress,
      productConfiguration,
      serialNumber: serialNumber.toUpperCase(),
      productName,
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
    });

    if (!warranty) {
      return res.status(404).json({
        success: false,
        message: "Warranty not found",
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

// ✅ Admin :- Delete Warranty
export const deleteWarranties = async (req, res) => {
  try {
    const warranties = await Warranty.findById(req.params.id);

    if (!warranties) {
      return res.status(404).json({ message: "Warranty Not Found" });
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
