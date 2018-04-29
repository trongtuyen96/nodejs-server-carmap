var express = require('express');
var router = express.Router();
var Geo = require('../../../models/schemas/geo')
var mongoose = require('mongoose');
var Location = require('../../../models/location')


router.get("/:id", function (req, res, next) {
    var locationID = req.params.id;
    // validate the id  -> return 404
    if (!ObjectID.isValid(locationID)) {
        return res(404).json({
            success: false,
            message: "Không tìm thấy địa điểm"
        })
    }
    Location
        .findById(locationID)
        .then(function (location) {
            if (!location) {
                return res(404).json({
                    success: false,
                    message: "Không tìm thấy địa điểm"
                })
            }
            res.status(200).json(location);
        }).catch(next);
});

// Get all locations
router.get("/", function (req, res, next) {
    Location.find({}).then(function (locations) {
        return res.status(200).json(
            locations
        );
    }).catch(next);
});


module.exports = router;