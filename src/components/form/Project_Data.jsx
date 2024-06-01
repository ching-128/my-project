import PropTypes from "prop-types";
import { Input } from "@material-tailwind/react";

const Project_Data = ({ data, handleChange }) => {
	return (
		<>
			<div className="mb-4">
				<Input
					type="text"
					label="Project Title"
					name="project_title"
					value={data.project_title || ""}
					onChange={handleChange}
				/>
			</div>
			<div className="mb-4">
				<Input
					type="text"
					label="About Us Title"
					name="aboutus_title"
					value={data.aboutus_title || ""}
					onChange={handleChange}
				/>
			</div>
			<div className="relative min-w-[200px]">
				<textarea
					label="About Us Description"
					name="aboutus_description"
					value={data.aboutus_description || ""}
					onChange={handleChange}
					className="peer h-full min-h-[150px] max-h-[300px] w-full resize-y rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-4 py-4 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50 scrollbar-hide"
					placeholder=" "></textarea>
				<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
					About Us Description
				</label>
			</div>
		</>
	);
};

Project_Data.propTypes = {
	data: PropTypes.shape({
		project_title: PropTypes.string,
		aboutus_title: PropTypes.string,
		aboutus_description: PropTypes.string,
	}).isRequired,
	handleChange: PropTypes.func.isRequired,
};

export default Project_Data;