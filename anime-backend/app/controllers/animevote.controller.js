const db = require("../models");
const Animevote = db.animevote;
const Op = db.Sequelize.Op;



exports.create = (req, res) =>{
    // Validate the request
    if(!req.body.userId && !req.body.animeId) {
        res.status(400).send({
            message: req.headers
        });
        return;
    }

    // if valid, create anime
    const vote = {
        userId: req.body.userId,
        animeId: req.body.animeId,
        voted: req.body.voted,
        unvoted: req.body.unvoted
    };

    // save it in the database
    Animevote.create(vote)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the anime."
            });
        });
};

// Retrieve all animes from the database.
exports.findAll = (req, res) => {
    const uid = req.params.uid
    const aid = req.params.aid

    Animevote.findAll({ where: { userId: uid, animeId: aid } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving animes."
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;
    
    Animevote.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1){
                res.send({
                    message: "Anime was updated successfully"
                });
            } else {
                res.send({
                    message: `Cannot update anime with id=${id}. Maybe it was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating anime with id=" + id
            });
        });
};






