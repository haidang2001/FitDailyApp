import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import BodyPartScreen from '../screens/BodyPartScreen';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
            <Stack.Screen name="BodyPartScreen" component={BodyPartScreen} options={{ title: 'Exercises' }} />
            <Stack.Screen name="ExerciseDetailScreen" component={ExerciseDetailScreen} options={{ title: 'Details' }} />
        </Stack.Navigator>

    );
}
