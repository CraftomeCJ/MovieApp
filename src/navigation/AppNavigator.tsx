import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screens/home-screen';
import MovieDetailScreen from '../screens/detail-screen';
import { RootStackParamList } from '../types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => (
	<Stack.Navigator
		initialRouteName='HOME'
		screenOptions={{
			headerShown: false,
		}}
	>
		<Stack.Screen
			name='HOME'
			component={HomeScreen}
		/>
		<Stack.Screen
			name='MOVIE_DETAILS'
			component={MovieDetailScreen}
		/>
	</Stack.Navigator>
);

export default AppNavigator;
