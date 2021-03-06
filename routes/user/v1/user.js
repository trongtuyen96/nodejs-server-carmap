const express = require('express');
const User = require('../../../models/user');
const Car = require('../../../models/car');
const router = express.Router();
const Geo = require('../../../models/schemas/geo');

// Require authenticate
const authenticate = require('./auth-middleware');


// Api for users
router.get("/profile", authenticate, (req, res, next) => {
    let userID = req.decoded.userID;
    if (!userID) {
        return res.status(422).send({
            success: false,
            message: "Không thể truy cập userID"
        });
    }

    User
        .findById(userID)
        .select('-password')
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Người dùng không tồn tại"
                });
            }

            return res.status(200).send({
                success: true,
                user: user
            });
        }).catch(next);
});

// Get all user
router.get("/", authenticate, (req, res, next) => {
    User.find({}).then((users) => {
        return res.status(200).json(
            users
        );
    }).catch(next);
});

// Update home location of user
router.put("/updateCurrentLocation", authenticate, (req, res, next) => {
    let userID = req.decoded.userID;
    console.log(JSON.stringify(req.body.currentLocation));
    if (!userID) {
        return res.status(422).send({
            success: false,
            message: "Không thể truy cập userID"
        });
    }

    User
        .findByIdAndUpdate(userID, {
            currentLocation: req.body.currentLocation
        })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Người dùng không tồn tại"
                });
            }
            return res.status(200).send({
                success: true
                // success: true,
                // user: user
            });
        }).catch(next);
})

// Update socket ID
router.put("/updateSocketID", authenticate, (req, res, next) => {
    let userID = req.decoded.userID;
    if (!userID) {
        return res.status(422).send({
            success: false,
            message: "Không thể truy cập userID"
        });
    }

    User
        .findByIdAndUpdate(userID, {
            socketID : req.body.socketID
        })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Người dùng không tồn tại"
                });
            }
            return res.status(200).send({
                success: true
                // success: true,
                // user: user
            });
        }).catch(next);
})

// Get car of user 
router.get("/car", authenticate, (req, res, next) => {
    let userID = req.decoded.userID;
    if (!userID) {
        return res.status(422).send({
            success: false,
            message: "Không thể truy cập userID"
        });
    }

    Car
        .findOne({ userID: userID })
        .then((car) => {
            if (!car) {
                return res.status(404).json({
                    success: false,
                    message: "Người dùng không có xe"
                });
            }

            return res.status(200).send({
                success: true,
                car: car
            });
        }).catch(next);
});

// Greeting other car
router.get("/greeting", (req, res, next) => {
    res.sendFile(__dirname + '' + '/index.html');
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

    User.geoNear(centralPoint, geoOptions).then((results) => {
        //console.log("Time consumed: " + stats.time);

        var users = [];
        results.forEach((result) =>  {
           users.push(result.obj);
        });

        return res.status(200).json(
           users
        );
    }).catch(next);
});

// Update home location
router.put("/updateHomeLocation", authenticate, (req, res, next) => {
    let userID = req.decoded.userID;
    if (!userID) {
        return res.status(422).send({
            success: false,
            message: "Không thể truy cập userID"
        });
    }

    User
        .findByIdAndUpdate(userID, {
            latHomeLocation: req.body.latHomeLocation,
            longHomeLocation: req.body.longHomeLocation
        })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Người dùng không tồn tại"
                });
            }
            return res.status(200).send({
                success: true
                // success: true,
                // user: user
            });
        }).catch(next);
})

// Update work location
router.put("/updateWorkLocation", authenticate, (req, res, next) => {
    let userID = req.decoded.userID;
    if (!userID) {
        return res.status(422).send({
            success: false,
            message: "Không thể truy cập userID"
        });
    }

    User
        .findByIdAndUpdate(userID, {
            latWorkLocation: req.body.latWorkLocation,
            longWorkLocation: req.body.longWorkLocation
        })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Người dùng không tồn tại"
                });
            }
            return res.status(200).send({
                success: true
                 // success: true,
                // user: user
            });
        }).catch(next);
})

// Update my car
router.put("/updateMyCar", authenticate, (req, res, next) => {
    let userID = req.decoded.userID;
    if (!userID) {
        return res.status(422).send({
            success: false,
            message: "Không thể truy cập userID"
        });
    }

    User
        .findByIdAndUpdate(userID, {
            typeCar: req.body.typeCar,
            modelCar: req.body.modelCar,
            colorCar: req.body.colorCar
        })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Người dùng không tồn tại"
                });
            }
            return res.status(200).send({
                success: true
                 // success: true,
                // user: user
            });
        }).catch(next);
})

// Update status
router.put("/updateStatus", authenticate, (req, res, next) => {
    let userID = req.decoded.userID;
    if (!userID) {
        return res.status(422).send({
            success: false,
            message: "Không thể truy cập userID"
        });
    }

    User
        .findByIdAndUpdate(userID, {
            status: req.body.status
        })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Người dùng không tồn tại"
                });
            }
            return res.status(200).send({
                success: true
                 // success: true,
                // user: user
            });
        }).catch(next);
})

// Update license plate
router.put("/updateLicensePlate", authenticate, (req, res, next) => {
    let userID = req.decoded.userID;
    if (!userID) {
        return res.status(422).send({
            success: false,
            message: "Không thể truy cập userID"
        });
    }

    User
        .findByIdAndUpdate(userID, {
            licensePlate: req.body.licensePlate
        })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Người dùng không tồn tại"
                });
            }
            return res.status(200).send({
                success: true
                // success: true,
                // user: user
            });
        }).catch(next);
})

module.exports = router;