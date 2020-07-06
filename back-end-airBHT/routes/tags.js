const router = require("express").Router({ mergeParams: true });

const {
  getTags,
} = require("../controllers/tagController");

// const { loginRequired, hostRequired } = require("../middleware/auth");


router.route("/").get(getTags)


module.exports = router;
