const express = require("express")
const router = express.Router();
const exerciseController = require("../controllers/exerciseController");
const { verifyToken } = require("../middleware/auth");


// API/CLIENT ROUTES
router.post("/", verifyToken, exerciseController.createExercise)
router.get("/", verifyToken, exerciseController.getExercises)
router.get("/:exerciseId", verifyToken, exerciseController.getExercise)
router.patch("/:exerciseId", verifyToken, exerciseController.updateExercise)
router.delete("/:exerciseId", verifyToken, exerciseController.deleteExercise)









module.exports = router;