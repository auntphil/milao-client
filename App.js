import React, { useState, useEffect } from 'react'
import { ApolloProvider, createHttpLink, ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';
import * as SecureStore from 'expo-secure-store'

import URIScreen from './screens/URIScreen';
import StackNav from './StackNav';
import authLink from './Links/Auth';
import errorLink from './Links/Error';

/**
 * Checking Secure Storage for Server URI
 */
async function getURI(){
  return SecureStore.getItemAsync('uri')
    .then( res => res ? res : null)
    .catch( console.error )
}

export default function App() {
  const [connect, setConnect] = useState(false)
  const [uri, setUri] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const uri = await getURI()
      if(uri != null){
        setUri(uri)
        setConnect(true)
      }
    }

    fetchData()
      .catch(console.error)
  }, [uri])

  
  const startConnection = () => {
    setConnect(true)
  }
  
  //If no home server is designated show the URI screen
  if(!connect) return <URIScreen uri={uri} setUri={setUri} startConnection={startConnection}  />
  else{
    //Creating Basic Connection 
    const httpLink = createHttpLink({
      uri: uri
    })

      const client = new ApolloClient({
        link: ApolloLink.from([
          errorLink,
          authLink,
          httpLink
        ]),
        cache: new InMemoryCache(),
      });

      return (
          <ApolloProvider client={client} >
            <StackNav />
          </ApolloProvider>
      );
  }

}
