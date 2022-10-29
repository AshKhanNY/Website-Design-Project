const express = require("express");
const cors = require("cors");

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
//We re-sync during development only
db.sequelize.sync({ force: true}).then(() => {
    console.log("Drop and re-sync db.");
})


// simple route for testing
app.get("/", (req, res) => {
    res.json({ message: "Welcome to anime list." });
});

require("./app/routes/anime.routes")(app);


// set pport, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});