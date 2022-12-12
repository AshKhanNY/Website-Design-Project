const db = require("../models");
const Animedata = db.animedata;
const Op = db.Sequelize.Op;


// Retrieve all animes from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title? { title: { [Op.like]: `%${title}%` } } : null

    Animedata.findAll({ where: condition})
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






