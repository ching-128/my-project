import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setJsonData } from "./jsonDataSlice";
import PropTypes from "prop-types";

const Select_file = ({ onFilesSelected }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onDrop = useCallback(
		(acceptedFiles) => {
			const fileReader = new FileReader();
			fileReader.onload = () => {
				const jsonData = JSON.parse(fileReader.result);
				dispatch(setJsonData(jsonData));
				navigate("/dashboard");
			};
			fileReader.readAsText(acceptedFiles[0]);
			onFilesSelected(acceptedFiles); // Call the callback function
		},
		[navigate, dispatch, onFilesSelected]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		maxFiles: 1,
		accept: {
			"application/json": [".json"],
		},
	});

	return (
		<div className="w-svw h-svh grid place-content-center">
			<Card
				{...getRootProps()}
				className={`w-70vw h-50vh p-4 border-2 border-dashed ${
					isDragActive ? "border-blue-500" : "border-gray-300"
				} cursor-pointer grid place-content-center`}>
				<input {...getInputProps()} />
				<Typography color="gray" variant="h6" className="text-center">
					{isDragActive
						? "Drop the files here ..."
						: "Drag & drop some files here, or click to select files"}
				</Typography>
			</Card>
		</div>
	);
};

Select_file.propTypes = {
	onFilesSelected: PropTypes.func.isRequired,
};

export default Select_file;
