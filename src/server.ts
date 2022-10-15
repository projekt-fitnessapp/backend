import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { AppRouter } from "./routes/routes";

export function setupServer(isTest: boolean) {
  if (isTest) {
    process.env.PORT = "3000";
  } else {
    dotenv.config();
  }
  const app = express();

  app.use(morgan("dev"));

  app.use(express.json())

  app.use("/", AppRouter);

  return app;
}

export async function connectDB(isTest: boolean) {
  if (isTest) {
    process.env.DB_URL =
      "mongodb+srv://test:test@cluster0.r1rtx.mongodb.net/?retryWrites=true&w=majority";
  } else {
    dotenv.config();
  }
  await mongoose.connect(process.env.DB_URL as string);
  console.log("Database connection successfull");
}
