import mongoose from "mongoose";
import Deal from "../models/deal.model.js";
import DealCounter from "../models/dealCounter.model.js";
import sendNewDealNotificationMail from "../emails/sendNewDealNotificationMail.js";
import sendDealStatusNotificationMail from "../emails/sendDealStatusNotificationMail.js";
// import sendDealStatusNotificationMail from "../emails/sendDealStatusNotificationMail.js";

// Generate the next system-wide sequential Deal ID.
const generateDealId = async () => {
  const counter = await DealCounter.findOneAndUpdate(
    { _id: "deal_registration" },
    { $inc: { sequence: 1 } },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    },
  );

  return `KELAX-DR-${String(counter.sequence).padStart(6, "0")}`;
};

const getPartnerId = (req) => req.user?._id || req.user?.id || req.user?.userId;

const getAdminId = (req) => req.user?._id || req.user?.id || req.user?.userId;

const isValidId = (id) => mongoose.isValidObjectId(id);

const validateDealPayload = (body = {}) => {
  const {
    customerName,
    customerEmail,
    customerContact,
    customerAddress,
    productType,
    quantity,
    expectedClosingDate,
    productRequirements,
  } = body;

  if (
    typeof customerName !== "string" ||
    !customerName.trim() ||
    typeof customerEmail !== "string" ||
    !customerEmail.trim() ||
    typeof customerContact !== "string" ||
    !customerContact.trim() ||
    typeof customerAddress !== "string" ||
    !customerAddress.trim() ||
    !productType ||
    !expectedClosingDate ||
    typeof productRequirements !== "string" ||
    !productRequirements.trim() ||
    quantity === undefined ||
    quantity === null ||
    quantity === ""
  ) {
    return "Please fill in all required fields.";
  }

  // Correct email validation regex.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(customerEmail.trim())) {
    return "Please enter a valid customer email.";
  }

  if (!["Server", "Workstation"].includes(productType)) {
    return "Invalid product type.";
  }

  const parsedQuantity = Number(quantity);

  if (
    !Number.isInteger(parsedQuantity) ||
    parsedQuantity < 1 ||
    parsedQuantity > 100000
  ) {
    return "Quantity must be a whole number between 1 and 100000.";
  }

  const closingDate = new Date(expectedClosingDate);

  if (Number.isNaN(closingDate.getTime())) {
    return "Please enter a valid expected closing date.";
  }

  if (closingDate < new Date("2000-01-01")) {
    return "Please enter a valid expected closing date.";
  }

  if (customerName.trim().length > 150) {
    return "Customer name cannot exceed 150 characters.";
  }

  if (customerEmail.trim().length > 254) {
    return "Customer email cannot exceed 254 characters.";
  }

  if (customerContact.trim().length > 30) {
    return "Customer contact cannot exceed 30 characters.";
  }

  if (customerAddress.trim().length > 1000) {
    return "Customer address cannot exceed 1000 characters.";
  }

  if (productRequirements.trim().length > 5000) {
    return "Product requirements cannot exceed 5000 characters.";
  }

  return null;
};

const getDealPayload = (body) => ({
  customerName: body.customerName.trim(),
  customerEmail: body.customerEmail.trim().toLowerCase(),
  customerContact: body.customerContact.trim(),
  customerAddress: body.customerAddress.trim(),
  productType: body.productType,
  quantity: Number(body.quantity),
  expectedClosingDate: new Date(body.expectedClosingDate),
  productRequirements: body.productRequirements.trim(),
});

// POST /api/deals/register
export const registerDeal = async (req, res) => {
  try {
    const partnerId = getPartnerId(req);

    if (!partnerId || !isValidId(partnerId)) {
      return res.status(401).json({
        message: "Please log in again.",
      });
    }

    const validationError = validateDealPayload(req.body);

    if (validationError) {
      return res.status(400).json({
        message: validationError,
      });
    }

    const dealId = await generateDealId();

    const deal = await Deal.create({
      dealId,
      partner: partnerId,
      ...getDealPayload(req.body),
      status: "Submitted",
    });

    // Send notification after the deal is saved.
    // Email failure must not undo or duplicate the registration.
    try {
      const dealForEmail = await Deal.findById(deal._id)
        .populate("partner", "fullName name email phone company")
        .lean();

      if (dealForEmail) {
        await sendNewDealNotificationMail(dealForEmail, dealForEmail.partner);
      }
    } catch (emailError) {
      console.error(
        `Deal ${dealId} was saved, but notification email failed:`,
        emailError.message,
      );
    }

    return res.status(201).json({
      message: "Deal registered successfully.",
      deal,
    });
  } catch (error) {
    console.error("registerDeal:", error);

    return res.status(500).json({
      message: "Unable to register deal.",
    });
  }
};

// GET /api/deals/my-deals
export const getMyDeals = async (req, res) => {
  try {
    const partnerId = getPartnerId(req);

    if (!partnerId || !isValidId(partnerId)) {
      return res.status(401).json({
        message: "Please log in again.",
      });
    }

    const deals = await Deal.find({ partner: partnerId })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      count: deals.length,
      deals,
    });
  } catch (error) {
    console.error("getMyDeals:", error);

    return res.status(500).json({
      message: "Unable to fetch your deals.",
    });
  }
};

// GET /api/deals/my-deals/:id
export const getMyDealById = async (req, res) => {
  try {
    const partnerId = getPartnerId(req);
    const { id } = req.params;

    if (!partnerId || !isValidId(partnerId)) {
      return res.status(401).json({
        message: "Please log in again.",
      });
    }

    if (!isValidId(id)) {
      return res.status(400).json({
        message: "Invalid deal ID.",
      });
    }

    const deal = await Deal.findOne({
      _id: id,
      partner: partnerId,
    }).lean();

    if (!deal) {
      return res.status(404).json({
        message: "Deal not found.",
      });
    }

    return res.status(200).json({ deal });
  } catch (error) {
    console.error("getMyDealById:", error);

    return res.status(500).json({
      message: "Unable to fetch deal.",
    });
  }
};

// PUT /api/deals/my-deals/:id
// Partner can edit only Submitted deals.
export const updateMyDeal = async (req, res) => {
  try {
    const partnerId = getPartnerId(req);
    const { id } = req.params;

    if (!partnerId || !isValidId(partnerId)) {
      return res.status(401).json({
        message: "Please log in again.",
      });
    }

    if (!isValidId(id)) {
      return res.status(400).json({
        message: "Invalid deal ID.",
      });
    }

    const validationError = validateDealPayload(req.body);

    if (validationError) {
      return res.status(400).json({
        message: validationError,
      });
    }

    const deal = await Deal.findOne({
      _id: id,
      partner: partnerId,
    });

    if (!deal) {
      return res.status(404).json({
        message: "Deal not found.",
      });
    }

    if (deal.status !== "Submitted") {
      return res.status(403).json({
        message: "Only submitted deals can be edited.",
      });
    }

    Object.assign(deal, getDealPayload(req.body));

    await deal.save();

    return res.status(200).json({
      message: "Deal updated successfully.",
      deal,
    });
  } catch (error) {
    console.error("updateMyDeal:", error);

    return res.status(500).json({
      message: "Unable to update deal.",
    });
  }
};

// GET /api/deals/admin/all
export const getAllDeals = async (req, res) => {
  try {
    const deals = await Deal.find()
      .populate("partner", "fullName name email phone company")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      count: deals.length,
      deals,
    });
  } catch (error) {
    console.error("getAllDeals:", error);

    return res.status(500).json({
      message: "Unable to fetch deals.",
    });
  }
};

// PATCH /api/deals/admin/:id/status
// Admin can approve or reject a Submitted deal.
// Rejection requires a reason.


export const updateDealStatus = async (req, res) => {
  try {
    const { status, adminRemarks = "" } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be Approved or Rejected",
      });
    }

    if (
      typeof adminRemarks !== "string" ||
      (status === "Rejected" && !adminRemarks.trim())
    ) {
      return res.status(400).json({
        success: false,
        message: "Admin remarks are required when rejecting a deal",
      });
    }

    const deal = await Deal.findById(req.params.id).populate({
      path: "partner",
      select: "fullName name email company",
    });

    if (!deal) {
      return res.status(404).json({
        success: false,
        message: "Deal not found",
      });
    }

    // Only Submitted deals can be reviewed.
    if (deal.status !== "Submitted") {
      return res.status(400).json({
        success: false,
        message: `This deal has already been reviewed. Current status: ${deal.status}`,
      });
    }

    // Update deal status and admin remarks.
    deal.status = status;
    deal.adminRemarks = adminRemarks.trim();
    deal.reviewedAt = new Date();

    const adminId =
      req.user?._id || req.user?.id || req.user?.userId;

    if (adminId) {
      deal.reviewedBy = adminId;
    }

    // Save the deal before sending the email.
    await deal.save();

    // Send email notification to the partner.
    // Email failure must not undo the status update.
    let emailSent = false;

    try {
      emailSent = await sendDealStatusNotificationMail(deal);
    } catch (emailError) {
      console.error("Deal status email error:", {
        dealId: deal.dealId,
        status: deal.status,
        recipient: deal.partner?.email,
        message: emailError.message,
      });
    }

    if (emailSent) {
      console.log(
        `Deal status email accepted for ${deal.partner?.email} | ${deal.dealId} | ${status}`
      );
    } else {
      console.error(
        `Deal status email failed | ${deal.dealId} | ${status} | ${deal.partner?.email || "Partner email not found"}`
      );
    }

    return res.status(200).json({
      success: true,
      message: emailSent
        ? `Deal ${status.toLowerCase()} successfully. Partner email accepted by SMTP.`
        : `Deal ${status.toLowerCase()} successfully, but the partner email could not be sent.`,
      deal,
      emailSent,
    });
  } catch (error) {
    console.error("Update Deal Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update deal status",
    });
  }
};

