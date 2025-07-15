import Doctor from "../models/doctor.model.js";

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
    const doctor = await Doctor.create({ ...req.body });

    res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateDoctor = async (req, res, next) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.findByIdAndUpdate(id, req.body, {
      new: true, // return the updated doc
      runValidators: true, // validate update
    });
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor updated successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
