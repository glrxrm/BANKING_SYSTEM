import express from "express";
import cors from "cors";
import { bankRouter } from "./routes/bankRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api", bankRouter);

export default app;
