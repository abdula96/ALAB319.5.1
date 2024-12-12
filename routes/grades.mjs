import express from "express";
import Grade from "../models/Grade.mjs"; // Import the Grade model
import { ObjectId } from "mongoose"; // Mongoose's ObjectId

const router = express.Router();

// Create a single grade entry
router.post("/", async (req, res) => {
  const newGrade = new Grade(req.body);

  try {
    const result = await newGrade.save(); // Use Mongoose's save method
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get a single grade entry by ID
router.get("/:id", async (req, res) => {
  try {
    const result = await Grade.findById(req.params.id); // Use Mongoose's findById method
    if (!result) {
      return res.status(404).send("Not found");
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Add a score to a grade entry
router.patch("/:id/add", async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    if (!grade) {
      return res.status(404).send("Not found");
    }
    grade.scores.push(req.body); // Push a new score to the scores array
    const result = await grade.save(); // Save the updated grade
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Remove a score from a grade entry
router.patch("/:id/remove", async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    if (!grade) {
      return res.status(404).send("Not found");
    }
    grade.scores = grade.scores.filter(
      (score) => score._id.toString() !== req.body.scoreId
    ); // Remove the specified score
    const result = await grade.save(); // Save the updated grade
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete a single grade entry
router.delete("/:id", async (req, res) => {
  try {
    const result = await Grade.findByIdAndDelete(req.params.id); // Mongoose's findByIdAndDelete method
    if (!result) {
      return res.status(404).send("Not found");
    }
    res.status(200).send("Grade deleted successfully.");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get a learner's grade data
router.get("/learner/:id", async (req, res) => {
  try {
    const result = await Grade.find({ learner_id: req.params.id }); // Use Mongoose's find method
    if (!result) {
      return res.status(404).send("Not found");
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
