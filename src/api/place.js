var PlaceModel = require("../models/place");

var appRouter = function(app) {

  app.get("/api/places", function(req, res) {
    PlaceModel.find({}, function(error, places) {
      if(error) {
        return res.status(400).send(error);
      }
      console.log('PLACES: ' + places);
      res.send({ result: 'success', data: places});
    });
  });

  app.get("/api/places/:placeId", function(req, res) {
    if(!req.params.placeId) {
      return res.status(400).send({"status": "error", "message": "A place id is required"});
    }
    PlaceModel.findByName(req.params.placeId, function(error, place) {
      if(error) {
        return res.status(400).send(error);
      }
      res.send({ result: 'succes', data: place});
    });
  });

  app.post("/api/places", function(req, res) {
    var place = new PlaceModel({
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        country: req.body.address.country
      },
      image: req.body.address.image,
      location: {
        lat: req.body.location.lat,
        long: req.body.location.long
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
