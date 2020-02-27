const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async function(req, res, next) {
	// Get token from header
	const token = req.header('x-auth-token');

	// Check if not token
	if (!token) {
		return res
			.status(401)
			.json({ errors: [{ msg: 'No token, authorization denied' }] });
	}

	// Verify token
	try {
		await jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
			if (error) {
				res.status(401).json({ errors: [{ msg: 'Token is not valid' }] });
			} else {
				req.user = decoded.user;
				next();
			}
		});
	} catch (err) {
		console.error(err);
		res
			.status(401)
			.json({ errors: [{ msg: 'Something went wrong with auth middleware' }] });
	}
};
