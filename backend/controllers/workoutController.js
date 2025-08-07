const Client = require("../models/client.model.js");
const Workout = require("../models/workout.model.js");

const createWorkout = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const clientId = req.params.clientId;
    const { date } = req.body;

    const client = await Client.findOne({ _id: clientId, trainerId });

    if (!client) {
      return res
        .status(403)
        .json({ message: "Not authorized to create workout for this client" });
    }
    const workout = await Workout.create({
      trainerId,
      clientId,
      date,
      exercises: [],
    });
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateWorkout = async (req, res) => {
  try {
    const { clientId, workoutId } = req.params;
    const trainerId = req.user.id;
    const { action } = req.body;

    const client = await Client.findOne({ _id: clientId, trainerId });

    if (!client) {
      return res
        .status(403)
        .json({ message: "Not authorized to update workout for this client" });
    }

    if (!action) {
      return res.status(400).json({ message: "Action is required" });
    }

    const workout = await Workout.findOne({
      _id: workoutId,
      clientId,
      trainerId,
    });
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    if (action === "addExercise") {
      workout.exercises.push({
        UserExerciseId: req.body.UserExerciseId,
        sets: [],
        notes: "",
      });
    }

    if (action === "addSet") {
      const { exerciseId, set } = req.body;
      const exercise = workout.exercises.id(exerciseId);

      if (!exercise) {
        return res.status(404).json({ message: "Exercise not found" });
      }

      exercise.sets.push(set);
    }
    if (action === "updateSet") {
      const { exerciseId, setId, reps, weight } = req.body;

      const exercise = workout.exercises.id(exerciseId);
      if (!exercise)
        return res.status(404).json({ message: "Exercise not found" });

      const set = exercise.sets.id(setId);
      if (!set) return res.status(404).json({ message: "Set not found" });

      if (reps !== undefined) set.reps = reps;
      if (weight !== undefined) set.weight = weight;
    }

    if (action === "deleteExercise") {
      const { exerciseId } = req.body;

      const exercise = workout.exercises.id(exerciseId);
      if (!exercise)
        return res.status(404).json({ message: "Exercise not found" });

      exercise.deleteOne();
    }

    if (action === "deleteSet") {
      const { exerciseId, setId } = req.body;

      const exercise = workout.exercises.id(exerciseId);
      if (!exercise)
        return res.status(404).json({ message: "Exercise not found" });

      const set = exercise.sets.id(setId);
      if (!set) return res.status(404).json({ message: "Set not found" });

      set.deleteOne();
    }

    if (action === "updateNotes") {
      const { exerciseId, notes } = req.body;
      const exercise = workout.exercises.id(exerciseId);

      if (!exercise) {
        return res.status(404).json({ message: "Exercise not found" });
      }

      exercise.notes = notes;
    }

    await workout.save();
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getWorkouts = async (req, res) => {
  try {
    const { clientId} = req.params;
    const trainerId = req.user.id;

    const client = await Client.findOne({ _id: clientId, trainerId });

    if (!client) {
      return res
        .status(403)
        .json({ message: "Not authorized to get workouts for this client" });
    }

    const workout = await Workout.find({
      clientId, trainerId
    });

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getWorkout = async (req, res) => {
  try {
    const { clientId, workoutId } = req.params;
    const trainerId = req.user.id;
    const workout = await Workout.findOne({
      _id: workoutId,
      clientId,
      trainerId,
    });

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createWorkout, updateWorkout, getWorkout,getWorkouts };
