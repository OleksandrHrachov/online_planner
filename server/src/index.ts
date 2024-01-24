require("dotenv").config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { routers } from "./router";
import { TodoModel } from "./db/todo";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/online_planner", routers);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MONGO_DB - connected");

    app.listen(PORT, () => {
      console.log(`server listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("SERVER ERROR =>", error);
  }
};

start();
