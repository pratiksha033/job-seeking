import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import userRouter from "./routes/userRouter.js";
import applicationRouter from "./routes/applicationRoutes.js";
import jobRouter from "./routes/jobRouter.js";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middleware/error.js";

// Load environment variables
dotenv.config({ path: "./config.env" });

const app = express();

// Connect to database and start server
const startServer = async () => {
  try {
    await dbConnection();
    console.log("✅ Database connected successfully");

    // Middlewares
    app.use(cors({
      origin: [process.env.FRONTEND_URL],
      methods: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    }));

    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: "./tmp",
    }));

    // Routes
    app.use("/api/v1/user", userRouter);
    app.use("/api/v1/application", applicationRouter);
    app.use("/api/v1/job", jobRouter);

    // Error handling middleware
    app.use(errorMiddleware);

    // Start server after DB is ready
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });

  } catch (error) {
    console.error("❌ Failed to connect to database. Server not started.");
    console.error(error);
    process.exit(1);
  }
};

export { startServer };  // Export startServer

