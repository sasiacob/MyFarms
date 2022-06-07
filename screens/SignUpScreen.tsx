import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Formik } from "formik";
import { Input, Button } from "../components";
import { FirebaseError } from "firebase/app";
import { onSignUp } from "../firebase/firebase";
import { signUpValidationSchema } from "../yup/schemas";

const SignUpScreen = () => {
	return (
		<View style={styles.wrapper}>
			<Text>Sign In Screen</Text>
			<Formik
				validationSchema={signUpValidationSchema}
				initialValues={{ email: "", password: "", confirmPassword: "" }}
				onSubmit={async (values, actions) => {
					try {
						await onSignUp(values.email, values.confirmPassword);
						console.log("DONE!");
					} catch (error) {
						if (error instanceof FirebaseError) {
							actions.setErrors({
								confirmPassword: error.message,
							});
						} else {
							actions.setErrors({
								confirmPassword: "An error has occurred",
							});
						}
					}
				}}
			>
				{({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
					<View style={[styles.loginContainer, styles.shadowed]}>
						<Input
							placeholder="Email"
							onChangeText={handleChange("email")}
							onBlur={handleBlur("email")}
							value={values.email}
							keyboardType="email-address"
							autoCapitalize="none"
							autoCorrect={false}
							errorText={errors.email && touched.email ? errors.email : undefined}
						/>

						<Input
							placeholder="Password"
							onChangeText={handleChange("password")}
							onBlur={handleBlur("password")}
							value={values.password}
							secureTextEntry
							autoCapitalize="none"
							autoCorrect={false}
							errorText={
								errors.password && touched.password ? errors.password : undefined
							}
						/>

						<Input
							placeholder="Re-enter password"
							onChangeText={handleChange("confirmPassword")}
							onBlur={handleBlur("confirmPassword")}
							value={values.confirmPassword}
							secureTextEntry
							autoCapitalize="none"
							autoCorrect={false}
							errorText={
								errors.confirmPassword && touched.confirmPassword
									? errors.confirmPassword
									: undefined
							}
						/>

						<Button
							containerStyle={styles.btnContainer}
							onPress={handleSubmit}
							title="Sign up"
						/>
					</View>
				)}
			</Formik>
		</View>
	);
};

export default SignUpScreen;

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	loginContainer: {
		padding: 20,
		width: "80%",
		maxWidth: 500,
		backgroundColor: "white",
	},
	shadowed: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},

	btnContainer: {
		alignSelf: "center",
		marginVertical: 10,
	},
});
