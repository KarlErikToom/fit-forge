const mongoose = require("mongoose")

const ClientSchema = mongoose.Schema(
    {
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
        maxLength: [20, "First name cannot exceed 20 characters"]
    },
     lastName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
        maxLength: [20, "Last name cannot exceed 20 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        lowercase:true,
        trim:true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please provide a valid email address"]
    },
    phoneNumber:{
        type: String,
    },
    dateOfBirth:{
        type: Date,
    },
    
   trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: [true, "Trainer ID is required"]
   }

    },

    {
        timestamps:true
    }
);
const Client = mongoose.model("Client", ClientSchema);
module.exports=Client