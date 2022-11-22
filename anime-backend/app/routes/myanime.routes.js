module.exports = app => {
    const animes = require("../controllers/myanime.controller.js");

    var router = require("express").Router();

    // Create a new anime
    router.post("/", animes.create);

    // Retrieve all animes
    router.get("/:id", animes.findAll);

    // Retrieve 1 anime by title
    router.get("/:id/bytitle", animes.findByTitle);

    // Retrieve all published animes
    router.get("/published", animes.findAllPublished);

    // Retrieve a single anime with id
    router.get("/by/:id", animes.findOne);

    // Update an anime with id
    router.put("/:id", animes.update);

    // Delete an anime wth id
    router.delete("/:id", animes.delete);

    // Delete all animes
    router.delete("/", animes.deleteAll);

    app.use("/api/myanimes", router)
};