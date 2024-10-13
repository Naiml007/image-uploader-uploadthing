import express from "express";
import cors from "cors";  // Import cors
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./uploadthing";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Add CORS to allow requests from your frontend
app.use(cors({
  origin: "http://localhost:3000",  // Allow requests from your frontend
  credentials: true,  // If you're using cookies or other credentials
}));

// Check if the token is being properly loaded
if (!process.env.UPLOADTHING_TOKEN) {
  console.error("Error: Missing UPLOADTHING_TOKEN in environment variables.");
  process.exit(1);  // Exit if token is not found
}

console.log("UPLOADTHING_TOKEN loaded:", process.env.UPLOADTHING_TOKEN);

// Route handler with UploadThing configuration
app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: uploadRouter,
    config: {
      token: process.env.UPLOADTHING_TOKEN,  // Pass the token from .env
    },
  })
);

// Start the server
app.listen(3030, () => {
  console.log("Server is running on http://localhost:3030");
});
