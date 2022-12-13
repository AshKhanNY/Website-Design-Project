module.exports = (sequelize, Sequelize) => {
    const Animevote = sequelize.define("animevote", {
        voted: {
            type: Sequelize.BOOLEAN
        },
        
        unvoted: {
            type: Sequelize.BOOLEAN
        }
    });

    return Animevote;
}