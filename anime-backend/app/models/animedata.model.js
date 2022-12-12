module.exports = (sequelize, Sequelize) => {
    const Animedata = sequelize.define("animedata", {
        title: {
            type: Sequelize.STRING
        },
        score: {
            type: Sequelize.STRING
        },
        genre: {
            type: Sequelize.STRING
        },
        studio: {
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

    return Animedata;
}