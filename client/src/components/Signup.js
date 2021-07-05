import React, { useRef, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

import "./css/Signup.css";

const Signup = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { signup } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	const handleSubmit = async e => {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords don't match");
		}

		try {
			setError("");
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			history.push("/");
		} catch {
			setError("Failed to create account");
		}
		setLoading(false);
	};

	const buttonStyle = {
		backgroundColor: "#918829",
		borderColor: "transparent",
		boxShadow:
			"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
	};

	return (
		<div className="signup">
			<h2 className="text-center mb-4">Sign Up</h2>
			{error && <Alert variant="danger">{error}</Alert>}
			<Form onSubmit={handleSubmit}>
				<Form.Group id="email" className="my-3">
					<Form.Label>Email</Form.Label>
					<Form.Control type="email" required ref={emailRef} />
				</Form.Group>
				<Form.Group id="password" className="my-3">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" required ref={passwordRef} />
				</Form.Group>
				<Form.Group id="password-confirm" className="my-3">
					<Form.Label>Password Confirmation</Form.Label>
					<Form.Control
						type="password"
						required
						ref={passwordConfirmRef}
					/>
				</Form.Group>
				<Button
					disabled={loading}
					type="submit"
					className="w-100 my-3"
					style={buttonStyle}
				>
					Sign Up
				</Button>
			</Form>
			<div className="w-100 text-center mt-2">
				Already have an account?{" "}
				<Link to="/login" className="login-link">
					Log In
				</Link>
			</div>
		</div>
	);
};

export default Signup;
