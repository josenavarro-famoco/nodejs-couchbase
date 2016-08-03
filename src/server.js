var express = require("express");
var bodyParser = require("body-parser");

var path = require("path");
var config = require("../config");
var port = config.port || 5000;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// All endpoints to be used in this application
var user = require("./api/user.js")(app);
var place = require("./api/place.js")(app);

app.get("/", function(req, res) {
    res.end('Hello');
});

var server = app.listen(port, function() {
    console.log("Listening on port %s...", server.address().port);
});
