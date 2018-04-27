var mongoose = require('mongoose');
var GeoSchema = require('./schemas/geo');
var bcrypt = require('bcrypt'), 
    SALT_WORK_FACTOR = 10;
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    birthDate: Date,
    googleUserID: String, 
    avatar: String,
    homeLocation: GeoSchema
});

// Method to compare password for login
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// Hash password
UserSchema.methods.hashPassword = function() {
    var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    this.password =  bcrypt.hashSync(this.password, salt);
};

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it hasn't been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('user', UserSchema);