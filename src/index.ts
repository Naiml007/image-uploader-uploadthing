import express from "express";
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./uploadthing";

const app = express();

app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: uploadRouter,
    config: {
      // Optional: Add your configuration here
    },
  }),
);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
    