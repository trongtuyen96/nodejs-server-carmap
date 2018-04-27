var config = require('../../../config/user/config');
var jwt = require('jsonwebtoken');

// Auth middleware
module.exports = function(req, res, next){
    // check header or url parameters for post parameters for token
    var token = req.headers['x-access-token'];

    if(!token){
        return res.status(401).send({
            success: false,
            message: 'Chưa được xác thực'
        });
    }

    // Decode token
    jwt.verify(token, config.secret, function(err, decoded){
        if(err){
            return res.json({
                success: false,
                message: 'Xác thực thất bại'
            });
        } else {
            // If everything is good, save to request for use in other routes
            req.decoded = decoded;
            next();
        }
    });
};
