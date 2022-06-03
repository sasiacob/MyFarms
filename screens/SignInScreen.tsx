import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Formik } from "formik";
import { Input, Text, View, Button } from "../components";
import { onSignIn } from "../firebase/firebase";
import { FirebaseError } from "firebase/app";
import { loginValidationSchema } from "../yup/schemas";
import { useNavigation } from "@react-navigation/native";

interface Credentials {
	email: string;
	password: string;
}

const SignInScreen = () => {
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation();
	const onSignUpPress = () => {
		navigation.navigate("SignUp");
	};
	const initialValues: Credentials = {
		email: "",
		password: "",
	};
	return (
		<View style={styles.wrapper}>
			<Text>SignIn Screen</Text>
			<Formik
				validationSchema={loginValidationSchema}
				initialValues={initialValues}
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
								password: "Unknown erorr",
							});
						}
					} finally {
						setLoading(false);
					}
				}}
			>
				{({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
					<View style={[styles.loginContainer, styles.shadowed]}>
						<Input
							onChangeText={handleChange("email")}
							onBlur={handleBlur("email")}
							value={values.email}
							keyboardType="email-address"
							errorText={errors.email && touched.email ? errors.email : undefined}
						/>

						<Input
							placeholder="Password"
							onChangeText={handleChange("password")}
							onBlur={handleBlur("password")}
							value={values.password}
							secureTextEntry
							errorText={
								errors.password && touched.password ? errors.password : undefined
							}
						/>

						<Button
							containerStyle={styles.btnContainer}
							loading={loading}
							onPress={handleSubmit}
							title="Submit"
						/>
						<Button containerStyle={styles.btnContainer} onPress={onSignUpPress} title="Sign up" />
					</View>
				)}
			</Formik>
			
		</View>
	);
};

export default SignInScreen;

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
	errorText: {
		fontSize: 10,
		color: "red",
	},
	btnContainer: {
		alignSelf: "center",
		marginVertical:10
	},
});
