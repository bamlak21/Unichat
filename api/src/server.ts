import express, { Request, Response } from "express";
import config from "./config/config";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";

const { envConfig, dbConfig } = config;

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);

async function startServer() {
  try {
    // Connect to MongoDB
    await mongoose.connect(dbConfig.URL).then(() => {
      console.log("🛢️ Connected to MongoDB");
    });

    app.listen(envConfig.port, () => {
      console.log(`🚀 Server is running on port ${envConfig.port}`);
      console.log(`📝 Environment: ${envConfig.nodeEnv || "development"}`);
    });
  } catch (error) {
    console.error("❌ Fatal Error starting server:", error);
    process.exit(1);
  }
}

startServer();
