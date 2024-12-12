import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB using Mongoose
const connectionString = process.env.MONGO_URI; // MongoDB URI from .env

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully."))
  .catch((e) => console.error("Failed to connect to MongoDB", e));

export default mongoose;
