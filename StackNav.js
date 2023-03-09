import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CreateAccount from './screens/CreateAccount';
import Setup from './screens/Setup';
import AuthContext from './context/AuthContext';
import Chatroom from './screens/Chatroom';

const Stack = createNativeStackNavigator()

const StackNav = () => {

    const {user} = useContext(AuthContext)

    if(!user){
        return(
            <Stack.Navigator>
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
        )
    }
    
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" options={{ headerShown: false }} >
                {props => <HomeScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Chatroom" >
                {props => <Chatroom {...props} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

export default StackNav