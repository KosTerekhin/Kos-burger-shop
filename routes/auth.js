const express = require('express');
const User = require('../schema/User');
const jwt = require('jsonwebtoken');
const config = require('config');

const { check, validationResult } = require('express-validator');
const router = express.Router();

const secret = config.get('jwtSecret');

//@ register user - get token
router.post(
	'/',
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Password is required').exists(),
		check('name', 'Please add name').not().isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(401).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ msg: 'This email already being used' });
			}
			user = new User({
				name,
				email,
				password
			});
			await user.save();

			const payload = {
				user: { id: user.id }
			};

			jwt.sign(payload, secret, (error, token) => {
				if (error) {
					throw error;
				} else {
					res.json( token );
				}
			});
		} catch (error) {
			res.status(500).json({ msg: 'Server error' });
		}
	}
);



module.exports = router;
