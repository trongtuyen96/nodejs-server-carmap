var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');
var config = require('./config/user/config');
var expressValidator = require('express-validator');
var User = require('./models/user');
var Car = require('./models/car');
var Location = require('./models/location');
var Report = require('./models/report');


// Set up express app
var app = express();


// // Test socket
// var http = require('http').Server(app);
// var io = require('socket.io')(http);


// Test socket 2
// var socketEvents = require('./socketEvents');


// Connect to mongo db
// 1. Drop old database
mongoose.connect(config.database);
mongoose.connection.once('open', function () {
    mongoose.connection.db.dropDatabase(function (err, result) {
    });
});
// 2. Connect again
mongoose.connect(config.database);
mongoose.connection.once('open', function () {
    // Create sample data for database 
    var user = new User({
        name: 'Tuyen',
        googleUserID: '11111111',
        avatar: 'so talent',
        homeLocation: {
            type: 'Point',
            // must follow longitude, latitude order
            coordinates: [105.005675, 10.367511]
        }
    });
    user.save(function (err, user) {
        if (err) return console.error(err);
        console.log(user);
    });

    var car = new Car({
        type: 1,
        lastestGeo: {
            type: "Point",
            coordinates: [105.045705, 21.345696]
        },
        currentGeo: {
            type: "Point",
            coordinates: [105.078940, 21.312346]
        },
        speed: 80,
        userID: user._id
    });
    car.save(function (err, car) {
        if (err) return console.error(err);
        console.log(car);
    });

    var location = new Location({
        geomatry: {
            type: "Point",
            coordinates: [105.045705, 21.345696]
        },
        name: 'Home',
        userID: user._id
    });
    location.save(function (err, location) {
        if (err) return console.error(err);
        console.log(location);
    });

    var report = new Report({
        type: 1,
        desciption: 'Trafic jam',
        geomatry: {
            type: "Point",
            coordinates: [105.045705, 21.345696]
        },
        severity: 3,
        userID: user._id
    });
    report.save(function (err, report) {
        if (err) return console.error(err);
        console.log(report);
    });

    console.log('Connect to database successfuly');
}).on('error', function () {
    console.log('Conmect to database failed')
});

// enable CORS from client-side
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Alow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-ALlow-Credentials");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
})

// Body-parser json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// This line must be right after any of the bodyParser middleware
app.use(expressValidator());

// express serve static files
// app.use('/public/', express.static('./public'));

// Morgan to log any request to console
app.use(logger('dev'));

// Configuration
// app.set('secret-jwt', config.secret);

// Log request middleware
// app.use(function(req, res, next){
//     //console.log('Url: ', req.originalUrl);
//     console.log('Body: ', req.body);
//     next();
// });

// Home page
app.get("/", function (req, res) {
    res.send("Car Map API<br>API for user: /api-user/v1/xxx");
})


// Greeting other car
app.get("/greeting", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


// io.on('connection', function (socket) {
//     console.log('a user connected');

//     socket.on('chat message', function (msg) {
//         console.log('message: ' + msg);
//         io.emit('chat message', msg);
//     });

//     socket.on('disconnect', function () {
//         console.log('user disconnected');
//     });
// });

// http.listen(3001, function () {
//     console.log('listening on *:3001');
// });

// tesst socket 2
// var http = require('http').Server(app);
// const io = require('socket.io').listen(http);
// socketEvents(io);


// RESTful API handler
app.use('/api-user', require('./routes/user/api'));

// Error handling middlware
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send({
        success: false,
        message: er.message
    })
})

// Listen request from client on port 
app.listen(config.port, function () {
    console.log("Server user clients ready on port 3000");
})