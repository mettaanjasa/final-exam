import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen'; 
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator>
      
      <Stack.Screen name="List of States" component={MainScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}
