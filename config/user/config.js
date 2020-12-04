module.exports = {
    // Secret key for JWT signing and encryption
    'secret': 'trongtuyen96',
    'tokenExpiresIn': '7d',

    // Database connection 
    'database': 'mongodb://localhost:27017/carmap',
    'database_mlab': 'mongodb://admin:123456@ds211440.mlab.com:11440/carmap',

    // Database Mongo Clould
    'database_mongo_cloud': 'mongodb+srv://admin:Admin123456@carmap.wlchv.mongodb.net/test?retryWrites=true&w=majority',
    
    
    // Setting port for server
    'port': process.env.PORT || 3000
};