import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./firebase/firebase";

import { RootNavigation } from "./navigation";

export default function App() {
	return (
		<SafeAreaProvider>
			<RootNavigation />
			<StatusBar />
		</SafeAreaProvider>
	);
}
