// src/Dashboard.jsx
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setJsonData } from "./jsonDataSlice";
import { Button, Input, Card, Typography } from "@material-tailwind/react";

const Dashboard = () => {
	const projectData = useSelector((state) => state.jsonData.project_data);
	const [data, setData] = useState({});
	const dispatch = useDispatch();

	useEffect(() => {
		if (projectData) {
			setData(projectData);
		}
	}, [projectData]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleNestedChange = (e, category, key, isCheckbox = false) => {
        const value = isCheckbox ? e.target.checked : e.target.value;
        console.log(value);
		setData((prevData) => ({
			...prevData,
			[category]: {
				...prevData[category],
				[key]: value,
			},
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(setJsonData({ project_data: data }));
	};

	return (
		<Card className="p-4 m-4">
			<Typography variant="h4" className="mb-4">
				Edit Project Data
			</Typography>
			<form onSubmit={handleSubmit}>
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
				<div className="relative w-full min-w-[200px]">
					<textarea
						label="Project Description"
						name="project_description"
						value={data.project_description || ""}
						onChange={handleChange}
						className="peer h-full min-h-[150px] w-full resize-none rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
						placeholder=" "
					></textarea>
					<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
						Project Description
					</label>
				</div>

				{/* Social Links */}
				<Typography variant="h5" className="mt-4 mb-2">
					Social Links
				</Typography>
				{data.social_links &&
					Object.keys(data.social_links).map((key) => (
						<div key={key} className="mb-4">
							<Input
								type="text"
								label={
									key.charAt(0).toUpperCase() + key.slice(1)
								}
								name={key}
								value={data.social_links[key] || ""}
								onChange={(e) =>
									handleNestedChange(e, "social_links", key)
								}
							/>
						</div>
					))}

				{/* Contact Links */}
				<Typography variant="h5" className="mt-4 mb-2">
					Contact Links
				</Typography>
				{data.contact_links &&
					Object.keys(data.contact_links).map((key) => (
						<div key={key} className="mb-4">
							<Input
								type="text"
								label={
									key.charAt(0).toUpperCase() + key.slice(1)
								}
								name={key}
								value={data.contact_links[key][0] || ""}
								onChange={(e) =>
									handleNestedChange(e, "contact_links", key)
								}
							/>
						</div>
					))}

				{/* Splashscreen */}
				<Typography variant="h5" className="mt-4 mb-2">
					Splashscreen
				</Typography>
				{data.splashscreen &&
					Object.keys(data.splashscreen).map((key) => (
						<div key={key} className="mb-4">
							<Input
								type="text"
								label={
									key.charAt(0).toUpperCase() + key.slice(1)
								}
								name={key}
								value={data.splashscreen[key] || ""}
								onChange={(e) =>
									handleNestedChange(e, "splashscreen", key)
								}
							/>
						</div>
					))}

				{/* Stereographic View */}
				<Typography variant="h5" className="mt-4 mb-2">
					Stereographic View
				</Typography>
				{data.stereographic_view &&
					Object.keys(data.stereographic_view).map((key) => (
						<div key={key} className="mb-4">
							<Input
								type="number"
								label={
									key.charAt(0).toUpperCase() + key.slice(1)
								}
								name={key}
								value={data.stereographic_view[key] || ""}
								onChange={(e) =>
									handleNestedChange(
										e,
										"stereographic_view",
										key
									)
								}
							/>
						</div>
					))}

				{/* Custom Icons */}
				<Typography variant="h5" className="mt-4 mb-2">
					Custom Icons
				</Typography>
				{data.custom_icons &&
					Object.keys(data.custom_icons).map((key) => (
						<>
							<div key={key} className="flex items-center">
								<h6>
									{key.charAt(0).toUpperCase() + key.slice(1)}
								</h6>
								<div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
									<input
										id="switch-component"
										type="checkbox"
										label={
											key.charAt(0).toUpperCase() +
											key.slice(1)
										}
										name={key}
										checked={data.custom_icons[key]}
										onChange={(e) =>
											handleNestedChange(
												e,
												"custom_icons",
												key,
												true
											)
										}
										className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-gray-900 peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
									/>
									<label
										htmlFor="switch-component"
										className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
									>
										<div
											className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
											data-ripple-dark="true"
										></div>
									</label>
								</div>
							</div>
						</>
					))}

				{/* Href Custom Links */}
				<Typography variant="h5" className="mt-4 mb-2">
					Href Custom Links
				</Typography>
				{data.href_custom_links &&
					Object.keys(data.href_custom_links).map((key) => (
						<div key={key} className="mb-4">
							<Input
								type="text"
								label={
									key.charAt(0).toUpperCase() + key.slice(1)
								}
								name={key}
								value={data.href_custom_links[key] || ""}
								onChange={(e) =>
									handleNestedChange(
										e,
										"href_custom_links",
										key
									)
								}
							/>
						</div>
					))}

				{/* Gallery Images Number */}
				<div className="mb-4">
					<Input
						type="number"
						label="Gallery Images Number"
						name="gallery_images_no"
						value={data.gallery_images_no || ""}
						onChange={handleChange}
					/>
				</div>

				{/* Video Source */}
				<div className="mb-4">
					<Input
						type="text"
						label="Video Source"
						name="video_src"
						value={data.video_src || ""}
						onChange={handleChange}
					/>
				</div>

				{/* Master Icons */}
				<Typography variant="h5" className="mt-4 mb-2">
					Master Icons
				</Typography>
				{data.master_icons &&
					Object.keys(data.master_icons).map((key) => (
						<>
							<div key={key} className="flex items-center">
								<h6>
									{key.charAt(0).toUpperCase() + key.slice(1)}
								</h6>
								<div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
									<input
										id="switch-component"
										type="checkbox"
										label={
											key.charAt(0).toUpperCase() +
											key.slice(1)
										}
										name={key}
										checked={data.master_icons[key]}
										onChange={(e) =>
											handleNestedChange(
												e,
												"master_icons",
												key,
												true
											)
										}
										className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-gray-900 peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
									/>
									<label
										htmlFor="switch-component"
										className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
									>
										<div
											className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
											data-ripple-dark="true"
										></div>
									</label>
								</div>
							</div>
						</>
					))}

				{/* Available Tags */}
				<Typography variant="h5" className="mt-4 mb-2">
					Available Tags
				</Typography>
				{data.available_tags &&
					Object.keys(data.available_tags).map((key) => (
						<div key={key} className="mb-4">
							<Input
								type="text"
								label={
									key.charAt(0).toUpperCase() + key.slice(1)
								}
								name={key}
								value={data.available_tags[key] || ""}
								onChange={(e) =>
									handleNestedChange(e, "available_tags", key)
								}
							/>
						</div>
					))}

				{/* Similarly, add sections for contact_links, splashscreen, stereographic_view, custom_icons, href_custom_links, etc. */}

				<Button type="submit" color="blue">
					Save Changes
				</Button>
			</form>
		</Card>
	);
};

export default Dashboard;
