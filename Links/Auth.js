import { setContext } from "@apollo/client/link/context"
import * as SecureStore from 'expo-secure-store'

const getAuthLink = async () => {
  const token = await SecureStore.getItemAsync('token')
  console.log(`Auth: Get Token - ${token}`)
    return token
  }

//Adding Auth Headers
const authLink = setContext((_, {headers}) => {
    return getAuthLink()
      .then( token => {
          return {
            headers: {
              ...headers,
              authorization: token ? `Bearer ${token}` : ''
            }
          }
      })
  })

export default authLink