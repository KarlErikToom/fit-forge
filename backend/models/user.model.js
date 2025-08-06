const mongoose = require("mongoose")

const UserSchema = mongoose.Schema(
    {
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique:true,
        lowercase:true,
        trim:true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please provide a valid email address"]
    },
    password:{
    type: String,
    required: [true, "Password is required"],
    minLength:[8, "Password must be at least 8 characters"],
    select:false
    }

    },
    {
        timestamps:true
    }
);
const User = mongoose.model("User", UserSchema);
module.exports=User