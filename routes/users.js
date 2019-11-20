const express = require('express');
const decoder = require('../middleware/decoder');
const User = require('../schema/User');
const jwt = require('jsonwebtoken');
const config = require('config');

const { check, validationResult } = require('express-validator');
const router = express.Router();

const secret = config.get('jwtSecret');

// @ get user by token
router.get('/', decoder, async (req, res) => {
	try {
		let user = await User.findById(req.user.id).select('-password');
		if (!user) {
			return res.status(401).json({ msg: 'Invalid credentials' });
		}
		res.json( user );
	} catch (error) {
		res.status(500).json({ msg: 'Server error - 500' });
	}
});

// @login user - get token

router.post('/', [ check('email', 'Please enter a valid email address').isEmail() ], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(401).json({ errors: errors.array() });
	}

	const { email, password } = req.body;
	try {
		let user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ msg: 'This used does not exist' });
		}
		if (user.password !== password) {
			return res.status(401).json({ msg: 'Invalid password' });
		}

		const payload = {
			user: {
				id: user.id
			}
		};

		jwt.sign(payload, secret, (error, token) => {
			if (error) {
				throw error;
			} else {
				return res.json( token );
			}
		});
	} catch (error) {
		res.status(500).json({ msg: 'Server error - 500' });
	}
});

module.exports = router;
