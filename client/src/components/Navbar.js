import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import "./css/Navbar.css";

const Navbar = () => {
	const { currentUser } = useAuth();

	return (
		<>
			<div className="nav-bar">
				<div className="logo">
					<h4 className="logo-heading">Calender</h4>
				</div>
				{currentUser && (
					<div className="logout-button">
						<Link to="/logout" className="logout-link">
							Logout
						</Link>
					</div>
				)}
			</div>
		</>
	);
};

export default Navbar;
