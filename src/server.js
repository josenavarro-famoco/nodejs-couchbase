var express = require("express");
var bodyParser = require("body-parser");

var path = require("path");
var config = require("../config");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// All endpoints to be used in this application
var company = require("./api/company.js")(app);
var user = require("./api/user.js")(app);
var place = require("./api/place.js")(app);

app.get("/", function(req, res) {
    res.end('Hello');
});

var server = app.listen(3000, function() {
    console.log("Listening on port %s...", server.address().port);
});
