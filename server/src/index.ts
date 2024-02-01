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
    await mongoose.connect(
      "mongodb+srv://olgrachov:VjtIGuwf68FGecIf@cluster0.bkuqaxn.mongodb.net/online_planner?retryWrites=true&w=majority"
    );
    console.log("MONGO_DB - connected");

    const server = app.listen(PORT, () => {
      console.log(`server listening on http://localhost:${PORT}`);
    });

    server.keepAliveTimeout = 61 * 1000;
    server.headersTimeout = 65 * 1000;
  } catch (error) {
    console.log("SERVER ERROR =>", error);
  }
};

start();
