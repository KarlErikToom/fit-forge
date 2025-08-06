const mongoose = require("mongoose");

const UserExerciseSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Trainer ID is required"],
    },
    name: {
      type: String,
      required: [true, "exercise Name is required"],
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    originalExerciseId:{
         type: mongoose.Schema.Types.ObjectId,
         ref:"Global_Exercise"
    }
  },

  {
    timestamps: true,
  }
);
const UserExercise = mongoose.model("User_Exercise", UserExerciseSchema);
module.exports = UserExercise;
