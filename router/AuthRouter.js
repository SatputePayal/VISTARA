const userRegister = require("../controller/AuthController")
const express = require("express")

const router = express.Router()

router.post("/register", userRegister);

module.exports = router;