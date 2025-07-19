import { Router } from "express";
import {
  createDoctor,
  getAllDoctors,
  updateDoctor,
} from "../controllers/doctor.controller.js";
import upload from "../middlewares/multer.js";

const doctorRouter = Router();

doctorRouter.get("/", getAllDoctors);
doctorRouter.post("/", createDoctor);
doctorRouter.patch("/:id", updateDoctor);

export default doctorRouter;
