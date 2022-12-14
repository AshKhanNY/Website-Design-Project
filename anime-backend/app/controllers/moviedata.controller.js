const db = require("../models");
const Moviedata = db.moviesdata;
const Op = db.Sequelize.Op;


// Retrieve all movies from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title? { title: { [Op.like]: `%${title}%` } } : null

    Moviedata.findAll({ where: condition})
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