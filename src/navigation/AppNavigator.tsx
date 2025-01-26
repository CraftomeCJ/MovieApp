import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screens/home-screen';
import withApiState from '../../helpers/with-api-state';
import { RootStackParamList } from '../types/navigation';

const Stack = createStackNavigator<RootStackParamList>();
const HomeScreenWithApiState = withApiState(HomeScreen);

const AppNavigator = () => (
	<Stack.Navigator
		initialRouteName='HOME'
		screenOptions={{
			headerShown: false,
		}}
	>
		<Stack.Screen
			name='HOME'
			component={HomeScreenWithApiState}
		/>
		{/* <Stack.Screen name="MovieDetail" component={MovieDetailScreen} /> */}
	</Stack.Navigator>
);

export default AppNavigator;