const dbConfig  = require("../config/db.config.js");
const slugify   = require('slugify');
const mongoose  = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./users.model.js")(mongoose);
//db.auctions = require('./auctions.model.js')(mongoose);
db.auctions = require('./auctions.model.js')(mongoose);


module.exports = db;