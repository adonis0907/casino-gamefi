const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const SystemConfig = require("../config/system");

module.exports.generateToken = data => {
    let jwtSecretKey = SystemConfig.JWT_SECRET_KEY;
    
    return jwt.sign(data, jwtSecretKey);
}

module.exports.toSha256 = string => {
    return crypto.createHash('sha256').update(string).digest('hex');
}