import Doctor from "../models/doctor.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  JWT_EXPIRES_IN,
  JWT_SECRET,
} from "../config/env.js";
import mongoose from "mongoose";

export const signUp = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { email, password } = req.body;
    // check if user already exists
    const existingUser = await Doctor.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 400;
      throw error;
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create a new user
    const newUsers = await Doctor.create(
      [
        {
          ...req.body,
          email,
          password: hashedPassword,
        },
      ],
      { session }
    ); // Pass session to the create method
    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: newUsers[0],
      },
    });
  } catch (error) {
    console.error("SignUp Error:", error.message);
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({
      success: false,
      message: "Signup failed",
      error: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Doctor.findOne({ email }).select("-__v");
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // convert to plain JS and remove password
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        token,
        user: userWithoutPassword,
      },
    });
  } catch (error) {
    console.error("SignIn Error:", error.message);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const aToken = jwt.sign({ email, role: "admin" }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });

      res.status(200).json({
        status: true,
        message: "Admin logged in successfully",
        data: {
          email,
          aToken,
        },
      });
    } else {
      res.json({ status: false, message: "Invalid credentials" });
    }
  } catch (error) {
    next(error);
  }
};
