var ottoman = require("ottoman");

ottoman.bucket = require("../db").bucket;

var UserMdl = ottoman.model("User", {
    createdON: {type: "Date", default:function(){return new Date()}},
    type: {type: "string", default:'user'},
    username: {
        first: "string",
        last: "string"},
    email: "string",
    password: "string",
}, {
    index: {
        findByEmail: {
            by: "email",
            type: "refdoc"
        },
        findByLastName: {
            by: "name.last",
            type: "n1ql"
        }
    }
});

module.exports=UserMdl;
