import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Farm } from "../models/farm";
import FarmCard from "./FarmCard";

const FarmList = ({ farms }: { farms: Farm[] }) => {
	return (
		<FlatList
			renderItem={({ item }) => <FarmCard farm={item} />}
			data={farms}
			keyExtractor={(item) => item.id}
		/>
	);
};

export default FarmList;

const styles = StyleSheet.create({});
