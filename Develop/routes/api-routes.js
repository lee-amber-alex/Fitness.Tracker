const db = require("../models");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


db.Workout.create({ name: "Workout" })
  .then((dbWorkout) => {
    console.log(dbWorkout);
  })
  .catch(({ message }) => {
    console.log(message);
  });

// creates a workout then finds a model to add to
router.get("/api/workouts", ({ body }, res) => {
  db.Exercise.create(body)
    .then(({ _id }) =>
      db.Workout.findOneAndUpdate(
        {},
        { $push: { exercise: _id } },
        { new: true }
      )
    )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  const workoutSelect = req.params.id;
      db.Workout.findOneAndUpdate(
        {_id: workoutSelect},
        { $push: { exercise: _id }},
        { new: true })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .populate("exercise")
    .then((dbAllexercises) => {
      res.json(dbAllexercises).catch((err) => {
        res.json(err);
      });
    });
});