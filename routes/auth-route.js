// ! Package
const express = require("express");
const { registerController, loginController, logoutController, logoutAllController, refreshTokenController } = require("../controllers/auth-controller.js");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/logoutall", logoutAllController);
router.post("/refreshtoken", refreshTokenController);

module.exports = router;
