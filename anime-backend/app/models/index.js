const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.animes = require("./anime.model.js")(sequelize, Sequelize);
db.movies = require("../models/movie.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.myanime = require("../models/myanime.model.js")(sequelize, Sequelize);
db.mymovie = require("../models/mymovie.model.js")(sequelize, Sequelize);
db.animedata = require("../models/animedata.model.js")(sequelize, Sequelize);
db.moviedata = require("../models/moviedata.model.js")(sequelize, Sequelize);
db.animevote = require("../models/animevote.model.js")(sequelize, Sequelize);
db.movievote = require("../models/movievote.model.js")(sequelize, Sequelize);

db.myanime.belongsTo(db.user, {
    foreignKey: "userId",
});

db.mymovie.belongsTo(db.user, {
    foreignKey: "userId",
});

db.animevote.belongsTo(db.user, {
    foreignKey: "userId",
});

db.animevote.belongsTo(db.myanime, {
    foreignKey: "animeId",
});

db.movievote.belongsTo(db.user, {
    foreignKey: "userId",
});

db.movievote.belongsTo(db.mymovie, {
    foreignKey: "movieId",
});

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];


module.exports = db;