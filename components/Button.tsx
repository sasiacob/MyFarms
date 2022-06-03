import {
	ActivityIndicator,
	Platform,
	StyleSheet,
	Text,
	TextStyle,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
	ViewStyle,
} from "react-native";
import React from "react";

type ButtonProps = TouchableOpacityProps & {
	titleStyle?: TextStyle;
	containerStyle?: ViewStyle;
	title: string;
	loading?: boolean;
};

const Button = (props: ButtonProps) => {
	const { titleStyle, containerStyle, title, loading, disabled, ...otherProps } = props;
	return (
		<View style={[styles.container, containerStyle]}>
			<TouchableOpacity disabled={disabled} {...otherProps}>
				{loading ? (
					<ActivityIndicator />
				) : (
					<Text style={[styles.text, disabled && styles.disabledText, titleStyle]}>
						{title}
					</Text>
				)}
			</TouchableOpacity>
		</View>
	);
};

export default Button;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 5,
		paddingHorizontal: 15,
		maxWidth: 200,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: 5,
		borderColor: "#dddddd",
	},
	text: {
		color: Platform.OS == "ios" ? "#007AFF" : "#2196F3",
		fontWeight: "bold",
	},
	disabledText: {
		color: "#dddddd",
	},
});
