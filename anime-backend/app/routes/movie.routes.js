module.exports = app => {
    const movies = require("../controllers/movie.controller.js");

    var router = require("express").Router();

    // Create a new anime
    router.post("/", movies.create);

    // Retrieve all movies
    router.get("/", movies.findAll);

    // Retrieve all published animes
    router.get("/published", movies.findAllPublished);

    // Retrieve a single movie with id
    router.get("/:id", movies.findOne);

    // Update an movie with id
    router.put("/:id", movies.update);

    // Delete an movie wth id
    router.delete("/:id", movies.delete);

    // Delete all movies
    router.delete("/", movies.deleteAll);

    app.use("/api/movies", router)
};