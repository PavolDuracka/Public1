import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router.js";
import handleServerError500 from "./errorMiddleware.js";

dotenv.config();

const app = express();

// Serve static files from the 'public' directory
app.use(express.static("public"));
app.use(cors());

const port = process.env.PORT || 3000;
const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/DroneWebsite";

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} request received for ${req.url} at ${new Date()}`);
  next();
});

// Mount router
app.use("/", router);

// Error handling middleware
app.use(handleServerError500);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
