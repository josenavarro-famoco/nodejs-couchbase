var couchbase = require("couchbase");

var config = require("../config");

module.exports.bucket = (new couchbase.Cluster(config.couchbase.server)).openBucket(config.couchbase.bucket);
