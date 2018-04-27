module.exports = {
    // Secret key for JWT signing and encryption
    'secret': 'trongtuyen96',
    'tokenExpiresIn': '7d',

    // Database connection 
    'database': 'mongodb://localhost:27017/carmap',
    
    // Setting port for server
    'port': process.env.port || 3000
};