import React from "react";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./Navbar";
import CreateMeet from "./CreateMeet";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./css/App.css";
import Logout from "./Logout";

function App() {
	return (
		<>
			<div className="app">
				<Router>
					<AuthProvider>
						<Navbar />
						<Switch>
							<PrivateRoute
								path="/"
								exact
								component={Dashboard}
							/>
							<Route path="/signup" component={Signup} />
							<Route path="/login" component={Login} />
							<PrivateRoute
								path="/create"
								component={CreateMeet}
							/>
							<PrivateRoute path="/logout" component={Logout} />
						</Switch>
					</AuthProvider>
				</Router>
			</div>
		</>
	);
}

export default App;
