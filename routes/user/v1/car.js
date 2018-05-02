const express = require('express');
const router = express.Router();
const Geo = require('../../../models/schemas/geo')
const mongoose = require('mongoose');
const Car = require('../../../models/car')

// Get car by ID
router.get("/:id", (req, res, next) => {
    let carID = req.params.id;
    // validate the id  -> return 404
    if (!ObjectID.isValid(carID)) {
        return res(404).json({
            success: false,
            message: "Không tìm thấy xe"
        })
    }
    Car
        .findById(carID)
        .then((car) => {
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
router.get("/", (req, res, next) => {
    Car.find({}).then( (cars) => {
        return res.status(200).json(
            cars
        );
    }).catch(next);
});

module.exports = router;