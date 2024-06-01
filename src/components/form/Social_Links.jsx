import PropTypes from "prop-types";
import { Typography, Input, Select, Option } from "@material-tailwind/react";

const Social_Links = ({ data, handleNestedChange }) => {
	return (
		<div className="my-4">
			<Typography variant="h5" className="mt-4 mb-2">
				Social Links
			</Typography>
			<div className="grid gap-y-4">
				{data.social_links &&
					Object.keys(data.social_links).map((key, index) => (
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
										id={`social_links-${index}`}
										type="checkbox"
										label={
											key.charAt(0).toUpperCase() +
											key.slice(1)
										}
										name="visibility"
										checked={
											data.social_links[key].visibility ||
											false
										}
										onChange={(e) =>
											handleNestedChange(
												e,
												"social_links",
												key,
												"visibility",
												true
											)
										}
										className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-gray-900 peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
									/>
									<label
										htmlFor={`social_links-${index}`}
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
											data.social_links[key].type || ""
										}
										onChange={(e) =>
											handleNestedChange(
												e,
												"social_links",
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
										value={
											data.social_links[key].label || ""
										}
										onChange={(e) =>
											handleNestedChange(
												e,
												"social_links",
												key,
												"label"
											)
										}
									/>
								</div>

								<div className="w-96">
									<Input
										type="text"
										label="URL"
										name="url"
										value={data.social_links[key].url || ""}
										onChange={(e) =>
											handleNestedChange(
												e,
												"social_links",
												key,
												"url"
											)
										}
									/>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

Social_Links.propTypes = {
	data: PropTypes.shape({
		social_links: PropTypes.objectOf(
			PropTypes.shape({
				visibility: PropTypes.bool,
				type: PropTypes.string,
				label: PropTypes.string,
				url: PropTypes.string,
			})
		).isRequired,
	}).isRequired,
	handleNestedChange: PropTypes.func.isRequired,
};

export default Social_Links;