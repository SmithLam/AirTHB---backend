var express = require("express");
var router = express.Router();

const { createFaker } = require("../controllers/testController");

router.route("/").post(createFaker);

module.exports = router;
