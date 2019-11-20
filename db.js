const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// config.util.getEnv('SUPPRESS_NO_CONFIG_WARNING');

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false
		});

		console.log('Mongo DB connected');
	} catch (error) {
		console.log(error.message);
		process.exit(1); // exiting with failure
	}
};

module.exports = connectDB;
