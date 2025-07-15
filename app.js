import express from "express";
import { PORT } from "./config/env.js";
import doctorRouter from "./routes/doctors.route.js";
import cookieParser from "cookie-parser";
import connectToDatabase from "./database/mongodb.js";
import authRouter from "./routes/auth.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/doctors", doctorRouter);
app.use("/api/auth", authRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to the Booking App API!");
});

app.listen(PORT, async () => {
  console.log(`🚀 Booking app listening on port ${PORT}`);

  await connectToDatabase();
});
