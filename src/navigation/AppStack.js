import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogWaterScreen from '../screens/LogWaterScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Ionicons } from '@expo/vector-icons';
import HomeStack from './HomeStack'; 
import WorkoutStack from './WorkoutStack'; 
import SettingsStack from './SettingsStack'; 

const Tab = createBottomTabNavigator();

export default function AppStack() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Workout') iconName = 'barbell';
            else if (route.name === 'Water') iconName = 'water';
            else if (route.name === 'Settings') iconName = 'settings';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Workout" component={WorkoutStack} />
        <Tab.Screen name="Water" component={LogWaterScreen} />
        <Tab.Screen name="Settings" component={SettingsStack} />
      </Tab.Navigator>
  );
}
