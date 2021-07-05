import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import Meeting from "./Meeting";
import axios from "axios";

import "./css/Dashboard.css";

const Dashboard = () => {
	const [update, setUpdate] = useState(false);
	const [blank, setBlank] = useState(false);
	const { currentUser } = useAuth();

	const [meetings, setMeetings] = useState([]);

	const name = currentUser.email.split("@")[0];

	useEffect(() => {
		const getData = async () => {
			await axios
				.get(
					`${process.env.REACT_APP_BASE_URL}/api/meetings/${currentUser.email}`
				)
				.then(res => {
					setMeetings(res.data.data);
					setBlank(false);
				})
				.catch(err => {
					console.log(err);
					setBlank(true);
				});
		};

		getData();
	}, [currentUser.email, update]);

	const buttonStyle = {
		backgroundColor: "#918829",
		borderColor: "transparent",
		boxShadow:
			"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
	};

	return (
		<>
			<h1 className="text-center heading">Welcome, {name}</h1>
			<div className="create-link">
				<Link to="/create">
					<Button style={buttonStyle}>Create a new meeting</Button>
				</Link>
			</div>
			<h3 className="text-center mb-4">Upcoming Meetings</h3>
			<div className="meetings">
				{meetings.map((meet, idx) => (
					<Meeting
						data={meet}
						key={idx}
						update={update}
						setUpdate={setUpdate}
					/>
				))}
			</div>
			{blank && <h6>No Upcoming Meetings</h6>}
		</>
	);
};

export default Dashboard;
