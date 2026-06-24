import AppError from "../utils/AppError.js";

const errorMiddleware = (err, req, res, next) => {
  // Defaults
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  /* ---------- MONGOOSE / MONGODB ERRORS ---------- */

  // Invalid MongoDB ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Duplicate key error (unique fields)
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
  }

  // Validation errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  /* ---------------- JWT ERRORS ---------------- */

  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token, please login again";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired, please login again";
  }

  /* ---------------- FINAL RESPONSE ---------------- */

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorMiddleware;
