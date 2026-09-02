const {userRegister, get_login, login_user} = require("../controller/AuthController");
const express = require("express")

const router = express.Router()

router.post("/register", userRegister);
router.get("/login", get_login);
router.post("/login", login_user)

module.exports = router;