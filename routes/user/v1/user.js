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
router.put("/updateHomeLocation", authenticate, (req, res, next) => {
    let userID = req.decoded.userID;
    console.log(JSON.stringify(req.body.homeLocation));
    if (!userID) {
        return res.status(422).send({
            success: false,
            message: "Không thể truy cập userID"
        });
    }

    User
        .findByIdAndUpdate(userID, {
            homeLocation: req.body.homeLocation
        })
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

module.exports = router;