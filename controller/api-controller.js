const Meeting = require("../models/meeting-model");

const createMeeting = (req, res) => {
	const body = req.body;

	if (!body) {
		return res.status(400).json({
			success: false,
			error: "You must provide a component",
		});
	}

	const meet = new Meeting(body);

	console.log(body);

	if (!meet) {
		return res.status(400).json({
			success: false,
			error: err,
		});
	}

	meet.save()
		.then(() => {
			return res.status(201).json({
				success: true,
				id: meet._id,
				message: "Meeting created!",
			});
		})
		.catch(error => {
			return res.status(400).json({
				error,
				message: "Meeting not created!",
			});
		});
};

const deleteMeeting = async (req, res) => {
	await Meeting.findOneAndDelete({ _id: req.params.id }, (err, meeting) => {
		if (err) {
			return res.status(400).json({ success: false, error: err });
		}
		if (!meeting) {
			return res
				.status(404)
				.json({ success: false, error: `Meeting not found` });
		}
		return res
			.status(200)
			.json({ success: true, data: meeting, message: "Deleted!" });
	}).catch(err => console.log(err));
};

const getMeetings = async (req, res) => {
	await Meeting.find({ user: req.params.user }, (err, data) => {
		if (err) {
			return res.status(400).json({ success: false, error: err });
		}
		if (!data.length) {
			return res
				.status(404)
				.json({ success: false, error: `No meetings available` });
		}
		return res.status(200).json({ success: true, data: data });
	}).catch(err => console.log(err));
};

const updateMeeting = async (req, res) => {
	const body = req.body;

	await Meeting.updateOne({ _id: req.params.id }, body, err => {
		if (err) {
			console.log(err);
		} else {
			res.status(200).json({ success: true, message: "Updated!" });
		}
	});
};

module.exports = {
	createMeeting,
	getMeetings,
	updateMeeting,
	deleteMeeting,
};
