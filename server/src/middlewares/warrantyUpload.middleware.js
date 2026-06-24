import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      const folder = "uploads/products/warranty/images";

      fs.mkdirSync(folder, {
        recursive: true,
      });

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
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files allowed"), false);
  }

  cb(null, true);
};

export const uploadWarranty = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});
