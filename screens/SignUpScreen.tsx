import React, { useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { Text, View } from "../components";
import { FirebaseError } from "firebase/app";
import { onSignUp } from "../firebase/firebase";
import { signUpValidationSchema } from "../yup/schemas";

const SignUpScreen = () => {
	const [loading, setLoading] = useState(false);
	return (
		<View style={styles.wrapper}>
			<Text>SignIn Screen</Text>
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
						<TextInput
							placeholder="Email"
							style={[styles.textInput, styles.shadowed]}
							onChangeText={handleChange("email")}
							onBlur={handleBlur("email")}
							value={values.email}
							keyboardType="email-address"
							autoCapitalize="none"
							autoCorrect={false}
						/>
						{errors.email && touched.email && (
							<Text style={styles.errorText}>{errors.email}</Text>
						)}
						<TextInput
							placeholder="Password"
							style={[styles.textInput, styles.shadowed]}
							onChangeText={handleChange("password")}
							onBlur={handleBlur("password")}
							value={values.password}
							secureTextEntry
							autoCapitalize="none"
							autoCorrect={false}
						/>
						{errors.password && touched.password && (
							<Text style={styles.errorText}>{errors.password}</Text>
						)}
						<TextInput
							placeholder="Re-enter password"
							style={[styles.textInput, styles.shadowed]}
							onChangeText={handleChange("confirmPassword")}
							onBlur={handleBlur("confirmPassword")}
							value={values.confirmPassword}
							secureTextEntry
							autoCapitalize="none"
							autoCorrect={false}
						/>
						{errors.confirmPassword && touched.confirmPassword && (
							<Text style={styles.errorText}>{errors.confirmPassword}</Text>
						)}
						<Button onPress={handleSubmit} title="Sign up" />
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
		borderWidth: 4,
		justifyContent: "center",
		alignItems: "center",
	},
	textInput: {
		height: 40,
		width: "100%",
		margin: 10,
		backgroundColor: "white",
		borderColor: "gray",
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: 5,
		padding: 5,
	},
	loginContainer: {
		width: "80%",
		alignItems: "center",
		backgroundColor: "white",
		padding: 10,
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
	errorText: {
		fontSize: 10,
		color: "red",
	},
});
