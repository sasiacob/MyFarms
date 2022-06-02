import React, { useState } from "react";
import { ActivityIndicator, Button, StyleSheet, TextInput } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { Text, View } from "../components";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onSignIn } from "../firebase/firebase";
import { FirebaseError } from "firebase/app";

interface Credentials {
	email: string;
	password: string;
}
const loginValidationSchema = yup.object().shape({
	email: yup.string().email("Please enter a valid email").required("Email Address is required"),
	password: yup
		.string()
		.min(8, ({ min }) => `Password must be at least ${min} characters`)
		.required("Password is required"),
});

const SignInScreen = ({ navigation }) => {
	const [loading, setLoading] = useState(false);
	const onSignUpPress = () => {
		navigation.push("SignUp");
	};
	const onValidSubmit = async (value: Credentials) => {
		try {
			setLoading(true);
			await onSignIn(value.email, value.password);
		} catch (error) {
			console.log("error", error.message);
		} finally {
			setLoading(false);
		}
	};
	return (
		<View style={styles.wrapper}>
			<Text>SignIn Screen</Text>
			<Formik
				validationSchema={loginValidationSchema}
				initialValues={{ email: "", password: "" }}
				onSubmit={async (value, actions) => {
					try {
						setLoading(true);
						await onSignIn(value.email, value.password);
					} catch (error: any) {
						if (error instanceof FirebaseError) {
							actions.setErrors({
								password: error.message,
							});
						} else {
							actions.setErrors({
								password: "Unknwon erorr",
							});
						}
					} finally {
						setLoading(false);
					}
				}}
			>
				{({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
					<View style={[styles.loginContainer, styles.shadowed]}>
						<TextInput
							style={[styles.textInput, styles.shadowed]}
							onChangeText={handleChange("email")}
							onBlur={handleBlur("email")}
							value={values.email}
							keyboardType="email-address"
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
							//secureTextEntry
						/>
						{errors.password && touched.password && (
							<Text style={styles.errorText}>{errors.password}</Text>
						)}
						{loading ? (
							<ActivityIndicator />
						) : (
							<Button onPress={handleSubmit} title="Submit" />
						)}
					</View>
				)}
			</Formik>
			<Button onPress={onSignUpPress} title="Sign up" />
		</View>
	);
};

export default SignInScreen;

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
		width: "90%",
		alignItems: "center",
		backgroundColor: "white",
		paddingHorizontal: 10,
		paddingVertical: 40,
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
