const router = require("express").Router({ mergeParams: true });


const {
  getExperiences,
  getSingleExperience,
  createExperience,
  deleteExperience,
  updateExperience,
} = require("../controllers/expController");

// const { loginRequired, hostRequired } = require("../middleware/auth");

router.route("/").get(getExperiences).post(createExperience);

router
  .route("/:expID")
  .get(getSingleExperience)
  .patch(updateExperience)
  .delete(deleteExperience);

module.exports = router;
