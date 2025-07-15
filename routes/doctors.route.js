import { Router } from "express";
import {
  createDoctor,
  getAllDoctors,
  updateDoctor,
} from "../controllers/doctor.controller.js";

const doctorRouter = Router();

doctorRouter.get("/", getAllDoctors);
doctorRouter.post("/", createDoctor);
doctorRouter.patch("/:id", updateDoctor);

export default doctorRouter;
