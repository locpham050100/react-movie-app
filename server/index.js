import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./src/routes/index.js";

// Create a new Express application instance.
const app = express();

// Set up the CORS middleware to allow the server to accept requests from different domains.
app.use(cors());

// Set up middleware to parse incoming JSON data.
app.use(express.json());

// Set up middleware to parse incoming URL-encoded data.
app.use(express.urlencoded({ extended: false }));

// Set up middleware to parse incoming cookies.
app.use(cookieParser());

app.use("/api/v1", routes);

// Set the port number for the server.
const port = process.env.PORT || 5000;

// Create a new HTTP server instance using the Express app.
const server = http.createServer(app);

// Connect to the MongoDB database using the MONGODB_URL environment variable.
mongoose
  .connect(process.env.MONGODB_URL)
  // If the connection is successful, log a message to the console and start the server.
  .then(() => {
    console.log("Mongodb connected");
    // Start the server and listen for incoming requests on the specified port.
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  // If there is an error connecting to the MongoDB database, log the error and exit the process with an exit code of 1.
  .catch((err) => {
    console.log({ err });
    process.exit(1);
  });
