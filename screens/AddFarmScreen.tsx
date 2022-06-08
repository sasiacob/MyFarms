import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ScrollView, KeyboardAvoidingView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import { Farm } from "../models/farm";
import { Input, Button } from "../components";
import { collection, onSnapshot } from "firebase/firestore";
import { db, onAddFarm, onImageUpload } from "../firebase/firebase";
import { AddFarmValidationSchema } from "../yup/schemas";
import { useNavigation } from "@react-navigation/native";

const AddFarmScreen = () => {
	const [usedNamesList, setUsedNamesList] = useState<string[]>([]);
	const [localImageUri, setLocalImageUri] = useState<string>();
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(false);
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
			setLocalImageUri(result.uri);
		}
	};
	const onGoBack = () => {
		navigation.goBack();
	};
	const uploadImage = async (imageName: string): Promise<string> => {
		const response = await fetch(localImageUri!);
		const blob = await response.blob();
		const imageUrl = await onImageUpload(blob, imageName);

		return imageUrl;
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
						try {
							setIsLoading(true);
							if (localImageUri) {
								const imageName = `image_${values.name}`;
								const imageLink: string = await uploadImage(imageName);
								values.imageUrl = imageLink;
							}
							const newItemId: string = await onAddFarm(values);
							console.log("Farm created with id:", newItemId);

							navigation.goBack();
						} catch (e) {
							console.log(e);
						} finally {
							setIsLoading(false);
						}
					}}
					initialValues={initialValues}
				>
					{({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
						<View>
							<Text style={styles.title}>Add Farm</Text>

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
								{localImageUri ? null : (
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
								)}
								<View style={styles.btnWrapper}>
									<View style={styles.btnContainer}>
										<Button onPress={pickImage} title="Pick Image" />
									</View>

									<View style={styles.btnContainer}>
										<Button
											loading={isLoading}
											onPress={() => handleSubmit()}
											title="Add Farm"
										/>
									</View>

									<View style={styles.btnContainer}>
										<Button onPress={onGoBack} title="Go back" />
									</View>
								</View>
							</View>
						</View>
					)}
				</Formik>
				{localImageUri && (
					<Image source={{ uri: localImageUri }} style={{ width: 100, height: 100 }} />
				)}
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
	btnWrapper: { alignSelf: "center", padding: 10 },
});
