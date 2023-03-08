import { useContext } from "react";
import jwt_decode from "jwt-decode";
import AuthContext from "../context/AuthContext";
import * as SecureStore from 'expo-secure-store'


const useFetch = () => {
    let config = {}

    const {authTokens, setAuthTokens, setUser, baseUrl, userLogout} = useContext(AuthContext)

    const originalRequest = async (url, config) => {
        url = `${baseUrl}${url}`
        const response = await fetch(url, config)
        const data = await response.json()
        return {response, data}
    }

    const refreshToken = async (authTokens) => {
        //Attempting to Refresh the token
        try{
            const response = await fetch(`${baseUrl}/token/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer: ${authTokens.refresh}`
                }
            })

            //Not Authorized
            if(response.status === 401){
                userLogout()
            }

            const data =  await response.json()
            await SecureStore.setItemAsync('authTokens', JSON.stringify(data))
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            return data
        } catch (err) {
            console.error(`useFetch>refreshToken - ${err.message}`)
        }
    }

    const callFetch = async(url, type)=>{
        const user = jwt_decode(authTokens.access)
        const isExpired = user.exp < Math.round(Date.now() / 1000)

        if(isExpired){
            await refreshToken(authTokens)
        }

        config = {
            'method': type,
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer: ${authTokens?.access}`
            }
        }
        const {response, data} = await originalRequest(url, config)
        return {response, data}
    }
    return callFetch

}

export default useFetch