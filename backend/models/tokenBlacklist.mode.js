const mongoose = require("mongoose")

const TokenBlackListSchema = mongoose.Schema({

    token:{
        type:String,
        require: [true, "token is required"],
        unique:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"User ID is required"]
    },
    expiresAt:{
        type:Date,
        required: [true, "Expiration date is required"],
        index: {expiresAfterSeconds: 0}
    },
    reason:{
        type:String,
        enum: ['logout', 'security', 'password_change'],
        default:'logout'
    }
},
{
    timestamps:true
});


const TokenBlackList = mongoose.model("TokenBlackList", TokenBlackListSchema)

module.exports =TokenBlackList;