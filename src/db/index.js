import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv";
dotenv.config();

export const DB_connect = async () => {
  try {
    const mongo_instance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log("MongoDB connected to HOST:", mongo_instance.connection.host);
  } catch (error) {
    console.log("Error:", error);
    process.exit(1);
  }
};
