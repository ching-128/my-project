import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Alert, Button, Input } from "@material-tailwind/react";

function Icon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			className="h-6 w-6"
		>
			<path
				fillRule="evenodd"
				d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
				clipRule="evenodd"
			/>
		</svg>
	);
}

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
					icon={<Icon />}
					action={
						<Button
							variant="text"
							color="white"
							size="sm"
							className="w-max"
							onClick={() => setOpen(false)}
						>
							Close
						</Button>
					}
				>
					Sorry, Invalid credentials.
				</Alert>
				<form
					onSubmit={handleSubmit}
					className="w-max h-auto mx-auto p-6 max-w-xl flex items-center flex-col gap-3  bg-blue-gray-400 rounded-lg"
				>
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
