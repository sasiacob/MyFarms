import { StyleSheet, Text, TextInputProps, TextInput, View, TextStyle } from "react-native";
import React from "react";

type InputProps = TextInputProps & {
	errorText?: string;
	errorTextStyle?: TextStyle;
};
const Input = (props: InputProps) => {
	const { style, errorText, errorTextStyle, ...otherProps } = props;
	return (
		<View>
			<TextInput style={[styles.textInput, styles.shadowed, style]} {...otherProps} />
			<Text style={[styles.errorText, errorTextStyle]}>{errorText}</Text>
		</View>
	);
};

export default Input;

const styles = StyleSheet.create({
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
