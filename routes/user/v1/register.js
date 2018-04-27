var express = require('express');
var User = require('../../../models/user');
var router = express.Router();

// register with google
router.post("/google", function (req, res, next) {
    res.send('register with google');
});

// // register with email
// router.post("/email", function (req, res, next) {
//     req.checkBody({
//         'email': {
//             notEmpty: true,
//             isEmail: {
//                 errorMessage: 'Email không hợp lệ'
//             },
//             errorMessage: 'Email không thể bỏ trống'
//         },
//         'password': {
//             notEmpty: true,
//             isLength: {
//                 options: [{ min: 6}],
//                 errorMessage: 'Mật khẩu tối thiểu 6 ký tự'
//             },
//             errorMessage: 'Mật khẩu không thể bỏ trống'
//         },
//         'birthDate': {
//             notEmpty: true,
//             isDate: {
//                 errorMessage: 'Ngày sinh không hợp lệ'
//             },
//             errorMessage: 'Ngày sinh không thể bỏ trống'
//         },
//         'gender': {
//             notEmpty: true,
//             errorMessage: 'Giới tính không thể bỏ trống' // Error message for the parameter
//         },
//         'name': {
//             notEmpty: true,
//             errorMessage: 'Tên không thể bỏ trống' // Error message for the parameter
//         }
//     });

//     var errors = req.validationErrors();
//     if (errors) {
//         return res.status(422).send(errors);
//     }

//     var user = new User({
//         email: req.body.email,
//         password: req.body.password,
//         birthDate: req.body.birthDate,
//         gender: req.body.gender,
//         name: req.body.name
//     });

//     user.save().then(function(user) {
//         res.send(user)
//     }).catch(next);
// });

module.exports = router;