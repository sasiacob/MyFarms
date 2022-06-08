// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { collection, getFirestore, addDoc, updateDoc, getDoc, doc } from "firebase/firestore";
import { firebaseConfig } from "./config";
import { getStorage, ref, uploadBytes, UploadResult, getDownloadURL } from "firebase/storage";
import { Farm } from "../models/farm";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const storage = getStorage();

export const db = getFirestore(app);
export const onSignIn = async (email: string, password: string) => {
	await signInWithEmailAndPassword(auth, email, password);
};
export const onSignUp = async (email: string, password: string) => {
	await createUserWithEmailAndPassword(auth, email, password);
};
export const onLogout = async () => {
	await signOut(auth);
};

export const onAddFarm = async (item: Partial<Farm>): Promise<string> => {
	const docRef = await addDoc(collection(db, "farms"), item);
	return docRef.id;
};

export const onImageUpload = async (imageUri: Blob, imageName: string): Promise<string> => {
	const imagesRef = ref(storage, `/images/${imageName}`);

	const result: UploadResult = await uploadBytes(imagesRef, imageUri);
	const remoteUrl = await getDownloadURL(result.ref);
	return remoteUrl;
};
export const linkPhotoToFarm = async (farmId: string, photoUrl: string) => {
	const docRef = doc(db, "farms", farmId);
	await updateDoc(docRef, {
		imageUrl: photoUrl,
	});
};

export default app;
