import { fromPromise } from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import * as SecureStore from 'expo-secure-store'

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    console.log('Error: Checking Errors')
    if(graphQLErrors){
        for( let error of graphQLErrors ){
          if(error.message == "Not Authorized"){
              console.log('Error: Not Authorized')
              return fromPromise(validateRefreshToken().then(token => {
                const oldHeaders = operation.getContext().headers
                operation.setContext({
                  headers: {
                      ...oldHeaders,
                      authorization: token ? `Bearer ${token}` : ''
                  }
                })
                return forward(operation)
              }))
          }
        }
    }
})

const validateRefreshToken = async () => {
    const rtoken = await SecureStore.getItemAsync('refresh')
    const uri = await SecureStore.getItemAsync('uri')
    const response = await fetch(
      uri,
      {
          method: 'POST',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify({
              operationName: 'Mutation',
              variables: {
                tokenInput: {refreshToken: rtoken}
              },
              query: `
                mutation Mutation($tokenInput: TokenInput) {
                  validateToken(tokenInput: $tokenInput) {
                    refresh
                    token
                  }
                }
              `,
          }),
      }
      )
    if (response.status !== 200){ console.log(response); return }
    const data = await response.json()

    if(data.errors){
      for( let error of data.errors)
      if(error.message === "Not Authorized"){
        console.error("Error: Cannot Refresh Token")
        return
      }
    }

    await SecureStore.setItemAsync('refresh', data.data.validateToken.refresh)
    await SecureStore.setItemAsync('token', data.data.validateToken.token)

    console.log(`Error: Done Refreshing Token`)
    return data.data.validateToken.token
  }

export default errorLink