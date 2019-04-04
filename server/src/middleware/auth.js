const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    var authHeader = req.get('Authorization');
    if(!authHeader) {
        res.status(401).json({ message: 'Token not provided!' });
    }
    var token = authHeader.replace('Bearer ', '');
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (e) {
        if(e instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ message: 'Invalid token!' });
        }
    }
};