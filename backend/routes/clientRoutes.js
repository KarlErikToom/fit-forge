const express = require("express")
const router = express.Router();
const clientController = require("../controllers/clientController");
const { verifyToken } = require("../middleware/auth");



router.post("/", verifyToken, clientController.createClient)




module.exports = router;