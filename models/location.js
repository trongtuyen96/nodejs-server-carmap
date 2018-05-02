const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeoSchema = require('./schemas/geo');

const LocationSchema = new Schema({
    geomatry: GeoSchema,
    name: {
        type: String
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})


const Location = mongoose.model('location', LocationSchema);

module.exports = Location;