var ottoman = require("ottoman");

ottoman.bucket = require("../db").bucket;

var PlaceMdl = ottoman.model("Place", {
    createdON: {type: "Date", default:function(){return new Date()}},
    name: "string",
    address: {
      street: "string",
      city: "string",
      state: "string",
      zip: "integer",
      country: {type: "string", default: "USA"}
    },
    type: { type: 'string', default: 'place'}
}, {
    index: {
        findByName: {
            by: "name",
            type: "refdoc"
        }
    }
});

module.exports=PlaceMdl;
