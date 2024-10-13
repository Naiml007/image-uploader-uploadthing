import express from "express";
import cors from "cors";  // Import cors
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./uploadthing";

const app = express();

// Add this line to enable CORS for all routes
app.use(cors({
  origin: "http://localhost:3000",  // Allow requests from your frontend
  credentials: true,  // If you're using cookies or other credentials
}));

app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: uploadRouter,
    config: { /*...*/ },
  })
);

app.listen(3030, () => {
  console.log("Server is running on http://localhost:3030");
});
