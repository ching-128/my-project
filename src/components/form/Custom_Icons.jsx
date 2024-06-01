import PropTypes from "prop-types";
import { Input, Typography, Select, Option } from "@material-tailwind/react";

const Custom_Links = ({ data, handleNestedChange }) => {
	return (
		<div className="grid gap-y-4">
			{data.custom_icons &&
				Object.keys(data.custom_icons).map((key, index) => (
					<div
						key={`${key}-${index}`}
						className="flex items-center content-start gap-x-4">
						<Typography variant="h6" className="min-w-[150px]">
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
										key.charAt(0).toUpperCase() +
										key.slice(1)
									}
									name="visibility"
									checked={
										data.custom_icons[key].visibility ||
										false
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
									value={data.custom_icons[key].type || ""}
									onChange={(e) =>
										handleNestedChange(
											e,
											"custom_icons",
											key,
											"type"
										)
									}
									disabled>
									<Option value="contact">Contact</Option>
									<Option value="url">URL</Option>
									<Option value="gallery">Gallery</Option>
									<Option value="video">Video</Option>
									<Option value="pdf">PDF</Option>
									<Option value="pop-up">Pop-up</Option>
								</Select>
							</div>

							{/* Label Input */}
							<div className="w-48">
								<Input
									type="text"
									label="Label"
									name="label"
									value={data.custom_icons[key].label || ""}
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
							{data.custom_icons[key].type === "url" && (
								<div className="w-96">
									<Input
										type="text"
										label="URL"
										name="url"
										value={data.custom_icons[key].url || ""}
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

							{data.custom_icons[key].type === "pdf" && (
								<div className="w-48">
									<Input
										type="text"
										label="PDF"
										name="pdf"
										value={data.custom_icons[key].pdf || ""}
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

							{data.custom_icons[key].type === "gallery" && (
								<div className="w-48">
									<Input
										type="text"
										label="Gallery Images Number"
										name="gallery_images_no"
										value={
											data.custom_icons[key]
												.gallery_images_no || ""
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

							{data.custom_icons[key].type === "video" && (
								<div className="w-48">
									<Input
										type="text"
										label="Video Source"
										name="video_src"
										value={
											data.custom_icons[key].video_src ||
											""
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
													{(data.custom_icons[key]
														.popup[popupKey]
														.type === "url" &&
														`Link ${index + 1}`) ||
														(data.custom_icons[key]
															.popup[popupKey]
															.type === "pdf" &&
															`PDF ${index + 1}`)}
												</Typography>

												{/* Visibility Checkbox */}
												<div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
													<input
														id={`switch-popup-${index}-${popupKey}`}
														type="checkbox"
														label="Visibility"
														name="visibility"
														checked={
															data.custom_icons[
																key
															].popup[popupKey]
																.visibility ||
															false
														}
														onChange={(e) =>
															setData(
																(prevData) => {
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
															data.custom_icons[
																key
															].popup[popupKey]
																.type || ""
														}
														onChange={(e) =>
															setData(
																(prevData) => {
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
															data.custom_icons[
																key
															].popup[popupKey]
																.label || ""
														}
														onChange={(e) =>
															setData(
																(prevData) => {
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
												{data.custom_icons[key].popup[
													popupKey
												].type === "url" && (
													<div className="w-96">
														<Input
															type="text"
															label="URL"
															name="url"
															value={
																data
																	.custom_icons[
																	key
																].popup[
																	popupKey
																].url || ""
															}
															onChange={(e) =>
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
												{data.custom_icons[key].popup[
													popupKey
												].type === "pdf" && (
													<div className="w-48">
														<Input
															type="text"
															label="PDF"
															name="pdf"
															value={
																data
																	.custom_icons[
																	key
																].popup[
																	popupKey
																].pdf || ""
															}
															onChange={(e) =>
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
	);
};

Custom_Links.propTypes = {
	data: PropTypes.shape({
		custom_icons: PropTypes.objectOf(
			PropTypes.shape({
				visibility: PropTypes.bool,
				type: PropTypes.string,
				label: PropTypes.string,
				url: PropTypes.string,
				pdf: PropTypes.string,
				gallery_images_no: PropTypes.string,
				video_src: PropTypes.string,
				popup: PropTypes.objectOf(
					PropTypes.shape({
						visibility: PropTypes.bool,
						type: PropTypes.string,
						label: PropTypes.string,
						url: PropTypes.string,
						pdf: PropTypes.string,
					})
				).isRequired,
			})
		).isRequired,
	}).isRequired,
	handleNestedChange: PropTypes.func.isRequired,
};

export default Custom_Links;
