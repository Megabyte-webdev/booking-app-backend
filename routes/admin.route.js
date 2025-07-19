import { Router } from "express";
import {
  createDoctor,
  getAllDoctors,
  updateDoctor,
} from "../controllers/doctor.controller.js";
import upload from "../middlewares/multer.js";
import { adminLogin } from "../controllers/auth.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const adminRouter = Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/doctors", getAllDoctors);
adminRouter.post(
  "/add-doctor",
  authorize,
  upload.single("image"),
  createDoctor
);
adminRouter.patch("/update-doctor/:id", updateDoctor);

export default adminRouter;
