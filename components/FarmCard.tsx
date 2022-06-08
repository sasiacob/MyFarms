import React from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import { Farm } from "../models/farm";

const getDateString = (date: Date | undefined) => {
	if (!date) return undefined;
	return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};
const FarmCard = ({ farm }: { farm: Farm }) => {
	const creation = getDateString(farm.creationDate);
	const updated = getDateString(farm.updatedDate);
	return (
		<View style={[styles.container, styles.shadowed]}>
			<View style={styles.leftContainer}>
				<View>
					<Text style={styles.title}>{farm.name}</Text>
					<Text style={styles.text}>{farm.displayName}</Text>
					<Text style={styles.text}>phone: {farm.phone}</Text>
					<Text style={styles.text}>open hours: {farm.openHours}</Text>
					{creation ? <Text style={styles.smallText}>created: {creation}</Text> : null}
					{updated ? <Text style={styles.smallText}>updated: {updated}</Text> : null}
				</View>
				{farm.imageUrl ? (
					<Image source={{ uri: farm.imageUrl }} style={{ width: 50, height: 50 }} />
				) : null}
			</View>
		</View>
	);
};

export default FarmCard;

const styles = StyleSheet.create({
	container: {
		padding: 20,
		borderRadius: 5,
		marginVertical: 10,
		backgroundColor: "white",
	},
	text: {
		fontSize: 15,
	},
	title: {
		fontWeight: "bold",
		fontSize: 20,
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
	leftContainer: {
		flexDirection: "row",
		alignItems: "stretch",
		justifyContent: "space-between",
	},
	smallText: {
		fontSize: 10,
		color: "#959191",
	},
});
