import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';


import HomeScreen from './screens/HomeScreen';
import SetupScreen from './screens/SetupScreen';
import SplashScreen from './screens/SplashScreen';
import LoadingScreen from './screens/LoadingScreen'

const Stack = createNativeStackNavigator()

const StackNav = () => {
    const [user, setUser] = useState({})

    return(
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name="Splash" options={{ headerShown: false }} component={SplashScreen} />
            <Stack.Screen name="Create Account">
                {props => <SetupScreen {...props} setUser={setUser} />}
            </Stack.Screen>
            <Stack.Screen name="Home">
                {props => <HomeScreen {...props} user={user} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )

}

export default StackNav