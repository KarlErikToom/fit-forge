const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


const createToken= (userId) =>{
    return jwt.sign({id:userId}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

exports.signUp = async (req, res) =>{
    try {
        const {name, email, password} = req.body;
        const user = await User.create({name, email, password})
        const token = createToken(user._id);
        res.status(201).json({userId: user._id, token})
    } catch (error) {
        res.status(400).json({message:error.message})
        
    }
}

exports.login = async (req,res) =>{
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email}).select("+password");
        if (!user) return res.status(400).json({message: "Invalid credentials"})

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return res.status(400).json({message:"Password do not match"})

         const token = createToken(user._id)
         res.status(200).json({userId: user._id, token})  
    } catch (error) {
        res.status(400).json({message:error.message})
        
    }
}