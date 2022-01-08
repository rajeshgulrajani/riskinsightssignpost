const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();


const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Access-Control-Allow-Origin", "Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  credentials: true
};
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
//db.sequelize.sync().then(() => {
  db.sequelize.sync({alter: true}).then(() => {

    console.log("re-sync db.");
  });

// simple route
app.get("/", (req, res) => {
  console.log("req"+req.body)
  res.json({ message: "Welcome to signpost application." });
});
// simple route

require("./app/routes/signpostsnaphost.routes")(app);
require("./app/routes/signpost.routes")(app);

//app.use('/signpost/snapshot',require("./app/routes/signpostsnaphost.routes"));
//app.use('/signpost',require("./app/routes/signpost.routes"));

// set port, listen for requests
const PORT = process.env.PORT || 8087;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});