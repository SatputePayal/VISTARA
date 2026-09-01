const {userRegister,TokenVerification, Verified} = require("../controller/AuthController");
const express = require("express")

const router = express.Router()

router.post("/register", userRegister);
router.post("/verification", TokenVerification);
router.get("/login",Verified)

module.exports = router;