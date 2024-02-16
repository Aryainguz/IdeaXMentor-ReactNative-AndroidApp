import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Chat from '../pages/Chat';
import Home from '../pages/Home';

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  return (
   <Stack.Navigator>
    <Stack.Screen name="Idea Mentor GPT" component={Home} />
    <Stack.Screen name="chat" component={Chat} />
   </Stack.Navigator>
  )
}

export default HomeScreen