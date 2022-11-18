module.exports = (sequelize, Sequelize) => {
    const MyAnime = sequelize.define("myanime", {
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

    return MyAnime;
}