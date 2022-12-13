module.exports = app => {
    const moviedata = require("../controllers/animedata.controller.js");

    var router = require("express").Router();

    // Retrieve all animes
    router.get("/", moviedata.findAll);

    app.use("/api/moviedata", router)
};