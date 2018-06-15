const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const config = require('./config/user/config');
const expressValidator = require('express-validator');
const User = require('./models/user');
const Car = require('./models/car');
const Location = require('./models/location');
const Report = require('./models/report');


// Set up express app
const app = express();


// ////////////////// LOCAL /////////////////////
// // Connect to mongo db
// // 1. Drop old database
// mongoose.connect(config.database);
// mongoose.connection.once('open', function () {
//     mongoose.connection.db.dropDatabase(function (err, result) {
//     });
// });
// // 2. Connect again
// mongoose.connect(config.database);
// mongoose.connection.once('open', function () {
//     // Create sample data for database 
//     var user = new User({
//         email: 'user1@gmail.com',
//         password: '123456',
//         name: 'Tuyen',
//         birthDate: "1996-12-13",
//         googleUserID: '11111111',
//         avatar: 'avatar.url',
//         homeLocation: {
//             type: 'Point',
//             // must follow longitude, latitude order
//             coordinates: [105.005675, 10.367511]
//         }
//     });
//     user.save(function (err, user) {
//         if (err) return console.error(err);
//         console.log(user);
//     });

//     var car = new Car({
//         type: 1,
//         lastestGeo: {
//             type: "Point",
//             coordinates: [105.045705, 21.345696]
//         },
//         currentGeo: {
//             type: "Point",
//             coordinates: [105.078940, 21.312346]
//         },
//         speed: 80,
//         userID: user._id
//     });
//     car.save(function (err, car) {
//         if (err) return console.error(err);
//         console.log(car);
//     });

//     var location = new Location({
//         geomatry: {
//             type: "Point",
//             coordinates: [105.045705, 21.345696]
//         },
//         name: 'Home',
//         userID: user._id
//     });
//     location.save(function (err, location) {
//         if (err) return console.error(err);
//         console.log(location);
//     });

//     var report = new Report({
//         type: 1,
//         desciption: 'Trafic jam',
//         geomatry: {
//             type: "Point",
//             coordinates: [105.045705, 21.345696]
//         },
//         severity: 3,
//         userID: user._id
//     });
//     report.save(function (err, report) {
//         if (err) return console.error(err);
//         console.log(report);
//     });

//     console.log('Connect to database successfuly');
// }).on('error', function () {
//     console.log('Conmect to database failed')
// });

// ///////////////////// END LOCAL ///////////////////

///////////////////// MLAB - HEROKU ///////////////
// Only run first time to create data for mLab collections
// Connect to mongo db m-Lab
mongoose.connect(config.database_mlab);
mongoose.connection.once('open',() =>{
//     // Create sample data for database 
//     var user = new User({
//         email: 'user1@gmail.com',
//         password: '123456',
//         name: 'Tuyen',
//         birthDate: "1996-12-13",
//         googleUserID: '11111111',
//         avatar: 'avatar.url',
//         homeLocation: {
//             type: 'Point',
//             // must follow longitude, latitude order
//             coordinates: [105.005675, 10.367511]
//         }
//     });
//     user.save(function (err, user) {
//         if (err) return console.error(err);
//         console.log(user);
//     });

//     var car = new Car({
//         type: 1,
//         lastestGeo: {
//             type: "Point",
//             coordinates: [105.045705, 21.345696]
//         },
//         currentGeo: {
//             type: "Point",
//             coordinates: [105.078940, 21.312346]
//         },
//         speed: 80,
//         userID: user._id
//     });
//     car.save(function (err, car) {
//         if (err) return console.error(err);
//         console.log(car);
//     });

//     var location = new Location({
//         geomatry: {
//             type: "Point",
//             coordinates: [105.045705, 21.345696]
//         },
//         name: 'Home',
//         userID: user._id
//     });
//     location.save(function (err, location) {
//         if (err) return console.error(err);
//         console.log(location);
//     });

//     var report = new Report({
//         type: 1,
//         desciption: 'Trafic jam',
//         geomatry: {
//             type: "Point",
//             coordinates: [105.045705, 21.345696]
//         },
//         severity: 3,
//         userID: user._id
//     });
//     report.save(function (err, report) {
//         if (err) return console.error(err);
//         console.log(report);
//     });

//     console.log('Connect to database successfuly');
// }).on('error',() => {
//     console.log('Conmect to database failed')
});
////////////////// END mLab - Heroku ////////////////


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
app.set('secret-jwt', config.secret);

// Log request middleware
app.use((req, res, next) => {
    //console.log('Url: ', req.originalUrl);
    console.log('Body: ', req.body);
    next();
});

// enable CORS from client-side
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Alow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-ALlow-Credentials");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
})




// Home page
app.get("/",(req, res) => {
    res.send("Car Map API<br>API for user: /api-user/v1/xxx");
})

// RESTful API handler
app.use('/api-user', require('./routes/user/api'));

// Error handling middlware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send({
        success: false,
        message: err.message
    })
})

// // Listen request from client on port 
// app.listen(config.port, function () {
//     console.log("Server user clients ready on port 3000");
// })


// Set up for socket
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection',(socket) => {
    console.log('a user connected');

    socket.on('chat message',(msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('event_hello_server',(email, send_id, receive_id, msg) => {
        console.log('user:' + send_id + 'to '+ receive_id + ' - message: ' + msg);
        socket.broadcast.to(receive_id).emit('event_hello_socket', email, send_id, msg)
    });

    socket.on('event_warn_strong_light_server',(email, send_id, receive_id, msg) => {
        console.log('user:' + send_id + 'to '+ receive_id + ' - message: ' + msg);
        socket.broadcast.to(receive_id).emit('event_warn_strong_light_socket', email, send_id, msg)
    });

    socket.on('event_warn_police_server',(email, send_id, receive_id, msg) => {
        console.log('user:' + send_id + 'to '+ receive_id + ' - message: ' + msg);
        socket.broadcast.to(receive_id).emit('event_warn_police_socket', email, send_id, msg)
    });

    socket.on('event_warn_slow_down_server',(email, send_id, receive_id, msg) => {
        console.log('user:' + send_id + 'to '+ receive_id + ' - message: ' + msg);
        socket.broadcast.to(receive_id).emit('event_warn_slow_down_socket', email, send_id, msg)
    });

    socket.on('event_warn_turn_around_server',(email, send_id, receive_id, msg) => {
        console.log('user:' + send_id + 'to '+ receive_id + ' - message: ' + msg);
        socket.broadcast.to(receive_id).emit('event_warn_turn_around_socket', email, send_id, msg)
    });

    socket.on('event_warn_thank_server',(email, send_id, receive_id, msg) => {
        console.log('user:' + send_id + 'to '+ receive_id + ' - message: ' + msg);
        socket.broadcast.to(receive_id).emit('event_warn_thank_socket', email, send_id, msg)
    });

    socket.on('event_report_other_server',(email, send_id, receive_id, type, base64, license) => {
        console.log('user:' + send_id + 'to '+ receive_id + ' - message: ' + type);
        socket.broadcast.to(receive_id).emit('event_report_other_socket', email, send_id, type, base64, license)
    });
    
    socket.on('disconnect',() => {
        console.log('user disconnected');
    });
});

http.listen(config.port,() => {
    console.log('listening on *:'+ config.port);
});
