const express = require("express");

const authController = require("../controllers/auth");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.post("/login", authController.postLogin);

router.post("/signup", authController.postSignup);

router.post("/logout", isAuth, authController.postLogout);

module.exports = router;
