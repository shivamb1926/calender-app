const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Meeting = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		user: { type: String, required: true },
		date: { type: Date, required: true },
		start_time: { type: String, required: true },
		end_time: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("meetings", Meeting);
