const mongoose = require('mongoose');
const config = require('config');

const db = config.get('MongoURI');

const ConnectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});
		console.log('Mongo DB connected');
	} catch (error) {
		process.exit(1);
	}
};

module.exports = ConnectDB;
