import * as yup from "yup";

export const AddFarmValidationSchema = (usedNames: string[]) => {
	return yup.object().shape({
		displayName: yup.string().required("Display Name is required"),

		name: yup
			.string()
			.required("Name is required")
			.test("Unique", "Farm Name must be unique", (value) =>
				value ? !usedNames.includes(value!) : false
			),
		phone: yup.string(),
		openHours: yup.string(),
		imageUrl: yup.string(),
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
