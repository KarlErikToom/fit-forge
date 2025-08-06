const UserExercise = require("../models/userExercise.model")
const GlobalExercise = require("../models/globalExercise.model")


const insertGlobalExercisesForUser = async (userId) => {
  const globalExercises = await GlobalExercise.find();

  const userExercises = globalExercises.map((exercise) => ({
    name: exercise.name,
    category: exercise.category,
    userId: userId,
    originalExerciseId: exercise._id,
  }));

  return await UserExercise.insertMany(userExercises);
};


module.exports = {insertGlobalExercisesForUser}