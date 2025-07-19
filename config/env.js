import { config } from "dotenv";

config({ path: ".env" });

export const {
  PORT,
  NODE_ENV,
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET_KEY,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
} = process.env;
