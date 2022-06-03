import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { FarmCard, View, Text, Button } from "../components";
import { onLogout, db } from "../firebase/firebase";
import { Farm } from "../models/farm";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
	const [farms, setFarms] = useState<Farm[]>([]);
	const navigation = useNavigation();
	useEffect(() => {
		const unsubscribe = onSnapshot(collection(db, "farms"), (snapshot) => {
			const data: Farm[] = snapshot.docs.map((doc) => {
				let item = {
					id: doc.id,
					...doc.data(),
				} as Farm;
				return item;
			});
			setFarms(data);
		});
		return unsubscribe;
	}, []);
	const onLogoutPress = () => {
		onLogout();
	};
	const onFetchPress = async () => {};
	const onAddPress = async () => {
		navigation.navigate("AddFarm");
	};

	return (
		<View style={styles.container}>
			<FlatList
				style={styles.listContainer}
				ListHeaderComponent={
					<View>
						<View>
							<Button title="Log Out" onPress={onLogoutPress} />
						</View>
						<View>
							<Button title="Fetch data" onPress={onFetchPress} />
						</View>
						<View>
							<Button title="Add Farm" onPress={onAddPress} />
						</View>
					</View>
				}
				ListEmptyComponent={
					<View>
						<Text>No farms added</Text>
					</View>
				}
				renderItem={({ item }) => <FarmCard farm={item} />}
				data={farms}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	listContainer: {
		padding: 20,
		width: "80%",
		maxWidth: 500,
	},
});
