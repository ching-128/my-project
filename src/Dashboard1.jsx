import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setJsonData } from "./jsonDataSlice.js";
import {
	Button,
	Input,
	Card,
	Typography,
	Select,
	Option,
	IconButton,
	Tabs,
	TabsHeader,
	TabsBody,
	Tab,
	TabPanel,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { CreateIcon, CutIcon, EditIcon, SaveIcon } from "./components/Icon.jsx";
import Project_Data from "./components/form/Project_Data.jsx";
import Social_Links from "./components/form/Social_Links.jsx";
import Contact_Links from "./components/form/Contact_Links.jsx";

const Dashboard = () => {
	const project_data = useSelector((state) => state.jsonData.project_data);

	const [data, setData] = useState({});
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [editMode, setEditMode] = useState(null);
	const [editKey, setEditKey] = useState("");
	const [editValue, setEditValue] = useState("");

	const [newKey, setNewKey] = useState("");
	const [newValue, setNewValue] = useState("");
	const [isAdding, setIsAdding] = useState(false);

	useEffect(() => {
		if (project_data) {
			setData(project_data);
		} else {
			navigate("/");
		}
	}, [navigate, project_data]);

	const handleAddNewTag = () => {
		if (newKey.trim() && newValue.trim()) {
			setData((prevData) => ({
				...prevData,
				available_tags: {
					...prevData.available_tags,
					[newKey]: newValue,
				},
			}));
			setNewKey("");
			setNewValue("");
			setIsAdding(false);
		}
	};

	const handleRemoveTag = (key) => {
		setData((prevData) => {
			const updatedTags = { ...prevData.available_tags };
			delete updatedTags[key];
			return {
				...prevData,
				available_tags: updatedTags,
			};
		});
	};

	const handleEditTag = (key) => {
		setEditMode(key);
		setEditKey(key);
		setEditValue(data.available_tags[key]);
	};

	const handleSaveTag = (oldKey) => {
		setData((prevData) => {
			const updatedTags = { ...prevData.available_tags };
			if (editKey !== oldKey) {
				delete updatedTags[oldKey];
			}
			updatedTags[editKey] = editValue;
			return {
				...prevData,
				available_tags: updatedTags,
			};
		});
		setEditMode(null);
		setEditKey("");
		setEditValue("");
	};

	const handleDownload = () => {
		const element = document.createElement("a");
		const file = new Blob([JSON.stringify({ project_data })], {
			type: "text/plain",
		});
		element.href = URL.createObjectURL(file);
		element.download = "project.json";
		document.body.appendChild(element);
		element.click();
	};

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
		data && (
			<Card className="m-0 relative">
				<form
					onSubmit={handleSubmit}
					className="w-full h-svh overflow-auto p-4 pb-0">
					<div className="h-[calc(100svh-76px)] overflow-auto scrollbar-hide">
						<Typography variant="h4" className="mb-4">
							Edit Project Data
						</Typography>
						<Tabs
							id="custom-animation"
							value="Project_data"
							className="">
							<TabsHeader className="sticky top-0 z-10">
								<Tab
									key="Project_data"
									value="Project_data"
									className="font-bold">
									Project Data
								</Tab>
								<Tab
									key="Custom_icons"
									value="Custom_icons"
									className="font-bold">
									Custom icons
								</Tab>
								<Tab
									key="Master_icons"
									value="Master_icons"
									className="font-bold">
									Master icons
								</Tab>
								<Tab
									key="Others"
									value="Others"
									className="font-bold">
									Others
								</Tab>
							</TabsHeader>
							<TabsBody
								animate={{
									initial: { opacity: 0 },
									mount: { opacity: 1 },
									unmount: { opacity: 0 },
								}}>
								<TabPanel
									key="Project_data"
									value="Project_data">
									<div>
										{/* Project data */}
										<Project_Data
											data={data}
											handleChange={handleChange}
										/>
										{/* Project data ends here */}

										{/* Social Links */}
										{data.social_links && (
											<Social_Links
												data={data}
												handleNestedChange={
													handleNestedChange
												}
											/>
										)}
										{/* Social Links Ends Here */}
										{/* Contact Links */}
										<Contact_Links
											data={data}
											handleNestedChange={
												handleNestedChange
											}
										/>
									</div>
								</TabPanel>
								<TabPanel
									key="Custom_icons"
									value="Custom_icons">
									<div className="grid gap-3 mb-4">
										<Typography variant="h5">
											Custom Icons
										</Typography>
										<div className="grid gap-y-4">
											{data.custom_icons &&
												Object.keys(
													data.custom_icons
												).map((key, index) => (
													<div
														key={`${key}-${index}`}
														className="flex items-center content-start gap-x-4">
														<Typography
															variant="h6"
															className="min-w-[150px]">
															{key
																.charAt(0)
																.toUpperCase() +
																key
																	.slice(1)
																	.replace(
																		/_/g,
																		" "
																	)}
														</Typography>
														<div className="flex items-center content-start gap-x-4">
															{/* Visibility Checkbox */}
															<div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
																<input
																	id={`switch-component-${index}`}
																	type="checkbox"
																	label={
																		key
																			.charAt(
																				0
																			)
																			.toUpperCase() +
																		key.slice(
																			1
																		)
																	}
																	name="visibility"
																	checked={
																		data
																			.custom_icons[
																			key
																		]
																			.visibility ||
																		false
																	}
																	onChange={(
																		e
																	) =>
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
																		data
																			.custom_icons[
																			key
																		]
																			.type ||
																		""
																	}
																	onChange={(
																		e
																	) =>
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
																	<Option value="url">
																		URL
																	</Option>
																	<Option value="gallery">
																		Gallery
																	</Option>
																	<Option value="video">
																		Video
																	</Option>
																	<Option value="pdf">
																		PDF
																	</Option>
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
																		data
																			.custom_icons[
																			key
																		]
																			.label ||
																		""
																	}
																	onChange={(
																		e
																	) =>
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
															{data.custom_icons[
																key
															].type ===
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
																				.url ||
																			""
																		}
																		onChange={(
																			e
																		) =>
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

															{data.custom_icons[
																key
															].type ===
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
																				.pdf ||
																			""
																		}
																		onChange={(
																			e
																		) =>
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

															{data.custom_icons[
																key
															].type ===
																"gallery" && (
																<div className="w-48">
																	<Input
																		type="text"
																		label="Gallery Images Number"
																		name="gallery_images_no"
																		value={
																			data
																				.custom_icons[
																				key
																			]
																				.gallery_images_no ||
																			""
																		}
																		onChange={(
																			e
																		) =>
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

															{data.custom_icons[
																key
															].type ===
																"video" && (
																<div className="w-48">
																	<Input
																		type="text"
																		label="Video Source"
																		name="video_src"
																		value={
																			data
																				.custom_icons[
																				key
																			]
																				.video_src ||
																			""
																		}
																		onChange={(
																			e
																		) =>
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

														{data.custom_icons[key]
															.type ===
															"pop-up" &&
															data.custom_icons[
																key
															].popup && (
																<div className="pl-4 border-l-2 border-gray-300 flex content-start gap-4">
																	{Object.keys(
																		data
																			.custom_icons[
																			key
																		].popup
																	).map(
																		(
																			popupKey,
																			index
																		) => {
																			return (
																				<div
																					key={
																						index
																					}
																					className="grid gap-3">
																					<Typography
																						variant="h6"
																						className="mb-2">
																						{(data
																							.custom_icons[
																							key
																						]
																							.popup[
																							popupKey
																						]
																							.type ===
																							"url" &&
																							`Link ${
																								index +
																								1
																							}`) ||
																							(data
																								.custom_icons[
																								key
																							]
																								.popup[
																								popupKey
																							]
																								.type ===
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
																								]
																									.popup[
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
																								]
																									.popup[
																									popupKey
																								]
																									.type ||
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
																								]
																									.popup[
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
																					{data
																						.custom_icons[
																						key
																					]
																						.popup[
																						popupKey
																					]
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
																					{data
																						.custom_icons[
																						key
																					]
																						.popup[
																						popupKey
																					]
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
																		}
																	)}
																</div>
															)}
													</div>
												))}
										</div>
									</div>
								</TabPanel>
								<TabPanel
									key="Master_icons"
									value="Master_icons">
									<div className="grid gap-3">
										<Typography
											variant="h5"
											className="mt-4 mb-2">
											Master Icons
										</Typography>
										<div className="grid gap-y-4">
											{data.master_icons &&
												Object.keys(
													data.master_icons
												).map((key, index) => (
													<div
														key={`${key}-${index}`}
														className="flex items-center content-start gap-x-4">
														<Typography
															variant="h6"
															className="min-w-[150px]">
															{key
																.charAt(0)
																.toUpperCase() +
																key
																	.slice(1)
																	.replace(
																		/_/g,
																		" "
																	)}
														</Typography>
														<div className="flex items-center content-start gap-x-4">
															{/* Visibility Checkbox */}
															<div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
																<input
																	id={`switch-component-m-${index}`}
																	type="checkbox"
																	label={
																		key
																			.charAt(
																				0
																			)
																			.toUpperCase() +
																		key.slice(
																			1
																		)
																	}
																	name="visibility"
																	checked={
																		data
																			.master_icons[
																			key
																		]
																			.visibility ||
																		false
																	}
																	onChange={(
																		e
																	) =>
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
																		data
																			.master_icons[
																			key
																		]
																			.label ||
																		""
																	}
																	onChange={(
																		e
																	) =>
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
								</TabPanel>
								<TabPanel key="Others" value="Others">
									{/* Splashscreen */}
									<div className="grid gap-3">
										<Typography variant="h5">
											Splashscreen
										</Typography>
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
															{key
																.charAt(0)
																.toUpperCase() +
																key
																	.slice(1)
																	.replace(
																		/_/g,
																		" "
																	)}
														</label>
														<div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
															<input
																id={`switch-${key}`}
																type="checkbox"
																checked={
																	data
																		.splashscreen[
																		key
																	] || false
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
																className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-50 checked:bg-gray-900 peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
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

									{/* Available Tags */}
									<div className="grid gap-3">
										<Typography
											variant="h5"
											className="mt-4 mb-2">
											Available Tags
										</Typography>
										<div className="flex items-center gap-2 flex-wrap">
											{data.available_tags &&
												Object.keys(
													data.available_tags
												).map((key, index) => (
													<div
														key={`${key}-${index}`}
														className="w-max p-2 flex items-center gap-2 bg-blue-gray-50 rounded-lg">
														{editMode === key ? (
															<>
																<Input
																	type="text"
																	value={
																		editKey
																	}
																	label="Edit Tag Name"
																	onChange={(
																		e
																	) =>
																		setEditKey(
																			e
																				.target
																				.value
																		)
																	}
																	className="w-full"
																/>
																<span>:</span>
																<Input
																	type="text"
																	value={
																		editValue
																	}
																	label="Edit Title"
																	onChange={(
																		e
																	) =>
																		setEditValue(
																			e
																				.target
																				.value
																		)
																	}
																	className="w-full"
																/>
																<IconButton
																	color="green"
																	className="min-w-[40px]"
																	onClick={() =>
																		handleSaveTag(
																			key
																		)
																	}>
																	<SaveIcon />
																</IconButton>
															</>
														) : (
															<>
																<span>
																	<strong>
																		{key}
																	</strong>
																	:{" "}
																	{
																		data
																			.available_tags[
																			key
																		]
																	}
																</span>
																<IconButton
																	color="green"
																	onClick={() =>
																		handleEditTag(
																			key
																		)
																	}>
																	<EditIcon />
																</IconButton>
																<IconButton
																	color="red"
																	onClick={() =>
																		handleRemoveTag(
																			key
																		)
																	}>
																	<CutIcon />
																</IconButton>
															</>
														)}
													</div>
												))}
											{/* add new tag */}
											{isAdding && (
												<div className="w-max p-2 flex items-center gap-2 bg-blue-gray-50 rounded-lg">
													<Input
														type="text"
														label="New Tag Name"
														value={newKey}
														onChange={(e) =>
															setNewKey(
																e.target.value
															)
														}
														className="w-full"
													/>
													<span>:</span>
													<Input
														type="text"
														label="New Title"
														value={newValue}
														onChange={(e) =>
															setNewValue(
																e.target.value
															)
														}
														className="w-full"
													/>
													<IconButton
														color="green"
														className="min-w-[40px]"
														onClick={
															handleAddNewTag
														}>
														<SaveIcon />
													</IconButton>
													<IconButton
														color="red"
														className="min-w-[40px]"
														onClick={() =>
															setIsAdding(false)
														}>
														<CutIcon />
													</IconButton>
												</div>
											)}
											{!isAdding && !editMode && (
												<IconButton
													color="green"
													className="p-7"
													onClick={() =>
														setIsAdding(true)
													}>
													<CreateIcon />
												</IconButton>
											)}
										</div>
									</div>
								</TabPanel>
							</TabsBody>
						</Tabs>
					</div>

					<div className="w-full p-4 bg-white flex justify-between items-center fixed left-0 bottom-0 z-10 border-t-2">
						{/* save button */}
						<Button type="submit" color="blue">
							Save Changes
						</Button>

						{/* upload button */}
						<div className="flex items-center justify-center gap-3">
							<Button
								type="buttonn"
								color="blue"
								onClick={handleDownload}>
								Download
							</Button>
							<Button type="button" color="blue">
								Upload
							</Button>
						</div>
					</div>
				</form>
			</Card>
		)
	);
};

export default Dashboard;
