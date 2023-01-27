const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
router.post("/login", userController.logIn);
router.post("/signup", userController.signup);
router.get("/verification", userController.verifyUser);
module.exports = router;
