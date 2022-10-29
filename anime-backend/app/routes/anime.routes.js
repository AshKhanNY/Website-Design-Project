module.exports = app => {
    const animes = require("../controllers/anime.controller.js");

    var router = require("express").Router();

    // Create a new anime
    router.post("/", animes.create);

    // Retrieve all animes
    router.get("/", animes.findAll);

    // Retrieve all published animes
    router.get("/published", animes.findAllPublished);

    // Retrieve a single anime with id
    router.get("/:id", animes.findOne);

    // Update an anime with id
    router.put("/:id", animes.update);

    // Delete an anime wth id
    router.delete("/:id", animes.delete);

    // Delete all animes
    router.delete("/", animes.deleteAll);

    app.use("/api/animes", router)
};