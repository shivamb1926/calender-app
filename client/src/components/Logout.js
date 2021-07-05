import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Alert } from "react-bootstrap";

const Logout = () => {
	const [error, setError] = useState("");
	const history = useHistory();
	const { logout } = useAuth();

	useEffect(() => {
		const handleLogout = async () => {
			setError("");

			try {
				await logout();
				history.push("/login");
			} catch {
				setError("Failed log out");
			}
		};
		handleLogout();
	}, [history, logout]);

	return (
		<>
			Logging out
			{error && <Alert variant="danger">{error}</Alert>}
		</>
	);
};

export default Logout;
