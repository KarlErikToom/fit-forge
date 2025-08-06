const GlobalExercise = require("../models/globalExercise.model")



const createGlobalExercise = async(req, res) =>{

    try {
       const globalExercise = await GlobalExercise.create(req.body)

        res.status(200).json(globalExercise)
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
}


module.exports = {createGlobalExercise}