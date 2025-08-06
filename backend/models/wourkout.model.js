const mongoose = require("mongoose");

const WorkoutSchema = mongoose.Schema(
  {
    trainerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Trainer ID is required"],
    },
     clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: [true, "Trainer ID is required"],
    },
    date:{
        type:Date
    },

    exercises: [{
        UserExerciseId: {
            type: mongoose.Schema.Types.ObjectId,
      ref: "UserExercise",
        },
        sets:[{
            reps:{
                type:Number
            },
            weight:{
                type:Number
            }
        
        }],
        notes:{
            type:String
        }
    }],
    
  },

  {
    timestamps: true,
  }
);
const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;
