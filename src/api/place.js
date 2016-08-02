var PlaceModel = require("../models/place");

var appRouter = function(app) {

  app.get("/api/places", function(req, res) {
    PlaceModel.find({}, function(error, places) {
      if(error) {
        return res.status(400).send(error);
      }
      res.send(places);
    });
  });

  // app.get("/api/places/:placeId", function(req, res) {
  //   if(!req.params.placeId) {
  //     return res.status(400).send({"status": "error", "message": "A place id is required"});
  //   }
  //   PlaceModel.getById(req.params.placeId, function(error, place) {
  //     if(error) {
  //       return res.status(400).send(error);
  //     }
  //     res.send(place);
  //   });
  // });

  app.get("/api/places/:placeId", function(req, res) {
    if(!req.params.placeId) {
      return res.status(400).send({"status": "error", "message": "A place id is required"});
    }
    PlaceModel.findByName(req.params.placeId, function(error, place) {
      if(error) {
        return res.status(400).send(error);
      }
      res.send(place);
    });
  });

  app.post("/api/places", function(req, res) {
    var place = new PlaceModel({
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        state: req.body.address.state,
        zip: req.body.address.zip,
        country: req.body.address.country
      }
    });
    place.save(function(error, result) {
      if(error) {
        return res.status(400).send(error);
      }
      res.send({ result: 'created', data: place});
    });
  });

};

module.exports = appRouter;
