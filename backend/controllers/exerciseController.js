const User = require("../models/user.model");
const UserExercise = require("../models/userExercise.model");

const createExercise = async (req, res) => {
  try {
    const userId = req.user.id;
    const exercise = await UserExercise.create({ userId, ...req.body });

    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getExercises = async (req, res) => {
  try {
    const userId = req.user.id;
    const exercises = await UserExercise.find({ userId });
    res.status(200).json({ exercises });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getExercise = async (req, res) => {
  try {
    const { exerciseId } = req.params;
    const userId = req.user.id;

    const exercise = await UserExercise.findOne({ _id: exerciseId, userId });

    if (!exercise) {
      return res.status(404).json({ message: "exercise not found" });
    }

    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateExercise = async (req, res) => {
  try {
    const { exerciseId } = req.params;
    const userId = req.user.id;
    const updates = req.body;

    const exercise = await UserExercise.findOneAndUpdate(
      { _id: exerciseId, userId },
      updates,
      { new: true }
    );
    if (!exercise){
        return res.status(404).json({message:"exercise not found"})
    }
    res.status(200).json({exercise})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteExercise = async (req,res) =>{
    try {
        const {exerciseId}= req.params;
        const userId = req.user.id;

        const exercise = await UserExercise.findOneAndDelete({_id:exerciseId, userId})
        if(!exercise){
            return res.status(404).json({message: "exercise not found"})
        }
        res.status(200).json({message:"exercise deleted"})

    } catch (error) {
        res.status(500),json({message:error.message})
    }
}
module.exports = { createExercise, getExercises, getExercise, updateExercise, deleteExercise };
