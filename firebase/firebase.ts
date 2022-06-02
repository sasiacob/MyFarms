// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { collection, getFirestore, addDoc } from "firebase/firestore";
import { firebaseConfig } from "./config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore(app);
export const onSignIn = async (email: string, password: string) => {
	await signInWithEmailAndPassword(auth, email, password);
};
export const onSignUp = async (email: string, password: string) => {
	await createUserWithEmailAndPassword(auth, email, password);
};
export const onLogout = async () => {
	await signOut(auth);
};
export const onAddDummyData = async () => {
	const docRef = await addDoc(collection(db, "farms"), {
		displayname: "farm displayname",
		name: "farm name",
		phone: "03932932",
		openHours: "09:00 - 12:00",
		imageUrl: "www.img.ro",
	});
	console.log("Document written with ID: ", docRef.id);
};
export default app;
