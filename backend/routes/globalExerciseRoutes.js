const express = require("express")
const router = express.Router();
const globalExerciseController = require("../controllers/globalExerciseController");



router.post("/", globalExerciseController.createGlobalExercise)




module.exports = router;