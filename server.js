const express = require('express');
const ConnectDB = require('./db/db');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

ConnectDB();
app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/client', require('./routes/client'));
app.use('/api/login', require('./routes/login'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/payment', require('./routes/payment'));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.hltm'));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
	console.log(`server started on ${PORT} `);
});
