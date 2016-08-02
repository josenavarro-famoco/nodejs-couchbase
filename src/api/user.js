var bcrypt = require("bcryptjs");
var UserModel = require("../models/user");

var appRouter = function(app) {

    app.get("/api/users/:userId", function(req, res) {
        if(!req.params.userId) {
            return res.status(400).send({"status": "error", "message": "A user id is required"});
        }
        UserModel.getById(req.params.userId, function(error, user) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send(user);
        });
    });

    app.get("/api/users", function(req, res) {
        UserModel.find({}, function(error, users) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send(users);
        });
    });

    app.get("/api/users/login/:email/:password", function(req, res) {
        if(!req.params.email) {
            return res.status(400).send({"status": "error", "message": "An email is required"});
        } else if(!req.params.password) {
            return res.status(400).send({"status": "error", "message": "A password is required"});
        }
        UserModel.findByEmail(req.params.email, function(error, users) {
            if(error) {
                return res.status(400).send(error);
            }
            if(users.length > 0) {
                if(bcrypt.compareSync(req.params.password, users[0].password)) {
                    res.send(users[0]);
                } else {
                    res.status(400).send({"status": "error", "message": "Password is invalid"});
                }
            } else {
                res.status(400).send({"status": "error", "message": "Email does not exist"});
            }
        });
    });

    app.post("/api/users", function(req, res) {
        var user = new UserModel({
            name: {
                first: req.body.name.first,
                last: req.body.name.last
            },
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        });
        user.save(function(error, result) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send({result:'success', message:'user created', user: user});
        });
    });

};

module.exports = appRouter;
