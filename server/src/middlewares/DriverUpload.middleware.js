import multer from "multer";
import path from "path";
import fs from "fs";

/* =========================================================
   DRIVER UPLOAD DIRECTORY
   ========================================================= */

const uploadDirectory = "uploads/products/drivers";

/* =========================================================
   STORAGE
   ========================================================= */

const storage = multer.diskStorage({

  /* -------------------------------------------------------
     DESTINATION
  ------------------------------------------------------- */

  destination: function (req, file, cb) {
    try {

      // Create folder automatically if it doesn't exist
      fs.mkdirSync(uploadDirectory, {
        recursive: true,
      });

      cb(null, uploadDirectory);

    } catch (error) {

      cb(error);

    }
  },

  /* -------------------------------------------------------
     FILE NAME
  ------------------------------------------------------- */

  filename: function (req, file, cb) {

    try {

      const originalName = file.originalname;

      const extension = path.extname(originalName);

      const nameWithoutExtension = path.basename(
        originalName,
        extension
      );

      /*
        Clean original file name

        Example:

        Intel LAN Driver v2.0.1.zip

        becomes:

        intel-lan-driver-v201
      */

      const cleanName = nameWithoutExtension
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9-_]/g, "")
        .toLowerCase();

      /*
        Timestamp makes filename unique.

        Example:

        intel-lan-driver-v201-1776313871802.zip
      */

      const finalName = `${cleanName}-${Date.now()}${extension}`;

      cb(null, finalName);

    } catch (error) {

      cb(error);

    }
  },
});

/* =========================================================
   FILE FILTER
   ========================================================= */

const fileFilter = (req, file, cb) => {

  /*
    Only ZIP files are allowed.
  */

  const extension = path
    .extname(file.originalname)
    .toLowerCase();

  const allowedMimeTypes = [
    "application/zip",
    "application/x-zip-compressed",
    "multipart/x-zip",
  ];

  if (
    extension !== ".zip" ||
    !allowedMimeTypes.includes(file.mimetype)
  ) {

    return cb(
      new Error("Only ZIP files are allowed for driver upload"),
      false
    );

  }

  cb(null, true);
};

/* =========================================================
   MULTER UPLOAD
   ========================================================= */

export const uploadDriver = multer({

  storage,

  fileFilter,

  limits: {

    /*
      Maximum driver ZIP size: 1000 MB Change this if required.
    */

    fileSize: 1000 * 1024 * 1024,  // 1GB
    // fileSize: 10 * 1024 * 1024,  // 10MB

  },

});