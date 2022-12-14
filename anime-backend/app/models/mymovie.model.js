module.exports = (sequelize, Sequelize) => {
    const MyMovie = sequelize.define("mymovie", {
        title: {
            type: Sequelize.STRING
        },
        image:{
            type: Sequelize.STRING
        },
        genre: {
            type: Sequelize.STRING
        },
        score: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        },
        votes: {
            type: Sequelize.STRING
        }
    });

    return MyMovie;
}