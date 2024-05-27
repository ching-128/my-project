// src/App.jsx
import { useState, useEffect } from "react";
import Login from "./Login.jsx";
import Select_file from "./Select_file.jsx";

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleFilesSelected = (files) => {
		console.log(files);
	};

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
		<div>
			{isLoggedIn ? (
				<Select_file onFilesSelected={handleFilesSelected} />
			) : (
				<Login onLogin={handleLogin} />
			)}
		</div>
	);
};

export default App;
