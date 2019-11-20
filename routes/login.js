const express = require('express');
const Client = require('../schema/Client');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const decoder = require('../middleware/token-dec');

const secret = config.get('jwtSecret');

router.post(
	'/',
	[
		check('email', 'please enter a valid email').isEmail(),
		check('password', 'password is too short, min 6 characters').exists()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(401).json({ errors: errors.array() });
		}
		try {
			const { email, password } = req.body;

			let client = await Client.findOne({ email });
			if (!client) {
				return res.status(401).json({ msg: 'Invalid credentials - email' });
			}

			if (password !== client.password) {
				return res.status(401).json({ msg: 'Invalid credentials - password does not match' });
			}

			const payload = {
				client: { id: client.id }
			};

			jwt.sign(payload, secret, (error, token) => {
				if (error) {
					throw error;
				}
				return res.json(token);
			});
		} catch (error) {
			res.status(500).json({ msg: 'Server error - login' });
		}
	}
);

router.get('/', decoder, async (req, res) => {
	try {
		const client = await Client.findById(req.id);
		res.json(client);
	} catch (error) {
		res.status(500).json({ msg: 'Server error - get client' });
	}
});

module.exports = router;
