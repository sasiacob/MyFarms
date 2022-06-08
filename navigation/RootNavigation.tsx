import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useAuthentication } from "../hooks";
import { AuthStack, HomeStack } from "./Stacks";

const RootNavigation = () => {
	// add delay in order to wait for auth response
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setIsLoading(false);
		}, 1000);
		return () => {
			clearTimeout(timeoutId);
		};
	}, []);
	const { user } = useAuthentication();
	if (isLoading) return <ActivityIndicator />;

	return user ? <HomeStack /> : <AuthStack />;
};

export default RootNavigation;
