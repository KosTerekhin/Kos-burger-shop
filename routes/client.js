const express = require('express');
const Client = require('../schema/Client');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const secret = config.get('jwtSecret');

// login client
router.post(
	'/',
	[
		check('name', 'all fields are required').not().isEmpty(),
		check('email', 'please enter a valid email').isEmail(),
		check('password', 'password is too short, min 6 characters').isLength({ min: 5 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(401).json({ errors: errors.array() });
		}
		try {
			const { name, email, password } = req.body;

			let client = await Client.findOne({ email });

			if (client) {
				return res.status(401).json({ msg: 'The client already exists' });
			}

			client = new Client({
				name,
				email,
				password
			});

			await client.save();

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
			res.status(500).json({ msg: 'Server error - registration' });
		}
	}
);

module.exports = router;