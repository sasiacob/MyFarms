import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { collection, onSnapshot, Timestamp } from "firebase/firestore";
import { FarmCard, Button } from "../components";
import { onLogout, db } from "../firebase/firebase";
import { Farm } from "../models/farm";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
	const [farms, setFarms] = useState<Farm[]>([]);
	const navigation = useNavigation();
	useEffect(() => {
		const unsubscribe = onSnapshot(collection(db, "farms"), (snapshot) => {
			const data: Farm[] = snapshot.docs.map((doc) => {
				const creationDate: Timestamp = doc.data().creationDate;
				const updatedDate: Timestamp = doc.data().updatedDate;
				const obj = doc.data();
				delete obj.creationDate;
				delete obj.updatedDate;

				let item = {
					id: doc.id,
					creationDate:
						creationDate?.toDate().toLocaleDateString() +
						" " +
						creationDate?.toDate().toLocaleTimeString(),
					updatedDate:
						updatedDate?.toDate().toLocaleDateString() +
						" " +
						updatedDate?.toDate().toLocaleTimeString(),
					...obj,
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

	const onAddPress = async () => {
		navigation.navigate("AddFarm");
	};

	return (
		<View style={styles.container}>
			<FlatList
				style={styles.listContainer}
				ListHeaderComponent={
					<View>
						<Button
							containerStyle={styles.btnContainer}
							title="Log Out"
							onPress={onLogoutPress}
						/>

						<Button style={styles.btnContainer} title="Add Farm" onPress={onAddPress} />
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
		//
	},
	listContainer: {
		padding: 20,
		width: "80%",
		maxWidth: 500,
	},
	btnContainer: {
		marginVertical: 5,
	},
});
