const express = require('express');
const router = express.Router();
const Geo = require('../../../models/schemas/geo')
const mongoose = require('mongoose');
const Location = require('../../../models/location')


router.get("/:id", (req, res, next) => {
    let locationID = req.params.id;
    // validate the id  -> return 404
    if (!ObjectID.isValid(locationID)) {
        return res(404).json({
            success: false,
            message: "Không tìm thấy địa điểm"
        })
    }
    Location
        .findById(locationID)
        .then((location) => {
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
router.get("/", (req, res, next) => {
    Location.find({}).then((locations) => {
        return res.status(200).json(
            locations
        );
    }).catch(next);
});


module.exports = router;