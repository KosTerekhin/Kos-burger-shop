const express = require('express');
const decoder = require('../middleware/token-dec');
const Ings = require('../schema/Ings');

const router = express.Router();

// @ set ingredients to 0 for new client
router.post('/', decoder, async (req, res) => {
	try {
		let ings = await Ings.findById(req.id);
		if (ings) {
			return res.status(402).json({ msg: 'Ingredients already in DB' });
		}

		ings = new Ings({
			ingredients: {
				salad: 0,
				cheese: 0,
				meat: 0,
				bacon: 0
			},
			client: req.id
		});

		await ings.save();
		res.json({ msg: 'ings set to 0 -> new client' });
	} catch (error) {
		return res.status(500).json({ msg: 'Server Error - set Ings' });
	}
});

// @ collect selected ingredients
router.get('/', (req, res) => {
    
});

// @ update ingredients
router.put('/', (req, res) => {});

module.exports = router;
