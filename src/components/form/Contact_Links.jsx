import PropTypes from "prop-types";
import { Typography, Input, IconButton } from "@material-tailwind/react";
import { useState } from "react";
import { CreateIcon, CutIcon, SaveIcon } from "../Icon";

const Contact_Links = ({ data, handleNestedChange }) => {
	const [isAddingEmail, setIsAddingEmail] = useState(false);
	const [newEmail, setNewEmail] = useState("");
	const [isAddingPhone, setIsAddingPhone] = useState(false);
	const [newPhone, setNewPhone] = useState("");

	const handleAddEmail = () => {
		if (newEmail) {
			handleNestedChange(
				{
					target: {
						value: [...(data.contact_links.email || []), newEmail],
					},
				},
				"contact_links",
				"email"
			);
			setNewEmail("");
			setIsAddingEmail(false);
		}
	};

	const handleAddPhone = () => {
		if (newPhone) {
			handleNestedChange(
				{
					target: {
						value: [...(data.contact_links.phone || []), newPhone],
					},
				},
				"contact_links",
				"phone"
			);
			setNewPhone("");
			setIsAddingPhone(false);
		}
	};

	const handleRemoveContactLink = (type, index) => {
		const updatedLinks = data.contact_links[type].filter(
			(_, i) => i !== index
		);
		handleNestedChange(
			{ target: { value: updatedLinks } },
			"contact_links",
			type
		);
	};

	return (
		<div className="my-4 grid">
			<Typography variant="h5" className="mt-4 mb-2">
				Contact Links
			</Typography>
			<div className="flex flex-col gap-4">
				{/* Email Section */}
				<div className="flex items-center justify-start gap-2">
					<Typography variant="h6" className="min-w-[150px]">
						Email
					</Typography>
					{data.contact_links?.email?.map((email, index) => (
						<div
							key={`email-${index}`}
							className="w-max flex items-center gap-2 rounded-lg">
							<Input
								type="text"
								value={email}
								label="Email ID"
								className="min-48 bg-white"
								onChange={(e) =>
									handleNestedChange(
										e,
										"contact_links",
										`email.${index}`
									)
								}
							/>
							<IconButton
								color="red"
								className="min-w-[40px]"
								onClick={() =>
									handleRemoveContactLink("email", index)
								}>
								<CutIcon />
							</IconButton>
						</div>
					))}
					{isAddingEmail && (
						<div className="flex items-center gap-2 rounded-lg">
							<Input
								type="text"
								value={newEmail}
								label="New Email ID"
								onChange={(e) => setNewEmail(e.target.value)}
								className="w-96"
							/>
							<IconButton
								color="red"
								className="min-w-[40px]"
								onClick={() => setIsAddingEmail(false)}>
								<CutIcon />
							</IconButton>
							<IconButton
								color="green"
								className="min-w-[40px]"
								onClick={handleAddEmail}>
								<SaveIcon />
							</IconButton>
						</div>
					)}
					{data.contact_links?.email?.length <= 1 &&
						!isAddingEmail && (
							<IconButton
								color="green"
								onClick={() => setIsAddingEmail(true)}>
								<CreateIcon />
							</IconButton>
						)}
				</div>

				{/* Phone Section */}
				<div className="flex items-center justify-start gap-2">
					<Typography variant="h6" className="min-w-[150px]">
						Phone
					</Typography>
					{data.contact_links?.phone?.map((phone, index) => (
						<div
							key={`phone-${index}`}
							className="w-max flex items-center gap-2 rounded-lg">
							<Input
								type="text"
								value={phone}
								label="Phone Number"
								className="min-48 bg-white"
								onChange={(e) =>
									handleNestedChange(
										e,
										"contact_links",
										`phone.${index}`
									)
								}
							/>
							<IconButton
								color="red"
								className="min-w-[40px]"
								onClick={() =>
									handleRemoveContactLink("phone", index)
								}>
								<CutIcon />
							</IconButton>
						</div>
					))}
					{isAddingPhone && (
						<div className="flex items-center gap-2 rounded-lg">
							<Input
								type="text"
								className="min-48 bg-white"
								label="New Phone Number"
								value={newPhone}
								onChange={(e) => setNewPhone(e.target.value)}
							/>
							<IconButton
								color="red"
								className="min-w-[40px]"
								onClick={() => setIsAddingPhone(false)}>
								<CutIcon />
							</IconButton>
							<IconButton
								color="green"
								className="min-w-[40px]"
								onClick={handleAddPhone}>
								<SaveIcon />
							</IconButton>
						</div>
					)}
					{data.contact_links?.phone?.length <= 1 &&
						!isAddingPhone && (
							<IconButton
								color="green"
								onClick={() => setIsAddingPhone(true)}>
								<CreateIcon />
							</IconButton>
						)}
				</div>
			</div>
		</div>
	);
};

Contact_Links.propTypes = {
	data: PropTypes.shape({
		contact_links: PropTypes.shape({
			email: PropTypes.arrayOf(PropTypes.string),
			phone: PropTypes.arrayOf(PropTypes.string),
		}),
	}).isRequired,
	handleNestedChange: PropTypes.func.isRequired,
};

export default Contact_Links;