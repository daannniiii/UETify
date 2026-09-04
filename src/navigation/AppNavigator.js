import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from './TabNavigator';
import { PlayerModal } from '../screens/PlayerModal';
import { MiniPlayer } from '../components/MiniPlayer';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator>
        <Stack.Screen 
          name="Main" 
          component={TabNavigator} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="PlayerModal" 
          component={PlayerModal} 
          options={{ 
            presentation: 'fullScreenModal',
            headerShown: false,
            animation: 'slide_from_bottom'
          }} 
        />
      </Stack.Navigator>
      <MiniPlayer />
    </NavigationContainer>
  );
};
