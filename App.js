
// import React from 'react';
// import AppNavigator from './src/navigation/AppNavigator';

// export default function App() {
//   return <AppNavigator />;
// }

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // import LoginScreen from '../screens/LoginScreen';
// // import SignUpScreen from '../screens/SignUpScreen';
// import HomeScreen from './src/screens/HomeScreen';
// import LogWorkoutScreen from './src/screens/LogWorkoutScreen';
// import LogWaterScreen from './src/screens/LogWaterScreen';
// import SettingsScreen from './src/screens/SettingsScreen';
// import { Ionicons } from '@expo/vector-icons';

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ color, size }) => {
//             let iconName;

//             if (route.name === 'Home') iconName = 'home';
//             else if (route.name === 'Workout') iconName = 'barbell';
//             else if (route.name === 'Water') iconName = 'water';
//             else if (route.name === 'Settings') iconName = 'settings';

//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//           headerShown: false,
//         })}
//       >
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Workout" component={LogWorkoutScreen} />
//         <Tab.Screen name="Water" component={LogWaterScreen} />
//         <Tab.Screen name="Settings" component={SettingsScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }


import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/services/firebase';
import { ActivityIndicator, View } from 'react-native';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
