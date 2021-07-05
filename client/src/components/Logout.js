import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

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
	}, []);

	return <>Logging out</>;
};

export default Logout;
