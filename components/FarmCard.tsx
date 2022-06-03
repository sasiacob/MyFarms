import React from "react";
import { StyleSheet, Image } from "react-native";
import { Text, View } from "./Themed";
import { Farm } from "../models/farm";

const FarmCard = ({ farm }: { farm: Farm }) => {
	console.log("farm.imageUrl", farm.imageUrl);
	return (
		<View style={styles.container}>
			<Text>{farm.displayName}</Text>
			<Text>{farm.name}</Text>
			<Text>{farm.phone}</Text>
			<Text>{farm.openHours}</Text>
			{farm.imageUrl && (
				<Image source={{ uri: farm.imageUrl }} style={{ width: 50, height: 50 }} />
			)}
		</View>
	);
};

export default FarmCard;

const styles = StyleSheet.create({
	container: {
		padding: 10,
		borderRadius: 5,
		borderWidth: 1,
	},
});
