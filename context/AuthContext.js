import {createContext, useEffect, useState} from 'react'
import * as SecureStore from 'expo-secure-store'
import jwt_decode from "jwt-decode";
import Loading from '../screens/LoadingScreen';

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {
    const [authTokens, setAuthTokens] = useState()
    const [user, setUser] = useState()
    const [baseUrl, setBaseUrl] = useState()
    const [loading, setLoading] = useState(true)
    const [initialLoad, setInitialLoad] = useState(true)

    const saveBaseUrl = async (newUrl) => {
        setBaseUrl(newUrl)
        await SecureStore.setItemAsync('baseUrl', newUrl)
    }

    const userCreate = async (username, pass) => {
        try{
            //Attempting to Create a user
            const response = await fetch(`${baseUrl}/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, password: pass })
            })
            const data = await response.json()

            //Checking if response is OK
            if(response.status === 200){
                SecureStore.setItemAsync('authTokens', JSON.stringify(data))
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                return {response, data}
            }else{
                return {response, data}
            }
        }catch(err){
            console.error(err)
            return {
                success: false,
                message: 'Creating user'
            }
        }
    }

    const userLogin = async (username, password) => {
        try{
            //Send login request to API
            const response = await fetch(`${baseUrl}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: username, password: password })
            })
            const data =  await response.json()

            
            //Checking if response is OK
            if(response.status === 200){
                SecureStore.setItemAsync('authTokens', JSON.stringify(data))
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                return {response, data}
            }else{
                return {response, data}
            }
        }catch(err){
            console.error(`login: ${err}`)
            return {
                success: false,
                message: 'Error Logging In'
            }
        }

    }

    const userLogout = async () => {
        try{
            if(authTokens){
                const token = jwt_decode(authTokens.refresh)
                //Attempting to Logout user
                const response = await fetch(`${baseUrl}/user/logout`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ _id: token._id })
                })
                const data =  await response.json()
                
                //Remove Tokens
                await SecureStore.deleteItemAsync('authTokens')
                setAuthTokens(null)
                setUser(null)
            }
        } catch (err) {
            console.error(`userLogout - ${err.message}`)
            setAuthTokens(null)
            setUser(null)
        }
    }

    const contextData = {
        user:user,
        setUser:setUser,
        authTokens:authTokens,
        setAuthTokens:setAuthTokens,
        baseUrl:baseUrl,
        saveBaseUrl:saveBaseUrl,
        userLogin:userLogin,
        userLogout:userLogout,
        loading:loading,
        userCreate:userCreate
    }

    useEffect(() => {
        const intialValues = async () => {
            const InitialUrl = await SecureStore.getItemAsync('baseUrl') ? await SecureStore.getItemAsync('baseUrl') : null
            const initialTokens = await SecureStore.getItemAsync('authTokens') ? JSON.parse( await SecureStore.getItemAsync('authTokens')) : null

            setBaseUrl(InitialUrl)            
            setAuthTokens(initialTokens)
            setInitialLoad(false)
        }
        intialValues()
    },[])
    
    useEffect(() => {
        const getUser = async () => {
            
            //Get Tokens from Secure Storage
            if(authTokens){
                try{
                    setUser(jwt_decode(authTokens.access))
                }catch(err){
                    setAuthTokens(null)
                    console.error(err)
                }
            }
            setLoading(false)
        }

        if(!initialLoad){
            getUser()
        }
    },[authTokens, initialLoad])

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? <Loading /> : children}
        </AuthContext.Provider>
    )
}