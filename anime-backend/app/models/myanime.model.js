module.exports = (sequelize, Sequelize) => {
    const MyAnime = sequelize.define("myanime", {
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

    return MyAnime;
}