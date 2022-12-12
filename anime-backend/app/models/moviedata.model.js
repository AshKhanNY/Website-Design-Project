module.exports = (sequelize, Sequelize) => {
    const Moviedata = sequelize.define("moviedata", {
        title: {
            type: Sequelize.STRING
        },
        score: {
            type: Sequelize.STRING
        },
        genre: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        createdAt: {
            field: 'created_at',
            type: Sequelize.DATE,
        },
        updatedAt: {
            field: 'updated_at',
            type: Sequelize.DATE,
        }
    });

    return Moviedata;
}