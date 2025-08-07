const UserExercise = require("../models/userExercise.model");



const createExercise = async (req, res) => {
  try {
    const userId = req.user.id;
    const exercise = await UserExercise.create({ userId ,...req.body})


    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getExercises = async (req,res)=>{
    try {
        const userId = req.user.id;
        const exercises = await UserExercise.find({userId})
        res.status(200).json({exercises})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports = { createExercise, getExercises };
