const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController"); // Ensure this path is correct

router.post("/login", login);
router.post("/register", register);

module.exports = router;
