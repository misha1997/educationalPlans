const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    var authHeader = req.get('Authorization');
    if(!authHeader) {
        res.send({ message: 'Token not provided!' })
    }
    var token = authHeader;
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if (payload.type !== 'access') {
            res.status(401).json({ message: 'Invalid token!' });
            return;
        }
        next();
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            res.status(401).json({ message: 'token expired!' });
            return;
        }
        if(e instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ message: 'Invalid token!' });
            return;
        }
    }
};