const router = require("express").Router();

router.use("/celebrities", require("./celebrities.routes.js"));
router.use("/movies", require("./movies.routes.js"));

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
