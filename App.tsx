import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RecoilRoot } from 'recoil';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </RecoilRoot>
  );
}