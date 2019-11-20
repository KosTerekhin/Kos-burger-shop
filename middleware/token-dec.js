const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
	const token = req.header('x-auth-token');
	if (!token) {
		return res.status(402).json({ msg: 'Wrong token for this client' });
	}
	try {
		decoded = jwt.verify(token, config.get('jwtSecret'));
        req.id = decoded.client.id;
		next();
	} catch (error) {
		res.status(500).json({ msg: 'Server error - token' });
	}
};
