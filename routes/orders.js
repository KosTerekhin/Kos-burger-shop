const express = require('express');
const Order = require('../schema/Order');
const router = express.Router();
const decoder = require('../middleware/token-dec');

router.post('/', [ decoder ], async (req, res) => {
	try {
		const { ingredients, prices, totalPrice } = req.body;
		const newOrder = new Order({
			client: req.id,
			ingredients,
			prices,
			totalPrice
		});

		await newOrder.save();
		return res.json(newOrder);
	} catch (error) {
		res.status(500).json({ msg: 'Server error - add order' });
	}
});

router.get('/', decoder, async (req, res) => {
	try {
		const orders = await Order.find({ client: req.id }).sort({ date: -1 });
		return res.json(orders);
	} catch (error) {
		return res.status(500).json({ msg: 'Server Error - all orders' });
	}
});

module.exports = router;
