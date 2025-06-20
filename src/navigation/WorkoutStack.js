import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogWorkoutScreen from '../screens/LogWorkoutScreen';
import NewTemplateScreen from '../screens/NewTemplateScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export default function WorkoutStack() {
    return (//wipe left to delete
        <GestureHandlerRootView style={{ flex: 1 }}> 
            <Stack.Navigator>
                <Stack.Screen name="LogWorkoutScreen" component={LogWorkoutScreen} options={{ title: 'Workout' }} />
                <Stack.Screen name="NewTemplateScreen" component={NewTemplateScreen} options={{ title: 'Template' }} />
            </Stack.Navigator>
        </GestureHandlerRootView>
    );
}
