const express = require('express');
const User = require('../../../models/user');
const router = express.Router();

// register with google
router.post("/google", (req, res, next) => {
    res.send('register with google');
});

// register with email
router.post("/email", (req, res, next) => {
    req.checkBody({
        'email': {
            notEmpty: true,
            isEmail: {
                errorMessage: 'Email không hợp lệ'
            },
            errorMessage: 'Email không thể bỏ trống'
        },
        'password': {
            notEmpty: true,
            isLength: {
                options: [{ min: 6}],
                errorMessage: 'Mật khẩu tối thiểu 6 ký tự'
            },
            errorMessage: 'Mật khẩu không thể bỏ trống'
        },
        'name': {
            notEmpty: true,
            errorMessage: 'Tên không thể bỏ trống' // Error message for the parameter
        },
        'birthDate': {
            notEmpty: true,
            isDate: {
                errorMessage: 'Ngày sinh không hợp lệ'
            },
            errorMessage: 'Ngày sinh không thể bỏ trống'
        },
        'phoneNumber': {
            notEmpty: true,
            errorMessage: 'Số điện thoại không thể bỏ trống'
        }
    });

    let errors = req.validationErrors();
    if (errors) {
        return res.status(422).send(errors);
    }

    let user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        birthDate: req.body.birthDate,
        status: req.body.status,
        phoneNumber: req.body.phoneNumber,
        typeCar: req.body.typeCar,
        modelCar: req.body.modelCar,
        colorCar: req.body.colorCar
    });

    user.save().then((user) => {
        res.send(user)
    }).catch(next);
});

module.exports = router;