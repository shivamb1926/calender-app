import React, { useState, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

import "./css/Meeting.css";

const Meeting = ({ data, update, setUpdate }) => {
	const { currentUser } = useAuth();

	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);

	const titleRef = useRef();
	const descriptionRef = useRef();
	const dateRef = useRef();
	const startHoursRef = useRef();
	const startMinutesRef = useRef();
	const endHoursRef = useRef();
	const endMinutesRef = useRef();
	const date = data.date.substr(0, 10);
	const startHours = parseInt(data.start_time.substr(0, 2));
	const startMinutes = parseInt(data.start_time.substr(3));
	const endHours = parseInt(data.end_time.substr(0, 2));
	const endMinutes = parseInt(data.end_time.substr(3));

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);

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

		const updatedMeet = {
			title: titleRef.current.value,
			description: descriptionRef.current.value,
			user: currentUser.email,
			date: dateRef.current.value,
			start_time: startTime,
			end_time: endTime,
		};

		axios
			.post(
				`https://calender-meet.herokuapp.com/api/update/${data._id}`,
				updatedMeet
			)
			.then(res => {
				console.log(res);
				setLoading(false);
				setUpdate(!update);
				setShow(false);
			})
			.catch(err => {
				console.log(err);
				setLoading(false);
			});
	};

	const handleDelete = async () => {
		axios
			.get(`https://calender-meet.herokuapp.com/api/delete/${data._id}`)
			.then(res => {
				console.log(res);
				setLoading(false);
				setUpdate(!update);
				window.location.reload(true);
			})
			.catch(err => {
				console.log(err);
				setLoading(false);
			});
	};

	const editButtonStyle = {
		backgroundColor: "#918829",
		borderColor: "transparent",
		boxShadow:
			"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
		width: "7rem",
	};

	const delButtonStyle = {
		backgroundColor: "#dc3545",
		borderColor: "transparent",
	};

	const EditModal = () => {
		return (
			<Modal show={show} onHide={handleClose}>
				<Modal.Header>
					<Modal.Title>Edit Meeting</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form>
						<Form.Group id="title" className="my-3">
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								required
								ref={titleRef}
								defaultValue={data.title}
							/>
						</Form.Group>
						<Form.Group id="description" className="my-3">
							<Form.Label>Description</Form.Label>
							<Form.Control
								type="text"
								required
								ref={descriptionRef}
								defaultValue={data.description}
							/>
						</Form.Group>
						<Form.Group id="date" className="my-3">
							<Form.Label>Date</Form.Label>
							<Form.Control
								type="date"
								required
								ref={dateRef}
								defaultValue={date}
							/>
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
									defaultValue={startHours}
								/>
								<Form.Control
									type="number"
									required
									min="0"
									max="59"
									ref={startMinutesRef}
									defaultValue={startMinutes}
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
									defaultValue={endHours}
								/>
								<Form.Control
									type="number"
									required
									min="0"
									max="59"
									ref={endMinutesRef}
									defaultValue={endMinutes}
								/>
							</div>
						</Form.Group>
					</Form>
				</Modal.Body>

				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={handleClose}
						style={delButtonStyle}
						className="del-button"
					>
						Close
					</Button>
					<Button
						variant="primary"
						onClick={handleSubmit}
						disabled={loading}
						style={editButtonStyle}
					>
						Save
					</Button>
				</Modal.Footer>
			</Modal>
		);
	};

	return (
		<div className="meeting">
			<h1 className="title">{data.title}</h1>
			<h4>
				{data.date.substr(8, 2)}-{data.date.substr(5, 2)}-
				{data.date.substr(0, 4)} | {data.start_time} to {data.end_time}
			</h4>
			<p className="description">{data.description}</p>
			<div className="cta-buttons">
				<Button
					variant="primary"
					style={editButtonStyle}
					onClick={handleShow}
				>
					Edit
				</Button>
				<Button
					variant="danger"
					onClick={handleDelete}
					disabled={loading}
					className="del-button"
					style={delButtonStyle}
				>
					Delete
				</Button>
			</div>
			<EditModal />
		</div>
	);
};

export default Meeting;
