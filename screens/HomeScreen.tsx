import React from "react";
import { Button, StyleSheet } from "react-native";
import { Text, View } from "../components";
import { onAddDummyData, onLogout } from "../firebase/firebase";

const HomeScreen = () => {
	const onLogoutPress = () => {
		onLogout();
	};
	const onFetchPress = async () => {};
	const onAddPress = async () => {
		try {
			await onAddDummyData();
		} catch (error) {
			console.log("error", error);
		}
	};
	return (
		<View>
			<Button title="Log Out" onPress={onLogoutPress} />
			<Button title="Fetch data" onPress={onFetchPress} />
			<Button title="Add dummy data" onPress={onAddPress} />
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});
