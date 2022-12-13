module.exports = (sequelize, Sequelize) => {
    const Movievote = sequelize.define("movievote", {
        voted: {
            type: Sequelize.BOOLEAN
        },
        
        unvoted: {
            type: Sequelize.BOOLEAN
        }
    });

    return Movievote;
}