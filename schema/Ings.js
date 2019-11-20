const mongoose = require('mongoose');

const IngsSchema = mongoose.Schema({
	client: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'client'
	},
	ingredients: {
		type: Object,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('orders', IngsSchema);
