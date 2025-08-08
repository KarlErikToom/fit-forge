const express = require("express")
const router = express.Router();
const clientController = require("../controllers/clientController");
const workoutController = require("../controllers/workoutController")
const { verifyToken } = require("../middleware/auth");


// API/CLIENT ROUTES
router.get("/", verifyToken, clientController.getClients);
router.get("/:clientId", verifyToken, clientController.getClient);
router.post("/", verifyToken, clientController.createClient)
router.delete("/:clientId", verifyToken, clientController.deleteClient);


// API/CLIENT/WORKOUT ROUTES
router.get("/:clientId/workouts", verifyToken, workoutController.getWorkouts);
router.get("/:clientId/workouts/:workoutId", verifyToken, workoutController.getWorkout);
router.post("/:clientId/workouts", verifyToken, workoutController.createWorkout);
router.patch("/:clientId/workouts/:workoutId", verifyToken, workoutController.updateWorkout);
router.delete("/:clientId/workouts/:workoutId", verifyToken, workoutController.deleteWorkout);







module.exports = router;