const db = require("../models");
const MyAnime = db.myanime;
const Op = db.Sequelize.Op;


// Create and save a new anime
exports.create = (req, res) =>{
    // Validate the request
    if(!req.body.title) {
        res.status(400).send({
            message: req.headers
        });
        return;
    }

    // if valid, create anime
    const anime = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published? req.body.published : false,
        userId: req.body.userId
    };

    console.log("about to create anime")

    // save it in the database
    MyAnime.create(anime)
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

    const id = req.params.id;

    MyAnime.findAll({ where: { userId: id} })
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

// Find a single anime with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    MyAnime.findByPk(id)
        .then(data => {
            if (data){
                res.send(data)
            } else {
                res.status(404).send({
                    message: `Cannot find anime with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving anime with id=" + id
            });
        });
};

// update an anime by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    
    MyAnime.update(req.body, {
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

// Delete an anime with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    MyAnime.destroy({
        where: { id: id}
    })
        .then(num => {
            if (num == 1){
                res.send({
                    message: "Anime was deleted successfully"
                });
            } else {
                res.send({
                    message: `Cannot delete anime with id=${id}. Maybe the anime was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Anime with id=" + id
            });
        });
};

// Delete all animes from the database
exports.deleteAll = (req, res) => {
    MyAnime.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} animes where deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while removing all animes."
            });
        });
};


// Find all published animes
exports.findAllPublished = (req, res) => {
    MyAnime.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving all published animes."
            });
        });
};