const express = require("express")
const router = express.Router();
const clientController = require("../controllers/clientController");
const workoutController = require("../controllers/workoutController")
const { verifyToken } = require("../middleware/auth");


// API/CLIENT ROUTES
router.post("/", verifyToken, clientController.createClient)
router.get("/", verifyToken, clientController.getClients);
router.get("/:clientId", verifyToken, clientController.getClient);
router.delete("/:clientId", verifyToken, clientController.deleteClient);


// API/CLIENT/WORKOUT ROUTES
router.post("/:clientId/workout", verifyToken, workoutController.createWorkout);
router.patch("/:clientId/workout/:workoutId", verifyToken, workoutController.updateWorkout);
router.get("/:clientId/workout/:workoutId", verifyToken, workoutController.getWorkout);
router.get("/:clientId/workout", verifyToken, workoutController.getWorkouts);
router.delete("/:clientId/workout/:workoutId", verifyToken, workoutController.deleteWorkout);







module.exports = router;