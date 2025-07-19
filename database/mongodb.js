import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

if (!DB_URI) {
  throw new Error("DB_URI is not defined in the environment variables.");
}

const connectToDatabase = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("✅ Database Connected Successfully");
    });

    await mongoose.connect(DB_URI);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectToDatabase;
