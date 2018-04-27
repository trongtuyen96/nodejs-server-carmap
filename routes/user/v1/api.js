var express = require('express');
var app = express.Router();
var bodyParser = require('body-parser');


app.use('/register', require('./register'));
app.use('/auth', require('./auth'));

// Authenication before access other APIs
app.use(require('./auth-middleware'));

// Below APIs need an authentication
app.use('/user', require('./user'));
// app.use('/user-info', require('./user-info'));

app.use('/car', require('./car'));
app.use('/location', require('./location'));
app.use('/report', require('./report'));


module.exports = app;