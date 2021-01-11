const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/dbWorkout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// creates Workout database
db.Workout.create({ name: "Workout" })
  .then((dbWorkout) => {
    console.log(dbWorkout);
  })
  .catch(({ message }) => {
    console.log(message);
  });

  app.post("/api/workouts", ({ body }, res) => {
    db.Exercise.create(body)
      .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { exercise: _id } }, { new: true }))
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

// finds all Exercises
app.get("/api/workouts", (req, res) => {
  db.Exercise.find({})
    .then(dbExcerise => {
      res.json(dbExcerise);
    })
    .catch((err) => {
      res.json(err);
    });
});


app.get("/populated", (req, res) => {
    db.Workout.find({})
      .populate("exercise")
      .then(dbWorkout => {
        res.json(dbWorkout;
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });