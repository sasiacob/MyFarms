import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import { Farm } from "../models/farm";
import { Input, Button } from "../components";
import { collection, onSnapshot } from "firebase/firestore";
import { db, linkPhotoToFarm, onAddFarm, onImageUpload } from "../firebase/firebase";
import { AddFarmValidationSchema } from "../yup/schemas";
import { useNavigation } from "@react-navigation/native";
const AddFarmScreen = () => {
	const [usedNamesList, setUsedNamesList] = useState<string[]>([]);
	const [image, setImage] = useState<string>();
	const [imageUrl, setImageUrl] = useState<string>();
	const [itemId, setItemId] = useState<string>();
	const navigation = useNavigation();
	const [isUploading, setIsUploading] = useState(false);
	useEffect(() => {
		const unsubscribe = onSnapshot(collection(db, "farms"), (snapshot) => {
			const data: string[] = snapshot.docs.map((doc) => {
				let item = {
					id: doc.id,
					...doc.data(),
				} as Farm;
				return item.name;
			});

			setUsedNamesList(data);
		});
		return unsubscribe;
	}, []);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
		});
		console.log(result);

		if (!result.cancelled) {
			setImage(result.uri);
		}
	};
	const onGoBack = () => {
		navigation.goBack();
	};
	const uploadImage = async () => {
		try {
			setIsUploading(true);
			if (!image) return;
			if (!itemId) return;
			const response = await fetch(image);
			const blob = await response.blob();
			const imageName = `image_${itemId}`;
			const imageUrl = await onImageUpload(blob, imageName);
			setImageUrl(imageUrl);

			// IMAGE NAME WILL HAVE FARM ID FOR NOT ALLOWING DUPLICATES
			await linkPhotoToFarm(itemId, imageUrl);
			setIsUploading(false);
			onGoBack();
		} catch (error) {
			console.log("error", error);
			setIsUploading(false);
		}
	};
	const initialValues: Partial<Farm> = {
		// EXCLUDE ID WITH PARTIAL
		displayName: "",
		name: "",
		openHours: "",
		imageUrl: "",
		phone: "",
	};
	return (
		<ScrollView contentContainerStyle={styles.wrapper}>
			<View style={styles.formContainer}>
				<Formik
					validationSchema={AddFarmValidationSchema(usedNamesList)}
					onSubmit={async (values, actions) => {
						const newItemId: string = await onAddFarm(values);
						setItemId(newItemId);
					}}
					initialValues={initialValues}
				>
					{({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
						<View>
							<Text style={styles.title}>Add Farm</Text>
							{itemId ? (
								<View>
									<Text>
										Farm successfully created! Select a photo or go back
									</Text>
									<Button onPress={pickImage} title="Get Image" />
									<Button onPress={onGoBack} title="Go back" />
								</View>
							) : (
								<View>
									<Input
										placeholder="Farm Name"
										onChangeText={handleChange("name")}
										onBlur={handleBlur("name")}
										value={values.name}
										errorText={
											errors.name && touched.name ? errors.name : undefined
										}
									/>
									<Input
										placeholder="Display Name"
										onChangeText={handleChange("displayName")}
										onBlur={handleBlur("displayName")}
										value={values.displayName}
										errorText={
											errors.displayName && touched.displayName
												? errors.displayName
												: undefined
										}
									/>
									<Input
										placeholder="Phone"
										onChangeText={handleChange("phone")}
										onBlur={handleBlur("phone")}
										value={values.phone}
										errorText={
											errors.phone && touched.phone ? errors.phone : undefined
										}
									/>
									<Input
										placeholder="Open Hours"
										onChangeText={handleChange("openHours")}
										onBlur={handleBlur("openHours")}
										value={values.openHours}
										errorText={
											errors.openHours && touched.openHours
												? errors.openHours
												: undefined
										}
									/>
									<Input
										placeholder="Image URL"
										onChangeText={handleChange("imageUrl")}
										onBlur={handleBlur("imageUrl")}
										value={values.imageUrl}
										errorText={
											errors.imageUrl && touched.imageUrl
												? errors.imageUrl
												: undefined
										}
									/>

									<View style={styles.btnContainer}>
										<Button onPress={() => handleSubmit()} title="Add Farm" />
									</View>
								</View>
							)}

							{image ? (
								<View style={styles.btnContainer}>
									<Button
										loading={isUploading}
										onPress={uploadImage}
										title="Upload Image"
									/>
								</View>
							) : null}
						</View>
					)}
				</Formik>
				{image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
			</View>
		</ScrollView>
	);
};

export default AddFarmScreen;

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	formContainer: {
		width: "90%",
		maxWidth: 500,
		alignItems: "stretch",
		backgroundColor: "white",
		padding: 10,
		borderRadius: 10,
	},
	title: {
		fontWeight: "bold",
		fontSize: 30,
		padding: 10,
	},
	btnContainer: {
		marginVertical: 10,
	},
});
