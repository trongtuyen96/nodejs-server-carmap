const express = require('express');
const router = express.Router();
const Geo = require('../../../models/schemas/geo')
const mongoose = require('mongoose');
const Report = require('../../../models/report')

// Get nearby report leads to this and output: Không tìm thấy report ??????
// Get report by id
// router.get("/:id", (req, res, next) => {
//     let reportID = req.params.id;
//     // validate the id  -> return 404
//     if (!ObjectID.isValid(reportID)) {
//         return res(404).json({
//             success: false,
//             message: "Không tìm thấy report"
//         })
//     }
//     Report
//         .findById(reportID)
//         .then((report) => {
//             if (!report) {
//                 return res(404).json({
//                     success: false,
//                     message: "Không tìm thấy report"
//                 })
//             }
//             res.status(200).json(location);
//         }).catch(next);
// });

// Get all reports
router.get("/", (req, res, next) => {
    Report.find({}).then((reports) => {
        return res.status(200).json(
            reports
        );
    }).catch(next);
});

// Update number of reports
router.put("/:id/updateNumReport", (req, res, next) => {
    let reportID = req.params.id;
    // validate the id  -> return 404
    // if (!mongoose.Types.ObjectId.isValid(reportID)) {
    //     return res.status(404).json({
    //         success: false,
    //         message: "Không tìm thấy report"
    //     })
    // }
    // Report
    //     .findByIdAndUpdate(reportID, {
    //         numReport: numReport + 1
    //     })
    //     .then((report) => {
    //         if (report.numReport >= 2) {
    //             Report.findByIdAndUpdate(reportID, {
    //                 status: true
    //             }).then((report) => {
    //                 return res.status(200).send({
    //                     success: true,
    //                     report: report
    //                 });
    //             })
    //         }
    //         return res.status(200).send({
    //             success: true,
    //             report: report
    //         });
    //     }).catch(next);
    Report
        .findByIdAndUpdate(reportID, {
            $inc: { numReport: 1 }
        })
        .then((report) => {
            return res.status(200).send({
                success: true,
                report: report
            });
        }).catch(next);
})

// Update number of delete
router.put("/:id/updateNumDelete", (req, res, next) => {
    let reportID = req.params.id;
    // validate the id  -> return 404
    // if (mongoose.Types.ObjectId.isValid(reportID)) {
    //     return res.status(404).json({
    //         success: false,
    //         message: "Không tìm thấy report"
    //     })
    // }
    // Report
    //     .findByIdAndUpdate(reportID, {
    //         numDelete: numDelete + 1
    //     })
    //     .then((report) => {
    //         if (report.numDelete >= 2) {
    //             Report.findByIdAndRemove(reportID).then((report) => {
    //                 return res.status(200).send({
    //                     success: true
    //                 });
    //             })
    //         }
    //         return res.status(200).send({
    //             success: true
    //         });
    //     }).catch(next);
    Report
        .findByIdAndUpdate(reportID, {
            $inc: { numDelete: 1 }
        })
        .then((report) => {
            if (report.numDelete >= 2) {
                Report.findByIdAndRemove(reportID).then((report) => {
                    return res.status(200).send({
                        success: true
                    });
                })
            }
            return res.status(200).send({
                success: true
            });
        }).catch(next);
})

router.post("/", (req, res, next) => {
    let report = new Report({
        type: req.body.type,
        subtype1: req.body.subtype1,
        subtype2: req.body.subtype2,
        description: req.body.description,
        geometry: req.body.geometry,
        userID: req.body.userID,
        numReport: req.body.numReport,
        numDelete: req.body.numDelete,
        status: req.body.status,
        byteAudioFile: req.body.byteAudioFile,
        byteImageFile: req.body.byteImageFile,
        phoneNumber: req.body.phoneNumber
    });
    report.save().then((report) => {
        res.send(report)
    }).catch(next);
});

router.get("/nearby", (req, res, next) => {
    var lat = parseFloat(req.query.lat);
    var lng = parseFloat(req.query.lng);
    var radius = parseFloat(req.query.radius) || 300; //in meters

    if ((!lng && lng !== 0) || (!lat && lat !== 0)) {
        return res.status(422).json({
            success: false,
            message: "Yêu cầu tọa độ hiện tại với các tham số lng, lat"
        });
    }

    var centralPoint = {
        type: "Point",
        coordinates: [lng, lat]
    };

    var geoOptions = {
        spherical: true,
        maxDistance: radius
    };

    console.log("Nearby Location: " + lat + "; " + lng);

    Report.geoNear(centralPoint, geoOptions).then((results) => {
        //console.log("Time consumed: " + stats.time);

        var reports = [];
        var distances = [];
        results.forEach((result) => {
            reports.push(result.obj);
            distances.push(result.dis);
        });

        return res.status(200).json({
            reports: reports,
            distances: distances
        });
    }).catch(next);
});

// Update voice base64
router.put("/:id/updateBase64Voice", (req, res, next) => {
    let reportID = req.params.id;

    // validate the id  -> return 404
    // if (mongoose.Types.ObjectId.isValid(reportID)) {
    //     return res.status(404).json({
    //         success: false,
    //         message: "Không tìm thấy report"
    //     })
    // }
    Report
        .findByIdAndUpdate(reportID, {
            byteAudioFile: req.body.base64Voice
        })
        .then((report) => {
            if (!report) {
                return res.status(404).json({
                    success: false,
                    message: "Không tìm thấy report"
                });
            }
            return res.status(200).send({
                success: true,
                report: report
            });
        }).catch(next);
})

// Delete report
router.delete("/:id/delete", (req, res, next) => {
    let reportID = req.params.id;

    // let sreportID = new mongoose.Types.ObjectId(reportID)
    // // validate the id  -> return 404
    // if (mongoose.Types.ObjectId.isValid(sreportID)) {
    //     return res.status(404).json({
    //         success: false,
    //         message: "Không tìm thấy report"
    //     })
    // }
    Report
        .findByIdAndRemove(reportID)
        .then(() => {
            return res.status(200).send({
                success: true
            });
        }).catch(next);
})


module.exports = router;