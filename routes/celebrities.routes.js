const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", async (req, res) => {
  try {
    const { name, occupation, catchPhrase } = req.body;
    const numberOfCelebrities = await Celebrity.create({ name, occupation, catchPhrase });
    console.log(`${numberOfCelebrities.length} celebrities created`);
    res.redirect("/celebrities");
  } catch (error) {
    console.log(error);
    res.render("celebrities/new-celebrity");
  }
});

router.get("/", async (req, res) => {
  try {
    const allCelebrities = await Celebrity.find();
    res.render("celebrities/celebrities", { allCelebrities });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
