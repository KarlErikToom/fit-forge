const express = require("express")
const router = express.Router();
const clientController = require("../controllers/clientController");
const workoutController = require("../controllers/workoutController")
const { verifyToken } = require("../middleware/auth");


router.get("/", verifyToken, clientController.getClients);
router.get("/:clientId", verifyToken, clientController.getClient);


router.post("/", verifyToken, clientController.createClient)

router.post("/:clientId/workout", verifyToken, workoutController.createWorkout);

router.patch("/:clientId/workout/:workoutId", verifyToken, workoutController.updateWorkout);


module.exports = router;