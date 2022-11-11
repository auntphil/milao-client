import React, { useState, useEffect } from 'react'
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import * as SecureStore from 'expo-secure-store'

import URIScreen from './screens/URIScreen';
import LoadingScreen from './screens/LoadingScreen';
import StackNav from './StackNav';

/**
 * Checking Secure Storage for Server URI
 */
async function getURI(){
  return SecureStore.getItemAsync('uri')
    .then( res => res ? res : null)
    .catch( console.error )
}


export default function App() {
  const [loading, setLoading] = useState(true)
  const [connect, setConnect] = useState(false)
  const [uri, setUri] = useState('')

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

  if(loading) return <LoadingScreen />

  if(!connect) return <URIScreen uri={uri} setUri={setUri} startConnection={startConnection}  />
  else{
    const client = new ApolloClient({
      uri: uri,
      cache: new InMemoryCache(),
    });
    return (
        <ApolloProvider client={client}>
          <StackNav />
        </ApolloProvider>
    );
  }

}
