var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GeoSchema = require('./schemas/geo');

var ReportSchema = new Schema({
    type: {
        type: Number,
        require: true
    },
    desciption:{
        type: String
    },
    geomatry: GeoSchema,
    severity: {
        type: Number,
        required: true
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})


var Report = mongoose.model('report', ReportSchema);

module.exports = Report;