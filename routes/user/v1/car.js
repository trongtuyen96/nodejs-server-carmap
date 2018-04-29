var express = require('express');
var router = express.Router();
var Geo = require('../../../models/schemas/geo')
var mongoose = require('mongoose');
var Car = require('../../../models/car')

// Get car by ID
router.get("/:id", function (req, res, next) {
    var carID = req.params.id;
    // validate the id  -> return 404
    if (!ObjectID.isValid(carID)) {
        return res(404).json({
            success: false,
            message: "Không tìm thấy xe"
        })
    }
    Car
        .findById(carID)
        .then(function (car) {
            if (!car) {
                return res(404).json({
                    success: false,
                    message: "Không tìm thấy xe"
                })
            }
            res.status(200).json(car);
        }).catch(next);
});

// Get all cars
router.get("/", function (req, res, next) {
    Car.find({}).then(function (cars) {
        return res.status(200).json(
            cars
        );
    }).catch(next);
});

module.exports = router;