module.exports = (sequelize, Sequelize) => {
    const MyMovie = sequelize.define("mymovie", {
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

    return MyMovie;
}