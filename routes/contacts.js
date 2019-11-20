const express = require('express');

const User = require('../schema/User');
const Contact = require('../schema/Contact');
const decoder = require('../middleware/decoder');

const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/', decoder, async (req, res) => {
	const ID = req.user.id;
	try {
		const contacts = await Contact.find({ user: ID }).sort({ date: -1 });

		return res.json(contacts);
	} catch (error) {
		return res.status(500).json({ msg: 'Server Error - 500' });
	}
});

// @ add new contact
router.post(
	'/',
	[
		decoder,
		[
			check('email', 'Please enter a valid email address').isEmail(),
			check('phone', 'Invalid phone number').isNumeric(),
			check('name', 'Name is required').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(401).json({ errors: errors.array() });
		}

		const { email, name, phone, type } = req.body;

		try {
			const contact = new Contact({
				email,
				name,
				phone,
				type,
				user: req.user.id
			});
			await contact.save();
			return res.json(contact);
		} catch (error) {
			return res.status(500).json({ msg: 'Server Error - 500' });
		}
	}
);

// @ update contact
router.put('/:id', decoder, async (req, res) => {
	const { name, email, phone, type } = req.body;
  
	// Build contact object
	const contactFields = {};
	if (name) contactFields.name = name;
	if (email) contactFields.email = email;
	if (phone) contactFields.phone = phone;
	if (type) contactFields.type = type;
  
	try {
	  let contact = await Contact.findById(req.params.id);
  
	  if (!contact) return res.status(404).json({ msg: 'Contact not found' });
  
	  // Make sure user owns contact
	  if (contact.user.toString() !== req.user.id) {
		return res.status(401).json({ msg: 'Not authorized' });
	  }
  
	  contact = await Contact.findByIdAndUpdate(
		req.params.id,
		{ $set: contactFields },
		{ new: true }
	  );
  
	  res.json(contact);
	} catch (err) {
	  console.error(er.message);
	  res.status(500).send('Server Error');
	}
  });

// @ delete
router.delete('/:id', decoder, async (req, res) => {
	try {
		const contact = await Contact.findById(req.params.id);
		const id = req.params.id;
		if (!contact) {
			return res.status(400).json({ msg: 'this contact does not exist' });
		}

		if (contact.user == req.user.id) {
			await Contact.findByIdAndDelete(req.params.id);
			return res.json({
				msg: 'User deleted',
				id
			});
		} else {
			return res.status(403).json({ msg: 'Incorrect user - relog please' });
		}
	} catch (error) {
		return res.status(500).json({ msg: 'Server Error - 500' });
	}
});

module.exports = router;
