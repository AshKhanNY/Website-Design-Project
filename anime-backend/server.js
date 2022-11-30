const express = require("express");
const bodyParser = require("body-parser")//Not necessary as it is included in the express.json(). However, I will keep it in case of errors
const cors = require("cors");
var bcrypt = require("bcryptjs");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};


app.use(cors(corsOptions));

// parse request of content-type -application/json
app.use(express.json());

// parse request of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;//We are going to create some initial rows

//We re-sync during development only
db.sequelize.sync({ force: true}).then(() => {
    console.log("Drop and re-sync db.");
    initial();//For production we will insert the initial rows manually
})


// simple route for testing
app.get("/", (req, res) => {
    res.json({ message: "Welcome to anime list." });
});

//routes
require("./app/routes/anime.routes")(app);
require("./app/routes/movie.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/myanime.routes")(app);
require("./app/routes/mymovie.routes")(app);


// set pport, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial(){
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}