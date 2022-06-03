import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import { Farm } from "../models/farm";
import { Input } from "../components";
import { collection, onSnapshot } from "firebase/firestore";
import { db, linkPhotoToFarm, onAddFarm, onImageUpload } from "../firebase/firebase";
import { AddFarmValidationSchema } from "../yup/schemas";
const AddFarmScreen = () => {
	const [usedNamesList, setUsedNamesList] = useState<string[]>([]);
	const [image, setImage] = useState<string>();
	const [imageUrl, setImageUrl] = useState<string>();
	const [itemId, setItemId] = useState<string>();

	useEffect(() => {
		const unsubscribe = onSnapshot(collection(db, "farms"), (snapshot) => {
			const data: string[] = snapshot.docs.map((doc) => {
				let item = {
					id: doc.id,
					...doc.data(),
				} as Farm;
				return item.name;
			});
			console.log("data", data);
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
	const uploadImage = async () => {
		try {
			if (!image) return;
			if (!itemId) return;
			const response = await fetch(image);
			const blob = await response.blob();
			const imageName = `image_${itemId}`;
			const imageUrl = await onImageUpload(blob, imageName);
			setImageUrl(imageUrl);
			console.log('imageUrl', imageUrl)
			// IMAGE NAME WILL HAVE FARM ID FOR NOT ALLOWING DUPLICATES 
			await linkPhotoToFarm(itemId, imageUrl);
		} catch (error) {
			console.log("error", error);
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
		<View style={styles.wrapper}>
			<Text>AddFarmScreen</Text>

			<Formik
				validationSchema={AddFarmValidationSchema(usedNamesList)}
				onSubmit={async (values, actions) => {
					const newItemId: string = await onAddFarm(values);
					setItemId(newItemId);
				}}
				initialValues={initialValues}
			>
				{({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
					<View style={styles.formContainer}>
						<Input
							placeholder="Farm Name"
							onChangeText={handleChange("name")}
							onBlur={handleBlur("name")}
							value={values.name}
							errorText={errors.name && touched.name ? errors.name : undefined}
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
							errorText={errors.phone && touched.phone ? errors.phone : undefined}
						/>
						<Input
							placeholder="Open Hours"
							onChangeText={handleChange("openHours")}
							onBlur={handleBlur("openHours")}
							value={values.openHours}
							errorText={
								errors.openHours && touched.openHours ? errors.openHours : undefined
							}
						/>
						<Input
							placeholder="Image URL"
							onChangeText={handleChange("imageUrl")}
							onBlur={handleBlur("imageUrl")}
							value={values.imageUrl}
							errorText={
								errors.imageUrl && touched.imageUrl ? errors.imageUrl : undefined
							}
						/>
						<Button disabled={!itemId} onPress={pickImage} title="Get Image" />
						{image && <Button onPress={uploadImage} title="Upload Image" />}
						<Button onPress={handleSubmit} title="Add Farm" />
					</View>
				)}
			</Formik>
			{image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
			{imageUrl && <Image source={{ uri: imageUrl }} style={{ width: 100, height: 100 }} />}
		</View>
	);
};

export default AddFarmScreen;

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		borderWidth: 4,
		justifyContent: "center",
		alignItems: "center",
	},
	formContainer: {
		width: "90%",
		maxWidth: 500,
		alignItems: "center",
		backgroundColor: "white",
		padding: 10,
	},
});
