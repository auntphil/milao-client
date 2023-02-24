import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CreateAccount from './screens/CreateAccount';
import Setup from './screens/Setup';
import { AuthProvider } from './context/AuthContext';

const Stack = createNativeStackNavigator()

const StackNav = () => {    
    return(
        <NavigationContainer>
            <AuthProvider>
                <Stack.Navigator>
                    <Stack.Screen name="Home" options={{ headerShown: false }} >
                        {props => <HomeScreen {...props} />}
                    </Stack.Screen>
                    <Stack.Screen name="Setup" options={{ headerShown: false }} >
                        {props => <Setup />}
                    </Stack.Screen>
                    <Stack.Screen name="Create Account">
                        {props => <CreateAccount {...props} />}
                    </Stack.Screen>
                    <Stack.Screen name="Login">
                        {props => <LoginScreen {...props}/>}
                    </Stack.Screen>
                </Stack.Navigator>
            </AuthProvider>
        </NavigationContainer>
    )
}

export default StackNav