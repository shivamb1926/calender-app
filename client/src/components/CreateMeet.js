import React, { useRef, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import "./css/CreateMeet.css";

const CreateMeet = () => {
	const { currentUser } = useAuth();

	const titleRef = useRef();
	const descriptionRef = useRef();
	const dateRef = useRef();
	const startHoursRef = useRef();
	const startMinutesRef = useRef();
	const endHoursRef = useRef();
	const endMinutesRef = useRef();
	const history = useHistory();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async e => {
		setLoading(true);
		e.preventDefault();

		const startTime =
			parseInt(startHoursRef.current.value).toLocaleString("en-US", {
				minimumIntegerDigits: 2,
				useGrouping: false,
			}) +
			":" +
			parseInt(startMinutesRef.current.value).toLocaleString("en-US", {
				minimumIntegerDigits: 2,
				useGrouping: false,
			});
		const endTime =
			parseInt(endHoursRef.current.value).toLocaleString("en-US", {
				minimumIntegerDigits: 2,
				useGrouping: false,
			}) +
			":" +
			parseInt(endMinutesRef.current.value).toLocaleString("en-US", {
				minimumIntegerDigits: 2,
				useGrouping: false,
			});

		const newMeet = {
			title: titleRef.current.value,
			description: descriptionRef.current.value,
			user: currentUser.email,
			date: dateRef.current.value,
			start_time: startTime,
			end_time: endTime,
		};

		console.log(process.env.REACT_APP_BASE_URL);

		axios
			.post(`https://calender-meet.herokuapp.com/api/meeting`, newMeet)
			.then(res => {
				console.log(res);
				setLoading(false);
				history.push("/");
			})
			.catch(err => {
				console.log(err);
				setLoading(false);
				setError(err);
			});
	};

	const buttonStyle = {
		backgroundColor: "#918829",
		borderColor: "transparent",
		boxShadow:
			"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
	};

	return (
		<div className="create-meet">
			<h2 className="text-center mb-4">Create a new meeting </h2>
			{error && <Alert variant="danger">{error}</Alert>}
			<Form onSubmit={handleSubmit}>
				<Form.Group id="title" className="my-3">
					<Form.Label>Title</Form.Label>
					<Form.Control type="text" required ref={titleRef} />
				</Form.Group>
				<Form.Group id="description" className="my-3">
					<Form.Label>Description</Form.Label>
					<Form.Control type="text" required ref={descriptionRef} />
				</Form.Group>
				<Form.Group id="date" className="my-3">
					<Form.Label>Date</Form.Label>
					<Form.Control type="date" required ref={dateRef} />
				</Form.Group>
				<Form.Group id="start_time" className="my-3">
					<Form.Label>Start Time</Form.Label>
					<div className="time-input">
						<Form.Control
							type="number"
							required
							min="0"
							max="23"
							ref={startHoursRef}
							placeholder="hours"
						/>
						<Form.Control
							type="number"
							required
							min="0"
							max="59"
							ref={startMinutesRef}
							placeholder="minutes"
						/>
					</div>
				</Form.Group>
				<Form.Group id="end_time" className="my-3">
					<Form.Label>End Time</Form.Label>
					<div className="time-input">
						<Form.Control
							type="number"
							required
							min="0"
							max="23"
							ref={endHoursRef}
							placeholder="hours"
						/>
						<Form.Control
							type="number"
							required
							min="0"
							max="59"
							ref={endMinutesRef}
							placeholder="minutes"
						/>
					</div>
				</Form.Group>
				<Button
					type="submit"
					className="w-100 my-3"
					disabled={loading}
					style={buttonStyle}
				>
					Create
				</Button>
			</Form>
		</div>
	);
};

export default CreateMeet;
