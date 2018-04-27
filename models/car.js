var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GeoSchema = require('./schemas/geo')

var CarSchema = new Schema({
    type: Number,
    lastestGeo: GeoSchema,
    currentGeo: GeoSchema,
    speed: Number,
    userID: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

var Car = mongoose.model('car', CarSchema);

module.exports = Car;