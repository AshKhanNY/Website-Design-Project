module.exports = app => {
    const animedata = require("../controllers/animedata.controller.js");

    var router = require("express").Router();

    // Retrieve all animes
    router.get("/", animedata.findAll);

    app.use("/api/animedata", router)
};