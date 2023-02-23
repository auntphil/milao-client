import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store'

import Loading from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CreateAccount from './screens/CreateAccount';
import Setup from './screens/Setup';

const Stack = createNativeStackNavigator()

const StackNav = () => {

    const [loading, setLoading] = useState(true)
    const [uri, setUri] = useState("")
    const connect = false
    
    useEffect(() => {
      /*** Checking Secure Storage for Server URI*/
      const getURI = async () => {
        SecureStore.getItemAsync('uri')
          .then( res => {
            setUri(res)
            setLoading(false)
          })
          .catch( console.error )
      }
      getURI()
    }, [])
  
    //Show Loading Screen
    if(loading) return <Loading />
    
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" options={{ headerShown: false }} >
                    {props => <HomeScreen {...props} uri={uri} />}
                </Stack.Screen>
                <Stack.Screen name="Setup" options={{ headerShown: false }} >
                    {props => <Setup uri={uri} setUri={setUri} />}
                </Stack.Screen>
                <Stack.Screen name="Create Account">
                    {props => <CreateAccount {...props} uri={uri} />}
                </Stack.Screen>
                <Stack.Screen name="Login">
                    {props => <LoginScreen {...props} uri={uri} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNav