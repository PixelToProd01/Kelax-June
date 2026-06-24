import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      const category = req.body.category;

      if (!category) {
        return cb(new Error("Category is required before file upload"));
      }

      // Allow only valid categories
      if (!["server", "workstation"].includes(category)) {
        return cb(new Error("Invalid product category"));
      }

      let folder = "";

      // IMAGE
      if (file.fieldname === "image") {
        folder = `uploads/products/${category}/images`;
      }

      // PDF
      if (file.fieldname === "datasheet") {
        folder = `uploads/products/${category}/datasheets`;
      }

      // Create folder if not exists
      fs.mkdirSync(folder, { recursive: true });

      cb(null, folder);
    } catch (error) {
      cb(error);
    }
  },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);

    const nameWithoutExt = path.basename(file.originalname, ext);

    const cleanName = nameWithoutExt
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-_]/g, "")
      .toLowerCase();

    const finalName = `${cleanName}-${Date.now()}${ext}`;

    cb(null, finalName);
  },
});

const fileFilter = (req, file, cb) => {
  // IMAGE VALIDATION
  if (file.fieldname === "image") {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files allowed"), false);
    }
  }

  // PDF VALIDATION
  if (file.fieldname === "datasheet") {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF file allowed"), false);
    }
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});