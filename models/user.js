var mongoose = require('mongoose');
var GeoSchema = require('./schemas/geo');
var bcrypt = require('bcrypt'), 
    SALT_WORK_FACTOR = 10;
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String
    },
    googleUserID: String, 
    avatar: String,
    homeLocation: GeoSchema
});


module.exports = mongoose.model('user', UserSchema);