import * as dotenv from "dotenv";
dotenv.config();

export default {
  APPLICATION_PORT: parseInt(process.env.APPLICATION_PORT || "3000"),
  DB_PORT: parseInt(process.env.DB_PORT || "5432"),
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
} as Environment;
