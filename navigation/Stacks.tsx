import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { AddFarmScreen, HomeScreen, SignInScreen, SignUpScreen } from "../screens";
const Stack = createStackNavigator();
export const AuthStack = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="SignIn" component={SignInScreen} />
				<Stack.Screen name="SignUp" component={SignUpScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export const HomeStack = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="AddFarm" component={AddFarmScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};
