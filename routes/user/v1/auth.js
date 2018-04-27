var express = require('express');
var User = require('../../../models/user');
var router = express.Router();
var config = require('../../../config/user/config');
var jwt = require('jsonwebtoken');
var request = require('request');

// Auth with google
router.post("/google", function (req, res) {
    res.send('welcome auth with google');
});

// auth with email
router.post("/email", function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    console.log("Email: " + email + "\r\nPassword: " + password);

    User.findOne({email: email}).then(function(user) {
       if (!user) {
           return res.status(404).json({
               success: false,
               message: 'Người dùng không tồn tại'
           });
       }

       user.comparePassword(password, function(err, isMatch) {
           if (err) {
               return res.status(500).json({
                   success: false,
                   message: err
               });
           }

           if (!isMatch) {
               return res.status(401).json({
                   success: false,
                   message: 'Sai mật khẩu!'
               });
           }

           var token = jwt.sign({userID: user._id}, config.secret, { expiresIn: config.tokenExpiresIn });

           // return the information including token as JSON
           return res.status(200).json({
               success: true,
               message: 'Đăng nhập thành công',
               token: token,
               user: user
           });
       });
    }).catch(next);
});

// Refresh token
router.post("/refresh_token", function(req, res, next) {
    var accessToken = req.body.accessToken;
    if (accessToken === null) {
        return res.status(422).json({
            success: false,
            message: 'Thiếu thông tin accessToken'
        })
    }

    jwt.verify(accessToken, config.secret, function(err, decoded) {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({
                    success: false,
                    message: 'Phiên làm việc đã hết hạn'
                });
            }

            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        // Check if user is exist!
        User.findById(decoded.userID).then(function(user) {
            console.log(user);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Người dùng không tồn tại"
                });
            }

            // New access token
            var newToken = jwt.sign({userID: decoded.userID}, config.secret, { expiresIn: config.tokenExpiresIn });
            // Return the information including token as JSON
            return res.status(200).json({
                success: true,
                message: 'Tạo mới access token thành công',
                token: newToken
            });
        });
    });
});

module.exports = router;