import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeScreen from './screens/HomeScreen';
import SetupScreen from './screens/SetupScreen';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator()

const StackNav = () => {
    const [user, setUser] = useState({})
    
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" options={{ headerShown: false }} >
                    {props => <HomeScreen {...props} user={user} />}
                    </Stack.Screen>
                <Stack.Screen name="Splash" options={{ headerShown: false }} component={SplashScreen} />
                <Stack.Screen name="Create Account">
                    {props => <SetupScreen {...props} setUser={setUser} />}
                </Stack.Screen>
                <Stack.Screen name="Login">
                    {props => <LoginScreen {...props} setUser={setUser} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )

}

export default StackNav