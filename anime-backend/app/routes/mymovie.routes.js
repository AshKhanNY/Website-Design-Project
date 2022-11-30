module.exports = app => {
    const movies = require("../controllers/mymovie.controller.js");

    var router = require("express").Router();

    // Create a new movie
    router.post("/", movies.create);

    // Retrieve all movie
    router.get("/:id", movies.findAll);

    // Retrieve 1 movie by title
    router.get("/:id/bytitle", movies.findByTitle);

    // Retrieve all published movies
    router.get("/published", movies.findAllPublished);

    // Retrieve a single movie with id
    router.get("/by/:id", movies.findOne);

    // Update an movie with id
    router.put("/:id", movies.update);

    // Delete an movie wth id
    router.delete("/:id", movies.delete);

    // Delete all movies
    router.delete("/", movies.deleteAll);

    app.use("/api/mymovies", router)
};