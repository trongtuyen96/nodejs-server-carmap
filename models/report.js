const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeoSchema = require('./schemas/geo');

const ReportSchema = new Schema({
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


const Report = mongoose.model('report', ReportSchema);

module.exports = Report;