
const express = require("express");
const router = express.Router();
const listController = require("../controller/list");


router.get("/", listController.get_Listing);

router.get("/new", listController.get_Form);

module.exports = router;