const mongoose = require("mongoose")

const GlobalExerciseSchema = mongoose.Schema(
    {
    name: {
        type: String,
        required: [true, "exercise Name is required"],
        trim: true,
    },
     category:{
        type:String,
        trim:true
     },
   
    },

    {
        timestamps:true
    }
);
const GlobalExercise = mongoose.model("Global_Exercise", GlobalExerciseSchema);
module.exports=GlobalExercise