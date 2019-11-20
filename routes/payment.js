const express = require('express');
const stripe = require('stripe')('sk_test_qmC1kJwkuA9L7tVra7hfBENG00TAOiNSwC');
const router = express.Router();

router.post('/', (req, res) => {
	
	console.log(req.body);

	stripe.customers
		.create({
			email: req.body.email,
			card: req.body.id
		})
		.then((customer) =>
			stripe.charges.create({
				amount: req.body.amount,
				description: 'Burger Order',
				currency: 'usd',
				customer: customer.id
			})
		)
		.then((charge) => res.send(charge))
		.catch((err) => {
			console.log('Error:', err);
			res.status(500).send({ error: 'Purchase Failed' });
		});
});

module.exports = router;
 