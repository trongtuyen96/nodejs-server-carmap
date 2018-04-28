var express = require('express');
var router = express.Router();
var Geo = require('../../../models/schemas/geo')
var mongoose = require('mongoose');
var Report = require('../../../models/report')

// Get report by id
router.get("/:id", function (req, res, next) {
    var reportID = req.params.id;
    // validate the id  -> return 404
    if (!ObjectID.isValid(reportID)) {
        return res.status(404).send('Không tìm thấy report');
    }
    Report
        .findById(reportID)
        .then(function (report) {
            if (!report) {
                return res(404).json({
                    success: false,
                    message: "Không tìm thấy report"
                })
            }
            res.status(200).json(location);
        }).catch(next);
});

// Get all reports
router.get("/", function (req, res, next) {
    Report.find({}).then(function (reports) {
        return res.status(200).json(
            reports
        );
    }).catch(next);
});


module.exports = router;