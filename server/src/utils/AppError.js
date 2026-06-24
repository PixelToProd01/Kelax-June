class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    // HTTP status code (400, 401, 404, 500 etc.)
    this.statusCode = statusCode;

    // "fail" for 4xx, "error" for 5xx
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    // Marks error as expected / operational
    this.isOperational = true;

    // Remove AppError constructor from stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
