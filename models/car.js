const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeoSchema = require('./schemas/geo')

const CarSchema = new Schema({
    type: Number,
    lastestGeo: GeoSchema,
    currentGeo: GeoSchema,
    speed: Number,
    userID: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

const Car = mongoose.model('car', CarSchema);

module.exports = Car;