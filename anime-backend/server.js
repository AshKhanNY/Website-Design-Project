const express = require("express");
const bodyParser = require("body-parser")//Not necessary as it is included in the express.json(). However, I will keep it in case of errors
const cors = require("cors");
var bcrypt = require("bcryptjs");

const fs = require("fs");
const fastcsv = require("fast-csv");
const Pool = require("pg").Pool;

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


//This code loads the data for movies and animes
let stream = fs.createReadStream("../animelist_csv.csv");
let csvData = [];

let csvStream = fastcsv
    .parse()
    .on("data", function(data){
        csvData.push(data);
    })
    .on("end", function() {
        csvData.shift();

        const pool = new Pool({
            host: "localhost",
            user: "root",
            database: "testdb",
            password: "password",
            port: 5432
        });

        const query = "INSERT INTO animedata (title, image, score, studio, genre, created_at) VALUES ($1, $2, $3, $4, $5, $6)";

        pool.connect((err, client, done) => {
            if (err) throw err;
            try{
                csvData.forEach(row => {
                    client.query(query, row, (err, res) => {
                        if (err) {
                            console.log(err.stack);
                        } else {
                            console.log("inserted " + res.rowCount + " row:", row)
                        }
                    });
                });
            } finally {
                done();
            }
        });
    });

let stream2 = fs.createReadStream("../movielist_csv.csv");
let csvData2 = [];

let csvStream2 = fastcsv
    .parse()
    .on("data", function(data){
        csvData2.push(data);
    })
    .on("end", function() {
        csvData2.shift();

        const pool = new Pool({
            host: "localhost",
            user: "root",
            database: "testdb",
            password: "password",
            port: 5432
        });

        const query = "INSERT INTO moviedata (title, score, genre, image, created_at) VALUES ($1, $2, $3, $4, $5)";

        pool.connect((err, client, done) => {
            if (err) throw err;
            try{
                csvData2.forEach(row => {
                    client.query(query, row, (err, res) => {
                        if (err) {
                            console.log(err.stack);
                        } else {
                            console.log("inserted " + res.rowCount + " row:", row)
                        }
                    });
                });
            } finally {
                done();
            }
        });
    });

//End of the loading code


//We re-sync during development only
db.sequelize.sync({ force: true}).then(() => {
    console.log("Drop and re-sync db.");
    initial();//For production we will insert the initial rows manually
    stream.pipe(csvStream);
    stream2.pipe(csvStream2);
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
require("./app/routes/animedata.routes")(app);


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
