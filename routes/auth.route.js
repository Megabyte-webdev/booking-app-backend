import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", signUp);
authRouter.post("/login", signIn);

export default authRouter;
