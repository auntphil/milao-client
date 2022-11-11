import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import * as SecureStore from 'expo-secure-store'

import HomeScreen from './screens/HomeScreen';
import SetupScreen from './screens/SetupScreen';
import SplashScreen from './screens/SplashScreen';
import URIScreen from './screens/URIScreen';


const Stack = createNativeStackNavigator()

async function getURI(){
  return SecureStore.getItemAsync('uri')
    .then( res => res ? res : null)
    .catch( console.error )
}



export default function App() {
  const [loading, setLoading] = useState(true)
  const [uri, setUri] = useState('')
  const [connect, setConnect] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const uri = await getURI()
      if(uri != null){
        setUri(uri)
        setConnect(true)
      }
      setLoading(false)
    }

    fetchData()
      .catch(console.error)
  }, [])

  const startConnection = () => {
    setConnect(true)
  }

  if(loading){
    return(
      <View style={[styles.container]}>
          <Text style={styles.title}>Mílao Agápi</Text>
          <ActivityIndicator size='large' />
      </View>
    )
  }
  
  
  if(!connect){
    return(
      <URIScreen uri={uri} setUri={setUri} startConnection={startConnection}  />
    )
  }else{

    const client = new ApolloClient({
      uri: uri,
      cache: new InMemoryCache(),
    });

    return (
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Splash" options={{ headerShown: false }} component={SplashScreen} />
            <Stack.Screen name="Create Account" component={SetupScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 54,
    fontWeight: '700',
    marginBottom: 15
},
});
