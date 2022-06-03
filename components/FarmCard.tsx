import React from "react";
import { StyleSheet, Image } from "react-native";
import { Text, View } from "./Themed";
import { Farm } from "../models/farm";

const FarmCard = ({ farm }: { farm: Farm }) => {
	return (
		<View style={[styles.container, styles.shadowed]}>
			<View style={styles.row}>
				<View>
					<Text style={styles.title}>{farm.name}</Text>
					<Text style={styles.text}>{farm.displayName}</Text>
					<Text style={styles.text}>phone: {farm.phone}</Text>
					<Text style={styles.text}>open hours: {farm.openHours}</Text>
					<Text style={styles.smallText}>created: {farm.creationDate}</Text>
					<Text style={styles.smallText}>updated: {farm.updatedDate}</Text>
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
	row: {
		flexDirection: "row",
		alignItems: "stretch",
		justifyContent: "space-between",
	},
	smallText: {
		fontSize: 10,
		color: "#959191",
	},
});
