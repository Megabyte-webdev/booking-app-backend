import Doctor from "../models/doctor.model.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
export const getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find();

    res.status(200).json({
      success: true,
      message: "Doctors fetched successfully",
      data: doctors,
    });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    next(error);
  }
};

export const createDoctor = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      available,
      fees,
      address,
    } = req.body;
    console.log(req.body);

    const imageFile = req.file; // e.g. from multer

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //upload image to cloudinary
    let imageUpload = {};
    if (imageFile) {
      imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
    }

    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      available,
      fees,
      address: JSON.parse(address),
      image: imageUpload?.secure_url || null, // adjust based on your multer config
    };
    const doctor = await Doctor.create(doctorData);

    res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      data: doctor,
    });
  } catch (error) {
    console.error("Error creating doctor:", error);
    next(error);
  }
};

export const updateDoctor = async (req, res, next) => {
  const { id } = req.params;
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      available,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;
    let hashedPassword;

    if (password) {
      if (password.length < 8) {
        return res.status(400).json({
          success: false,
          message: "Please enter a strong password",
        });
      }
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    let imageUpload = {};
    if (imageFile) {
      imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
    }

    const doctorData = {
      name,
      email,
      ...(hashedPassword && { password: hashedPassword }),
      speciality,
      degree,
      experience,
      about,
      available,
      fees,
      address: typeof address === "string" ? JSON.parse(address) : address,
      ...(imageUpload?.secure_url && { image: imageUpload.secure_url }),
    };

    const doctor = await Doctor.findByIdAndUpdate(id, doctorData, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.status(200).json({
      success: true,
      message: "Doctor updated successfully",
      data: doctor,
    });
  } catch (error) {
    console.error("Error updating doctor:", error);
    next(error);
  }
};
