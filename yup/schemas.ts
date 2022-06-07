import * as yup from "yup";

export const AddFarmValidationSchema = (usedNames: string[]) => {
	const phoneRegExp =
		/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
	const noStartWithNumberRegExp = /^[a-z|A-Z]/;

	return yup.object().shape({
		displayName: yup
			.string()

			.required("Display Name is required")
			.max(20, "Display name cannot contain more than 20 characters"),

		name: yup
			.string()
			.required("Name is required")
			.matches(noStartWithNumberRegExp, "Name cannot start with number")
			.max(10, "Name cannot contain more than 20 characters")
			.test("Unique", "Farm Name must be unique", (value) =>
				value ? !usedNames.includes(value!) : false
			),
		phone: yup.string().matches(phoneRegExp, "Phone number is not valid"),
		openHours: yup.string().max(20, "Invalid input"),
		imageUrl: yup.string().url("Url is not valid"),
	});
};

export const loginValidationSchema = yup.object().shape({
	email: yup.string().email("Please enter a valid email").required("Email Address is required"),
	password: yup
		.string()
		.min(8, ({ min }) => `Password must be at least ${min} characters`)
		.required("Password is required"),
});

export const signUpValidationSchema = yup.object().shape({
	email: yup.string().email("Please enter valid email").required("Email is required"),
	password: yup
		.string()
		.matches(/\w*[a-z]\w*/, "Password must have a small letter")
		.matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
		.matches(/\d/, "Password must have a number")
		.matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
		.min(8, ({ min }) => `Password must be at least ${min} characters`)
		.required("Password is required"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password")], "Passwords do not match")
		.required("Confirm password is required"),
});
