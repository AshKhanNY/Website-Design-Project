module.exports = (sequelize, Sequelize) => {
    const Anime = sequelize.define("anime", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });

    return Anime;
}