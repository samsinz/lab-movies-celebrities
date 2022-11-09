const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/create", async (req, res) => {
  try {
    const allCelebrities = await Celebrity.find();
    res.render("movies/new-movie", { allCelebrities });
  } catch (error) {
    console.log(error);
  }
});

router.post("/create", async (req, res) => {
  try {
    const { title, genre, plot, cast } = req.body;
    const numberOfMovies = await Movie.create({ title, genre, plot, cast });
    console.log(`${numberOfMovies.length} movies created`);
    res.redirect("/movies");
  } catch (error) {
    console.log(error);
    res.render("movies/new-movie");
  }
});

router.get("/", async (req, res) => {
  try {
    const allMovies = await Movie.find();
    res.render("movies/movies", { allMovies });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movieDetails = await Movie.findById(req.params.id).populate("cast");
    res.render("movies/movie-details", { movieDetails });
  } catch (error) {
    console.log(error);
  }
});

router.post("/:id/delete", async (req, res) => {
  try {
    await Movie.findByIdAndRemove(req.params.id);
    res.redirect("/movies");
  } catch (error) {
    console.log(error);
    res.redirect("/movies");
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate("cast");
    const celebrities = await Celebrity.find();
    res.render("movies/edit-movie", { movie, celebrities });
  } catch (error) {
    console.log(error);
  }
});

router.post("/:id/edit", async (req, res) => {
  try {
    const { title, genre, plot, cast } = req.body;
    await Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast });
    res.redirect("/movies/" + req.params.id);
  } catch (error) {
    console.log(error);
    res.redirect("/movies");
  }
});

module.exports = router;
