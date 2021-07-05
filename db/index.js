require("dotenv").config();
const mongoose = require("mongoose");

mongoose
	.connect(`${process.env.MONGO_URL}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.catch(e => {
		console.error("connection error", e.message);
	});

const db = mongoose.connection;

module.exports = db;
