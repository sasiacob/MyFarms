import * as React from "react";
import { useAuthentication } from "../hooks";
import { AuthStack, HomeStack } from "./Stacks";

const RootNavigation = () => {
	const { user } = useAuthentication();

	return user ? <HomeStack /> : <AuthStack />;
};

export default RootNavigation;
