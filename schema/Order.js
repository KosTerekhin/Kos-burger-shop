const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
	client: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'client'
	},
	ingredients: {
		type: Object,
		required: true
	},
	prices: {
		type: Object,
		required: true
	},
	totalPrice: {
		type: Number,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('orders', OrderSchema);
