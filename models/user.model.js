import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name must be at most 50 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    image: {
      type: String,
    },
    address: {
      type: Object,
      default: {
        line1: "",
        line2: "",
      },
    },
    gender: {
      type: String,
      default: "Not Selected",
    },
    dob: {
      type: String,
      default: "Not Selected",
    },
    phone: {
      type: String,
      default: "0000000000",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
