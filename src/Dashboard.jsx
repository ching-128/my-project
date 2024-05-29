// src/Dashboard.jsx
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setJsonData } from "./jsonDataSlice";
import {
	Button,
	Input,
	Card,
	Typography,
	Select,
	Option,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
	const projectData = useSelector((state) => state.jsonData.project_data);
	const [data, setData] = useState({});
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (projectData) {
			setData(projectData);
		} else {
			navigate("/");
		}
	}, [navigate, projectData]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleNestedChange = (
		e,
		category,
		key,
		subKey = null,
		isCheckbox = false
	) => {
		const value = isCheckbox ? e.target.checked : e.target.value;
		setData((prevData) => {
			if (subKey) {
				return {
					...prevData,
					[category]: {
						...prevData[category],
						[key]: {
							...prevData[category][key],
							[subKey]: value,
						},
					},
				};
			} else {
				return {
					...prevData,
					[category]: {
						...prevData[category],
						[key]: value,
					},
				};
			}
		});
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
						label="About Us Description"
						name="aboutus_description"
						value={data.aboutus_description || ""}
						onChange={handleChange}
						className="peer h-full min-h-[150px] w-full resize-none rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
						placeholder=" "></textarea>
					<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
						About Us Description
					</label>
				</div>

				{/* Social Links */}
				<Typography variant="h5" className="mt-4 mb-2">
					Social Links
				</Typography>
				{data.social_links &&
					Object.keys(data.social_links).map((key, index) => (
						<div key={`${key}-${index}`} className="w-96 mb-4">
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
					Object.keys(data.contact_links).map((key, index) => (
						<div key={`${key}-${index}`} className="w-96 mb-4">
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
				<div className="grid gap-3">
					<Typography variant="h5">Splashscreen</Typography>
					<div className="flex items-center gap-4">
						{data.splashscreen &&
							[
								"splashscreen_image",
								"is_whitelabeled",
								"start_btn",
							].map((key, index) => (
								<div
									key={`${key}-${index}`}
									className="flex items-center mb-4">
									<label className="mr-2">
										{key.charAt(0).toUpperCase() +
											key.slice(1).replace(/_/g, " ")}
									</label>
									<div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
										<input
											id={`switch-${key}`}
											type="checkbox"
											checked={
												data.splashscreen[key] || false
											}
											onChange={(e) =>
												handleNestedChange(
													e,
													"splashscreen",
													key,
													null,
													true
												)
											}
											className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-gray-900 peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
										/>
										<label
											htmlFor={`switch-${key}`}
											className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-gray-900 peer-checked:before:bg-gray-900">
											<div
												className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
												data-ripple-dark="true"></div>
										</label>
									</div>
								</div>
							))}
					</div>
				</div>

				{/* Custom Icons */}
				<div className="grid gap-3">
					<Typography variant="h5">Custom Icons</Typography>
					<div className="grid gap-y-4">
						{data.custom_icons &&
							Object.keys(data.custom_icons).map((key, index) => (
								<div
									key={`${key}-${index}`}
									className="flex items-center content-start gap-x-4">
									<Typography
										variant="h6"
										className="min-w-[150px]">
										{key.charAt(0).toUpperCase() +
											key.slice(1).replace(/_/g, " ")}
									</Typography>
									<div className="flex items-center content-start gap-x-4">
										{/* Visibility Checkbox */}
										<div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
											<input
												id={`switch-component-${index}`}
												type="checkbox"
												label={
													key
														.charAt(0)
														.toUpperCase() +
													key.slice(1)
												}
												name="visibility"
												checked={
													data.custom_icons[key]
														.visibility || false
												}
												onChange={(e) =>
													handleNestedChange(
														e,
														"custom_icons",
														key,
														"visibility",
														true
													)
												}
												className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-gray-900 peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
											/>
											<label
												htmlFor={`switch-component-${index}`}
												className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-gray-900 peer-checked:before:bg-gray-900">
												<div
													className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
													data-ripple-dark="true"></div>
											</label>
										</div>

										{/* Type Select */}
										<div className="w-48">
											<Select
												name="type"
												label="Select Type"
												value={
													data.custom_icons[key]
														.type || ""
												}
												onChange={(e) =>
													handleNestedChange(
														e,
														"custom_icons",
														key,
														"type"
													)
												}
												disabled>
												<Option value="contact">
													Contact
												</Option>
												<Option value="url">URL</Option>
												<Option value="gallery">
													Gallery
												</Option>
												<Option value="video">
													Video
												</Option>
												<Option value="pdf">PDF</Option>
												<Option value="pop-up">
													Pop-up
												</Option>
											</Select>
										</div>

										{/* Label Input */}
										<div className="w-48">
											<Input
												type="text"
												label="Label"
												name="label"
												value={
													data.custom_icons[key]
														.label || ""
												}
												onChange={(e) =>
													handleNestedChange(
														e,
														"custom_icons",
														key,
														"label"
													)
												}
											/>
										</div>

										{/* Conditional Fields Based on Type */}
										{data.custom_icons[key].type ===
											"url" && (
											<div className="w-96">
												<Input
													type="text"
													label="URL"
													name="url"
													value={
														data.custom_icons[key]
															.url || ""
													}
													onChange={(e) =>
														handleNestedChange(
															e,
															"custom_icons",
															key,
															"url"
														)
													}
												/>
											</div>
										)}

										{data.custom_icons[key].type ===
											"pdf" && (
											<div className="w-48">
												<Input
													type="text"
													label="PDF"
													name="pdf"
													value={
														data.custom_icons[key]
															.pdf || ""
													}
													onChange={(e) =>
														handleNestedChange(
															e,
															"custom_icons",
															key,
															"pdf"
														)
													}
												/>
											</div>
										)}

										{data.custom_icons[key].type ===
											"gallery" && (
											<div className="w-48">
												<Input
													type="text"
													label="Gallery Images Number"
													name="gallery_images_no"
													value={
														data.custom_icons[key]
															.gallery_images_no ||
														""
													}
													onChange={(e) =>
														handleNestedChange(
															e,
															"custom_icons",
															key,
															"gallery_images_no"
														)
													}
												/>
											</div>
										)}

										{data.custom_icons[key].type ===
											"video" && (
											<div className="w-48">
												<Input
													type="text"
													label="Video Source"
													name="video_src"
													value={
														data.custom_icons[key]
															.video_src || ""
													}
													onChange={(e) =>
														handleNestedChange(
															e,
															"custom_icons",
															key,
															"video_src"
														)
													}
												/>
											</div>
										)}
									</div>

									{data.custom_icons[key].type === "pop-up" &&
										data.custom_icons[key].popup && (
											<div className="pl-4 border-l-2 border-gray-300 flex content-start gap-4">
												{Object.keys(
													data.custom_icons[key].popup
												).map((popupKey, index) => {
													return (
														<div
															key={index}
															className="grid gap-3">
															<Typography
																variant="h6"
																className="mb-2">
																{(data
																	.custom_icons[
																	key
																].popup[
																	popupKey
																].type ===
																	"url" &&
																	`Link ${
																		index +
																		1
																	}`) ||
																	(data
																		.custom_icons[
																		key
																	].popup[
																		popupKey
																	].type ===
																		"pdf" &&
																		`PDF ${
																			index +
																			1
																		}`)}
															</Typography>

															{/* Visibility Checkbox */}
															<div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
																<input
																	id={`switch-popup-${index}-${popupKey}`}
																	type="checkbox"
																	label="Visibility"
																	name="visibility"
																	checked={
																		data
																			.custom_icons[
																			key
																		].popup[
																			popupKey
																		]
																			.visibility ||
																		false
																	}
																	onChange={(
																		e
																	) =>
																		setData(
																			(
																				prevData
																			) => {
																				return {
																					...prevData,
																					custom_icons:
																						{
																							...prevData.custom_icons,
																							[key]: {
																								...prevData
																									.custom_icons[
																									key
																								],
																								popup: {
																									...prevData
																										.custom_icons[
																										key
																									]
																										.popup,
																									[popupKey]:
																										{
																											...prevData
																												.custom_icons[
																												key
																											]
																												.popup[
																												popupKey
																											],
																											visibility:
																												e
																													.target
																													.checked,
																										},
																								},
																							},
																						},
																				};
																			}
																		)
																	}
																	className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-gray-900 peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
																/>
																<label
																	htmlFor={`switch-popup-${index}-${popupKey}`}
																	className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-gray-900 peer-checked:before:bg-gray-900">
																	<div
																		className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
																		data-ripple-dark="true"></div>
																</label>
															</div>

															{/* Type Select */}
															<div className="w-48">
																<Select
																	name="type"
																	label="Select Type"
																	value={
																		data
																			.custom_icons[
																			key
																		].popup[
																			popupKey
																		]
																			.type ||
																		""
																	}
																	onChange={
																		(e) =>
																			setData(
																				(
																					prevData
																				) => {
																					return {
																						...prevData,
																						custom_icons:
																							{
																								...prevData.custom_icons,
																								[key]: {
																									...prevData
																										.custom_icons[
																										key
																									],
																									popup: {
																										...prevData
																											.custom_icons[
																											key
																										]
																											.popup,
																										[popupKey]:
																											{
																												...prevData
																													.custom_icons[
																													key
																												]
																													.popup[
																													popupKey
																												],
																												type: e
																													.target
																													.value,
																											},
																									},
																								},
																							},
																					};
																				}
																			)
																		// handleNestedChange(
																		// 	e,
																		// 	"custom_icons",
																		// 	key,
																		// 	`popup.${popupKey}.type`
																		// )
																	}
																	disabled>
																	<Option value="url">
																		URL
																	</Option>
																	<Option value="pdf">
																		PDF
																	</Option>
																</Select>
															</div>

															{/* Label Input */}
															<div className="w-48">
																<Input
																	type="text"
																	label="Label"
																	name="label"
																	value={
																		data
																			.custom_icons[
																			key
																		].popup[
																			popupKey
																		]
																			.label ||
																		""
																	}
																	onChange={(
																		e
																	) =>
																		setData(
																			(
																				prevData
																			) => {
																				return {
																					...prevData,
																					custom_icons:
																						{
																							...prevData.custom_icons,
																							[key]: {
																								...prevData
																									.custom_icons[
																									key
																								],
																								popup: {
																									...prevData
																										.custom_icons[
																										key
																									]
																										.popup,
																									[popupKey]:
																										{
																											...prevData
																												.custom_icons[
																												key
																											]
																												.popup[
																												popupKey
																											],
																											label: e
																												.target
																												.value,
																										},
																								},
																							},
																						},
																				};
																			}
																		)
																	}
																/>
															</div>

															{/* URL Input */}
															{data.custom_icons[
																key
															].popup[popupKey]
																.type ===
																"url" && (
																<div className="w-96">
																	<Input
																		type="text"
																		label="URL"
																		name="url"
																		value={
																			data
																				.custom_icons[
																				key
																			]
																				.popup[
																				popupKey
																			]
																				.url ||
																			""
																		}
																		onChange={(
																			e
																		) =>
																			setData(
																				(
																					prevData
																				) => {
																					return {
																						...prevData,
																						custom_icons:
																							{
																								...prevData.custom_icons,
																								[key]: {
																									...prevData
																										.custom_icons[
																										key
																									],
																									popup: {
																										...prevData
																											.custom_icons[
																											key
																										]
																											.popup,
																										[popupKey]:
																											{
																												...prevData
																													.custom_icons[
																													key
																												]
																													.popup[
																													popupKey
																												],
																												url: e
																													.target
																													.value,
																											},
																									},
																								},
																							},
																					};
																				}
																			)
																		}
																	/>
																</div>
															)}

															{/* PDF Input */}
															{data.custom_icons[
																key
															].popup[popupKey]
																.type ===
																"pdf" && (
																<div className="w-48">
																	<Input
																		type="text"
																		label="PDF"
																		name="pdf"
																		value={
																			data
																				.custom_icons[
																				key
																			]
																				.popup[
																				popupKey
																			]
																				.pdf ||
																			""
																		}
																		onChange={(
																			e
																		) =>
																			setData(
																				(
																					prevData
																				) => {
																					return {
																						...prevData,
																						custom_icons:
																							{
																								...prevData.custom_icons,
																								[key]: {
																									...prevData
																										.custom_icons[
																										key
																									],
																									popup: {
																										...prevData
																											.custom_icons[
																											key
																										]
																											.popup,
																										[popupKey]:
																											{
																												...prevData
																													.custom_icons[
																													key
																												]
																													.popup[
																													popupKey
																												],
																												pdf: e
																													.target
																													.value,
																											},
																									},
																								},
																							},
																					};
																				}
																			)
																		}
																	/>
																</div>
															)}
														</div>
													);
												})}
											</div>
										)}
								</div>
							))}
					</div>
				</div>

				{/* Master Icons */}
				<div className="grid gap-3">
					<Typography variant="h5" className="mt-4 mb-2">
						Master Icons
					</Typography>
					<div className="grid gap-y-4">
						{data.master_icons &&
							Object.keys(data.master_icons).map((key, index) => (
								<div
									key={`${key}-${index}`}
									className="flex items-center content-start gap-x-4">
									<Typography
										variant="h6"
										className="min-w-[150px]">
										{key.charAt(0).toUpperCase() +
											key.slice(1).replace(/_/g, " ")}
									</Typography>
									<div className="flex items-center content-start gap-x-4">
										{/* Visibility Checkbox */}
										<div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
											<input
												id={`switch-component-m-${index}`}
												type="checkbox"
												label={
													key
														.charAt(0)
														.toUpperCase() +
													key.slice(1)
												}
												name="visibility"
												checked={
													data.master_icons[key]
														.visibility || false
												}
												onChange={(e) =>
													handleNestedChange(
														e,
														"master_icons",
														key,
														"visibility",
														true
													)
												}
												className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-gray-900 peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
											/>
											<label
												htmlFor={`switch-component-m-${index}`}
												className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-gray-900 peer-checked:before:bg-gray-900">
												<div
													className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
													data-ripple-dark="true"></div>
											</label>
										</div>

										{/* Label Input */}
										<div className="w-48">
											<Input
												type="text"
												label="Label"
												name="label"
												value={
													data.master_icons[key]
														.label || ""
												}
												onChange={(e) =>
													handleNestedChange(
														e,
														"master_icons",
														key,
														"label"
													)
												}
											/>
										</div>
									</div>
								</div>
							))}
					</div>
				</div>

				{/* Available Tags */}
				<Typography variant="h5" className="mt-4 mb-2">
					Available Tags
				</Typography>
				{data.available_tags &&
					Object.keys(data.available_tags).map((key, index) => (
						<div key={`${key}-${index}`} className="mb-4">
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
				<Button type="submit" color="blue">
					Save Changes
				</Button>
			</form>
		</Card>
	);
};

export default Dashboard;