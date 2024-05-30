import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Alert, Button, Input } from "@material-tailwind/react";
import { AlertIcon } from "./components/Icon";

const Login = ({ onLogin }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const usernameInputRef = useRef(null);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		usernameInputRef.current.focus();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (username === "user" && password === "password") {
			const expires = new Date();
			expires.setDate(expires.getDate() + 7); // 7 days from now
			document.cookie = `session=valid; expires=${expires.toUTCString()}; path=/`;
			onLogin();
		} else {
			setOpen(true);
			setTimeout(() => {
				setOpen(false);
			}, 4000);
		}
	};

	return (
		<>
			<div className="w-svw h-svh grid place-content-center  bg-blue-gray-100">
				<Alert
					className="w-max mx-auto absolute top-2 left-1/2 -translate-x-1/2 flex items-center"
					variant="gradient"
					open={open}
					icon={<AlertIcon />}
					action={
						<Button
							variant="text"
							color="white"
							size="sm"
							className="w-max"
							onClick={() => setOpen(false)}>
							Close
						</Button>
					}>
					Sorry, Invalid credentials.
				</Alert>
				<form
					onSubmit={handleSubmit}
					className="w-max h-auto mx-auto p-6 max-w-xl flex items-center flex-col gap-3  bg-blue-gray-400 rounded-lg">
					<div>
						<Input
							color="white"
							variant="outlined"
							label="Username"
							ref={usernameInputRef}
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div>
						<Input
							color="white"
							variant="outlined"
							label="Password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<Button type="submit">Login</Button>
				</form>
			</div>
		</>
	);
};

Login.propTypes = {
	onLogin: PropTypes.func.isRequired,
};

export default Login;
