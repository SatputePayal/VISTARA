
const express = require("express");
const router = express.Router();
const listController = require("../controller/list");
const {validationListing} = require("../middelware.js");
const multer  = require('multer');
const {storage} = require("../config/config.js");
const upload = multer({ storage });


router.get("/", listController.get_Listing);

router.get("/new", listController.get_Form);

router.get("/:id", listController.showList);
router.post("/", upload.single("Listing[image]"),validationListing, listController.post_Form)

module.exports = router;