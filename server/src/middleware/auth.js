const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	var authHeader = req.get('Authorization');
	if (!authHeader) {
		res.status(401).json({ message: 'Token not provided!' });
	}
	try {
		jwt.verify(authHeader, process.env.JWT_SECRET);
		next();
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			res.status(401).json({ message: 'Invalid token!' });
		}
	}
};
