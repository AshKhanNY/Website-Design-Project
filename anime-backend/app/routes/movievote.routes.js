module.exports = app => {
    const movievote = require("../controllers/movievote.controller.js");

    var router = require("express").Router();


    //cast a vote
    router.post("/", movievote.create);

    // Retrieve all animes
    router.get("/:uid/:aid", movievote.findAll);

    app.use("/api/movievote", router)
};