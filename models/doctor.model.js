import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
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
      type: String, // URL or file path
      //required: [true, "Image is required"],
    },
    speciality: {
      type: String,
      required: [true, "Speciality is required"],
    },
    degree: {
      type: String,
      required: [true, "Degree is required"],
    },
    experience: {
      type: String, // Or Number if you separate the "Years"
      required: [true, "Experience is required"],
    },
    about: {
      type: String,
      required: [true, "About section is required"],
      minlength: [20, "About must be at least 20 characters long"],
    },
    fees: {
      type: Number,
      required: [true, "Fees are required"],
      min: [0, "Fees cannot be negative"],
    },
    address: {
      line1: {
        type: String,
        required: [true, "Address line 1 is required"],
      },
      line2: {
        type: String,
        required: [true, "Address line 2 is required"],
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
