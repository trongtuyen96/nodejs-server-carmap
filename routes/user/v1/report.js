const express = require('express');
const router = express.Router();
const Geo = require('../../../models/schemas/geo')
const mongoose = require('mongoose');
const Report = require('../../../models/report')

// Get report by id
router.get("/:id", (req, res, next) => {
    let reportID = req.params.id;
    // validate the id  -> return 404
    if (!ObjectID.isValid(reportID)) {
        return res(404).json({
            success: false,
            message: "Không tìm thấy report"
        })
    }
    Report
        .findById(reportID)
        .then((report) => {
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
router.get("/", (req, res, next) => {
    Report.find({}).then((reports) => {
        return res.status(200).json(
            reports
        );
    }).catch(next);
});


module.exports = router;