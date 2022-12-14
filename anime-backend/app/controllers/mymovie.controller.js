const db = require("../models");
const MyMovie = db.mymovie;
const Op = db.Sequelize.Op;


// Create and save a new movie
exports.create = (req, res) =>{
    // Validate the request
    if(!req.body.title) {
        res.status(400).send({
            message: req.headers
        });
        return;
    }

    // if valid, create anime
    const movie = {
        title: req.body.title,
        image: req.body.image,
        genre: req.body.genre,
        score: req.body.score,
        published: req.body.published? req.body.published : false,
        userId: req.body.userId,
        votes: 0
    };

    console.log("about to create movie")

    // save it in the database
    MyMovie.create(movie)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the movie."
            });
        });
};

// Retrieve all animes from the database.
exports.findAll = (req, res) => {
    const id = req.params.id;

    MyMovie.findAll({ where: { userId: id} })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving movies."
            });
        });
};

exports.findByTitle = (req, res) => {
    const title = req.query.title;
    var condition = title? { title: { [Op.eq]: `$%{title}%` } } : null

    MyMovie.findAll({ where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving movies."
            });
        });
};

// Find a single movie with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    MyMovie.findByPk(id)
        .then(data => {
            if (data){
                res.send(data)
            } else {
                res.status(404).send({
                    message: `Cannot find movie with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving movie with id=" + id
            });
        });
};

// update an movie by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    
    MyMovie.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1){
                res.send({
                    message: "Movie was updated successfully"
                });
            } else {
                res.send({
                    message: `Cannot update movie with id=${id}. Maybe it was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating movie with id=" + id
            });
        });
};

// Delete an movie with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    MyMovie.destroy({
        where: { id: id}
    })
        .then(num => {
            if (num == 1){
                res.send({
                    message: "Movie was deleted successfully"
                });
            } else {
                res.send({
                    message: `Cannot delete movie with id=${id}. Maybe the movie was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Movie with id=" + id
            });
        });
};

// Delete all movies from the database
exports.deleteAll = (req, res) => {
    MyMovie.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} movies where deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while removing all movies."
            });
        });
};


// Find all published movies
exports.findAllPublished = (req, res) => {
    MyMovie.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving all published movies."
            });
        });
};