var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GeoSchema = require('./schemas/geo');

var LocationSchema = new Schema({
    geomatry: GeoSchema,
    name: {
        type: String
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})


var Location = mongoose.model('location', LocationSchema);

module.exports = Location;