var express = require('express');
var User = require('../../../models/user');
var Car = require('../../../models/car');
var router = express.Router();
var Geo = require('../../../models/schemas/geo');


// Api for users
router.get("/profile", function (req, res, next) {
    var userID = req.decoded.userID;
    if (!userID) {
        return res.status(422).send({
            success: false,
            message: "Không thể truy cập userID"
        });
    }

    User
        .findById(userID)
        .select('-password')
        .then(function(user) {
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

// router.get("/:id", function (req, res, next) {
//     var userID = req.params.id;
//     if (!userID) {
//         return res.status(422).send({
//             success: false,
//             message: "Không thể truy cập userID"
//         });
//     }

//     User
//         .findById(userID)
//         // .select('-password')
//         .then(function(user) {
//             if (!user) {
//                 return res.status(404).json({
//                     success: false,
//                     message: "Người dùng không tồn tại"
//                 });
//             }

//             return res.status(200).send({
//                 success: true,
//                 user: user
//             });
//     }).catch(next);
// });

// Get all user
router.get("/", function(req, res, next) {
    User.find({}).then(function(users) {
        return res.status(200).json(
            users
        );
    }).catch(next);
});

// Update home location of user
router.put("/updateHomeLocation", function(req, res, next){
    var userID = req.decoded.userID;
    console.log(JSON.stringify(req.body.homeLocation));
    if (!userID) {
        return res.status(422).send({
            success: false,
            message: "Không thể truy cập userID"
        });
    }

    User
        .findByIdAndUpdate(userID, {
            homeLocation : req.body.homeLocation
        })
        .then(function(user) {
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
router.get("/car", function (req, res, next) {
    var userID = req.decoded.userID;
    if (!userID) {
        return res.status(422).send({
            success: false,
            message: "Không thể truy cập userID"
        });
    }

    Car
        .findOne({userID: userID})
        .then(function(car) {
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

// // Greeting other car
// router.get("/greeting", function (req, res, next) {
//     try
//     {
//     res.sendFile(__dirname + '/index.html');
//     con.log(__dirname);

//     io.on('connection', function(socket){
//         console.log('a user connected');
      
//         socket.on('chat message', function(msg){
//           console.log('message: ' + msg);
//           io.emit('chat message', msg);
//         });
      
      
//         socket.on('disconnect', function(){
//           console.log('user disconnected');
//         });
//       });
      
//       http.listen(3000, function(){
//         console.log('listening on *:3000');
//       });
//     }
//     catch(next){};
// });


module.exports = router;