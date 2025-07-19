import jwt from "jsonwebtoken";
import { JWT_SECRET, ADMIN_EMAIL } from "../config/env.js";
import Doctor from "../models/doctor.model.js";

const authorize = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Admin logic
    if (decoded.role === "admin" && decoded.email === ADMIN_EMAIL) {
      req.user = {
        email: decoded.email,
        role: "admin",
      };
      return next();
    }

    // Doctor logic
    const user = await Doctor.findById(decoded.userId).select("-password -__v");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
      error: error.message || "Token verification failed",
    });
  }
};

export default authorize;
