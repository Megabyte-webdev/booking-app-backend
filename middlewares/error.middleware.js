const errorMiddleware = (err, req, res, next) => {
  console.error("🔥 Error:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Server Error";

  if (err.name === "CastError") {
    message = "Resource not found";
    statusCode = 404;
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate field: ${field} already exists`;
    statusCode = 400;
  }

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    message = errors.join(", ");
    statusCode = 400;
  }

  return res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export default errorMiddleware;
