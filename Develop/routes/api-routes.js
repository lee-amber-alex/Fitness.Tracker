const db = require("../models");
const router = require("express").Router();
const mongoose = require("mongoose");

// db.Workout.create({ name: "Workout" })
//   .then((dbWorkout) => {
//     console.log(dbWorkout);
//   })
//   .catch(({ message }) => {
//     console.log(message);
//   });


router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  console.log(req.body);
  let workoutSelect = req.params.id;
  db.Workout.findByIdAndUpdate(
    workoutSelect ,
    { $push: { exercises: req.body } },
    { new: true , runValidators: true}
  )
    .then((dbWorkout) => {
      console.log(dbWorkout);
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(403).json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});
// getLastWorkout(); need to figure out how to aggregate for this, mongo to sum all the exercises

router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .populate("exercises")
    .then((dbAllexercises) => {
      res.json(dbAllexercises).catch((err) => {
        res.json(err);
        console.log(dbAllexercises);
      });
    });
});

module.exports = router;
