import React, { useState, useEffect } from 'react'
import { ApolloProvider, createHttpLink, ApolloClient, InMemoryCache} from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import * as SecureStore from 'expo-secure-store'

import URIScreen from './screens/URIScreen';
import LoadingScreen from './screens/LoadingScreen';
import StackNav from './StackNav';
import Loading from './screens/LoadingScreen';

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
  const [token, setToken] = useState('')

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
  }, [])

  
  const startConnection = () => {
    setConnect(true)
  }

  
  if(!connect) return <URIScreen uri={uri} setUri={setUri} startConnection={startConnection}  />
  else{
    SecureStore.getItemAsync('token')
      .then( res => {
        setToken(res)
        setLoading(false)
      })
      .catch( err => {
        console.error(err)
        setLoading(false)
      })
      
      if(loading) return <LoadingScreen />

      //Creating Basic Connection 
      const httpLink = createHttpLink({
        uri: uri
      })
      
      //Adding Auth Headers
      const authLink = setContext((_, {headers}) => {
        return {
          headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : ''
          }
        }
      })

      const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
      });

      return (
          <ApolloProvider client={client}>
            <StackNav />
          </ApolloProvider>
      );
      

  }

}
