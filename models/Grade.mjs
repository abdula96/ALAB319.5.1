import mongoose from "mongoose";

// Define a schema for the "grades" collection
const gradeSchema = new mongoose.Schema({
  learner_id: { type: Number, required: true },
  class_id: { type: Number, required: true },
  scores: [
    {
      type: { type: String, required: true }, // e.g., "exam", "quiz", or "homework"
      score: { type: Number, required: true },
    },
  ],
});

// Create and export the Grade model
const Grade = mongoose.model("Grade", gradeSchema);

export default Grade;
