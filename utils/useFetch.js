import { useContext } from "react";
import jwt_decode from "jwt-decode";
import AuthContext from "../context/AuthContext";
import * as SecureStore from 'expo-secure-store'


const useFetch = () => {
    let config = {}

    const {authTokens, setAuthTokens, baseUrl, userLogout} = useContext(AuthContext)

    const Timeout = (time) => {
        let controller = new AbortController()
        setTimeout(() => controller.abort(), time * 1000)
        return controller
    }

    const originalRequest = async (url, config) => {
        url = `${baseUrl}${url}`
        const response = await fetch(url, config)
        const data = await response.json()
        return {response, data}
    }

    const refreshToken = async () => {
        //Attempting to Refresh the token
        try{
            const response = await fetch(`${baseUrl}/token/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer: ${authTokens.refresh}`
                },
                signal: Timeout(10).signal
            })

            const data =  await response.json()

            //Not Authorized
            if(response.status === 401){
                userLogout()
                return {response, data}
            }

            await SecureStore.setItemAsync('authTokens', JSON.stringify(data))
            setAuthTokens(data)
            return {response, data}
        } catch (err) {
            const response = {}
            const data = []
            response.status = 504
            console.error(`useFetch>refreshToken - ${err.message}`)
            return {response, data}
        }
    }

    const callFetch = async(url, type, body = {})=>{
        const user = jwt_decode(authTokens.access)
        const isExpired = user.exp < Math.round(Date.now() / 1000)

        
        let tokens = authTokens
        try{
            if(isExpired){
                const {response, data} = await refreshToken(tokens)
                if( response.status !== 200) return {response, data}
                tokens = data
            }
        }catch(err){
            console.error(`callFetch: ${err}`)
        }

        config = {
            method: type,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer: ${tokens?.access}`,
            signal: Timeout(10).signal
            },
        }

        if(type === 'POST'){
            config.body = JSON.stringify(body)
        }

        const {response, data} = await originalRequest(url, config)
        return {response, data}
    }
    return callFetch

}

export default useFetch