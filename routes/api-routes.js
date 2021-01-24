const db = require("../models");
const router = require("express").Router();
const mongoose = require("mongoose");
const Workout = require("../models/Workout.js");


router.get("/api/workouts", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  
  ])
    .then((workout) => {
      res.json(workout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
  console.log(body);
  console.log(typeof body);
  db.Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    { new: true, runValidators: true }
  )
    .then((workout) => {
      res.json(workout);
    })
    .catch((err) => {
      console.log(err);
      res.status(403).json(err);
      // res.json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {
  db.Workout.create({})
    .then((workout) => {
      res.json(workout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// need to add aggregate and sort and limit to 7 days. Sort ascending.
router.get("/api/workouts/range", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ]).sort({_id: -1}).limit(7)
    .then((allExercises) => {
      res.json(allExercises);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
