// ! Package
const express = require("express");
const { registerController, loginController, logoutController, logoutAllController } = require("../controllers/auth-controller.js");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/logoutall", logoutAllController);

module.exports = router;
