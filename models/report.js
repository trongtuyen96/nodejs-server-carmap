const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeoSchema = require('./schemas/geo');

const ReportSchema = new Schema({
    type: {
        type: Number,
        require: true
    },
    subtype1: {
        type: String,
        default: ""
    },
    subtype2: {
        type: String,
        default: ""
    },
    desciption: {
        type: String,
        default: ""
    },
    geometry: GeoSchema,
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    numReport: Number,
    numDelete: Number,
    status: Boolean,
    byteAudioFile: {
        type: String,
        default: ""
    },
    byteImageFile: {
        type: String,
        default: ""
    },
    phoneNumber: String
})


const Report = mongoose.model('report', ReportSchema);

module.exports = Report;