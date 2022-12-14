module.exports = app => {
    const animevote = require("../controllers/animevote.controller.js");

    var router = require("express").Router();


    //cast a vote
    router.post("/", animevote.create);

    // Retrieve all animes
    router.get("/:uid/:aid", animevote.findAll);

    router.put("/:id", animevote.update);

    app.use("/api/animevote", router)
};