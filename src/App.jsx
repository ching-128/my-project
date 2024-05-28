import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login.jsx";
import Select_file from "./Select_file.jsx";
import Dashboard from "./Dashboard.jsx";

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const isLoggedIn = document.cookie
			.split(";")
			.some((item) => item.trim().startsWith("session=valid"));
		setIsLoggedIn(isLoggedIn);
	}, []);

	const handleLogin = () => {
		setIsLoggedIn(true);
	};

	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						isLoggedIn ? (
							<Select_file onFilesSelected={() => {}} />
						) : (
							<Login onLogin={handleLogin} />
						)
					}
				/>
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</Router>
	);
};

export default App;