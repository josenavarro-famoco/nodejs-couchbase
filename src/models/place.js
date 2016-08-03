var ottoman = require("ottoman");

ottoman.bucket = require("../db").bucket;

var PlaceMdl = ottoman.model("Place", {
    createdON: {type: "Date", default:function(){return new Date()}},
    type: { type: 'string', default: 'place'},
    name: "string",
    address: {
      street: {type: "string", default: ""},
      city: {type: "string", default: ""},
      country: {type: "string", default: ""}
    },
    image: { type: 'string', default: ''},
    location: {
      lat: 'number',
      long: 'number'
    },
    rating: { type: 'number', default: '0'},
}, {
    index: {
        findByName: {
            by: "name",
            type: "refdoc"
        }
    }
});

module.exports=PlaceMdl;
